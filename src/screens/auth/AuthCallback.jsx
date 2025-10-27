import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Helpers from "../../config/Helpers";
import authService from "../../services/authService";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const userParam = queryParams.get("user");

    // Require token at minimum
    if (!token) {
      navigate("/sign-in");
      return;
    }

    // Save token immediately so API calls can work if we need to fetch profile
    try {
      localStorage.setItem("token", token);
      Helpers.setItem("token", token);
    } catch (e) {
      console.error("Failed to persist token:", e);
    }

    // DEV: Show the OAuth token to help debug login issues
    try {
      if (import.meta.env?.DEV) {
        window.alert(`OAuth token: ${token}`);
        console.log("[AuthCallback] OAuth token:", token);
      }
    } catch (_) {}

    const proceedWithUser = (user) => {
      // Persist user
      try {
        localStorage.setItem("user", JSON.stringify(user));
        Helpers.setItem("user", user);
      } catch (e) {
        console.error("Failed to persist user:", e);
      }

      // Decide where to go
      if (user?.company_detail) {
        navigate("/panel");
      } else {
        navigate("/company-details");
      }
    };

    const tryParseUser = () => {
      if (!userParam) return null;
      try {
        // URLSearchParams returns decoded values; avoid double decode issues
        const parsed = JSON.parse(userParam);
        return parsed;
      } catch (err) {
        try {
          // Fallback: handle when server used urlencode
          const parsed = JSON.parse(decodeURIComponent(userParam));
          return parsed;
        } catch (err2) {
          console.warn("User param parse failed, will fetch profile:", err2);
          return null;
        }
      }
    };

    const parsedUser = tryParseUser();
    if (parsedUser) {
      proceedWithUser(parsedUser);
      return;
    }

    // Fallback: fetch profile using the token
    (async () => {
      try {
        const resp = await authService.getProfile();
        if (resp?.user) {
          // Normalize to have company_detail if backend returns companyDetail
          const user = {
            ...resp.user,
            company_detail: resp.user.company_detail ?? resp.user.companyDetail ?? null,
          };
          proceedWithUser(user);
        } else {
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
        navigate("/sign-in");
      }
    })();
  }, [navigate]);

  return <p>Redirecting...</p>;
}
