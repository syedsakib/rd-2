import React, { useEffect, useRef, useState } from "react"
import ReactTags from "react-tag-autocomplete"
import "./reactTags.scss"

const CustomTagInput = ({ suggestionList, onChange, defaultTags }) => {
  const reactTags = useRef()
  const [tagData, updateTagData] = useState({
    tags: [],
    suggestions: suggestionList,
  })

  useEffect(() => {
    if (defaultTags && defaultTags.length > 0) {
      console.log(defaultTags)
      updateTagData({
        ...tagData,
        tags: defaultTags,
      })
    }
  }, [defaultTags])

  const { tags, suggestions } = tagData
  const handleDelete = i => {
    let newTags = tags.filter((tag, index) => index !== i)
    updateTagData({
      ...tagData,
      tags: newTags,
    })
    onChange(newTags)
  }
  const handleAddition = tag => {
    const result = tags.filter(item => item.id == tag.id)
    if (result[0]) {
      return
    }
    const newTags = [...tags, tag]
    updateTagData({
      ...tagData,
      tags: newTags,
    })
    onChange(newTags)
  }

  return (
    <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={suggestions}
      onDelete={handleDelete}
      onAddition={handleAddition}
      placeholderText={"Write Keyword"}
    />
  )
}

export default CustomTagInput
