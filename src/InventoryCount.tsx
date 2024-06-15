import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function InventoryCount() {
  // Sample data for the chart
  const [chartData, setChartData] = useState([
    { date: '2023-01-01', count: 150 },
    { date: '2023-01-02', count: 200 },
    { date: '2023-01-03', count: 180 },
    { date: '2023-01-04', count: 210 },
    { date: '2023-01-05', count: 190 },
  ]);

  // Function to handle button clicks and change data
  const handleButtonClick = (type:any) => {
    switch (type) {
      case 'new':
        setChartData([
          { date: '2023-01-01', count: 150 },
          { date: '2023-01-02', count: 200 },
          { date: '2023-01-03', count: 180 },
          { date: '2023-01-04', count: 210 },
          { date: '2023-01-05', count: 190 },
        ]);
        break;
      case 'usd':
        setChartData([
          { date: '2023-01-01', count: 120 },
          { date: '2023-01-02', count: 180 },
          { date: '2023-01-03', count: 170 },
          { date: '2023-01-04', count: 200 },
          { date: '2023-01-05', count: 160 },
        ]);
        break;
      case 'ceo':
        setChartData([
          { date: '2023-01-01', count: 200 },
          { date: '2023-01-02', count: 250 },
          { date: '2023-01-03', count: 230 },
          { date: '2023-01-04', count: 270 },
          { date: '2023-01-05', count: 240 },
        ]);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ padding: '16px', }}>
        <Box sx={{display:"flex"}}>
      <Typography variant="h6" gutterBottom>
        Inventory Count
      </Typography>
      <div style={{ marginBottom: '20px', marginLeft:"10px" }}>
        <Button onClick={() => handleButtonClick('new')} variant="contained" color="primary" style={{ marginRight: '10px' }}>
          New
        </Button>
        <Button onClick={() => handleButtonClick('usd')} variant="contained" color="primary" style={{ marginRight: '10px' }}>
          USD
        </Button>
        <Button onClick={() => handleButtonClick('ceo')} variant="contained" color="primary">
          CEO
        </Button>
      </div>
      </Box>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default InventoryCount;
