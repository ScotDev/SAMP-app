import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { select } from '../redux/components/print/printSlice';
import PrintItem from './PrintItem';
import './Print.css';


export default function PrintList({ viewNew }) {
    const print = useSelector((state) => state.print)

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

    // const printedCountFunc = print.map((item, index) => {
    //     if (!item.printed) {
    //         newItemCount++
    //         console.log(newItemCount)
    //     }
    // });

    return (
        <div className="print-list">
            {newItemCount < 1 && (<h4>Nothing new to print</h4>)}
            {viewNew && newItems}
            {!viewNew && printedItems}

            {/* <PrintItem />
            <PrintItem />
            <PrintItem />
            <PrintItem />
            <PrintItem /> */}
        </div>
    )
}
