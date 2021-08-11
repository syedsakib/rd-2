// import React from "react"
// import "./btn.scss"
// import ReactTooltip from "react-tooltip"

// const ButtonComp = ({
//   label,
//   icon,
//   onClick,
//   toolTip,
//   btnClass,
//   tooltipType,
// }) => {
//   return (
//     <div className="table-row-btn-wrapper">
//       <div
//         className={`table-col-btn-box b-${btnClass || "normal"}`}
//         onClick={onClick}
//         //data-tooltip={toolTip}
//         //data-bs-toggle="tooltip"
//         //data-bs-placement="top"
//         //title={toolTip}
//         data-tip
//         data-for="button"
//       >
//         <span
//           className="b-icon"
//           data-bs-toggle="tooltip"
//           data-bs-placement="top"
//         >
//           <i className={`fas fa-${icon}`} aria-hidden="true" />
//         </span>
//         {label && <span className="btn-label">{label}</span>}
//       </div>
//       <ReactTooltip id="button" type={tooltipType}>
//         <span>{toolTip}</span>
//       </ReactTooltip>
//     </div>
//   )
// }

// export default ButtonComp

import React from "react"
import "./btn.scss"
import ReactTooltip from "react-tooltip"

const ButtonComp = ({ label, icon, onClick, toolTip, btnClass }) => {
  return (
    <>
      <div className="table-row-btn-wrapper">
        <div
          className={`table-col-btn-box b-${btnClass || "normal"}`}
          onClick={onClick}
          data-tooltip={toolTip}
        >
          <span className="b-icon" data-tip={toolTip}>
            <i className={`fa fa-${icon}`} aria-hidden="true" />
          </span>
          {label && <span className="btn-label">{label}</span>}
        </div>
      </div>
      <ReactTooltip place="top" type="info" effect="float" />
    </>
  )
}

export default ButtonComp

// type="dark"
// type="success"
// type="warning"
// type="error"
// type="info"
// type="light"
