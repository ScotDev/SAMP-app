import React, { useState, useEffect } from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle, update, toggleNotification } from '../../redux/components/utils/utilsSlice';
import { add } from '../../redux/components/print/printSlice';
import './welcome.css'
import { MdSystemUpdateAlt } from 'react-icons/md'
import { AiOutlinePrinter } from 'react-icons/ai'
import dayjs from 'dayjs';


import PrintList from '../../components/print/PrintList';
import Modal from '../../components/modal/Modal';
import Loading from '../../components/loading/Loading';
import Notification from '../../components/notifications/Notification';


const defaultState = [{
  id: 1,
  SO: "SO123456",
  pages: 3,
  printed: false,
  selected: false,
  printedTime: null,
  addedTime: null
},
{
  id: 2,
  SO: "SO123593",
  pages: 1,
  printed: false,
  selected: false,
  printedTime: null,
  addedTime: null
},
{
  id: 3,
  SO: "SO123298",
  pages: 2,
  printed: false,
  selected: false,
  printedTime: null,
  addedTime: null
},
{
  id: 4,
  SO: "SO123223",
  pages: 5,
  printed: false,
  selected: false,
  printedTime: null,
  addedTime: null
}]

const Welcome = () => {

  const dispatch = useDispatch();
  const print = useSelector((state) => state.print)
  const utils = useSelector((state) => state.utils)


  const [viewNew, setViewNew] = useState(true)
  const [showPrintError, setShowPrintError] = useState(false)


  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState(false)



  const fetchData = async () => {
    dispatch(update())

    try {
      const res = await fetch("https://605340b845e4b300172912d8.mockapi.io/api/v1/documents");
      const formattedRes = await res.json();
      console.log(formattedRes)
      setData(formattedRes)
      dispatch(update())
      dispatch(toggleNotification({ type: "success", msg: "Fetch successful", details: "New items received" }))
    } catch (error) {
      setFetchError(true);
      dispatch(toggleNotification({ type: "error", msg: "Frror fetching items", details: "New items could not be retrieved" }))
      dispatch(update())
      console.log("Error loading data from API: ", error)
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  // Lastupdated might need to be updated every minute?
  let relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  // let lastUpdated = dayjs().to(utils.lastUpdated)

  const toggleView = () => {
    setViewNew(!viewNew)
  }

  if (data) {
    data.map((item, index) => {
      console.log(item)
      dispatch(add({ SO: item.order_number, customer: item.customer, amount: item.amount, pages: item.pages }))
    })
  }

  // This should be held in redux
  let count = 0;

  const itemCount = print.map((item, index) => {
    if (item.selected) {
      count++
    }
  });

  const handlePrint = () => {

    if (count > 0) {
      dispatch(toggle({ showPrintModal: true }))
    } else {
      // setShowPrintError(true)
      dispatch(toggleNotification({ type: "error", msg: "Print error", details: "Please select at least one item to print" }))
      // setTimeout(() => {
      //   // setShowPrintError(false)
      //   dispatch(toggleNotification({ type: null, msg: null, details: null }))
      // }, 3000);
    }

  }

  const toggleNotificationFunc = () => {
    dispatch(toggleNotification())
  }


  return (<>
    <div className="page">
      <header>SAMP</header>
      <button onClick={toggleNotificationFunc}>Toggle notification</button>

      <div className="btn-group">
        <button id="update" disabled={utils.isUpdating || utils.isPrinting}
          onClick={fetchData}
        >Update <MdSystemUpdateAlt /></button>
        <button id="print" disabled={utils.isUpdating || utils.isPrinting} onClick={handlePrint}>Print <AiOutlinePrinter /></button>
      </div>
      <p id="last-updated-text">Last updated: {dayjs().to(utils.lastUpdated)}</p>

      <div className="toggle-group">
        <button className={viewNew && "active"} disabled={utils.isUpdating || utils.isPrinting} onClick={toggleView}>New</button>
        <button className={!viewNew && "active"} disabled={utils.isUpdating || utils.isPrinting} onClick={toggleView}>Printed</button>
      </div>

      {utils.showPrintModal && <Modal />}
      {showPrintError && (<p>Please select at least one item to print</p>)}
      {utils.isPrinting && (<p>Printing {count} item(s)...</p>)}
      <PrintList viewNew={viewNew} />
      {utils.showNotification && <Notification />}
    </div>

  </>)
}

// class Welcome extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <section className="section">
//           <div className="container">
//             <section className="hero is-info">
//               <div className="hero-body">
//                 <p className="title">
//                   Thank you for trying out the secure-electron-template!
//                 </p>
//                 <p className="subtitle">
//                   Please navigate to view the features of this template.
//                 </p>
//               </div>
//             </section>
//           </div>
//         </section>
//         <section className="section">
//           <div className="container">
//             <h2 className="title is-2">Samples</h2>
//             <div>
//               <Link to={ROUTES.MOTD}>Using the Electron store.</Link> <br />
//               <Link to={ROUTES.LOCALIZATION}>Changing locales.</Link> <br />
//               <Link to={ROUTES.UNDOREDO}>Undo/redoing actions.</Link> <br />
//               <Link to={ROUTES.CONTEXTMENU}>Custom context menu.</Link> <br />
//             </div>
//           </div>
//         </section>
//       </React.Fragment>
//     );
//   }
// }

export default Welcome;
