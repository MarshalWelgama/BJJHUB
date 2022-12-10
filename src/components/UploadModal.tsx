import React, { useCallback, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box component="span" {...getRootProps()}>
      <input {...getInputProps()} />

      <Button variant="contained">Select files to upload</Button>
    </Box>
  );
}

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
  const onTextChange = (e: any) => setTextValue(e.target.value);
  const handleSubmit = () => console.log(textValue);
  const handleReset = () => setTextValue("");
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
          <Typography> UPLOAD FILES</Typography>
          <Typography> Category Name </Typography>
          <TextField onChange={onTextChange} value={textValue} />
          <MyDropzone />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Do you want to rename files?"
          />
          <TextField onChange={onTextChange} value={textValue} />

          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </Fade>
    </Modal>
  );
};
