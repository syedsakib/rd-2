import axios from "axios";
import { toastr } from "react-redux-toastr";
import url from "../config";
import { postRequestWithAuth } from "./apiAction";

export const getAllContacts =
  (pageNumber, searchText, sortingOrder, sortingColumn) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getAllContacts", {
        pageNumber,
        searchText,
        sortingOrder,
        sortingColumn,
      });
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

export const updateContact = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/updateContact", {
      postData,
    });
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

export const addContact = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/addContact", {
      postData,
    });
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

export const deleteContact = (id) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/deleteContact", {
      id,
    });
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

export const getAllGroups = (pageNumber, searchText) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getAllGroups", {
      pageNumber,
      searchText,
    });
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

export const importContact = (postData) => async (dispatch) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
    };
    let result = await postRequestWithAuth(
      "admin/importCSV",
      {
        postData,
      },
      { headers: headers }
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

export const sendCampaign = (postData, history) => async (dispatch) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
    };
    let res = await postRequestWithAuth(
      "admin/sendCampaings",
      {
        postData,
      },
      { headers: headers }
    );
    if (res.data.status === 200) {
      toastr.success(res.data.msg);
      history.push({ pathname: "/admin/campaign/contactManagement" });
      return true;
    } else if (res.data.status === 403) {
      toastr.error(res.data.msg);
      return res.data.status;
    } else {
      toastr.error(res.data.msg);
      return false;
    }
  } catch (err) {
    toastr.error("Error", "Something went wrong, Please try again");
    return false;
  }
};

export const moveContactToGroup =
  (groupId, selectedContact) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/moveContactToGroup", {
        groupId,
        selectedContact,
      });
      const { msg, status, data } = result.data;
      if (status === 200) {
        toastr.success("Success", msg);
        return data;
      } else {
        toastr.error("Error", msg);
        return false;
      }
    } catch (err) {
      toastr.error("Error", "Something went wrong, Please try again");
      return false;
    }
  };

export const addGroup = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/addGroup", {
      postData,
    });
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

export const getAllGroupsForPopup = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getAllGroupsForPopup", {
      postData,
    });
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

export const getGroupMembers =
  (pageNumber, searchText, id) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("admin/getGroupMembers", {
        pageNumber,
        searchText,
        id,
      });
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

export const editGroup = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/editGroup", {
      postData,
    });
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

export const deleteGroups = (postData) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/deleteGroups", {
      postData,
    });
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

export const getFromEmail = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getFromEmail");
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

export const getContactDetails = (userId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getContactDetails", {
      userId,
    });
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

export const getEmailTemplates = () => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("admin/getEmailTemplates");
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

// NEW CONTACT FUNCTIONS

export const getItemContactList =
  ({ itemId, itemType, pageNumber }) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth("contact/getItemContactList", {
        itemId,
        itemType,
      });
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

export const addItemContact =
  ({ itemId, itemType, phoneNumber, title }) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth("contact/addItemContact", {
        itemId,
        itemType,
        phoneNumber,
        title,
      });
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

export const deleteItemContact =
  ({ contactId, itemType }) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth("contact/deleteItemContact", {
        contactId,
        itemType,
      });
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

export const updateItemContact =
  ({ contactId, itemType, title, phoneNumber }) =>
  async (dispatch) => {
    try {
      let result = await postRequestWithAuth("contact/updateItemContact", {
        contactId,
        itemType,
        title,
        phoneNumber,
      });
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

// NEW CONTACT FUNCTIONS
