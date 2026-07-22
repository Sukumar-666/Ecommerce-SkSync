import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't reset scroll position on navigation by default,
 * which feels broken on a content-heavy multi-page site. Mount this once
 * inside the router (in Layout.jsx) to fix that, without touching any
 * page's own logic.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
