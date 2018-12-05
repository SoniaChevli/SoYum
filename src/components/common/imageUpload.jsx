import React from "react";
import uploadSymbol from "../../icons/upload-symbol.png";

const ImageUpload = ({ fileSelectorHandler, imagePreview }) => {
  return (
    <label id="custom-file-upload">
      {" "}
      Upload Image
      <img src={uploadSymbol} alt="" id="uploadSymbol" />
      <br />
      <input type="file" name="imageUpload" onChange={fileSelectorHandler} />
      {imagePreview ? (
        <img src={imagePreview} id="imagePreview" alt="imagePreview" />
      ) : (
        <div />
      )}
    </label>
  );
};

export default ImageUpload;
