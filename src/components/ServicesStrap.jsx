const SERVICES = [
  "WEBSITES",
  "E-COMMERCE",
  "WHATSAPP BOTS",
  "AI AUTOMATIONS",
  "WORKFLOWS",
  "LEAD CAPTURE",
];

function StripItems() {
  return (
    <>
      {SERVICES.map((service) => (
        <span key={service} className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span
            className="flex items-center justify-center w-5 sm:w-6 text-paper text-2xl sm:text-3xl font-bold"
            aria-hidden="true"
          >
            *
          </span>
          <span className="font-display uppercase text-xl sm:text-3xl tracking-wide text-ink">
            {service}
          </span>
        </span>
      ))}
    </>
  );
}

const COPIES = 8;

export default function ServicesStrap() {
  return (
    <div className="relative overflow-hidden border-y border-vermilion bg-vermilion py-2 sm:py-3">
      <div className="strap-track flex w-max items-center gap-10 sm:gap-14">
        {Array.from({ length: COPIES }, (_, i) => (
          <div
            key={i}
            className="flex items-center gap-10 sm:gap-14 shrink-0"
            aria-hidden={i > 0 ? "true" : undefined}
          >
            <StripItems />
          </div>
        ))}
      </div>
    </div>
  );
}
