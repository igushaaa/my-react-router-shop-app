import { useEffect } from "react";
import { useLocation } from "react-router";

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    console.log("🚀 Navigation:", location.pathname);

    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      console.log(`⏱️ Page load time: ${loadTime.toFixed(2)}ms`);
      if (loadTime > 1000) {
        console.warn(`🐌 Slow page: ${loadTime.toFixed(2)}ms for ${location.pathname}`);
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "GA_MEASUREMENT_ID", { page_path: location.pathname });
    }
    const analytics = JSON.parse(localStorage.getItem("analytics") || "{}");
    analytics[location.pathname] = (analytics[location.pathname] || 0) + 1;
    localStorage.setItem("analytics", JSON.stringify(analytics));
  }, [location.pathname]);

  return null;
}

export default Analytics;

