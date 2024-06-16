import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination, Typography } from '@mui/material';
import axios from 'axios';

interface ProductData {
  date: string;
  newCount: number;
  newTotalPrice: string;
  newAveragePrice: string;
  usedCount: number;
  usedTotalPrice: string;
  usedAveragePrice: string;
  cpoCount: number;
  cpoTotalPrice: string;
  cpoAveragePrice: string;

}

function HistoryLog() {
  // Sample data for the table
  const [rows, setRows] = useState<ProductData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {

    axios.get('http://localhost:3000/admin/getAllHistory')
      .then(response => setRows(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const cellStyle = {
    textAlign: 'center' 
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        History Log
      </Typography>
      <TableContainer sx={{backgroundColor:"white"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Date</TableCell>
              <TableCell sx={cellStyle}>New Count</TableCell>
              <TableCell sx={cellStyle}>New Total Price</TableCell>
              <TableCell sx={cellStyle}>New Average Price</TableCell>
              <TableCell sx={cellStyle}>Used Count</TableCell>
              <TableCell sx={cellStyle}>Used Total Price</TableCell>
              <TableCell sx={cellStyle}>Used Average Price</TableCell>
              <TableCell sx={cellStyle}>cpo Count</TableCell>
              <TableCell sx={cellStyle}>cpo Total Price</TableCell>
              <TableCell sx={cellStyle}>cpo Average Price</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={cellStyle}>{row.date}</TableCell>
                <TableCell sx={cellStyle}>{row.newCount}</TableCell>
                <TableCell sx={cellStyle}>{row.newTotalPrice}</TableCell>
                <TableCell sx={cellStyle}>{row.newAveragePrice}</TableCell>
                <TableCell sx={cellStyle}>{row.usedCount}</TableCell>
                <TableCell sx={cellStyle}>{row.usedTotalPrice}</TableCell>
                <TableCell sx={cellStyle}>{row.usedAveragePrice}</TableCell>
                <TableCell sx={cellStyle}>{row.cpoCount}</TableCell>
                <TableCell sx={cellStyle}>{row.cpoTotalPrice}</TableCell>
                <TableCell sx={cellStyle}>{row.cpoAveragePrice}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>

  );
}

export default HistoryLog;
