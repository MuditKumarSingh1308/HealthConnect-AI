import Link from "next/link";
import {
  Activity,
  Ambulance,
  Banknote,
  Bell,
  Brain,
  CalendarClock,
  ChevronRight,
  ClipboardList,
  Droplets,
  FileText,
  Hospital,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sidebarItems = [
  { label: "Overview", icon: Activity },
  { label: "Triage", icon: Brain, href: "/triage" },
  { label: "Hospitals", icon: Hospital, href: "/hospitals" },
  { label: "Ambulance", icon: Ambulance, href: "/ambulance" },
  { label: "Blood Bank", icon: Droplets, href: "/blood-bank" },
  { label: "Reports", icon: FileText, href: "/medical-report" },
  { label: "Schemes", icon: Banknote, href: "/schemes" },
  { label: "History", icon: ClipboardList },
];

type QuickAction = {
  label: string;
  icon: LucideIcon;
  href?: string;
};

const quickActions: QuickAction[] = [
  { label: "AI Command Center", icon: Sparkles, href: "/assistant" },
  { label: "Start Triage", icon: Brain, href: "/triage" },
  { label: "Book Ambulance", icon: Ambulance, href: "/ambulance" },
  { label: "Find Blood", icon: Droplets, href: "/blood-bank" },
  { label: "Upload Report", icon: Upload, href: "/medical-report" },
  { label: "Check Schemes", icon: Banknote, href: "/schemes" },
];

const mobileModuleLinks = sidebarItems.filter(
  (item): item is (typeof sidebarItems)[number] & { href: string } => Boolean(item.href),
);

const hospitals = [
  { name: "Apex Emergency Institute", distance: "1.8 km", icuBeds: 9, generalBeds: 28, rating: 4.8 },
  { name: "CityCare Multispecialty", distance: "3.4 km", icuBeds: 5, generalBeds: 42, rating: 4.6 },
  { name: "Metro Trauma Center", distance: "5.1 km", icuBeds: 7, generalBeds: 31, rating: 4.7 },
];

const emergencyContacts = [
  { name: "Aarav Sharma", relation: "Brother", phone: "+91 90000 12345" },
  { name: "Maya Patel", relation: "Primary Doctor", phone: "+91 90000 54321" },
];

type DashboardMainCard = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  href?: string;
};

