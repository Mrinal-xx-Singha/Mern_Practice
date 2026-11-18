import React, { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        // Check saved localstorage preference
        const saved = localStorage.getItem("theme")
        if (saved) return saved

        // Fallback to OS system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    })

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
        localStorage.setItem("theme", theme)
    }, [theme])

    const themeToggle = () => {
        setTheme((prev) => (prev === "dark" ? "light" : 'dark'))
    }

    return (
        <button onClick={themeToggle}
            className="p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center hover:bg-[var(--color-bg-subtle)]"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {theme === "dark" ? (<Sun
                size={18}
                className="text-amber-400 hover:rotate-45 transition-transform"
            />) : (<Moon
                className="hover:-rotate-12 transition-transform"
                size={18} />)}
        </button>
    )
}


export default ThemeToggle