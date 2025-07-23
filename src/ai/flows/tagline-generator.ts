'use server';

/**
 * @fileOverview An AI agent that generates tagline ideas based on project details.
 * 
 * - generateTaglines - A function that generates tagline ideas for a project.
 * - GenerateTaglinesInput - The input type for the generateTaglines function.
 * - GenerateTaglinesOutput - The return type for the generateTaglines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTaglinesInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectDescription: z.string().describe('A brief description of the project.'),
  technologiesUsed: z.string().describe('A comma-separated list of technologies used in the project.'),
});
export type GenerateTaglinesInput = z.infer<typeof GenerateTaglinesInputSchema>;

const GenerateTaglinesOutputSchema = z.object({
  taglines: z.array(z.string()).describe('An array of catchy tagline ideas for the project.'),
});
export type GenerateTaglinesOutput = z.infer<typeof GenerateTaglinesOutputSchema>;

export async function generateTaglines(input: GenerateTaglinesInput): Promise<GenerateTaglinesOutput> {
  return generateTaglinesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTaglinesPrompt',
  input: {schema: GenerateTaglinesInputSchema},
  output: {schema: GenerateTaglinesOutputSchema},
  prompt: `You are a creative marketing expert specializing in generating catchy taglines for projects.

  Given the project details below, generate 5 tagline ideas that capture the essence of the project and make it sound appealing.

  Project Title: {{{projectTitle}}}
  Description: {{{projectDescription}}}
  Technologies Used: {{{technologiesUsed}}}

  Tagline Ideas:
  `,
});

const generateTaglinesFlow = ai.defineFlow(
  {
    name: 'generateTaglinesFlow',
    inputSchema: GenerateTaglinesInputSchema,
    outputSchema: GenerateTaglinesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
