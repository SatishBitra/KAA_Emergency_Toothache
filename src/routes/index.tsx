import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Phone,
  MapPin,
  Check,
  Star,
  ArrowRight,
  ArrowLeft,
  Quote,
  Clock,
  ShieldCheck,
  HeartHandshake,
  Heart,
  Menu,
  X,
  MessageCircle,
  CalendarDays,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import logoImg from "@/assets/KH-scaled-1-2048x588.png.webp";
import ke1Img from "@/assets/ke1.png";
import tcaImg from "@/assets/tca.png";
import ec2Img from "@/assets/ec2.png";
import ec3Img from "@/assets/ec3.png";
import ec4Img from "@/assets/ec4.png";
import whatsappWhiteIcon from "@/assets/whatsapp-white.svg";
import whatsappGreenIcon from "@/assets/whatsapp-green.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PageSwitcher } from "@/components/PageSwitcher";
import { TREATMENT_PAGES } from "@/lib/treatment-pages";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emergency Dentist Mountain Ash & Rhymney | KAA Dentals" },
      {
        name: "description",
        content:
          "In pain? KAA Dentals offers £50 emergency dental appointments in Mountain Ash and Rhymney for toothache, broken teeth, swelling and abscesses.",
      },
      {
        property: "og:title",
        content: "Emergency Dentist Mountain Ash & Rhymney | KAA Dentals",
      },
      {
        property: "og:description",
        content:
          "Same-day emergency dental appointments when available. £50 emergency assessment including X-rays if needed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmergencyPage,
});

const PHONE = "01443 473 555";
const TEL = `tel:${PHONE.replace(/\s/g, "")}`;
const WHATSAPP = `https://wa.me/44${PHONE.replace(/\s/g, "").replace(/^0/, "")}`;
// Real WhatsApp icon assets
const WHATSAPP_ICON_WHITE = whatsappWhiteIcon;
const WHATSAPP_ICON_GREEN = whatsappGreenIcon;
const WHATSAPP_ICON = WHATSAPP_ICON_WHITE;

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "The process", href: "#process" },
  { label: "Problems", href: "#problems" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Practices", href: "#practices" },
];

const problems = [
  {
    title: "Severe toothache",
    body: "Severe, persistent or throbbing tooth pain requiring urgent dental diagnosis and relief.",
    cta: "Toothache treatment",
    image: ke1Img,
  },
  {
    title: "Tooth decay",
    body: "Pain caused by deep cavities, untreated decay reaching sensitive inner nerves.",
    cta: "Tooth decay treatment",
    image: ec4Img,
  },
  {
    title: "Dental infection",
    body: "Bacterial infection, swelling around the gumline or a painful dental abscess.",
    cta: "Dental infection treatment",
    image: ec3Img,
  },
  {
    title: "Damaged or infected teeth",
    body: "Compromised or damaged teeth needing immediate pain stabilization or extraction.",
    cta: "Damaged tooth treatment",
    image: ec2Img,
  },
];

const testimonials = [
  {
    name: "Peter Morgan",
    initials: "PM",
    rating: 5,
    quote:
      "I couldn't get into any dentists with my bad toothache. Phoned KAA Dentals, explained the situation. Straight away they made an appointment for me. So helpful and understanding.",
  },
  {
    name: "Vickie Davies",
    initials: "VD",
    rating: 5,
    quote:
      "I needed an emergency appointment for an infection. I was booked in the same day, seen within minutes and ended up needing an extraction which was painless and over within moments.",
  },
  {
    name: "Michael Sollis",
    initials: "MS",
    rating: 5,
    quote:
      "Had my appointment with Mr Hammond this afternoon re suspected tooth infection. He took an xray and showed me the results, explaining me what my options were. He was very professional and helpful.",
  },
  {
    name: "Harry Miller",
    initials: "HM",
    rating: 5,
    quote:
      "I needed an emergency appointment last minute … and they fit me in the same day. The receptionist and dentist were very friendly and informative.",
  },
  {
    name: "Keith Williams",
    initials: "KW",
    rating: 5,
    quote:
      "Tried getting emergency dental treatment for 10 days. Very nervous and anxious because of terrible previous experience. Got hold of KAA Dental Mountain Ash. So polite and reassuring. Put at ease straight away.",
  },
];

const faqs = [
  {
    q: "How quickly can I see an emergency dentist for toothache?",
    a: "We offer same-day emergency appointments when available. Call us to check availability.",
  },
  {
    q: "How much does an emergency toothache appointment cost?",
    a: "Emergency appointments are available from £50, including an examination and X-ray if required.",
  },
  {
    q: "Can you treat severe tooth pain?",
    a: "Yes. Our emergency dentist will assess the cause of your tooth pain and recommend the most suitable treatment.",
  },
  {
    q: "Can I get treatment for an infected tooth?",
    a: "Yes. Depending on the condition of the tooth, treatment may include a filling, root canal treatment or extraction.",
  },
  {
    q: "Do you treat toothache caused by a broken tooth or lost filling?",
    a: "Yes. We provide emergency treatment for broken, cracked or damaged teeth, as well as lost fillings and crowns.",
  },
];

