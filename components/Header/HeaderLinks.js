/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { DockRounded, VerifiedUser } from "@material-ui/icons";

import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/register"
          color="transparent"
          className={classes.navLink}
        >
          <VerifiedUser className={classes.icons} /> Sign Up
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="/login" color="transparent" className={classes.navLink}>
          <DockRounded className={classes.icons} /> Sign Up
        </Button>
      </ListItem>
    </List>
  );
}
