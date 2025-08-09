import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const userParam = queryParams.get("user");

    if (!token || !userParam) {
      navigate("/sign-in");
      return;
    }


    try {
      const user = JSON.parse(decodeURIComponent(userParam));

      // Save in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.company_detail) {
        navigate("/panel");
      } else {
        navigate("/company-details");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/sign-in");
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
}
