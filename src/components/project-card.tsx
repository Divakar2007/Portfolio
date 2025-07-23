import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ProjectCardProps = {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  imageHint: string
  liveUrl?: string
  githubUrl?: string
}

export function ProjectCard({ title, description, tags, imageUrl, imageHint, liveUrl, githubUrl }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={338}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
            data-ai-hint={imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline mb-2">{title}</CardTitle>
        <CardDescription className="mb-4 text-base">{description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-end gap-2">
        {githubUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        )}
        {liveUrl && (
          <Button asChild size="sm">
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
