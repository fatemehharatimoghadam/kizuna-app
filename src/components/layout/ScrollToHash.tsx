import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const elementId = decodeURIComponent(hash.slice(1));
    const element = document.getElementById(elementId);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [hash]);

  return null;
}