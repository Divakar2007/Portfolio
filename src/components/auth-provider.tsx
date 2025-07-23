"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { initialProjects, initialProfile, type Project, type Profile } from "@/lib/data"

type AuthContextType = {
  isAuthenticated: boolean
  profile: Profile
  projects: Project[]
  login: (password: string) => boolean
  logout: () => void
  updateProfile: (newProfile: Profile) => void
  addProject: (newProject: Omit<Project, 'id'>) => void
  updateProject: (updatedProject: Project) => void
  deleteProject: (projectId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const isServer = typeof window === "undefined"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (isServer) return false
    return localStorage.getItem("isAuthenticated") === "true"
  })
  
  const [profile, setProfile] = useState<Profile>(() => {
    if (isServer) return initialProfile;
    const savedProfile = localStorage.getItem("profile")
    return savedProfile ? JSON.parse(savedProfile) : initialProfile
  })

  const [projects, setProjects] = useState<Project[]>(() => {
    if (isServer) return initialProjects
    const savedProjects = localStorage.getItem("projects")
    return savedProjects ? JSON.parse(savedProjects) : initialProjects
  })

  useEffect(() => {
    if(!localStorage.getItem("profile")) {
      localStorage.setItem("profile", JSON.stringify(initialProfile))
    }
    if(!localStorage.getItem("projects")) {
      localStorage.setItem("projects", JSON.stringify(initialProjects))
    }
  }, [])
  

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem("isAuthenticated", String(isAuthenticated))
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem("profile", JSON.stringify(profile))
    }
  }, [profile])

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem("projects", JSON.stringify(projects))
    }
  }, [projects])

  const login = (password: string) => {
    // In a real app, you'd have a username and verify against a backend.
    // Here, we'll use a simple hardcoded password.
    if (password === "admin") {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile)
  }

  const addProject = (newProject: Omit<Project, 'id'>) => {
    setProjects(prev => [...prev, { ...newProject, id: String(Date.now()) }])
  }

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p))
  }

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId))
  }

  const value = {
    isAuthenticated,
    profile,
    projects,
    login,
    logout,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
