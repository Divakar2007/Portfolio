"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "./data-table"
import { getColumns } from "./columns"
import { useAuth } from "@/components/auth-provider"
import type { Project } from "@/lib/data"
import { PlusCircle } from "lucide-react"
import { ProjectDialog } from "./project-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

export default function ProjectsPage() {
  const { projects, deleteProject } = useAuth()
  const { toast } = useToast()
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  const handleAdd = () => {
    setSelectedProject(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const handleDelete = (project: Project) => {
    setProjectToDelete(project)
    setIsDeleteDialogOpen(true)
  }
  
  const confirmDelete = () => {
    if (projectToDelete) {
        deleteProject(projectToDelete.id)
        toast({ title: "Project Deleted", description: `"${projectToDelete.title}" has been deleted.` })
        setProjectToDelete(null)
    }
    setIsDeleteDialogOpen(false)
  }

  const columns = getColumns(handleEdit, handleDelete)

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Projects</h1>
            <p className="text-muted-foreground">Manage your showcased projects.</p>
        </div>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <DataTable columns={columns} data={projects} />

      <ProjectDialog 
        project={selectedProject}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              "{projectToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