const mainCards: DashboardMainCard[] = [
  { title: "AI Command Center", value: "Plan", description: "Generate a full emergency action plan.", icon: Sparkles, href: "/assistant" },
  { title: "AI Emergency Triage", value: "Ready", description: "Start a symptom assessment.", icon: Brain, href: "/triage" },
  { title: "Nearby Hospitals", value: "3 found", description: "Hospitals from the demonstration dataset.", icon: Hospital, href: "/hospitals" },
  { title: "Blood Bank Finder", value: "O+", description: "18 sample units nearby.", icon: Droplets, href: "/blood-bank" },
  { title: "Medical Reports", value: "6 files", description: "Latest upload: CBC report.", icon: FileText, href: "/medical-report" },
  { title: "Government Schemes", value: "3 matches", description: "Prototype eligibility suggestions.", icon: Banknote, href: "/schemes" },
  { title: "Medical History", value: "Updated", description: "Allergies and conditions saved.", icon: ClipboardList },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#e2e8f0)] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 px-5 py-6 text-white lg:block">
          <Link href="/">
            <BrandLogo showVersion size="sm" variant="light" />
          </Link>

          <nav className="mt-8 space-y-2">
            {sidebarItems.map((item, index) => (
              item.href ? (
                <Link
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                  href={item.href}
                  key={item.label}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ) : (
                <button
                  aria-current={index === 0 ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    index === 0
                      ? "bg-teal-400/15 text-teal-100"
                      : "cursor-not-allowed text-slate-500"
                  }`}
                  disabled={index !== 0}
                  key={item.label}
                  title={index === 0 ? "Current dashboard overview" : "Detailed history is a future module."}
                  type="button"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            ))}
          </nav>

          <Card className="mt-8 border-white/10 bg-white/[0.06] p-4 text-white">
            <p className="text-sm font-medium">Patient Profile</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              Demo patient profile with care coordination sample data.
            </p>
          </Card>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  aria-describedby="mobile-nav-help"
                  aria-label="Open dashboard navigation"
                  className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 text-slate-400 lg:hidden"
                  disabled
                  title="Mobile sidebar drawer is not enabled in this prototype."
                  type="button"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-sm text-slate-500">Patient Dashboard</p>
                  <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    Welcome to HealthConnect AI
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  aria-describedby="search-care-help"
                  className="hidden cursor-not-allowed bg-teal-600 hover:bg-teal-600 sm:inline-flex"
                  disabled
                  title="Global search is planned for a future release."
                >
                  <Search className="h-4 w-4" />
                  Search Care
                </Button>
                <button
                  aria-describedby="notifications-help"
                  aria-label="View notifications"
                  className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400"
                  disabled
                  title="Notifications are not enabled in this prototype."
                  type="button"
                >
                  <Bell className="h-5 w-5" />
                </button>
                <span className="sr-only" id="mobile-nav-help">
                  Use the mobile module links below the header to navigate dashboard modules.
                </span>
                <span className="sr-only" id="search-care-help">
                  Global care search is planned for a future release.
                </span>
                <span className="sr-only" id="notifications-help">
                  Notifications are not enabled in this prototype.
                </span>
              </div>
            </div>
          </header>

          <div className="px-5 py-8 sm:px-8">
            <nav
              aria-label="Mobile dashboard modules"
              className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden"
            >
              {mobileModuleLinks.map((item) => (
                <Link
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm font-medium text-slate-700 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  href={item.href}
                  key={item.href}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <Card className="overflow-hidden border-0 bg-slate-950 p-0 text-white shadow-2xl shadow-slate-300/70">
                <div className="bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.25),transparent_24rem)] p-6">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
                        <ShieldCheck className="h-4 w-4" />
                        Demo location enabled
                      </p>
                      <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                        Emergency support dashboard
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                        Manage emergency SOS, nearby hospitals, ambulance status, blood support,
                        reports, schemes, and medical history from one patient workspace.
                      </p>
                    </div>
                    <Button
                      aria-describedby="emergency-sos-help"
                      className="h-14 cursor-not-allowed bg-red-600 px-6 text-base hover:bg-red-600"
                      disabled
                      title="Emergency SOS is visual only in this prototype. Call local emergency services for urgent symptoms."
                    >
                      <ShieldAlert className="h-5 w-5" />
                      Emergency SOS
                    </Button>
                    <span className="sr-only" id="emergency-sos-help">
                      Emergency SOS is visual only in this prototype. Contact local emergency
                      services for urgent symptoms.
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="border-red-100 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-red-600">Emergency SOS</p>
                    <h3 className="mt-2 text-2xl font-semibold">Ready to alert contacts</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Phone className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-5 rounded-lg bg-red-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-red-700">
                    <MapPin className="h-4 w-4" />
                    Location status: Demo location enabled
                  </p>
                </div>
                <div className="mt-5 space-y-3">
                  {emergencyContacts.map((contact) => (
                    <div className="flex items-center justify-between gap-3" key={contact.phone}>
                      <div>
                        <p className="text-sm font-medium">{contact.name}</p>
                        <p className="text-xs text-slate-500">{contact.relation}</p>
                      </div>
                      <p className="text-xs text-slate-500">{contact.phone}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {mainCards.map((card) => (
                <Card
                  className={`border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/10 ${
                    card.title === "AI Command Center" ? "border-teal-200 bg-teal-50/60 xl:col-span-2" : ""
                  }`}
                  key={card.title}
                >
                  {card.href ? (
                    <Link className="block" href={card.href}>
                      <DashboardCardContent card={card} />
                    </Link>
                  ) : (
                    <DashboardCardContent card={card} />
                  )}
                </Card>
              ))}
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <Card className="border-slate-200 bg-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-teal-700">Nearby Hospitals</p>
                    <h2 className="mt-1 text-2xl font-semibold">Top prototype recommendations</h2>
                  </div>
                  <Hospital className="h-6 w-6 text-teal-700" />
                </div>

                <div className="mt-5 grid gap-4">
                  {hospitals.map((hospital) => (
                    <div
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white"
                      key={hospital.name}
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-semibold">{hospital.name}</h3>
                          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                            <MapPin className="h-4 w-4" />
                            {hospital.distance}
                          </p>
                        </div>
                        <p className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                          Rating {hospital.rating}
                        </p>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <Metric label="ICU beds" value={hospital.icuBeds} />
                        <Metric label="General beds" value={hospital.generalBeds} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid gap-5">
                <Card className="border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <Ambulance className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">Ambulance Status</p>
                      <h2 className="text-xl font-semibold">Dispatched</h2>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <InfoRow label="Driver name" value="Ravi Kumar" />
                    <InfoRow label="ETA" value="6 minutes" />
                    <InfoRow label="Vehicle number" value="HC 12 AB 2045" />
                    <InfoRow label="Status" value="En route" />
                  </div>
                </Card>

                <Card className="border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-700">Medical History</p>
                      <h2 className="text-xl font-semibold">Patient summary</h2>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <InfoRow label="Blood group" value="O+" />
                    <InfoRow label="Allergies" value="Penicillin" />
                    <InfoRow label="Last visit" value="12 Jun 2026" />
                    <InfoRow label="Conditions" value="Asthma" />
                  </div>
                </Card>
              </div>
            </section>

            <section className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <Card className="border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-700">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-700">Blood Bank Finder</p>
                    <h2 className="text-xl font-semibold">Sample availability</h2>
                  </div>
                </div>
                <div className="mt-5 rounded-lg border border-red-100 bg-red-50 p-4">
                  <p className="text-3xl font-semibold text-red-700">O+</p>
                  <p className="mt-1 text-sm text-red-700">18 units available nearby</p>
                </div>
              </Card>

              <Card className="border-slate-200 bg-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-teal-700">Quick Actions</p>
                    <h2 className="mt-1 text-2xl font-semibold">Common patient tasks</h2>
                  </div>
                  <CalendarClock className="h-6 w-6 text-teal-700" />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                  {quickActions.map((action) => (
                    <Button
                      asChild={Boolean(action.href)}
                      className="h-auto min-h-20 flex-col bg-slate-950 px-3 py-4 text-center shadow-sm hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg"
                      key={action.label}
                    >
                      {action.href ? (
                        <Link href={action.href}>
                          <action.icon className="h-5 w-5" />
                          <span className="text-xs">{action.label}</span>
                        </Link>
                      ) : (
                        <>
                          <action.icon className="h-5 w-5" />
                          <span className="text-xs">{action.label}</span>
                        </>
                      )}
                    </Button>
                  ))}
                </div>
              </Card>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function DashboardCardContent({ card }: { card: DashboardMainCard }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          <card.icon className="h-5 w-5" />
        </div>
        <ChevronRight className="h-5 w-5 text-slate-300" />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{card.title}</p>
      <h3 className="mt-1 text-2xl font-semibold tracking-tight">{card.value}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-3 py-2">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-right text-sm font-medium">{value}</p>
    </div>
  );
}
