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
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function() {
        var base64data = reader.result;
        arrayOfPhotoUrls.push(base64data.substr(base64data.indexOf(",") + 1));
      };
      arrayOfPhotoTypes.push(files[i].name);
    }
    props.photos(arrayOfPhotoUrls, arrayOfPhotoTypes);
  }, [files]);

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
        allowMultiple={false}
      >
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    </Stack>
  );
}
