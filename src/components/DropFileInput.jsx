import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./drop-file.css";

import { ImageConfig } from "../config/ImageConfig";
import uploadImage from "../../images/upload.png";
const DropFileInput = (props) => {
  const [fileData, setFileData] = useState([]);

  const wrapperRef = useRef(null);
  const [drag, setDrag] = useState("");
  const onDragEnter = () => {
    setDrag("dragover");
  };

  const onDragLeave = () => {
    setDrag("");
  };
  const onDrop = (e) => {
    setDrag("");
  };
  const onFileDrop = (e) => {
    e.preventDefault();
    const newFile = e.target.files;
    var output = Object.keys(newFile).map(function (key) {
      return newFile[key];
    });
    const test = output.filter((value) => {
      // Image valid types

      const ValidTypes =
        value.type == "image/png" ||
        value.type == "image/jpeg" ||
        value.type == "image/jpg";

      if (!ValidTypes) {
        alert(value.name + " invalid");
      }
      return ValidTypes;
    });
    //image valid types
    setFileData((fileData) => [...fileData, ...test]);
    console.log("output", output);

    console.log("test", ...test);
  };
  useEffect(() => {
    console.log(fileData);
  }, [fileData]);

  return (
    <>
      <div
        className={`drop-file ${drag}`}
        onDragOver={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file__title">
          <img src={uploadImage} alt="" />
          <p>Drag & Drop Your Image here</p>
        </div>
        <input type="file" onChange={onFileDrop} multiple={true} title="" />
      </div>
      <div className="drop-file-preview">
        <div className="drop-file-preview__title">
          <h2>Ready To Push</h2>
          <button
            onClick={() => {
              setFileData([]);
            }}
          >
            clear
          </button>
        </div>
        {fileData.map((fileData, index) => (
          <div className="drop-file-preview__item" key={index}>
            <img
              src={
                ImageConfig[fileData.type.split("/")[1]] ||
                ImageConfig["default"]
              }
              alt=""
            />
            <div className="drop-file-preview__item__info">
              <p>{fileData.name}</p>
              <p>{Number(fileData.size / 1000)} kb</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DropFileInput;
