'use client';

import {
  HomeIcon,
  FolderIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { type ComponentType, type SVGProps } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', icon: HomeIcon },
  { label: 'Recent Projects', href: '#projects', icon: FolderIcon },
  { label: 'Work Experience', href: '#experience', icon: BriefcaseIcon },
  { label: 'Languages', href: '#languages', icon: CodeBracketIcon },
  { label: 'Contact', href: '#contact', icon: EnvelopeIcon },
];

export default function Nav() {
  return (
    <nav
      className="bg-surface-sunken mx-auto w-80 rounded-md px-4 py-2"
      aria-label="Main navigation"
    >
      <ul className="flex items-center justify-between">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <li key={href} className="group relative">
            <a
              className="hover:text-primary block transition-colors"
              href={href}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
            {/* Tooltip */}
            <span className="bg-surface text-fg duration-default pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
