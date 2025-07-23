"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { ContactForm } from '@/app/contact-form';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth-provider';

export default function Home() {
  const { profile, projects } = useAuth();

  return (
    <>
      <section id="hero" className="container py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-headline">
              {profile.title}
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              {profile.bio}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Button asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
               <Button asChild variant="outline">
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <Link href={profile.github} aria-label="Github Profile" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href={profile.linkedin} aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src={profile.avatar}
              alt="Professional Bio"
              width={400}
              height={400}
              className="rounded-full object-cover aspect-square"
              data-ai-hint="professional portrait"
              priority
            />
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 md:py-32 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">My Projects</h2>
            <p className="text-lg text-muted-foreground mt-2">A selection of my recent work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="container py-20 md:py-32">
         <div className="max-w-xl mx-auto">
           <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Get In Touch</h2>
              <p className="text-lg text-muted-foreground mt-2">Have a question or want to work together? Send me a message!</p>
            </div>
            <ContactForm />
         </div>
      </section>
    </>
  );
}
