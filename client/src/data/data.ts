// This file contains all the data for the website

export const data = {
  // Experience section data
  experiences: [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "Jan 2021 - Present",
      description: "Lead frontend development for enterprise applications. Collaborate with design teams to implement responsive interfaces. Mentor junior developers and establish best practices.",
      technologies: ["React", "Next.js", "TypeScript"],
      isCurrent: true
    },
    {
      title: "Web Developer",
      company: "Digital Solutions LLC",
      period: "Mar 2018 - Dec 2020",
      description: "Developed responsive websites and applications for various clients. Implemented modern UI/UX designs and optimized performance for a seamless user experience.",
      technologies: ["JavaScript", "React", "CSS/SASS"],
      isCurrent: false
    },
    {
      title: "Junior Web Developer",
      company: "CreativeMinds Agency",
      period: "Jun 2016 - Feb 2018",
      description: "Started my career building websites for small businesses. Focused on HTML, CSS, and JavaScript fundamentals while learning modern development workflows.",
      technologies: ["HTML/CSS", "JavaScript", "WordPress"],
      isCurrent: false
    }
  ],

  // Portfolio section data
  categories: [
    { id: "web", name: "Web Development" },
    { id: "ux", name: "UX Design" },
    { id: "mobile", name: "Mobile Apps" }
  ],

  projects: [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with user authentication, product management, and payment processing.",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "web",
      categoryName: "Web App",
      categoryColor: "bg-blue-100 text-blue-600",
      technologies: ["React", "Node.js", "MongoDB"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Task Management App",
      description: "A productivity application for managing tasks, projects, and team collaboration with real-time updates.",
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "mobile",
      categoryName: "Mobile App",
      categoryColor: "bg-green-100 text-green-600",
      technologies: ["React Native", "Firebase", "Redux"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Weather Forecast App",
      description: "A modern weather application with animated visualizations, forecasts, and location-based recommendations.",
      image: "https://images.unsplash.com/photo-1519211975560-4ca611f5a72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "ux",
      categoryName: "UI/UX Design",
      categoryColor: "bg-purple-100 text-purple-600",
      technologies: ["Figma", "React", "Weather API"],
      demoLink: "#",
      codeLink: "#"
    }
  ],

  // Photography section data
  photoCategories: [
    { id: "landscape", name: "Landscape" },
    { id: "street", name: "Street" },
    { id: "architecture", name: "Architecture" }
  ],

  photos: [
    {
      src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Mountain Twilight",
      caption: "Norway, 2021",
      category: "landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1480497490787-505ec076689f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "City Lights",
      caption: "New York, 2020",
      category: "street"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Mirror Lake",
      caption: "Canada, 2019",
      category: "landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Desert Calm",
      caption: "Arizona, 2021",
      category: "landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Starry Peaks",
      caption: "Switzerland, 2020",
      category: "landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Coastal Sunset",
      caption: "California, 2021",
      category: "landscape"
    }
  ]
};
