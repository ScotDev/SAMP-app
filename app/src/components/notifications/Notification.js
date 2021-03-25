import React, { useState, useEffect } from 'react';
import './notification.css'
import { BiErrorCircle, BiCheckCircle, BiBoltCircle, BiInfoCircle, BiMinusCircle, BiPauseCircle, BiXCircle, BiCloudDownload, BiWifiOff } from 'react-icons/bi';

import { useSelector, useDispatch } from "react-redux";
import { toggleNotification } from '../../redux/components/utils/utilsSlice';


// Every toast notification should be given an id, and probably own slice
// They are added with id, then removed by id after timeout
// case REMOVE_TOAST:
//     return state.filter(toast => toast.id !== payload);



// {toasts.map(toast => {
//     const { id } = toast;
//     return (
//       <Toast {...toast} key={id} onDismissClick={() => removeToast(id)} />

// Split ui component into dumb component that just takes props,
// Functional stuff stays here



export default function Notification() {
    // const [showSelf, setShowSelf] = useState(false)
    const dispatch = useDispatch();
    const utils = useSelector((state) => state.utils)

    // const type = utils.notificationType || "default";
    const message = utils.notificationMsg || "No message provided";
    const details = utils.notificationMsgDetails || "No details provided";

    let icon;

    if (utils.notificationType === "error") {
        icon = <BiErrorCircle />
    } else if (utils.notificationType === "success") {
        icon = <BiCheckCircle />
    } else {
        icon = <BiInfoCircle />;
    }

    // Also buggy, not clear why though
    useEffect(() => {
        if (utils.showNotification) {
            setTimeout(() => {
                dispatch(toggleNotification({ type: null, msg: null, details: null }))
            }, 3000);
        }
    }, [])


    return (
        <div className={`notification notification--${utils.notificationType}`}>
            <div className="notification__firstcolumn ">
                <i className="notification__icon">{icon}</i>
            </div>
            <div>
                <h5 className="notification__msg">{message}</h5>
                <p className="notification__details">{details}</p>
            </div>
        </div>
    )
}
