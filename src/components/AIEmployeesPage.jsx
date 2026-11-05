import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "./SEO";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkOutro from "./DarkOutro";
import ClickBurst from "./ClickBurst";

export const AI_EMPLOYEES = [
  {
    slug: "ai-sales-agent",
    name: "NIYA",
    role: "Sales & Lead Generation",
    status: "Available",
    avatar: "/ai-employees/niya-sales.png",
    tagline: "Turns first contact into qualified pipeline.",
    objective:
      "To accelerate business growth by qualifying leads, automating follow-ups, and maximizing sales conversions.",
    experience:
      "15+ years of combined sales automation expertise across lead generation, customer engagement, CRM management, and sales pipeline optimization.",
    coreSkills: [
      "Lead Qualification",
      "Sales Follow-ups",
      "CRM Management",
      "Appointment Scheduling",
      "Customer Engagement",
    ],
    qualities: ["Persuasive", "Responsive", "Consistent", "Data-Driven", "Result-Oriented"],
    description:
      "Helping businesses convert more prospects into loyal customers.",
    what: [
      "Inbound & Outbound Lead Qualification — scores every lead instantly, routes the hot ones to your team.",
      "Automated Follow-Up Sequences — never lets a warm lead go cold with timely, personalised nudges.",
      "CRM Data Enrichment — keeps your pipeline clean, tagged, and always up to date.",
      "Appointment Booking & Reminders — schedules meetings and sends reminders so no-shows drop.",
      "Pipeline Reporting — daily snapshots of what moved, what stalled, and where to focus.",
    ],
    outcomes: [
      "3x faster lead response time",
      "Zero missed follow-ups",
      "Higher conversion rates across the funnel",
      "Your sales team focused on closing, not chasing",
    ],
  },
  {
    slug: "ai-customer-support",
    name: "ANAV",
    role: "Customer Support",
    status: "Available",
    avatar: "/ai-employees/anav-support.png",
    tagline: "Resolves the routine so humans handle the hard parts.",
    objective:
      "To deliver fast, accurate, and consistent customer support across every communication channel.",
    experience:
      "15+ years of combined customer service expertise in query resolution, ticket management, omnichannel support, and customer satisfaction.",
    coreSkills: [
      "Query Resolution",
      "Ticket Management",
      "Knowledge Base Assistance",
      "Omnichannel Support",
      "Issue Escalation",
    ],
    qualities: ["Patient", "Reliable", "Helpful", "Professional", "Empathetic"],
    description:
      "Creating exceptional customer experiences through intelligent support.",
    what: [
      "Instant Query Resolution — answers common questions in seconds across chat, email, and WhatsApp.",
      "Smart Ticket Routing — categorises issues and escalates to the right human when needed.",
      "Knowledge Base Search — pulls the exact answer from your docs instead of making customers hunt.",
      "Omnichannel Presence — same quality support on every channel your customers use.",
      "Customer Sentiment Tracking — flags unhappy interactions before they become churn.",
    ],
    outcomes: [
      "80% of routine queries handled without a human",
      "Average response time under 10 seconds",
      "Higher CSAT and NPS scores",
      "Support team freed for complex, high-value cases",
    ],
  },
  {
    slug: "ai-hr-recruiter",
    name: "PRATI",
    role: "HR & Recruitment",
    status: "Available",
    avatar: "/ai-employees/prati-hr.png",
    tagline: "Keeps every candidate moving without the busywork.",
    objective:
      "To streamline recruitment and HR operations through intelligent automation and employee support.",
    experience:
      "15+ years of combined HR and recruitment expertise in talent acquisition, candidate screening, onboarding, and employee engagement.",
    coreSkills: [
      "Resume Screening",
      "Candidate Evaluation",
      "Interview Scheduling",
      "Employee Support",
      "Onboarding",
    ],
    qualities: ["Organized", "Fair", "Efficient", "Supportive", "People-Focused"],
    description:
      "Helping organizations hire faster and build stronger teams.",
    what: [
      "Resume Screening & Shortlisting — ranks applicants against your criteria in seconds, not days.",
      "Candidate Communication — sends updates, collects documents, and answers FAQs automatically.",
      "Interview Scheduling — coordinates calendars and sends confirmations without back-and-forth.",
      "Onboarding Workflows — walks new hires through paperwork, training links, and first-week checklists.",
      "Employee Query Handling — answers policy questions so HR isn't interrupted for routine look-ups.",
    ],
    outcomes: [
      "50% faster time-to-hire",
      "Zero candidate ghosting from slow follow-ups",
      "Consistent, bias-reduced screening",
      "HR team focused on culture and strategy, not admin",
    ],
  },
  {
    slug: "ai-it-helpdesk",
    name: "ANIK",
    role: "IT Helpdesk",
    status: "Available",
    avatar: "/ai-employees/anik-it.png",
    tagline: "Captures the issue and fixes what it can.",
    objective:
      "To simplify IT support by resolving common technical issues and improving service efficiency.",
    experience:
      "15+ years of combined IT support expertise in helpdesk operations, troubleshooting, ticket management, and user assistance.",
    coreSkills: [
      "Technical Support",
      "Ticket Management",
      "Password Assistance",
      "Troubleshooting",
      "Issue Escalation",
    ],
    qualities: ["Analytical", "Efficient", "Reliable", "Solution-Focused", "Detail-Oriented"],
    description:
      "Keeping your business running with uninterrupted IT support.",
    what: [
      "Level-1 Troubleshooting — resolves password resets, connectivity issues, and common errors instantly.",
      "Automated Ticket Creation — logs every issue with the right category, priority, and context.",
      "Knowledge Base Guidance — walks users through step-by-step fixes from your internal docs.",
      "Escalation Routing — hands complex issues to the right engineer with full context attached.",
      "Status Updates — keeps users informed so they stop pinging your team for ETAs.",
    ],
    outcomes: [
      "60% of L1 tickets resolved without human help",
      "Faster mean time to resolution",
      "Fewer repeated tickets for the same issue",
      "IT team focused on infrastructure, not password resets",
    ],
  },
  {
    slug: "ai-billing-collections",
    name: "AADI",
    role: "Collections & Billing",
    status: "Available",
    avatar: "/ai-employees/aadi-billing.png",
    tagline: "Recovers revenue while staying compliant and kind.",
    objective:
      "To improve cash flow by automating billing communications and payment recovery processes.",
    experience:
      "15+ years of combined finance and collections expertise in invoice management, payment follow-ups, billing operations, and account reconciliation.",
    coreSkills: [
      "Invoice Management",
      "Payment Reminders",
      "Collections",
      "Billing Automation",
      "Account Tracking",
    ],
    qualities: ["Accurate", "Persistent", "Professional", "Reliable", "Process-Oriented"],
    description:
      "Ensuring timely payments while maintaining strong customer relationships.",
    what: [
      "Automated Payment Reminders — sends friendly, escalating nudges before and after due dates.",
      "Invoice Delivery & Tracking — generates, sends, and confirms receipt of every invoice.",
      "Collections Follow-Up — pursues overdue accounts with compliant, professional messaging.",
      "Account Reconciliation — matches payments to invoices and flags discrepancies instantly.",
      "Cash-Flow Reporting — gives you a real-time view of receivables and collection rates.",
    ],
    outcomes: [
      "30% reduction in overdue invoices",
      "Faster payment cycles",
      "Consistent, professional collections tone",
      "Finance team freed from repetitive chase-ups",
    ],
  },
  {
    slug: "ai-market-researcher",
    name: "VAAYU",
    role: "Market Research & Surveys",
    status: "Available",
    avatar: "/ai-employees/vaayu-research.png",
    tagline: "Turns conversations into clean, usable insight.",
    objective:
      "To transform customer feedback into actionable business insights for informed decision-making.",
    experience:
      "15+ years of combined market research expertise in survey management, customer insights, analytics, and reporting.",
    coreSkills: [
      "Survey Automation",
      "Feedback Collection",
      "Data Analysis",
      "Trend Identification",
      "Report Generation",
    ],
    qualities: ["Curious", "Analytical", "Insightful", "Accurate", "Strategic"],
    description:
      "Turning customer opinions into business opportunities.",
    what: [
      "Automated Survey Distribution — sends surveys at the right moment in the customer journey.",
      "Real-Time Feedback Collection — captures responses across chat, email, and web.",
      "Sentiment & Theme Analysis — spots patterns and sentiment shifts you'd miss in a spreadsheet.",
      "Trend Reporting — delivers weekly or monthly insight digests to your inbox.",
      "Competitive Signal Monitoring — tracks public reviews and mentions for you and your competitors.",
    ],
    outcomes: [
      "10x faster insight turnaround",
      "Higher survey response rates",
      "Data-backed decisions instead of guesswork",
      "Product and service improvements driven by real feedback",
    ],
  },
  {
    slug: "ai-receptionist",
    name: "VAANI",
    role: "Receptionist & Front Desk",
    status: "Available",
    avatar: "/ai-employees/vaani-reception.png",
    tagline: "The always-on front door for every conversation.",
    objective:
      "To ensure every customer call is answered promptly and professionally while managing appointments and enquiries efficiently.",
    experience:
      "15+ years of combined front-office and call handling expertise across appointment scheduling, visitor management, and business communications.",
    coreSkills: [
      "Call Handling",
      "Appointment Booking",
      "Call Routing",
      "Visitor Assistance",
      "Enquiry Management",
    ],
    qualities: ["Courteous", "Professional", "Attentive", "Organized", "Dependable"],
    description:
      "Making every first impression professional and memorable.",
    what: [
      "24/7 Call & Chat Handling — greets every visitor and caller instantly, no hold music.",
      "Appointment Scheduling — books, reschedules, and confirms meetings in real time.",
      "Intelligent Call Routing — understands the request and connects to the right person or department.",
      "Visitor Pre-Screening — collects purpose, contact info, and context before the handoff.",
      "FAQ & Enquiry Handling — answers the questions your front desk gets asked ten times a day.",
    ],
    outcomes: [
      "Zero missed calls or messages",
      "Professional first impression 24/7",
      "Reduced receptionist workload by 70%",
      "Every enquiry logged and routed correctly",
    ],
  },
  {
    slug: "ai-social-media-manager",
    name: "REVA",
    role: "Social Media Manager",
    status: "Available",
    avatar: "/ai-employees/vaayu-research.png",
    tagline: "Keeps your brand visible while you focus on the business.",
    objective:
      "To maintain a consistent, engaging social media presence that drives brand awareness and audience growth.",
    experience:
      "10+ years of combined social media management expertise across content planning, scheduling, community engagement, and analytics.",
    coreSkills: [
      "Content Scheduling",
      "Community Management",
      "Analytics & Reporting",
      "Trend Monitoring",
      "Brand Voice Consistency",
    ],
    qualities: ["Creative", "Consistent", "Data-Savvy", "Responsive", "Brand-Aware"],
    description:
      "Growing your audience and keeping your brand top-of-mind, every single day.",
    what: [
      "Content Calendar Management — plans and schedules posts across all platforms in advance.",
      "Community Engagement — responds to comments, DMs, and mentions promptly and on-brand.",
      "Performance Analytics — tracks engagement, reach, and growth with weekly dashboards.",
      "Trend Monitoring — spots relevant trends and suggests timely content hooks.",
      "Cross-Platform Consistency — ensures your brand voice is the same on Instagram, LinkedIn, X, and beyond.",
    ],
    outcomes: [
      "Consistent posting schedule with zero gaps",
      "Higher engagement rates across platforms",
      "Weekly performance reports without manual work",
      "Your team freed from daily social media upkeep",
    ],
  },
];

