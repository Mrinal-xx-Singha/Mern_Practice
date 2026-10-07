/**
 * Returns badge styling and text for application status.
 */
export const getStatusBadge = (status) => {
  switch (status) {
    case "accepted":
      return { label: "Accepted", color: "#059669", bg: "#d1fae5" };
    case "reviewed":
      return { label: "Reviewed", color: "#2563eb", bg: "#dbeafe" };
    case "rejected":
      return { label: "Rejected", color: "#dc2626", bg: "#fee2e2" };
    case "pending":
    default:
      return { label: "Pending", color: "#d97706", bg: "#fef3c7" };
  }
};

/**
 * Returns badge styling and text for AI resume match scores.
 */
export const getScoreBadge = (score) => {
  if (score >= 80) return { label: "Great Match", color: "#16a34a", bg: "#dcfce7" };
  if (score >= 60) return { label: "Good Match", color: "#ca8a04", bg: "#fef9c3" };
  return { label: "Weak Match", color: "#dc2626", bg: "#fee2e2" };
};
