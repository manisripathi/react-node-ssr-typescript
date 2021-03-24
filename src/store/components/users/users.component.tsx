import {
  makeStyles, createStyles, Box, Typography,
} from '@material-ui/core';
import * as React from 'react';
import { DispatchFromProps, StateFromProps } from '../../containers/users/users.container';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    padding: theme.spacing(1),
  },
}));

type Props = StateFromProps & DispatchFromProps

const Users = (props: Props) => {
  const classes = useStyles();
  const {
    users,
  } = props;

  return (
    <Box className={classes.root}>
      <Typography>List of Users - React</Typography>
      {
        users?.map((user: string) => (
          <Typography key={user}>{user}</Typography>
        ))
      }
    </Box>
  );
};

export default Users;