function EmployeeCard({ employee, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link
        to={`/ai-employees/${employee.slug}`}
        className="group relative flex flex-col bg-white rounded-2xl border border-[#e0ddd6] overflow-hidden h-full hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300"
      >
        {/* Status badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 bg-paper/90 backdrop-blur-sm text-ink rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
            {employee.status}
          </span>
        </div>

        {/* Avatar section */}
        <div className="relative h-56 sm:h-64 bg-gradient-to-b from-[#1a1726] to-[#0f0d14] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
          <img
            src={employee.avatar}
            alt={employee.name}
            className="relative w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-500"
          />
          {/* Number */}
          <span className="absolute bottom-3 left-4 font-mono text-xs text-white/20 tracking-widest">
            {String(index + 1).padStart(2, "0")} / {String(AI_EMPLOYEES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-display uppercase text-xl sm:text-2xl tracking-tight text-paper">
              {employee.name}
            </h3>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion mb-3">
            {employee.role}
          </p>

          <p className="font-sans text-sm text-[#555] leading-relaxed mb-4 flex-1">
            {employee.description}
          </p>

          {/* Skills preview */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {employee.coreSkills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center border border-[#e0ddd6] rounded-full px-2.5 py-1 font-mono text-[9px] tracking-wider text-[#777] uppercase"
              >
                {skill}
              </span>
            ))}
            {employee.coreSkills.length > 3 && (
              <span className="inline-flex items-center border border-[#e0ddd6] rounded-full px-2.5 py-1 font-mono text-[9px] tracking-wider text-[#999] uppercase">
                +{employee.coreSkills.length - 3}
              </span>
            )}
          </div>

          <div className="h-px bg-[#e5e3dc] mb-4" />

          {/* Tagline */}
          <p className="font-mono text-xs text-mist italic leading-relaxed mb-4">
            &ldquo;{employee.tagline}&rdquo;
          </p>

          <div className="mt-auto">
            <span className="inline-flex items-center gap-1.5 font-display uppercase text-sm tracking-wide text-vermilion group-hover:gap-3 transition-all duration-300">
              View full profile
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function HeroBand() {
  return (
    <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-36 sm:pt-44 pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-5"
        >
          Meet the team
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase text-[14vw] sm:text-8xl lg:text-9xl leading-[0.88] tracking-tight text-paper mb-6"
        >
          AI
          <br />
          Employees
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-2xl text-paper/60 text-base sm:text-lg leading-relaxed"
        >
          Eight specialised AI employees for sales, support, HR, IT, billing, research,
          reception, and social media. Each one trained, tested, and ready to work from
          day one — pick the right fit, or hire the whole team.
        </motion.p>

        {/* Quick stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          {["24/7 Availability", "Trained on Your Data", "No Onboarding Delay", "Fraction of Salary Cost"].map((stat) => (
            <span
              key={stat}
              className="inline-flex items-center gap-2 border border-paper/15 rounded-full px-4 py-2 font-mono text-[10px] sm:text-xs tracking-wider text-paper/50 uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion shrink-0" />
              {stat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EmployeesCTA() {
  return (
    <section className="relative overflow-hidden bg-vermilion px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[0.07]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-black/[0.06]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-white/70 mb-6"
        >
          Ready to hire?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase text-[15vw] sm:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-tight text-white mb-8 sm:mb-10"
        >
          Hire Your
          <br />
          AI Team<span className="text-paper">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-12 flex flex-col gap-1"
        >
          <p className="text-white text-lg sm:text-xl font-semibold">
            Not sure which AI employee fits? Let's figure it out together.
          </p>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            30 minutes, no pitch deck — just a clear picture of who can take over
            the work you shouldn't be doing manually.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 rounded-full bg-white text-vermilion px-10 py-5 sm:px-14 sm:py-6 font-mono text-sm sm:text-base uppercase tracking-widest font-bold hover:bg-paper hover:text-ink transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          >
            Book a Strategy Call
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>

          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
            &#9679;&ensp;Available globally&ensp;&#9679;
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function AIEmployeesPageContent() {
  return (
    <>
      <SEO
        title="AI Employees | AIBytz — Hire AI That Works 24/7"
        description="Meet AIBytz's eight specialised AI employees: Sales, Support, HR, IT, Billing, Research, Receptionist, and Social Media Manager. Trained, ready, and a fraction of the cost."
        path="/ai-employees"
      />
      <Nav />
      <main>
        <HeroBand />

        {/* Employee grid */}
        <section className="bg-[#f9f7f2] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {AI_EMPLOYEES.map((emp, i) => (
                <EmployeeCard key={emp.slug} employee={emp} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Pick & deploy band */}
        <section className="bg-ink px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="flex-1"
              >
                <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-vermilion mb-4">
                  It's that simple
                </p>
                <h2 className="font-display uppercase text-[12vw] sm:text-7xl lg:text-8xl leading-[0.88] tracking-tight text-paper">
                  Pick one.
                  <br />
                  <span className="text-vermilion">Deploy it.</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="lg:max-w-sm w-full flex flex-col gap-5"
              >
                <p className="font-mono text-base sm:text-lg leading-[1.8] text-paper/60">
                  Choose the AI employee that matches the role you need filled. We handle the setup, training, and integration — you get a working hire, ready to go in your business.
                </p>
                <div className="h-px bg-paper/10" />
                <p className="font-mono text-sm font-bold text-paper/80 leading-[1.7]">
                  No long onboarding. No learning curve.{" "}
                  <span className="text-vermilion">Just results from day one.</span>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <DarkOutro>
          <EmployeesCTA />
          <Footer />
        </DarkOutro>
      </main>
    </>
  );
}

export default function AIEmployeesPage() {
  return (
    <>
      <AIEmployeesPageContent />
      <ClickBurst />
    </>
  );
}
