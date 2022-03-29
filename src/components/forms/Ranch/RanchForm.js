import Controls from "../../ui/controls/Controls";
import { Form, useForm } from "../../ui/useForm";
import { Grid } from "@mui/material";
import React from "react"; 
import { useEffect } from "react";
import RanchApiRequests from "../../../pages/posts/ranchMangment/request/requestRanch";
import produce from "immer";
const initialFValues = {
  name: "",
  area: "",
  location: "",
  distance: "",
  type:"",
  editing: false,
};
const RanchForm = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  setRanchs,
}) => {
  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit]);
  const typeee = [
  { type: 'Main Ranch'},
  { type: 'Remote Ranch' },
  ]
  const { addRanch, updateRanch } = RanchApiRequests();
  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ("name" in fieldValues)
      temp.name =
        fieldValues.name.length !== 0 ? "" : "This field is required.";

    if ("location" in fieldValues)
      temp.location =
        fieldValues.location.length !== 0 ? "" : "This field is required.";
    if ("distance" in fieldValues)
      temp.distance =
        fieldValues.distance.length !== 0 ? "" : "This field is required.";
    if ("area" in fieldValues)
      temp.area =
        fieldValues.area.length !== 0 ? "" : "This field is required.";

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
        console.log(values)
        
        addRanch(values).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false });
            NotifyMessage({
              message: data.err,
              type: "error",
            });
          } else {
            setRanchs(
              produce((draft) => {
                draft.unshift({ ...data.ranch });
              })
            );
            NotifyMessage({
              message: "Ranch created.",
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
            setRanchs(
              produce((draft) => {
                const index = draft.findIndex(
                  (ranch) => ranch.name === recordForEdit.name
                );
                console.log(index);
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
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
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
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Distance"
            name="distance"
            value={values.distance}
            onChange={handleInputChange}
            error={errors.distance}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Area"
            name="area"
            value={values.area}
            onChange={handleInputChange}
            error={errors.area}
          />

        </Grid>
          <Grid item xs={12} md={6}>
          <Controls.AutoCompletRanch
            values={values}
            setChange={setValues}
            options={typeee}
            label="Type"
            error={errors.ranch}
          />
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
              ? "Adding..."
              : "Add"
          }
          className="Button"
          type="submit"
        />
      </Grid>
    </Form>
  );
};
export default RanchForm;
