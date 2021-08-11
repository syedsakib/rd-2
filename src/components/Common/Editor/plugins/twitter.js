const createPlugin = editor => {
  const openDialog = function () {
    return editor.windowManager.open({
      title: "Create Twitter Box",
      body: {
        type: "panel",
        items: [
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
        editor.insertContent(`<div class="twitter-quote-wrapper custom-box">
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
                                    <blockquote class="twitter-quote">
                                      ${data.content}
                                    </blockquote>
                                    <div class="twitter-send-btn-wrapper" contenteditable="false">
                                      <div class="twitter-send-btn">
                                        Click to tweet
                                       <span class="btn-icon-wrapper">
                                          <img
                                            src="https://cdn-boomershub.s3.amazonaws.com/web/icons/twitter-tweet.png"
                                            alt="tweet"
                                            class="btn-icon"
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </div>`)
        api.close()
      },
    })
  }

  // Add a button that opens a window
  editor.ui.registry.addButton("twitter", {
    text: "Twitter",
    onAction: function () {
      // Open window
      openDialog()
    },
  })

  // Adds a menu item, which can then be included in any menu via the menu/menubar configuration
  editor.ui.registry.addMenuItem("twitter", {
    text: "Twitter",
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
