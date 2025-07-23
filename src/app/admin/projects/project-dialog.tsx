"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/components/auth-provider"
import type { Project } from "@/lib/data"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const projectFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  tags: z.string().min(2, "Please list at least one technology."),
  imageUrl: z.string().url("Image URL must be a valid URL."),
  imageHint: z.string().optional(),
  liveUrl: z.string().url("Live demo URL must be a valid URL.").optional().or(z.literal('')),
  githubUrl: z.string().url("GitHub URL must be a valid URL.").optional().or(z.literal('')),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

interface ProjectDialogProps {
  project?: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  const { addProject, updateProject } = useAuth()
  const { toast } = useToast()

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
        title: project?.title ?? "",
        description: project?.description ?? "",
        tags: project?.tags.join(", ") ?? "",
        imageUrl: project?.imageUrl ?? "",
        imageHint: project?.imageHint ?? "",
        liveUrl: project?.liveUrl ?? "",
        githubUrl: project?.githubUrl ?? ""
    },
  })

  // Reset form when project changes
  useEffect(() => {
    form.reset({
        title: project?.title ?? "",
        description: project?.description ?? "",
        tags: project?.tags.join(", ") ?? "",
        imageUrl: project?.imageUrl ?? "",
        imageHint: project?.imageHint ?? "abstract geometric",
        liveUrl: project?.liveUrl ?? "",
        githubUrl: project?.githubUrl ?? ""
    });
  }, [project, form]);


  const onSubmit = (data: ProjectFormValues) => {
    const projectData = {
        ...data,
        tags: data.tags.split(",").map(tag => tag.trim())
    }

    if (project) {
        updateProject({ ...project, ...projectData })
        toast({ title: "Project Updated", description: `"${data.title}" has been updated.` })
    } else {
        addProject(projectData)
        toast({ title: "Project Added", description: `"${data.title}" has been added.` })
    }
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{project ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Make changes to your project here. Click save when you're done." : "Fill in the details for your new project. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl><Input placeholder="My Awesome Project" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl><Textarea placeholder="A short description of the project." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Technologies Used</FormLabel>
                            <FormControl><Input placeholder="React, Next.js, Tailwind CSS" {...field} /></FormControl>
                            <FormDescription>A comma-separated list.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl><Input placeholder="https://placehold.co/600x400.png" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="liveUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Live Demo URL</FormLabel>
                                <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="githubUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub URL</FormLabel>
                                <FormControl><Input placeholder="https://github.com/user/repo" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit">Save Project</Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

// React is not defined error without this
import { useEffect } from "react"
