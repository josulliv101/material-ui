// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('MuiSnackbarContent', ({
    palette,
    breakpoints,
    zIndex,
  }) => {
  const type = palette.type === 'light' ? 'dark' : 'light';
  const gutter = 24;
  const backgroundColor = palette.shades[type].background.default;
  return {
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
      }
    },
    multiline: {
      '& $message': {
        // lineHeight: '16px',
        padding: '24px 0',
      }
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
  };
});

/**
 * Snackbar.
 */
export default class SnackbarContent extends Component {
  static propTypes = {
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
     * The message to display.
     */
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * The CSS class name of the message element.
     */
    messageClassName: PropTypes.string,
    /**
     * The CSS class name of the paper element.
     */
    paperClassName: PropTypes.string,
  };

  static defaultProps = {
    elevation: 2,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      children,
      className,
      isMultiLine,
      message,
      messageClassName,
      paperClassName,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <Paper
        data-mui-test="Snackbar"
        className={classNames(
          classes.paper,
          paperClassName,
          {[classes.multiline]: isMultiLine}
        )}
        {...other}
      >
        {
          message &&
          <span className={classNames(classes.message, messageClassName)}>{message} {isMultiLine?'multi':'single'}</span>
        }
        {children}
      </Paper>
    );
  }
}
