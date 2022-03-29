import {useEffect,useState } from 'react'
import './Table.css';
import { DataGrid } from '@mui/x-data-grid';



const Table = (assets) => {
  const [row, setRow] = useState([]);


  const tempArray = []
  const data = Object.values(assets)

  for (let index = 1; index <= (data[0].length-1); index++) {
    tempArray[index] = data[0][index]
  }
  tempArray.shift()
  console.log(tempArray);



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'assetName', headerName: 'Asset name', width: 130 },
    {field: 'quantity', headerName: 'Quantity', type: 'number', width: 90},
    { field: 'completed', headerName: 'Status', width: 130 },
    ];

  
const rows = tempArray
 

    return(
      <>
        {assets>0 && 
        <>
        <Button classVar='dark' text={'asset'} onClick={(e)=> {asset.map((item)=>{console.log(item)})}}/> 
        <Button classVar='dark' text={'count'} onClick={(e)=> {asset.map((item)=>{console.log(assetCount)})}}/> 
        </>

        }
        <div className='table' style={{ height: 400, width: '100%' }}>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        />
        </div>
      </>


    )
  
  }
  
  
  export default Table