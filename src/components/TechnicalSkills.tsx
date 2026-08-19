'use client';

import { Section } from './ui/layout/Section';
import { Reveal } from './ui/motion/Reveal';
import styles from './TechnicalSkills.module.css';

export interface SkillItem {
  name: string;
  focus: string;
  isPrimary?: boolean;
}

export interface DomainCategory {
  id: string;
  number: string;
  title: string;
  summary: string;
  skills: SkillItem[];
}

const domainsData: DomainCategory[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Engineering",
    summary: "Designing scalable component systems with reusable architecture, predictable state management, and performance-first rendering.",
    skills: [
      { name: "React.js", focus: "Component architecture, hooks lifecycle, and client state orchestration", isPrimary: true },
      { name: "JavaScript (ES6+)", focus: "Core language logic, async/await, Promises, and DOM manipulation", isPrimary: true },
      { name: "TypeScript", focus: "Static type contracts, strict interface bounds, and refactoring safety", isPrimary: true },
      { name: "Tailwind CSS", focus: "Utility-first design tokens, responsive layouts, and design system integration", isPrimary: false },
      { name: "HTML5 & Semantics", focus: "Accessible DOM structures, semantic landmarks, and screen reader compatibility", isPrimary: false },
    ]
  },
  {
    id: "backend",
    number: "02",
    title: "Backend Engineering",
    summary: "Architecting RESTful API controllers, middleware execution pipelines, and production server runtimes.",
    skills: [
      { name: "Node.js", focus: "Asynchronous event loops, non-blocking I/O, and server runtime execution", isPrimary: true },
      { name: "Express.js", focus: "RESTful route handlers, request validation, and modular controller layers", isPrimary: true },
      { name: "Python", focus: " ", isPrimary: true },
      { name: "JWT & Session Security", focus: "Stateless token verification, HTTP-only cookie transport, and RBAC guards", isPrimary: true },
      { name: "Request Validation", focus: "Payload sanitization, schema validation, and structured exception handling", isPrimary: false },
      { name: "Service Architecture", focus: "Decoupling business logic into reusable service layers and clean modules", isPrimary: false }
    ]
  },
  {
    id: "database",
    number: "03",
    title: "Database Engineering",
    summary: "Modeling relational & document data schemas, index execution strategies, and query latency reduction.",
    skills: [
      { name: "PostgreSQL", focus: "Relational entity schemas, foreign key constraints, and SQL query optimization", isPrimary: true },
      { name: "SQL & Relational DBs", focus: "Structured query design, joins, transaction management, and schema indexing", isPrimary: true },
      { name: "MongoDB", focus: "Document data modeling, schema indexing, and aggregation pipelines", isPrimary: true },
      { name: "Supabase & RLS", focus: "Postgres BaaS, database Row-Level Security policies, and real-time triggers", isPrimary: false },
      { name: "Schema Normalization", focus: "Data integrity rules, relationship mapping, and database consistency", isPrimary: false }
    ]
  },
  {
    id: "ai-realtime",
    number: "04",
    title: "AI & Realtime Engineering",
    summary: "Building bidirectional WebSocket connections, event-driven UI updates, and modern AI API integrations.",
    skills: [
      { name: "Socket.IO & WebSockets", focus: "Room-based event dispatching, persistent connections, and low-latency chat routing", isPrimary: false },
      { name: "Stream Video SDK & WebRTC", focus: "Peer connection signaling, audio/video channels, and stream lifecycle management", isPrimary: false },
      { name: "OpenAI API & AI SDK", focus: "Integrating LLM endpoints, prompt architecture, and structured output parsing", isPrimary: false },
      { name: "Supabase Realtime", focus: "Database change notifications, client subscriptions, and event synchronization", isPrimary: false }
    ]
  },
  {
    id: "engineering",
    number: "05",
    title: "Software Engineering & Quality",
    summary: "Applying clean architecture principles, version control discipline, and systematic software diagnostics.",
    skills: [
      { name: "Git & Branching Workflows", focus: "Atomic commit strategies, pull request reviews, and version control discipline", isPrimary: false },
      { name: "Clean Architecture", focus: "Separation of concerns, modular dependency isolation, and maintainable software patterns", isPrimary: false },
      { name: "Debugging & Diagnostics", focus: "Root-cause analysis, network payload inspection, and server execution tracing", isPrimary: false },
      { name: "Developer Tooling", focus: "Vercel deployments, Render cloud hosting, Postman API collections, and agentic workflows", isPrimary: false }
    ]
  },
  {
    id: "learning",
    number: "06",
    title: "Currently Exploring",
    summary: "Actively deepening expertise in infrastructure automation, containerized runtimes, and system architecture.",
    skills: [
      { name: "DevOps & MLOps", focus: "Containerized deployments, CI/CD automation, infrastructure management, and scalable ML workflow orchestration.", isPrimary: false },
      { name: "Docker & Containerization", focus: "Isolated container environments, multi-container setups, and reproducible builds", isPrimary: false },
      { name: "AWS Cloud Services", focus: "Exploring S3 asset storage, EC2 instances, and cloud security IAM policies", isPrimary: false },
      { name: "CI/CD & Automated Testing", focus: "Building automated release pipelines, integration verification, and test runners", isPrimary: false }
    ]
  }
];

