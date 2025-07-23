export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageHint: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with a custom CMS for managing products, orders, and customers.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'online store',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '2',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets with real-time updates.',
    tags: ['Vue.js', 'D3.js', 'Firebase'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'dashboard chart',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'AI-Powered Chatbot',
    description: 'A conversational AI built with natural language processing to handle customer support inquiries.',
    tags: ['Python', 'TensorFlow', 'Flask'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chatbot interface',
    githubUrl: '#',
  },
   {
    id: '4',
    title: 'Mobile Task Manager',
    description: 'A cross-platform mobile app for organizing tasks and improving productivity, built with React Native.',
    tags: ['React Native', 'TypeScript', 'GraphQL'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile app',
    liveUrl: '#',
    githubUrl: '#',
  },
];

export type Profile = {
  name: string;
  avatar: string;
  title: string;
  bio: string;
  github: string;
  linkedin: string;
  twitter: string;
};

export const initialProfile: Profile = {
    name: "John Doe",
    avatar: "https://placehold.co/400x400.png",
    title: "Full-Stack Developer & Tech Enthusiast",
    bio: "Welcome to my digital space. I specialize in building robust and scalable web applications. Explore my work and get in touch!",
    github: "#",
    linkedin: "#",
    twitter: "#",
};
