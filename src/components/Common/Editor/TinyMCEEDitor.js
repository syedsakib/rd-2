import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import createBoxerPlugin from "./plugins/boxer";
import createTwitterPlugin from "./plugins/twitter";
import createDropCapPlugin from "./plugins/dropCap";

const TinyMceEditor = ({ onChange, value, height }) => {
  const handleEditorChange = (e) => {
    //console.log("Content was updated:", e.target.getContent());
    onChange(e.target.getContent());
  };

  const addBoxHandlers = (editor, $) => {
    let body = $(editor.getBody());
    let dragEl = body.find(".custom-box");
    if (dragEl.length > 0) {
      console.log(`Box Contents`, dragEl);
      dragEl.off("click");
      dragEl.on("click", function (e) {
        e.preventDefault();
        let el = $(this);
        el.attr("contenteditable", "true");
        el.addClass("focus-box");
        el.find(".box-content-menu-item-wrapper")
          .off("click")
          .on("click", function (e) {
            e.preventDefault();
            el.remove();
            return false;
          });
        return false;
      });
    } else {
      console.log(`No box content found`);
    }
  };

  const addEditorHandler = (editor, $) => {
    let body = $(editor.getBody());
    let dragEl = body.find(".custom-box");
    if (dragEl.length > 0) {
      console.log(dragEl);
      dragEl.removeClass("focus-box");
      dragEl.attr("contenteditable", "false");
    }
  };

  return (
    <Editor
      apiKey="k91w6lncuxrw2zh9sb9w44y194e25ffiujdv7q23vladanj5"
      initialValue={value}
      init={{
        height: height || 800,
        menubar: true,
        plugins:
          "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help quickbars emoticons code paste",
        external_plugins: {
          lineheight: "/plugins/lineheight.js",
        },
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify lineheightselect | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | boxer twitter dropCap | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
        rel_list: [
          { title: "follow", value: "follow" },
          { title: "nofollow", value: "nofollow" },
        ],
        setup: (editor) => {
          let $ = window.jQuery;
          editor.on("Click", function (e) {
            addEditorHandler(editor, $);
          });
          editor.on("ExecCommand", function (e) {
            console.log("The " + e.command + " command was fired.", e);
            addBoxHandlers(editor, $);
          });
          editor.on("init", function (e) {
            console.log("The Editor has initialized.");
            addBoxHandlers(editor, $);
            //editor.execCommand("Undo");
          });
          createBoxerPlugin(editor);
          createTwitterPlugin(editor);
          createDropCapPlugin(editor);
        },
        paste_as_text: true,
        image_title: true,
        toolbar_sticky: true,
        force_br_newlines: true,
        force_p_newlines: true,
        forced_root_block: "",
        paste_data_images: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        image_advtab: true,
        image_caption: true,
        importcss_append: true,
        // quickbars_selection_toolbar:
        // "bold italic | quicklink h2 h3 blockquote quickimage quicktable | remove",
        quickbars_selection_toolbar: false,
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "sliding",
        spellchecker_whitelist: ["Ephox", "Moxiecode"],
        tinycomments_mode: "embedded",
        content_style: ".mymention{ color: gray; }",
        contextmenu: "link image imagetools table | remove",
        a11y_advanced_options: true,
        content_css: "default,/assets/css/content.css",
        fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt",
      }}
      onChange={handleEditorChange}
    />
  );
};

export default TinyMceEditor;
