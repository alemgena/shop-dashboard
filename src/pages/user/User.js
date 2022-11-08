import React from "react";
import Norecords from "../../components/ui/Norecords";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Grid, InputAdornment, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useTable from "../../components/ui/useTable";
import Notification from "../../components/ui/Notification";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Notify from "../../components/ui/Notify";
import Popup from "../../components/ui/Popup";
import Controls from "../../components/ui/controls/Controls";
import { Search, Add } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import produce from "immer";
import PageSpinner from "../../components/ui/PageSpinner";
//import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
import OftadehLayout from "../../components/Layout/Layout";
import OftadehBreadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { makeStyles, TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import UserApiRequests from "../../components/request/user";
import { url } from "../../utiles/config";
import axios from "axios";
const useStyles = makeStyles((them) => ({
  card: {
    width: 250,
    height: 200,

    backgroundColor: "green",
  },
  cardContent: {
    fontSize: 50,
    backgroundColor: "green",
    height: 250,
    color: "white",
  },
}));

export default function Dashboard(props) {
  const headCells = [
    { id: "email", label: "Email" },
    { id: "username", label: "User Name" },
    { id: "role", label: "Role" },
    { id: "enable", label: "Enable", disableSorting: true },
    { id: "actions", label: "Actions", disableSorting: true },
  ];
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [Q, setQ] = useState("");
  const [loading, setLoding] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const { history } = props;
  const { viewUsers, deletUser } = UserApiRequests();
  const classes = useStyles();
  React.useEffect(() => {
    setLoding(true)
    viewUsers().then((data) => {
      console.log(data);
      setLoding(false)
      setUsers(data);
    });
  }, []);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(users, headCells, filterFn);
  console.log(users);

  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = ["email", "username", "role"];

        if (Q === "") return items;
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              if (x[column]) {
                return x[column].toString().toLowerCase().includes(Q);
              }
            });
          });
        }
      },
    });
  }, [Q]);
  const { NotifyMessage, notify, setNotify } = Notify();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const onDelete = (email) => {
    console.log(email);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deletUser(email).then((data) => {
      console.log(data);
      if (data.message === "Error: Unregistered user!") {
        NotifyMessage({
          message: data.message,
          type: "error",
        });
      } else {
        NotifyMessage({
          message: data.message,
          type: "success",
        });
        setUsers(
          produce(users, (draft) => {
            const index = users.findIndex((user) => user.email === email);
            if (index !== -1) draft.splice(index, 1);
          })
        );
      }
    });
  };
  return (
    <div>
      <OftadehLayout>
        <Typography className={classes.mb3} variant="h5" component="h1">
          User Mangement
        </Typography>
        <OftadehBreadcrumbs path={history} />
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Controls.Input
                label="Search User"
                fullWidth
                value={Q}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setQ(e.target.value.trimLeft().toLowerCase());
                }}
              />
            </Grid>
          </Grid>
        </Toolbar>
        {loading ? (
          <PageSpinner />
        ) : (
          <>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().length > 0 ? (
                  recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.username}</TableCell>
                      {item.roles.map((items) => (
                        <TableCell>{items.name}</TableCell>
                      ))}

                      <TableCell>{item.enabled ? "True" : "False"}</TableCell>

                      <TableCell>
                        <Controls.ActionButton
                          color="secondary"
                          title="Delete"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "Are you sure to delete this User?",
                              subTitle: "You can't undo this operation",
                              onConfirm: () => {
                                onDelete(item.email);
                              },
                            });
                          }}
                        >
                          <DeleteOutlineIcon fontSize="medium" />
                        </Controls.ActionButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Norecords col={5} />
                )}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </>
        )}
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <Notification notify={notify} setNotify={setNotify} />
      </OftadehLayout>
    </div>
  );
}
