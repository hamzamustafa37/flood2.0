import { toast } from 'react-toastify';

export const successPopUps = (text: string, position?: any): void => {
    toast.info(text, {
        autoClose: 3000,
        position: position || 'top-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        progressStyle: {
            background: '#2F3B82',
        },
    });
};

export const errorPopup = (text: string): void => {
    toast.error(text, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};
export const warningPopup = (text: string): void => {
    toast.warning(text, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};
