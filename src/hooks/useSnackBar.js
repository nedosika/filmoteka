import React, {createContext, useContext} from "react";
import SnackBar from "../components/SnackBar";

export const SnackBarSeverities = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success'
}

const SnackBarContext = createContext({});

export const useSnackBar = () => {
    const {setMessage} = useContext(SnackBarContext);

    const showMessage = (message, severity) => {
        setMessage({
            severity,
            text: message,
            isShow: true
        })
    }

    return {showMessage}

}

export const SnackBarProvider = ({children}) => {
    const [message, setMessage] = React.useState({
        severity: SnackBarSeverities.info,
        text: '',
        isShow: false
    });

    const onClose = () => {
        setMessage({
            severity: SnackBarSeverities.info,
            text: '',
            isShow: false
        })
    }

    return(
        <SnackBarContext.Provider value={{setMessage, onClose}}>
            {children}
            <SnackBar
                open={message.isShow}
                message={message.text}
                onClose={onClose}
                severity={message.severity}
            />
        </SnackBarContext.Provider>
    )
}