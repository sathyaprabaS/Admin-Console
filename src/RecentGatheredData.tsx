import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import axios from 'axios';
import { IAdminItem } from './interface/types';

function RecentGatheredData() {
  const [data, setData] = useState<IAdminItem[]>([]); // Corrected to array of IAdminItem
  const [currentDate, setCurrentDate] = useState<string>('');


  useEffect(() => {
    fetchData();
    setCurrentDate(new Date().toLocaleDateString()); // Set current date

  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/getAllAdmin');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Calculate counts and totals based on condition
  const countNew = data.filter(item => item.condition === 'new').length;
  const totalNew = data.reduce((acc, item) => {
    return item.condition === 'new' ? acc + parseInt(item.price) : acc;
  }, 0);

  const countUsed = data.filter(item => item.condition === 'used').length;
  const totalUsed = data.reduce((acc, item) => {
    return item.condition === 'used' ? acc + parseInt(item.price) : acc;
  }, 0);

  const countCPO = data.filter(item => item.condition === 'cpo').length;
  const totalCPO = data.reduce((acc, item) => {
    return item.condition === 'cpo' ? acc + parseInt(item.price) : acc;
  }, 0);

  // Calculate averages
  const averageNew = countNew > 0 ? (totalNew / countNew).toFixed(2) : 0;
  const averageUsed = countUsed > 0 ? (totalUsed / countUsed).toFixed(2) : 0;
  // const averageCPO = countCPO > 0 ? (totalCPO / countCPO).toFixed(2) : 0;

  // Common style object for Box components
  const boxStyle = {
    backgroundColor: 'white',
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <div style={{ padding: '16px' }}>
      <Box display="flex"alignItems="center" marginBottom="16px">
      <Typography variant="h6" gutterBottom>
          Recent Gathered Data
        </Typography>
        <Typography  sx={{marginLeft:"20px"}} variant="subtitle1" color="textSecondary">
          {currentDate}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {/* Box 1: Count of items with condition 'new' */}
        <Grid item xs={12} sm={6} md={1.5}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              {countNew}
            </Typography>
            <Typography style={{ color: 'orange' }}>New</Typography>
          </Box>
        </Grid>

        {/* Box 2: Total amount of items with condition 'new' */}
        <Grid item xs={12} sm={6} md={1.5}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              ${totalNew}
            </Typography>
            <Typography style={{ color: 'orange' }}>Total New</Typography>
          </Box>
        </Grid>

        {/* Box 3: Average price of items with condition 'new' */}
        <Grid item xs={12} sm={6} md={1.5}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              ${averageNew}
            </Typography>
            <Typography style={{ color: 'orange' }}>Average New</Typography>
          </Box>
        </Grid>

        {/* Box 4: Count of items with condition 'used' */}
        <Grid item xs={12} sm={6} md={1.5}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              {countUsed}
            </Typography>
            <Typography style={{ color: 'orange' }}>Used</Typography>
          </Box>
        </Grid>

        {/* Box 5: Total amount of items with condition 'used' */}
        <Grid item xs={12} sm={6} md={1.5}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              ${totalUsed}
            </Typography>
            <Typography style={{ color: 'orange' }}>Total Used</Typography>
          </Box>
        </Grid>

        {/* Box 6: Average price of items with condition 'used' */}
        <Grid item xs={12} sm={6} md={1.5}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              ${averageUsed}
            </Typography>
            <Typography style={{ color: 'orange' }}>Average Used</Typography>
          </Box>
        </Grid>

        {/* Box 7: Count of items with condition 'cpo' */}
        <Grid item xs={12} sm={6} md={1.5}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              {countCPO}
            </Typography>
            <Typography style={{ color: 'orange' }}>CPO</Typography>
          </Box>
        </Grid>

        {/* Box 8: Total amount of items with condition 'cpo' */}
        <Grid item xs={12} sm={6} md={1.5}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              ${totalCPO}
            </Typography>
            <Typography style={{ color: 'orange' }}>Total CPO</Typography>
          </Box>
        </Grid>

        {/* Box 9: Average price of items with condition 'cpo' */}
        {/* <Grid item xs={12} sm={6} md={2}>
          <Box sx={boxStyle}>
            <Typography style={{ color: 'black', fontWeight: 'bold' }}>
              ${averageCPO}
            </Typography>
            <Typography style={{ color: 'orange' }}>Average CPO</Typography>
          </Box>
        </Grid> */}

      </Grid>
    </div>
  );
}

export default RecentGatheredData;
