// Approved service-page content (ProcessDrive, Oct 2026). Digital Marketing is a placeholder: copy still pending.
export const services = [
  {
    slug: 'full-stack-saas-development',
    short: 'Full Stack SaaS Development',
    menu: 'AI-Native Software Development',
    seoTitle: 'AI-Powered Full Stack SaaS Development | ProcessDrive',
    seoDesc: 'AI-powered full stack SaaS development with Vue.js, Laravel, .NET Core, MySQL and MongoDB. LLM APIs, vector search and predictive models built into the product.',
    hero: {
      title: 'AI-Powered Full Stack SaaS Development',
      sub: 'Both sides of your application, built with intelligence designed in from day one, not bolted on later.',
      cta: 'Start your project',
    },
    intro: [
      'AI-powered full stack SaaS development combines proven web engineering with intelligent systems built into the product itself. Using JavaScript and Vue.js on the front end, Laravel and .NET Core on the back end, and MySQL or MongoDB for data, we embed LLM APIs, vector search, and predictive models directly into the application stack. Deployed on AWS or Azure, the result is software that does not just store your data, it reasons over it.',
      'AI-Powered Full Stack SaaS Development means building both the client side and server side of an application with intelligence designed in from day one, not bolted on later. Our developers work across the full technology stack while also handling the AI layer: model selection, prompt architecture, retrieval pipelines, and inference cost control. That single-team approach removes the usual handoff gap between the product team and the AI team, so features ship faster and behave consistently in production.',
    ],
    stackTitle: 'Our stack, with AI in every layer',
    blocks: [
      { num: '01', title: 'Intelligent Frontend', points: [
        'Interfaces built with HTML, CSS, Bootstrap, JavaScript, jQuery, Vue.js, and Flutter, designed to handle streaming AI responses without blocking the UI.',
        'Conversational components, smart search, autocomplete, and inline suggestions that respond in real time.',
        'Flutter delivering the same AI-driven experience across web, Android, and iOS from one codebase.',
      ] },
      { num: '01', title: 'Intelligent Backend', points: [
        'Laravel (PHP), .NET Core, and C# powering the application logic and the AI orchestration layer.',
        'RESTful APIs that route requests to language models, run retrieval against your own data, and return structured, validated output.',
        'Background job queues for document processing, embedding generation, and batch inference so heavy AI work never slows the user.',
      ] },
      { num: '02', title: 'Connecting the Layers', points: [
        'Frontend and backend integrated so AI features feel native to the product, not like an external chatbot dropped on top.',
        'Streaming responses, token-level updates, and asynchronous job status pushed straight to the interface.',
        'Vue.js and Flutter clients consuming Laravel and .NET Core AI endpoints with full state and error handling.',
      ] },
      { num: '02', title: 'Data and Memory', points: [
        'MySQL for transactional records and relational integrity, MongoDB for unstructured content and flexible schemas.',
        'Vector storage and semantic indexing so the application can retrieve context by meaning, not just keyword match.',
        'Clean CRUD, indexing, and query design underneath every AI feature, because model output is only as good as the data it reads.',
      ] },
    ],
    processTitle: 'Our process',
    process: [
      { title: 'Requirement and AI Feasibility', text: 'Work with stakeholders to define the product, then identify where AI creates measurable value and where conventional logic is the better answer. Lock the technology stack, model approach, and data sources before a line of code is written.' },
      { title: 'Front-End Development', text: 'Build the interface in HTML, CSS, and Vue.js with responsive, accessible layouts. Design the interaction patterns for AI features, including loading states, streaming output, confidence signals, and user correction paths.' },
      { title: 'Back-End and AI Layer', text: 'Develop server logic in C# (.NET) and PHP (Laravel), manage databases and server configuration, and expose APIs. Build the retrieval pipeline, prompt structure, output validation, and fallback handling so results stay reliable at scale.' },
      { title: 'Testing, Evaluation and Deployment', text: 'Run end-to-end testing across both layers, plus evaluation runs on AI output for accuracy, tone, and edge cases. Deploy to production with hosting, databases, monitoring, and ongoing tracking of inference cost and model performance.' },
    ],
    closing: { title: 'Ready to build software that reasons over your data?', text: 'ProcessDrive is an ISO certified technology partner building SaaS products for businesses across India and beyond.', cta: 'Book a consultation' },
  },
  {
    slug: 'odoo-implementation-services',
    short: 'Odoo Implementation Services',
    menu: 'AI-Powered Odoo Implementation',
    seoTitle: 'AI-Powered Odoo Implementation Services | ProcessDrive',
    seoDesc: 'Odoo implemented with intelligence: AI layered on your Odoo stack for forecasting, anomaly detection and document processing. ISO certified, AI-driven, built to scale.',
    hero: {
      title: 'Odoo, Implemented with Intelligence',
      sub: 'All-in-one business management software that streamlines operations, automates workflows, and enhances productivity. We take it further: layering AI on top of your Odoo stack so your system doesn’t just record what happened, it tells you what to do next.',
      cta: 'Talk to our Odoo experts',
      tagline: 'ISO certified. AI-driven. Built to scale.',
    },
    intro: [],
    stackTitle: 'Why Odoo, why ProcessDrive',
    blocks: [
      { num: '01', title: 'Optimized for Productivity, Amplified by AI', points: [
        'Real-time dashboards and embedded reporting across Sales, Inventory, Accounting, and more. We add an intelligence layer on top: anomaly detection that flags unusual spend before month-end, demand forecasting that reads your own sales history, and reorder rules that adapt instead of sitting static.',
        'Modules stay tightly integrated (Sales flows to Inventory flows to Invoicing) so there are no manual hand-offs or duplicate entries. Repetitive work like approvals, notifications, and purchase triggers runs on its own. Your team spends its time on decisions, not data entry.',
      ] },
      { num: '02', title: 'All the Tech in One Platform', points: [
        'Over 30 core applications (CRM, Sales, Inventory, Manufacturing, HR, Website, eCommerce) living in one unified system. No silos, no patchwork of disconnected tools.',
        'We extend that stack with AI where it earns its place: intelligent document processing for supplier invoices, natural-language search across your business data, and automated summaries that turn a month of transactions into a paragraph a director can read. Deploy cloud or on-premises. Add or remove apps as you grow.',
      ] },
      { num: '03', title: 'Open Source, Genuinely Yours', points: [
        'The Community edition is open source. You get the source code, the right to modify it, and a global contributor ecosystem behind you. No vendor lock-in.',
        'That openness is exactly what makes AI extension possible. Because we can reach into the code, we can connect Odoo to modern AI models directly, building the intelligence into your workflows rather than bolting on a separate tool that never quite talks to your ERP.',
      ] },
      { num: '04', title: 'Fair, Transparent Pricing', points: [
        'A One App Free plan, a Standard plan covering all apps, and a Custom plan for advanced needs. Odoo’s own position is that pricing exists to fund development and the ecosystem, not to maximise revenue.',
        'Start with fewer users and apps, scale as you go. You pay for what you use, and you can budget for it without surprises.',
      ] },
      { num: '05', title: 'Customisable Down to the Workflow', points: [
        'Modular architecture means you start with core apps and extend as the business evolves. Custom modules, fields, workflows, reports, and interfaces are all on the table.',
        'We build AI-assisted customisations too: models trained on your own operational data, so recommendations reflect how your business actually runs, not a generic industry template. The system adapts to your process. Not the other way round.',
      ] },
    ],
    processTitle: 'How we implement',
    process: [
      { title: 'Requirement Analysis & Planning', text: 'We start by understanding your workflows, constraints, and goals. Our team maps your current process end-to-end and identifies where automation and AI will produce measurable return, and, just as importantly, where they won’t.' },
      { title: 'System Design & Module Selection', text: 'We design your Odoo architecture and select the right combination of modules (Sales, CRM, Inventory, Accounting, HR) with AI touchpoints designed in from the start rather than retrofitted later.' },
      { title: 'Customisation & Development', text: 'We customise modules and build new features to match your business. From interface refinements to backend logic to AI-powered extensions, the platform fits your requirements exactly.' },
      { title: 'Data Migration & Integration', text: 'We migrate data from your existing systems securely and integrate with third-party tools and platforms. Zero data loss, full continuity. AI-assisted cleansing catches duplicates and inconsistencies before they enter your new system.' },
      { title: 'Testing & Quality Assurance', text: 'Functional, performance, and user acceptance testing before go-live. Every deliverable follows our ISO-certified quality process: documented, audited, repeatable.' },
      { title: 'Deployment, Training & Ongoing Support', text: 'We deploy to your live environment, train your team for real adoption, and stay on for continuous support. Performance monitoring flags issues early, so problems get solved before they reach your users.' },
    ],
    closing: { title: 'Ready to run your business on one intelligent platform?', text: 'ProcessDrive is an ISO certified technology partner delivering Odoo implementations across manufacturing, retail, services, and distribution.', cta: 'Book a consultation' },
  },
  {
    slug: 'mobile-app-development',
    short: 'Mobile App Development',
    menu: 'Intelligent Mobile App Development',
    seoTitle: 'Intelligent Mobile App Development (iOS & Android) | ProcessDrive',
    seoDesc: 'iOS and Android apps built with Flutter, Laravel and .NET, with AI built in from day one: on-device intelligence, personalised experiences and predictive features.',
    hero: {
      title: 'Mobile Apps, Built with Intelligence',
      sub: 'We design and build apps for iOS and Android that people actually want to use, and we build AI into them from day one, not as an afterthought. From native performance to cross-platform reach, we ship products that feel fast, look sharp, and get smarter with every user session.',
      cta: 'Start your project',
      tagline: 'ISO certified. AI-driven. Built to scale.',
    },
    intro: [
      'Mobile app development is the process of building software for smartphones and tablets: designing the interface, developing the functionality, testing performance, and ensuring it runs cleanly across platforms.',
      'We work in both models. Native development targets iOS or Android directly for maximum performance and platform-specific polish. Cross-platform development builds from a single codebase, reaching both stores faster and at lower cost. We recommend the right one for your product, budget, and timeline, not the one that’s easiest for us.',
      'Where AI adds real value, we build it in: on-device intelligence, personalised experiences, natural-language interfaces, and predictive features that adapt to how each user behaves.',
    ],
    stackTitle: 'Our technology stack',
    blocks: [
      { num: '01', title: 'Frontend: Flutter & Dart', points: [
        'Flutter gives us expressive, visually rich, and genuinely responsive interfaces from one codebase. Reactive programming keeps interactions smooth across iOS and Android without maintaining two separate apps.',
        'We extend it with AI-ready components: on-device inference, conversational interfaces, and adaptive layouts that respond to user patterns rather than static rules.',
      ] },
      { num: '01', title: 'Backend: Laravel (PHP), .NET & C#', points: [
        'Laravel gives us clean, scalable backend services with a mature ecosystem behind it. .NET and C# provide enterprise-grade server-side architecture and business logic where reliability is non-negotiable.',
        'Both integrate directly with modern AI models, so intelligence lives in your backend where it can serve every client (mobile, web, and future channels alike).',
      ] },
      { num: '02', title: 'Database Dynamics: SQL, MySQL & MongoDB', points: [
        'SQL handles relational data with integrity and consistency where structure matters. MySQL delivers high performance on structured, transactional workloads. MongoDB brings NoSQL flexibility for unstructured and semi-structured data, which is exactly what AI features tend to generate.',
        'We select and combine them based on your data, not on habit.',
      ] },
      { num: '02', title: 'Full-Stack Integration & Best Practices', points: [
        'Flutter talks to Laravel, .NET, and C# services through clean, documented APIs. Real-world patterns (asynchronous requests, API consumption, state management, and data binding) hold the stack together.',
        'We apply proven practices across SQL, MySQL, and MongoDB in combination, tuning queries, caching, and indexing so your app stays fast as the data grows and the user base scales.',
      ] },
    ],
    processTitle: 'How we build',
    process: [
      { title: 'Requirement Analysis', text: 'We gather and analyse user needs to define what the app should actually do, and what it shouldn’t. You get a detailed roadmap before a single line of code is written, including a clear view of where AI adds measurable value and where it’s just noise.' },
      { title: 'UI/UX Design', text: 'We create interfaces that are genuinely enjoyable to use. Wireframes and interactive prototypes let you see and test the flow before development begins, so changes happen when they’re cheap.' },
      { title: 'App Development', text: 'We write and compile front-end and back-end components in parallel, with continuous integration to APIs, databases, and third-party services. AI-assisted code review and automated checks catch issues early in the cycle.' },
      { title: 'Testing & Quality Assurance', text: 'Rigorous functional, performance, and device-compatibility testing across real hardware. User acceptance testing confirms that the app meets expectations before release. Every stage follows our ISO-certified quality process: documented, audited, and repeatable.' },
      { title: 'Deployment & Support', text: 'We handle App Store and Play Store submission, monitor performance post-launch, and stay on for updates, OS-version compatibility, and feature releases as your product evolves.' },
    ],
    closing: { title: 'Have an app idea? Let’s build it properly.', text: 'ProcessDrive is an ISO certified technology partner building mobile products for businesses across India and beyond.', cta: 'Book a consultation' },
  },
  {
    slug: 'website-development',
    short: 'Website Development',
    menu: 'AI-Driven Website Development',
    seoTitle: 'AI-Driven Website Development (Twill CMS & WordPress) | ProcessDrive',
    seoDesc: 'Fast, visually striking websites on Twill (Laravel CMS) and WordPress with AI-assisted personalisation, intelligent search and content tooling built in.',
    hero: {
      title: 'Websites Built to Perform, Designed to Convert',
      sub: 'We craft fast, visually striking websites on Twill (Laravel CMS) and WordPress, and we build intelligence into them, so your site doesn’t just sit there looking good. It adapts, personalises, and works harder for every visitor who lands on it.',
      cta: 'Start your project',
      tagline: 'ISO certified. AI-driven. Built to scale.',
    },
    intro: [
      'Website development is the work of building and maintaining a site end to end: coding, interface design, and making sure everything holds up across devices and browsers.',
      'Front-end handles what your visitors see and touch. Back-end handles server logic, data, and everything running quietly underneath. Both need to be right, and both need to keep working long after launch.',
      'We take it further. AI-assisted personalisation, intelligent search, chat interfaces that actually answer questions, and content recommendations that respond to real user behaviour, built into the site itself rather than bolted on through third-party widgets that slow everything down.',
    ],
    stackTitle: 'Our technology stack',
    blocks: [
      { num: '01', title: 'Frontend: HTML · CSS · Bootstrap · Vue.js · Vuetify', points: [
        'HTML gives your content structure. CSS gives it style and identity. Bootstrap keeps layouts responsive across every screen size without reinventing the grid each time.',
        'Vue.js brings reactivity, so interfaces update instantly instead of reloading. Vuetify layers on Material Design components for a consistent, polished experience throughout.',
        'The result is a front end that loads fast, ranks well, and feels genuinely responsive: the foundation any AI-driven feature needs to sit on top of.',
      ] },
      { num: '02', title: 'Backend: Laravel · Twill CMS', points: [
        'Twill is a content management system built on Laravel, and it’s the reason our clients stop filing tickets just to change a headline.',
        'Laravel’s clean architecture handles the heavy lifting: authentication, routing, business logic, API layers. Twill puts an editing interface on top that non-technical teams can actually use. Your marketing team publishes without waiting on a developer.',
        'Because Laravel connects cleanly to modern AI models, we can build intelligent features directly into your CMS: automated content tagging, SEO suggestions at the point of writing, and draft generation that follows your own brand voice.',
      ] },
      { num: '03', title: 'Database: MySQL & MySQL Workbench', points: [
        'MySQL Workbench lets us design, visualise, and refine your database structure before it becomes a problem to change. The relational model behind Laravel and Twill keeps your data consistent and your queries fast as content volume grows.',
        'Well-structured data is also what makes AI features viable. Personalisation and intelligent search are only as good as the data underneath them.',
      ] },
      { num: '04', title: 'Everything, Working Together', points: [
        'Front end, back end, and database aren’t separate projects; they’re one system. We build them as one: fast-loading interfaces, a CMS your team can run without us, a database that scales, and AI features that earn their place rather than padding a feature list.',
      ] },
    ],
    processTitle: 'How we build',
    process: [
      { title: 'Project Planning', text: 'We define goals, timelines, and deliverables with your stakeholders, and agree on what success looks like in numbers (traffic, conversions, load time) before design begins.' },
      { title: 'Design Phase', text: 'Wireframes and visual drafts map the site’s layout and flow. We focus on making it both attractive and genuinely easy to use, with prototypes you can click through before development starts.' },
      { title: 'Development', text: 'Designs become working code: responsive, cross-browser compatible, and built on clean architecture. AI-assisted code review catches issues early, while performance budgets keep the site fast from the first commit.' },
      { title: 'Content Creation', text: 'We write and gather your text, images, and video, optimised for search and for the people actually reading it. AI-assisted keyword research and content structuring help you rank without turning the copy into keyword soup.' },
      { title: 'Testing', text: 'Thorough functional testing to find and fix bugs, plus usability checks across real devices and browsers. Every stage follows our ISO-certified quality process: documented, audited, repeatable.' },
      { title: 'Launch Preparation', text: 'Hosting setup, domain configuration, SSL, analytics, and final pre-launch checks. Nothing goes live until it passes.' },
      { title: 'Post-Launch Maintenance', text: 'We monitor performance and user feedback, ship updates, and apply security patches as needed. Automated monitoring flags problems before your visitors run into them.' },
    ],
    closing: { title: 'Ready for a website that works as hard as your team?', text: 'ProcessDrive is an ISO certified technology partner building websites and digital platforms for businesses across India and beyond.', cta: 'Book a consultation' },
  },
  {
    slug: 'digital-marketing-services',
    short: 'Digital Marketing Services',
    menu: 'AI Marketing & Growth Services',
    seoTitle: 'AI Marketing & Growth Services | ProcessDrive',
    seoDesc: 'AI-driven digital marketing and growth services from ProcessDrive.',
    placeholder: true,
    hero: {
      title: 'AI Marketing & Growth Services',
      sub: 'AI-driven growth for businesses that want measurable results.',
      cta: 'Talk to us',
    },
    intro: ['[Placeholder: approved copy for this page has not been supplied yet. Send the text and this page will be completed.]'],
    stackTitle: '',
    blocks: [],
    processTitle: '',
    process: [],
    closing: { title: 'Ready to grow with an AI-certified team?', text: 'Tell us your goals and we will suggest where AI can move the numbers.', cta: 'Talk to us' },
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
