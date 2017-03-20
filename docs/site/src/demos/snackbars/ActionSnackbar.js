// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Snackbar, { SnackbarActions } from 'material-ui/Snackbar';

export default class SimpleSnackbar extends Component {
  state = {
    open: false,
    action: 'btnUndo',
  };

  handleRequestClose = () => this.setState({ open: false });

  render() {
    const btnIconDelete = (
      <IconButton
        accent
        onClick={this.handleRequestClose}
        style={{
          width: 24,
          height: 36,
          fontSize: 20,
          position: 'relative',
          left: 12,
        }}
      >
        <Icon style={{ width: 24, fontSize: 20 }}>delete</Icon>
      </IconButton>
    );
    const btnUndo = (
      <Button key="1" accent onClick={this.handleRequestClose}>Undo</Button>
    );
    const btnRedo = (
      <Button key="2" accent onClick={this.handleRequestClose}>Redo</Button>
    );
    const actions = { btnIconDelete, btnUndo, btnRedo, btnUndoRedo: [btnUndo, btnRedo] };
    return (
      <div>
        <Button onClick={() => this.setState({ open: true, action: 'btnUndo' })}>
          Undo Action
        </Button>
        <Button onClick={() => this.setState({ open: true, action: 'btnRedo' })}>
          Redo Action
        </Button>
        <Button onClick={() => this.setState({ open: true, action: 'btnUndoRedo' })}>
          Undo/Redo Actions
        </Button>
        <Button onClick={() => this.setState({ open: true, action: 'btnIconDelete' })}>
          Icon Action
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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

