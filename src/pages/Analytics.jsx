import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Mail, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Calendar,
  Download
} from 'lucide-react';
import { Container, Row, Col, Card, Button, Form, Badge, Alert } from 'react-bootstrap';
import { emailService } from '../services/emailService';
import { smsService } from '../services/smsService';
import { customerService } from '../services/customerService';
import { companyService } from '../services/companyService';
import { superAdminService } from '../services/superAdminService';
import { getUserData } from '../utils/auth';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalEmails: 0,
    totalSMS: 0,
    totalCustomers: 0,
    emailsThisMonth: 0,
    smsThisMonth: 0
  });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');
  const user = getUserData();
  const [subscriberCounts, setSubscriberCounts] = useState({ email: 0, sms: 0, both: 0, none: 0 });

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      const companyResponse = await companyService.getDetails();
      
      if (companyResponse.company) {
        const [emailStats, smsStats, customers] = await Promise.all([
          emailService.getStats(),
          smsService.getStats(),
          customerService.getAll(companyResponse.company.id)
        ]);

        // Ensure customers is an array (handle API returning {data: []})
        const customersArray = Array.isArray(customers) ? customers : (customers?.data ?? []);

        setStats({
          totalEmails: emailStats.total_sent || 0,
          totalSMS: smsStats.total_sent || 0,
          totalCustomers: customersArray.length || 0,
          emailsThisMonth: emailStats.sent_this_month || 0,
          smsThisMonth: smsStats.sent_this_month || 0
        });

        // Compute subscriber distribution from real customer data (non-overlapping categories)
        const emailOnlySubscribers = customersArray.filter(c => c.notification === 'email').length;
        const smsOnlySubscribers = customersArray.filter(c => c.notification === 'sms').length;
        const bothSubscribers = customersArray.filter(c => c.notification === 'both').length;
        const noneSubscribers = customersArray.filter(c => c.notification === 'none' || (!c.notification)).length;
        
        // Debug: log counts and sample of customers
        console.log('[Analytics] Subscription counts', {
          emailOnlySubscribers,
          smsOnlySubscribers,
          bothSubscribers,
          noneSubscribers,
          customersTotal: customersArray.length,
        });
        console.table(customersArray.slice(0, 10).map(c => ({ id: c.id, notification: c.notification, sms_opt_in: c.sms_opt_in })));
        
        setSubscriberCounts({
          email: emailOnlySubscribers,
          sms: smsOnlySubscribers,
          both: bothSubscribers,
          none: noneSubscribers,
        });
        
        // Only include categories with actual subscribers
        const pieChartData = [];
        if (emailOnlySubscribers > 0) {
          pieChartData.push({ name: 'Email Only', value: emailOnlySubscribers, color: '#3B82F6' });
        }
        if (smsOnlySubscribers > 0) {
          pieChartData.push({ name: 'SMS Only', value: smsOnlySubscribers, color: '#10B981' });
        }
        if (bothSubscribers > 0) {
          pieChartData.push({ name: 'Email & SMS', value: bothSubscribers, color: '#8B5CF6' });
        }
        if (noneSubscribers > 0) {
          pieChartData.push({ name: 'No Notifications', value: noneSubscribers, color: '#6B7280' });
        }
        
        setPieData(pieChartData);

        // Generate sample chart data (in real app, this would come from backend)
        const sampleData = generateSampleChartData();
        setChartData(sampleData);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleChartData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        emails: Math.floor(Math.random() * 50) + 10,
        sms: Math.floor(Math.random() * 30) + 5,
        customers: Math.floor(Math.random() * 10) + 2
      });
    }
    
    return days;
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">Analytics</h1>
          <p className="text-muted mb-0">Track your email and SMS campaign performance</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select"
            style={{ width: 'auto' }}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
          <button className="btn btn-primary d-flex align-items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <Mail className="text-primary" size={32} />
                </div>
                <div className="ms-3">
                  <p className="text-muted mb-1">Total Emails</p>
                  <h3 className="fw-bold text-dark mb-1">{stats.totalEmails}</h3>
                  <p className="text-success small mb-0">+{stats.emailsThisMonth} this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <MessageSquare className="text-success" size={32} />
                </div>
                <div className="ms-3">
                  <p className="text-muted mb-1">Total SMS</p>
                  <h3 className="fw-bold text-dark mb-1">{stats.totalSMS}</h3>
                  <p className="text-success small mb-0">+{stats.smsThisMonth} this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <Users className="text-purple" size={32} />
                </div>
                <div className="ms-3">
                  <p className="text-muted mb-1">Total Customers</p>
                  <h3 className="fw-bold text-dark mb-0">{stats.totalCustomers}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="text-warning" size={32} />
                </div>
                <div className="ms-3">
                  <p className="text-muted mb-1">Growth Rate</p>
                  <h3 className="fw-bold text-dark mb-1">12.5%</h3>
                  <p className="text-success small mb-0">vs last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4 mb-4">
        {/* Campaign Activity Chart */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Campaign Activity</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emails" fill="#3B82F6" name="Emails" />
                  <Bar dataKey="sms" fill="#10B981" name="SMS" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Customer Growth Chart */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Customer Growth</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="customers" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

     
      <div className="row g-4 mb-4">
        {/* Subscription Distribution */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Subscription Distribution</h5>
            </div>
            <div className="card-body">
              {pieData && pieData.length > 0 && pieData.some(d => d.value > 0) ? (
                <>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ value }) => value}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value} customers`, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3 text-center text-muted small">
                    Email Only: {subscriberCounts.email} • SMS Only: {subscriberCounts.sms} • Email & SMS: {subscriberCounts.both} • No Notifications: {subscriberCounts.none}
                  </div>
                </>
              ) : (
                <div className="text-center py-5">
                  <div className="text-muted mb-3">
                    <Users size={48} className="mx-auto d-block mb-2 opacity-50" />
                    <h6>No Customer Data Available</h6>
                    <p className="mb-0">Add customers with notification preferences to see the subscription distribution.</p>
                  </div>
                  <small className="text-muted">
                    Go to <strong>Customers</strong> → <strong>Add Customer</strong> to get started
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="vstack gap-3">
                <div className="d-flex align-items-center">
                  <Mail className="text-primary me-3" size={20} />
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-dark">Email campaign sent</div>
                    <div className="text-muted small">2 hours ago • 45 recipients</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <MessageSquare className="text-success me-3" size={20} />
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-dark">SMS campaign sent</div>
                    <div className="text-muted small">5 hours ago • 23 recipients</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Users className="text-purple me-3" size={20} />
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-dark">New customer added</div>
                    <div className="text-muted small">1 day ago</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Calendar className="text-warning me-3" size={20} />
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-dark">Reminder scheduled</div>
                    <div className="text-muted small">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Performance Metrics</h5>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="h2 fw-bold text-primary mb-1">85%</div>
              <div className="text-muted">Email Open Rate</div>
            </div>
            <div className="col-md-4">
              <div className="h2 fw-bold text-success mb-1">92%</div>
              <div className="text-muted">SMS Delivery Rate</div>
            </div>
            <div className="col-md-4">
              <div className="h2 fw-bold text-purple mb-1">15%</div>
              <div className="text-muted">Click Through Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;