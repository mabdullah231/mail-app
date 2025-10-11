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
  Cell
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
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');
  const user = getUserData();

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

        setStats({
          totalEmails: emailStats.total_sent || 0,
          totalSMS: smsStats.total_sent || 0,
          totalCustomers: customers.length || 0,
          emailsThisMonth: emailStats.sent_this_month || 0,
          smsThisMonth: smsStats.sent_this_month || 0
        });

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

  const pieData = [
    { name: 'Email Subscribers', value: stats.totalCustomers * 0.7, color: '#3B82F6' },
    { name: 'SMS Subscribers', value: stats.totalCustomers * 0.4, color: '#10B981' },
    { name: 'Both', value: stats.totalCustomers * 0.3, color: '#8B5CF6' }
  ];

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

      {/* Subscription Distribution & Recent Activity */}
      <div className="row g-4 mb-4">
        {/* Subscription Distribution */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Subscription Distribution</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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