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
  }),
  withState('pause', 'updatePause', false),
  withState('expired', 'updateExpired', false),
  withState('timerId', 'updateTimerId', null),
  withHandlers({
    handleTimeout: ({pause, onRequestClose, updateExpired}) => () => {
      if (!pause) {
        onRequestClose();
      }
      updateExpired(true);
    },
    handleMouseEnter: props => () => props.updatePause(true),
    handleMouseLeave: ({expired, onRequestClose, updatePause}) => () => {
      updatePause(false);
      if (expired) onRequestClose();
    },
    onRequestClose: ({timerId, onRequestClose}) => () => {
      onRequestClose();
      clearTimeout(timerId);
    },
  }),
  withHandlers({
    setTimer: ({handleTimeout, autoHideDuration, updateTimerId}) => () => {
      const timerId = setTimeout(handleTimeout, autoHideDuration);
      updateTimerId(timerId);
    },
  }),
  withProps(({
      anchorOrigin: anchorOriginProp,
      transition, enterTransitionDuration = Snackbar.defaultProps.enterTransitionDuration,
      leaveTransitionDuration = Snackbar.defaultProps.leaveTransitionDuration
    }) => ({
      anchorOrigin: Object.assign({}, Snackbar.defaultProps.anchorOrigin, anchorOriginProp),
      createTransition: typeof transition === 'function' ? createElement : cloneElement,
  })),
  mapProps(({ anchorOrigin: {vertical, horizontal}, createTransition, transition: transitionProp, ...props }) => ({
    contentProps: {
      children: props.children,
      message: props.message,
      onMouseEnter: props.handleMouseEnter,
      onMouseLeave: props.handleMouseLeave,
    },
    positionClassname: `pos-${vertical}-${horizontal}`,
    onRequestClose: props.onRequestClose,
    open: props.open,
    transition: {
      createTransition,
      transitionProps: {
        in: props.open,
        transitionAppear: true,
        enterTransitionDuration: props.leaveTransitionDuration,
        leaveTransitionDuration: props.leaveTransitionDuration,
        onEnter: noop,
        onEntering: node => node.style.visibility = 'visible',
        onEntered: () => props.setTimer(),
        onExit: noop,
        onExiting: noop,
        onExited: () => props.updateExpired(false),
      },
      transitionEl: transitionProp || <Slide direction={vertical === 'top' ? 'down' : 'up'} />,
    },
  })),
)

export default enhance;

function noop() {}
