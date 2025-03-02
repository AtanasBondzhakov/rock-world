import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({
    dependency
}) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    }, [pathname, dependency]);

    return null;
};