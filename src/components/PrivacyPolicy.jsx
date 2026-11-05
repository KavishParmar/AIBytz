import LegalPage from "./LegalPage";

/**
 * AIBytz Privacy Policy — 8 chapters, each rendered as its own white
 * bordered box by <LegalPage />. Written to be clear for users and
 * protective for the company (GDPR, UK GDPR, CCPA/CPRA aligned).
 */

const CHAPTERS = [
  {
    heading: "Information we collect",
    body: [
      "We only collect what we need to run AIBytz and deliver our AI employee, chatbot, and automation services. We group the information into the categories below.",
      {
        h: "Information you give us directly",
      },
      {
        list: [
          "Contact and identity details such as your name, business name, email address, phone number, WhatsApp number, and job title when you fill in a form, subscribe, book an audit, request a consultation, or message us.",
          "Project information you share so we can scope and build your automation, including descriptions of your business, workflows, documents, and any accounts or tools you ask us to connect.",
          "Communication data — the content and metadata of emails, contact forms, chat messages, WhatsApp conversations (including message delivery status and conversation history), and call notes exchanged with our team.",
        ],
      },
      {
        h: "Information we collect automatically",
      },
      {
        list: [
          "Technical and usage data such as your IP address, browser type, device information, pages visited, time spent on pages, referring URLs, and the dates and times of your visits.",
          "Analytics data collected through tools such as Vercel Analytics, which help us understand how often our site is visited and which pages are viewed, so we can improve it.",
          "Cookies and similar technologies, as described in our separate Cookie Policy.",
        ],
      },
      {
        h: "Information from third parties",
      },
      "We may receive information from the platforms and tools you authorise us to integrate (for example WhatsApp Business, n8n, Make, email providers, or CRM systems) and from analytics or advertising partners. We do not knowingly collect more than is necessary for the service you have requested.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use your information only for legitimate business purposes, including:",
      {
        list: [
          "Providing, operating, maintaining, and improving our services, including building and running the AI employees, chatbots, and automations you commission.",
          "Responding to your enquiries, booking audits, and providing customer support.",
          "Sending service messages, updates, invoices, and, where permitted, marketing you can opt out of at any time.",
          "Understanding how our website and services are used so we can improve them.",
          "Protecting our services, preventing fraud or abuse, and enforcing our Terms of Service.",
          "Complying with our legal, tax, and regulatory obligations.",
        ],
      },
      "We do not sell your personal information. We do not use the private data you entrust to us to train public or third-party AI models unless you explicitly instruct us to.",
    ],
  },
  {
    heading: "Legal bases for processing",
    body: [
      "Where the UK GDPR, EU GDPR, or similar laws apply, we rely on one or more of the following legal bases to process your personal data:",
      {
        list: [
          "Contract — processing necessary to provide the services you have requested or to take steps before entering into a contract with you.",
          "Legitimate interests — running, securing, and improving our business, provided your rights do not override those interests.",
          "Consent — where you have given clear consent, for example for certain marketing or non-essential cookies. You may withdraw consent at any time.",
          "Legal obligation — where we must process data to comply with the law, such as accounting and tax requirements.",
        ],
      },
      "If you are in a jurisdiction that does not require a legal basis, we process your information in line with applicable local law.",
    ],
  },
  {
    heading: "How we share information",
    body: [
      "We share personal information only when necessary, and never sell it. We may disclose information to:",
      {
        list: [
          "Service providers and sub-processors who help us run our business (for example hosting, email delivery, analytics, payment, and the automation platforms we build on such as n8n, Make, and messaging providers). They may only use the data to perform services for us.",
          "Meta and WhatsApp — where you communicate with us over WhatsApp, we share message transmission details with Meta platforms to deliver messages via the WhatsApp Business API. Meta's processing of that data is subject to the Meta Privacy Policy.",
          "Professional advisers such as lawyers, accountants, and insurers where reasonably necessary.",
          "Authorities or other parties where required by law, court order, or to protect our rights, safety, or property, or those of others.",
          "A successor entity in connection with a merger, acquisition, financing, or sale of assets, subject to this Privacy Policy.",
        ],
      },
      "We require our service providers to protect your information and to use it only for the purposes we specify.",
    ],
  },
  {
    heading: "WhatsApp & Meta integration",
    body: [
      "We use the WhatsApp Business API, powered by Meta, to send business communications, notifications, support messages, and updates where you have chosen to contact us or receive messages this way.",
      {
        h: "Consent and use",
      },
      "Phone numbers you provide are used solely for WhatsApp messaging and related support, and for the automations you ask us to build and run on your behalf.",
      {
        h: "Data processing",
      },
      "Messages sent through WhatsApp are processed by Meta in accordance with its own privacy policies. We only share the message transmission details needed to deliver your messages.",
      {
        h: "Opt-out",
      },
      "You can opt out of WhatsApp communications from us at any time by replying STOP to any of our messages. Message and data rates may apply.",
    ],
  },
  {
    heading: "International data transfers",
    body: [
      "AIBytz and our service providers may process and store information in countries other than the one where you live, including countries that may not offer the same level of data protection as your own.",
      "Where we transfer personal data across borders, we take steps to ensure it remains protected — for example by relying on appropriate safeguards such as Standard Contractual Clauses or equivalent mechanisms recognised under applicable law.",
      "By using our services or providing us with information, you acknowledge that your information may be transferred to and processed in such countries.",
    ],
  },
  {
    heading: "Data retention and security",
    body: [
      "We keep personal information only for as long as necessary for the purposes described in this policy, to provide our services, to comply with legal, accounting, or reporting obligations, and to resolve disputes. When information is no longer needed, we delete or anonymise it.",
      "We use reasonable technical and organisational measures designed to protect your information against loss, misuse, and unauthorised access, disclosure, alteration, or destruction.",
      "However, no method of transmission or storage over the internet is completely secure. While we work hard to protect your information, we cannot and do not guarantee absolute security, and you provide information to us at your own risk.",
    ],
  },
  {
    heading: "Your rights and choices",
    body: [
      "Depending on where you live, you may have some or all of the following rights over your personal information:",
      {
        list: [
          "Access — request a copy of the personal data we hold about you.",
          "Correction — ask us to correct inaccurate or incomplete data.",
          "Deletion — ask us to delete your data in certain circumstances.",
          "Restriction and objection — ask us to limit or stop certain processing, including direct marketing.",
          "Portability — request your data in a portable, machine-readable format.",
          "Withdraw consent — where we rely on consent, withdraw it at any time without affecting prior processing.",
        ],
      },
      "If you are a California resident, you also have rights under the CCPA/CPRA, including the right to know, delete, correct, and opt out of the sale or sharing of personal information. We do not sell personal information, and we will not discriminate against you for exercising your rights.",
      "To exercise any right, contact us using the details in the final chapter. We may need to verify your identity, and we will respond within the timeframes required by applicable law.",
    ],
  },
  {
    heading: "Children, updates, and contact",
    body: [
      {
        h: "Children's privacy",
      },
      "Our services are intended for businesses and are not directed to individuals under the age of 18. We do not knowingly collect personal information from anyone under 18. If you are a parent or guardian and believe your child has provided us information, please contact us and we will delete it.",
      {
        h: "Changes to this policy",
      },
      "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date above, and significant changes may be communicated to you. Your continued use of our services after an update means you accept the revised policy.",
      {
        h: "How to contact us",
      },
      "If you have questions, requests, or complaints about this policy or your data, contact us at hello@AIBytz.com. You also have the right to lodge a complaint with your local data protection authority.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      seoTitle="Privacy Policy | AIBytz"
      seoDescription="How AIBytz collects, uses, shares, and protects your personal information across our AI employee, chatbot, and automation services."
      path="/privacy"
      eyebrow="Legal · Privacy"
      title="Privacy Policy"
      lastUpdated="November 2, 2026"
      intro="This Privacy Policy explains what information AIBytz collects, how we use and protect it, and the choices and rights you have. Please read it carefully. By using our website and services, you agree to the practices described here."
      chapters={CHAPTERS}
      closing="This Privacy Policy is provided for transparency and does not create any contractual rights beyond those required by applicable law. It should be read together with our Terms of Service, Cookie Policy, and Disclaimer."
    />
  );
}