const areas = [
  "Mountain Ash",
  "Aberdare",
  "Abercynon",
  "Pontypridd",
  "Tonypandy",
  "Treorchy",
  "Ystrad Mynach",
  "Blackwood",
  "Merthyr Tydfil",
  "Bargoed",
  "Tredegar",
  "Rhymney",
  "Ebbw Vale",
  "Abertillery",
  "New Tredegar",
];

const CTA_BASE =
  "inline-flex items-center justify-center gap-2 rounded-cta px-7 py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold/50";

function CallButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a
      href="#hero-call-practices"
      onClick={onClick}
      className={cn(
        CTA_BASE,
        "bg-gold text-primary shadow-[var(--shadow-soft)] hover:bg-gold/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-gold/80 cursor-pointer",
        className,
      )}
    >
      <Phone className="h-4 w-4" /> Call us now
    </a>
  );
}

function BookButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#request"
      className={cn(
        CTA_BASE,
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-primary/80 cursor-pointer",
        className,
      )}
    >
      Book an appointment
    </a>
  );
}

function Badge({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium tracking-[0.12em] uppercase",
        light
          ? "border-gold/40 bg-primary-foreground/5 text-gold-soft"
          : "border-gold/40 bg-gold/10 text-primary",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

function SectionHeading({
  badge,
  title,
  subtitle,
  light = false,
  className = "",
}: {
  badge: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <Badge light={light}>{badge}</Badge>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
        className="mt-4 max-w-3xl text-2xl leading-tight md:text-3xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT }}
          className={`mt-3 max-w-2xl font-normal ${light ? "opacity-90" : "text-muted-foreground"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* Desktop pill nav with sliding active indicator */
function PillNav({ active }: { active: string }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLAnchorElement>(`a[data-href="${active}"]`);
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [active]);

  return (
    <nav
      ref={listRef}
      aria-label="Page sections"
      className="relative hidden items-center rounded-full border border-border bg-card/90 p-1 shadow-[var(--shadow-soft)] backdrop-blur md:flex"
    >
      <span
        aria-hidden
        className="absolute top-1 bottom-1 rounded-full bg-secondary transition-[left,width,opacity] duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
        style={{ left: indicator.left, width: indicator.width, opacity: indicator.ready ? 1 : 0 }}
      />
      {navItems.map((n) => {
        const isActive = active === n.href;
        return (
          <a
            key={n.href}
            href={n.href}
            data-href={n.href}
            className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold/50 cursor-pointer active:scale-95 ${
              isActive
                ? "text-primary font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-gold/15 active:bg-gold/25"
            }`}
          >
            {n.label}
          </a>
        );
      })}
    </nav>
  );
}

const heroPillars = [
  {
    icon: MapPin,
    label: "LOCAL CARE",
    title: "Local emergency care",
  },
  {
    icon: Clock,
    label: "AVAILABILITY",
    title: "Same-day emergency appointments",
  },
  {
    icon: ShieldCheck,
    label: "DIRECT ACCESS",
    title: "No routine waiting list for emergency",
  },
  {
    icon: Heart,
    label: "PATIENT COMFORT",
    title: "Gentle care for nervous patients",
  },
];

