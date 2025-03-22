import { toast } from "react-toastify";

export const toasterSuccess = (message) => {
    const isSmallScreen = window.innerWidth <= 768;

    toast.success(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: isSmallScreen
            ? {
                width: '200px',
                height: '50px',
                fontSize: '0.75em'
            }
            : {
                width: '320px',
                minHeight: '64px',
                fontSize: '1em'
            }
    });
}