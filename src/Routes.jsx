import {
  Dashboard,

  // Admin
  AdminCompanies,
  AdminPricingPlans,
  // AdminSettings,
  // FeatureLimits,
  EmailLogs,
  // EmailExtract,
  // AllTemplates,
  // BrandingSettings,
  DonationsLog,

  // Company
  // CompanySettings,
  MyPlan,
  DonationPage,
  Customers,
  // CompanyUsers,
  NotificationRules,
  EmailTemplates,
  SMSTemplates,
  SendEmailCampaign,
  SendSMSCampaign,
  CampaignScheduler,
  CompanyEmailLogs,
  CompanySMSLogs,

} from './screens';

const allRoutes = [
  // Shared
  {
    path: '',
    element: <Dashboard />,
    roles: ['admin', 'company', 'user'],
    label: 'Dashboard',
    icon: 'las la-home',
  },

  // Admin
  {
    path: 'companies',
    element: <AdminCompanies />,
    roles: ['admin'],
    label: 'Companies',
    icon: 'las la-building',
  },
  {
    path: 'pricing-plans',
    element: <AdminPricingPlans />,
    roles: ['admin'],
    label: 'Pricing Plans',
    icon: 'las la-tags',
  },
  // {
  //   path: 'feature-limits',
  //   element: <FeatureLimits />,
  //   roles: ['admin'],
  //   label: 'Feature Limits',
  //   icon: 'las la-sliders-h',
  // },
  {
    path: 'email-logs',
    element: <EmailLogs />,
    roles: ['admin'],
    label: 'Email Logs',
    icon: 'las la-envelope',
  },
  // {
  //   path: 'email-extract',
  //   element: <EmailExtract />,
  //   roles: ['admin'],
  //   label: 'Email Extract',
  //   icon: 'las la-file-excel',
  // },
  // {
  //   path: 'all-templates',
  //   element: <AllTemplates />,
  //   roles: ['admin'],
  //   label: 'All Templates',
  //   icon: 'las la-copy',
  // },
  // {
  //   path: 'branding-settings',
  //   element: <BrandingSettings />,
  //   roles: ['admin'],
  //   label: 'Branding Settings',
  //   icon: 'las la-pen-nib',
  // },
  {
    label: 'Donations',
    icon: 'las la-credit-card',
    roles: ['admin'],
    children: [
      {
        path: 'donation-page',
        element: <DonationPage />,
        roles: ['admin'],
        label: 'Donation Page',
        icon: 'las la-hand-holding-heart',
      },
  {
    path: 'donations-log',
    element: <DonationsLog />,
    roles: ['admin'],
    label: 'Donations Log',
    icon: 'las la-donate',
  },
]
},
  {
    path: 'customers',
    element: <Customers />,
    roles: ['company'],
    label: 'Customers',
    icon: 'las la-address-book',
  },
  {
    path: 'notification-rules',
    element: <NotificationRules />,
    roles: ['company'],
    label: 'Notification Rules',
    icon: 'las la-bell',
  },

  {
    path: 'my-plan',
    element: <MyPlan />,
    roles: ['company'],
    label: 'My Plan',
    icon: 'las la-star',
  },

  {
    label: 'Templates',
    icon: 'las la-folder-open',
    roles: ['company','admin'],
    children: [
      {
        path: 'email-templates',
        element: <EmailTemplates />,
        label: 'Email Templates',
        icon: 'las la-mail-bulk',
      },
      {
        path: 'sms-templates',
        element: <SMSTemplates />,
        label: 'SMS Templates',
        icon: 'las la-sms',
      },
    ],
  },  
  {
    label: 'Campaigns',
    icon: 'las la-rocket',
    roles: ['company'],
    children: [
      {
        path: 'send-email-campaign',
        element: <SendEmailCampaign />,
        label: 'Send Email Campaign',
        icon: 'las la-paper-plane',
      },
      {
        path: 'send-sms-campaign',
        element: <SendSMSCampaign />,
        label: 'Send SMS Campaign',
        icon: 'las la-comment-dots',
      },
      {
        path: 'campaign-scheduler',
        element: <CampaignScheduler />,
        label: 'Campaign Scheduler',
        icon: 'las la-calendar-alt',
      }
    ],
  },  
  {
    label: 'Logs',
    icon: 'las la-history',
    roles: ['company'],
    children: [
      {
        path: 'email-logs-company',
        element: <CompanyEmailLogs />,
        label: 'Email Logs',
        icon: 'las la-envelope-open-text',
      },
      {
        path: 'sms-logs-company',
        element: <CompanySMSLogs />,
        label: 'SMS Logs',
        icon: 'las la-sms',
      }
    ],
  },  


];

export default allRoutes;
