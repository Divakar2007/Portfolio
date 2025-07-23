"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { initialProjects, initialProfile, type Project, type Profile } from "@/lib/data"
import { database } from "@/lib/firebase"
import { ref, onValue, set, push, remove } from "firebase/database"

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
  
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  useEffect(() => {
    const profileRef = ref(database, 'profile');
    const projectsRef = ref(database, 'projects');

    const unsubscribeProfile = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
      } else {
        // If no data, initialize it in Firebase
        set(profileRef, initialProfile);
      }
    });

    const unsubscribeProjects = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Firebase returns an object, convert it to an array
        const projectsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProjects(projectsArray);
      } else {
        // If no data, initialize it in Firebase
        const projectsWithFirebaseKeys: {[key: string]: Omit<Project, 'id'>} = {};
        initialProjects.forEach(p => {
            const newProjectRef = push(projectsRef);
            if(newProjectRef.key){
                projectsWithFirebaseKeys[newProjectRef.key] = {
                    title: p.title,
                    description: p.description,
                    tags: p.tags,
                    imageUrl: p.imageUrl,
                    imageHint: p.imageHint,
                    liveUrl: p.liveUrl,
                    githubUrl: p.githubUrl,
                }
            }
        });
        set(projectsRef, projectsWithFirebaseKeys);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribeProfile();
      unsubscribeProjects();
    };
  }, []);
  

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem("isAuthenticated", String(isAuthenticated))
    }
  }, [isAuthenticated])

  const login = (password: string) => {
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
    const profileRef = ref(database, 'profile');
    set(profileRef, newProfile);
  }

  const addProject = (newProject: Omit<Project, 'id'>) => {
    const projectsRef = ref(database, 'projects');
    const newProjectRef = push(projectsRef);
    set(newProjectRef, newProject);
  }

  const updateProject = (updatedProject: Project) => {
    const { id, ...projectData } = updatedProject;
    const projectRef = ref(database, `projects/${id}`);
    set(projectRef, projectData);
  }

  const deleteProject = (projectId: string) => {
    const projectRef = ref(database, `projects/${projectId}`);
    remove(projectRef);
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
