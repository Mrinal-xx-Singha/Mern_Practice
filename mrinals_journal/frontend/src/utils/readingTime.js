/**
 * Calculates estimated reading time in minutes for a given text content
 * Assumes average reading speed of 200 words per minute
 * 
 */

export function getReadingTime(content) {
    if (!content) return "1 min read"
    // Boolean because if content have consecutive space or empty lines, plain .split() can produce empty string items "" 
    // filter(Boolean) strips those out so the word count stays accurate!

    const words = content.trim().split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(words / 200))

    return `${minutes} min read`
}

