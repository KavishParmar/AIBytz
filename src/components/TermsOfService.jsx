import LegalPage from "./LegalPage";

/**
 * AIBytz Terms of Service — the agreement that governs use of the site
 * and services. Contains the core liability-limiting clauses (warranty
 * disclaimer, limitation of liability, indemnification).
 */

const CHAPTERS = [
  {
    heading: "Acceptance of terms",
    body: [
      "These Terms of Service (“Terms”) form a binding agreement between you and AIBytz (“AIBytz”, “we”, “us”, or “our”) governing your access to and use of our website, AI employees, chatbots, automations, and related services (together, the “Services”).",
      "By accessing our website, contacting us, or using our Services, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not use the Services.",
      "If you are using the Services on behalf of a business or other entity, you confirm that you have authority to bind that entity, and “you” refers to that entity.",
    ],
  },
  {
    heading: "The services we provide",
    body: [
      "AIBytz builds and operates AI employees, chatbots, WhatsApp and messaging bots, and workflow automations using tools such as n8n, Make, and third-party AI models.",
      "The specific scope, deliverables, fees, and timelines for any engagement are set out in a separate proposal, statement of work, or written agreement. Where those documents conflict with these Terms, the specific engagement document controls for that project.",
      "We may modify, improve, or discontinue any part of the Services at any time. We are not liable to you or any third party for any such change, suspension, or discontinuation, except as expressly agreed in a signed engagement document.",
    ],
  },
  {
    heading: "Your responsibilities",
    body: [
      "To use the Services properly, you agree that:",
      {
        list: [
          "You will provide accurate, complete, and lawful information and content, and you have the rights and permissions to share anything you give us.",
          "You will use the Services only for lawful purposes and will not use them to send spam, infringe others' rights, or break any law or platform policy (including WhatsApp, messaging, and advertising rules).",
          "You are responsible for your own accounts, credentials, data, and the decisions you make based on the Services.",
          "You will keep any login details secure and promptly tell us of any suspected unauthorised use.",
        ],
      },
      "You are solely responsible for ensuring that your use of any automation or AI output complies with the laws and regulations that apply to your business.",
      "By providing your phone number, you consent to receive WhatsApp messages from AIBytz; message and data rates may apply, and you can opt out at any time by replying STOP. You must not misuse our website, automated systems, or messaging channels for spam, harassment, fraud, or malware, which will result in immediate termination of access.",
    ],
  },
  {
    heading: "Fees, payment, and refunds",
    body: [
      "Fees for the Services are set out in your proposal or engagement document. Unless stated otherwise, project quotes are valid for 30 days from the date of issue, and fees are exclusive of applicable taxes, which you are responsible for paying.",
      "Payments are due by the dates stated in the applicable invoice or agreement. Invoices not paid within the agreed timeframe may be subject to a late fee, and late or missed payments may result in suspension or termination of the Services.",
      "Except where required by law or expressly stated in a signed agreement, fees are non-refundable, including for work already performed and third-party costs already incurred on your behalf.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Our website, brand, and the methods, templates, and know-how we use to build the Services remain our property or that of our licensors. Nothing in these Terms transfers those rights to you.",
      "Subject to full payment, you own the custom deliverables we create specifically for you, except for any pre-existing, third-party, or open-source components, which remain owned by their respective owners and are provided to you under their own licences.",
      "You grant us a limited licence to use your content and materials only as needed to provide the Services, and to reference your project and logo as a portfolio example unless you ask us in writing not to.",
    ],
  },
  {
    heading: "Confidentiality",
    body: [
      "Both parties agree to keep confidential any proprietary or sensitive information shared during a service engagement. This includes, but is not limited to, business strategies, technical specifications, customer data, pricing, and financial information.",
      "Neither party will use or disclose the other's confidential information except as needed to perform under these Terms or the applicable engagement, or as required by law.",
      "These confidentiality obligations survive the end of any service agreement for a period of two (2) years, unless a signed engagement document states otherwise.",
    ],
  },
  {
    heading: "Third-party tools and AI output",
    body: [
      "Our Services rely on third-party platforms, APIs, and AI models that we do not own or control (for example messaging providers, automation platforms, hosting, and AI model providers). Your use of those tools is also subject to their own terms.",
      "AI systems can produce output that is inaccurate, incomplete, or unexpected. The Services are provided to assist your business, not to replace professional, legal, financial, medical, or other expert judgement. You are responsible for reviewing output before relying on or acting on it.",
      "We are not responsible for the acts, omissions, outages, pricing changes, policy changes, or failures of any third-party tool, and we do not guarantee uninterrupted or error-free operation of any integration.",
    ],
  },
  {
    heading: "Disclaimers and limitation of liability",
    body: [
      {
        h: "No warranties",
      },
      "The Services are provided “as is” and “as available”, without warranties of any kind, whether express, implied, or statutory, including any implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, or that the Services will be uninterrupted, secure, error-free, or will produce any particular result, revenue, or outcome.",
      {
        h: "Limitation of liability",
      },
      "To the fullest extent permitted by law, AIBytz and its owners, employees, and contractors will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, goodwill, or business, arising out of or relating to the Services, even if advised of the possibility of such damages.",
      "To the fullest extent permitted by law, our total aggregate liability for all claims arising out of or relating to the Services will not exceed the total amount you actually paid to us for the specific Services giving rise to the claim in the three (3) months immediately before the event that caused the liability.",
      "Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited, such as liability for death or personal injury caused by negligence or for fraud.",
    ],
  },
  {
    heading: "Indemnity, termination, governing law & changes",
    body: [
      {
        h: "Indemnification",
      },
      "You agree to defend, indemnify, and hold harmless AIBytz and its owners, employees, and contractors from and against any claims, damages, liabilities, losses, and expenses (including reasonable legal fees) arising out of your content, your use of the Services, your breach of these Terms, or your violation of any law or third-party right.",
      {
        h: "Termination",
      },
      "We may suspend or terminate your access to the Services at any time if you breach these Terms or if we are required to do so by law. Provisions that by their nature should survive termination (including intellectual property, disclaimers, limitation of liability, and indemnity) will survive.",
      {
        h: "Governing law",
      },
      "These Terms are governed by the laws of India, and the courts of India will have jurisdiction over any dispute, without prejudice to any mandatory consumer protections in your country of residence.",
      {
        h: "Changes to these Terms",
      },
      "We may modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice before the new terms take effect; what counts as a material change is determined at our sole discretion. The “Last updated” date above reflects the current version, and continued use of the Services after changes take effect means you accept the updated Terms.",
      {
        h: "Severability",
      },
      "If any provision of these Terms is held to be invalid or unenforceable, that provision will be interpreted to accomplish its objective to the greatest extent permitted by law, and the remaining provisions will continue in full force and effect.",
    ],
  },
];

export default function TermsOfService() {
  return (
    <LegalPage
      seoTitle="Terms of Service | AIBytz"
      seoDescription="The terms that govern your use of AIBytz's website, AI employees, chatbots, and automation services, including disclaimers and limitation of liability."
      path="/terms"
      eyebrow="Legal · Terms"
      title="Terms of Service"
      lastUpdated="November 2, 2026"
      intro="These Terms govern your access to and use of AIBytz's website and services. Please read them carefully — they include important limitations on our liability and describe your responsibilities when using our Services."
      chapters={CHAPTERS}
      closing="These Terms, together with your engagement documents, our Privacy Policy, Cookie Policy, and Disclaimer, make up the entire agreement between you and AIBytz regarding the Services."
    />
  );
}
