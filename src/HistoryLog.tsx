import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination, Typography } from '@mui/material';

interface Row {
  id: number;
  date: string;
  action: string;
}

function HistoryLog() {
  // Sample data for the table
  const [rows, setRows] = useState<Row[]>([
    { id: 1, date: '2023-01-01', action: 'Login' },
    { id: 2, date: '2023-01-02', action: 'Logout' },
    { id: 3, date: '2023-01-03', action: 'Viewed dashboard' },
    { id: 4, date: '2023-01-04', action: 'Updated profile' },
    { id: 5, date: '2023-01-05', action: 'Logged out' },
    { id: 6, date: '2023-01-06', action: 'Deleted item' },
    { id: 7, date: '2023-01-07', action: 'Viewed report' },
    { id: 8, date: '2023-01-08', action: 'Added new record' },
    { id: 9, date: '2023-01-09', action: 'Logged in' },
    { id: 10, date: '2023-01-10', action: 'Logged out' },
  ]);

  // Pagination control
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        History Log
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.action}</TableCell>
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
