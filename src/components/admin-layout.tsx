"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Package, LogOut, PanelLeft, LayoutDashboard, Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Package },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/tagline-generator", label: "AI Taglines", icon: Wand2 },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout, profile } = useAuth()
  const pathname = usePathname()

  const NavLink = ({ href, label, icon: Icon }: typeof navItems[0]) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        pathname === href && "bg-muted text-primary"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
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
              <span className="font-headline">PortfolioPilot</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map(item => <NavLink key={item.href} {...item} />)}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
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
                  <span className="sr-only">PortfolioPilot</span>
                </Link>
                {navItems.map(item => <NavLink key={item.href} {...item} />)}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                View Site
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
