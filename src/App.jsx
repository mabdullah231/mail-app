// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ApiDebugPanel from "./components/Debug/ApiDebugPanel";
import PanelLayout from "./layouts/PanelLayout";
import AuthLayout from "./layouts/Authlayout";
import NotFound404 from "./screens/NotFound404";
import {
  ConfirmMail,
  ForgetPassword,
  SignIn,
  SignUp,
  CodeVerification,
  NewPassword,
  CompanyDetails,
 
  Dashboard,
  Customers,
  CustomerForm,
  Templates,
  Campaigns,
  Analytics,
  Settings,
  SuperAdmin,
  AdminCompanies,
  AdminPricingPlans,
  AdminSettings,
  EmailLogs,
  DonationsLog,
  CompanySettings,
  MyPlan,
  DonationPage,
  CompanyUsers,
  EmailTemplates,
  SMSTemplates,
  SendEmailCampaign,
  SendSMSCampaign,
  CampaignScheduler,
  CompanyEmailLogs,
  CompanySMSLogs,
} from "./screens";
import NotificationRules from "./screens/NotificationRules";
import Home from "./screens/Home";
import Pricing from "./pages/Pricing";
import LegalPages from "./screens/LegalPages";
import TemplatePreview from "./components/Template/TemplatePreview";
import TemplateForm from "./components/Template/TemplateForm";
import NotificationRuleForm from "./components/NotificationRuleForm";
import AuthCallback from "./screens/auth/AuthCallback";
import Helpers from "./config/Helpers";

const ROLE_MAP = {
  0: "admin",
  1: "company",
  2: "user",
};

// 🔥 CLEANUP: Remove corrupted localStorage on app load (ONE TIME FIX)
(() => {
  try {
    const userItem = localStorage.getItem("user");
    // Check if it's the corrupted "[object Object]" string
    if (userItem && (userItem === "[object Object]" || userItem.startsWith("[object"))) {
      console.warn("🧹 Found corrupted user data, clearing localStorage...");
      localStorage.clear();
      return;
    }
    // Try to parse - if it fails, clear it
    if (userItem && userItem !== "null" && userItem !== "undefined") {
      JSON.parse(userItem);
    }
  } catch (error) {
    console.warn("🧹 Corrupted localStorage detected, clearing auth data:", error.message);
    localStorage.clear();
  }
})();

const CompanyDetailsGuard = ({ children }) => {
  const user = Helpers.getItem("user", true);
  const token = Helpers.getItem("token");

  if (!user || !token) {
    Helpers.toast("error", "Please login to access this page");
    return <Navigate to="/sign-in" />;
  }

  if (user.user_type !== "1") {
    Helpers.toast("error", "Only companies can access this page");
    return <Navigate to="/panel" />;
  }

  if (user.company_detail !== null) {
    return <Navigate to="/panel" />;
  }

  return children;
};

