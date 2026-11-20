import Image from "next/image";
import Link from "next/link";

import { getStorefrontCategories } from "@/actions/category";

import Contact from "./contact";
import Links from "./links";
import Newsletter from "./newsletter";
import Reveal from "@/components/shared/reveal";
import BrandSocials from "./socials";

export default async function Footer() {
  let categories: { name: string; url: string }[] = [];
  try {
    categories = await getStorefrontCategories();
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <Reveal className="relative z-20">
        <Newsletter />
      </Reveal>

      <footer className="bg-primary-darker pt-40 pb-[100px] text-primary-lighter md:pb-15 xl:rounded-t-[22px]">
        <div className="mx-auto w-full max-w-screen-2xl px-4">
          <div className="grid grid-cols-12 gap-6 pb-9">
            <Reveal
              className="col-span-12 xl:col-span-3"
              delay={0.2}>
              <div className="flex flex-col gap-y-6">
                <Link
                  href="/"
                  aria-label="Sellzy home"
                  className="inline-flex w-fit rounded-sm focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary-darker focus-visible:outline-none">
                  <Image
                    src="/assets/images/footer/footer-logo.svg"
                    alt="Sellzy"
                    width={123}
                    height={41}
                    unoptimized
                    className="h-[41px] w-auto"
                  />
                </Link>

                <p className="text-base leading-6 text-primary-lighter">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <BrandSocials />

                <div className="flex flex-col gap-y-[15px]">
                  <p className="text-base leading-6 font-semibold text-primary-lighter">
                    Download Our App:
                  </p>
                  <div className="flex gap-x-2.5">
                    <a
                      href="#"
                      aria-label="Get it on Google Play"
                      className="block shrink-0 rounded-sm focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary-darker focus-visible:outline-none">
                      <Image
                        src="/assets/images/footer/google-play.png"
                        alt="Get it on Google Play"
                        width={160}
                        height={48}
                        className="h-[42px] w-[139px] min-[360px]:h-12 min-[360px]:w-[160px]"
                      />
                    </a>
                    <a
                      href="#"
                      aria-label="Download on the App Store"
                      className="block shrink-0 rounded-sm focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary-darker focus-visible:outline-none">
                      <Image
                        src="/assets/images/footer/apple-store.png"
                        alt="Download on the App Store"
                        width={161}
                        height={48}
                        className="h-[42px] w-[139px] min-[360px]:h-12 min-[360px]:w-[161px]"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Links categories={categories} />

            <Reveal
              className="col-span-12 md:col-span-6 xl:col-span-3"
              delay={0.6}>
              <Contact />
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="relative pt-6 pb-px text-center text-base leading-6 text-white">
              <Image
                src="/assets/images/footer/bottom-border.png"
                alt=""
                aria-hidden="true"
                width={1631}
                height={47}
                className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full object-cover"
              />
              <p className="relative">© Sellzy - All Rights Reserved</p>
              <p className="relative mt-1 text-xs tracking-wide text-white/55">
                Developed by <span className="font-semibold text-white/80">Tony</span>
              </p>
            </div>
          </Reveal>
        </div>
      </footer>
    </>
  );
}

