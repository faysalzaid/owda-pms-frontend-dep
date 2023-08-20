import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorAlert({open, handleClose, message, autoHideDuration=6000, vertical="top", horizontal="center"}) {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontFamily: 'ubuntu' }}>
            {message}
            </Alert>
        </Snackbar>
    );
}

export function SuccessAlert({open, handleClose, message, autoHideDuration=6000, vertical="top", horizontal="center"}) {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', fontFamily: 'ubuntu' }}>
            {message}
            </Alert>
        </Snackbar>
    );
}

export function InfoAlert({open, handleClose, message, autoHideDuration=6000, vertical="top", horizontal="center"}) {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    );
}

export function WarningAlert({open, handleClose, message, autoHideDuration=6000, vertical="top", horizontal="center"}) {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    );
}
