// @flow weak

import React, { createElement, cloneElement } from 'react';
import { compose, defaultProps, mapProps, withHandlers, withProps, withState } from 'recompose';
import { Snackbar } from './Snackbar';
import Slide from '../transitions/Slide';
import { duration } from '../styles/transitions';

export default compose(
  defaultProps({
    autoHideDuration: 2000,
  }),
  withState('pause', 'updatePause', false),
  withState('expired', 'updateExpired', false),
  withState('timerId', 'updateTimerId', null),
  withHandlers({
    handleTimeout: ({ pause, onRequestClose, updateExpired }) => () => {
      if (!pause) {
        onRequestClose();
      }
      updateExpired(true);
    },
    handleMouseEnter: ({ updatePause }) => () => updatePause(true),
    handleMouseLeave: ({ expired, onRequestClose, updatePause }) => () => {
      updatePause(false);
      if (expired) onRequestClose();
    },
    onRequestClose: ({ timerId, onRequestClose }) => () => {
      onRequestClose();
      clearTimeout(timerId);
    },
    handleExited: ({ updateExpired, onExited }) => () => {
      updateExpired(false);
      if (onExited) {
        onExited();
      }
    },
  }),
  withHandlers({
    setTimer: ({ handleTimeout, autoHideDuration, updateTimerId }) => () => {
      const timerId = setTimeout(handleTimeout, autoHideDuration);
      updateTimerId(timerId);
    },
  }),
  withProps(({
      anchorOrigin: anchorOriginProp,
      transition,
    }) => ({
      anchorOrigin: Object.assign({}, Snackbar.defaultProps.anchorOrigin, anchorOriginProp),
      transitionFn: typeof transition === 'function' ? createElement : cloneElement,
      enterTransitionDuration: duration.enteringScreen,
      leaveTransitionDuration: duration.leavingScreen,
    }),
  ),
  mapProps(({
    anchorOrigin: { vertical, horizontal },
    transitionFn,
    transition,
    ...props }) => ({
      contentProps: {
        children: props.children,
        message: props.message,
        onMouseEnter: props.handleMouseEnter,
        onMouseLeave: props.handleMouseLeave,
      },
      positionClassName: `pos-${vertical}-${horizontal}`,
      onRequestClose: props.onRequestClose,
      open: props.open,
      transition: {
        createTransition: transitionFn,
        transitionProps: {
          in: props.open,
          transitionAppear: true,
          enterTransitionDuration: props.leaveTransitionDuration,
          leaveTransitionDuration: props.leaveTransitionDuration,
          onEnter: noop,
          onEntering: (node) => {
            node.style.visibility = 'visible';
          },
          onEntered: () => props.setTimer(),
          onExit: noop,
          onExiting: noop,
          onExited: props.handleExited,
        },
        transitionEl: transition || <Slide direction={vertical === 'top' ? 'down' : 'up'} />,
      },
    }),
  ),
);

function noop() {}
