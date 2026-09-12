import { ServiceItem, FaqItem } from './types';

export const COMPANY_DETAILS = {
  name: 'Widecraft Digital',
  tagline: 'Web, Apps & Performance Marketing',
  phone: '+91 77376 49405',
  phoneRaw: '917737649405',
  email: 'contact@widecraftdigital.com',
  address: 'G 304 Himalaya Royal Villa, Opp. Wide Angle Cinema, Nagalpur, Mehsana, Gujarat – 384002',
  mapsQueryUrl: 'https://www.google.com/maps/search/?api=1&query=Himalaya+Royal+Villa+Nagalpur+Mehsana+Gujarat',
  hours: 'Mon – Sat: 9:30 AM to 7:00 PM',
  whatsappBaseUrl: 'https://wa.me/917737649405',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Modern Website Design',
    shortDesc: 'Superfast, mobile-first websites engineered for high conversion rates, SEO indexing, and exceptional speed scores.',
    fullDesc: 'We craft bespoke web experiences that load in under 2 seconds, convey brand authority, and turn casual visitors into paying leads. Every site is built with modern responsive code, structured schemas, and clean UI.',
    iconName: 'layout',
    colorTheme: 'indigo',
    features: [
      'Corporate & Portfolio Sites',
      'E-commerce Solutions',
      'Landing Pages for Lead Gen',
    ],
    deliverables: [
      'Custom Responsive UI/UX Design',
      'Sub-2-second speed optimization',
      'On-Page SEO & Schema Markup',
      'WhatsApp & CRM Integration',
    ],
    typicalTimeline: '7 – 15 Business Days',
    idealFor: 'Businesses wanting high credibility, lead generation & fast digital storefronts.',
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization Expert',
    shortDesc: 'Dominate Google search results with data-driven Technical SEO, high-intent keyword ranking, and Google Business Profile (GMB) mastery.',
    fullDesc: 'We turn search engines into your #1 24/7 client generation engine. From fixing crawlability bottlenecks and Core Web Vitals to publishing schema-rich content and securing authoritative backlinks, our white-hat SEO strategies guarantee compounding, free organic traffic and local Google Maps dominance.',
    iconName: 'search',
    colorTheme: 'amber',
    features: [
      'Top Google Ranking & Keyword Mastery',
      'Technical SEO & Core Web Vitals Fixes',
      'Google Maps & GMB Local Optimization',
    ],
    deliverables: [
      'Comprehensive 100+ Point Technical SEO Audit',
      'High-Intent Commercial Keyword Mapping',
      'On-Page Schema, Meta & Content Optimization',
      'Google Maps / GMB Profile Ranking Booster',
      'Monthly Organic Ranking & Traffic Reports',
    ],
    typicalTimeline: 'Continuous 3 – 6 Month Growth',
    idealFor: 'Businesses wanting sustainable, zero-ad-cost organic leads, local footfall, and permanent Google visibility.',
  },
  {
    id: 'google-ads',
    title: 'Google Ads Strategy',
    shortDesc: 'Laser-targeted Search, Display, and Shopping campaigns designed to minimize cost-per-click and maximize inbound phone leads.',
    fullDesc: 'Stop burning ad budget on irrelevant clicks. We build negative keyword shields, optimize quality scores, and target ready-to-buy consumers searching directly for your products and services.',
    iconName: 'trending-up',
    colorTheme: 'cyan',
    features: [
      'High-Intent Keyword Bidding',
      'Negative Keyword Audits',
      'Lead & Conversion Tracking',
    ],
    deliverables: [
      'Search & Performance Max Campaigns',
      'Conversion tracking setup (GTM & GA4)',
      'A/B Split-tested ad copies',
      'Weekly transparent ROI reports',
    ],
    typicalTimeline: '3 – 5 Days Setup & Launch',
    idealFor: 'Companies needing immediate inbound phone calls, WhatsApp inquiries, and qualified buyers.',
  },
  {
    id: 'social-ads',
    title: 'Social Media Ads',
    shortDesc: 'Scale revenue on Meta (Instagram & Facebook) and LinkedIn through strategic audience retargeting and creative ad copies.',
    fullDesc: 'Harness high-converting visual video & carousel creatives, lookalike audiences, and warm retargeting funnels to capture prospects who showed interest in your brand.',
    iconName: 'share-2',
    colorTheme: 'purple',
    features: [
      'Retargeting & Custom Audiences',
      'Creative Ad Design & Copy',
      'Continuous ROAS Optimization',
    ],
    deliverables: [
      'High-converting static & reel ad creatives',
      'Audience segmentation & pixel tracking',
      'Retargeting funnels for abandoned visitors',
      'Continuous bid & ROAS management',
    ],
    typicalTimeline: 'Ongoing Growth Campaigns',
    idealFor: 'E-commerce brands, B2B services, clinics, real estate, and consumer products.',
  },
  {
    id: 'app-development',
    title: 'Custom Mobile Apps',
    shortDesc: 'Build your own business application with fluid UI/UX, robust databases, secure payment gateways, and real-time alerts.',
    fullDesc: 'We architect native and cross-platform mobile apps for iOS and Android that perform smoothly, keep users engaged, and give your business a direct presence on your customers’ home screens.',
    iconName: 'smartphone',
    colorTheme: 'emerald',
    features: [
      'Android & iOS Cross-Platform',
      'API Integrations & Admin Panels',
      'Play Store / App Store Publishing',
    ],
    deliverables: [
      'iOS & Android native feel',
      'Secure backend API & database',
      'Push notifications & payment integration',
      'Store listing submission & deployment',
    ],
    typicalTimeline: '3 – 6 Weeks',
    idealFor: 'Enterprises needing customer portals, booking apps, on-demand services, or internal ops tools.',
  },
  {
    id: 'ecommerce-growth',
    title: 'E-Commerce & Performance CRO',
    shortDesc: 'Turn store visitors into high-paying repeat customers with checkout funnel optimization, Shopify scaling, and automated WhatsApp cart recovery.',
    fullDesc: 'Stop losing 70%+ of store shoppers at checkout. We architect lightning-fast storefronts, streamline one-click UPI checkout, and deploy automated abandoned cart recovery sequences on WhatsApp to scale your revenue without increasing ad spend.',
    iconName: 'shopping-bag',
    colorTheme: 'rose',
    features: [
      'Shopify & Custom Storefront Architecture',
      'Abandoned Cart WhatsApp Automation',
      'Checkout Speed & Conversion (CRO) Audits',
    ],
    deliverables: [
      'High-converting product landing page layouts',
      'Payment gateway & UPI 1-click checkout flow',
      'Automated cart recovery & WhatsApp sequences',
      'Heatmap tracking & A/B testing setup',
    ],
    typicalTimeline: '10 – 20 Business Days',
    idealFor: 'D2C brands, online retailers, and product businesses looking to multiply store sales and profit margins.',
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    question: 'Where is Widecraft Digital located, and do you take outstation projects?',
    answer: 'Our headquarters is located at G 304 Himalaya Royal Villa, Opp. Wide Angle Cinema, Nagalpur, Mehsana, Gujarat – 384002. While we love meeting regional clients from Mehsana, Ahmedabad, and Gandhinagar in person, we also work with clients across India and internationally via Google Meet, Zoom, and agile project sprints.',
  },
  {
    question: 'Which is the best digital marketing and website design agency in Mehsana, Gujarat?',
    answer: 'Widecraft Digital is North Gujarat’s leading digital growth firm, recognized for sub-2-second speed websites, proven Google Ads (ROAS 4.6x+), technical SEO, and custom Android/iOS applications with 50+ delivered projects and 100% verified local client satisfaction.',
  },
  {
    question: 'Can Widecraft Digital rank my local business on Google Maps (GMB 3-Pack) in Mehsana and Gujarat?',
    answer: 'Yes, absolutely! We specialize in Google Business Profile (GMB) optimization, local citation building, geotagged photos, review acceleration funnels, and local schema markup to get your store, clinic, showroom, or factory ranking #1 in local search results.',
  },
  {
    question: 'Do you provide services in Ahmedabad, Gandhinagar, Visnagar, Patan, and Kadi GIDC?',
    answer: 'Yes! We actively serve corporate enterprises on SG Highway Ahmedabad, tech firms in GIFT City Gandhinagar, export traders in Unjha APMC, and manufacturers in Kadi, Kalol, and Mehsana GIDC with dedicated account managers and fast turnaround.',
  },
  {
    question: 'How fast will my website or mobile app project be delivered?',
    answer: 'Most high-converting websites and landing pages are completed within 7 to 15 business days. Mobile app prototypes take approximately 3 to 4 weeks depending on the complexity of backend features and third-party API integrations.',
  },
  {
    question: 'How do you guarantee transparent ad spend for Google & Meta Ads?',
    answer: 'We run campaigns directly inside your own ad accounts whenever possible, meaning you pay Google and Meta directly with 100% transparency. We provide weekly performance dashboards showing exactly how many clicks, calls, form fills, and WhatsApp chats were generated.',
  },
  {
    question: 'What is the process to get started?',
    answer: 'Simply tap the "Get Free Quote" button or fill out the quick inquiry form below. We will discuss your target audience, analyze your competitors, and deliver a tailored project timeline and budget proposal within 24 hours.',
  },
];
