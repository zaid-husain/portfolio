export interface EngineeringMilestone {
  id: string;
  stageBadge: string;
  stageTitle: string;
  role: string;
  company: string;
  timeline: string;
  badgeLabel: string;
  problem: string;
  solution: string;
  engineeringDecision: string;
  outcome: string;
  techStack: string[];
  type: 'work' | 'education' | 'horizon';
}

export const journeyMilestones: EngineeringMilestone[] = [
  {
    id: "internship",
    stageBadge: "01 / LEARN",
    stageTitle: "Production Internship",
    role: "MERN Stack Developer Intern",
    company: "Unified Mentor",
    timeline: "1 Month",
    badgeLabel: "Internship • 1 Month",
    problem: "Monolithic client workflows created high latency, tight client-server coupling, and unvalidated data flows across production endpoints.",
    solution: "Architected modular React client interfaces coupled with RESTful Express micro-services to streamline real-time state synchronization.",
    engineeringDecision: "Enforced strict backend request validation schemas, token authorization middleware, and indexed MongoDB collections to isolate data mutation operations.",
    outcome: "Reduced client API response latency by 35%, eliminated data synchronization race conditions, and established automated Postman testing pipelines.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Postman", "Git"],
    type: "work"
  },
  {
    id: "education",
    stageBadge: "02 / FOUNDATION",
    stageTitle: "Computer Science Engineering",
    role: "B.Tech in Computer Science & Engineering",
    company: "G H Raisoni University, Amravati",
    timeline: "2024 – 2028 (Expected)",
    badgeLabel: "Education • Expected 2028",
    problem: "Building production software requires deep theoretical grounding in algorithms, system architecture, memory models, and database design.",
    solution: "Pursuing a 4-year Computer Science Engineering degree while serving as College Team Lead to drive collaborative peer engineering initiatives.",
    engineeringDecision: "Bridged core academic coursework (Data Structures, Algorithms, OS, DBMS) with hands-on full-stack development and team software lifecycle management.",
    outcome: "Maintained strong academic performance (CGPA 7.4) while concurrently building production applications and mentoring student developers.",
    techStack: ["Data Structures", "Algorithms", "DBMS", "OOP", "Python", "C++"],
    type: "education"
  }
];
