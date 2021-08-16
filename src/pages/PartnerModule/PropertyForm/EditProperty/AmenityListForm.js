import React, { useState } from "react";
import { connect } from "react-redux";
import { updatePropertyDetail } from "../../../../store/Actions/scrapeAction";
import LoaderComponent from "components/Common/Loader/LoaderComponent";

const AmenityListForm = ({ property, pAmenityList, updatePropertyDetail }) => {
  const [selectedData, updateSelectedList] = useState({
    selectedList: [],
  });
  const [isLoading, toggleLoader] = useState(false);
  const { selectedList } = selectedData;

  useEffect(() => {
    if (property) {
      let { amenities } = property;
      if (amenities) {
        console.log(amenities);
        updateSelectedList({
          selectedList: amenities.split(","),
        });
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
    updateSelectedList({
      selectedList: newList,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!property) {
        throw "No property data found";
      }
      toggleLoader(true);
      let result = await updatePropertyDetail(property.boom_hash, "amenity", {
        amenities: selectedList,
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

export default connect(mapStateToProps, mapDispatchToProps)(AmenityListForm);
