import Controls from "../../ui/controls/Controls";
import React from "react";
import { Form, useForm } from "../../ui/useForm";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import LiveStockApiRequests from "../../../pages/posts/ranchMangment/request/ranchManagerLiveStock";
//import RanchApiRequests from "../../../pages/posts/ranchMangment/request/requestRanch";
import produce from "immer";
const initialFValues = {
  firstName: "",
  lastName: "",
  sex: "",
  address:" ",
  phoneNo: "",
  location:"",
  quantity:" ",
  username:" ",
  editing: false,

};
const LiveStockSupplierForm = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  setRanchManagers,
}) => {
  
  const [ranchs, setRanchs] = useState([]);

  const { addLiveStock, updateRanch } = LiveStockApiRequests();
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if ("firstName" in fieldValues)
      temp.firstName =
        fieldValues.firstName.length !== 0 ? "" : "This field is required.";
   if ("username" in fieldValues)
      temp.username =
        fieldValues.username.length !== 0 ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName =
        fieldValues.lastName.length !== 0 ? "" : "This field is required.";
   if ("location" in fieldValues)
      temp.location =
        fieldValues.location.length !== 0 ? "" : "This field is required.";

    if ("phoneNo" in fieldValues)
      temp.phoneNo =
        fieldValues.phoneNo.length !== 0 ? "" : "This field is required.";
  if ("quantity" in fieldValues)
      temp.quantity =
        fieldValues.quantity.length !== 0 ? "" : "This field is required.";

    if ("address" in fieldValues)
      temp.address =
        fieldValues.address.length !== 0 ? "" : "This field is required.";
    if (values.editing == true) {
      if ("password" in fieldValues)
        temp.password =
          fieldValues.password.length == 0 || fieldValues.password.length > 7
            ? ""
            : "Password must be atleast 8 characters.";
      if ("username" in fieldValues)
        temp.username =
          fieldValues.username.length != 0 ? "" : "This field is required.";
    }
    if ("ranch" in fieldValues)
      temp.ranch = fieldValues.ranch != null ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setValues({ ...values, submitting: true });
      if (values.editing === false) {
        addLiveStock(values).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false });
            NotifyMessage({
              message: data.err,
              type: "error",
            });
          } else {
            setRanchManagers(
              produce((draft) => {
                draft.unshift({ ...data.resualt });
              })
            );
            NotifyMessage({
              message: "LiveStock Supplier created.",
              type: "success",
            });
            setOpenPopup(false);
            resetForm();
          }
        });
      } else {
        updateRanch(values, recordForEdit.name).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false });
            NotifyMessage({
              message: data.err,
              type: "error",
            });
          } else {
            console.log(data);
            NotifyMessage({
              message: "Ranch updated.",
              type: "success",
            });
            setOpenPopup(false);
            resetForm();
            setRanchManagers(
              produce((draft) => {
                const index = draft.findIndex(
                  (ranch) => ranch.name === recordForEdit.name
                );
                if (index !== -1) draft[index] = data.updatedResult;
              })
            );
          }
        });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Controls.Input
            fullWidth
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Phone Number"
            name="phoneNo"
            value={values.phoneNo}
            onChange={handleInputChange}
            error={errors.phoneNo}
          />
        </Grid>
           <Grid item xs={12} md={6}>
          <Controls.Input
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
              <Grid item xs={12} md={6}>
          <Controls.Input
            label="UserName"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            error={errors.username}
          />
        </Grid>
         <Grid item xs={12} md={6}>
          <Controls.Input
            label="Location"
            name="location"
            value={values.location}
            onChange={handleInputChange}
            error={errors.location}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            color="primary"
            variant="outlined"
            disabled={values.submitting ? true : false}
            text={
              values.editing === true
                ? values.submitting
                  ? "Editing..."
                  : "Edit"
                : values.submitting
                ? "Adding..."
                : "Add"
            }
            className="Button"
            type="submit"
          />
        </Grid>
      </Grid>
    </Form>
  );
};
export default LiveStockSupplierForm;
