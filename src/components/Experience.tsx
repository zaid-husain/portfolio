'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Section } from './ui/layout/Section';
import { Reveal } from './ui/motion/Reveal';
import styles from './Experience.module.css';
import { journeyMilestones } from '../data/journey';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pathD, setPathD] = useState('');
  const [connectorsD, setConnectorsD] = useState<string[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate SVG path coordinates dynamically based on actual node and card positions
  const updateSvgPaths = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;

    const points: { x: number; y: number }[] = [];
    const newConnectors: string[] = [];

    journeyMilestones.forEach((_, idx) => {
      const nodeEl = nodeRefs.current[idx];
      const cardEl = cardRefs.current[idx];

      if (nodeEl) {
        const nodeRect = nodeEl.getBoundingClientRect();
        const nx = nodeRect.left + nodeRect.width / 2 - containerRect.left;
        const ny = nodeRect.top + nodeRect.height / 2 - containerRect.top;
        points.push({ x: nx, y: ny });

        if (cardEl && !isMobile) {
          const cardRect = cardEl.getBoundingClientRect();
          const cx = cardRect.left - containerRect.left;
          const cy = cardRect.top + 32 - containerRect.top; // Connect to top portion of card

          // Soft Bezier elbow connector from node to card
          const midX = nx + (cx - nx) * 0.5;
          const connectorPath = `M ${nx} ${ny} C ${midX} ${ny}, ${midX} ${cy}, ${cx} ${cy}`;
          newConnectors.push(connectorPath);
        } else {
          newConnectors.push('');
        }
      }
    });

    if (points.length > 0) {
      // Build smooth S-curve main journey path connecting nodes
      let mainD = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const midY = (p1.y + p2.y) / 2;
        
        // Gentle curve sway on desktop
        const curveOffset = isMobile ? 0 : (i % 2 === 0 ? 18 : -18);
        const cp1x = p1.x + curveOffset;
        const cp2x = p2.x + curveOffset;

        mainD += ` C ${cp1x} ${midY}, ${cp2x} ${midY}, ${p2.x} ${p2.y}`;
      }
      setPathD(mainD);
      setConnectorsD(newConnectors);
    }
  };

  useEffect(() => {
    const handleResize = () => updateSvgPaths();
    
    // Initial calculation after a short delay to ensure DOM is painted
    const timer = setTimeout(handleResize, 50);
    
    window.addEventListener('resize', handleResize);
    
    // Watch for content changes that affect layout (e.g. adding/removing milestones)
    let observer: ResizeObserver;
    if (containerRef.current) {
      observer = new ResizeObserver(() => {
        requestAnimationFrame(handleResize);
      });
      observer.observe(containerRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  // Measure SVG main path total length
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
    }
  }, [pathD]);

  // Scroll handler for strokeDashoffset animation and active milestone detection
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Scroll progress along section (0 to 1)
      const start = rect.top - windowHeight * 0.7;
      const total = rect.height;
      const current = -start;
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);

      // Active milestone detection based on node proximity to viewport center
      let closestIdx = 0;
      let minDistance = Infinity;
      const viewportCenter = windowHeight / 2;

      nodeRefs.current.forEach((nodeEl, idx) => {
        if (nodeEl) {
          const nodeRect = nodeEl.getBoundingClientRect();
          const dist = Math.abs(nodeRect.top + nodeRect.height / 2 - viewportCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
      });
      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial trigger
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dashOffset = pathLength ? pathLength * (1 - scrollProgress) : 0;

  return (
    <Section id="experience" aria-label="Engineering Journey">
      <Reveal>
        <div className={styles.header}>
          <span className={styles.sectionBadge}>04 / ENGINEERING JOURNEY</span>
          <h2 className={styles.title}>Engineering Track Record &amp; Career Progression</h2>
          <p className={styles.subtitle}>
            A continuous storytelling timeline mapping foundational learning, production software development, database architecture, and future horizon.
          </p>
        </div>
      </Reveal>

      <div className={styles.journeyContainer} ref={containerRef}>
        {/* Animated SVG Journey Path Canvas */}
        <svg className={styles.svgCanvas} aria-hidden="true">
          <defs>
            <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--border-strong)" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="var(--border-strong)" />
            </linearGradient>
          </defs>

          {/* Background neutral path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              className={styles.bgPath}
            />
          )}

          {/* Animated reveal path */}
          {pathD && (
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              className={styles.drawPath}
              style={{
                strokeDasharray: pathLength || 1000,
                strokeDashoffset: dashOffset
              }}
            />
          )}

          {/* Curved Bezier Card Connectors */}
          {connectorsD.map((cPath, idx) => (
            cPath ? (
              <path
                key={idx}
                d={cPath}
                fill="none"
                className={`${styles.connectorPath} ${idx === activeIndex ? styles.connectorActive : ''}`}
              />
            ) : null
          ))}
        </svg>

        {/* Timeline Milestones */}
        <div className={styles.milestoneList} role="list">
          {journeyMilestones.map((item, index) => {
            const isActive = index === activeIndex;
            const isEducation = item.type === 'education';

            return (
              <div
                key={item.id}
                id={isEducation ? 'education' : undefined}
                className={`${styles.milestoneItem} ${isActive ? styles.itemActive : ''}`}
                role="listitem"
              >
                {/* Node Anchor on Journey Path */}
                <div
                  ref={(el) => { nodeRefs.current[index] = el; }}
                  className={`${styles.nodeWrapper} ${isActive ? styles.nodeActive : ''}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div className={styles.nodeOuterRing}>
                    <div className={styles.nodeInnerDot} />
                  </div>
                  <span className={styles.nodeStageIndex}>{index + 1}</span>
                </div>

                {/* Content Card with Reveal Stagger */}
                <Reveal delay={index * 120} animation="fade-up" className={styles.cardRevealWrapper}>
                  <div
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`${styles.contentCard} ${isActive ? styles.cardActive : ''}`}
                  >
                    {/* Header & Badges */}
                    <div className={styles.cardHeader}>
                      <div className={styles.titleGroup}>
                        <div className={styles.badgeRow}>
                          <span className={styles.stageTag}>{item.stageBadge}</span>
                          <span className={styles.heroBadge}>
                            <span className={`${styles.badgeDot} ${isActive ? styles.dotActive : ''}`} aria-hidden="true" />
                            {item.badgeLabel}
                          </span>
                        </div>
                        <h3 className={styles.roleTitle}>{item.role}</h3>
                        <span className={styles.companyName}>{item.company}</span>
                      </div>
                      <span className={styles.timelinePeriod}>{item.timeline}</span>
                    </div>

                    {/* Technical Narrative: Problem -> Solution -> Engineering Decision -> Outcome */}
                    <div className={styles.narrativeGrid}>
                      <div className={styles.narrativeItem}>
                        <span className={styles.narrativeLabel}>PROBLEM</span>
                        <p className={styles.narrativeText}>{item.problem}</p>
                      </div>

                      <div className={styles.narrativeItem}>
                        <span className={styles.narrativeLabel}>SOLUTION</span>
                        <p className={styles.narrativeText}>{item.solution}</p>
                      </div>

                      <div className={styles.narrativeItem}>
                        <span className={styles.narrativeLabel}>ENGINEERING DECISION</span>
                        <p className={styles.narrativeText}>{item.engineeringDecision}</p>
                      </div>

                      <div className={styles.narrativeItem}>
                        <span className={styles.narrativeLabel}>OUTCOME</span>
                        <p className={styles.narrativeText}>{item.outcome}</p>
                      </div>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className={styles.techStack}>
                      {item.techStack.map((tech, i) => (
                        <span key={i} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
