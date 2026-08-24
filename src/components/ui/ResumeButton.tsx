'use client';

import styles from './ResumeButton.module.css';

export function ResumeButton({ className }: { className?: string }) {
  return (
    <div className={`${styles.splitBtn} ${className || ''}`} role="group" aria-label="Resume options">
      {/* Left half — View */}
      <a
        href="/resume.png"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.half}
        aria-label="View resume in new tab"
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
