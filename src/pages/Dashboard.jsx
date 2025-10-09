import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  FileText, 
  TrendingUp,
  Plus,
  BarChart3,
  Calendar,
  AlertCircle,
  ArrowRight,
  Zap,
  Star,
  Activity,
  Moon,
  Sun
} from 'lucide-react';
import { getUserData } from '../utils/auth';
import { dashboardService } from '../services/dashboardService';
import { companyService } from '../services/companyService';

const Dashboard = () => {
  const [theme, setTheme] = useState('light');
  const [stats, setStats] = useState({
    customers: 0,
    templates: 0,
    emailsSent: 0,
    emailsThisMonth: 0,
    monthlyLimit: 100
  });
  const [company, setCompany] = useState({ id: null, name: '', logo: null });
  const [loading, setLoading] = useState(true);
  const user = getUserData();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const statsData = await dashboardService.getDashboardStats();
        const companyData = await companyService.getDetails();
        
        setStats(statsData);
        setCompany(companyData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // const toggleTheme = () => {
  //   setTheme(theme === 'light' ? 'dark' : 'light');
  // };

  const quickActions = [
    {
      name: 'Add Customer',
      href: '/customers/new',
      icon: Users,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Add a new customer to your list'
    },
    {
      name: 'Create Template',
      href: '/templates/new',
      icon: FileText,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Design a new email template'
    },
    {
      name: 'Send Campaign',
      href: '/campaigns/new',
      icon: Mail,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Send emails to your customers'
    },
    {
      name: 'View Analytics',
      href: '/analytics',
      icon: BarChart3,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Check your campaign performance'
    }
  ];

  // Theme-based colors
  const colors = theme === 'dark' ? {
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    cardBg: 'linear-gradient(135deg, rgba(30, 30, 46, 0.9) 0%, rgba(30, 30, 46, 0.7) 100%)',
    cardBgAlt: 'linear-gradient(135deg, rgba(45, 45, 60, 0.9) 0%, rgba(45, 45, 60, 0.7) 100%)',
    text: '#e5e7eb',
    textMuted: '#9ca3af',
    heading: '#f3f4f6',
    statCardBg1: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
    statCardBg2: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.2) 100%)',
    statCardBg3: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(126, 34, 206, 0.2) 100%)',
    statCardBg4: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.2) 100%)',
    alertBg: 'linear-gradient(135deg, rgba(217, 119, 6, 0.3) 0%, rgba(180, 83, 9, 0.3) 100%)',
    progressBg: 'linear-gradient(90deg, #374151, #1f2937)',
    activityBg: 'rgba(45, 45, 60, 0.5)',
    actionCardBg: 'linear-gradient(135deg, rgba(45, 45, 60, 0.8) 0%, rgba(45, 45, 60, 0.6) 100%)',
    floatingBg1: 'rgba(102, 126, 234, 0.05)',
    floatingBg2: 'rgba(240, 147, 251, 0.05)',
    floatingBg3: 'rgba(79, 172, 254, 0.05)'
  } : {
    bg: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    cardBg: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
    cardBgAlt: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
    text: '#1f2937',
    textMuted: '#6b7280',
    heading: '#1f2937',
    statCardBg1: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    statCardBg2: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
    statCardBg3: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(126, 34, 206, 0.1) 100%)',
    statCardBg4: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
    alertBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    progressBg: 'linear-gradient(90deg, #e5e7eb, #d1d5db)',
    activityBg: 'rgba(243, 244, 246, 0.5)',
    actionCardBg: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)',
    floatingBg1: 'rgba(102, 126, 234, 0.1)',
    floatingBg2: 'rgba(240, 147, 251, 0.1)',
    floatingBg3: 'rgba(79, 172, 254, 0.1)'
  };

  return (
    <>
      <style>
        {`
          .glass-card {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
          
          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,${theme === 'dark' ? '0.3' : '0.1'});
          }
          
          .pulse-dot {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
            }
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
            }
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .floating-bg {
            position: fixed;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
            z-index: 0;
          }
          
          .floating-bg:nth-child(1) {
            top: 20%;
            right: 20%;
            background: ${colors.floatingBg1};
            animation-delay: 0s;
          }
          
          .floating-bg:nth-child(2) {
            bottom: 20%;
            left: 20%;
            background: ${colors.floatingBg2};
            animation-delay: 2s;
          }
          
          .floating-bg:nth-child(3) {
            top: 50%;
            left: 50%;
            background: ${colors.floatingBg3};
            animation-delay: 4s;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          .progress-animated {
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
            background-size: 300% 300%;
            animation: gradient 3s ease infinite;
          }
          
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            cursor: pointer;
            padding: 12px;
            border-radius: 50%;
            background: ${colors.cardBg};
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,${theme === 'dark' ? '0.3' : '0.1'});
            border: 1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
            transition: all 0.3s ease;
          }

          .theme-toggle:hover {
            transform: scale(1.1) rotate(15deg);
          }

          .content-wrapper {
            position: relative;
            z-index: 1;
          }
        `}
      </style>

      {/* Floating Background Elements */}
      <div className="floating-bg"></div>
      <div className="floating-bg"></div>
      <div className="floating-bg"></div>

      {/* Theme Toggle Button */}
      {/* <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? (
          <Moon size={20} style={{ color: colors.text }} />
        ) : (
          <Sun size={20} style={{ color: colors.text }} />
        )}
      </div> */}

      <div className="container-fluid py-4 content-wrapper" style={{ background: colors.bg, minHeight: '100vh' }}>
        
        {/* Welcome Header */}
        <div className="card border-0 shadow-lg mb-4 card-hover" style={{ background: colors.cardBg, backdropFilter: 'blur(10px)' }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="d-flex align-items-center mb-2">
                  <div className="me-3 p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', width: '50px', height: '50px' }}>
                    <Zap size={24} className="text-white" />
                  </div>
                  <h1 className="h3 mb-0 fw-bold gradient-text p-2">
                    Welcome back, {user?.user.name || 'User'}!
                  </h1>
                </div>
                <p className="mb-3 fs-6" style={{ color: colors.textMuted }}>
                  Here's what's happening with your email marketing today.
                </p>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center">
                    <div className="pulse-dot me-2" style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
                    <small style={{ color: colors.textMuted }}>All systems operational</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <Star size={16} className="text-warning me-1" fill="currentColor" />
                    <small className="text-warning fw-semibold">Premium Account</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Setup Alert */}
        {!company && (
          <div className="alert border-0 shadow-lg mb-4 card-hover" style={{ background: colors.alertBg }}>
            <div className="d-flex align-items-start">
              <div className="me-3 p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', minWidth: '40px', height: '40px' }}>
                <AlertCircle size={20} className="text-white" />
              </div>
              <div className="flex-fill">
                <h5 className="alert-heading fw-bold mb-2" style={{ color: theme === 'dark' ? '#fbbf24' : '#92400e' }}>
                  Complete your company setup
                </h5>
                <p className="mb-3" style={{ color: theme === 'dark' ? '#fcd34d' : '#b45309' }}>
                  Add your company details to start sending professional emails and unlock all features.
                </p>
                <button
                  className="btn fw-semibold px-4 py-2 rounded-3 d-inline-flex align-items-center shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', border: 'none', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <span className="me-2">Complete Setup</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          {/* Customers Card */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 border-0 shadow-lg card-hover" style={{ background: colors.statCardBg1 }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', width: '50px', height: '50px' }}>
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="text-end">
                    <span className="badge rounded-pill" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white' }}>
                      <TrendingUp size={12} className="me-1" />
                      +12%
                    </span>
                  </div>
                </div>
                <p className="mb-1 fw-medium" style={{ color: colors.textMuted }}>Total Customers</p>
                <h3 className="fw-bold mb-2" style={{ color: colors.heading }}>{stats.customers.toLocaleString()}</h3>
                <small style={{ color: colors.textMuted }}>from last month</small>
              </div>
            </div>
          </div>

          {/* Templates Card */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 border-0 shadow-lg card-hover" style={{ background: colors.statCardBg2 }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', width: '50px', height: '50px' }}>
                    <FileText size={24} className="text-white" />
                  </div>
                  <div className="text-end">
                    <span className="badge rounded-pill" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white' }}>
                      <Plus size={12} className="me-1" />
                      Active
                    </span>
                  </div>
                </div>
                <p className="mb-1 fw-medium" style={{ color: colors.textMuted }}>Templates</p>
                <h3 className="fw-bold mb-2" style={{ color: colors.heading }}>{stats.templates}</h3>
                <small style={{ color: colors.textMuted }}>ready to use</small>
              </div>
            </div>
          </div>

          {/* Emails This Month Card */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 border-0 shadow-lg card-hover" style={{ background: colors.statCardBg3 }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)', width: '50px', height: '50px' }}>
                    <Mail size={24} className="text-white" />
                  </div>
                  <div className="text-end">
                    <small style={{ color: colors.textMuted }}>
                      {Math.round((stats.emailsThisMonth / stats.monthlyLimit) * 100)}% used
                    </small>
                  </div>
                </div>
                <p className="mb-1 fw-medium" style={{ color: colors.textMuted }}>Emails This Month</p>
                <div className="d-flex align-items-baseline mb-2">
                  <h3 className="fw-bold mb-0 me-2" style={{ color: colors.heading }}>{stats.emailsThisMonth}</h3>
                  <span style={{ color: colors.textMuted }}>/{stats.monthlyLimit}</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar progress-animated" 
                    role="progressbar" 
                    style={{ width: `${Math.min((stats.emailsThisMonth / stats.monthlyLimit) * 100, 100)}%` }}
                    aria-valuenow={stats.emailsThisMonth} 
                    aria-valuemin="0" 
                    aria-valuemax={stats.monthlyLimit}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Sent Card */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 border-0 shadow-lg card-hover" style={{ background: colors.statCardBg4 }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', width: '50px', height: '50px' }}>
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <div className="text-end">
                    <span className="badge rounded-pill" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', color: 'white' }}>
                      <Activity size={12} className="me-1" />
                      All time
                    </span>
                  </div>
                </div>
                <p className="mb-1 fw-medium" style={{ color: colors.textMuted }}>Total Sent</p>
                <h3 className="fw-bold mb-2" style={{ color: colors.heading }}>{stats.emailsSent.toLocaleString()}</h3>
                <small style={{ color: colors.textMuted }}>emails delivered</small>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Progress */}
        <div className="card border-0 shadow-lg mb-4 card-hover" style={{ background: colors.cardBg, backdropFilter: 'blur(10px)' }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0 gradient-text">Monthly Email Usage</h4>
              <small style={{ color: colors.textMuted }}>
                {stats.monthlyLimit - stats.emailsThisMonth} emails remaining
              </small>
            </div>
            <div className="mb-3">
              <div className="progress" style={{ height: '12px', background: colors.progressBg }}>
                <div 
                  className="progress-bar progress-animated" 
                  role="progressbar" 
                  style={{ width: `${Math.min((stats.emailsThisMonth / stats.monthlyLimit) * 100, 100)}%` }}
                  aria-valuenow={stats.emailsThisMonth} 
                  aria-valuemin="0" 
                  aria-valuemax={stats.monthlyLimit}
                ></div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="me-2" style={{ width: '8px', height: '8px', backgroundColor: '#667eea', borderRadius: '50%' }}></div>
                <small style={{ color: colors.textMuted }}>{stats.emailsThisMonth} emails sent</small>
              </div>
              <small style={{ color: colors.textMuted }}>{Math.round((stats.emailsThisMonth / stats.monthlyLimit) * 100)}% of limit used</small>
            </div>
            {stats.emailsThisMonth >= stats.monthlyLimit * 0.8 && (
              <div className="mt-3 p-3 rounded-3" style={{ background: colors.alertBg }}>
                <div className="d-flex align-items-center">
                  <AlertCircle size={16} className="text-warning me-2" />
                  <small className="text-warning">You're approaching your monthly limit. Consider upgrading your plan.</small>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card border-0 shadow-lg mb-4 card-hover" style={{ background: colors.cardBg, backdropFilter: 'blur(10px)' }}>
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4 gradient-text">Quick Actions</h4>
            <div className="row g-4">
              {quickActions.map((action, index) => (
                <div key={action.name} className="col-12 col-md-6 col-lg-3">
                  <button
                    className="card h-100 border-0 shadow-sm text-decoration-none card-hover w-100 text-start"
                    style={{ 
                      background: colors.actionCardBg, 
                      backdropFilter: 'blur(5px)',
                      animationDelay: `${index * 100}ms`,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="p-2 rounded-3 me-3" style={{ background: action.gradient, minWidth: '36px', height: '36px' }}>
                          <action.icon size={18} className="text-white d-block mx-auto mt-1" />
                        </div>
                        <div className="flex-fill">
                          <h6 className="fw-bold mb-0" style={{ color: colors.heading }}>{action.name}</h6>
                        </div>
                      </div>
                      <p className="small mb-3" style={{ color: colors.textMuted }}>{action.description}</p>
                      <div className="d-flex align-items-center" style={{ color: colors.textMuted }}>
                        <small className="me-2">Get started</small>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card border-0 shadow-lg card-hover" style={{ background: colors.cardBg, backdropFilter: 'blur(10px)' }}>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0 gradient-text">Recent Activity</h4>
              <button className="btn btn-link text-decoration-none p-0 d-flex align-items-center" style={{ color: colors.text, border: 'none', background: 'transparent' }}>
                <span className="me-2">View all</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="d-flex align-items-center p-3 rounded-3" style={{ background: colors.activityBg }}>
              <div className="p-2 rounded-3 me-3" style={{ background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)', minWidth: '40px', height: '40px' }}>
                <Calendar size={20} className="text-white d-block mx-auto mt-1" />
              </div>
              <div>
                <p className="fw-medium mb-1" style={{ color: colors.text }}>No recent activity</p>
                <small style={{ color: colors.textMuted }}>Your activity will appear here once you start using the platform</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;