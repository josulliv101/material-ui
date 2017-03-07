// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import Modal from '../internal/Modal';
import customPropTypes from '../utils/customPropTypes';
import Slide from '../transitions/Slide';
import Paper from '../Paper';
import { duration } from '../styles/transitions';

export const styleSheet = createStyleSheet('MuiSnackbar', (theme) => {

	const gutter = 24;

  return {
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    'snackbarPosition-bottom': {
      alignItems: 'flex-end',
      '&$snackbarPosition-right, &$snackbarPosition-left': {
        top: `-${gutter}px`,
      }
    },
    'snackbarPosition-top': {
      alignItems: 'flex-start',
      '&$snackbarPosition-right, &$snackbarPosition-left': {
        top: `${gutter}px`,
      }
    },
    'snackbarPosition-right': {
      justifyContent: 'flex-end',
      left: `-${gutter}px`
    },
    'snackbarPosition-left': {
      justifyContent: 'flex-start',
      left: `${gutter}px`
    },
    paper: {
      zIndex: theme.zIndex.navDrawer,
      minWidth: 288,
      maxWidth: 568,
      minHeight: 48,
      maxHeight: 80,
      '&:focus': {
        outline: 'none',
      },
    },
    backdrop: {
      tapHighlightColor: 'rgba(0, 0, 0, 0)',
    },
  };
});

/**
 * This is a snackbar.
 */
export default class Snackbar extends Component {
  static propTypes = {
    /**
     * The anchorOrigin of the `Snackbar`.
     */
    anchorOrigin: customPropTypes.origin,
    /**
     * The contents of the `Snackbar`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The elevation of the `Snackbar`.
     */
    elevation: PropTypes.number,
    /**
     * Customizes duration of enter animation (ms)
     */
    enterTransitionDuration: PropTypes.number,
    /**
     * Customizes duration of leave animation (ms)
     */
    leaveTransitionDuration: PropTypes.number,
    /**
     * Callback fired when the internal modal requests to be closed.
     */
    onRequestClose: PropTypes.func,
    /**
     * If true, the `Snackbar` is open.
     */
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper element.
     */
    paperClassName: PropTypes.string,
  };

  static defaultProps = {
  	anchorOrigin: {vertical: "bottom", horizontal: "center"},
  	elevation: 2,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    onEnter: log.bind(null, 'onEnter'),
    onEntering: (node) => {
    	log('onEntering', node);
    	node.style.visibility = 'visible'; // Hack for scroll issue safari/desktop & iphone/ipad/safari/chrome
    },
    onEntered: log.bind(null, 'onEntered'),
    onExit: log.bind(null, 'onExit'),
    onExiting: log.bind(null, 'onExiting'),
    onExited: log.bind(null, 'onExited'),
    onRequestClose: noop,
    open: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {

    const {
			anchorOrigin: {vertical, horizontal},
      children,
      className,
      direction,
      elevation,
      enterTransitionDuration,
      leaveTransitionDuration,
      message,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      open,
      paperClassName,
      transition: transitionProp,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const transition = transitionProp || <Slide direction={vertical === "top" ? "down" : "up"} />

    const transitionProps = {
      in: open,
      transitionAppear: true,
      enterTransitionDuration,
      leaveTransitionDuration,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    };

    let createTransitionFn;

    if (typeof transition === 'function') {
      createTransitionFn = React.createElement;
    } else {
      createTransitionFn = React.cloneElement;
    }

    return (
      <Modal
        className={classNames(classes.modal, 
        	classes[`snackbarPosition-${vertical}`], 
        	classes[`snackbarPosition-${horizontal}`], 
        	className)}
        backdropVisible={false}
        backdropClassName={classes.backdrop}
        show={open}
        {...other}
      >
        {createTransitionFn(transition, transitionProps, (
          <Paper
            data-mui-test="Snackbar"
            elevation={elevation}
            className={classNames(classes.paper, paperClassName)}
            style={{visibility: 'hidden'}} // Hack for scroll issue
          >
          	{message}
            {children}
          </Paper>
        ))}
      </Modal>
    );
  }
}
function log(label, node) {console.log(label, node.style.transform);}
function noop() {}