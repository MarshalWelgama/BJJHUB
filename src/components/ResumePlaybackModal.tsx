import { Modal, Box, Typography, Button, Dialog } from "@mui/material";
import React, { FunctionComponent, memo, useEffect } from "react";
import { nowPlaying } from "../types";
import { getLastTimeDb } from "../config/supabaseClient";

type ResumePlaybackModalProps = {
  handleResumePlayback: () => void;
  nowPlaying: nowPlaying;
  getPlyr: () => Plyr;
};
export const ResumePlaybackModal: FunctionComponent<
  ResumePlaybackModalProps
> = ({ handleResumePlayback, nowPlaying, getPlyr }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [lastTime, setLastTime] = React.useState("");
  const handleClose = () => {
    setOpenModal(!openModal);
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleResumeClick = () => {
    handleResumePlayback();
    setOpenModal(false);
  };
  useEffect(() => {
    getLastTimeDb(nowPlaying.name, nowPlaying.subName).then((e) => {
      if (e) {
        setOpenModal(true);
        setLastTime(e);
      }
    });
  }, [nowPlaying.subName]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
    >
      <Box sx={style}>
        <Typography
          variant="h5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {" "}
          Resume playback?
        </Typography>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto auto",
            gridGap: "10px",
            padding: "10px",
          }}
        >
          <Button onClick={handleResumeClick}>
            Continue from {Math.round(Number(lastTime) / 60)}
          </Button>
          <Button onClick={handleClose}>Start from beginning</Button>
        </div>
      </Box>
    </Modal>
  );
};
export default memo(ResumePlaybackModal);
