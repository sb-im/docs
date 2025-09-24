import React from 'react';
import NavbarContent from '@theme-original/Navbar/Content';
import SearchBar from '@site/src/components/SearchBar';

export default function NavbarContentWrapper(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <NavbarContent {...props} />
      <div 
        style={{
          marginLeft: 'auto',
          marginRight: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
        className="navbar-search-wrapper"
      >
        <SearchBar placeholder="搜索文档..." />
      </div>
      <style>{`
        .navbar-search-wrapper {
          max-width: 250px;
        }
        
        @media (max-width: 996px) {
          .navbar-search-wrapper {
            display: none !important;
          }
        }
        
        @media (max-width: 1200px) {
          .navbar-search-wrapper {
            max-width: 200px;
          }
        }
        
        .navbar__items {
          flex-wrap: nowrap;
        }
        
        .navbar__items--right {
          margin-left: 0;
        }
      `}</style>
    </div>
  );
}
