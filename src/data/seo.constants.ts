export const SEO = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://zaidhusainonline.vercel.app",
  PERSON_NAME: "Zaid Husain",
  JOB_TITLE: "Full-Stack Software Engineer",
  LOCATION: {
    locality: "Amravati",
    region: "Maharashtra",
    country: "IN"
  },
  EMAIL: "zaidquazi412@gmail.com",
  PHONE: "+91 93099 38127", // Use only in UI, not in schema for privacy
  RESUME_URL: "https://drive.google.com/file/d/1yvLzQRGISI1XP_KiYYx-P5g6S-QUDJp7/view?usp=sharing",
  SOCIAL: {
    GITHUB: "https://github.com/zaid-husain",
    LINKEDIN: "https://www.linkedin.com/in/zaid-husain/"
  },
  PROJECTS: {
    ZASHLY: {
      NAME: "Zashly",
      URL: "https://zashly.vercel.app/",
      GITHUB: "https://github.com/zaid-husain/Zashly",
      DESCRIPTION: "Real-Time Chat & Social Networking Platform built with MERN stack, Socket.IO, and WebRTC."
    },
    ZASHIO: {
      NAME: "Zashio",
      URL: "https://zashio.vercel.app/",
      GITHUB: "https://github.com/zaid-husain/Zashio",
      DESCRIPTION: "AI-Powered Campus Placement & Recruitment Platform with PostgreSQL, Supabase, and role-based access control."
    },
    ZASHUB: {
      NAME: "Zashub",
      URL: "https://zashub.vercel.app/",
      GITHUB: "https://github.com/zaid-husain/Zashub",
      DESCRIPTION: "Community & Neighborhood Platform for residents and local businesses built on the MERN stack."
    }
  },
  KNOWS_ABOUT: [
    "Full-Stack Web Development",
    "Software Engineering",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "Python",
    "Docker",
    "Socket.IO",
    "WebRTC",
    "REST APIs",
    "MERN Stack",
    "Git",
    "GitHub",
    "Supabase",
    "Authentication",
    "AI Applications",
    "Scalable Architecture"
  ]
};

export const getSameAsLinks = () => [
  SEO.SITE_URL,
  SEO.SOCIAL.GITHUB,
  SEO.SOCIAL.LINKEDIN,
  SEO.PROJECTS.ZASHLY.URL,
  SEO.PROJECTS.ZASHIO.URL,
  SEO.PROJECTS.ZASHUB.URL
];
