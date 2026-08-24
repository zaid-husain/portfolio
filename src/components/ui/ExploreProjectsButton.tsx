'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import styles from './ExploreProjectsButton.module.css';

interface ExploreProjectsButtonProps {
  href: string;
  className?: string;
}

export function ExploreProjectsButton({ href, className }: ExploreProjectsButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    buttonRef.current.style.setProperty('--mouse-x', `${x}px`);
    buttonRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Link 
      href={href} 
      className={`${styles.button} ${className || ''}`}
      aria-label="Explore Projects"
      ref={buttonRef}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.glow} aria-hidden="true" />
      <span className={styles.text}>Explore Projects</span>
      <span className={styles.iconWrapper} aria-hidden="true">
        <svg 
          className={styles.icon} 
          width="17" 
          height="17" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </span>
    </Link>
  );
}
