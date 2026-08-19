'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../ui/layout/Section';
import { Reveal } from '../ui/motion/Reveal';
import styles from './ProjectsSection.module.css';
import { projects } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'flagship' | 'realtime' | 'community'>('all');

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pathD, setPathD] = useState('');
  const [connectorsD, setConnectorsD] = useState<string[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter === 'flagship') return project.isFlagship;
      if (activeFilter === 'realtime') return project.slug === 'zashly';
      if (activeFilter === 'community') return project.slug === 'home-town-hub';
      return true;
    });
  }, [activeFilter]);

  const updateSvgPaths = React.useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;

    const points: { x: number; y: number }[] = [];
    const newConnectors: string[] = [];

    filteredProjects.forEach((_, idx) => {
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
          const cy = cardRect.top + 32 - containerRect.top;

          const midX = nx + (cx - nx) * 0.5;
          const connectorPath = `M ${nx} ${ny} C ${midX} ${ny}, ${midX} ${cy}, ${cx} ${cy}`;
          newConnectors.push(connectorPath);
        } else {
          newConnectors.push('');
        }
      }
    });

    if (points.length > 0) {
      let mainD = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const midY = (p1.y + p2.y) / 2;
        
        const curveOffset = isMobile ? 0 : (i % 2 === 0 ? 18 : -18);
        const cp1x = p1.x + curveOffset;
        const cp2x = p2.x + curveOffset;

        mainD += ` C ${cp1x} ${midY}, ${cp2x} ${midY}, ${p2.x} ${p2.y}`;
      }
      setPathD(mainD);
      setConnectorsD(newConnectors);
    } else {
      setPathD('');
      setConnectorsD([]);
    }
  }, [filteredProjects]);

  useEffect(() => {
    const handleResize = () => updateSvgPaths();
    const timer = setTimeout(handleResize, 50);
    window.addEventListener('resize', handleResize);
    
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
  }, [updateSvgPaths]);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = rect.top - windowHeight * 0.7;
      const total = rect.height;
      const current = -start;
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);

      let closestIdx = 0;
      let minDistance = Infinity;
      const viewportCenter = windowHeight / 2;

      nodeRefs.current.slice(0, filteredProjects.length).forEach((nodeEl, idx) => {
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredProjects.length]);

  const dashOffset = pathLength ? pathLength * (1 - scrollProgress) : 0;

  return (
    <Section id="work" className={styles.sectionWrapper}>
      {/* Background Animated Gradient & Grid Overlay */}
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      {/* Section Header */}
      <Reveal>
        <div className={styles.sectionHeader}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeDot} />
            <span>Featured Engineering Work</span>
          </div>

          <h2 className={styles.sectionTitle}>
            Production Software &<br />
            Architectural Systems.
          </h2>

          <p className={styles.sectionSubtitle}>
            A curated showcase of production-ready full-stack applications, real-time engines, and distributed backend solutions built with modern software architecture principles.
          </p>

          {/* Interactive Filter / Quick Jump Tabs */}
          <div className={styles.filterTabs}>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`${styles.filterTab} ${activeFilter === 'all' ? styles.filterTabActive : ''}`}
            >
              All Systems ({projects.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('flagship')}
              className={`${styles.filterTab} ${activeFilter === 'flagship' ? styles.filterTabActive : ''}`}
            >
              Flagship AI Platform
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('realtime')}
              className={`${styles.filterTab} ${activeFilter === 'realtime' ? styles.filterTabActive : ''}`}
            >
              Real-Time WebSockets
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('community')}
              className={`${styles.filterTab} ${activeFilter === 'community' ? styles.filterTabActive : ''}`}
            >
              Local Discovery Hub
            </button>
          </div>
        </div>
      </Reveal>

      {/* Project Cards with Timeline Path */}
      <div className={styles.timelinePath} ref={containerRef}>
        <svg className={styles.svgCanvas} aria-hidden="true">
          <defs>
            <linearGradient id="projectGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--border-strong)" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="var(--border-strong)" />
            </linearGradient>
          </defs>
          
          {pathD && (
            <path
              d={pathD}
              fill="none"
              className={styles.bgPath}
            />
          )}
          
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

        {filteredProjects.map((project, index) => {
          const isActive = index === activeIndex;
          
          return (
          <div key={project.slug} className={`${styles.timelineItem} ${isActive ? styles.itemActive : ''}`}>
            <div 
              ref={(el) => { nodeRefs.current[index] = el; }}
              className={`${styles.timelineNode} ${isActive ? styles.nodeActive : ''}`} 
              aria-hidden="true"
            >
              <div className={styles.timelineNodeInner}>
                {String(index + 1).padStart(2, '0')}
              </div>
              {project.isFlagship && <div className={styles.timelineNodeRing} />}
            </div>

            <Reveal delay={index * 120} animation="fade-up">
              <div 
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`${styles.timelineCardWrapper} ${isActive ? styles.cardActive : ''}`}
              >
                <ProjectCard project={project} />
              </div>
            </Reveal>
          </div>
        )})}
      </div>

    </Section>
  );
}

