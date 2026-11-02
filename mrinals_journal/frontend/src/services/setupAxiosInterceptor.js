import axios from "axios"
import { API_BASE_URL } from "../config/api"
import { logoutUser } from "../redux/slices/authSlice"

// Global config for all axios requests

axios.defaults.withCredentials = true

let isRefreshing = false
let failedQueue = []

// Helper to resolve or reject queued requests once refresh finishes

const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve()
        }
    })
    failedQueue = []
}

export function setupAxiosInterceptors(store) {
    axios.interceptors.response.use((response) => response, // pass successful reponses straight through
        async (error) => {
            const originalRequest = error.config

            // If error is 401 and request hasn't been retried yet
            if (error.response?.status === 401 && !originalRequest._retry) {
                // Do not intercept refresh token or login failures to prevent infinite loops
                if (originalRequest.url.includes("/api/auth/refresh-token") || originalRequest.url.includes("/api/auth/login")) {
                    return Promise.reject(error)
                }
                // If a refresh is already in progress, queue this request intill its done
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject })
                    })
                        .then(() => axios(originalRequest))
                        .catch(err => Promise.reject(err))
                }
                originalRequest._retry = true
                isRefreshing = true

                try {
                    // Call the refresh token endpoint
                    await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {}, {
                        withCredentials: true
                    })


                    // unblock the original request with the fresh cookie
                    processQueue(null)
                    // Retry the original request with the fresh cokie
                    return axios(originalRequest)

                } catch (refreshError) {
                    // Refresh token also failed or expired (past 7 days) -> Log out user
                    processQueue(refreshError);
                    store.dispatch(logoutUser());
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false
                }
            }
            return Promise.reject(error)

        })
}