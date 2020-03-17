/* eslint-disable camelcase */
import React from 'react';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router-dom';
import {
  CircularProgress, Typography, Card, CardContent, List, ListItem, ListItemText, Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  addr: {
    marginBottom: '1.2rem',
  },
  listItemSubText: {
    display: 'block',
  },
});

const PlaceCard = () => {
  const classes = useStyles();
  const { placeId } = useParams();
  const { isLoading, data } = useFetch(`http://localhost:3000/places/${placeId}`);

  if (isLoading) return <Box mt={6}><CircularProgress /></Box>;

  if (!data) return <Typography>Not Found</Typography>;

  const { displayed_what, displayed_where, opening_hours } = data;

  const openingHours = Object.entries(opening_hours.days).reduce((acc, entry) => {
    const [day, hours] = entry;

    if (acc.length <= 0) {
      acc.push({ day, hours });
      return acc;
    }

    const [last] = acc.slice(-1);
    const { day: lastDay, hours: lastHours } = last;

    if (JSON.stringify(hours) === JSON.stringify(lastHours)) {
      let dayRange;
      if (lastDay.includes('-')) {
        const [earliestDay, ..._] = lastDay.split('-');
        dayRange = `${earliestDay}-${day}`;
      } else {
        dayRange = `${lastDay}-${day}`;
      }
      acc.splice(-1, 1, { day: dayRange, hours });
    } else {
      acc.push({ day, hours });
    }

    return acc;
  }, []);

  const openingHoursItems = openingHours.map((entry) => {
    const { day, hours } = entry;

    const hoursText = hours.map((hoursRange, index) => {
      if (hoursRange.type === 'OPEN') {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Typography className={classes.listItemSubText} key={index} component="span">
            {hoursRange.start}
            -
            {hoursRange.end}
          </Typography>
        );
      }

      return <Typography className={classes.listItemSubText} component="span">Closed</Typography>;
    });

    return (
      <ListItem key={day}>
        <ListItemText primary={day} secondary={<>{hoursText}</>} />
      </ListItem>
    );
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h1">
          {displayed_what}
        </Typography>
        <Typography className={classes.addr} color="textSecondary">
          {displayed_where}
        </Typography>
        <Typography varient="h6" component="h1">
          Opening Hours
        </Typography>
        <List>
          {openingHoursItems}
        </List>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
