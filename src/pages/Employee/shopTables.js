import React, { useEffect, useState } from "react";
import axios from "axios";
import useTable from "../../components/ui/useTable";
import { url } from "../../utiles/config";
import { TableCell, TableBody, TableRow,IconButton } from "@mui/material";
import Norecords from "../../components/ui/Norecords";
import ShopArea from './shopAreas'
import Popup from "../../components/ui/Popup";
const Employee = ({shopID, data,items }) => {
  const headCells = [
    { id: "emp_name", label: "Area_No" },
  ];
  //`${Url}/api/auth/forgot-password?email=${email}`
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [tables, setTables] = useState([]);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(data, headCells, filterFn);
    const[showArea,setShowArea]=useState(false)
    const [currentTable,setCurrentTable]=useState()
    const handleClick=(table)=>{
        setCurrentTable(table)
        setShowArea(true)
setTables(items.filter(item => item.areaNr===table))
    }
  return (
    <div>
      <>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().length > 0 ? (
              recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow onClick={() => handleClick(item)} key={index}>
                  <TableCell>{item}</TableCell>
                </TableRow>
              ))
            ) : (
              <Norecords col={5} />
            )}
          </TableBody>
        </TblContainer>
        <TblPagination />
        <Popup
        title="Table Number"
        openPopup={showArea}
        setOpenPopup={setShowArea}
      >
        <ShopArea
 setShowArea={setShowArea}  shopID={shopID}  data={tables} area={currentTable}
        />
      </Popup>
      </>
    </div>
  );
};
export default Employee;
