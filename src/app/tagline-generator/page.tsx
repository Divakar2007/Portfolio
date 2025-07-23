import { TaglineForm } from './tagline-form'

export default function TaglineGeneratorPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl font-headline">
          AI Tagline Generator
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Stuck on a catchy phrase for your new project? Describe your project, and let our AI generate some creative tagline ideas for you.
        </p>
      </div>
      <div className="mt-8">
        <TaglineForm />
      </div>
    </section>
  )
}
