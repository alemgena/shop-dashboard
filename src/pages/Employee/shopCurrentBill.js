import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ro } from "date-fns/locale";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

const Row = ({ row }) => {
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  let data;
  const handleClick = (name) => {
    data = row.filter((item) => item.name === name);
    console.log(data);
    let currentitem = [];
    data.map((item) => {
      currentitem.push(Object.values(item.items));
    });
    setOpen(!open);
    setItems(currentitem);
  };
  console.log(items);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleClick(row[0].name)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row[0].name}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="larg" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell style={{marginRight:"40px"}} align="left">Count</TableCell>
                    <TableCell align="left">Food type</TableCell>
                  </TableRow>
                </TableHead>
                {items.map((item) => (
                  <TableRow>
                    <TableBody>
                      <TableCell>
                        {item.map((data) => (
                          <span>
                            <TableCell align="left">{data.itemName}</TableCell>
                            <TableCell rowSpan={3}>
                              {data.itemCount}
                            </TableCell>
                            <TableCell align="right">{data.foodType}</TableCell>
                          </span>
                        ))}
                      </TableCell>
                    </TableBody>
                  </TableRow>
                ))}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function CollapsibleTable({ bill }) {
  console.log(bill);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {bill.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
