import Link from 'next/link';
import styles from './GlobalFooter.module.css';
import { SEO } from '../../data/seo.constants';

export function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Global Footer">
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Left Column: Brand & Engineering Bio */}
          <div className={styles.brandColumn}>
            <div className={styles.brandHeader}>
              <h2 className={styles.brandName}>{SEO.PERSON_NAME}</h2>
              <div className={styles.statusPill} aria-label="Current Availability">
                <span className={styles.statusDot} aria-hidden="true" />
                <span>Available for Full-Time Roles</span>
              </div>
            </div>
            <p className={styles.bioText}>
              {SEO.JOB_TITLE} crafting performant web applications with clean architecture and intentional user experiences.
            </p>
          </div>

          {/* Navigation Columns Group */}
          <div className={styles.navGroup}>
            {/* Navigation Column */}
            <nav className={styles.navColumn} aria-label="Footer Navigation">
              <h3 className={styles.columnTitle}>Navigation</h3>
              <ul className={styles.linkList}>
                <li><Link href="/about" className={styles.footerLink}>About</Link></li>
                <li><Link href="/projects" className={styles.footerLink}>Projects</Link></li>
                <li><Link href="/experience" className={styles.footerLink}>Experience</Link></li>
                <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
                <li>
                  <a href={SEO.RESUME_URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                    Resume <span className={styles.arrow} aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Projects Column */}
            <nav className={styles.navColumn} aria-label="Projects">
              <h3 className={styles.columnTitle}>Projects</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href={SEO.PROJECTS.ZASHLY.URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                    Zashly <span className={styles.arrow} aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a href={SEO.PROJECTS.ZASHIO.URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                    Zashio <span className={styles.arrow} aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a href={SEO.PROJECTS.ZASHUB.URL} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                    Zashub <span className={styles.arrow} aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Connect Column */}
            <nav className={styles.navColumn} aria-label="Social Links">
              <h3 className={styles.columnTitle}>Connect</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href={SEO.SOCIAL.GITHUB} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                    GitHub <span className={styles.arrow} aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a href={SEO.SOCIAL.LINKEDIN} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                    LinkedIn <span className={styles.arrow} aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:zaidquazi412@gmail.com" className={styles.footerLink}>
                    Email
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className={styles.bottomSection}>
          <p className={styles.designedBy}>Designed &amp; Developed by {SEO.PERSON_NAME}</p>
          <div className={styles.metaInfo}>
            <span className={styles.copyright}>© {currentYear}</span>
            <span className={styles.dotSeparator} aria-hidden="true">•</span>
            <span className={styles.version}>{SEO.JOB_TITLE} · {SEO.LOCATION.country}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
