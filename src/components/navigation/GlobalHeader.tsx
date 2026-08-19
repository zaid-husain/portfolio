'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import styles from './GlobalHeader.module.css';
import { SEO } from '../../data/seo.constants';

export function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}>
        <div className={styles.container}>
          <Link 
            href="/" 
            className={styles.logo}
            aria-label={`${SEO.PERSON_NAME} Portfolio Home`}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            ZH.
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary Navigation">
            <ul className={styles.navList}>
              <li><Link href="/about" className={styles.navLink}>About</Link></li>
              <li><Link href="/projects" className={styles.navLink}>Projects</Link></li>
              <li><Link href="/#skills" className={styles.navLink}>Skills</Link></li>
              <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
            </ul>
          </nav>

          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
