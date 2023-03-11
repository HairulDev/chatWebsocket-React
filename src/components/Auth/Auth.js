import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signin, signup } from '../../actions/auth';
import useStyles from './styles';
import env from '../../configs/vars';



const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [users, setUsers] = useState([
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
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleRadioChange = (event) => {
    const userId = parseInt(event.target.value);
    const selected = users.find(user => user.id === userId);
    setSelectedUser(selected);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedUser) {
      dispatch(signin(selectedUser));
      history.push("/");
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form} onSubmit={handleSubmit}>
          {users.map(user => (
            <div key={user.id}>
              <Avatar src={`${env.urlBucket}/${user.image}`} />
              <label>{user.name}</label>
              <input
                type="radio"
                name="user"
                value={user.id}
                checked={selectedUser && selectedUser.id === user.id}
                onChange={handleRadioChange}
              />
            </div>
          ))}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Container >
  );
};

export default SignUp;
