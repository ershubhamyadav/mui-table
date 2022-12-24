import React from "react";
import { Box, Typography, Modal } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

export default function CustomModal({ title = "", open, setOpen, Children }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="flex-end">
            <CloseIcon onClick={handleClose} />
          </Box>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "15px"
            }}
            id="modal-modal-title"
            variant="h6"
            component="h3"
          >
            {title}
          </Typography>
          {Children}
        </Box>
      </Modal>
    </div>
  );
}
