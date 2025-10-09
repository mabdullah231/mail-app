import {
  Dashboard,
  Customers,
  CustomerForm,
  Templates,
  Campaigns,
  Analytics,
  Settings,
  SuperAdmin,

  // Admin
  AdminCompanies,
  AdminPricingPlans,
  EmailLogs,
  DonationsLog,

  // Company
  MyPlan,
  DonationPage,
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

  // Super Admin Only
  {
    path: 'super-admin',
    element: <SuperAdmin />,
    roles: ['admin'],
    label: 'Super Admin',
    icon: 'las la-user-shield',
  },

  // Admin Routes
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
  {
    path: 'email-logs',
    element: <EmailLogs />,
    roles: ['admin'],
    label: 'Email Logs',
    icon: 'las la-envelope',
  },
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

  // Company Routes
  {
    path: 'customers',
    element: <Customers />,
    roles: ['company'],
    label: 'Customers',
    icon: 'las la-address-book',
  },
  {
    path: 'customers/new',
    element: <CustomerForm />,
    roles: ['company'],
    label: 'Add Customer',
    icon: 'las la-user-plus',
    hidden: true, // Hidden from menu but accessible via routing
  },
  {
    path: 'customer/add',
    element: <CustomerForm />,
    roles: ['company'],
    label: 'Add Customer',
    icon: 'las la-user-plus',
    hidden: true, // Hidden from menu but accessible via routing
  },
  {
    path: 'customer/edit/:id',
    element: <CustomerForm />,
    roles: ['company'],
    label: 'Edit Customer',
    icon: 'las la-user-edit',
    hidden: true, // Hidden from menu but accessible via routing
  },
  {
    path: 'templates',
    element: <Templates />,
    roles: ['company'],
    label: 'Templates',
    icon: 'las la-folder-open',
  },
  {
    path: 'campaigns',
    element: <Campaigns />,
    roles: ['company'],
    label: 'Campaigns',
    icon: 'las la-rocket',
  },
  {
    path: 'analytics',
    element: <Analytics />,
    roles: ['company'],
    label: 'Analytics',
    icon: 'las la-chart-bar',
  },
  {
    path: 'settings',
    element: <Settings />,
    roles: ['company'],
    label: 'Settings',
    icon: 'las la-cog',
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

  // Legacy Template Routes (keeping for backward compatibility)
  {
    label: 'Legacy Templates',
    icon: 'las la-folder',
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
  
  // Legacy Campaign Routes (keeping for backward compatibility)
  {
    label: 'Legacy Campaigns',
    icon: 'las la-paper-plane',
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
  
  // Legacy Logs Routes (keeping for backward compatibility)
  {
    label: 'Legacy Logs',
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

// Filter out hidden routes from navigation
export const getVisibleRoutes = (routes) => {
  return routes
    .filter(route => !route.hidden)
    .map(route => {
      if (route.children) {
        return {
          ...route,
          children: route.children.filter(child => !child.hidden)
        };
      }
      return route;
    });
};

export default allRoutes;
