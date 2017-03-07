// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Snackbar, { styleSheet } from './Snackbar';
import Slide from '../transitions/Slide';
import Modal from '../internal/Modal';
import { duration } from '../styles/transitions';

/**
 * An item that goes in lists.
 */
describe('<Snackbar />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });
/*
  it('should render a Modal', () => {
    const wrapper = shallow(
      <Snackbar />,
    );
    assert.strictEqual(wrapper.is('Modal'), true, 'should be a Modal');
  });

  it('should render Slide > Paper inside the Modal', () => {
    const wrapper = shallow(
      <Snackbar />,
    );

    const slide = wrapper.childAt(0);
    assert.strictEqual(
      slide.length === 1 && slide.is(Slide),
      true,
      'immediate wrapper child should be Slide',
    );

    const paper = slide.childAt(0);
    assert.strictEqual(
      paper.length === 1 && paper.is('Paper'),
      true,
      'Slide child should be Paper',
    );

    assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');
  });
*/
});
