// @flow weak

import React, { createElement, cloneElement, Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import Modal from '../internal/Modal';
import customPropTypes from '../utils/customPropTypes';
import WithStateSnackbar from './WithStateSnackbar';
import SnackbarContent from './SnackbarContent';
import { duration } from '../styles/transitions';

export const styleSheet = createStyleSheet('MuiSnackbar', ({ breakpoints }) => {
  const gutter = 24;
  const [topSpace, bottomSpace, rightSpace, leftSpace, top, bottom, right, left] = [
    { top: `${gutter}px` },
    { top: `-${gutter}px` },
    { left: `-${gutter}px` },
    { left: `${gutter}px` },
    { alignItems: 'flex-start' },
    { alignItems: 'flex-end' },
    { justifyContent: 'flex-end' },
    { justifyContent: 'flex-start' }
  ];
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
    backdrop: {
      tapHighlightColor: 'rgba(0, 0, 0, 0)',
    },
  };
});

/**
 * Snackbar.
 */
export class Snackbar extends Component {
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
     * Customizes duration of enter animation (ms)
     */
    enterTransitionDuration: PropTypes.number,
    /**
     * Customizes duration of leave animation (ms)
     */
    leaveTransitionDuration: PropTypes.number,
    /**
     * Callback fired when internal modal requests to be closed.
     */
    onRequestClose: PropTypes.func,
    /**
     * If true, `Snackbar` is open.
     */
    open: PropTypes.bool,
    /**
     * Transition component.
     */
    transition: PropTypes.object,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  static defaultProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    autoHideDuration: 2000,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    open: false,
  };

  componentWillUnmount() {
    clearTimeout(this.props.timerId);
  }

  render() {
    console.log('render', this.props);
    const {
      contentProps,
      className,
      open,
      positionClassname,
      transition: {createTransition, transitionProps, transitionEl},
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <Modal
        className={classNames(classes.modal, classes[positionClassname], className)}
        backdropVisible={false}
        backdropClassName={classes.backdrop}
        show={open}
        {...other}
      >
        {createTransition(
          transitionEl,
          transitionProps,
          <SnackbarContent {...contentProps} style={{ visibility: 'hidden' }} />
        )}
      </Modal>
    );
  }
}

export default WithStateSnackbar(Snackbar)
