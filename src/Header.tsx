import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Drawer } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterOptions from './FilterOptions';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open:any) => (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'gray' }}>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'left' }}>
            Header
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" style={{ textAlign: 'center', flexGrow: 1 }}>
              Select Dealer
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              style={{ marginRight: '16px' }}
            />
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
            width: "25%"
          }
        }}
      >
        <FilterOptions/>
      </Drawer>
    </>
  );
}

export default Header;
