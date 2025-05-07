import React, { useState } from "react"

type ThemeContextType = {
  theme: "dark" | "light"
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? (savedTheme as "dark" | "light") : "dark"
  })

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background min-h-screen`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
