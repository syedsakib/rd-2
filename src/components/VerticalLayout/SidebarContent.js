import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";

//Left Side Bars
import AdminSidebar from "../LeftSidebarComponent/AdminSidebar";
import OperationSidebar from "components/LeftSidebarComponent/OperationSidebar";
import SalesSidebar from "components/LeftSidebarComponent/SalesSidebar";
import ContentWriterSidebar from "components/LeftSidebarComponent/ContentWriterSidebar";
import PartnerSidebar from "components/LeftSidebarComponent/PartnerSidebar";

const SidebarContent = (props) => {
  const ref = useRef();
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously

  const pathName = props.location.pathname;

  const initMenu = () => {
    new MetisMenu("#side-menu");
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  };

  useEffect(() => {
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  const returnSidebar = () => {
    let path = window.location.pathname;
    if (path.startsWith("/partner")) {
      return <PartnerSidebar />;
    } else if (path.startsWith("/sales")) {
      return <SalesSidebar />;
    } else if (path.startsWith("/cw")) {
      return <ContentWriterSidebar />;
    } else {
      return <AdminSidebar />;
    }
  };

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        {returnSidebar()}
        {/* <ContentWriterSidebar /> */}
      </SimpleBar>
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);

{
  /* <OperationSidebar /> */
}
