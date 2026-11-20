import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative z-10 -mb-[100px] mx-auto w-full max-w-[932px] bg-white px-4 pb-[70px] text-center md:px-0 lg:rounded-[164px] lg:pb-6">
      <Image
        src="/assets/images/footer/footer-left-shape.png"
        alt=""
        aria-hidden="true"
        width={145}
        height={100}
        className="pointer-events-none absolute bottom-0 -left-[23px] hidden h-[100px] w-[145px] select-none xl:block"
      />
      <Image
        src="/assets/images/footer/footer-right-shape.png"
        alt=""
        aria-hidden="true"
        width={145}
        height={100}
        className="pointer-events-none absolute right-[-23px] bottom-0 hidden h-[100px] w-[145px] select-none xl:block"
      />

      <h2
        id="newsletter-heading"
        className="mb-4 text-3xl font-semibold text-light-primary-foreground">
        Subscribe to our newsletter
      </h2>
      <p className="mb-6 text-base leading-6 text-light-secondary-foreground/50">
        Stay updated! Subscribe to our mailing list for news, updates, and
        exclusive offers.
      </p>

      <div className="mx-auto flex h-[62px] w-full max-w-[480px] items-center rounded-full border border-line bg-white p-1.5 shadow-sm transition-shadow duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:shadow-md">
        <span
          aria-hidden="true"
          className="flex shrink-0 items-center pr-2 pl-2.5 text-slate-400 sm:pr-3 sm:pl-4">
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 shrink-0"
            aria-hidden="true">
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect
              x="2"
              y="4"
              width="20"
              height="16"
              rx="2"
            />
          </svg>
        </span>
        <label
          htmlFor="newsletter-email"
          className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          className="h-12 min-w-0 flex-1 bg-transparent px-0 py-3 text-base text-light-primary-foreground outline-none placeholder:text-slate-400"
        />
        <Button
          type="button"
          className="h-12 min-w-[136px] shrink-0 gap-2 rounded-full bg-brand-light px-4 py-3 text-base font-medium text-white shadow-none hover:bg-primary-dark sm:min-w-[152px] sm:px-6">
          Subscribe
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </section>
  );
}

