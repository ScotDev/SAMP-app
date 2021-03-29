import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import './notification.css'


import { useSelector, useDispatch } from "react-redux";
import { remove, removeAll } from '../../redux/components/notifications/notificationsSlice';

export default function NotificationWrapper() {
    // const [showSelf, setShowSelf] = useState(false)
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications)
    // const notifications = notificationsState.notifications;
    const [content, setContent] = useState({});
    // const [showSelf, setShowSelf] = useState(false);
    // console.log(notifications)


    useEffect(() => {
        if (notifications.length > 0) {
            setContent(notifications);
            // setShowSelf(true);
            setTimeout(() => {
                setContent({})

            }, 5000);
        }
    }, [notifications])

    let items;

    if (content.length > 0) {
        items = content.map(item => {
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