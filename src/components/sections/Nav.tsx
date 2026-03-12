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
      className="bg-surface-sunken relative mx-auto mt-6 max-w-60 rounded-md px-4 py-2"
      aria-label="Main navigation"
    >
      <ul className="flex items-center justify-between">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <li className="h-6 w-6" key={href}>
            <a className="block" href={href}>
              <Icon aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
