const createPlugin = editor => {
  const openDialog = function () {
    return editor.windowManager.open({
      title: "Create Box",
      body: {
        type: "panel",
        items: [
          {
            type: "input",
            name: "title",
            label: "Title",
          },
          {
            type: "textarea",
            name: "content",
            label: "Initial Content",
            maximized: true,
          },
        ],
      },
      buttons: [
        {
          type: "cancel",
          text: "Close",
        },
        {
          type: "submit",
          text: "Add",
          primary: true,
        },
      ],
      onSubmit: function (api) {
        let data = api.getData()
        // Insert content when the window form is submitted
        editor.insertContent(`<div class="box-layer-wrapper custom-box">
                                  <div class="box-content-menu" contenteditable="false">
                                    <div class="box-content-menu-list">
                                      <div class="box-content-menu-item-wrapper">
                                        <span class="box-content-menu-item">
                                         <img
                                            src="https://cdn-boomershub.s3.amazonaws.com/web/icons/delete.png"
                                            alt="Delete"
                                            class="box-content-menu-item-icon"
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="box-layer-inner-wrapper">
                                    <div class="box-layer-header">
                                      <h3 class="box-layer-title">
                                        ${data.title}
                                      </h3>
                                      <span class="boom-logo-wrapper" contenteditable="false">
                                        <img
                                          src="https://cdn-boomershub.s3.amazonaws.com/assets/img/logo_short_transparent.jpg"
                                          alt="BoomersHub Logo - Happy Tomorrows"
                                          class="boom-logo"
                                        />
                                      </span>
                                    </div>
                                    <div class="box-layer-body" >
                                       <div class="box-layer-content">
                                        ${data.content}
                                      </div>
                                    </div>
                                  </div>
                        </div>`)
        api.close()
      },
    })
  }

  // Add a button that opens a window
  editor.ui.registry.addButton("boxer", {
    text: "Box",
    onAction: function () {
      // Open window
      openDialog()
    },
  })

  // Adds a menu item, which can then be included in any menu via the menu/menubar configuration
  editor.ui.registry.addMenuItem("boxer", {
    text: "Box",
    onAction: function () {
      // Open window
      openDialog()
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
