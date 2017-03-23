// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

const messages = [
  { message: 'I love cookies.', key: 1 },
  { message: 'I love candy.', key: 2 },
  { message: 'I love cake.', key: 3 },
];

export default class SimpleSnackbar extends Component {

  state = {
    open: false,
    messages,
  };

  handleNextSnackbar = () => {
    const copyNext = this.state.messages.slice(1);
    const done = copyNext.length === 0;
    this.setState({ messages: done ? messages : copyNext, open: !done });
  }

  handleRequestClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>
          Multiple Snackbars
        </Button>
        {
          this.state.messages.length > 0 &&
          <Snackbar
            {...this.state.messages[0]}
            open={this.state.open}
            onExited={this.handleNextSnackbar}
            onRequestClose={this.handleRequestClose}
          />
        }
      </div>
    );
  }
}
