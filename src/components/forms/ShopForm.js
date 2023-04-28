
import Controls from "../ui/controls/Controls";
import { Form, useForm } from "../ui/useForm";
import { Autocomplete, Grid, TextField } from "@mui/material";
import React from "react"; 
import { useEffect } from "react";
const currentDate = new Date().toLocaleDateString();
console.log()

const RanchForm = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  shopName,
  setRanchs,
}) => {
  const initialFValues = {
    totalPaid: "",
    shopName:shopName,
    expriteDate:currentDate,
    label:'',
  lastPaidDate:"",
  };
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("expriteDate" in fieldValues)
      temp.expriteDate =
        fieldValues.expriteDate.length !== 0 ? "" : "This field is required.";
        if ("label" in fieldValues)
        temp.label =
          fieldValues.label.length !== 0 ? "" : "This field is required.";
    if ("lastPaidDate" in fieldValues)
      temp.lastPaidDate =
        fieldValues.lastPaidDate.length !== 0 ? "" : "This field is required.";
    if ("totalPaid" in fieldValues)
      temp.totalPaid =
        fieldValues.totalPaid>0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const priceLables = [
    { label: 1, price: 1000 },
    { label: 2, price: 2000 },
    { label: 3, price: 3000 }]
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
    useEffect(() => {
      values.expriteDate=currentDate
      values.shopName=shopName
      console.log(values.shopName)
        },[shopName])
  const handleSubmit = (e) => {
    e.preventDefault();
console.log(values)
    if (validate()) {
      setValues({ ...values, submitting: true });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <Autocomplete
    id="combo-box-demo"
    options={priceLables}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
      <TextField {...params} label="Lable" />
    )}
    />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Start Date"
            name="expriteDate"
            defaultValue={currentDate}
            value={values.expriteDate}
            onChange={handleInputChange}
            error={errors.expriteDate}
          />

        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Shop Name"
            name="shopName"
            value={values.shopName}
            onChange={handleInputChange}
            error={errors.shopName}
          />

        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>
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
              ? "Paying..."
              : "Pay"
          }
          className="Button"
          type="submit"
        />
      </Grid>
    </Form>
  );
};
export default RanchForm;
