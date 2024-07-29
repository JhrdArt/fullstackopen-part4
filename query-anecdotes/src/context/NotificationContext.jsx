import { createContext, useContext, useReducer } from 'react';
import { notificationReducer } from "../reducer/notificationReducer";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null);

    const setNotification = (message) => {
        dispatch({ type: 'SET', payload: message });
    };

    const clearNotification = () => {
        dispatch({ type: 'REMOVE' });
    };

    return (
        <NotificationContext.Provider value={{ notification, setNotification, clearNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const { notification, setNotification, clearNotification } = useContext(NotificationContext);

    const showNotification = (message, time) => {
        setNotification(message);

        setTimeout(() => {
            clearNotification();
        }, time * 1000);
    };

    return { notification, showNotification };
};



