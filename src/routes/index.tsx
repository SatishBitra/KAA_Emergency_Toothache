import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Phone,
  MapPin,
  Check,
  Star,
  ArrowRight,
  Clock,
  ShieldCheck,
  HeartHandshake,
  Menu,
  X,
  MessageCircle,
  CalendarDays,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import logoImg from "@/assets/KH-scaled-1-2048x588.png.webp";
import ke1Img from "@/assets/ke1.png";
import ke2Img from "@/assets/ke2.png";
import ke3Img from "@/assets/ke3.png";
import ke4Img from "@/assets/ke4.png";
import ke5Img from "@/assets/ke5.png";
import bg1Img from "@/assets/bg-1.png.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
const WHATSAPP_ICON = "https://img.icons8.com/?size=100&id=7OeRNqg6S7Vf&format=png&color=000000";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "The process", href: "#process" },
  { label: "Problems", href: "#problems" },
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
    image: ke2Img,
  },
  {
    title: "Dental infection",
    body: "Bacterial infection, swelling around the gumline or a painful dental abscess.",
    cta: "Dental infection treatment",
    image: ke3Img,
  },
  {
    title: "Broken or cracked teeth",
    body: "Fractured, chipped or cracked teeth causing severe sensitivity or sharp edges.",
    cta: "Broken tooth treatment",
    image: ke4Img,
  },
  {
    title: "Lost fillings or crowns",
    body: "Dislodged, lost or broken fillings and crowns leaving exposed, tender teeth.",
    cta: "Lost filling treatment",
    image: ke1Img,
  },
  {
    title: "Damaged or infected teeth",
    body: "Compromised or damaged teeth needing immediate pain stabilization or extraction.",
    cta: "Damaged tooth treatment",
    image: ke5Img,
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
  "inline-flex items-center justify-center gap-2 rounded-cta px-7 py-3.5 text-sm font-medium transition-all";

function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={TEL}
      className={cn(
        CTA_BASE,
        "bg-gold text-primary shadow-[var(--shadow-soft)] hover:-translate-y-0.5",
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
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]",
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
          className={`mt-3 max-w-2xl ${light ? "opacity-90" : "text-muted-foreground"}`}
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
      {navItems.map((n) => (
        <a
          key={n.href}
          href={n.href}
          data-href={n.href}
          className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            active === n.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {n.label}
        </a>
      ))}
    </nav>
  );
}

/* 4 stack side-by-side blocks (hidden as requested) */
function PillarsSection() {
  return null;
}

