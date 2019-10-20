import React, { Component } from "react";
import jsQR from "jsqr";
import api from "./api";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core";
import objectHash from "object-hash";
import Modal from "@material-ui/core/Modal";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";

const styles = theme => ({
  cardImage: {
    height: 180,
    width: 450,
    backgroundSize: "contain",
    alignSelf: "center"
  },
  cardTitre: {
    color: "#00a94e",
    textAlign: "center"
  },
  resumeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    padding: 15
  },
  left: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  info: {
    color: "white",
    fontSize: "30px",
    textAlign: "center",
    borderRadius: 10,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  resume: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    flexDirection: "column"
  },
  layout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#383839"
  },
  modal: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  scanner: {
    borderRadius: 10,
    boxShadow: "1px 1px 100px #4e7b53"
  },
  fab: {
    position: "absolute",
    bottom: 15,
    left: 10,
    backgroundColor: "#b11e3e",
    "&:hover": {
      backgroundColor: "#b11e3e"
    }
  },
  extendedIcon: {
    marginRight: 5
  }
});

class Scanner extends Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();
  state = {
    loading: true,
    videoDevices: [],
    association: null,
    dontExist: false,
    sending: false
  };

  componentDidMount() {
    api
      .getAssociation(this.props.match.params.associationId)
      .then(response => this.setState({ association: response }));
    navigator.mediaDevices.enumerateDevices().then(this.onEnumerateDevices);

    // If you want to add the webcam selection, this website can help:
    // https://www.twilio.com/blog/2018/04/choosing-cameras-javascript-mediadevices-api.html

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        const video = this.videoRef.current;
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(this.tick);
      });
  }

  tick = () => {
    this.analyzeVideoFrame();
    requestAnimationFrame(this.tick);
  };

  analyzeVideoFrame = () => {
    const video = this.videoRef.current;
    if (
      this.state.loading &&
      video &&
      video.readyState === video.HAVE_ENOUGH_DATA
    ) {
      this.setState({
        loading: false
      });
      return;
    }

    if (!this.state.loading) {
      const video = this.videoRef.current;
      const canvas = this.canvasRef.current;
      if (canvas !== null) {
        const canvasContext = canvas.getContext("2d");
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        // Horizontally invert the canvas for the front camera
        // If we do not do that, when the user moves his arm to the
        // right he sees it going to the left on the screen
        canvasContext.translate(video.videoWidth, 0);
        canvasContext.scale(-1, 1);
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvasContext.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert"
        });
        if (code && code.data && !this.state.dontExist && !this.state.sending) {
          this.setState({ sending: true });
          api
            .addDon(
              objectHash(code.data),
              new Date(),
              parseInt(this.props.match.params.associationId)
            )
            .then(() => {
              this.props.history.push({
                pathname: "/done"
              });
            })
            .catch(error => {
              if (error.response.status === 400) {
                this.setState({ dontExist: true, sending: false });
              }
            });
        }
      }
    }
  };

  onEnumerateDevices = mediaDevices => {
    const videoDevices = mediaDevices.filter(
      mediaDevice => mediaDevice.kind === "videoinput"
    );
    this.setState({ videoDevices });
  };

  getAssociation = () => {
    if (this.state.association) {
      const { classes } = this.props;
      return (
        <div className={classes.resume}>
          <div className={classes.resumeCard}>
            <CardMedia
              className={classes.cardImage}
              image={"/" + this.state.association.image}
              title={this.state.association.nom}
            />
            <h1 className={classes.cardTitre}>{this.state.association.nom}</h1>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  };

  getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  handleClose = () => {
    this.setState({ dontExist: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.dontExist}
          onClose={this.handleClose}
        >
          <div className={classes.modal}>
            <Icon color={"error"}>warning</Icon>
            VOUS AVEZ DEJA DONNE
          </div>
        </Modal>
        <div className={classes.layout}>
          <div className={classes.left}>
            {this.getAssociation()}
            <span className={classes.info}>
              Veuillez scanner VOTRE badge ici =>
            </span>
            <Fab
              variant="extended"
              color="primary"
              aria-label="Add"
              className={classes.fab}
              component={Link}
              to={"/"}
            >
              <Icon className={classes.extendedIcon}>arrow_back</Icon>
              Retour
            </Fab>
          </div>
          <div>
            <video ref={this.videoRef} hidden />
            <canvas
              className={classes.scanner}
              ref={this.canvasRef}
              hidden={this.state.loading}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Scanner);
