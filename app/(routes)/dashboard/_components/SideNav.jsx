"use client";
import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, MenuIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

function SideNav() {
  const router = useRouter();
  const path = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ];

  return (
    <div className="flex h-full">
      <div 
        className={`relative h-screen border-r bg-white transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-6 hidden md:flex h-8 w-8 rounded-full bg-white border shadow-sm z-50"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>

        {/* Logo Section */}
        <div className={`p-5 ${isCollapsed ? 'flex justify-center' : ''}`}>
          {isCollapsed ? (
            <img
              src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          ) : (
            <img
              src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900"
              alt="logo"
              width={160}
              height={100}
              className="object-contain"
            />
          )}
        </div>

        {/* Menu Items */}
        <div className="mt-5">
          {menuList.map((menu) => {
            const isActive = path === menu.path;
            const IconComponent = menu.icon;

            return (
              <div
                key={menu.id}
                onClick={() => router.push(menu.path)}
                className={`
                  flex items-center 
                  ${isCollapsed ? 'justify-center px-2' : 'gap-2 px-5'} 
                  py-4 cursor-pointer
                  transition-all duration-200 ease-in-out
                  hover:bg-gray-100 hover:text-blue-600
                  ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}
                `}
                title={isCollapsed ? menu.name : ''}
              >
                <IconComponent className={isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} />
                {!isCollapsed && <span className="font-medium">{menu.name}</span>}
              </div>
            );
          })}
        </div>

        {/* Profile Section */}
        <div 
          className={`
            absolute bottom-0 left-0 right-0 
            border-t bg-white
            ${isCollapsed ? 'p-2' : 'p-5'} 
            flex items-center gap-2
          `}
        >
          <UserButton />
          {!isCollapsed && <span className="font-medium">Profile</span>}
        </div>
      </div>
    </div>
  );
}

export default SideNav;