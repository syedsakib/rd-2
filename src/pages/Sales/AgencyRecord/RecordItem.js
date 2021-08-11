import React from "react";

const RecordItem = ({ title, record }) => {
  return (
    <div className="sale-record-col-wrapper">
      <div className="sale-record-content-header">
        <h4 className="sale-record-content-header-title">{title}</h4>
      </div>
      <dl className="row">
        <dt className="col-sm-3 h5"> Title</dt>
        <dd className="col-sm-9 p fw-medium">{record.title}</dd>
        <dt className="col-sm-3 h5"> Email</dt>
        <dd className="col-sm-9 p fw-medium"> {record.email || "n/a"}</dd>
        <dt className="col-sm-3 h5">Phone Number</dt>
        <dd className="col-sm-9 p fw-medium"> {record.phoneNumber || "n/a"}</dd>
        <dt className="col-sm-3 h5">Local Phone</dt>
        <dd className="col-sm-9 p fw-medium"> {record.localPhone || "n/a"}</dd>
        <dt className="col-sm-3 h5">Address</dt>
        <dd className="col-sm-9 p fw-medium"> {record.address || "n/a"}</dd>
        <dt className="col-sm-3 h5">
          <div className="sale-record-content-col-label">City</div>
        </dt>
        <dd className="col-sm-9 p fw-medium"> {record.city || "n/a"}</dd>
        <dt className="col-sm-3 h5">State</dt>
        <dd className="col-sm-9 p fw-medium"> {record.state || "n/a"}</dd>
        <dt className="col-sm-3 h5">ZipCode</dt>
        <dd className="col-sm-9 p fw-medium"> {record.zipCode || "n/a"}</dd>
        <dt className="col-sm-3 h5">License Number</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.license_number || "n/a"}
        </dd>
        <dt className="col-sm-3 h5">Company Name</dt>
        <dd className="col-sm-9 p fw-medium"> {record.companyName || "n/a"}</dd>
        <dt className="col-sm-3 h5">Website</dt>
        <dd className="col-sm-9 p fw-medium">{record.website || "n/a"}</dd>
        <dt className="col-sm-3 h5"> Preferred Business Time</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.preferredBusinessContactTime &&
          record.preferredBusinessContactTime.split(" ")[0] > 0
            ? `${record.preferredBusinessContactTime} (${record.preferredBusinessContactTimeZone})`
            : "n/a"}
        </dd>
        <dt className="col-sm-3 h5">Administrator Name</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.administratorName || "n/a"}
        </dd>
        <dt className="col-sm-3 h5">Administrator Phone</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.administratorPhone || "n/a"}
        </dd>
        <dt className="col-sm-3 h5"> Administrator Email</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.administratorEmail || "n/a"}
        </dd>
        <dt className="col-sm-3 h5"> Administrator City</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.administratorCity || "n/a"}
        </dd>
        <dt className="col-sm-3 h5"> Administrator State</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.administratorState || "n/a"}
        </dd>
        <dt className="col-sm-3 h5"> Administrator ZipCode</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.administratorZipCode || "n/a"}
        </dd>
        <dt className="col-sm-3 h5"> Administrator Preferred Contact Method</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.administratorPreferredContactMethod || "n/a"}
        </dd>{" "}
        <dt className="col-sm-3 h5"> Administrator Preferred Contact Time</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.administratorPreferredContactTime &&
          record.administratorPreferredContactTime.split(" ")[0] > 0
            ? `${record.administratorPreferredContactTime} (${record.administratorPreferredContactTimeZone})`
            : "n/a"}
        </dd>
        <dt className="col-sm-3 h5"> Facebook</dt>
        <dd className="col-sm-9 p fw-medium">{record.facebook || "n/a"}</dd>
        <dt className="col-sm-3 h5"> Twitter</dt>
        <dd className="col-sm-9 p fw-medium">{record.twitter || "n/a"}</dd>
        <dt className="col-sm-3 h5"> LinkedIn</dt>
        <dd className="col-sm-9 p fw-medium">{record.linkedIn || "n/a"}</dd>
        <dt className="col-sm-3 h5"> Instagram</dt>
        <dd className="col-sm-9 p fw-medium"> {record.instagram || "n/a"}</dd>
        <dt className="col-sm-3 h5"> Description</dt>
        <dd className="col-sm-9 p fw-medium"> {record.description || "n/a"}</dd>
        <dt className="col-sm-3 h5"> Services</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.services &&
          record.services.length > 0 &&
          record.services[0].service ? (
            <div className="record-value-list-wrapper">
              <ul className="record-value-list">
                {record.services.map(({ id, service }, index) => {
                  return (
                    <li className="record-value-list-item" key={`s-${id}`}>
                      {service.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            "n/a"
          )}
        </dd>
        <dt className="col-sm-3 h5"> Regions</dt>
        <dd className="col-sm-9 p fw-medium">
          {record.regions &&
          record.regions.length > 0 &&
          record.regions[0].location ? (
            <div className="record-value-list-wrapper">
              <ul className="record-value-list">
                {record.regions.map(({ id, location }, index) => {
                  return (
                    <li className="record-value-list-item" key={`s-${id}`}>
                      {`${location.zip} ${location.city} , ${location.state_name}`}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            "n/a"
          )}
        </dd>
      </dl>
    </div>
  );
};

export default RecordItem;
