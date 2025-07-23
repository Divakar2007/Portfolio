"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Footer() {
    const { isAuthenticated } = useAuth()
    const [mounted, setMounted] = useState(false)
  
    useEffect(() => {
      setMounted(true)
    }, [])

    return (
        <footer className="py-6 md:px-8 md:py-0 border-t bg-secondary/50">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by PortfolioPilot. © {new Date().getFullYear()}. All Rights Reserved.
                </p>
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
            </div>
        </footer>
    )
}
