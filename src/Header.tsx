import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, IconButton, Drawer, Box, Checkbox, FormControlLabel, FormGroup, Typography, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


type HeaderProps = {
  onFilterApplyMSRP: (data: any) => void; // Adjust 'any' to the actual data type if possible
  onFilterApplyInventory: (data: any) => void; // Adjust 'any' to the actual data type if possible
};


const Header: React.FC<HeaderProps> = ({
  onFilterApplyMSRP,
  onFilterApplyInventory,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [make, setMake] = useState({
    SUV: false,
    Truck: false,
    Other: false,
  });

  const [duration, setDuration] = useState({
    LastMonth: false,
    ThisMonth: false,
    Last3Months: false,
    Last6Months: false,
    ThisYear: false,
    LastYear: false,
  });

  const handleMakeChange = (event) => {
    setMake({
      ...make,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDurationChange = (event) => {
    setDuration({
      ...duration,
      [event.target.name]: event.target.checked,
    });
  };

  const applyFilter = async () => {
    const selectedMakes = Object.keys(make).filter((key) => make[key]);
    const selectedDurations = Object.keys(duration).filter((key) => duration[key]);

    try {
      const queryParams = new URLSearchParams({
        product_type: selectedMakes.join(','),
        Date: selectedDurations.join(','),
      });
      const inventoryResponse = await fetch(`http://localhost:3000/admin/getFilterByInventoryCount?${queryParams.toString()}`);
      if (!inventoryResponse.ok) {
        throw new Error('Failed to fetch inventory data');
      }
      const inventoryData = await inventoryResponse.json();
      onFilterApplyInventory(inventoryData); 
      console.log("onFilterApplyInventory",onFilterApplyInventory)

      const msrpResponse = await fetch(`http://localhost:3000/admin/getFilterByAverageMSRP?${queryParams.toString()}`);
      if (!msrpResponse.ok) {
        throw new Error('Failed to fetch MSRP data');
      }
      const msrpData = await msrpResponse.json();
      onFilterApplyMSRP(msrpData); // Pass the data to the parent component
      console.log("onFilterApplyMSRP",onFilterApplyMSRP)
      setDrawerOpen(false);
      removeAllFilters();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  const removeAllFilters = () => {
    setMake({
      SUV: false,
      Truck: false,
      Other: false,
    });
    setDuration({
      LastMonth: false,
      ThisMonth: false,
      Last3Months: false,
      Last6Months: false,
      ThisYear: false,
      LastYear: false,
    });
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
    if (!open) {
      removeAllFilters();
    }

  };

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'gray' }}>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'left' }}>
            Inventory
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" style={{ textAlign: 'center', flexGrow: 1 }}>
              Filter Data By
            </Typography>
            {/* <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              style={{ marginRight: '16px' }}
            /> */}
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <FilterListIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "25%",
          },
        }}
      >
        <Box p={3} width="100%">
          <Typography variant="h6" gutterBottom>
            Filter Options
          </Typography>
          <FormGroup>
            {Object.keys(make).map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={make[key]}
                    onChange={handleMakeChange}
                    name={key}
                  />
                }
                label={key}
              />
            ))}
          </FormGroup>
          <Box mt={2} mb={2} borderBottom={1} />
          <Typography variant="h6" gutterBottom>
            DURATION
          </Typography>
          <FormGroup>
            {Object.keys(duration).map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={duration[key]}
                    onChange={handleDurationChange}
                    name={key}
                  />
                }
                label={key.replace(/([A-Z])/g, ' $1').trim()}
              />
            ))}
          </FormGroup>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" size="small" style={{backgroundColor:"orange"}} onClick={applyFilter}>
              APPLY FILTER
            </Button>
            <Button variant="outlined" size="small" style={{color:"orange"}} onClick={removeAllFilters}>
              REMOVE ALL FILTERS
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;