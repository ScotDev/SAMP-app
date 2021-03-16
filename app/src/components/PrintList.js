import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { select } from '../redux/components/print/printSlice';
import PrintItem from './PrintItem';
import './Print.css';


export default function PrintList({ viewNew }) {
    const print = useSelector((state) => state.print)

    const newItems = print.map((item, index) => {
        if (!item.printed) {
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

    return (
        <div className="print-list">
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
