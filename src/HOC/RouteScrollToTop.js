import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function RouteScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  return null;
}

export default RouteScrollToTop;
