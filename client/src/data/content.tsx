// Experience data
export const experienceData = [
  {
    title: "Senior UX Designer",
    company: "Agency Creative, New York",
    duration: "2020 - Present",
    description: "Led design teams for enterprise clients, creating user-centered digital products and design systems. Improved client conversion rates by an average of 30%."
  },
  {
    title: "UX/UI Designer",
    company: "Digital Solutions Inc.",
    duration: "2017 - 2020",
    description: "Created intuitive interfaces for web and mobile applications. Worked closely with development teams to ensure design fidelity. Conducted user research and testing."
  },
  {
    title: "Visual Designer",
    company: "Creative Studio Co.",
    duration: "2015 - 2017",
    description: "Designed brand identities, marketing materials, and website layouts for various clients. Collaborated with copywriters and marketing specialists."
  }
];

// Portfolio data - Mobile/Web/Cloud Development Projects
export const mobileWebCloudProjects = [
  {
    title: "Healthcare Patient Portal",
    description: "Developed a secure, HIPAA-compliant web application to allow patients to access medical records, schedule appointments, and communicate with healthcare providers.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    category: "web",
    categoryDisplay: "Web Development"
  },
  {
    title: "Logistics Fleet Management App",
    description: "Built a cross-platform mobile application for tracking delivery vehicles, optimizing routes, and managing driver schedules in real-time.",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["React Native", "Firebase", "Google Maps API", "Redux"],
    category: "mobile",
    categoryDisplay: "Mobile Development"
  },
  {
    title: "E-commerce Microservices Platform",
    description: "Architected and implemented a cloud-native e-commerce platform using microservices architecture, enabling high scalability and resilience.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Kubernetes", "Docker", "Node.js", "MongoDB", "AWS"],
    category: "cloud",
    categoryDisplay: "Cloud Development"
  },
  {
    title: "Financial Analytics Dashboard",
    description: "Created a real-time financial analytics dashboard for investment professionals with complex data visualization and predictive modeling capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "AWS Lambda"],
    category: "web",
    categoryDisplay: "Web Development"
  }
];

// Portfolio data - Network Security Projects
export const networkSecurityProjects = [
  {
    title: "Enterprise Network Security Audit",
    description: "Conducted comprehensive security assessment for a Fortune 500 company, identifying vulnerabilities and implementing remediation strategies.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Penetration Testing", "Vulnerability Assessment", "NIST Framework"],
    category: "network_security",
    categoryDisplay: "Network Security"
  },
  {
    title: "Zero Trust Architecture Implementation",
    description: "Designed and deployed a zero trust security model for a multinational organization, enhancing security posture while maintaining operational efficiency.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Zero Trust", "Identity Management", "Micro-segmentation", "Cloud Security"],
    category: "network_security",
    categoryDisplay: "Network Security"
  },
  {
    title: "Incident Response System",
    description: "Developed an automated incident response system that significantly reduced threat detection and remediation time for a healthcare provider.",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5e9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["SIEM", "SOAR", "Threat Intelligence", "Python"],
    category: "network_security",
    categoryDisplay: "Network Security"
  },
  {
    title: "Secure IoT Infrastructure",
    description: "Designed a secure infrastructure for IoT devices in an industrial setting, implementing encryption, access controls, and continuous monitoring.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["IoT Security", "PKI", "Network Segmentation", "Endpoint Protection"],
    category: "network_security",
    categoryDisplay: "Network Security"
  }
];

// Combined portfolio data for backward compatibility
export const portfolioData = [...mobileWebCloudProjects, ...networkSecurityProjects];

