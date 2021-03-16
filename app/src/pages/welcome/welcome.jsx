import React, { useState } from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle, update } from '../../redux/components/utils/utilsSlice';
import './welcome.css'
import { MdSystemUpdateAlt } from 'react-icons/md'
import { AiOutlinePrinter } from 'react-icons/ai'
import dayjs from 'dayjs';


import PrintList from '../../components/print/PrintList';
import Modal from '../../components/modal/Modal';
import Loading from '../../components/loading/Loading';

const Welcome = () => {
  const [viewNew, setViewNew] = useState(true)
  const [showPrintError, setShowPrintError] = useState(false)

  const dispatch = useDispatch();
  const print = useSelector((state) => state.print)
  const utils = useSelector((state) => state.utils)

  console.log("Utils here:", utils)

  // Lastupdated might need to be updated every minute?
  let relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  // let lastUpdated = dayjs().to(utils.lastUpdated)

  const toggleView = () => {
    setViewNew(!viewNew)
  }

  const updateData = () => {
    dispatch(update())

    setTimeout(() => {
      dispatch(update())
    }, 2000);

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
      setShowPrintError(true)
      setTimeout(() => {
        setShowPrintError(false)
      }, 3000);
    }

  }


  return (<>
    <div className="page">
      <header>SAMP</header>

      <div className="btn-group">
        <button id="update" disabled={utils.isUpdating || utils.isPrinting}
          onClick={updateData}
        >Update <MdSystemUpdateAlt /></button>
        <button id="print" disabled={utils.isUpdating || utils.isPrinting} onClick={handlePrint}>Print <AiOutlinePrinter /></button>
      </div>
      <p id="last-updated-text">Last updated: {dayjs().to(utils.lastUpdated)}</p>

      <div className="toggle-group">
        <button className={viewNew && "active"} disabled={utils.isUpdating || utils.isPrinting} onClick={toggleView}>New</button>
        <button className={!viewNew && "active"} disabled={utils.isUpdating || utils.isPrinting} onClick={toggleView}>Printed</button>
      </div>
      {utils.showPrintModal && <Modal />}

      {utils.isUpdating && <Loading />}
      {showPrintError && (<p>Please select at least one item to print</p>)}
      {utils.isPrinting && (<p>Printing {count} item(s)...</p>)}
      {!utils.isUpdating && <PrintList viewNew={viewNew} />}

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
