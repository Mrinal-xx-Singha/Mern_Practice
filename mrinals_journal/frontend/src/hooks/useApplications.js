import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to fetch job applications from a given API endpoint.
 * Returns { applications, setApplications, loading, error, refetch }
 */
export function useApplications(endpointUrl) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(endpointUrl, {
        withCredentials: true,
      });
      setApplications(data);
      setError(null);
    } catch (err) {
      console.error("Failed to load applications:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpointUrl) {
      fetchApplications();
    }
  }, [endpointUrl]);

  return {
    applications,
    setApplications,
    loading,
    error,
    refetch: fetchApplications,
  };
}
