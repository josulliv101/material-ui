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
          Show Snackbar
        </Button>
        <Snackbar
          message={"I love snacks."}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

