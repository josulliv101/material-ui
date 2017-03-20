// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';

export default class TransitionsSnackbar extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ open: true })}
        >
          Show Snackbar with Fade Transition
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          message={'I love snacks.'}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Fade />}
        />
      </div>
    );
  }
}

