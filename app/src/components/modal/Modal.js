
import React from 'react';
import './modal.css';
import { useSelector, useDispatch } from "react-redux";
import { toggle, toggleNotification } from '../../redux/components/utils/utilsSlice';
import { create } from '../../redux/components/notifications/notificationsSlice';
import { select, update } from '../../redux/components/print/printSlice';

export default function Modal() {
    const dispatch = useDispatch();
    const print = useSelector((state) => state.print)
    console.log(print)

    // This should be held in redux
    let selectedCount = 0;

    const selectedCountFunc = print.map((item, index) => {
        if (item.selected) {
            selectedCount++
        }
    });

    const updateServer = async (data) => {
        console.log("Data :", data)
        const res = await fetch(`https://605340b845e4b300172912d8.mockapi.io/api/v1/documents/${data.id}`, {
            method: "PUT",
            data: data
        })

        console.log(res.ok)
    }

    const updateItemStatus = () => {
        print.map((item, index) => {
            if (item.selected) {
                dispatch(update({ id: item.id }))
                dispatch(select({ id: item.id }))
                updateServer({ id: item.id, printed: true })

            }
        })
    }

    const triggerPrint = () => {
        dispatch(toggle({ showPrintModal: false, isPrinting: true }))
        dispatch(create({ type: "default", msg: "Print job queued", details: `${selectedCount} item(s) sent to printer` }))
        setTimeout(() => {
            dispatch(toggle({ isPrinting: false }))
            updateItemStatus()
            dispatch(create({ type: "success", msg: "Print completed", details: `${selectedCount} item(s) successfully printed` }))
        }, 3000);

    }

    // Message and button appearrance/text should be dynamic based on props.
    // If 

    return (
        <div className="modal">
            <div className="modal-content">
                <p className="message">Are you sure you want to print {selectedCount} item(s)?</p>
            </div>
            <div className="modal-btn-group">
                <button id="confirm" onClick={triggerPrint}>Print</button>
                <button id="cancel" onClick={() => { dispatch(toggle({ showPrintModal: false })) }}>Cancel</button>
            </div>
        </div>
    )
}
