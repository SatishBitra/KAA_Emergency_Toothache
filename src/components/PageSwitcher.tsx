import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TREATMENT_PAGES } from "@/lib/treatment-pages";

interface PageSwitcherProps {
  currentPath: string;
  className?: string;
}

export function PageSwitcher({ currentPath, className }: PageSwitcherProps) {
  const current = TREATMENT_PAGES.find((p) => p.href === currentPath) || TREATMENT_PAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group inline-flex items-center gap-1.5 sm:gap-2 rounded-cta border border-gold/50 bg-gold/15 px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary transition-all duration-200 hover:bg-gold hover:text-primary hover:border-gold hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 active:bg-gold/85 shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-gold/50 cursor-pointer data-[state=open]:bg-gold data-[state=open]:text-primary data-[state=open]:border-gold data-[state=open]:shadow-md",
          className,
        )}
        aria-label="Switch treatment page"
      >
        <span className="hidden xs:inline">{current.name}</span>
        <span className="xs:hidden">{current.shortName}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gold group-hover:text-primary group-data-[state=open]:text-primary group-data-[state=open]:rotate-180 transition-all duration-200" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 p-2 rounded-xl border border-border bg-card/98 backdrop-blur-md shadow-2xl z-50 animate-in fade-in-0 zoom-in-95"
      >
        <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Dental Treatments</span>
          <span className="text-[9px] text-gold font-medium">KAA Dentals</span>
        </div>
        <div className="mt-1 space-y-1">
          {TREATMENT_PAGES.map((page) => {
            const isActive = currentPath === page.href;
            return (
              <DropdownMenuItem key={page.href} asChild className="p-0 focus:bg-transparent">
                <a
                  href={page.href}
                  className={cn(
                    "group/item flex items-center justify-between rounded-lg px-2.5 py-2 transition-all duration-150 w-full text-left cursor-pointer",
                    isActive
                      ? "bg-gold/20 border border-gold/50 text-primary font-bold shadow-xs hover:bg-gold/30 hover:border-gold hover:translate-x-0.5 active:scale-[0.98] active:bg-gold/40"
                      : "text-foreground/90 border border-transparent hover:bg-gold/15 hover:text-primary hover:border-gold/40 hover:translate-x-0.5 active:scale-[0.98] active:bg-gold/25",
                  )}
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full shrink-0 transition-transform group-hover/item:scale-125",
                          isActive ? "bg-gold" : "bg-muted-foreground/30",
                        )}
                      />
                      {page.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground pl-3 truncate group-hover/item:text-foreground/80">
                      {page.description}
                    </span>
                  </div>
                  {isActive ? (
                    <Check className="h-4 w-4 text-gold shrink-0 stroke-[2.5] transition-transform group-hover/item:scale-110" />
                  ) : null}
                </a>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
