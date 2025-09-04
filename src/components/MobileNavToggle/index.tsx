import React from 'react';
import './styles.css';

interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileNavToggle({ isOpen, onClick }: MobileNavToggleProps) {
  return (
    <button
      className={`mobile-nav-toggle ${isOpen ? 'mobile-nav-toggle--open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? '关闭导航菜单' : '打开导航菜单'}
      aria-expanded={isOpen}
    >
      <span className="mobile-nav-toggle__line"></span>
      <span className="mobile-nav-toggle__line"></span>
      <span className="mobile-nav-toggle__line"></span>
    </button>
  );
}
