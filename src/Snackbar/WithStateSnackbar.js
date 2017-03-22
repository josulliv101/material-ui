import React, { createElement, cloneElement, Component } from 'react';
import { Snackbar } from './Snackbar';
import Slide from '../transitions/Slide';
import { duration } from '../styles/transitions';

import {
  compose,
  defaultProps,
  mapProps,
  withHandlers,
  withProps,
  withState,
} from 'recompose'

const enhance = compose(
  defaultProps({
    autoHideDuration: 2000,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
  }),
  withState('pause', 'updatePause', false),
  withState('expired', 'updateExpired', false),
  withState('timerId', 'updateTimerId', null),
  withHandlers({
    togglePause: props => () => props.updatePause(n => !n),
    handleTimeout: props => () => {
      console.log('is paused', props.pause);
      if (props.pause !== true) props.onRequestClose();
      props.updateExpired(true);
    },
  }),
  withHandlers({
    setTimer: props => () => {
      const timerId = setTimeout(props.handleTimeout, props.autoHideDuration);
      props.updateTimerId(timerId);
    },
  }),
  withProps(({anchorOrigin: anchorOriginProp, pause, setTimer, updateExpired, expired, transition, enterTransitionDuration, leaveTransitionDuration, onEnter, onEntering, onEntered, onExit, onExiting, onExited, open}) => ({
    anchorOrigin: Object.assign({}, Snackbar.defaultProps.anchorOrigin, anchorOriginProp),
    open,
    createTransition: typeof transition === 'function' ? createElement : cloneElement,
  })),
  withProps(({anchorOrigin: {vertical, horizontal}, pause, setTimer, updateExpired, expired, transition: transitionProp, enterTransitionDuration, leaveTransitionDuration, onEnter, onEntering, onEntered, onExit, onExiting, onExited, open}) => ({
    transitionProps: {
      in: open,
      transitionAppear: true,
      enterTransitionDuration,
      leaveTransitionDuration,
      onEnter: noop,
      onEntering: node => node.style.visibility = 'visible',
      onEntered: () => setTimer(),
      onExit: noop,
      onExiting: noop,
      onExited: () => updateExpired(false),
    },
    transition: transitionProp || <Slide direction={vertical === 'top' ? 'down' : 'up'} />,
  })),
)

export default enhance;

function noop() {}
