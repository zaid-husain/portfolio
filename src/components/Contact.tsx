'use client';

import { useState } from 'react';
import { Section } from './ui/layout/Section';
import styles from './Contact.module.css';

export function Contact() {
  const [showPhone, setShowPhone] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const email = "zaidquazi412@gmail.com";
  const phone = "+91 93099 38127";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone.replace(/\s+/g, ''));
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  return (
    <Section id="contact" className={styles.contactSection} hasBorder={false} aria-label="Contact Section">
      <div className={styles.container}>
        
        <div className={styles.centerHeader}>
          <h2 className={styles.heroHeading}>
            Let&apos;s Build<br />
            Scalable Software<br />
            Together.
          </h2>
          <p className={styles.heroSubtitle}>
            Open to Full-Time Software Engineering opportunities.<br />
            Always excited to collaborate on meaningful products.
          </p>
        </div>

        <div className={styles.cardContainer}>
          {/* Premium Email Contact Card */}
          <div className={styles.contactCard}>
            <div>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className={styles.cardLabel}>EMAIL</span>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.contactDetail}>{email}</p>
                <p className={styles.helperText}>Usually replies within 24 hours.</p>
              </div>
            </div>

            <div>
              <div className={styles.cardDivider} aria-hidden="true" />
              <div className={styles.cardActions}>
                <a href={`mailto:${email}`} className={styles.primaryButton} aria-label="Start Conversation">
                  Start Conversation
                </a>
                <button 
                  onClick={handleCopyEmail} 
                  className={styles.secondaryButton}
                  aria-label="Copy email to clipboard"
                  aria-live="polite"
                >
                  {emailCopied ? 'Copied ✓' : 'Copy Email'}
                </button>
              </div>
            </div>
          </div>

          {/* Premium Phone Contact Card */}
          <div className={styles.contactCard}>
            <div>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className={styles.cardLabel}>PHONE</span>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.contactDetail} aria-live="polite">
                  {showPhone ? phone : "+91 93099 •••••"}
                </p>
                <p className={styles.helperText}>Available for technical interviews.</p>
              </div>
            </div>

            <div>
              <div className={styles.cardDivider} aria-hidden="true" />
              <div className={styles.cardActions}>
                {showPhone ? (
                  <>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className={styles.primaryButton} aria-label="Call phone number">
                      Call Now
                    </a>
                    <button 
                      onClick={handleCopyPhone} 
                      className={styles.secondaryButton}
                      aria-label="Copy phone number"
                      aria-live="polite"
                    >
                      {phoneCopied ? 'Copied ✓' : 'Copy Number'}
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setShowPhone(true)} 
                    className={styles.revealButton}
                    aria-label="Reveal phone number"
                  >
                    Reveal Number
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
