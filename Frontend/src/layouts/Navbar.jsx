import { WalletIcon } from 'lucide-react';
import React from 'react';
import NavItems from './config/navigation';
import { NavLink } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserMenu from '@/modules/user/components/UserMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Navbar = () => {
  return (
    <div className='w-full py-4'>
    <div className='mx-auto max-w-7xl rounded-xl border bg-background px-6 py-3 shadow-sm'>
      <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <WalletIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Weft</span>
          </div>

          <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-6">
            <Tabs defaultValue="home" className="w-fit">
              <TabsList className="grid w-fit grid-cols-5">
                {NavItems.map((item) => (
                  <TabsTrigger key={item.title} value={item.title.toLowerCase()} asChild>
                    <NavLink to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </nav> 

          {/* <Notifications />
          <HelpPage /> */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <UserMenu />
          </div>

      </div>
    </div>
  </div>
  );
}

export default Navbar;
