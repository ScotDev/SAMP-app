import React, { useState } from 'react';
import PrintItem from './PrintItem';
import './Print.css';

export default function PrintList() {


    return (
        <div className="print-list">
            <PrintItem />
            <PrintItem />
            <PrintItem />
            <PrintItem />
            <PrintItem />
        </div>
    )
}
