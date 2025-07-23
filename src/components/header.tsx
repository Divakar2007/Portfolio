"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
  const { isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M14.5 17.5L12 20l-2.5-2.5" />
              <path d="M12 2v18" />
              <path d="M7 10h1a2 2 0 012 2v10" />
              <path d="M16 10h-1a2 2 0 00-2 2v10" />
            </svg>
            <span className="font-bold sm:inline-block font-headline">
              PortfolioPilot
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Home
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {mounted ? (
            <Link href={isAuthenticated ? "/admin" : "/login"} passHref>
              <Button variant="outline" size="sm">
                {isAuthenticated ? "Admin Dashboard" : "Admin Login"}
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Admin Login
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
