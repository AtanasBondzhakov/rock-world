import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({
    dependency
}) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, dependency]);

    return null;
};