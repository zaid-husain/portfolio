'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOBILE_NAV_ITEMS = [
  { label: 'About', href: '/about', sectionId: 'about' },
  { label: 'Projects', href: '/projects', sectionId: 'work' },
  { label: 'Skills', href: '/#skills', sectionId: 'skills' },
  { label: 'Experience', href: '/experience', sectionId: 'experience' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const containerRef = useFocusTrap(isOpen);
  useLockBodyScroll(isOpen);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    if (pathname === '/' && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        e.preventDefault();
        onClose();
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }
    }
    onClose();
  };

  return (
    <div className={styles.overlay} ref={containerRef} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <nav className={styles.menu} aria-label="Mobile Navigation Drawer">
        {/* Drawer Header */}
        <div className={styles.menuHeader}>
          <Link href="/" className={styles.menuLogo} onClick={onClose}>
            ZH.
          </Link>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Nav Links */}
        <ul className={styles.linkList}>
          {MOBILE_NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href || (pathname === '/' && item.sectionId === 'about' && false);
            return (
              <li key={item.label} style={{ animationDelay: `${(index + 1) * 50}ms` }} className={styles.animatedItem}>
                <Link 
                  href={pathname === '/' && item.sectionId ? `/#${item.sectionId}` : item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  onClick={(e) => handleLinkClick(e, item.sectionId)}
                >
                  <span className={styles.itemText}>{item.label}</span>
                  <svg 
                    className={styles.arrowIcon} 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>



        {/* Drawer Footer with Socials */}
        <div className={styles.menuFooter}>
          <div className={styles.socialRow}>
            <a href="https://github.com/zaidquazi" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GitHub ↗
            </a>
            <span className={styles.dot} aria-hidden="true">•</span>
            <a href="https://www.linkedin.com/in/zaid-husain-329596257/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LinkedIn ↗
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
