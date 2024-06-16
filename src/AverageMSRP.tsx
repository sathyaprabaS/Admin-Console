import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function AverageMSRP({filteredDatas}) {

    const [chartData, setChartData] = useState([]);
    const [activeButton, setActiveButton] = useState('new');
  
    const fetchData = async (type) => {
      try {
        let params = {};
        switch (type) {
          case 'new':
            params = { condition: 'new' };
            break;
          case 'used':
            params = { condition: 'used' };
            break;
          case 'cpo':
            params = { condition: 'cpo' };
            break;
          default:
            break;
        }
  
        const response = await axios.get('http://localhost:3000/admin/getFilterByAverageMSRP', { params });
        const data = response.data;
  
        const transformedData = data.map((item) => ({
          date: item.Date,
          averagePrice: item.averagePrice,
        }));
  
        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData('new');
    }, []);
  
    useEffect(() => {
      if (filteredDatas.length > 0) {
        const transformedData = filteredDatas.map((item) => ({
          date: item.Date,
          averagePrice: item.averagePrice,
        }));
        setChartData(transformedData);
      }
    }, [filteredDatas]);
  
    const handleButtonClick = (type) => {
      setActiveButton(type);
      fetchData(type);
    };
  
  return (
    <div style={{ padding: '16px' }}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" gutterBottom>
          Average MSRP
        </Typography>
        <div style={{ marginBottom: '20px', marginLeft: "10px" }}>
          <Button 
            onClick={() => handleButtonClick('new')} 
            variant={activeButton === 'new' ? 'contained' : 'outlined'} 
            color="warning" 
            sx={{ 
              marginRight: '10px', 
              backgroundColor: activeButton === 'new' ? '#ff9800' : 'white',
            }}
          >
            New
          </Button>
          <Button 
            onClick={() => handleButtonClick('used')} 
            variant={activeButton === 'used' ? 'contained' : 'outlined'} 
            color="warning" 
            style={{ marginRight: '10px',backgroundColor: activeButton === 'used' ? '#ff9800' : 'white',
            }}
          >
            Used
          </Button>
          <Button 
            onClick={() => handleButtonClick('cpo')} 
            variant={activeButton === 'cpo' ? 'contained' : 'outlined'} 
            color="warning"
            style={{ marginRight: '10px', backgroundColor: activeButton === 'cpo' ? '#ff9800' : 'white',
            }}

          >
            CpO
          </Button>
        </div>
      </Box>
      <div style={{ width: '100%', height: 300, backgroundColor:"white" }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="averagePrice" fill="#ff9800" /> {/* Orange color */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>  )
}

export default AverageMSRP