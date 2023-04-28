import React, { useEffect, useState } from "react";
import axios from "axios";
import useTable from "../../components/ui/useTable";
import { url } from "../../utiles/config";
import { TableCell, TableBody, TableRow } from "@mui/material";
import Norecords from "../../components/ui/Norecords";
import ShopTables from './shopTables'
const Employee = ({ shopID }) => {
  const headCells = [
    { id: "emp_name", label: "Emp_Name" },
    { id: "level", label: "Level" },
    { id: "salary", label: "Salary" },
  ];
  //`${Url}/api/auth/forgot-password?email=${email}`
  const[shopTables,setShopTables]=useState([])
  const [employee, setEmployee] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [tables, setTables] = useState([]);
  useEffect(() => {
    axios.get(`${url}api/get/employee?shop_id=${shopID}`).then((response) => {
      const propertyValues = Object.values(response.data);
      setEmployee(propertyValues);
    });
    axios
      .get(`${url}api/get/table?shop_id=-N-X0XazBzoYLp7F5FF0`)
      .then((response) => {
        if(response.data){
        console.log(response)
        let tableItems=[]
        let ddd=[]
        response.data.map((items) => {
       items.map((item)=>{
        if(item!==null)
        tableItems.push(item)
       })
        for(let  i=0;i<items.length;i++){
          if(items[i]!==null){
         ddd.push(items[i].areaNr)
          }
        }
      });
      setShopTables([...new Set(ddd)])
      setTables(tableItems)
    }
    })
  }, [shopID]);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(employee, headCells, filterFn);
  return (
    <div>
      <>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().length > 0 ? (
              recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.emp_name}</TableCell>
                  <TableCell>{item.level}</TableCell>
                  <TableCell>{item.salary}</TableCell>
                </TableRow>
              ))
            ) : (
              <Norecords col={5} />
            )}
          </TableBody>
        </TblContainer>
        <TblPagination />
        <ShopTables shopID={shopID} data={shopTables} items={tables}/>
      </>
    </div>
  );
};
export default Employee;
