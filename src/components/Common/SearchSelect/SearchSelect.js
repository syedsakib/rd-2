import React, { useState, useEffect, forwardRef } from "react"
import ButtonComp from "../Button/Button"
import "./SearchSelect.scss"

const SearchSelect = forwardRef(
  (
    {
      options,
      onSelect,
      onChange,
      labelName,
      numberMode,
      required,
      maxHeight,
      inputClassName,
      placeholder,
      value,
      name,
      id,
      top,
      showLabel = true,
      disabled,
      btnList,
      placeHolder,
      labelClass,
    },
    ref
  ) => {
    const [rows, updateRows] = useState([])
    useEffect(() => {
      updateRows(options)
    }, [options])
    const clearRows = () => {
      updateRows([])
    }
    return (
      <div className="search-select-wrapper">
        <div className="input-wrapper">
          <div className="form-group">
            <div className="search-select-inner">
              {showLabel && (
                <label className={`text-align-top ${labelClass}`}>
                  {labelName} {required && <sup className="lbl-star">*</sup>}
                </label>
              )}
              <div className="input-box-wrapper">
                <div className="input-box-inner-wrapper">
                  <input
                    autoComplete="nope"
                    className={`${inputClassName} search-field`}
                    placeholder={placeholder || placeHolder}
                    name={name}
                    id={id}
                    disabled={disabled}
                    onChange={async e => {
                      let val = e.target.value
                      if (numberMode && val !== "" && isNaN(val)) {
                        val = value
                      }
                      if (!val || val.trim() === "") {
                        clearRows()
                      }
                      onChange(val)
                    }}
                    value={value}
                    ref={ref}
                  />
                </div>
                {value && (
                  <div className="close-btn-wrapper">
                    <div
                      className="close-btn"
                      onClick={() => {
                        clearRows()
                        onChange("")
                      }}
                    >
                      <i className="fa fa-times" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {rows && rows.length > 0 && (
            <div className="result-row-wrapper">
              <div
                className="result-row-inner-wrapper"
                style={{ maxHeight: maxHeight || "500px" }}
              >
                {options &&
                  options.map(({ label, value }, index) => {
                    return (
                      <div
                        className="result-row"
                        key={`sl-${index}`}
                        onClick={() => {
                          if (!btnList) {
                            onSelect(value)
                            clearRows()
                          }
                        }}
                      >
                        <div className="result-row-content-body">
                          <div className="result-row-content">{label}</div>
                        </div>
                        {btnList && btnList.length > 0 && (
                          <div className="result-row-content-btn-list">
                            {btnList.map(btnItem => {
                              let {
                                label,
                                toolTip,
                                onClick,
                                icon,
                                shouldClearRows,
                              } = btnItem
                              return (
                                <div className="btn-wrapper">
                                  <ButtonComp
                                    icon={icon}
                                    toolTip={toolTip}
                                    label={label}
                                    onClick={() => {
                                      onClick(value)
                                      if (shouldClearRows) {
                                        clearRows()
                                      }
                                    }}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default SearchSelect
