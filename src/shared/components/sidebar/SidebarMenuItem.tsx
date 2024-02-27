'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ISidebarMenuItem } from '../../interfaces';
import './SidebarMenuItem.css';

export const SidebarMenuItem: FC<ISidebarMenuItem> = ({
  path,
  icon,
  title,
  subTitle,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`nav-link ${pathname === path ? 'active' : ''}`}
    >
      {icon}
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className="text-sm text-white/50 hidden md:block">
          {subTitle}
        </span>
      </div>
    </Link>
  );
};
