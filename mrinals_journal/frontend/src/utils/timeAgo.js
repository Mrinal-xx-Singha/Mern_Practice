export function timeAgo(date) {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000)
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} day ago`


    return new Date(date).toLocaleDateString()

}
