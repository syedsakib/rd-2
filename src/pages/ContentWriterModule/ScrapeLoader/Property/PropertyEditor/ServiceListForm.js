import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updatePropertyDetail } from "../../../../../store/Actions/scrapeAction";
import { toastr } from "react-redux-toastr";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const ServiceListForm = ({ property, pServiceList, updatePropertyDetail }) => {
  const [selectedData, updateSelectedList] = useState({
    selectedList: [],
  });
  const { selectedList } = selectedData;
  const [isLoading, toggleLoader] = useState(false);
  useEffect(() => {
    if (property) {
      let { services } = property;
      if (services) {
        console.log(services);
        updateSelectedList({ selectedList: services.split(",") });
      }
    }
  }, [property]);

  const serviceChecked = (id) => {
    let service = selectedList.filter((item) => item == id);
    if (service && service.length === 1) {
      return true;
    }
    return false;
  };

  const onServiceSelect = (service) => {
    let newList = selectedList;
    let id = service.id;
    if (serviceChecked(id)) {
      newList = selectedList.filter((item) => item != id);
    } else {
      newList.push(service.id);
    }
    console.log(newList);
    updateSelectedList({ selectedList: newList });
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!property) {
        throw "No property data found";
      }
      toggleLoader(true);
      let result = await updatePropertyDetail(property.boom_hash, "service", {
        services: selectedList,
      });
      toggleLoader(false);
    } catch (e) {
      console.log(e);
      toggleLoader(false);
      toastr.error("Error", e.toString());
    }
  };

  return (
    <div>
      <h3 className="form-title">Services</h3>
      <hr />
      <br />
      <div style={{ textAlign: "center" }}>
        <h5 style={{ color: "red" }}>
          Note: You need to update to save changes
        </h5>
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
            <div className="row mt-4">
              <div className="col-sm-12">
                <div className="form-footer text-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    onClick={onFormSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
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
