import LegalPage from "./LegalPage";

/**
 * AIBytz Disclaimer — limits liability for the accuracy of AI output,
 * results, external links, and professional advice.
 */

const CHAPTERS = [
  {
    heading: "General information only",
    body: [
      "The information provided by AIBytz on our website and through our Services is for general informational and business-support purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding its accuracy, adequacy, validity, reliability, availability, or completeness.",
      "Under no circumstances will AIBytz have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or Services, or reliance on any information provided. Your use of the site and Services, and your reliance on any information, is solely at your own risk.",
    ],
  },
  {
    heading: "AI output disclaimer",
    body: [
      "Our Services use artificial intelligence, large language models, chatbots, and automated workflows. These systems can generate output that is inaccurate, incomplete, outdated, biased, or otherwise unexpected.",
      "AI output is not guaranteed to be correct and should not be treated as a substitute for human review or professional judgement. You are responsible for checking and validating any output before relying on it, sharing it, or acting on it.",
      "AIBytz is not liable for any decision made, action taken, or result obtained based on AI-generated output or automated processes.",
    ],
  },
  {
    heading: "No professional advice",
    body: [
      "The Services do not constitute legal, financial, tax, medical, or other professional advice. Content and output are not a substitute for advice from a qualified professional who knows your specific situation.",
      "Before making any decision or taking any action that may affect your business, finances, or legal position, you should consult an appropriately qualified professional. We disclaim all liability for actions taken in reliance on information or output provided through the Services.",
    ],
  },
  {
    heading: "Results and performance",
    body: [
      "Any examples, case studies, estimates, or statements about potential outcomes, time savings, leads, revenue, or performance are illustrative only and are not guarantees or promises of any particular result.",
      "Results depend on many factors outside our control, including your market, your inputs, third-party platforms, and how you use the Services. We do not warrant that the Services will achieve any specific outcome for your business.",
    ],
  },
  {
    heading: "External links and third parties",
    body: [
      "Our website and Services may contain links to, or rely on, third-party websites, platforms, and tools that we do not control, such as messaging providers, automation platforms, hosting, and AI model providers.",
      "We do not monitor, endorse, or assume responsibility for the accuracy, content, products, services, policies, or practices of any third party. Any dealings you have with a third party are solely between you and that third party.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "We may update this Disclaimer at any time. The “Last updated” date above shows the current version, and your continued use of the site or Services after any change means you accept the updated Disclaimer.",
      "This Disclaimer should be read together with our Terms of Service, which contain additional and controlling limitations of liability. If you have any questions, contact us at hello@AIBytz.com.",
    ],
  },
];

export default function Disclaimer() {
  return (
    <LegalPage
      seoTitle="Disclaimer | AIBytz"
      seoDescription="AIBytz's disclaimer covering the accuracy of AI output, results, professional advice, and third-party tools used in our automation services."
      path="/disclaimer"
      eyebrow="Legal · Disclaimer"
      title="Disclaimer"
      lastUpdated="November 2, 2026"
      intro="This Disclaimer sets out important limitations on the information and output provided by AIBytz. Please read it carefully before relying on any part of our website or Services."
      chapters={CHAPTERS}
      closing="This Disclaimer does not exclude any liability that cannot lawfully be excluded under applicable law."
    />
  );
}
