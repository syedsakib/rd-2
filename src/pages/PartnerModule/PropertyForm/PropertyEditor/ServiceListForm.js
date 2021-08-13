import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updatePropertyDetail } from "../../../../store/Actions/scrapeAction";
import { toastr } from "react-redux-toastr";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const ServiceListForm = ({
  property,
  pServiceList,
  onChangeHandler,
  getPropertyServiceList,
}) => {
  const [isLoading, toggleLoader] = useState(false);
  const [filterState, updateFilterState] = useState({
    activePage: 1,
    searchText: "",
    limit: 100,
  });

  // extract data
  const { activePage, searchText, limit } = filterState;

  useEffect(() => {
    getDataList();
  }, [activePage, searchText]);

  const getDataList = async () => {
    try {
      toggleLoader(true);
      await getPropertyServiceList({
        limit,
        pageNumber: activePage,
        searchText,
      });
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
    }
  };

  const serviceChecked = (id) => {
    let careTypes = property.serviceList.filter((item) => item.id == id);
    if (careTypes[0]) {
      return true;
    }
    return false;
  };

  const onServiceSelect = (service) => {
    let newList = property.serviceList;
    if (serviceChecked(service.id)) {
      newList = newList.filter((item) => item.id != service.id);
    } else {
      newList.push({ id: service.id, title: service.title });
    }
    onChangeHandler(newList);
  };

  const handlePageChange = (pNum) => {
    updateFilterState({
      ...filterState,
      activePage: pNum,
    });
  };

  const onTextChange = (e) => {
    let val = e.target.value;
    updateFilterState({
      ...filterState,
      searchText: val,
    });
  };

  return (
    <div>
      <h3 className="form-title">Services</h3>
      <hr />
      <br />
      <div style={{ textAlign: "center" }}>
        <h5 style={{ color: "red" }}>Note: At least 5 types are required</h5>
      </div>
      <div className="px-5">
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <div>
            <div className="overflow-auto p-4" style={{ maxHeight: "700px" }}>
              {pServiceList &&
                pServiceList.rows &&
                pServiceList.rows.map((item) => {
                  const { id, title } = item;
                  let labelID = `ps${id}`;
                  return (
                    <div
                      className="form-check form-check-success p-2"
                      key={labelID}
                    >
                      <input
                        type="checkbox"
                        value={id}
                        id={labelID}
                        checked={serviceChecked(id)}
                        onChange={(e) => {
                          onServiceSelect(item);
                        }}
                        className="form-check-input"
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={labelID}
                        style={{
                          padding: "4px 0px 0px 20px",
                          fontSize: "15px",
                        }}
                      >
                        {title}
                      </label>
                    </div>
                  );
                })}{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
  pServiceList: state.scrape.pServiceList,
});

const mapDispatchToProps = { updatePropertyDetail };

export default connect(mapStateToProps, mapDispatchToProps)(ServiceListForm);
