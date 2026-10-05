'use client';

import { SEO } from '../../data/seo.constants';
import styles from './ResumeButton.module.css';

export function ResumeButton({ className }: { className?: string }) {
  return (
    <div className={`${styles.splitBtn} ${className || ''}`} role="group" aria-label="Resume options">
      {/* View Resume */}
      <a
        href={SEO.RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.half}
        aria-label="View resume on Google Drive"
      >
        <span className={styles.icon}>
          {/* Eye icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </span>
        <span className={styles.label}>View Resume</span>
        <span className={styles.arrow}>↗</span>
      </a>

    </div>
  );
}
