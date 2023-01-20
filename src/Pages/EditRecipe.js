import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

import { ContentState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Markup } from "interweave";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Container, Row, Col, Form } from "react-bootstrap";
// import Select from "react-select";
// import TextEditor from "../Comoponents/TextEditor";
import { useParams } from "react-router-dom";
const categoryArr = [];
let newArr = [];
export default function EditRecipe() {
  const params = useParams().recipeId;

  let _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  const [item, setItem] = useState([]);

  const [category, setCategory] = useState(categoryArr);
  const [currenctCategory, setCurrentCategory] = useState({
    value: null,
    title: ""
  });
  const [getDescription, setGetDescription] = useState();

  const [payload, setPayload] = useState({
    name: "",
    description: "",
    author_name: "",
    email: "",
    category_id: [],
    takenTime: "",
    images: "",
    tags: [],
    ingredients: []
  });

  console.log(payload);

  useEffect(() => {
    const url = "/api/v1/recipes/" + params;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPayload(json.data);
        setCurrentCategory({
          value: json.data.recipe_categories?.category?.id,
          title: json.data.recipe_categories?.category?.title
        });
      } catch (error) {
        //console.log("error", error);
      }
    };

    fetchData();
  }, []);

  // console.log(contentState.blocks, "contentState");

  const getDes = () => {
    contentState.blocks.map((i) => newArr.push(i.text));
  };
  getDes();

  const options = [];
  const [selectedOption, setSelectedOption] = useState(null);

  const handelChange_ingredients = (option) => {
    const arr = [];
    option.map((i) => arr.push(i.label));
    setPayload((prevState) => ({
      ...prevState,
      ["ingredients"]: arr
    }));
  };

  useEffect(() => {
    // setGetDescription(newArr);
    setPayload((prevState) => ({
      ...prevState,
      ["description"]: getDescription
    }));
  }, [contentState]);

  const handelChange_tags = (option) => {
    const arr = [];
    option.map((i) => arr.push(i.label));
    setPayload((prevState) => ({
      ...prevState,
      ["tags"]: arr
    }));
  };

  const handelChange_category = (option) => {
    console.log(option.id);
    setPayload((prevState) => ({
      ...prevState,
      ["category_id"]: option.id
    }));
  };

  const url = "/api/v1/";

  useEffect(() => {
    fetch(url + "category")
      .then((response) => response.json())
      .then((res) => {
        categoryArr.length = 0;
        categoryArr.push({
          label: "Select Category",
          value: 0,
          disable: true
        });
        res.data.map((i) => {
          const obj = {};
          obj.id = i.id;
          obj.label = i.title;
          categoryArr.push(obj);
        });
        console.log(categoryArr);
      })
      .catch((err) => console.error(err));
  }, []);

  const data = new FormData();
  data.append("images", payload.images);
  data.append("name", payload.name);
  data.append("takenTime", payload.takenTime);
  data.append("description", payload.description);
  data.append("author_name", payload.author_name);
  data.append("email", payload.email);
  data.append("category_id", payload.category_id);
  data.append("tags", payload.tags);
  data.append("ingredients", payload.ingredients);

  useEffect(() => {
    console.log(data, "data");
  }, [payload]);

  const formSubmit = () => {
    console.log(payload, "payload");
    const url = "/api/v1/recipes-update";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  // const getSelection = (event) => {
  //   console.log(event.target.selectionStart, "start");
  // };
  const onChange = (e) => {
    setPayload((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const onChangeDec = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.target.value = e.target.value.append("\n");
    }
    setPayload((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  // const uploadMultiple = (e) => {};

  // var data = new FormData();

  // data.append("file", );

  function getDataUrl(event) {
    setPayload((prevState) => ({
      ...prevState,
      images: event.target.files[0]
    }));
    var reader = new FileReader();
    reader.onloadend = function () {
      const arr = [];
      arr.push(reader.result);
      setPayload((prevState) => ({
        ...prevState,
        ["images"]: reader.result
      }));
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  // const getEmergencyFoundImg = (urlImg) => {
  //   var img = new Image();
  //   img.src = urlImg;
  //   img.crossOrigin = "Anonymous";

  //   var canvas = document.createElement("canvas"),
  //     ctx = canvas.getContext("2d");

  //   canvas.height = img.naturalHeight;
  //   canvas.width = img.naturalWidth;
  //   ctx.drawImage(img, 0, 0);

  //   var b64 = canvas
  //     .toDataURL("image/png")
  //     .replace(/^data:image.+;base64,/, "");
  //   return b64;
  // };

  function wrapText(openTag, closeTag) {
    var textArea = document.querySelector("#myTa");

    var len = textArea.value.length;
    var start = textArea.selectionStart;
    var end = textArea.selectionEnd;

    var selectedText = textArea.value.substring(start, end);
    var replacement = openTag + selectedText + closeTag;
    if (end !== start) {
      textArea.value =
        textArea.value.substring(0, start) +
        replacement +
        textArea.value.substring(end, len);
    }
  }

  const textbold = () => {
    wrapText("<strong>", "</strong>");
  };
  const textitalic = () => {
    wrapText("<em>", "</em>");
  };
  // const textunderline = () => {
  //   wrapText("<u>", "</u>");
  // };
  const h1 = () => {
    wrapText("<h1>", "</h1>");
  };
  const h2 = () => {
    wrapText("<h2>", "</h2>");
  };
  const h3 = () => {
    wrapText("<h3>", "</h3>");
  };
  const h4 = () => {
    wrapText("<h4>", "</h4>");
  };
  const h5 = () => {
    wrapText("<h5>", "</h5>");
  };
  const h6 = () => {
    wrapText("<h6>", "</h6>");
  };
  // function convertHtml(elm) {
  //   var tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = elm;
  // }
  return (
    <Container className="innerPage">
      <div className="sctionHeading text-white">
        <h2>Edit Recipe</h2>
      </div>
      <Form>
        <Row className="px-2">
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Enter Title*</label>
            <input
              type="text"
              className="form-control"
              required
              name="name"
              placeholder="Enter Title*"
              value={payload.name}
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Upload image</label>

            <input
              type="file"
              className="form-control"
              placeholder="Enter Title*"
              value={payload?.image}
              name="images"
              multiple
              onChange={(event) => getDataUrl(event)}
            />
          </Col>{" "}
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Time Taken</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Time Taken*"
              name="takenTime"
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Enter Ingredients</label>
            <CreatableSelect
              className="creatableSelect"
              defaultValue={selectedOption}
              required
              onChange={(option) => handelChange_ingredients(option)}
              options={options}
              isClearable
              isMulti
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Enter Tags</label>
            <CreatableSelect
              className="creatableSelect"
              defaultValue={selectedOption}
              required
              onChange={(option) => handelChange_tags(option)}
              options={options}
              isClearable
              isMulti
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Select Category</label>
            <CreatableSelect
              className="creatableSelect"
              defaultValue={selectedOption}
              required
              onChange={(option) => handelChange_category(option)}
              options={category}
              // isOptionDisabled={(option) => option.disabled}
              isClearable
              // isMulti
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Author Name</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Author*"
              name="author_name"
              value={payload.author_name}
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Email</label>
            <input
              type="email"
              className="form-control"
              required
              placeholder="email*"
              name="email"
              value={payload.email}
              onChange={onChange}
            />
          </Col>
          <Col md={12} className="px-2 mb-3">
            <label className="text-white mb-2 d-block">Enter Description</label>
            {/* <Editor
              defaultContentState={contentState}
              onContentStateChange={setContentState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            /> */}
            {/* <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            /> */}
            <button type="button" onClick={textbold}>
              bold
            </button>
            <button type="button" onClick={textitalic}>
              italic
            </button>
            {/* <button type="button" onClick={textunderline}>
              toggle underline
            </button> */}
            <button type="button" onClick={h1}>
              h1
            </button>
            <button type="button" onClick={h2}>
              h2
            </button>
            <button type="button" onClick={h3}>
              h3
            </button>
            <button type="button" onClick={h4}>
              h4
            </button>
            <button type="button" onClick={h5}>
              h5
            </button>
            <button type="button" onClick={h6}>
              h6
            </button>
            <textarea
              required
              name="description"
              className="form-control"
              onKeyDown={onChangeDec}
              id="myTa"
              rows={6}
              value={payload.description}
            >
              {payload.description}
            </textarea>

            <Markup className="text-white" content={payload.description} />
          </Col>
          <Col md={12} className="text-end">
            <button type="button" onClick={formSubmit} className="themeBtn">
              Submit Now
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
