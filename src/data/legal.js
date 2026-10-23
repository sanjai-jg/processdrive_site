// Legal copy. Each page is { title, updated, intro, sections: [{ h, blocks }] }.
// A block is: a string (paragraph) | { h3 } | { ul: [...] } | { ol: [...] } | { terms: [{ t, d }] } (bold lead + text).
// TODO before launch: the privacy policy should also say that TeleCRM receives contact, career and AI-readiness form submissions.
export const privacy = {
  title: 'Privacy Policy',
  updated: 'September 15, 2021',
  intro: [
    'This Privacy Policy governs the manner in which ProcessDrive India collects, uses, maintains, and discloses information collected from users (each, a “User”) of the https://processdrive.com/ website (“Site”). This privacy policy applies to the Site and all products and services offered by ProcessDrive India.',
  ],
  sections: [
    {
      h: 'What data do we collect?',
      blocks: [
        'We may collect the following information:',
        { ul: ['Name', 'Contact information, including email address', 'Basic details like the person’s country, likes, and areas of interest', 'Other information relevant to customer surveys'] },
      ],
    },
    {
      h: 'How do we use the information we gather?',
      blocks: [
        'ProcessDrive India may collect and use user personal information for the following purposes:',
        { terms: [
          { t: 'To improve the customer service', d: 'Information you provide helps us respond to your customer service requests and support needs more efficiently.' },
          { t: 'To personalize user experience', d: 'We may use information in aggregate to understand how our users, as a group, use the services and resources provided on our Site.' },
          { t: 'To improve our Site', d: 'We may use feedback you provide to improve our products and services.' },
          { t: 'To process payments', d: 'We may use the information Users provide about themselves when placing an order only to provide service to that order. We only share this information with others when it’s needed to deliver the service.' },
          { t: 'To run a promotion, contest, survey, or other site feature', d: 'We send users information they agreed to receive about topics we think will be of interest to them.' },
          { t: 'To send periodic emails', d: 'We may use the email address to send User information and updates pertaining to their order. We may also use the information to reply to users’ questions or requests. If someone joins our mailing list, they’ll get emails with news, updates, or details about our products and services. They can unsubscribe anytime by following the clear instructions provided at the end of each email.' },
        ] },
      ],
    },
    {
      h: 'Personal identification information',
      blocks: [
        'We may gather personal details from users in different ways, such as when they visit our website, sign up, make a purchase, join our newsletter, take a survey, fill out a form, or use any of our features or services. This information may include their name and email address when needed. Users may, however, visit our Site anonymously.',
        'We’ll only gather personal details from users if they agree to use cookies. Users can always refuse to supply personally identifiable information by blocking cookies, except that it may prevent them from engaging in certain Site-related activities.',
      ],
    },
    {
      h: 'Non-personal identification information',
      blocks: [
        'We may collect non-personal details when users use our website. This can include things like the browser they’re using, the type of device, their operating system, internet service provider, and other technical information about how they connect to our site.',
      ],
    },
    {
      h: 'Web browser cookies',
      blocks: [
        'Our Site uses “cookies” to enhance User experience. A cookie is a small file stored on your computer by a website. When you allow it, the cookie helps track website traffic and lets the site recognize your visits. Web browsers save these cookies to keep records and sometimes to track user activity. Users can adjust their browser settings to block cookies or get alerts when cookies are used. However, if cookies are disabled, some parts of the website might not work as expected.',
        'Log cookies help us see which pages visitors are using on the site. This will help our team analyze the Site traffic and improve the website to ensure that it meets User needs and is convenient for the User. We guarantee that we will use collected data for internal analysis and then this information is removed from the system.',
        'Cookies do not let us access your computer or any personal data you haven’t chosen to share with us.',
      ],
    },
    {
      h: 'Cookies on the ProcessDrive India website',
      blocks: [
        { terms: [
          { t: 'Session cookies.', d: 'We use a session cookie to recognize Users on our website and remember log-ins for our system.' },
          { t: 'Google Analytics.', d: 'We use third-party analytics tools, such as Google Analytics, to help us measure web traffic analysis and usage trends and to understand more about the profiles of our users, and how the ProcessDrive India website and content is used in order to enhance the user experience. We guarantee that all User’s data is anonymous. You can opt out of tracking by Google Analytics and Google Analytics Demographics and Interest Reporting services by visiting Google Ads Settings or by downloading the Google Analytics Opt-Out Browser Add-on.' },
          { t: 'Google AdWords and Google Remarketing.', d: 'We use the online ad program Google AdWords and Google Remarketing technology. A conversion tracking cookie is placed when a user clicks on a ProcessDrive India advertisement delivered by Google AdWords. Conversion tracking cookies last for 30 days and don’t collect any personal details. They help us see how many conversions happened and measure how well our ads are doing.' },
          { t: 'Proprietary lead tracking system.', d: 'We use a lead tracking system to monitor where our leads are in the sales and marketing funnel, which allows us to meet the requirements of our potential customers and move our leads to the next sale stage.' },
          { t: 'ProcessDrive CRM.', d: 'We use this tool for managing sales processes (emailing, forecasting, reporting). All collected information is confidential.' },
          { t: 'Email marketing.', d: 'We can send two kinds of emails:' },
        ] },
        { ul: ['Personal correspondence or emails with invoices or business offers', 'Emails for tracking how much traffic our newsletter emails send to our Site, and we can track, at an individual level, whether the User has opened and clicked on it.'] },
        'If you want to be sure that none of your email activity is tracked, you can unsubscribe from the ProcessDrive India newsletter by clicking on the unsubscribe link provided at the end of each newsletter.',
      ],
    },
    {
      h: 'How to opt out of cookies',
      blocks: [
        'You can easily manage the cookies that you allow on your computer through the internet browser that you use.',
        { h3: 'Internet Explorer' },
        { ol: ['Choose “Tools.”', 'Click on “Internet Options.”', 'Click the “Privacy” tab.', 'Move the slider to choose your settings.'] },
        { h3: 'Safari' },
        { ol: ['Choose “Preferences” from the Safari menu.', 'Select “Security.”', 'Cookie settings are shown.', 'Choose your settings.'] },
        { h3: 'Google Chrome' },
        { ol: ['Click on the “Tools” menu.', 'Select “Options.”', 'Click the “Under the Bonnet” tab.', 'Find the “Privacy” section.', 'Click “Content Settings.”', 'Click the “Cookie settings” tab and choose your settings.'] },
        { h3: 'Mozilla Firefox' },
        { ol: ['Click on “Menu”, and then “Options.”', 'Select “Privacy.”', 'Select “Cookies.”', 'Choose your settings.'] },
      ],
    },
    {
      h: 'How we protect your information',
      blocks: [
        'We use proper methods to collect, store, and handle data securely to protect your personal details, like your username, password, and transaction info, from unauthorized access, changes, or leaks.',
        'Any private or sensitive data shared between users and our website is sent through a secure SSL connection, which encrypts the information and protects it with digital signatures.',
      ],
    },
    {
      h: 'Sharing your personal information',
      blocks: [
        'We never sell, trade, or rent your personal information to anyone. We may share general demographic details, not linked to your identity, with trusted partners, affiliates, or advertisers for the purposes mentioned earlier. Sometimes, we work with third-party services to help manage our website or handle tasks like sending newsletters or surveys. Your information will only be shared with them for those specific tasks, and only if you’ve allowed us to do so.',
      ],
    },
    {
      h: 'Managing your personal information',
      blocks: [
        'Every User can restrict the collection or use of personal data:',
        { ul: [
          'A user can require details of personal data that we hold about them under the General Data Protection Regulations. If you would like a copy of the information held on you, please write to ProcessDrive India Pvt. Ltd, 72/2, Sri Ragavendra Nagar, Paachal, Tirupattur, Tamil Nadu, India - 635601.',
          'If you have agreed to us using your personal data for direct marketing and analytical purposes, you may change your mind at any time and request ProcessDrive India to erase that data or cease processing it by writing to or emailing us at info@processdrive.com. The data will be removed within 30 days.',
          'We won’t share, sell, or pass on your personal information to others unless you give us permission or the law requires it.',
          'If you think that any information we are collecting on you is incorrect or incomplete, please write to or email us at info@processdrive.com as soon as possible. We will immediately correct any information at your request.',
          'If you believe that ProcessDrive India is not processing your Personal Data in accordance with the requirements set out herein or applicable to international standard IS/ISO/IEC 27001, you can at any time lodge a complaint with the data protection authority of India.',
        ] },
      ],
    },
    {
      h: 'Third-party websites',
      blocks: [
        'Users might come across ads or content on our site that link to websites of our partners, sponsors, or other third parties. We don’t control what appears on those external sites and aren’t responsible for how they work or handle information. Their content and links may change often, and they may have their own privacy and service policies. When you visit those sites, even if they’re linked from ours, you are subject to their rules and policies, not ours.',
      ],
    },
    {
      h: 'Changes to this privacy policy',
      blocks: [
        'ProcessDrive India has the discretion to update this privacy policy at any time. Whenever we make changes, we’ll update the date shown at the bottom of this page. We recommend that users check this page regularly to stay updated on how we protect the personal information we collect. By using the site, you agree that it’s your responsibility to review this privacy policy from time to time and stay informed about any updates.',
      ],
    },
    {
      h: 'Your acceptance of these terms',
      blocks: [
        'By using this website, you agree to our privacy policy. If you don’t agree, please don’t use the site. If you keep using the site after we update the policy, it means you accept the new changes.',
      ],
    },
    {
      h: 'Contact us',
      blocks: [
        'If you have any questions about our Privacy Policy, how we run the site, or your interactions with us, feel free to reach out through the contact form or email us at info@processdrive.com.',
      ],
    },
  ],
  footnote: 'As stated in Article 28 of the GDPR, the agreement between a data controller and a processor must be in writing. This can also be done electronically, as allowed in section 9 of the same article. Therefore, this Privacy Policy is a legal document and is recognized as a Data Protection Act (DPA).',
}

export const terms = { title: 'Terms & Conditions', updated: '', intro: [], sections: [] }
