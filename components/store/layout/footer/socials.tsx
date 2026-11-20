"use client";

import { SocialLogo } from "social-logos";

const socials = [
  { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
  { icon: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/" },
  { icon: "behance", label: "Behance", href: "https://www.behance.net/" },
] as const;

export default function BrandSocials() {
  return (
    <ul className="flex flex-wrap gap-4">
      {socials.map((social) => (
        <li key={social.icon}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="group inline-flex size-10 items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] text-white transition-colors duration-300 hover:bg-white ease-in-out focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary-darker focus-visible:outline-none">
            <SocialLogo
              icon={social.icon}
              size={24}
              fill="currentColor"
              className="transition-colors duration-300 group-hover:text-brand"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
