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
    <nav aria-label="Main navigation">
      <ul>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <li key={href}>
            <a href={href}>
              <Icon aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
