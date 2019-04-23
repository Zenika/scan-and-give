import React, { Component } from "react";
import Don from "./Don";
import api from "./api";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  dons: {
    backgroundColor: "#383839",
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    gridColumnGap: "10px",
    gridRowGap: "10px",
    justifyContent: "center",
    padding: 20
  },
  zenika: {
    borderRadius: 10,
    backgroundColor: "#b11e3e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 15
  },
  zenikaContent: {
    color: "white"
  }
});

class Dons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dons: []
    };
  }

  componentDidMount() {
    api
      .getDons()
      .then(dons => {
        this.setState({ dons });
      })
      .catch(error => {
        console.log(error);
      });

    if (!!window.EventSource) {
      const source = new EventSource("//localhost:3001/sse", {});

      source.addEventListener(
        "message",
        e => {
          console.log("Received event: " + e.data);
          this.setState({ dons: JSON.parse(e.data) });
        },
        false
      );

      source.addEventListener("open", function(e) {}, false);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.dons}>
          <div className={classes.zenika}>
            <Typography
              variant="h4"
              component="h1"
              className={classes.zenikaContent}
            >
              Grâce à vous, Zenika va reverser au total{" "}
              {this.state.dons
                .map(i => i.dons)
                .reduce(function(a, b) {
                  return a + b;
                }, 0)}
              €
            </Typography>
          </div>
          {this.state.dons.map(don => (
            <Don
              key={don.associationId}
              associationId={don.associationId}
              association={don.association}
              image={don.image}
              nombre={don.dons}
              correspondance={don.correspondance}
              correspondances={don.correspondances}
              nombre_correspondance={don.nombre_correspondance}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dons);
