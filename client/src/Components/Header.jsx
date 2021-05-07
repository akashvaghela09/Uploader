import React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styles from "../Styles/Header.module.css"
import Drawer from '@material-ui/core/Drawer';
import { Redirect, Route } from 'react-router';
import { Link, useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { Logout } from "./Logout"
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100vw",
    padding: "0px 15px",
    marginBottom: "20px",
    boxShadow: "0px 1px 15px 5px rgba(0,0,0,0.67)",
    backgroundColor: "#283593"
  },
  icon: {
    paddingTop: "4px"
  },
  loginBtn: {
    padding: "5px"
  },
  listBtn: {
    width: 250,
    "&:hover": {
      backgroundColor: '#3F51B5',
      color: "white"
    }
  },
  drawer: {
    backgroundColor: "#F0F2F5",
    flexGrow: 100
  },
  menuIcon: {
    color: "white"
  }
}));

function Header() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = React.useState(false);
  const history = useHistory();
  // const {} = useParams()
  const isAuth = useSelector((state) => state.auth.isAuth)

  console.log(isAuth);
  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  return (
      <Grid container  justify="space-between" alignItems="center" className={classes.wrapper} >
        {
          <Drawer anchor="left" open={drawerState} onClose={toggleDrawer}>
            <List  className={classes.drawer} >
              <ListItem>
              <Button className={classes.listBtn}  onClick={() => {history.push("/dashboard")}}>Dashboard</Button>
              </ListItem>
              <Divider />
              <ListItem>
              <Button className={classes.listBtn}  onClick={() => {history.push("/")}}>Upload Files</Button>
              </ListItem>
              <Divider />
              <ListItem>
              <Button  className={classes.listBtn} onClick={() => {history.push("/login")}}>Login</Button>
              </ListItem>
              <ListItem>
              <Button  className={classes.listBtn} onClick={() => {history.push("/registration")}}>Register</Button>
              </ListItem>
            </List>
          </Drawer>
        }
        <Grid container justify="flex-start" md={4} sm={2} xs={3}  className={classes.icon}>
            <MenuIcon className={classes.menuIcon} onClick={toggleDrawer}/>
        </Grid>
        <Grid container justify="center" md={4} sm={2} xs={3} className={classes.sitename}>
            <p className={styles.siteName}>
                Uploder
            </p>
        </Grid>
        {
          !isAuth ?
          <Grid container md={4} sm={2} xs={3} justify="flex-end" className={classes.loginBtn}>
            <Button variant="contained" color="primary" onClick={() => {history.push("/login")}}>Login</Button>
          </Grid> : 
          <Grid container md={4} sm={2} xs={3} justify="flex-end" className={classes.loginBtn}>
            <Logout />
          </Grid>
        }
      </Grid>
  )
}

export {Header}