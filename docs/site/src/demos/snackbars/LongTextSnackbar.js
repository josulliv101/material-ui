// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

export default class SimpleSnackbar extends Component {
  state = {
    open: false,
    message: null,
    action: false
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {

  	const sm = "I love snacks.";
  	const md = "I love canollis. I love cookies. I love chocolate.";
  	const lg = "I love canollis. I love cookies. I love chocolate. I love cheesecake. I love cupcakes. I love cake.";
    const action = <Button accent onClick={this.handleRequestClose}>my action</Button>;

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
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          message={this.state.message}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {action}
        </Snackbar>
      </div>
    );
  }
}

