import React, { useCallback, useState, useEffect } from "react";
import {
  Banner,
  Caption,
  DropZone,
  List,
  Stack,
  Thumbnail
} from "@shopify/polaris";

export default function DropZoneWithImageFileUpload(props) {
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;
  const [isDisabled, setIsDisabled] = useState(true);
  const [encodedUrl, setEncodedUrl] = useState("");

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      setFiles(files => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    []
  );

  useEffect(() => {
    if (props.selectedTemplate === "Template-3") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [props.selectedTemplate]);

  useEffect(() => {
    //props.photos("");
    let arrayOfPhotoUrls = [];
    let arrayOfPhotoTypes = [];

    for (var i = 0; i < files.length; i++) {
      //arrayOfPhotoUrls.push(window.URL.createObjectURL(files[i]))
      // var reader = new FileReader();
      // reader.readAsDataURL(files[i]);
      // reader.onload = function () {
      //   var base64data = reader.result;
      //   arrayOfPhotoUrls.push(base64data.substr(base64data.indexOf(',') + 1))
      // }

      arrayOfPhotoUrls.push(convertToBase64(files[i]));
      //arrayOfPhotoUrls.push(setupReader(files[i]))
      arrayOfPhotoTypes.push(files[i].name);
    }
    console.log("Photos", arrayOfPhotoUrls);
    props.photos(arrayOfPhotoUrls, arrayOfPhotoTypes);
  }, [files]);

  function convertToBase64(file) {
    const reader = new FileReader();
    //const [encodedUrl, setEncodedUrl] = useState("");
    let photoUrls = [];

    //   let dict = {
    //     base64File: 'aasd'
    //   }

    reader.addEventListener(
      "load",
      function() {
        var base64 = reader.result;
        //setEncodedUrl(base64)
        //dict.base64File = base64;
        photoUrls.push(base64.substr(base64.indexOf(",") + 1));
      },
      true
    );

    //console.log("Dict", dict)
    //console.log("Dict64", dict.base64File)
    //setEncodedUrl(dict.base64File)
    console.log("EncodedUrl", encodedUrl);

    reader.readAsDataURL(file);

    console.log("Convert to Base 64", photoUrls);
    console.log("Convert to Base 64 Length", photoUrls.length);
    //console.log("Convert to Base 64", dict)
    return photoUrls;
  }

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <Stack vertical>
      {errorMessage}
      <DropZone
        accept="image/*"
        type="image"
        onDrop={handleDrop}
        disabled={isDisabled}
      >
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    </Stack>
  );
}
