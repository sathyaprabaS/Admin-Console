import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography, Button } from '@mui/material';

function FilterOptions() {
  const [make, setMake] = useState({
    Ford: true,
    Cadillac: true,
    Jeep: true,
  });

  const [duration, setDuration] = useState({
    LastMonth: true,
    ThisMonth: true,
    Last3Months: true,
    Last6Months: true,
    ThisYear: true,
    LastYear: true,
  });

  const handleMakeChange = (event:any) => {
    setMake({
      ...make,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDurationChange = (event:any) => {
    setDuration({
      ...duration,
      [event.target.name]: event.target.checked,
    });
  };

  const applyFilter = () => {
    const selectedMakes = Object.keys(make).filter((key) => make[key]);
    const selectedDurations = Object.keys(duration).filter((key) => duration[key]);

    console.log('Selected Makes:', selectedMakes);
    console.log('Selected Durations:', selectedDurations);
  };

  const removeAllFilters = () => {
    setMake({
      Ford: false,
      Cadillac: false,
      Jeep: false,
    });
    setDuration({
      LastMonth: false,
      ThisMonth: false,
      Last3Months: false,
      Last6Months: false,
      ThisYear: false,
      LastYear: false,
    });
  };

  return (
    <Box p={3} width="100%">
      <Typography variant="h6" gutterBottom>
        Fillter Options
      </Typography>
      <FormGroup>
        {Object.keys(make).map((key) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={make[key]}
                onChange={handleMakeChange}
                name={key}
              />
            }
            label={key}
            key={key}
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
            control={
              <Checkbox
                checked={duration[key]}
                onChange={handleDurationChange}
                name={key}
              />
            }
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            key={key}
          />
        ))}
      </FormGroup>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={applyFilter}>
          APPLY FILTER
        </Button>
        <Button variant="outlined" color="secondary" onClick={removeAllFilters}>
          REMOVE ALL FILTERS
        </Button>
      </Box>
    </Box>
  );
}

export default FilterOptions;
