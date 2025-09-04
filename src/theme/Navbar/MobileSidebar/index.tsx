import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import MobileNavigation from '../../../components/MobileNavigation';

export default function NavbarMobileSidebar() {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <MobileNavigation
      isOpen={mobileSidebar.shown}
      onClose={mobileSidebar.toggle}
    />
  );
}