const AuthGuard = ({ children, requiredRoles }) => {
  const user = Helpers.getItem("user", true);
  const token = Helpers.getItem("token");

  if (!user || !token) {
    return <Navigate to="/sign-in" replace />;
  }

  const userRole = ROLE_MAP[user.user_type];

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/panel" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy-policy" element={<LegalPages />} />
        <Route path="/terms-conditions" element={<LegalPages />} />
        <Route path="/user-policy" element={<LegalPages />} />

        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Root Route */}
        <Route
          path="/"
          element={(() => {
            const user = Helpers.getItem("user", true);
            const token = Helpers.getItem("token");
            
            if (user && token) {
              return <Navigate to="/panel" replace />;
            }
            return <Navigate to="/home" replace />;
          })()}
        />

        {/* Public Auth Routes */}
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route index element={<SignIn />} />
        </Route>

        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route index element={<SignUp />} />
        </Route>

        {/* Company Details */}
        <Route
          path="/company-details"
          element={
            <CompanyDetailsGuard>
              <AuthLayout />
            </CompanyDetailsGuard>
          }
        >
          <Route index element={<CompanyDetails />} />
        </Route>

        {/* Recovery Routes */}
        <Route path="/forget-password" element={<AuthLayout />}>
          <Route index element={<ForgetPassword />} />
        </Route>

        <Route path="/new-password" element={<AuthLayout />}>
          <Route index element={<NewPassword />} />
        </Route>

        <Route path="/code-verification" element={<AuthLayout />}>
          <Route index element={<CodeVerification />} />
        </Route>

        <Route path="/confirm-mail" element={<AuthLayout />}>
          <Route index element={<ConfirmMail />} />
        </Route>

        {/* Panel Routes */}
        <Route
          path="/panel"
          element={
            <AuthGuard requiredRoles={["admin", "company", "user"]}>
              <PanelLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Admin routes */}
          <Route
            path="companies"
            element={
              <AuthGuard requiredRoles={["admin"]}>
                <AdminCompanies />
              </AuthGuard>
            }
          />
          <Route
            path="pricing-plans"
            element={
              <AuthGuard requiredRoles={["admin"]}>
                <AdminPricingPlans />
              </AuthGuard>
            }
          />
          <Route
            path="email-logs"
            element={
              <AuthGuard requiredRoles={["admin"]}>
                <EmailLogs />
              </AuthGuard>
            }
          />
          <Route
            path="donations-log"
            element={
              <AuthGuard requiredRoles={["admin"]}>
                <DonationsLog />
              </AuthGuard>
            }
          />
          <Route
            path="admin-edit-profile"
            element={
              <AuthGuard requiredRoles={["admin"]}>
                <AdminSettings />
              </AuthGuard>
            }
          />
          <Route
            path="donation-page"
            element={
              <AuthGuard requiredRoles={["admin"]}>
                <DonationPage />
              </AuthGuard>
            }
          />

          {/* Super Admin route */}
          <Route
            path="super-admin"
            element={
              <AuthGuard requiredRoles={["admin"]}>
                <SuperAdmin />
              </AuthGuard>
            }
          />

          {/* Company routes */}
          <Route path="templates">
            <Route
              index
              element={
                <AuthGuard requiredRoles={["company"]}>
                  <Templates />
                </AuthGuard>
              }
            />
            <Route
              path="new"
              element={
                <AuthGuard requiredRoles={["company"]}>
                  <TemplateForm />
                </AuthGuard>
              }
            />
            <Route
              path="edit/:id"
              element={
                <AuthGuard requiredRoles={["company"]}>
                  <TemplateForm />
                </AuthGuard>
              }
            />
            <Route
              path="preview/:id"
              element={
                <AuthGuard requiredRoles={["company"]}>
                  <TemplatePreview />
                </AuthGuard>
              }
            />
          </Route>

          {/* Customer routes */}
          <Route path="customers">
            <Route
              index
              element={
                <AuthGuard requiredRoles={["company"]}>
                  <Customers />
                </AuthGuard>
              }
            />
            <Route
              path="new"
              element={
                <AuthGuard requiredRoles={["company"]}>
                  <CustomerForm />
                </AuthGuard>
              }
            />
            <Route
              path="add"
              element={
                <AuthGuard requiredRoles={["company"]}>
                  <CustomerForm />
                </AuthGuard>
              }
            />
            <Route
              path="edit/:id"
              element={
                <AuthGuard requiredRoles={["company"]}>
                  <CustomerForm />
                </AuthGuard>
              }
            />
          </Route>

          <Route
            path="campaigns"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <Campaigns />
              </AuthGuard>
            }
          />
          <Route
            path="analytics"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <Analytics />
              </AuthGuard>
            }
          />
          <Route
            path="settings"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <Settings />
              </AuthGuard>
            }
          />

          <Route
            path="edit-profile"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <CompanySettings />
              </AuthGuard>
            }
          />
          <Route
            path="my-plan"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <MyPlan />
              </AuthGuard>
            }
          />
          <Route
            path="users"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <CompanyUsers />
              </AuthGuard>
            }
          />
          <Route
            path="notification-rules"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <NotificationRules />
              </AuthGuard>
            }
          />
          <Route
            path="notification-rules/create"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <NotificationRuleForm />
              </AuthGuard>
            }
          />
          <Route
            path="email-templates"
            element={
              <AuthGuard requiredRoles={["company", "admin"]}>
                <EmailTemplates />
              </AuthGuard>
            }
          />
          <Route
            path="sms-templates"
            element={
              <AuthGuard requiredRoles={["company", "admin"]}>
                <SMSTemplates />
              </AuthGuard>
            }
          />
          <Route
            path="send-email-campaign"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <SendEmailCampaign />
              </AuthGuard>
            }
          />
          <Route
            path="send-sms-campaign"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <SendSMSCampaign />
              </AuthGuard>
            }
          />
          <Route
            path="campaign-scheduler"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <CampaignScheduler />
              </AuthGuard>
            }
          />
          <Route
            path="email-logs-company"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <CompanyEmailLogs />
              </AuthGuard>
            }
          />
          <Route
            path="sms-logs-company"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <CompanySMSLogs />
              </AuthGuard>
            }
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {import.meta.env.DEV && <ApiDebugPanel />}
    </Router>
  );
}

export default App;