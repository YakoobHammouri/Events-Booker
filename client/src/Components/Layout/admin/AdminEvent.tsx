import React from 'react';
import { Box, Grid } from '@material-ui/core';

import EventContainer from '../../Common/Event/EventContainer';

export default () => {
  return (
    <Box p={3}>
      <Grid container item justify="center">
        <EventContainer isAdmin={true} />
      </Grid>
    </Box>
  );
};
