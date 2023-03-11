import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Container, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signin, } from '../../actions/auth';
import useStyles from './styles';
import env from '../../configs/vars';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const users = [
    {
      "id": 1,
      "name": "Hairul",
      "image": "174001032023.png",
      "email": "hairul@opmail.com",
      "created_at": "2023-03-11T10:04:52.413Z",
      "updated_at": "2023-03-11T10:04:52.413Z"
    },
    {
      "id": 2,
      "name": "Alesha",
      "image": "174102032023.jpeg",
      "email": "alesha@opmail.com",
      "created_at": "2023-03-11T10:04:52.413Z",
      "updated_at": "2023-03-11T10:04:52.413Z"
    },
    {
      "id": 3,
      "name": "Desi",
      "image": "174102032023.jpeg",
      "email": "alesha@opmail.com",
      "created_at": "2023-03-11T10:04:52.413Z",
      "updated_at": "2023-03-11T10:04:52.413Z"
    }
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [value, setValue] = useState('female');


  const handleRadioChange = (event) => {
    const userId = event.target.value;
    const user = users.find(user => user.id === parseInt(userId));
    setSelectedUser(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedUser) {
      dispatch(signin(selectedUser));
      history.push("/");
    }
    setValue(event.target.value);
  };


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
                      <Avatar src={`${env.urlBucket}/${user.image}`} />
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
