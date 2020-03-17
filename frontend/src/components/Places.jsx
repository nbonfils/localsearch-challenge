import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';
import PlaceCard from './PlaceCard';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: 'auto',
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Places = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="main" maxWidth="sm">
      <Box m={2} className={classes.card}>
        <PlaceCard />
      </Box>
    </Container>
  );
};

export default Places;
