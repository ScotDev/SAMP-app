
import React from 'react';
import './modal.css';
import { useSelector, useDispatch } from "react-redux";
import { toggle, toggleNotification } from '../../redux/components/utils/utilsSlice';
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
                dispatch(toggleNotification({ type: "success", msg: "Print success", details: `${selectedCount} item(s) printed successfully` }))
            }
        })
    }

    const triggerPrint = () => {
        dispatch(toggle({ showPrintModal: false, isPrinting: true }))
        setTimeout(() => {
            dispatch(toggle({ isPrinting: false }))
            updateItemStatus()

        }, 2000);

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
