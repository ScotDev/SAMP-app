import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { select } from '../redux/components/print/printSlice';
import PrintItem from './PrintItem';
import Loading from '../loading/Loading';
import './Print.css';


export default function PrintList({ viewNew }) {
    const print = useSelector((state) => state.print)
    const utils = useSelector((state) => state.utils)

    // Better handled with useffect, let not handling it correctly
    let newItemCount = 0;

    const newItems = print.map((item, index) => {
        if (!item.printed) {
            newItemCount++
            console.log(newItemCount)
            return (
                <PrintItem key={index} data={item} />
            )
        }
    })
    const printedItems = print.map((item, index) => {
        if (item.printed) {
            return (
                <PrintItem key={index} data={item} />
            )
        }
    })

    const emptyListMessage = (<h4>Nothing new here</h4>)

    return (
        <div className="print-list">
            <div className="list-headings">
                <p>Selected</p>
                <p>Order no.</p>
                <p>Pages</p>
                <p>Last updated</p>
            </div>
            <div className="loading-container">
                {utils.isUpdating && <Loading />}
            </div>
            {newItemCount < 1 && !utils.isUpdating && viewNew && emptyListMessage}
            {viewNew && !utils.isUpdating && newItems}
            {!viewNew && !utils.isUpdating && printedItems}
        </div>
    )
}
