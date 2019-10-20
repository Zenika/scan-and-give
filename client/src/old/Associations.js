import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Association from "./Association";
import api from "./api";

const styles = () => ({
  associations: {
    padding: 15,
    backgroundColor: "#383839"
  },
  card: {
    display: "flex",
    marginBottom: 15,
    minHeight: 200
  },
  cardImage: {
    height: 180,
    width: 450,
    backgroundSize: "contain",
    alignSelf: "center"
  },
  cardContent: {
    flexGrow: 1
  },
  titre: {

  }
});

class Associations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      associations: []
    };
  }

  componentDidMount() {
    api
      .getAssociations()
      .then(associations => {
        this.setState({ associations });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.associations}>
        {this.state.associations.map(a => (
          <Association
            key={a.id}
            id={a.id}
            nom={a.nom}
            image={a.image}
            description={a.description}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Associations);
