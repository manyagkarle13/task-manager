import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        {/* Decorative dots */}
        <div style={{...styles.dot, top: 40, left: 60, background: '#7c3aed'}} />
        <div style={{...styles.dot, top: 160, left: 30, background: '#f97316', width: 12, height: 12}} />
        <div style={{...styles.dot, bottom: 120, right: 200, background: '#7c3aed'}} />

        {/* Left: illustration placeholder */}
        <div style={styles.left}>
          <div style={styles.illustrationWrap}>
            <svg width="220" height="240" viewBox="0 0 220 240" fill="none">
              {/* scroll body */}
              <rect x="30" y="30" width="160" height="180" rx="20" fill="#4DD0E1" />
              <rect x="30" y="30" width="160" height="40" rx="20" fill="#26C6DA" />
              {/* lines */}
              <rect x="60" y="90" width="100" height="14" rx="7" fill="#F6A623" />
              <rect x="60" y="115" width="100" height="14" rx="7" fill="#F6A623" />
              <rect x="60" y="140" width="80" height="14" rx="7" fill="#F6A623" />
              {/* circle check */}
              <circle cx="95" cy="185" r="28" fill="#F6A623" />
              <polyline points="82,185 92,195 112,172" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* purple curl */}
              <ellipse cx="55" cy="195" rx="30" ry="35" fill="#9C27B0" opacity="0.85" />
            </svg>
          </div>
        </div>

        {/* Right: content */}
        <div style={styles.right}>
          <div style={styles.badge}>MAINTAIN | PLAN | ACHIEVE</div>
          <h1 style={styles.heading}>
            Turn your tasks<br />into a simple,<br />powerful{' '}
            <span style={styles.highlight}>routine.</span>
          </h1>
          <p style={styles.sub}>
            Stay organized, build better habits, and get things done one task at a time.
            A cleaner experience, a real calendar, and a proper history view.
          </p>
          <div style={styles.chips}>
            {['Simple', 'Organized', 'Effective'].map(c => (
              <span key={c} style={styles.chip}>{c}</span>
            ))}
          </div>
          <button style={styles.cta} onClick={() => navigate('/dashboard')}>
            Get started &nbsp;-&gt;
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  outer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    background: 'white',
    borderRadius: '32px',
    maxWidth: '900px',
    width: '100%',
    padding: '60px 48px',
    display: 'flex',
    alignItems: 'center',
    gap: '48px',
    position: 'relative',
    boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
  },
  dot: { position: 'absolute', width: 16, height: 16, borderRadius: '50%' },
  left: { flex: '0 0 auto' },
  illustrationWrap: {
    width: 240,
    height: 260,
    background: 'radial-gradient(circle, #f3e8ff 0%, #fce4ec 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: { flex: 1 },
  badge: {
    display: 'inline-block',
    background: '#f3e8ff',
    color: '#6d28d9',
    borderRadius: '999px',
    padding: '6px 18px',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.05em',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '2.6rem',
    fontWeight: 800,
    lineHeight: 1.15,
    color: '#1a1a2e',
    marginBottom: '16px',
  },
  highlight: {
    color: '#f97316',
    fontStyle: 'italic',
  },
  sub: {
    color: '#555',
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '24px',
  },
  chips: { display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' },
  chip: {
    border: '1.5px solid #ccc',
    borderRadius: '999px',
    padding: '6px 18px',
    fontSize: '14px',
    color: '#444',
    background: 'white',
  },
  cta: {
    background: 'linear-gradient(90deg, #7c3aed, #f97316)',
    color: 'white',
    borderRadius: '999px',
    padding: '14px 40px',
    fontSize: '1rem',
    fontWeight: 600,
    width: '100%',
    maxWidth: '340px',
    display: 'block',
    transition: 'opacity 0.2s',
  },
}
