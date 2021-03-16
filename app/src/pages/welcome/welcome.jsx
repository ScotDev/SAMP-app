import React, { useState } from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './welcome.css'
import { MdSystemUpdateAlt } from 'react-icons/md'
import { AiOutlinePrinter } from 'react-icons/ai'

import PrintList from '../../components/PrintList';

const Welcome = () => {
  const [viewNew, setViewNew] = useState(true)

  const print = useSelector((state) => state.print)
  const toggleView = () => {
    setViewNew(!viewNew)
  }

  return (<>
    <div className="page">
      <header>SAM</header>
      <div className="btn-group">
        <button id="update">Update <MdSystemUpdateAlt /></button>
        <button id="print">Print <AiOutlinePrinter /></button>
      </div>
      <p id="last-updated-text">Last updated: 10 mins ago</p>

      <div className="toggle-group">
        <button className={viewNew && "active"} onClick={toggleView}>New</button>
        <button className={!viewNew && "active"} onClick={toggleView}>Printed</button>
      </div>

      <PrintList viewNew={viewNew} />

      {/* Iterate out list items */}

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
