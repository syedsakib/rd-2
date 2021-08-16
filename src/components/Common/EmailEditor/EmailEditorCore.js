import React, { useRef, useEffect } from "react";
import EmailEditor from "react-email-editor";
import CustomButton from "../Button/Button";
import "./emailEditor.scss";
import {
  saveTemplateDesign,
  exportTemplateDesign,
} from "../../../store/Actions/mailAction";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

const EmailEditorWrapper = ({
  saveTemplateDesign,
  exportTemplateDesign,
  preDesign,
  lastExportedDesign,
  templateId,
  exportCallBack,
  saveCallBack,
}) => {
  const emailEditorRef = useRef(null);
  const hiddenPreview = useRef(null);
  useEffect(() => {
    loadUnLayer();
  }, []);

  const loadUnLayer = () => {
    try {
      window.unlayer.init({
        id: "editor",
        projectId: 6308,
        // templateId: "[TEMPLATE-ID]",
        height: 800,
        appearance: {
          theme: "dark",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (preDesign) {
      loadDesign(preDesign);
    }
  }, [preDesign]);

  const exportHtml = () => {
    if (!templateId) return;
    window.unlayer.exportHtml(async (data) => {
      try {
        const { design, html } = data;
        //console.log("exportHtml", html);
        let result = await exportTemplateDesign(templateId, design, html);
        if (result) {
          if (exportCallBack)
            exportCallBack(templateId, JSON.stringify(design));
        }
      } catch (e) {
        toastr.error("Error", e.toString());
      }
    });
  };
  const saveDesign = () => {
    if (!templateId) return;
    window.unlayer.saveDesign(async (design) => {
      try {
        //console.log("saveDesign", design);
        let result = await saveTemplateDesign(templateId, design);
        if (result) {
          if (saveCallBack) saveCallBack(templateId, JSON.stringify(design));
        }
      } catch (e) {
        toastr.error("Error", e.toString());
      }
    });
  };

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    loadDesign(preDesign);
  };

  const loadLastExportedDesign = () => {
    try {
      if (lastExportedDesign) {
        loadDesign(lastExportedDesign);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadDesign = (design) => {
    window.unlayer.loadDesign(design);
  };

  return (
    <div className="email-editor-wrapper">
      <div style={{ display: "none" }} ref={hiddenPreview} />
      <div className="editor-btn-wrapper">
        {saveDesign && (
          <CustomButton
            icon="save"
            toolTip="Save Design"
            onClick={saveDesign}
          />
        )}
        {exportHtml && (
          <CustomButton
            icon="code"
            toolTip="Export to Html & Save"
            onClick={exportHtml}
          />
        )}
        <CustomButton
          icon="history"
          toolTip="Load Last Exported Design"
          onClick={loadLastExportedDesign}
        />
      </div>
      <div className="editor-box">
        <div id="editor" style={{ height: 800 }} ref={emailEditorRef} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  saveTemplateDesign,
  exportTemplateDesign,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailEditorWrapper);
