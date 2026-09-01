import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch devices (prompt rule: Disable custom cursor on touch devices)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Track interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('.interactive-hover') ||
        target.closest('[role="button"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Center pinpoint dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out rounded-full bg-[#1F74BA]"
        style={{
          width: '6px',
          height: '6px',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      />
      {/* Outer reactive ring with Blue/Gold glow */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border transition-all duration-200 ease-out ${
          isHovered
            ? 'w-10 h-10 border-[#F8D706] bg-[#1F74BA]/10 shadow-[0_0_20px_rgba(248,215,6,0.5)]'
            : 'w-7 h-7 border-[#1F74BA]/50 bg-transparent shadow-[0_0_10px_rgba(31,116,186,0.2)]'
        }`}
        style={{
          transform: `translate3d(${position.x - (isHovered ? 20 : 14)}px, ${
            position.y - (isHovered ? 20 : 14)
          }px, 0)`,
        }}
      />
    </>
  );
};
