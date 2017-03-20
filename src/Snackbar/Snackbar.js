// @flow weak

import React, { createElement, cloneElement, Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import Modal from '../internal/Modal';
import customPropTypes from '../utils/customPropTypes';
import Slide from '../transitions/Slide';
import Paper from '../Paper';
import { duration } from '../styles/transitions';

export const styleSheet = createStyleSheet('MuiSnackbar', ({ palette, breakpoints, zIndex }) => {
  const type = palette.type === 'light' ? 'dark' : 'light';
  const gutter = 24;
  const backgroundColor = palette.shades[type].background.default;
  const topSpace = { top: `${gutter}px` };
  const bottomSpace = { top: `-${gutter}px` };
  const rightSpace = { left: `-${gutter}px` };
  const leftSpace = { left: `${gutter}px` };
  const top = { alignItems: 'flex-start' };
  const bottom = { alignItems: 'flex-end' };
  const right = { justifyContent: 'flex-end' };
  const left = { justifyContent: 'flex-start' };
  return {
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    'pos-top-center': {
      extend: [top],
    },
    'pos-bottom-center': {
      extend: [bottom],
    },
    'pos-top-right': {
      extend: [top, right],
      [breakpoints.up('md')]: {
        extend: [topSpace, rightSpace],
      },
    },
    'pos-bottom-right': {
      extend: [bottom, right],
      [breakpoints.up('md')]: {
        extend: [bottomSpace, rightSpace],
      },
    },
    'pos-top-left': {
      extend: [top, left],
      [breakpoints.up('md')]: {
        extend: [topSpace, leftSpace],
      },
    },
    'pos-bottom-left': {
      extend: [bottom, left],
      [breakpoints.up('md')]: {
        extend: [bottomSpace, leftSpace],
      },
    },
    paper: {
      color: palette.getContrastText(backgroundColor),
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      zIndex: zIndex.snackbar,
      minWidth: '100%',
      padding: `0 ${gutter}px`,
      [breakpoints.up('md')]: {
        minWidth: 288,
        maxWidth: 568,
      },
      minHeight: 48,
      maxHeight: 80,
      '&:focus': {
        outline: 'none',
      },
    },
    message: {
      lineHeight: '20px',
      padding: '14px 0',
      fontWeight: 500,
      [breakpoints.up('md')]: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflowX: 'hidden',
      },
    },
    action: {
      '& $message': {
        marginRight: gutter,
      },
    },
    backdrop: {
      tapHighlightColor: 'rgba(0, 0, 0, 0)',
    },
  };
});

/**
 * Snackbar.
 */
export default class Snackbar extends Component {
  static propTypes = {
    /**
     * The anchor of the `Snackbar`.
     */
    anchorOrigin: customPropTypes.origin,
    /**
     * Duration before hide (ms)
     */
    autoHideDuration: PropTypes.number,
    /**
     * Menu contents, should be menu items.
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
     * The message to display.
     */
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * The CSS class name of the message element.
     */
    messageClassName: PropTypes.string,
    /**
     * Callback fired before the component is entering.
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the component is entering.
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the component has entered.
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the component is exiting.
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the component is exiting.
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the component has exited.
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired when internal modal requests to be closed.
     */
    onRequestClose: PropTypes.func,
    /**
     * If true, `Snackbar` is open.
     */
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper element.
     */
    paperClassName: PropTypes.string,
    /**
     * Transition component.
     */
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  };

  static defaultProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    autoHideDuration: 2000,
    elevation: 2,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    onEnter: noop,
    onEntering: (node) => {
      node.style.visibility = 'visible';
    },
    onExit: noop,
    onExiting: noop,
    onExited: noop,
    onRequestClose: noop,
    open: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  setTimer() {
    this.timerId = setTimeout(this.props.onRequestClose, this.props.autoHideDuration);
  }

  render() {
    const {
      autoHideDuration, // eslint-disable-line
      anchorOrigin: anchorOriginProp,
      children,
      className,
      elevation,
      enterTransitionDuration,
      leaveTransitionDuration,
      message,
      messageClassName,
      onEnter,
      onEntering,
      onEntered: onEnteredProp,
      onExit,
      onExiting,
      onExited,
      onRequestClose,
      open,
      paperClassName,
      transition: transitionProp,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const { vertical, horizontal } = Object.assign(
      {},
      Snackbar.defaultProps.anchorOrigin,
      anchorOriginProp,
    );
    const transition = transitionProp || <Slide direction={vertical === 'top' ? 'down' : 'up'} />;
    const transitionProps = {
      in: open,
      transitionAppear: true,
      enterTransitionDuration,
      leaveTransitionDuration,
      onEnter,
      onEntering,
      onEntered: () => {
        this.setTimer();
        if (onEnteredProp) {
          onEnteredProp();
        }
      },
      onExit,
      onExiting,
      onExited,
    };
    const transitionFn = typeof transition === 'function' ? createElement : cloneElement;
    return (
      <Modal
        className={classNames(classes.modal,
          classes[`pos-${vertical}-${horizontal}`],
          className)}
        backdropVisible={false}
        backdropClassName={classes.backdrop}
        onRequestClose={() => {
          onRequestClose();
          clearTimeout(this.timerId);
        }}
        show={open}
        {...other}
      >
        {transitionFn(transition, transitionProps, (
          <Paper
            data-mui-test="Snackbar"
            elevation={elevation}
            className={classNames(
              classes.paper,
              { [classes.action]: !!children },
              paperClassName,
            )}
            style={{ visibility: 'hidden' }}
          >
            {
              message &&
              <span className={classNames(classes.message, messageClassName)}>{message}</span>
            }
            {children}
          </Paper>
        ))}
      </Modal>
    );
  }
}

function noop() {}
