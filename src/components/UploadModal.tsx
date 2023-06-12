import React, { useCallback, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDropzone } from "react-dropzone";
import { Button, FormGroup, TextField } from "@mui/material";
import { createFolder, getContent, postData } from "../uploader/gofile";
import { BasicMenu } from "./basicMenu";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type ModalProps = {
  openModal: boolean;
  handleClose: () => void;
};

export const UploadModal: React.FunctionComponent<ModalProps> = ({
  openModal,
  handleClose,
}) => {
  const [textValue, setTextValue] = useState<string>("");
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<File>();
  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles: any) => {
      setFileUpload(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
      <Box component="span" {...getRootProps()}>
        <input {...getInputProps()} />
        <Button variant="contained">Select file to upload</Button>
      </Box>
    );
  }

  const onTextChange = (e: any) => setTextValue(e.target.value);
  const handleSubmit = async () => {
    const folderId =
      selectedFolder || (textValue && (await createFolder(textValue)));
    if (fileUpload) {
      postData(fileUpload, folderId);
    }
    handleClose();
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box sx={style}>
          <FormGroup></FormGroup>
          <Typography
            variant="h5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {" "}
            UPLOAD FILES
          </Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridGap: "20px",
              padding: "20px",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              Instructional Name{" "}
            </Typography>

            <div>
              <TextField
                sx={{
                  fieldset: { borderColor: "#757676" },
                }}
                color="secondary"
                onChange={onTextChange}
                value={textValue}
              />
            </div>

            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              File
            </Typography>
            <MyDropzone />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleSubmit}>Submit</Button>
            <BasicMenu
              setInputValue={setTextValue}
              setSelectedFolder={setSelectedFolder}
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
