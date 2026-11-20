import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

export default function CartIcon({
  quantity,
  compact,
}: {
  quantity: number;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "group-hover:bg-primary-darker relative flex items-center justify-center text-slate-900 transition-all duration-300 group-hover:text-white",
        compact
          ? "bg-primary/10 text-primary h-[42px] w-[42px] rounded-xl group-hover:bg-primary"
          : "bg-primary-dark/20 lg:bg-warning lg:shadow-primary-darker rounded-xl p-3 shadow group-hover:shadow-md md:shadow-none lg:p-3",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "lucide lucide-shopping-cart transition-all duration-300 ease-in-out group-hover:rotate-6 lg:group-hover:rotate-none",
          compact ? "size-[22px]" : "size-6",
        )}
        aria-hidden="true"
      >
        <circle cx={8} cy={21} r={1} />
        <circle cx={19} cy={21} r={1} />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      <Badge className="lg:bg-warning bg-primary-darker lg:group-hover:bg-primary-darker absolute -top-1.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white transition-all duration-300">
        {quantity}
      </Badge>
    </div>
  );
}

