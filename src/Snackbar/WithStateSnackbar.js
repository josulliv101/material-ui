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
    handleTimeout: props => () => {
      if (!props.pause) {
        props.onRequestClose();
      }
      props.updateExpired(true);
    },
    onMouseEnter: props => () => props.updatePause(true),
    onMouseLeave: props => () => {
      props.updatePause(false);
      if (props.expired) props.onRequestClose();
    },
    handleRequestClose: props => () => {
      props.onRequestClose();
      clearTimeout(props.timerId);
    },
  }),
  withHandlers({
    setTimer: ({handleTimeout, autoHideDuration, updateTimerId}) => () => {
      const timerId = setTimeout(handleTimeout, autoHideDuration);
      updateTimerId(timerId);
    },
  }),
  withProps(({anchorOrigin: anchorOriginProp, transition, enterTransitionDuration = Snackbar.defaultProps.enterTransitionDuration, leaveTransitionDuration = Snackbar.defaultProps.leaveTransitionDuration}) => ({
    anchorOrigin: Object.assign({}, Snackbar.defaultProps.anchorOrigin, anchorOriginProp),
    createTransition: typeof transition === 'function' ? createElement : cloneElement,
  })),
  mapProps(({ anchorOrigin: {vertical, horizontal}, createTransition, transition: transitionProp, ...props }) => ({
    contentProps: {
      children: props.children,
      message: props.message,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
    },
    createTransition,
    positionClassname: `pos-${vertical}-${horizontal}`,
    onRequestClose: props.handleRequestClose,
    show: props.open,
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
    transition: transitionProp || <Slide direction={vertical === 'top' ? 'down' : 'up'} />,
  })),
)

export default enhance;

function noop() {}
