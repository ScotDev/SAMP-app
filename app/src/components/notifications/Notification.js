import React from 'react';
import './notification.css'
import { BiErrorCircle, BiCheckCircle, BiBoltCircle, BiInfoCircle, BiMinusCircle, BiPauseCircle, BiXCircle, BiCloudDownload, BiWifiOff } from 'react-icons/bi';

import { useDispatch } from "react-redux";
import { remove } from '../../redux/components/notifications/notificationsSlice';

export default function Notification(props) {
    console.log("Notification props: ", props.data)
    const { id, type, msg, details } = props.data;
    const dispatch = useDispatch();

    let icon;

    if (type === "error") {
        icon = <BiErrorCircle />
    } else if (type === "success") {
        icon = <BiCheckCircle />
    } else if (type === "warning") {
        icon = <BiMinusCircle />
    } else if (type === "update") {
        icon = <BiBoltCircle />
    } else if (type === "connection") {
        icon = <BiWifiOff />
    } else {
        icon = <BiInfoCircle />;
    }

    const dismissNotification = (id) => {
        console.log(id)
        dispatch(remove({ id }))
    }

    // setTimeout(() => {
    //     dismissNotification(id)
    // }, 5000);

    return (
        <div className={`notification notification--${type}`} onClick={() => dismissNotification(id)}>
            <div className="notification__firstcolumn ">
                <i className="notification__icon">{icon}</i>
            </div>
            <div>
                <h5 className="notification__msg">{msg}</h5>
                <p className="notification__details">{details}</p>
            </div>
            <div className="notification__lastcolumn">
                <p>X</p>
            </div>
        </div>
    )
}



// export default function Notification(props) {
//     const { type, msg, details } = props.data;
//     const dispatch = useDispatch();

//     let icon;

//     if (type === "error") {
//         icon = <BiErrorCircle />
//     } else if (type === "success") {
//         icon = <BiCheckCircle />
//     } else if (type === "warning") {
//         icon = <BiMinusCircle />
//     } else if (type === "update") {
//         icon = <BiBoltCircle />
//     } else if (type === "connection") {
//         icon = <BiWifiOff />
//     } else {
//         icon = <BiInfoCircle />;
//     }

//     const dismissNotification = () => {
//         dispatch(remove())
//     }

//     return (
//         <div className={`notification notification--${type}`} onClick={dismissNotification}>
//             <div className="notification__firstcolumn ">
//                 <i className="notification__icon">{icon}</i>
//             </div>
//             <div>
//                 <h5 className="notification__msg">{msg}</h5>
//                 <p className="notification__details">{details}</p>
//             </div>
//             <div className="notification__lastcolumn">
//                 <p>X</p>
//             </div>
//         </div>
//     )
// }
