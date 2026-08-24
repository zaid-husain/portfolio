'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileMenu } from './MobileMenu';
import styles from './GlobalHeader.module.css';
import { SEO } from '../../data/seo.constants';

interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about', sectionId: 'about' },
  { label: 'Projects', href: '/projects', sectionId: 'work' },
  { label: 'Skills', href: '/#skills', sectionId: 'skills' },
  { label: 'Experience', href: '/experience', sectionId: 'experience' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];

export function GlobalHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll listener for sticky compact transition and hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);

      // Hide on rapid scroll down, show immediately on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Active section observer on homepage
  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const sectionIds = ['about', 'skills', 'work', 'experience', 'contact'];
    const observers: IntersectionObserver[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (pathname === '/' && item.sectionId) {
      const targetElement = document.getElementById(item.sectionId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname]);

  const isItemActive = (item: NavItem) => {
    if (pathname === '/') {
      return activeSection === item.sectionId;
    }
    return pathname === item.href;
  };

  return (
    <>
      <header 
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}
        role="banner"
      >
        <div className={styles.container}>
          {/* Brand Logo */}
          <Link 
            href="/" 
            className={styles.logo}
            aria-label={`${SEO.PERSON_NAME} Portfolio Home`}
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className={styles.logoText}>ZH.</span>
          </Link>

          {/* Desktop Navigation & Actions */}
          <div className={styles.desktopGroup}>
            <nav className={styles.desktopNav} aria-label="Primary Navigation">
              <ul className={styles.navList}>
                {NAV_ITEMS.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <li key={item.label}>
                      <Link 
                        href={pathname === '/' && item.sectionId ? `/#${item.sectionId}` : item.href}
                        className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                        onClick={(e) => handleNavClick(e, item)}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Resume Pill CTA Button */}
            <a 
              href="/resume.png" 
              className={styles.resumeButton}
              aria-label="View Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Resume</span>
              <svg 
                className={styles.resumeIcon} 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
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

