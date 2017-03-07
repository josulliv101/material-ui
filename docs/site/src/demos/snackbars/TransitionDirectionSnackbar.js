// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

export default class TransitionsSnackbar extends Component {
  state = {
    open: false,
    slideDirection: null,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: true, slideDirection: "down" })}>
          Down
        </Button>
        <Button onClick={() => this.setState({ open: true, slideDirection: "left" })}>
          Right
        </Button>
        <Button onClick={() => this.setState({ open: true, slideDirection: "up" })}>
          Up
        </Button>
        <Button onClick={() => this.setState({ open: true, slideDirection: "right" })}>
          Left
        </Button>
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "right"}}
          message={"I love snacks."}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction={this.state.slideDirection} />}
        />
      </div>
    );
  }
}

