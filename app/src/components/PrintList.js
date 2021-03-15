import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { select } from '../redux/components/print/printSlice';
import PrintItem from './PrintItem';
import './Print.css';


export default function PrintList() {
    const print = useSelector((state) => state.print)
    console.log("Print state :", print)


    const mappedItems = print.map((item, index) => {
        return (
            <PrintItem key={index} data={item} />
        )
    })

    return (
        <div className="print-list">
            {mappedItems}
            {/* <PrintItem />
            <PrintItem />
            <PrintItem />
            <PrintItem />
            <PrintItem /> */}
        </div>
    )
}
