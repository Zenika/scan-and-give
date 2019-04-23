import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = () => ({
  main: {
    color: "white",
    fontSize: "50px",
    textAlign: "center",
    marginTop: "140px"
  },
  button: {
    marginTop: "40px",
    backgroundColor: "#00a94e",
    "&:hover": {
      backgroundColor: "#2C6"
    }
  }
});

class Done extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <div>MERCI POUR VOTRE DON !</div>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          RETOUR AUX ASSOCIATIONS
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Done);
