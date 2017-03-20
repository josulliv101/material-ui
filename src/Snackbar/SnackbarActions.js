// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiSnackbarActions', () => {
  return {
    root: {
      marginLeft: 'auto',
    },
    button: {
      padding: '0 6px',
      marginRight: 16,
      whiteSpace: 'nowrap',
      minWidth: 36,
      '&:last-child': {
        marginRight: 0,
      },
    },
  };
});

export default class SnackbarActions extends Component {
  static propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  classes = {};

  renderButton = (button) => (
    React.cloneElement(
      button,
      { className: classNames(this.classes.button, button.props.className) },
    )
  );

  render() {
    const {
      children,
      className,
      ...other
    } = this.props;

    this.classes = this.context.styleManager.render(styleSheet);

    return (
      <div
        data-mui-test="SnackbarActions"
        className={classNames(this.classes.root, className)}
        {...other}
      >
        {React.Children.map(children, this.renderButton)}
      </div>
    );
  }
}
