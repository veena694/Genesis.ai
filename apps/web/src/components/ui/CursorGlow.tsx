'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="glow-cursor"
      style={{
        transform: `translate(${position.x - 400}px, ${position.y - 400}px)`,
        background: 'radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, transparent 70%)'
      }}
    />
  );
}
