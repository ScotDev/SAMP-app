import React, { useEffect } from 'react';
import './notification.css'
import { BiErrorCircle, BiCheckCircle, BiBoltCircle } from 'react-icons/bi';

import { useSelector, useDispatch } from "react-redux";
import { toggleNotification } from '../../redux/components/utils/utilsSlice';


export default function Notification() {
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
        icon = null
    }

    // Buggy, maybe seperate into own reducer
    // Clear self after 3 seconds


    useEffect(() => {
        setTimeout(() => {
            dispatch(toggleNotification({ type: null, msg: null, details: null }))
        }, 3000);

    }, [])

    if (utils.notificationType === null) {
        return null
    }

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
