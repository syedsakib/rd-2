import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updatePropertyDetail } from "../../../../store/Actions/scrapeAction";
import { toastr } from "react-redux-toastr";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const CommunityListForm = ({ property, pCommunityList, onChangeHandler }) => {
  const [isLoading, toggleLoader] = useState(false);

  const serviceChecked = (id) => {
    let careTypes = property.communityList.filter((item) => item == id);
    if (careTypes[0]) {
      return true;
    }
    return false;
  };

  const onServiceSelect = (id) => {
    let newList = property.communityList;
    if (serviceChecked(id)) {
      newList = newList.filter((item) => item != id);
    } else {
      newList.push(id);
    }
    onChangeHandler(newList);
  };

  return (
    <div>
      <h3 className="form-title">Communities</h3>
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
              {pCommunityList &&
                pCommunityList.rows &&
                pCommunityList.rows.map((item) => {
                  let { id, title } = item;
                  let labelID = `pcm${id}`;
                  return (
                    <div
                      className="form-check form-check-success p-2"
                      key={labelID}
                    >
                      <input
                        type="checkbox"
                        value={id}
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
  pCommunityList: state.scrape.pCommunityList,
  appSize: state.global.appSize,
});

const mapDispatchToProps = { updatePropertyDetail };

export default connect(mapStateToProps, mapDispatchToProps)(CommunityListForm);
