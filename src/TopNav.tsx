import * as React from "react";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import {
  Menu as MenuIcon,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
} from "react-feather";
import { $user, useCurrentUser } from "./factories/UserFactory";
import { UISref } from "@uirouter/react";
import { $state, $transition } from "./router";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

export function TopNav(props = {}) {
  const classes = useStyles({});

  const user = useCurrentUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [hideNav, setHideNav] = useState(false);

  $transition.onSuccess({}, () => {
    if ($state.current.name === "resetPassword") {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  });

  const handleBackButton = () => {
    history.back();
  };

  const handleNextButton = () => {
    history.forward();
  };

  return (
    <AppBar
      elevation={1}
      className={classNames(classes.root)}
      position="static"
    >
      <Toolbar>
        <Button
          type="submit"
          style={{
            background: "#507ce0",
            color: "#fff",
            borderRadius: "25px",
          }}
          onClick={handleBackButton}
        >
          <ArrowLeft />
        </Button>

        <Button
          type="submit"
          style={{
            background: "#507ce0",
            marginLeft: "5px",
            color: "#fff",
            borderRadius: "25px",
          }}
          onClick={handleNextButton}
        >
          <ArrowRight />
        </Button>
        <Grid
          item
          xs
          justify="flex-end"
          container
          style={{ right: 0, justifyContent: "right" }}
        >
          <UISref to="setting" params={{ id: 0 }}>
            <Typography
              variant="h6"
              style={{ textTransform: "uppercase", cursor: "pointer" }}
            >
              {user?.firstname + " "} {" " + user?.lastname}
            </Typography>
          </UISref>
        </Grid>
        {!hideNav ? (
          <Grid item md={2} xs={2} sm={2} justify="flex-end" container>
            <UISref to="chat">
              <Button
                type="submit"
                style={{
                  background: "#507ce0",
                  color: "#fff",
                  borderRadius: "25px",
                }}
              >
                Chat
                <MessageCircle />
              </Button>
            </UISref>
            <IconButton
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <UISref to="setting" params={{ id: 0 }}>
                <MenuItem onClick={handleClose}>Account Information</MenuItem>
              </UISref>
              <UISref to="setting" params={{ id: 2 }}>
                <MenuItem onClick={handleClose}>Change Password</MenuItem>
              </UISref>
              <UISref to="help">
                <MenuItem onClick={handleClose}>Help</MenuItem>
              </UISref>
              <UISref to="faq">
                <MenuItem onClick={handleClose}>FAQ</MenuItem>
              </UISref>
              <UISref to="login">
                <MenuItem
                  onClick={async () => {
                    await $user.logout();
                  }}
                >
                  Logout
                </MenuItem>
              </UISref>
            </Menu>
          </Grid>
        ) : (
          <Button
            color="inherit"
            size="medium"
            onClick={() => {
              $user.logout();
              // $state.go("login");
            }}
          >
            Cancel
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
