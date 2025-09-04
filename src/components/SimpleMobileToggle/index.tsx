import React from 'react';
import './styles.css';

interface SimpleMobileToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function SimpleMobileToggle({ isOpen, onClick }: SimpleMobileToggleProps) {
  return (
    <button
      className={`simple-mobile-toggle ${isOpen ? 'simple-mobile-toggle--open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? '关闭导航菜单' : '打开导航菜单'}
      aria-expanded={isOpen}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {isOpen ? (
          // X 图标
          <>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </>
        ) : (
          // 汉堡菜单图标
          <>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </>
        )}
      </svg>
    </button>
  );
}
