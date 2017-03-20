// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

export default class SimpleSnackbar extends Component {
  state = {
    open: false,
    message: null,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ open: true, message: 'I love snacks.' })}
        >
          Show Snackbar (String)
        </Button>
        <Button
          onClick={() => this.setState({ open: true, message: <em>I love snacks.</em> })}
        >
          Show Snackbar (Node)
        </Button>
        <Snackbar
          message={this.state.message}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
