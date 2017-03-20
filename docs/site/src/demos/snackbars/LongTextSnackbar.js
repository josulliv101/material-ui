// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar, { SnackbarActions } from 'material-ui/Snackbar';

export default class SimpleSnackbar extends Component {
  state = {
    open: false,
    message: null,
    action: false,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    const sm = 'I love snacks.';
    const md = 'I love canolis. I love cookies. I love cupcakes.';
    const lg = 'I love canolis. I love cookies. I love cupcakes. I love cheese. I love chocolate.';
    return (
      <div>
        <Button onClick={() => this.setState({ open: true, message: sm })}>
          Short Message
        </Button>
        <Button onClick={() => this.setState({ open: true, message: md })}>
          Medium Message
        </Button>
        <Button onClick={() => this.setState({ open: true, message: lg })}>
          Large Message
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'top' }}
          message={this.state.message}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <SnackbarActions>
            <Button accent compact onClick={this.handleRequestClose}>my action</Button>
          </SnackbarActions>
        </Snackbar>
      </div>
    );
  }
}
