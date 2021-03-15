import React, { useState } from 'react';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import './Print.css';

export default function PrintItem() {
    const [selected, setSelected] = useState(false)

    const selectedToggle = () => {
        setSelected(!selected)
    }

    const selectedClass = "print-item selected";
    const initialClass = "print-item"

    return (
        <div className={selected ? selectedClass : initialClass} onClick={selectedToggle}>
            {selected ? <BsCheckCircle id="checked" /> : <BsCircle />}
            <p>SO123456</p>
            <p>3 page(s)</p>
            <p>Added: 46 mins ago</p>
        </div>
    )
}
