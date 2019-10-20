import React, { Component } from "react";
import { Icon, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = () => ({
  titre: {
    color: "#00a94e"
  },
  content: {
    paddingRight: 30,
    fontSize: "18px",
    textAlign: "justify"
  },
  cardImageContainer: {
    flex: "1 0 330px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  },
  card: {
    borderRadius: 10,
    width: "100%",
    display: "flex",
    marginBottom: 15,
    minHeight: 200,
    backgroundColor: "white",
    fontFamily: "NotoSerif-Bold",
    fontStyle: "normal",
    fontWeight: 400
  },
  cardImage: {
    maxWidth: 300,
    height: 180
  },
  cardContent: {
    flexGrow: 1
  },
  rightIcon: {
    marginLeft: 8,
    color: "#C00"
  },
  cardButton: {
    display: "flex"
  },
  button: {
    color: "#C00",
    paddingRight: 20
  },
  textButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});
class Association extends Component {
  state = {
    associations: []
  };

  render() {
    const { classes } = this.props;
    return (
      <ButtonBase focusRipple component={Link} to={"/scanner/" + this.props.id}>
        <div className={classes.card}>
          <div className={classes.cardImageContainer}>
            <img
              className={classes.cardImage}
              src={this.props.image}
              alt={this.props.nom}
            />
          </div>
          <div className={classes.cardContent}>
            <h2 className={classes.titre}>{this.props.nom}</h2>
            <Typography
              component="p"
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html: this.props.description.replace(/\n/g, "<br />")
              }}
            />
          </div>
          <div className={classes.cardButton}>
            <Button className={classes.button}>
              Soutenir
              <Icon className={classes.rightIcon}>card_giftcard</Icon>
            </Button>
          </div>
        </div>
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(Association);
