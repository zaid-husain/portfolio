'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCommandPaletteShortcut } from '../../hooks/useCommandPaletteShortcut';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { SEO } from '../../data/seo.constants';
import styles from './CommandPalette.module.css';

interface Command {
  id: string;
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const containerRef = useFocusTrap(isOpen);
  useLockBodyScroll(isOpen);

  useCommandPaletteShortcut(() => setIsOpen(prev => !prev));

  // Custom event listener for the button in the header
  useEffect(() => {
    const customToggle = () => setIsOpen(true);
    document.addEventListener('open-command-palette', customToggle);
    
    return () => {
      document.removeEventListener('open-command-palette', customToggle);
    };
  }, []);

  const closePalette = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closePalette();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const commands: Command[] = [
    { id: 'about', label: 'Go to About Me', action: () => { router.push('/#about'); closePalette(); } },
    { id: 'skills', label: 'Go to Technical Skills', action: () => { router.push('/#skills'); closePalette(); } },
    { id: 'proj', label: 'Go to Featured Projects', action: () => { router.push('/#work'); closePalette(); } },
    { id: 'exp', label: 'Go to Professional Experience', action: () => { router.push('/#experience'); closePalette(); } },
    { id: 'achievements', label: 'Go to Credentials & Achievements', action: () => { router.push('/#achievements'); closePalette(); } },
    { id: 'contact', label: 'Go to Contact', action: () => { router.push('/#contact'); closePalette(); } },
    { id: 'resume', label: 'Open Resume', action: () => { window.open(SEO.RESUME_URL, '_blank', 'noopener,noreferrer'); closePalette(); } },
    { id: 'github', label: 'Open GitHub Profile', action: () => { window.open('https://github.com/zaidquazi', '_blank'); closePalette(); } },
    { id: 'linkedin', label: 'Open LinkedIn Profile', action: () => { window.open('https://www.linkedin.com/in/zaid-husain-329596257/', '_blank'); closePalette(); } },
    { id: 'email', label: 'Send Email Direct', action: () => { window.open('mailto:zaidquazi412@gmail.com'); closePalette(); } },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} ref={containerRef}>
      <div className={styles.backdrop} onClick={closePalette} aria-hidden="true" />
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Command Palette">
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Type a command or search..." 
            aria-label="Search commands"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <kbd className={styles.escKey}>ESC</kbd>
        </div>
        
        <div className={styles.resultsContainer}>
          {filteredCommands.length > 0 ? (
            <ul className={styles.commandList} role="listbox">
              {filteredCommands.map((cmd) => (
                <li key={cmd.id} role="option" aria-selected={false}>
                  <button 
                    className={styles.commandItem} 
                    onClick={cmd.action}
                  >
                    {cmd.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              <p>No commands found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
