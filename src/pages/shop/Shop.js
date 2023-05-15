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
import ShopForm from "../../components/forms/ShopForm";
import produce from "immer";
import PageSpinner from "../../components/ui/PageSpinner";
import PaidIcon from "@mui/icons-material/Paid";
import OftadehLayout from "../../components/Layout/Layout";
import OftadehBreadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { makeStyles, TextField } from "@material-ui/core";
import ShopApiRequests from "../../components/request/shop";
import BlockIcon from "@mui/icons-material/Block";
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
  const currenDate = new Date();
  const futureDate = new Date(currenDate);
  futureDate.setMonth(currenDate.getMonth() + 3);
  const headCells = [
    { id: "shopName", label: "Shop Name" },
    { id: "shopAddress", label: "Shop Address" },
    { id: "owner", label: "Owner" },
    { id: "email", label: "Email" },
    { id: "telephone", label: "Telephone" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [Q, setQ] = useState("");
  const [loading, setLoding] = React.useState(false);
  const [shops, setShops] = React.useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const { history } = props;
  const { viewShops } = ShopApiRequests();
  const classes = useStyles();
  React.useEffect(() => {
    setLoding(true);
    viewShops().then((data) => {
      setLoding(false);
      setShops(data.data);
    });
  }, []);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(shops, headCells, filterFn);
  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = ["shopName", "shopAddress"];
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
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };
  const [shopName, setShopName] = useState();
  const [shopId, setShopId] = useState();
  const [shopEmail, setShopEmail] = useState();
  const handleClick = (name, shopId, shopEmail) => {
    setShopName(name);
    setOpenPopup(true);
    setShopId(shopId);
    setShopEmail(shopEmail);
  };
  return (
    <div>
      <OftadehLayout>
        <Typography className={classes.mb3} variant="h5" component="h1">
          Shop Mangement
        </Typography>
        <OftadehBreadcrumbs path={history} />
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Controls.Input
                label="Search Shop"
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
                      <TableCell>{item.shopName}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>
                        {item.isDisabled ? (
                          <Controls.ActionButton
                            color="secondary"
                            title="Disable"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to Enable this Shop?",
                                subTitle: "You can't undo this operation",
                                onConfirm: () => {
                                  onDelete(item.email);
                                },
                              });
                            }}
                          >
                            <BlockIcon fontSize="medium" />
                          </Controls.ActionButton>
                        ) : (
                          <Controls.ActionButton
                            color="secondary"
                            title="Enable"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to Disable this Shop?",
                                onConfirm: () => {
                                  onDelete(item.email);
                                },
                              });
                            }}
                          >
                            <BlockIcon fontSize="medium" />
                          </Controls.ActionButton>
                        )}
                        <Controls.ActionButton
                          color="secondary"
                          title="Pay"
                          onClick={() => {
                            handleClick(item.shopName, item.shopID,item.email?item.email:'');
                          }}
                        >
                          <PaidIcon fontSize="medium" />
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
        <Notification notify={notify}  setNotify={setNotify} />
        <Popup
          title={`Are you sure you want to renew ${
            shopName ? shopName : null
          } period until Date`}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <ShopForm  setOpenPopup={setOpenPopup} shopName={shopName}  shopEmail={shopEmail} shopID={shopId} />
        </Popup>
      </OftadehLayout>
    </div>
  );
}
