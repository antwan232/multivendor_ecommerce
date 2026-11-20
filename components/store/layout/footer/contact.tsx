import Image from "next/image";
import { Globe, Mail, Phone, Printer } from "lucide-react";

const contactRows = [
  {
    icon: Globe,
    text: "2715 Ash Dr. San Jose, South Dakota 83475",
    href: "https://maps.google.com/?q=2715+Ash+Dr+San+Jose+South+Dakota+83475",
  },
  {
    icon: Phone,
    text: "Call Us: (239) 555-0108",
    href: "tel:2395550108",
  },
  {
    icon: Mail,
    text: "sara.cruz@example.com",
    href: "mailto:sara.cruz@example.com",
  },
  {
    icon: Printer,
    text: "sara.cruz@example.com",
    href: "mailto:sara.cruz@example.com",
  },
] as const;

export default function Contact() {
  return (
    <>
      <h3 className="border-b border-[rgba(145,158,171,0.24)] pb-6 text-base leading-6 font-normal text-primary-lighter">
        Contact Information
      </h3>

      <div className="flex flex-col gap-y-1.5 py-4">
        {contactRows.map((row, index) => {
          const Icon = row.icon;

          return (
            <div
              key={`${row.text}-${index}`}
              className="flex min-h-10 items-center gap-x-3">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] text-primary-lighter">
                <Icon
                  className="size-6"
                  strokeWidth={2}
                />
              </span>
              <a
                href={row.href}
                target={row.icon === Globe ? "_blank" : undefined}
                rel={row.icon === Globe ? "noopener noreferrer" : undefined}
                className="min-w-0 text-base leading-6 font-semibold text-primary-lighter transition-colors duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary-darker focus-visible:outline-none">
                {row.text}
              </a>
            </div>
          );
        })}
      </div>

      <Image
        src="/assets/images/footer/payment-methods.png"
        alt="Visa, Mastercard, American Express, PayPal and Apple Pay"
        width={384}
        height={36}
        className="h-auto w-full"
      />
    </>
  );
}

