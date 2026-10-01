import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export type GradientMenuItem = {
  href: string;
  title: string;
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
};

type Props = {
  items: GradientMenuItem[];
  isActive: (href: string) => boolean;
};

/* Icon circles that stretch into a gradient pill with the page name on hover
   or keyboard focus. The current page stays open, so it doubles as the
   "you are here" marker. */
export default function GradientMenu({ items, isActive }: Props) {
  return (
    <ul className="flex items-center gap-2.5">
      {items.map(({ href, title, icon, gradientFrom, gradientTo }) => {
        const active = isActive(href);
        const open = active ? "w-[124px] shadow-none" : "w-11 hover:w-[124px] hover:shadow-none focus-within:w-[124px]";
        const shown = active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100";
        const glow = active ? "opacity-40" : "opacity-0 group-hover:opacity-50 group-focus-within:opacity-50";
        const iconScale = active ? "scale-0" : "group-hover:scale-0 group-focus-within:scale-0";
        const titleScale = active ? "scale-100" : "scale-0 group-hover:scale-100 group-focus-within:scale-100";

        return (
          <li
            key={href}
            style={{ "--gradient-from": gradientFrom, "--gradient-to": gradientTo } as CSSProperties}
            className={`group relative h-11 rounded-full border border-stone-0/8 bg-white shadow-[0_4px_14px_rgba(45,44,30,0.1)] transition-all duration-500 ease-glass ${open}`}
          >
            {/* Gradient fill */}
            <span
              className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-500 ${shown}`}
            />
            {/* Soft glow beneath the pill */}
            <span
              className={`absolute inset-x-0 top-2.5 -z-10 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[14px] transition-all duration-500 ${glow}`}
            />

            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className="relative z-10 flex h-full w-full items-center justify-center rounded-full outline-none"
            >
              <span
                aria-hidden="true"
                className={`text-stone-2 transition-all duration-500 [&_svg]:size-[19px] ${iconScale}`}
              >
                {icon}
              </span>
              <span
                className={`absolute whitespace-nowrap text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 delay-150 ${titleScale}`}
              >
                {title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
