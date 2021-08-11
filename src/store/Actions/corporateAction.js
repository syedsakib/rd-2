import { toastr } from "react-redux-toastr";
import { postRequestWithAuth } from "./apiAction";

//------------Corporate routes------------------//
export const createCorporate = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/createCorporate",
      formData
    );
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const editCorporate = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("corporate/editCorporate", formData);
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const addCorporateManager = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/addCorporateManager",
      formData
    );
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const editCorporateManager = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/editCorporateManager",
      formData
    );
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const sendInviteFromCorporate = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/sendInviteFromCorporate",
      formData
    );
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getCorporateList = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/getCorporateList",
      formData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getCorporateUserDetail = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/getCorporateUserDetail",
      formData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getCorporateDetail = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/getCorporateDetail",
      formData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getCorporateManagerList = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/getCorporateManagerList",
      formData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getCorporateMemberList = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/getCorporateMemberList",
      formData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getCorporateInvitationList = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/getCorporateInvitationList",
      formData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const getCorporateInvitationDetail = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/getCorporateInvitationDetail",
      formData
    );
    const { data, status } = result.data;
    if (status === 200) {
      return data;
    } else {
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const confirmInvitationByMember = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/confirmInvitationByMember",
      formData
    );
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const confirmInvitationByCorporate = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/confirmInvitationByCorporate",
      formData
    );
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const cancelMemberInvitation = (formData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth(
      "corporate/cancelMemberInvitation",
      formData
    );
    const { msg, status } = result.data;
    if (status === 200) {
      toastr.success("Success", msg);
      return true;
    } else {
      toastr.error("Error", msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};
