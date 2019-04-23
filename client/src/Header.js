import { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

const styles = () => ({
  codingTheWorld: {
    height: 180
  },
  zenika: {
    height: 100
  },
  header: {
    fontSize: 64,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#383839",
    justifyContent: "center",
    paddingTop: "10px"
  },
  title: {
    margin: "0 100px",
    color: "#4e7b53",
    textShadow:
      "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #4e7b53, 0 0 30px #4e7b53, 0 0 40px #4e7b53, 0 0 55px #4e7b53, 0 0 75px #4e7b53"
  },
  button: {
    color: "#c31436"
  }
});
class Header extends Component {
  render() {
    const { classes, location } = this.props;
    return (
      <div className={classes.header}>
        <Link to="/">
          <img
            src="/coding_the_world.png"
            alt="Coding the World"
            className={classes.codingTheWorld}
          />
        </Link>
        <span className={classes.title}>SCAN AND GIVE</span>
        <img className={classes.zenika} src="/zenika.png" alt="zenika" />
        <div>
          <Button
            className={classes.button}
            size="large"
            color="primary"
            component={Link}
            to={location.pathname === "/dons" ? "/" : "/dons"}
          >
            <Icon>bar_chart</Icon>
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Header));
