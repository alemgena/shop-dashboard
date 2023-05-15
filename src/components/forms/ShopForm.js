import Controls from "../ui/controls/Controls";
import { Form, useForm } from "../ui/useForm";
import { Autocomplete, Grid, TextField } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
const currentDate = dayjs().add(4, "month").format("DD/MM/YYYY");
const RanchForm = ({ setOpenPopup, shopName, shopEmail, shopID }) => {
  const validate = () => {};
  const priceLables = [
    { label: 1, price: 1000 },
    { label: 2, price: 2000 },
    { label: 3, price: 3000 },
  ];
  const [submit, setSubmit] = useState(false);
  const [currenStopDate, setCuurentStopDate] = useState("");
  const [name, setShopName] = useState(shopName ? shopName : "");
  const [email, setEmail] = useState(shopEmail ? shopEmail : "");

  useEffect(() => {
    const fetchShop = async () => {
      console.log("shopId", shopID);
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/shops/${shopID}`
        );
        if (data.data === null) {
          setCuurentStopDate(currentDate);
        } else {
          console.log("response", data);
          setCuurentStopDate(
            dayjs(data.data.currentStopDate)
              .add(4, "month")
              .format("DD/MM/YYYY")
          );
        }
      } catch (error) {}
    };
    fetchShop();
  }, [shopID]);
  const [totalPaid, setTotalPaid] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const { data } = await axios.post(`http://localhost:4000/api/shops`, {
        shopId: shopID,
        email: email,
        shopName: shopEmail,
        currentStopDate: currenStopDate,
        totalPaid: totalPaid,
      });
      if (data) {
        setOpenPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlPriceChange = (event) => {
    console.log(event);
    setTotalPaid(event.price);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            value={totalPaid}
            id="combo-box-demo"
            options={priceLables}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              handlPriceChange(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Lable" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Start Date"
            name="expriteDate"
            value={currenStopDate}
            onChange={(e) => setCuurentStopDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Shop Name"
            name="shopName"
            value={name}
            onChange={(e) => setShopName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Shop Email"
            name="shopEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <Grid item xs={12}>
        <Controls.Button
          color="primary"
          variant="outlined"
          disabled={submit}
          text={submit ? "Paying..." : "Pay"}
          className="Button"
          type="submit"
        />
      </Grid>
    </Form>
  );
};
export default RanchForm;
