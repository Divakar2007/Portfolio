"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { AdminLayout } from "@/components/admin-layout"
import { Toaster } from "@/components/ui/toaster"

export default function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // We need to check if we're on the client side, and if auth state has been determined
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // While checking auth, we can render a loader or null
  if (!isAuthenticated) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
        </div>
    );
  }

  // If authenticated, render the admin layout
  return (
      <AdminLayout>{children}</AdminLayout>
  )
}
