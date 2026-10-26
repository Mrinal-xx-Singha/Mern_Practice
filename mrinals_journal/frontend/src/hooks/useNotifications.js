import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchNotifications } from "../redux/slices/notificationSlice"


const POLL_INTERVAL = 30000

export function useNotifications() {

    const dispatch = useDispatch()
    const { items, unreadCount, loading } = useSelector((state) => state.notifications)

    const isLoggedIn = useSelector((state) => !!state.auth.user)

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchNotifications())

        const interval = setInterval(() => {
            if (document.visibilityState === "visible") {
                dispatch(fetchNotifications())
            }

        }, POLL_INTERVAL)

        return () => clearInterval(interval)
    }, [isLoggedIn, dispatch])

    return { items, unreadCount, loading }
}