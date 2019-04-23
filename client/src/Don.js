import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  titre: {
    color: "#00a94e",
    textAlign: "center",
    flex: "1 1 auto"
  },
  content: {
    paddingRight: 30,
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "2rem"
  },
  cardImageContainer: {
    flex: "0 0 100px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "5px"
  },
  card: {
    borderRadius: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: 170,
    backgroundColor: "white",
    fontFamily: "NotoSerif-Bold",
    fontStyle: "normal",
    fontWeight: 400
  },
  cardImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "100px",
    flex: "0 1 0%"
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  rightIcon: {
    marginLeft: 8,
    color: "#C00"
  },
  button: {
    color: "#C00"
  },
  textButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});
class Don extends Component {
  render() {
    const { classes } = this.props;
    let nombre = Math.floor(
      this.props.nombre / this.props.nombre_correspondance
    );
    let correspondance = "";
    if (this.props.correspondance) {
      correspondance =
        nombre > 0 ? (
          <Typography variant="h4" component="h1" className={classes.content}>
            soit {nombre}{" "}
            {nombre === 1
              ? this.props.correspondance
              : this.props.correspondances}
          </Typography>
        ) : (
          ""
        );
    }
    return (
      <div className={classes.card}>
        <div className={classes.cardImageContainer}>
          <img
            className={classes.cardImage}
            src={this.props.image}
            alt={this.props.association}
          />
          <h2 className={classes.titre}>{this.props.association}</h2>
        </div>
        <div className={classes.cardContent}>
          <Typography variant="h4" component="h1" className={classes.content}>
            {this.props.nombre}€ reçus
          </Typography>
          {correspondance}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Don);
