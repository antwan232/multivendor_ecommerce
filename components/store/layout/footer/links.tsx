import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { getStorefrontCategories } from "@/actions/category";
import Reveal from "@/components/shared/reveal";

type FooterItem = {
  label: string;
  href: string;
};

type FooterColumnProps = {
  id: string;
  title: string;
  delay: number;
  items: FooterItem[];
};

function FooterColumn({ id, title, delay, items }: FooterColumnProps) {
  return (
    <section
      aria-labelledby={id}
      className="col-span-12 min-w-0 md:col-span-6 xl:col-span-2">
      <Reveal delay={delay}>
        <h3
          id={id}
          className="border-b border-[rgba(145,158,171,0.24)] pb-6 text-base leading-6 font-normal text-primary-lighter">
          {title}
        </h3>
        <ul className="flex flex-col gap-y-2 pt-4">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group flex items-center gap-x-2 rounded-sm py-1.5 min-w-0 text-base leading-6 font-normal text-primary-lighter transition-colors duration-300 ease-in-out hover:text-white focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary-darker focus-visible:outline-none">
                <ChevronRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary-lighter/70 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-white"
                />
                <span className="min-w-0 truncate transition-all duration-300 ease-in-out group-hover:translate-x-0.5">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export default function Links({
  categories,
}: {
  categories: { name: string; url: string }[];
}) {
  const categoryItems: FooterItem[] = categories.slice(0, 6).map((category) => ({
    label: category.name,
    href: `/browse?category=${encodeURIComponent(category.url)}`,
  }));

  return (
    <>
      <FooterColumn
        id="footer-about"
        title="About"
        delay={0.3}
        items={aboutLinks}
      />
      <FooterColumn
        id="footer-my-account"
        title="My Account"
        delay={0.4}
        items={accountLinks}
      />
      <FooterColumn
        id="footer-categories"
        title="Categories"
        delay={0.5}
        items={categoryItems}
      />
    </>
  );
}

const aboutLinks: FooterItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Careers", href: "#" },
  { label: "Latest News", href: "#" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
];

const accountLinks: FooterItem[] = [
  { label: "Your Account", href: "/profile" },
  { label: "Return Policies", href: "/returns-exchange" },
  { label: "Become a Vendor", href: "#" },
  { label: "Wishlist", href: "/profile/wishlist" },
  { label: "Affiliate Program", href: "#" },
  { label: "FAQs", href: "/faqs" },
];

