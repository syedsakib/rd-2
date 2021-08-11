import { postRequestWithAuth } from "./apiAction";
import { toastr } from "react-redux-toastr";

export const getEmailTemplate = (templateId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("mail/getEmailTemplate", {
      templateId,
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

export const getEmailTemplateByType = (templateId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("mail/getEmailTemplateByType", {
      templateId,
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

export const getEmailAttachedFiles = (templateId) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("mail/getEmailAttachedFiles", {
      templateId,
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

export const saveTemplateDesign = (templateId, design) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("mail/saveTemplateDesign", {
      templateId,
      design,
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

export const exportTemplateDesign =
  (templateId, design, html) => async (dispatch) => {
    try {
      let result = await postRequestWithAuth("mail/exportTemplateDesign", {
        templateId,
        design,
        html,
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

export const uploadAttachFiles = (data, files) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    for (let f of files) {
      formData.append("files", f.file);
    }
    let result = await postRequestWithAuth("mail/uploadAttachFiles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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

export const removeAttachedFile = (templateId, fileKey) => async (dispatch) => {
  try {
    let result = await postRequestWithAuth("mail/removeAttachedFile", {
      templateId,
      fileKey,
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
