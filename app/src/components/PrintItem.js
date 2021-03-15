import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { select } from '../redux/components/print/printSlice';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import './Print.css';



export default function PrintItem(props) {
    // const print = useSelector((state) => state.print)
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false)
    const data = props.data;

    const toggleSelected = () => {
        setSelected(!selected)

    }

    const selectedClass = "print-item selected";
    const initialClass = "print-item"

    console.log("Print item :", props)


    return (
        <div className={data.selected ? selectedClass : initialClass} onClick={() => { dispatch(select({ id: data.id })) }}>
            {data.selected ? <BsCheckCircle id="checked" /> : <BsCircle />}
            <p>{data.SO}</p>
            <p>{data.pages} page(s)</p>
            <p>Added: 46 mins ago</p>
        </div>
    )
}

