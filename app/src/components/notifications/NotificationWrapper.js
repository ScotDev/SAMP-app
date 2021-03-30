import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import './notification.css'


import { useSelector, useDispatch } from "react-redux";
import { removeAll, removeFirst } from '../../redux/components/notifications/notificationsSlice';

export default function NotificationWrapper() {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications)
    // const notifications = notificationsState.notifications;
    const [content, setContent] = useState({});
    // console.log(notifications)


    useEffect(() => {

        if (notifications.length > 0) {
            setContent(notifications);
            setTimeout(() => {
                setContent({})
                dispatch(removeFirst())
            }, 5000);
        }

        // if (content.length > 10) {
        //     dispatch(removeAll());
        // }

    }, [notifications])


    let items;

    if (content.length > 0) {
        items = content.map(item => {
            if (item.msg !== "Default title") {
                return (<Notification key={item.id} data={item} />)
            }
        })
    }

    return (<div className="notification_container">
        {items}
    </div>)

}