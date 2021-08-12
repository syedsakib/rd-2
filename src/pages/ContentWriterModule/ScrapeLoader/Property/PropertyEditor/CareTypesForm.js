import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updatePropertyDetail } from "../../../../../store/Actions/scrapeAction";
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

const CareTypesForm = ({ property, pAmenityList, updatePropertyDetail }) => {
  const [isLoading, toggleLoader] = useState(false);
  const [careTypes, updateCareTypes] = useState({
    assisted_living: null,
    memory_care: null,
    nursing_home: null,
    independent_living: null,
    hospice: null,
    adult_day_care: null,
    adult_foster_home: null,
    personal_care_home: null,
    residential_care_home: null,
    respite_care: null,
    reverse_mortgage: null,
    skilled_nursing: null,
    icf_iid: null,
  });

  useEffect(() => {
    if (property) {
      updateCareTypes({
        assisted_living: property.assisted_living,
        memory_care: property.memory_care,
        nursing_home: property.nursing_home,
        independent_living: property.independent_living,
        hospice: property.hospice,
        adult_day_care: property.adult_day_care,
        adult_foster_home: property.adult_foster_home,
        personal_care_home: property.personal_care_home,
        residential_care_home: property.residential_care_home,
        respite_care: property.respite_care,
        reverse_mortgage: property.reverse_mortgage,
        skilled_nursing: property.skilled_nursing,
        icf_iid: property.icf_iid,
      });
    }
  }, [property]);

  const serviceChecked = (id) => {
    if (careTypes[id] === "Y") {
      return true;
    }
    return false;
  };

  const onServiceSelect = (id) => {
    let prevResult = careTypes[id];
    updateCareTypes({
      ...careTypes,
      [id]: prevResult === "Y" ? null : "Y",
    });
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!property) {
        throw "No property data found";
      }
      toggleLoader(true);
      let result = await updatePropertyDetail(property.boom_hash, "careType", {
        careTypes,
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
      <h3 className="form-title">Care Types</h3>
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
                      value={careTypes[id] || ""}
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
  pAmenityList: state.scrape.pAmenityList,
  appSize: state.global.appSize,
});

const mapDispatchToProps = { updatePropertyDetail };

export default connect(mapStateToProps, mapDispatchToProps)(CareTypesForm);