const growthJourneySteps = [
  "Python",
  "MERN Stack",
  "Full Stack"
];

export function TechnicalSkills() {
  return (
    <Section id="skills">
      <Reveal>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>02 / TECHNICAL EXPERTISE</span>
          <h2 className={styles.title}>Software Engineering Expertise</h2>
          <p className={styles.subtitle}>
            A structured breakdown of core engineering capabilities, production technologies, database architectures, and ongoing learning trajectory — built for long-term scalability and maintainability.
          </p>
        </div>
      </Reveal>

      {/* Design-System Engineering Callout */}
      <Reveal delay={80} animation="fade-up">
        <div className={styles.philosophyCallout}>
          <div className={styles.calloutBadgeRow}>
            <svg className={styles.calloutIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.calloutLabel}>ENGINEERING PHILOSOPHY</span>
          </div>
          <p className={styles.calloutText}>
            I focus on writing maintainable software, designing scalable architectures, and continuously improving engineering craftsmanship instead of chasing every new framework.
          </p>
        </div>
      </Reveal>

      {/* Engineering Status Panel */}
      <Reveal delay={120} animation="fade-up">
        <div className={styles.statusPanel}>
          <div className={styles.statusGroup}>
            <span className={styles.statusGroupLabel}>PRIMARY PRODUCTION STACK</span>
            <div className={styles.statusPills}>
              <span className={`${styles.statusPill} ${styles.primaryStackPill}`}>React.js</span>
              <span className={`${styles.statusPill} ${styles.primaryStackPill}`}>Node.js</span>
              <span className={`${styles.statusPill} ${styles.primaryStackPill}`}>Express.js</span>
              <span className={`${styles.statusPill} ${styles.primaryStackPill}`}>Python</span>
              <span className={`${styles.statusPill} ${styles.primaryStackPill}`}>MongoDB</span>
              <span className={`${styles.statusPill} ${styles.primaryStackPill}`}>SQL</span>
            </div>
          </div>

          <div className={styles.statusDivider} aria-hidden="true" />

          <div className={styles.statusGroup}>
            <span className={styles.statusGroupLabel}>CURRENTLY EXPLORING</span>
            <div className={styles.statusPills}>
              <span className={`${styles.statusPill} ${styles.exploringPill}`}>Docker</span>
              <span className={`${styles.statusPill} ${styles.exploringPill}`}>DevOps</span>
              <span className={`${styles.statusPill} ${styles.exploringPill}`}>System Design</span>
              <span className={`${styles.statusPill} ${styles.exploringPill}`}>CI/CD</span>
              <span className={`${styles.statusPill} ${styles.exploringPill}`}>MLOps</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Domains Grid */}
      <div className={styles.grid}>
        {domainsData.map((domain, idx) => (
          <Reveal key={domain.id} delay={idx * 40} animation="fade-up" className={styles.gridItem}>
            <div className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <span className={styles.domainNumber}>{domain.number}</span>
                <div className={styles.titleGroup}>
                  <h3 className={styles.categoryTitle}>{domain.title}</h3>
                </div>
              </div>

              <div className={styles.skillsList}>
                {domain.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className={`${styles.skillRow} ${skill.isPrimary ? styles.skillPrimaryRow : ''}`}
                  >
                    <span 
                      className={`${styles.skillBullet} ${skill.isPrimary ? styles.primaryBullet : ''}`} 
                      aria-hidden="true" 
                    />
                    <div className={styles.skillContent}>
                      <div className={styles.skillHeaderRow}>
                        <span className={`${styles.skillName} ${skill.isPrimary ? styles.primarySkillName : ''}`}>
                          {skill.name}
                        </span>
                        {skill.isPrimary && (
                          <span className={styles.coreTag}>Core</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Engineering Growth Progression Container (Placed Below Skills Grid) */}
      <Reveal delay={140} animation="fade-up">
        <div className={styles.progressionSection}>
          <div className={styles.progressionHeader}>
            <span className={styles.progressionTitle}>ENGINEERING GROWTH PROGRESSION</span>
          </div>
          <div className={styles.progressionBar} role="list">
            {growthJourneySteps.map((step, idx) => (
              <div key={idx} className={styles.progressionStep} role="listitem">
                <span className={styles.stepDot} aria-hidden="true" />
                <span className={styles.stepText}>{step}</span>
                {idx < growthJourneySteps.length - 1 && (
                  <svg 
                    className={styles.stepArrowIcon} 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}