/* 4 trust pillars bar positioned after Hero section */
function PillarsSection() {
  return (
    <section
      aria-label="Key features"
      className="border-y border-border/70 bg-card/75 backdrop-blur-xs"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {heroPillars.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-3.5 sm:gap-4 py-5 sm:py-6 lg:py-7 px-3 sm:px-4 lg:px-5",
                // Mobile divider
                "border-b border-border/60 last:border-b-0",
                // Tablet 2x2 dividers
                "sm:border-b-0",
                index % 2 === 0 ? "sm:border-r sm:border-border/60" : "",
                index < 2 ? "sm:border-b sm:border-border/60 lg:border-b-0" : "",
                // Desktop 4 cols dividers
                index < 3 ? "lg:border-r lg:border-border/60" : "lg:border-r-0",
              )}
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <item.icon className="h-5 w-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {item.label}
                </span>
                <p className="mt-1 text-sm sm:text-[14.5px] font-semibold leading-snug text-foreground">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmergencyPage() {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [active, setActive] = useState(navItems[0].href);
  const [isCallingPracticesBlinking, setIsCallingPracticesBlinking] = useState(false);
  const [testimonialApi, setTestimonialApi] = useState<CarouselApi>();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!testimonialApi) return;
    const onSelect = () => {
      setCurrentTestimonial(testimonialApi.selectedScrollSnap());
    };
    onSelect();
    testimonialApi.on("select", onSelect);
    testimonialApi.on("reInit", onSelect);
    return () => {
      testimonialApi.off("select", onSelect);
    };
  }, [testimonialApi]);

  useEffect(() => {
    return () => {
      if (blinkTimerRef.current) {
        clearTimeout(blinkTimerRef.current);
      }
    };
  }, []);

  const handleCallUsNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("hero-call-practices");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setIsCallingPracticesBlinking(false);
    setTimeout(() => {
      setIsCallingPracticesBlinking(true);
    }, 20);
    if (blinkTimerRef.current) {
      clearTimeout(blinkTimerRef.current);
    }
    blinkTimerRef.current = setTimeout(() => {
      setIsCallingPracticesBlinking(false);
    }, 6000);
  };

  const handleMobileCallClick = handleCallUsNowClick;

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = navItems[0].href;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = `#${id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Appointment request received", {
      description: "Our team will contact you promptly about the next available emergency slot.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 font-normal text-foreground md:pb-0">
      <Toaster />

      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-5 py-3 md:grid-cols-[1fr_auto_1fr]">
          <img
            src={logoImg}
            alt="KAA Dentals — smile with confidence"
            className="h-9 w-auto object-contain md:h-10"
          />
          <PillNav active={active} />
          <div className="flex items-center justify-end gap-2.5 sm:gap-3">
            {/* Page Switcher Dropdown */}
            <PageSwitcher currentPath="/" />
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-cta bg-whatsapp px-4 py-2 text-sm font-medium text-whatsapp-foreground shadow-sm transition-all duration-200 hover:opacity-95 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 active:brightness-90 sm:inline-flex cursor-pointer"
            >
              <img
                src={WHATSAPP_ICON_WHITE}
                alt="WhatsApp"
                className="h-4 w-4 shrink-0"
                referrerPolicy="no-referrer"
              />
              WhatsApp
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-cta border border-border bg-card transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 hover:text-primary active:scale-90 md:hidden cursor-pointer",
                menuOpen && "border-gold bg-gold/15 text-primary",
              )}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`grid overflow-hidden border-border bg-card transition-[grid-template-rows,border-width] duration-300 ease-out md:hidden ${
            menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
          }`}
        >
          <nav aria-label="Mobile sections" className="min-h-0">
            <ul className="px-5 py-3">
              <li className="mb-3 space-y-1">
                <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Choose Treatment
                </div>
                <div className="grid grid-cols-1 gap-1.5 pt-1">
                  {TREATMENT_PAGES.map((page) => {
                    const isActive = page.href === "/";
                    return (
                      <a
                        key={page.href}
                        href={page.href}
                        className={cn(
                          "group/treat flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-150 active:scale-[0.98]",
                          isActive
                            ? "bg-gold/20 text-primary border border-gold/40 font-bold hover:bg-gold/30 hover:border-gold shadow-xs"
                            : "bg-muted/40 text-foreground hover:bg-gold/15 hover:text-primary hover:border hover:border-gold/30 hover:translate-x-0.5 active:bg-gold/25",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full transition-transform group-hover/treat:scale-125",
                              isActive ? "bg-gold" : "bg-muted-foreground/40",
                            )}
                          />
                          {page.name}
                        </span>
                        {isActive ? (
                          <span className="text-[10px] font-medium text-gold uppercase tracking-wider">
                            Current
                          </span>
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform group-hover/treat:translate-x-1" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </li>
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className={`group/nav flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-all duration-150 hover:bg-secondary/70 hover:text-primary hover:translate-x-0.5 active:scale-[0.98] active:bg-secondary ${
                      active === n.href
                        ? "bg-secondary text-primary font-bold border-l-3 border-gold"
                        : "text-foreground"
                    }`}
                  >
                    {n.label}
                    <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover/nav:translate-x-1" />
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-border pt-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-whatsapp/15 px-3 py-2.5 text-sm font-semibold text-primary transition-all duration-150 hover:bg-whatsapp/25 active:scale-[0.98] cursor-pointer"
                >
                  <img
                    src={WHATSAPP_ICON_GREEN}
                    alt="WhatsApp"
                    className="h-4 w-4"
                    referrerPolicy="no-referrer"
                  />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="surface-navy relative overflow-hidden">
        {/* Subtle background glow for visual warmth and depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 -z-0 h-96 w-96 rounded-full bg-gold/15 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/10 -z-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]"
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-start md:items-stretch gap-8 sm:gap-10 px-4 sm:px-5 py-10 sm:py-14 md:grid-cols-[1.15fr_1fr] md:gap-12 md:py-20 lg:py-24">
          <div className="flex flex-col md:h-full md:justify-between">
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <Badge
                  light
                  className="text-[9.5px] xs:text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3.5 sm:py-1 tracking-[0.05em] sm:tracking-[0.12em]"
                >
                  Same-Day Urgent Care • Mountain Ash &amp; Rhymney
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
                className="mt-3.5 sm:mt-4 text-[1.95rem] xs:text-[2.15rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.15] sm:leading-[1.12]"
              >
                Severe Toothache?{" "}
                <span className="text-gradient-gold block sm:inline md:block mt-0.5 sm:mt-0 md:mt-1">
                  Get Help Today
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14, ease: EASE_OUT }}
                className="mt-3 sm:mt-4 text-[18px] sm:text-lg md:text-xl font-semibold text-gold-soft leading-snug"
              >
                Emergency toothache treatment from KAA Dentals.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT }}
                className="mt-2 text-sm sm:text-base md:text-lg font-normal leading-relaxed text-slate-200/90"
              >
                Get your tooth checked, find the cause of your pain and understand your treatment
                options.
              </motion.p>
            </div>

            {/* Inclusions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: EASE_OUT }}
              className="mt-5 sm:mt-7 md:mt-0 rounded-2xl border border-gold/30 bg-white/[0.06] p-4 sm:p-6 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-white/15 pb-3 sm:pb-4">
                  <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide text-white">
                    Emergency Appointments From £50
                  </h2>
                </div>

                <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm font-semibold text-gold-soft">
                  Include:
                </p>

                <ul className="mt-2 sm:mt-2.5 space-y-2 sm:space-y-2.5 text-xs sm:text-sm md:text-base text-slate-100">
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-0.5 grid h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 place-items-center rounded-full bg-gold/25 text-gold">
                      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
                    </span>
                    <span>Dental examination</span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-0.5 grid h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 place-items-center rounded-full bg-gold/25 text-gold">
                      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
                    </span>
                    <span>Assessment of your tooth pain</span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-0.5 grid h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 place-items-center rounded-full bg-gold/25 text-gold">
                      <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
                    </span>
                    <span>X-ray if required</span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-0.5 grid h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 place-items-center rounded-full bg-gold/25 text-gold">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                    <span>Antibiotics where clinically appropriate</span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-0.5 grid h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 place-items-center rounded-full bg-gold/25 text-gold">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                    <span>Advice on the next step</span>
                  </li>
                </ul>
              </div>

              <div className="mt-3.5 sm:mt-4 border-t border-white/15 pt-3 sm:pt-3.5">
                <p className="text-[11px] sm:text-xs md:text-sm font-normal leading-relaxed text-slate-200/85">
                  If you need additional treatment, we'll explain your options and the cost before
                  proceeding.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Attraction Image + Booking Hub */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
            className="flex flex-col h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/40 bg-card text-card-foreground shadow-[var(--shadow-soft)]"
          >
            {/* Visual Centerpiece: Reassuring Emergency Dental Care Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
              <img
                src={ke1Img}
                alt="Emergency toothache treatment and dental assessment at KAA Dentals"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              {/* Enhanced gradient blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-card from-5% via-card/60 via-40% to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col justify-between p-4.5 sm:p-6 md:p-7 flex-1">
              <div>
                <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-3.5 sm:pb-4">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold leading-snug sm:leading-tight text-foreground">
                      Book Your Emergency Appointment
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm font-normal text-muted-foreground">
                      Fast diagnosis &amp; urgent pain relief
                    </p>
                  </div>
                  <div className="shrink-0 text-right pl-1">
                    <span className="block text-[10px] sm:text-[11px] font-medium text-muted-foreground">
                      From
                    </span>
                    <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary leading-none">
                      £50
                    </span>
                  </div>
                </div>

                {/* Primary Booking CTA */}
                <div className="mt-3.5 sm:mt-5">
                  <a
                    href="#request"
                    className={`${CTA_BASE} w-full justify-center bg-gold text-primary text-sm sm:text-base font-bold tracking-wide shadow-[var(--shadow-soft)] hover:bg-gold/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-gold/80 py-3.5 sm:py-4 cursor-pointer`}
                  >
                    Book Emergency Appointment
                  </a>
                </div>
              </div>

              {/* Direct Practice Contact Numbers */}
              <div
                id="hero-call-practices"
                className="mt-5 sm:mt-6 border-t border-border/70 pt-4 sm:pt-5 scroll-mt-28"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] sm:text-xs font-bold tracking-[0.1em] sm:tracking-[0.12em] uppercase text-muted-foreground">
                    Call our practices directly:
                  </p>
                </div>

                <div
                  className={`mt-2.5 sm:mt-3 flex flex-col gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 transition-all duration-300 ${
                    isCallingPracticesBlinking
                      ? "border-2 border-gold animate-gold-border-blink bg-gold/15 shadow-[0_0_20px_rgba(200,160,80,0.45)] ring-2 ring-gold/40"
                      : "border border-border/60 bg-secondary/35"
                  }`}
                >
                  <a
                    href="tel:01443474441"
                    onClick={() => setIsCallingPracticesBlinking(false)}
                    className="group flex items-center justify-between rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-150 hover:bg-gold/20 hover:border-gold/40 hover:translate-x-0.5 active:scale-[0.98] active:bg-gold/30 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 sm:gap-2.5">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gold transition-transform group-hover:scale-110" />
                      <span className="font-semibold text-foreground">Mountain Ash</span>
                    </span>
                    <span className="flex items-center gap-1 sm:gap-1.5 font-bold tracking-tight text-primary transition-colors group-hover:text-gold">
                      <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-gold transition-transform group-hover:scale-110" />
                      <span className="tabular-nums">01443 474 441</span>
                    </span>
                  </a>

                  <a
                    href="tel:01685840700"
                    onClick={() => setIsCallingPracticesBlinking(false)}
                    className="group flex items-center justify-between rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-150 hover:bg-gold/20 hover:border-gold/40 hover:translate-x-0.5 active:scale-[0.98] active:bg-gold/30 cursor-pointer"
                  >
                    <span className="flex items-center gap-2 sm:gap-2.5">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gold transition-transform group-hover:scale-110" />
                      <span className="font-semibold text-foreground">Rhymney</span>
                    </span>
                    <span className="flex items-center gap-1 sm:gap-1.5 font-bold tracking-tight text-primary transition-colors group-hover:text-gold">
                      <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-gold transition-transform group-hover:scale-110" />
                      <span className="tabular-nums">01685 840 700</span>
                    </span>
                  </a>
                </div>

                {/* Practice Hours */}
                <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between rounded-xl bg-secondary/30 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-medium">
                  <span className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold shrink-0" />
                    <span>Monday to Saturday</span>
                  </span>
                  <span className="font-bold text-foreground">9AM – 5PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Pillars */}
      <PillarsSection />

      {/* Overview Section */}
      <section
        id="overview"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-5 py-8 sm:py-12 md:py-24"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left Column: Toothcare Relief Image (Clean, without overlays) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-lg"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary/60 sm:aspect-[16/11]">
              <img
                src={tcaImg}
                alt="Severe toothache emergency dental care"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Content and Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="flex flex-col items-start"
          >
            <Badge>Toothache Relief</Badge>

            <h2 className="mt-4 text-2xl leading-tight md:text-3xl">
              Toothache Getting Worse? We Can Help.
            </h2>

            <p className="mt-3 text-base font-normal leading-relaxed text-muted-foreground">
              Severe tooth pain can make eating, sleeping and everyday life difficult.
            </p>

            <p className="mt-3 text-base font-normal leading-relaxed text-muted-foreground">
              Our emergency dentists can assess your toothache and provide the right treatment to
              help deal with the problem.
            </p>

            {/* Inclusions summary pills */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground">
                <Check className="h-3.5 w-3.5 text-gold" />
                Fast pain diagnosis
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground">
                <Check className="h-3.5 w-3.5 text-gold" />
                X-rays included if needed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground">
                <Check className="h-3.5 w-3.5 text-gold" />
                Gentle &amp; reassuring care
              </span>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href="#request"
                className={`${CTA_BASE} bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-primary/80 cursor-pointer`}
              >
                Book Your Emergency Appointment
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="surface-navy scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-8 sm:py-12 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            {/* Left side: Badge, header, description, and details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="lg:sticky lg:top-24"
            >
              <Badge light>Book online</Badge>
              <h2 className="mt-4 max-w-3xl text-2xl leading-tight text-white md:text-3xl">
                Request an emergency appointment
              </h2>
              <p className="mt-4 text-base font-normal leading-relaxed text-white/85 md:text-lg">
                Tell us what's wrong and we'll contact you promptly about the next available
                appointment.
              </p>

              <div className="hidden mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:block">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-soft">
                  What to expect:
                </h3>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      <strong>Same-day priority:</strong> Dedicated slots reserved daily for acute
                      pain and urgent dental needs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      <strong>Transparent £50 fee:</strong> Comprehensive diagnosis, pain relief
                      guidance, and X-rays if needed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      <strong>Two practice locations:</strong> Mountain Ash (CF45 3HB) &amp; Rhymney
                      (NP22 5PW).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="hidden mt-6 pt-2 md:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Need to speak with us directly?
                </p>
                <div className="mt-2.5 flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <a
                    href="tel:01443474441"
                    className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-gold"
                  >
                    <Phone className="h-4 w-4 text-gold" /> Mountain Ash:{" "}
                    <span className="font-bold">01443 474 441</span>
                  </a>
                  <a
                    href="tel:01685840700"
                    className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-gold"
                  >
                    <Phone className="h-4 w-4 text-gold" /> Rhymney:{" "}
                    <span className="font-bold">01685 840 700</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right side: Form card with white background and refined typographic hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
              className="rounded-3xl border border-gold/30 bg-card p-6 text-card-foreground shadow-[var(--shadow-soft)] sm:p-9 md:p-10"
            >
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Row 1: Name and Phone Number */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block text-sm font-semibold text-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="form-name"
                      required
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="mt-1.5 w-full rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="form-phone"
                      className="block text-sm font-semibold text-foreground"
                    >
                      Phone Number
                    </label>
                    <input
                      id="form-phone"
                      required
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="mt-1.5 w-full rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                    />
                  </div>
                </div>

                {/* Row 2: Email and New or existing patient? */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="form-email"
                      className="block text-sm font-semibold text-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="form-email"
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="mt-1.5 w-full rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="form-patient"
                      className="block text-sm font-semibold text-foreground"
                    >
                      New or existing patient?
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="form-patient"
                        name="patientType"
                        defaultValue="Existing patient"
                        className="w-full appearance-none rounded-full border border-border bg-secondary/40 px-5 py-3 pr-10 text-sm text-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                      >
                        <option value="Existing patient">Existing patient</option>
                        <option value="New patient">New patient</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Location */}
                <div>
                  <label
                    htmlFor="form-location"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Location
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      id="form-location"
                      name="location"
                      defaultValue="Mountain Ash (CF45 3HB)"
                      className="w-full appearance-none rounded-full border border-border bg-secondary/40 px-5 py-3 pr-10 text-sm text-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                    >
                      <option value="Mountain Ash (CF45 3HB)">Mountain Ash (CF45 3HB)</option>
                      <option value="Rhymney (NP22 5PW)">Rhymney (NP22 5PW)</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                {/* Row 4: Describe your dental concern */}
                <div>
                  <label
                    htmlFor="form-concern"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Describe your dental concern
                  </label>
                  <textarea
                    id="form-concern"
                    required
                    name="concern"
                    rows={3}
                    placeholder="Describe your dental concern"
                    className="mt-1.5 w-full resize-y rounded-2xl border border-border bg-secondary/40 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:bg-background focus:ring-2 focus:ring-gold/25"
                  />
                </div>

                {/* Row 5: Consent checkbox */}
                <div className="pt-1">
                  <label className="flex cursor-pointer items-center gap-3 select-none">
                    <input
                      type="checkbox"
                      required
                      name="consent"
                      className="h-4 w-4 rounded border-border accent-primary focus:ring-gold"
                    />
                    <span className="text-sm font-medium text-foreground/90">
                      I consent to being contacted by KAA dentals
                    </span>
                  </label>
                </div>

                {/* Row 6: Details Privacy Policy notice */}
                <div className="pt-1">
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground">
                    DETAILS CAN BE FOUND IN OUR{" "}
                    <button
                      type="button"
                      onClick={() => setPrivacyOpen(true)}
                      className="font-bold text-primary underline decoration-gold/60 underline-offset-2 hover:text-gold"
                    >
                      PRIVACY POLICY.
                    </button>
                  </p>
                </div>

                {/* Row 7: Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-4 text-center text-base font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.99]"
                  >
                    {sent ? "Request Sent Successfully" : "Request an Emergency Appointment"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>KAA Dentals Privacy Policy</DialogTitle>
            <DialogDescription className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground">
              Your personal details (name, telephone number, email, and dental symptoms) are
              collected strictly to arrange and coordinate your emergency appointment at our
              Mountain Ash or Rhymney practices. In compliance with UK GDPR and NHS confidentiality
              standards, your data is never shared or sold to third parties.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* What happens */}
      <section
        id="process"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-5 py-8 sm:py-12 md:py-24"
      >
        <SectionHeading
          badge="The process"
          title="What happens at your emergency appointment?"
          subtitle="Your £50 emergency appointment is an assessment of your dental problem."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0, ease: EASE_OUT }}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
          >
            <div>
              <ShieldCheck className="h-6 w-6 text-gold" />
              <h3 className="mt-3 text-lg font-medium text-foreground">
                <span className="md:hidden">
                  Included in your <span className="font-bold text-gold">£50</span> fee:
                </span>
                <span className="hidden md:inline">We'll:</span>
              </h3>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                "Examine the problem",
                "Check what's causing your pain",
                "Take an X-ray if needed",
                "Explain your treatment options",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {i}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT }}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
          >
            <div>
              <HeartHandshake className="h-6 w-6 text-gold" />
              <h3 className="mt-3 text-lg">If you need treatment</h3>
            </div>
            <p className="mt-6 text-sm font-normal text-muted-foreground">
              We'll explain what needs to be done and the cost{" "}
              <span className="text-foreground">before treatment starts.</span>
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.24, ease: EASE_OUT }}
            className="rounded-2xl border border-gold/40 bg-secondary/60 p-6"
          >
            <Clock className="h-6 w-6 text-gold" />
            <h3 className="mt-3 text-lg">Common treatment prices</h3>
            <dl className="mt-3 space-y-2 text-sm">
              {[
                ["Tooth Extraction", "£150"],
                ["Surgical extraction", "£250"],
                ["Root canal", "£200"],
                ["Filling", "£100"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-1.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-display text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
          className="mt-8"
        >
          <BookButton />
        </motion.div>
      </section>

      {/* Problems */}
      <section id="problems" className="scroll-mt-24 border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-8 sm:py-12 md:py-24">
          <SectionHeading
            badge="Problems we treat"
            title="Emergency Toothache Treatment"
            subtitle="We can help with tooth pain caused by:"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p, idx) => {
              const colDelay = (idx % 4) * 0.1;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: colDelay, ease: EASE_OUT }}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-gold hover:shadow-md"
                >
                  <div>
                    {/* Image */}
                    <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/70 bg-secondary transition-colors group-hover:border-gold/50">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="text-lg font-medium text-foreground">{p.title}</h3>
                    <p className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                  <a
                    href="#request"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-gold"
                  >
                    <span>{p.cta}</span>
                    <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-5 py-8 sm:py-12 md:py-24"
      >
        <SectionHeading
          badge="Reviews"
          title="Hear From Our Happy Patients"
          subtitle="Real feedback from patients who received urgent toothache treatment and reassuring care at KAA Dentals."
        />

        {/* Mobile View: Touch Carousel with hand swipe */}
        <div className="mt-8 md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setTestimonialApi}
            className="w-full"
          >
            <CarouselContent className="-ml-3 pb-2">
              {testimonials.map((t) => (
                <CarouselItem key={t.name} className="pl-3 basis-[88%] xs:basis-[82%]">
                  <div className="flex h-full min-h-[290px] flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-gold">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                          ))}
                        </div>
                        <Quote className="h-5 w-5 text-gold/30 shrink-0" />
                      </div>
                      <p className="mt-4 text-sm font-normal leading-relaxed text-muted-foreground italic">
                        “{t.quote}”
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 font-display text-xs font-bold text-primary">
                        {t.initials}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-semibold text-foreground">
                          {t.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Check className="h-3 w-3 text-gold" />
                          <span>Verified Patient</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Mobile swipe controls: interactive dot indicators and prev/next buttons */}
            <div className="mt-5 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => testimonialApi?.scrollTo(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      currentTestimonial === i
                        ? "w-6 bg-gold"
                        : "w-2 bg-border hover:bg-muted-foreground/40",
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => testimonialApi?.scrollPrev()}
                  aria-label="Previous testimonial"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground shadow-xs transition hover:border-gold hover:text-gold active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => testimonialApi?.scrollNext()}
                  aria-label="Next testimonial"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground shadow-xs transition hover:border-gold hover:text-gold active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Carousel>
        </div>

        {/* Desktop View: Grid of reviews with highlight card */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT }}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-gold/60 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-gold/30 shrink-0" />
                </div>
                <p className="mt-4 text-sm font-normal leading-relaxed text-muted-foreground italic">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 font-display text-xs font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground">{t.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-gold" />
                    <span>Verified Patient</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* 6th Card: Verified Clinic Trust Summary */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 5 * 0.08, ease: EASE_OUT }}
            className="flex flex-col justify-between rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 via-card to-card p-6 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-1 text-gold mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Same-Day Emergency Relief
              </h3>
              <p className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground">
                Prompt emergency appointments across our Mountain Ash and Rhymney practices. We'll
                diagnose the cause of pain and explain your options clearly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                KAA Dental Care
              </span>
              <a
                href="#request"
                className="text-xs font-semibold text-gold hover:text-primary transition-colors flex items-center gap-1"
              >
                Book appointment <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-5 py-8 sm:py-12 md:py-24"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          {/* Left side: Badge and header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="lg:sticky lg:top-24"
          >
            <Badge>FAQ</Badge>
            <h2 className="mt-4 max-w-3xl text-2xl leading-tight text-foreground md:text-3xl">
              Frequently Asked Questions About Emergency Toothache
            </h2>
          </motion.div>

          {/* Right side: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="w-full"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed font-normal text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Areas */}
      <section className="surface-navy">
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-8 sm:py-12 md:py-20">
          <SectionHeading
            light
            badge="Local area"
            title="Emergency Dentist for patients across the local area."
            subtitle="With practices in Mountain Ash and Rhymney, KAA Dentals provides emergency dental care for patients from nearby towns and communities."
          />
          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            {areas.map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.02, ease: EASE_OUT }}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/85 transition-all hover:border-gold/60 hover:text-white sm:px-3.5 sm:py-1.5 sm:text-xs md:text-sm"
              >
                <span>Dentist near {a}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Practices */}
      <section
        id="practices"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-5 py-8 sm:py-12 md:py-24"
      >
        <SectionHeading
          badge="Practices"
          title="Find your nearest KAA practice"
          subtitle="Modern, fully equipped practices in Mountain Ash and Rhymney providing emergency appointments."
        />
        <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
          {[
            {
              name: "Mountain Ash",
              area: "Mountain Ash, Rhondda Cynon Taf",
              postcode: "CF45 3HB",
              phone: "01443 474 441",
              tel: "tel:01443474441",
              hours: "Monday to Saturday: 9AM – 5PM",
              mapUrl: "https://www.google.com/maps/search/KAA+Dentals+Mountain+Ash",
            },
            {
              name: "Rhymney",
              area: "Rhymney, Caerphilly",
              postcode: "NP22 5PW",
              phone: "01685 840 700",
              tel: "tel:01685840700",
              hours: "Monday to Saturday: 9AM – 5PM",
              mapUrl: "https://www.google.com/maps/search/KAA+Dentals+Rhymney",
            },
          ].map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: EASE_OUT }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-sm transition-all hover:border-gold hover:shadow-lg"
            >
              <div className="p-6 sm:p-7 md:p-8">
                {/* Header info without image */}
                <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-5">
                  <div>
                    <p className="text-xs font-normal uppercase tracking-wider text-muted-foreground">
                      KAA Dental Care
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5">
                      {p.name}
                    </h3>
                  </div>
                  <span className="rounded-xl border border-border bg-secondary/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-foreground shadow-xs">
                    {p.postcode}
                  </span>
                </div>

                {/* Location Details */}
                <div className="pt-5 space-y-3.5 text-sm sm:text-base">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-foreground/90 font-medium">{p.area}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-gold" />
                    <span>{p.hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-gold" />
                    <a
                      href={p.tel}
                      className="font-bold text-foreground text-base transition-colors hover:text-gold"
                    >
                      {p.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 border-t border-border/70 p-6 sm:p-7 pt-4 bg-muted/20">
                <a
                  href={p.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${CTA_BASE} flex-1 border border-gold/60 bg-transparent px-5 py-3 text-foreground transition-all duration-200 hover:bg-gold/15 hover:border-gold hover:text-primary hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-gold/25 cursor-pointer`}
                >
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>Directions</span>
                </a>
                <a
                  href={p.tel}
                  className={`${CTA_BASE} flex-1 bg-primary px-5 py-3 text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-primary/80 cursor-pointer`}
                >
                  <Phone className="h-4 w-4" />
                  <span>Call practice</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="surface-navy relative overflow-hidden border-t border-gold/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 py-8 sm:py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col items-start md:items-center text-left md:text-center"
          >
            <Badge light>Immediate Relief</Badge>

            <h2 className="mt-4 sm:mt-5 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Don't Keep Suffering With Toothache
            </h2>

            <p className="mt-2.5 sm:mt-3 text-base sm:text-xl md:text-2xl font-semibold text-gold-soft">
              Get Emergency Dental Care From £50
            </p>

            <p className="mt-2.5 sm:mt-3 max-w-xl text-sm sm:text-base font-normal leading-relaxed text-slate-300">
              Same-day emergency dental appointments when available across our Mountain Ash and
              Rhymney practices.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#request"
                className={`${CTA_BASE} w-full sm:w-auto justify-center bg-gold text-primary font-bold tracking-wide shadow-[var(--shadow-soft)] hover:bg-gold/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-gold/80 px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base cursor-pointer`}
              >
                Book Emergency Appointment
              </a>

              <CallButton
                onClick={handleCallUsNowClick}
                className="w-full sm:w-auto justify-center border border-white/25 bg-white/10 text-white font-semibold backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:bg-white/30 px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base shadow-none cursor-pointer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile sticky action bar */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <button
          type="button"
          onClick={handleMobileCallClick}
          className="flex items-center justify-center gap-2 bg-gold py-4 text-sm font-semibold text-primary transition-all duration-150 hover:bg-gold/90 active:bg-gold/80 active:scale-95 cursor-pointer"
        >
          <Phone className="h-4 w-4" /> Call
        </button>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-whatsapp py-4 text-sm font-semibold text-whatsapp-foreground transition-all duration-150 hover:opacity-95 active:brightness-90 active:scale-95 cursor-pointer"
        >
          <img
            src={WHATSAPP_ICON_WHITE}
            alt="WhatsApp"
            className="h-5 w-5 shrink-0"
            referrerPolicy="no-referrer"
          />
          WhatsApp
        </a>
        <a
          href="#request"
          className="flex items-center justify-center gap-2 bg-navy-deep py-4 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-navy-deep/90 active:bg-navy-deep/80 active:scale-95 cursor-pointer"
        >
          <CalendarDays className="h-4 w-4" /> Book
        </a>
      </nav>
    </div>
  );
}
