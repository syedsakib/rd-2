const createPlugin = editor => {
  const insertDropCap = function () {
    //editor.execCommand("mceInsertRawHTML", false, "<p>Hello, World!</p>");
    let content = editor.selection.getContent({ format: "text" })
    editor.execCommand(
      "mceReplaceContent",
      false,
      `<span class="drop-cap">${content}</span>`
    )
    console.log(`Selected Content is `, content)
  }

  // Add a button that opens a window
  editor.ui.registry.addButton("dropCap", {
    text: "DropCap",
    onAction: function () {
      // Open window
      insertDropCap()
    },
  })

  // Adds a menu item, which can then be included in any menu via the menu/menubar configuration
  editor.ui.registry.addMenuItem("dropCap", {
    text: "DropCap",
    onAction: function () {
      // Open window
      insertDropCap()
    },
  })

  return {
    getMetadata: function () {
      return {
        name: "Example plugin",
        url: "http://exampleplugindocsurl.com",
      }
    },
  }
}

export default createPlugin
