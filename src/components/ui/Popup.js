import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: "0px",
    position: "absolute",
    width:500,
    top: useTheme().spacing(1),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  closeButton: {
    position: "absolute",
    right: useTheme().spacing(1),
    top: useTheme().spacing(1),
    color: useTheme().palette.grey[500],
  },
}));

export default function Popup(props) {
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    maxWidth = "md",
       minWidth = "md",
    scroll = "paper",
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      minWidth={minWidth}
      onClose={() => setOpenPopup(false)}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
