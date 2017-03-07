// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

export default class SimpleSnackbar extends Component {
  state = {
    open: false,
    vertical: "top",
    horizontal: "center",
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
  	const {vertical, horizontal, open} = this.state;
    return (
      <div>
        
        <Button onClick={() => this.setState({ open: true, vertical: "top", horizontal: "center" })}>
          Top-Center
        </Button>
        <Button onClick={() => this.setState({ open: true, vertical: "top", horizontal: "right" })}>
          Top-Right
        </Button>
        <Button onClick={() => this.setState({ open: true, vertical: "bottom", horizontal: "right" })}>
          Bottom-Right
        </Button>
        <Button onClick={() => this.setState({ open: true, vertical: "bottom", horizontal: "center" })}>
          Bottom-Center
        </Button>
        <Button onClick={() => this.setState({ open: true, vertical: "bottom", horizontal: "left" })}>
          Bottom-Left
        </Button>
        <Button onClick={() => this.setState({ open: true, vertical: "top", horizontal: "left" })}>
          Top-Left
        </Button>
        <Snackbar
          anchorOrigin={{vertical, horizontal}}
          message={"I love snacks."}
          open={open}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

