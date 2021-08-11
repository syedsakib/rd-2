import React from "react"
//import { Multiselect } from "multiselect-react-dropdown";
import { Dropdown } from "semantic-ui-react"
//import "semantic-ui-css/semantic.css"
import "./MultiSelectbox.css"

const MultiSelectCheckbox = React.memo(
  ({
    optionList,
    selectedValue,
    onSelectHandler,
    placeholder,
    filterType,
    id,
  }) => {
    return (
      <Dropdown
        placeholder={placeholder}
        fluid
        multiple
        selection
        options={optionList}
        search
        id={id}
        value={selectedValue}
        onChange={(e, { value }) => {
          onSelectHandler(value, filterType)
        }}
        className="form-control form-select"
      />
    )
  },
  (prevProps, nextProps) => {
    return false
  }
)

export default MultiSelectCheckbox
