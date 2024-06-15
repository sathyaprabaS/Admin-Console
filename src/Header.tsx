import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' , backgroundColor:"gray"}}>
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
          
          <IconButton color="inherit">
            <FilterListIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
