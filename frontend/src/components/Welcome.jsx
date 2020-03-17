import React from 'react';
// React Router
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Box, Button, Typography,
} from '@material-ui/core';

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const Welcome = () => {
  const classes = useStyle();

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Typography component="h1" variant="h4">
        Try one of the place ID
      </Typography>
      <Box m={1}>
        <Button variant="contained" color="primary" component={RouterLink} to="/GXvPAor1ifNfpF0U5PTG0w">
          GXvPAor1ifNfpF0U5PTG0w
        </Button>
      </Box>
      <Box m={1}>
        <Button variant="contained" color="primary" component={RouterLink} to="/ohGSnJtMIC5nPfYRi_HTAg">
          ohGSnJtMIC5nPfYRi_HTAg
        </Button>
      </Box>
    </Container>
  );
};

export default Welcome;