// Photography data
export const photographyData = [
  {
    title: "Rocky Mountains",
    category: "Landscape Photography",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Manhattan Skyline",
    category: "Urban Photography",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Pacific Sunset",
    category: "Nature Photography",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Morning Light",
    category: "Portrait Photography",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Modern Structure",
    category: "Architectural Photography",
    image: "https://images.unsplash.com/photo-1520531158340-44015069e78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Milky Way",
    category: "Astrophotography",
    image: "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

// About data
export const aboutData = {
  image: "/assets/IMG_5177.png", // Using Nathan's genmoji image
  paragraphs: [
    "I'm Nathan Ooley, a multidisciplinary designer and developer with over 8 years of experience creating digital products and visual identities. My background spans UX/UI design, brand development, and photography, allowing me to approach projects with a comprehensive perspective.",
    "My design philosophy centers on creating intuitive, accessible experiences that balance aesthetic beauty with practical functionality. I believe in designing with purpose, where every element serves the user's needs while reflecting the brand's identity.",
    "When I'm not designing, you'll find me exploring the outdoors with my camera, sailing along coastal waters, and experimenting with new coding projects for inspiration."
  ]
};

// Skills data
export const skillsData = [
  "UI/UX Design",
  "Product Design",
  "Brand Identity",
  "Photography",
  "Figma",
  "Adobe Creative Suite",
  "Webflow",
  "HTML/CSS"
];

// Contact data
export const contactData = {
  email: "hello@nathanooley.com",
  phone: "+1 (234) 567-890"
};

// Playlist data
export const playlistData = [
  {
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    year: "2011",
    albumCover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isNowPlaying: true
  },
  {
    title: "Innerbloom",
    artist: "RÜFÜS DU SOL",
    album: "Bloom",
    year: "2016",
    albumCover: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isNowPlaying: false
  },
  {
    title: "Strobe",
    artist: "deadmau5",
    album: "For Lack of a Better Name",
    year: "2009",
    albumCover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isNowPlaying: false
  },
  {
    title: "Nana",
    artist: "Polo & Pan",
    album: "Caravelle",
    year: "2017",
    albumCover: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isNowPlaying: false
  },
  {
    title: "Time",
    artist: "Hans Zimmer",
    album: "Inception (Original Motion Picture Soundtrack)",
    year: "2010",
    albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isNowPlaying: false
  },
  {
    title: "Genesis",
    artist: "Justice",
    album: "Cross",
    year: "2007",
    albumCover: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    isNowPlaying: false
  }
];

// Sailing data
export const sailingData = {
  trips: [
    {
      title: "Aegean Sea Expedition",
      type: "Open Water Sailing",
      date: "June 2023",
      image: "https://images.unsplash.com/photo-1500514966906-fe367bfb5aa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Greek Islands",
      distance: "450 nautical miles",
      conditions: "Moderate winds, clear skies",
      description: "A two-week journey through the Greek islands, navigating through the Cyclades and experiencing the unique culture of each island while improving my open water sailing techniques.",
      highlights: ["Island hopping", "Night sailing", "Navigating through narrow passes"]
    },
    {
      title: "Pacific Northwest Race",
      type: "Competitive Regatta",
      date: "August 2022",
      image: "https://images.unsplash.com/photo-1609602644879-dd158c2b56b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Vancouver to Seattle",
      distance: "180 nautical miles",
      conditions: "Variable winds, challenging currents",
      description: "Participated in the annual coastal race from Vancouver to Seattle, facing challenging weather conditions and strong competition from experienced crews.",
      highlights: ["3rd place finish", "Teamwork", "Strategic navigation"]
    },
    {
      title: "Caribbean Island Tour",
      type: "Leisure Cruise",
      date: "December 2021",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "British Virgin Islands",
      distance: "280 nautical miles",
      conditions: "Steady trade winds, tropical weather",
      description: "A relaxing yet educational tour of the Caribbean islands, focusing on improving sailing techniques while enjoying the beautiful tropical environment.",
      highlights: ["Coral reef exploration", "Traditional sailing methods", "Marine conservation"]
    }
  ],
  stats: [
    {
      value: "12+",
      label: "Years of Sailing Experience",
      icon: "anchor"
    },
    {
      value: "15,000",
      label: "Nautical Miles Sailed",
      icon: "compass"
    },
    {
      value: "25",
      label: "Countries Visited by Sea",
      icon: "map"
    }
  ]
};
