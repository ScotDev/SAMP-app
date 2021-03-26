import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import './notification.css'


import { useSelector, useDispatch } from "react-redux";
import { remove } from '../../redux/components/notifications/notificationsSlice';

export default function NotificationWrapper() {
    // const [showSelf, setShowSelf] = useState(false)
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications)
    // const notifications = notificationsState.notifications;
    // const [content, setContent] = useState({ type: null, msg: null, details: null });
    // const [showSelf, setShowSelf] = useState(false);
    console.log(notifications)



    // useEffect(() => {
    //     if (notifications.length > 0) {
    //         // setContent(notifications[notifications.length - 1]);
    //         setShowSelf(true);
    //         // setTimeout(() => {
    //         //     setShowSelf(false);
    //         //     dispatch(remove())
    //         // }, 5000);
    //     }
    // }, [notifications])

    let items;

    if (notifications.length > 0) {
        items = notifications.map(item => {
            if (item.msg !== "Default title") {
                return (<Notification key={item.id} data={item} />)
            }

        })

    }


    return (<>  <div className="notification_container">
        {items}
    </div>
    </>)

}