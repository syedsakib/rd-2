import React, { useState } from "react";
import { connect } from "react-redux";
import { updatePropertyDetail } from "../../../../store/Actions/scrapeAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AmenityListForm = ({ property, pAmenityList, onChangeHandler }) => {
  const [isLoading, toggleLoader] = useState(false);

  const serviceChecked = (id) => {
    let careTypes = property.amenityList.filter((item) => item == id);
    if (careTypes[0]) {
      return true;
    }
    return false;
  };

  const onServiceSelect = (id) => {
    let newList = property.amenityList;
    if (serviceChecked(id)) {
      newList = newList.filter((item) => item != id);
    } else {
      newList.push(id);
    }
    onChangeHandler(newList);
  };

  return (
    <div>
      <h3 className="form-title">Amenities</h3>
      <hr />
      <br />
      <div style={{ textAlign: "center" }}>
        <h5 style={{ color: "red" }}>Note: At least 3 types are required</h5>
      </div>
      <div className="px-5">
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <div>
            <div className="overflow-auto p-4" style={{ maxHeight: "700px" }}>
              {pAmenityList &&
                pAmenityList.rows &&
                pAmenityList.rows.map((item) => {
                  let { id, title } = item;
                  let labelID = `pam${id}`;
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

export default connect(mapStateToProps, mapDispatchToProps)(AmenityListForm);
