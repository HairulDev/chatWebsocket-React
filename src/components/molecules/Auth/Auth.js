import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Avatar, Button, Paper, Container, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import useStyles from './styles';
import env from '../../../configs/vars';

import { signin, } from '../../../actions/auth';
import { fetchUser } from '../../../actions/users';

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { users } = useSelector((state) => state.users);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);


  const handleRadioChange = (event) => {
    const userId = event.target.value;
    console.log("userId===", userId)
    const user = users.find(user => user.id === parseInt(userId));
    setSelectedUser(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedUser) {
      dispatch(signin(selectedUser));
      history.push("/");
    }
  };
  console.log("selectedUser===", selectedUser);
  console.log("users===", users);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>

        <Grid container alignItems="stretch" spacing={3}>
          <Grid item xs={12} style={{ textAlign: "center", alignItems: "center" }}>
            <LockOutlinedIcon />
            <Typography variant="h6">Choose User</Typography>
          </Grid>

          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
              <RadioGroup>
                {users.map(user => (
                  <Grid container key={user.id} className={classes.list}>
                    <Grid item xs={5} >
                      <Avatar src={require(`../../../assets/images/${user.image}`)} />
                    </Grid>
                    <Grid item xs={6} >
                      <FormControlLabel
                        value={user.id}
                        control={<Radio />}
                        label={user.name}
                        checked={selectedUser && selectedUser.id === user.id}
                        onChange={handleRadioChange}
                      />
                    </Grid>
                  </Grid>
                ))}
              </RadioGroup>
            </FormControl>

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign In
            </Button>
          </form>


        </Grid>
      </Paper>
    </Container >
  );
};

export default SignUp;
