// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

export default class SimpleSnackbar extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {

    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>
          Show Snackbar with action
        </Button>
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          message={"I love snacks."}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <Button accent onClick={this.handleRequestClose}>Close</Button>
        </Snackbar>
      </div>
    );
  }
}

