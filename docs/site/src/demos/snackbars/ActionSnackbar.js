// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Snackbar, { SnackbarActions } from 'material-ui/Snackbar';

export default class SimpleSnackbar extends Component {
  state = {
    open: false,
    action: null,
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    const btnUndo = (
      <Button key="1" accent onClick={() => console.log('action')}>Undo</Button>
    );
    const btnRedo = (
      <Button key="2" accent onClick={() => console.log('action')}>Redo</Button>
    );
    const actions = {  btnUndo, btnUndoRedo: [btnUndo, btnRedo] };
    return (
      <div>
        <Button onClick={() => this.setState({ open: true, action: 'btnUndo' })}>
          Undo Action
        </Button>
        <Button onClick={() => this.setState({ open: true, action: 'btnUndoRedo' })}>
          Undo/Redo Actions
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'top' }}
          message={'I love snacks.'}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <SnackbarActions>
            {actions[this.state.action]}
          </SnackbarActions>
        </Snackbar>
      </div>
    );
  }
}

