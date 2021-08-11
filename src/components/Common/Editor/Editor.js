import React, { useState, Fragment, useEffect } from "react"
import JoditEditor from "jodit-react"
import "jodit/build/jodit.min.js"
import "jodit/build/jodit.min.css"
import "./editor.scss"

const Editor = React.memo(
  ({ value, onChange }) => {
    const [editorContent, updateEditorContent] = useState(null)
    let eValue = ""
    useEffect(() => {
      if (value) {
        eValue = value
        updateEditorContent(eValue)
      }
    }, [value])
    const updateValue = value => {
      onChange(value)
    }
    return (
      <div className="editor-box">
        <JoditEditor
          value={editorContent}
          //onBlur={(newContent) => updateValue(newContent)}
          onChange={newContent => updateValue(newContent)}
          config={{
            readonly: false,
            enableDragAndDropFileToEditor: true,
            uploader: {
              insertImageAsBase64URI: true,
            },
          }}
        />
      </div>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.value !== nextProps.value) {
      return false
    }
    return true
  }
)

export default Editor
