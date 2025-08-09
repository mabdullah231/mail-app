// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
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
} from "./screens";
import Helpers from "./config/Helpers";
import {
  Dashboard,
  // Admin
  AdminCompanies,
  AdminPricingPlans,
  AdminSettings,
  EmailLogs,
  DonationsLog,
  // Company
  CompanySettings,
  MyPlan,
  DonationPage,
  Customers,
  CompanyUsers,
  NotificationRules,
  EmailTemplates,
  SMSTemplates,
  SendEmailCampaign,
  SendSMSCampaign,
  CampaignScheduler,
  CompanyEmailLogs,
  CompanySMSLogs,
} from "./screens";
import AuthCallback from "./screens/auth/AuthCallback";

const ROLE_MAP = {
  0: "admin",
  1: "company",
  2: "user",
};

const CompanyDetailsGuard = ({ children }) => {
  const user = Helpers.getItem("user", true);
  const token = Helpers.getItem("token");

  // Must be logged in
  if (!user || !token) {
    Helpers.toast("error", "Please login to access this page");
    return <Navigate to="/sign-in" />;
  }

  // Must be a company
  if (user.user_type !== "1") {
    Helpers.toast("error", "Only companies can access this page");
    return <Navigate to="/panel" />;
  }

  // Must not already have company details
  if (user.company_detail !== null) {
    return <Navigate to="/panel" />;
  }

  return children;
};

const AuthGuard = ({ children, requiredRoles }) => {
  const user = Helpers.getItem("user", true);
  const token = Helpers.getItem("token");
  const userRole = ROLE_MAP[user?.user_type];

  if (!user || !token) {
    Helpers.toast("error", "Please login to access dashboard");
    return <Navigate to="/sign-in" />;
  }

  if (userRole === "company" && !user.company_detail) {
    return <Navigate to="/company-details" />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    Helpers.toast("error", "You don't have permission to access this page");
    return <Navigate to="/panel" />;
  }

  return children;
};

// FIXED: Updated PublicRoute to exclude company-details from redirect logic
const PublicRoute = ({ children }) => {
  const user = Helpers.getItem("user", true);
  const token = Helpers.getItem("token");
  const currentPath = window.location.pathname;

  // Allow access to company-details and recovery routes even if authenticated
  const allowedAuthenticatedRoutes = [
    "/company-details", 
    "/forget-password", 
    "/new-password", 
    "/code-verification", 
    "/confirm-mail"
  ];

  if (user && token && !allowedAuthenticatedRoutes.includes(currentPath)) {
    return <Navigate to="/panel" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Root redirect */}
        <Route
          path="/"
          element={
            Helpers.getItem("user", true) && Helpers.getItem("token") ? (
              <Navigate to="/panel" />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
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

        {/* Company Details - Special case for authenticated companies without details */}
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

        {/* Recovery Routes - No PublicRoute wrapper needed */}
        <Route
          path="/forget-password"
          element={<AuthLayout />}
        >
          <Route index element={<ForgetPassword />} />
        </Route>

        <Route
          path="/new-password"
          element={<AuthLayout />}
        >
          <Route index element={<NewPassword />} />
        </Route>

        <Route
          path="/code-verification"
          element={<AuthLayout />}
        >
          <Route index element={<CodeVerification />} />
        </Route>

        <Route
          path="/confirm-mail"
          element={<AuthLayout />}
        >
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
          {/* Dashboard */}
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

          {/* Company routes */}
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
            path="customers"
            element={
              <AuthGuard requiredRoles={["company"]}>
                <Customers />
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
    </Router>
  );
}

export default App;