function EmergencyPage() {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [active, setActive] = useState(navItems[0].href);
  const [isCallingPracticesBlinking, setIsCallingPracticesBlinking] = useState(false);
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (blinkTimerRef.current) {
        clearTimeout(blinkTimerRef.current);
      }
    };
  }, []);

  const handleMobileCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("hero-call-practices");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsCallingPracticesBlinking(true);
      if (blinkTimerRef.current) {
        clearTimeout(blinkTimerRef.current);
      }
      blinkTimerRef.current = setTimeout(() => {
        setIsCallingPracticesBlinking(false);
      }, 5000);
    }
  };

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
    <div className="min-h-screen bg-background pb-20 font-medium text-foreground md:pb-0">
      <Toaster />

      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 md:grid-cols-[1fr_auto_1fr]">
          <img
            src={logoImg}
            alt="KAA Dentals — smile with confidence"
            className="h-9 w-auto object-contain md:h-10"
          />
          <PillNav active={active} />
          <div className="flex items-center justify-end gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-cta bg-whatsapp px-4 py-2 text-sm font-medium text-whatsapp-foreground shadow-sm transition hover:opacity-90 sm:inline-flex"
            >
              WhatsApp
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-cta border border-border bg-card md:hidden"
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
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                      active === n.href ? "bg-secondary text-primary" : "text-foreground"
                    }`}
                  >
                    {n.label}
                    <ArrowRight className="h-4 w-4 text-gold" />
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-border pt-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-whatsapp/15 px-3 py-2 text-sm font-medium text-primary"
                >
                  <img
                    src={WHATSAPP_ICON}
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
        <div className="mx-auto grid max-w-6xl items-start gap-8 sm:gap-10 px-5 py-10 sm:py-14 md:grid-cols-[1.15fr_1fr] md:gap-12 md:py-20 lg:py-24">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <Badge light className="text-[11px] sm:text-xs">
                Same-Day Urgent Care • Mountain Ash &amp; Rhymney
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
              className="mt-3.5 sm:mt-4 text-[1.65rem] xs:text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.12]"
            >
              Severe Toothache?{" "}
              <span className="text-gradient-gold block sm:inline mt-0.5 sm:mt-0">
                Get Help Today
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease: EASE_OUT }}
              className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-semibold text-gold-soft leading-snug"
            >
              Emergency toothache treatment from KAA Dentals.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT }}
              className="mt-2 text-sm sm:text-base md:text-lg leading-relaxed text-slate-200/90"
            >
              Get your tooth checked, find the cause of your pain and understand your treatment
              options.
            </motion.p>

            {/* Inclusions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: EASE_OUT }}
              className="mt-5 sm:mt-7 rounded-2xl border border-gold/30 bg-white/[0.06] p-4 sm:p-6 backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-3 sm:pb-4">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide text-white">
                  Emergency Appointments From £50
                </h2>
                <span className="shrink-0 rounded-full bg-gold/20 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gold">
                  Fixed Assessment
                </span>
              </div>

              <ul className="mt-3.5 sm:mt-4 space-y-2 sm:space-y-2.5 text-xs sm:text-sm md:text-base text-slate-100">
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

              <div className="mt-3.5 sm:mt-4 border-t border-white/15 pt-3 sm:pt-3.5">
                <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed text-slate-200/85">
                  If you need additional treatment, we'll explain your options and the cost before
                  proceeding.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
            className="flex flex-col justify-between rounded-2xl border border-gold/40 bg-card p-4.5 sm:p-7 md:p-8 text-card-foreground shadow-[var(--shadow-soft)]"
          >
            <div>
              <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-4 sm:pb-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-primary">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold" />
                    Emergency Care Available
                  </span>
                  <h3 className="mt-2 sm:mt-2.5 text-base sm:text-xl md:text-2xl font-bold leading-snug sm:leading-tight text-foreground">
                    Book Your Emergency Appointment From £50
                  </h3>
                </div>
                <div className="shrink-0 text-right pl-1">
                  <span className="block text-[11px] sm:text-xs font-medium text-muted-foreground">
                    From
                  </span>
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary leading-none">
                    £50
                  </span>
                </div>
              </div>

              {/* Primary Booking CTA */}
              <div className="mt-4 sm:mt-6">
                <a
                  href="#request"
                  className={`${CTA_BASE} w-full justify-center bg-gold text-primary text-sm sm:text-base font-bold tracking-wide shadow-[var(--shadow-soft)] hover:bg-gold/90 hover:-translate-y-0.5 active:scale-[0.99] py-3.5 sm:py-4`}
                >
                  Book Emergency Appointment
                </a>
              </div>
            </div>

            {/* Direct Practice Contact Numbers */}
            <div
              id="hero-call-practices"
              className="mt-6 sm:mt-8 border-t border-border/70 pt-4 sm:pt-6 scroll-mt-28"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] sm:text-xs font-bold tracking-[0.1em] sm:tracking-[0.12em] uppercase text-muted-foreground">
                  Call our practices directly:
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Direct Lines
                </span>
              </div>

              <div
                className={`mt-2.5 sm:mt-3 flex flex-col gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 transition-all duration-300 ${
                  isCallingPracticesBlinking
                    ? "border-2 border-gold animate-gold-border-blink bg-gold/10 shadow-[0_0_16px_rgba(200,160,80,0.35)]"
                    : "border border-border/60 bg-secondary/35"
                }`}
              >
                <a
                  href="tel:01443474441"
                  onClick={() => setIsCallingPracticesBlinking(false)}
                  className="group flex items-center justify-between rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors hover:bg-gold/15"
                >
                  <span className="flex items-center gap-2 sm:gap-2.5">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gold transition-transform group-hover:scale-110" />
                    <span className="font-semibold text-foreground">Mountain Ash</span>
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5 font-bold tracking-tight text-primary transition-colors group-hover:text-gold">
                    <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-gold" />
                    <span className="tabular-nums">01443 474 441</span>
                  </span>
                </a>

                <a
                  href="tel:01685840700"
                  onClick={() => setIsCallingPracticesBlinking(false)}
                  className="group flex items-center justify-between rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors hover:bg-gold/15"
                >
                  <span className="flex items-center gap-2 sm:gap-2.5">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gold transition-transform group-hover:scale-110" />
                    <span className="font-semibold text-foreground">Rhymney</span>
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5 font-bold tracking-tight text-primary transition-colors group-hover:text-gold">
                    <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-gold" />
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
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
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
                src={ke1Img}
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

            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Severe tooth pain can make eating, sleeping and everyday life difficult.
            </p>

            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
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
                className={`${CTA_BASE} bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]`}
              >
                Book Your Emergency Appointment
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="surface-navy scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
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
              <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
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
            <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your personal details (name, telephone number, email, and dental symptoms) are
              collected strictly to arrange and coordinate your emergency appointment at our
              Mountain Ash or Rhymney practices. In compliance with UK GDPR and NHS confidentiality
              standards, your data is never shared or sold to third parties.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* What happens */}
      <section id="process" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
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
            <p className="mt-6 text-sm text-muted-foreground">
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
                ["Filling", "£100"],
                ["Tooth extraction", "£100"],
                ["Root canal", "£200"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border pb-1.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-display text-primary">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs italic text-muted-foreground">
              Prices are starting prices and may vary depending on the treatment required.
            </p>
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
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            badge="Problems we treat"
            title="Emergency Toothache Treatment"
            subtitle="We can help with tooth pain caused by:"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, idx) => {
              const colDelay = (idx % 3) * 0.1;
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
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
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

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
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
                  <AccordionContent className="leading-relaxed text-muted-foreground">
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
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
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
      <section id="practices" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
        <SectionHeading
          badge="Practices"
          title="Find your nearest KAA practice"
          subtitle="Modern, fully equipped practices in Mountain Ash and Rhymney providing emergency appointments."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {[
            {
              name: "Mountain Ash",
              area: "Mountain Ash, Rhondda Cynon Taf",
              postcode: "CF45 3HB",
              phone: "01443 474 441",
              tel: "tel:01443474441",
              hours: "Monday to Saturday: 9AM – 5PM",
              mapUrl: "https://www.google.com/maps/search/KAA+Dentals+Mountain+Ash",
              image: bg1Img,
            },
            {
              name: "Rhymney",
              area: "Rhymney, Caerphilly",
              postcode: "NP22 5PW",
              phone: "01685 840 700",
              tel: "tel:01685840700",
              hours: "Monday to Saturday: 9AM – 5PM",
              mapUrl: "https://www.google.com/maps/search/KAA+Dentals+Rhymney",
              image: ke4Img,
            },
          ].map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: EASE_OUT }}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:border-gold hover:shadow-lg"
            >
              <div>
                {/* Location Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={`${p.name} Practice`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-deep/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-gold" />
                      Emergency Practice
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gold-soft">
                        KAA Dental Care
                      </p>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                        {p.name}
                      </h3>
                    </div>
                    <span className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      {p.postcode}
                    </span>
                  </div>
                </div>

                {/* Location Details */}
                <div className="p-6 space-y-3.5 text-sm">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-foreground/90">{p.area}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-gold" />
                    <span>{p.hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-gold" />
                    <a
                      href={p.tel}
                      className="font-bold text-foreground transition-colors hover:text-gold"
                    >
                      {p.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 border-t border-border/70 p-6 pt-4">
                <a
                  href={p.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${CTA_BASE} flex-1 border border-gold/60 bg-transparent px-5 py-3 text-foreground transition-all hover:bg-gold/15`}
                >
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>Get directions</span>
                </a>
                <a
                  href={p.tel}
                  className={`${CTA_BASE} flex-1 bg-primary px-5 py-3 text-primary-foreground hover:bg-primary/90`}
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
        <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16 md:py-20">
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

            <p className="mt-2.5 sm:mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-300">
              Same-day emergency dental appointments when available across our Mountain Ash and
              Rhymney practices.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#request"
                className={`${CTA_BASE} w-full sm:w-auto justify-center bg-gold text-primary font-bold tracking-wide shadow-[var(--shadow-soft)] hover:bg-gold/90 hover:-translate-y-0.5 active:scale-[0.99] px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base`}
              >
                Book Emergency Appointment
              </a>

              <CallButton className="w-full sm:w-auto justify-center border border-white/25 bg-white/10 text-white font-semibold backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5 active:scale-[0.99] px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base shadow-none" />
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
          className="flex items-center justify-center gap-2 bg-gold py-4 text-sm font-medium text-primary transition-colors active:brightness-90"
        >
          <Phone className="h-4 w-4" /> Call
        </button>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-whatsapp py-4 text-sm font-medium text-whatsapp-foreground"
        >
          <img
            src={WHATSAPP_ICON}
            alt="WhatsApp"
            className="h-4 w-4 brightness-0 invert"
            referrerPolicy="no-referrer"
          />
          WhatsApp
        </a>
        <a
          href="#request"
          className="flex items-center justify-center gap-2 bg-navy-deep py-4 text-sm font-medium text-primary-foreground"
        >
          <CalendarDays className="h-4 w-4" /> Book
        </a>
      </nav>
    </div>
  );
}
