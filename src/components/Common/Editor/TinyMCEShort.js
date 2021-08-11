import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMceEditor = ({ onChange, value }) => {
  let editorRef;
  const handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
    onChange(e.target.getContent());
  };

  useEffect(() => {
    if (editorRef && editorRef.editor) {
      editorRef.editor.setContent(value);
    }
  }, [value]);

  return (
    <Editor
      ref={(editor) => {
        editorRef = editor;
      }}
      apiKey="k91w6lncuxrw2zh9sb9w44y194e25ffiujdv7q23vladanj5"
      initialValue={value}
      init={{
        height: 800,
        menubar: true,
        plugins:
          "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help quickbars emoticons code paste",
        external_plugins: {
          lineheight: "/plugins/lineheight.js",
        },
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify lineheightselect | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
        rel_list: [
          { title: "follow", value: "follow" },
          { title: "nofollow", value: "nofollow" },
        ],
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
        paste_as_text: true,
        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable | remove",
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
