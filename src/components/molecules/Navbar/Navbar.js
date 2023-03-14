import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import Link from "@material-ui/core/Link";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import logo from "../../../assets/images/logo.png";
import env from "../../../configs/vars";
import { LOGOUT } from "../../../constants/actionTypes";

const pages = [
  {
    name: 'Home',
    url: `${env.publicUrl}`
  },
  {
    name: 'SignUp',
    url: `${env.signUp}`
  }
]
const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();


  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  const login = () => {
    history.push('/auth');
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);



  return (
    <AppBar position="static" style={{ marginBottom: 20 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src={logo} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: "none"
            }}
          >
            &nbsp; Chat
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index}>
                  <Typography >{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style={{ paddingLeft: 10 }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={page?.url} variant="body2" style={{ textDecoration: "none", color: "white" }} >
                  {page?.name}
                </Link>
              </Button>
            ))}
          </Box>
          <Box>
            {user ? (
              <Typography onClick={logout} variant="subtitle2" style={{ paddingLeft: 10 }}>LOGOUT</Typography>
            ) : (
              <Typography onClick={login} variant="subtitle2" style={{ paddingLeft: 10 }}>LOGIN</Typography>
            )}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
