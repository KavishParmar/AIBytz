import LegalPage from "./LegalPage";

/**
 * AIBytz Cookie Policy — explains cookies and similar technologies,
 * aligned with GDPR / ePrivacy expectations.
 */

const CHAPTERS = [
  {
    heading: "What cookies are",
    body: [
      "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to make them work more efficiently, and to provide information to the site owners.",
      "We also use similar technologies such as local storage, pixels, and tags. In this policy, we refer to all of these simply as “cookies”.",
      "This Cookie Policy should be read together with our Privacy Policy, which explains how we handle personal information more generally.",
    ],
  },
  {
    heading: "Types of cookies we use",
    body: [
      {
        h: "Strictly necessary cookies",
      },
      "These are essential for the website to function, for example to keep the site secure and to remember choices you make. The site cannot work properly without them, so they do not require consent.",
      {
        h: "Performance and analytics cookies",
      },
      "These help us understand how visitors use our site — which pages are visited and how people move around — so we can improve it. The information is generally aggregated.",
      {
        h: "Functional cookies",
      },
      "These remember your preferences and choices to give you a better experience.",
      {
        h: "Marketing cookies",
      },
      "Where used, these help measure the effectiveness of our campaigns and may be set by advertising partners. We set non-essential cookies only where allowed by applicable law or with your consent.",
    ],
  },
  {
    heading: "Third-party cookies",
    body: [
      "Some cookies may be set by third parties that provide services on our behalf, such as analytics and hosting providers. These third parties may use cookies to collect information about your online activities across websites over time.",
      "We do not control these third-party cookies. Please check the relevant third party's own privacy and cookie policies for more detail about how they use data.",
    ],
  },
  {
    heading: "How we use the information",
    body: [
      "We use the information collected through cookies to:",
      {
        list: [
          "Keep our website secure and working correctly.",
          "Remember your settings and preferences.",
          "Measure and improve the performance of our website and content.",
          "Understand which of our communications and campaigns are effective.",
        ],
      },
      "We do not use cookies to collect more information than we need, and we do not sell information collected through cookies.",
    ],
  },
  {
    heading: "Managing your cookie choices",
    body: [
      "You can control and delete cookies through your browser settings. Most browsers let you refuse or remove cookies, and you can set your browser to alert you when a cookie is being placed.",
      "Please note that if you block or delete strictly necessary cookies, parts of our website may not function properly.",
      "Where we display a cookie banner or consent tool, you can also use it to accept or reject non-essential cookies and to change your choices at any time.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for operational, legal, or regulatory reasons. The “Last updated” date above shows when it was last revised.",
      "If you have any questions about our use of cookies, contact us at hello@AIBytz.com.",
    ],
  },
];

export default function CookiePolicy() {
  return (
    <LegalPage
      seoTitle="Cookie Policy | AIBytz"
      seoDescription="How AIBytz uses cookies and similar technologies on its website, the types of cookies used, and how you can manage your choices."
      path="/cookies"
      eyebrow="Legal · Cookies"
      title="Cookie Policy"
      lastUpdated="November 2, 2026"
      intro="This Cookie Policy explains how AIBytz uses cookies and similar technologies on our website, why we use them, and how you can control them."
      chapters={CHAPTERS}
      closing="By continuing to use our website, you agree to our use of cookies as described in this policy, except for non-essential cookies, which we use only where permitted by law or with your consent."
    />
  );
}
