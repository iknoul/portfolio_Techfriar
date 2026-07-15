"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine initial theme on client mount
    const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark";
    setTheme(currentTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-border bg-glass backdrop-blur-md flex items-center justify-center opacity-0">
        <Moon className="w-5 h-5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full border border-border bg-glass backdrop-blur-md flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-all duration-300 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-accent"
      aria-label="Toggle visual theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 transition-transform duration-500 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-500 hover:-rotate-12" />
      )}
    </button>
  );
}
