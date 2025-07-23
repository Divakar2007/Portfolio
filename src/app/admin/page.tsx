"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  Package,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"

export default function Dashboard() {
  const { profile, projects } = useAuth()

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile.name}. Here's an overview of your portfolio.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              projects are currently showcased
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold truncate">{profile.title}</div>
             <p className="text-xs text-muted-foreground">
                Your public title
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
          <CardHeader>
            <CardTitle className="font-headline">Quick Actions</CardTitle>
            <CardDescription>
                Quickly jump to common management tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Link href="/admin/projects" className="block">
                <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-semibold flex items-center justify-between">Manage Projects <ArrowUpRight className="h-4 w-4 text-muted-foreground" /></h3>
                    <p className="text-sm text-muted-foreground">Add, edit, or delete projects.</p>
                </div>
            </Link>
            <Link href="/admin/profile" className="block">
                <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-semibold flex items-center justify-between">Update Profile <ArrowUpRight className="h-4 w-4 text-muted-foreground" /></h3>
                    <p className="text-sm text-muted-foreground">Edit your bio and contact info.</p>
                </div>
            </Link>
          </CardContent>
      </Card>
    </>
  )
}
