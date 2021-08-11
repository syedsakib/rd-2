import React, { useRef, useEffect } from "react"
import EmailEditor from "react-email-editor"
import CustomButton from "../../Button/Button"
import "./emailEditor.scss"
import {
  saveTemplateDesign,
  exportTemplateDesign,
} from "../../../../store/Actions/mailAction"
import { connect } from "react-redux"

const EmailEditorWrapper = ({
  saveTemplateDesign,
  exportTemplateDesign,
  preDesign,
  lastExportedDesign,
  templateId,
}) => {
  const emailEditorRef = useRef(null)
  const hiddenPreview = useRef(null)

  useEffect(() => {
    if (preDesign) {
      loadDesign(preDesign)
    }
  }, [preDesign])

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml(data => {
      const { design, html } = data
      console.log("exportHtml", html)
      exportTemplateDesign(templateId, design, html)
    })
  }
  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign(design => {
      console.log("saveDesign", design)
      saveTemplateDesign(templateId, design)
    })
  }

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    loadDesign(preDesign)
  }

  const loadLastExportedDesign = () => {
    try {
      if (lastExportedDesign) {
        loadDesign(lastExportedDesign)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const loadDesign = design => {
    if (
      emailEditorRef &&
      emailEditorRef.current &&
      emailEditorRef.current.editor
    ) {
      emailEditorRef.current.editor.loadDesign(design)
    }
  }

  return (
    <div className="email-editor-wrapper">
      <div style={{ display: "none" }} ref={hiddenPreview} />
      <div className="editor-btn-wrapper">
        <CustomButton icon="save" toolTip="Save Design" onClick={saveDesign} />
        <CustomButton
          icon="code"
          toolTip="Export to Html & Save"
          onClick={exportHtml}
        />
        <CustomButton
          icon="history"
          toolTip="Load Last Exported Design"
          onClick={loadLastExportedDesign}
        />
      </div>
      <div className="editor-box">
        {
          <EmailEditor
            ref={emailEditorRef}
            projectId={6308}
            onLoad={onLoad}
            minHeight={800}
            appearance={{
              theme: "dark",
            }}
          />
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  saveTemplateDesign,
  exportTemplateDesign,
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailEditorWrapper)
