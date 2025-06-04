import React from 'react';
import NavItems from '@/config/navigation';
import { NavLink, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserMenu from '@/modules/user/components/UserMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ModeToggle } from '@/components/mode-toggle';
import VisibilityWrapper from '@/components/VisibilityWrapper';

const NavbarDesktop = () => {
  const location = useLocation();
  const currentTab = NavItems.find(item => item.url === location.pathname)?.title.toLowerCase();

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6">
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          <Tabs value={currentTab} className="w-fit">
            <TabsList className="inline-flex space-x-6">
              {NavItems.map(item => (
                <TabsTrigger
                  key={item.title}
                  value={item.title.toLowerCase()}
                  asChild
                  className="px-4 py-2"
                >
                  <NavLink to={item.url} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </nav>

        <div className="flex items-center gap-4">
          <VisibilityWrapper showButton />
          <ModeToggle />
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
