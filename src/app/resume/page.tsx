import type { Metadata } from "next";
import { AboutMe } from "../../components/AboutMe";
import { TechnicalSkills } from "../../components/TechnicalSkills";
import { Work } from "../../components/Work";
import { Experience } from "../../components/Experience";
import { Education } from "../../components/Education";
import { Achievements } from "../../components/Achievements";
import { Contact } from "../../components/Contact";
import { Button } from "../../components/ui/Button";
import { SEO } from "../../data/seo.constants";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zaidhusain.me";

export const metadata: Metadata = {
  title: "Zaid Husain | Resume & Full Stack Portfolio",
  description:
    "Professional resume of Zaid Husain — Full Stack Developer specializing in React.js, Node.js, and TypeScript. Download the PDF or view online.",
  alternates: {
    canonical: "/resume",
    languages: { "en-IN": "/resume", "x-default": "/resume" },
  },
  openGraph: {
    type: "profile",
    url: `${BASE_URL}/resume`,
    title: "Resume | Zaid Husain — Full Stack Developer",
    description:
      "Full Stack Developer resume. React.js, Node.js, MERN Stack, TypeScript, MongoDB, PostgreSQL.",
    siteName: "Zaid Husain Portfolio",
    images: [
      {
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Zaid Husain Resume — Full Stack Developer",
      },
    ],
  },
};

const resumePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${BASE_URL}/resume/#profilepage`,
  url: `${BASE_URL}/resume`,
  name: "Resume of Zaid Husain — Full Stack Developer",
  description:
    "Interactive resume and CV of Zaid Husain, Full Stack Developer from Amravati, Maharashtra, India.",
  mainEntity: {
    "@id": `${BASE_URL}/#person`,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resume",
        item: `${BASE_URL}/resume`,
      },
    ],
  },
};

export default function ResumePage() {
  return (
    <main id="main-content" aria-label="Zaid Husain Resume" className={styles.resumeMain}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumePageSchema) }}
      />
      
      {/* Resume Hero & Download Section */}
      <section className={styles.resumeHero} aria-label="Resume Header">
        <div className={styles.resumeHeroContent}>
          <p className={styles.resumeLabel}>Curriculum Vitae</p>
          <h1 className={styles.resumeTitle}>Zaid Husain</h1>
          <p className={styles.resumeSubtitle}>Full Stack Developer</p>
          <div className={styles.resumeActions}>
            <Button href={SEO.RESUME_URL} variant="primary" target="_blank" rel="noopener noreferrer">
              View / Download Resume
            </Button>
            <Button href="/#contact" variant="secondary">
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* Render existing components to form the full resume visually */}
      <AboutMe />
      <TechnicalSkills />
      <Experience />
      <Work />
      <Education />
      <Achievements />
      <Contact />
    </main>
  );
}
