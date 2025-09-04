import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import MobileNavToggle from '../../../../components/MobileNavToggle';

export default function MobileSidebarToggle() {
  const mobileSidebar = useNavbarMobileSidebar();
  
  return (
    // <MobileNavToggle
    //   isOpen={mobileSidebar.shown}
    //   onClick={mobileSidebar.toggle}
    // />
      <div/>
  );
}
