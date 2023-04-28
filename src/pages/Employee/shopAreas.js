import React, { useEffect, useState } from "react";
import axios from "axios";
import useTable from "../../components/ui/useTable";
import { url } from "../../utiles/config";
import { TableCell, TableBody, TableRow } from "@mui/material";
import Norecords from "../../components/ui/Norecords";
import Popup from "../../components/ui/Popup";
import CurrentBill from './shopCurrentBill'
const Employee = ({shopID, data,area,setShowArea }) => {
  const headCells = [
    { id: "emp_name", label: "Table Number" },
  ];
  //`${Url}/api/auth/forgot-password?email=${email}`
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const[orders,setOrders]=useState([]);
  const[showBill,setShoBill]=useState(false)
  const [tables, setTables] = useState([]);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(data, headCells, filterFn);
    const handleClick=(table)=>{
   console.log(shopID, area,table)
   axios.get(`${url}api/get/currentBill?shop_id=${shopID}&areaNr=${area}&tableNumber=${table}`).then((response)=>{
    let currentBill=[]
    if(response.data){
      
    Object.values(response.data).map((item)=>(
      currentBill.push(Object.values(item))
      ))
setOrders(currentBill)
      setShoBill(true)
    }

   })
  
    }
  return (
    <div>
      <>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().length > 0 ? (
              recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow onClick={() => handleClick(item.tableNumber)} key={index}>
                  <TableCell>{item.tableNumber}</TableCell>
                </TableRow>
              ))
            ) : (
              <Norecords col={5} />
            )}
          </TableBody>
        </TblContainer>
        <TblPagination />
  <Popup
  title="Bill Detail"
  openPopup={showBill}
  setOpenPopup={setShoBill}
>
  <CurrentBill bill={orders}/>
</Popup>
      </>
    </div>
  );
};
export default Employee;
