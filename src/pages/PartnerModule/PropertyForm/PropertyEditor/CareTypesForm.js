import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updatePropertyDetail } from "../../../../store/Actions/scrapeAction";
import { toastr } from "react-redux-toastr";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const careTypeList = [
  {
    title: "Assisted Living",
    id: "assisted_living",
  },
  {
    title: "Memory Care",
    id: "memory_care",
  },
  {
    title: "Nursing Home",
    id: "nursing_home",
  },
  {
    title: "Independent Living",
    id: "independent_living",
  },
  {
    title: "Hospice",
    id: "hospice",
  },
  {
    title: "Adult Day Care",
    id: "adult_day_care",
  },
  {
    title: "Adult Foster Home",
    id: "adult_foster_home",
  },
  {
    title: "Personal Care Home",
    id: "personal_care_home",
  },
  {
    title: "Residential Care Home",
    id: "residential_care_home",
  },
  {
    title: "Respite Care",
    id: "respite_care",
  },
  {
    title: "Reverse Mortgage",
    id: "reverse_mortgage",
  },
  {
    title: "Skilled Nursing",
    id: "skilled_nursing",
  },
  {
    title: "ICF/IID",
    id: "icf_iid",
  },
];

const CareTypesForm = ({ property, onChangeHandler, pCareTypeList }) => {
  const [isLoading, toggleLoader] = useState(false);
  const serviceChecked = (id) => {
    let careTypes = property.careTypeList.filter((item) => item == id);
    if (careTypes[0]) {
      return true;
    }
    return false;
  };

  const onServiceSelect = (id) => {
    let newList = property.careTypeList;
    if (serviceChecked(id)) {
      newList = newList.filter((item) => item != id);
    } else {
      newList.push(id);
    }
    onChangeHandler(newList);
  };

  return (
    <div>
      <h3 className="form-title">Care Types</h3>
      <hr />
      <br />
      <div style={{ textAlign: "center" }}>
        <h5 style={{ color: "red" }}>
          Note: At least 1 Care Type needs to be selected
        </h5>
      </div>
      <div className="px-5">
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <div>
            <div className="overflow-auto p-4" style={{ maxHeight: "700px" }}>
              {careTypeList &&
                careTypeList.map((item) => {
                  let { id, title } = item;
                  let labelID = `pct${id}`;
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
                          onServiceSelect(id);
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
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  pAmenityList: state.scrape.pAmenityList,
  appSize: state.global.appSize,
});

const mapDispatchToProps = { updatePropertyDetail };

export default connect(mapStateToProps, mapDispatchToProps)(CareTypesForm);
