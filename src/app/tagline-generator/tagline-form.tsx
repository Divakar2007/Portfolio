"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { generateTaglines, type GenerateTaglinesOutput } from "@/ai/flows/tagline-generator"
import { Loader2, Wand2 } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  projectTitle: z.string().min(2, "Project title must be at least 2 characters."),
  projectDescription: z.string().min(10, "Project description must be at least 10 characters."),
  technologiesUsed: z.string().min(2, "Please list at least one technology."),
})

type FormValues = z.infer<typeof formSchema>

export function TaglineForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateTaglinesOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      projectDescription: "",
      technologiesUsed: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    setResult(null)
    try {
      const output = await generateTaglines(values)
      setResult(output)
    } catch (error) {
      console.error(error)
      toast({
        title: "An error occurred",
        description: "Failed to generate taglines. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="projectTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., PortfolioPilot" {...field} />
                </FormControl>
                <FormDescription>
                  The name of your project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., An AI-powered portfolio builder..."
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief, clear description of what your project does.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="technologiesUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies Used</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Next.js, Tailwind CSS, Firebase" {...field} />
                </FormControl>
                <FormDescription>
                  A comma-separated list of the main technologies.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
               <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Taglines
               </>
            )}
          </Button>
        </form>
      </Form>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold font-headline">Generated Taglines</h3>
        {loading && (
          <div className="space-y-2 pt-2">
            <div className="h-8 bg-muted rounded-md animate-pulse" />
            <div className="h-8 bg-muted rounded-md animate-pulse w-5/6" />
            <div className="h-8 bg-muted rounded-md animate-pulse" />
            <div className="h-8 bg-muted rounded-md animate-pulse w-4/6" />
            <div className="h-8 bg-muted rounded-md animate-pulse w-5/6" />
          </div>
        )}
        {result && (
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {result.taglines.map((tagline, index) => (
                  <li key={index} className="flex items-start">
                    <Wand2 className="h-4 w-4 mr-3 mt-1 shrink-0 text-primary" />
                    <span>{tagline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        {!loading && !result && (
            <div className="flex items-center justify-center h-full rounded-lg border border-dashed text-center p-8">
                <p className="text-muted-foreground">Your AI-generated taglines will appear here.</p>
            </div>
        )}
      </div>
    </div>
  )
}
