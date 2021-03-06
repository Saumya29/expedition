import {configure, shallow} from 'enzyme';
import * as React from 'react';
import QuestEnd, {Props} from './QuestEnd';
import {FEATURED_QUESTS} from '../../../Constants';
import {initialSettings} from '../../../reducers/Settings';
import {initialState as initialCheckout} from '../../../reducers/Checkout';
import {loggedOutUser} from '../../../reducers/User';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const GOOD_FORM_SUBSTR = 'Glad you liked it';
const BAD_FORM_SUBSTR = 'select the primary issue';
const MEH_FORM_SUBSTR = 'think could be improved';
const QUALIFIER_FORM_SUBSTR = 'More Details';
const NEEDS_ISSUE_SUBSTR = 'You must specify an issue before submitting';
const TIPPING_SUBSTR = 'Tip the author';

describe('QuestEnd', () => {
  function setup(rating?: number, overrides?: Partial<Props>) {
    const props: Props = {
      checkout: initialCheckout,
      platform: 'android',
      quest: {details: FEATURED_QUESTS[0]},
      settings: initialSettings,
      user: loggedOutUser,
      showSharing: true,
      onShare: jasmine.createSpy('onShare'),
      onSubmit: jasmine.createSpy('onSubmit'),
      onTip: jasmine.createSpy('onTip'),
      ...overrides,
    };
    const result = {props, e: shallow(<QuestEnd {...(props as any as Props)} />, undefined /*renderOptions*/)};
    if (rating !== undefined) {
      result.e.find('#starrating').prop('onChange')(rating);
      result.e.update();
    }
    return result;
  }

  test('hides form sections when not yet rated', () => {
    const {props, e} = setup();
    const text = e.render().text();
    expect(text).not.toContain(GOOD_FORM_SUBSTR);
    expect(text).not.toContain(BAD_FORM_SUBSTR);
    expect(text).not.toContain(MEH_FORM_SUBSTR);
    expect(text).not.toContain(QUALIFIER_FORM_SUBSTR);
  })
  test('high review shows good defails form section and shows tipping', () => {
    const {e} = setup(5);
    const text = e.render().text();
    expect(text).toContain(GOOD_FORM_SUBSTR);
    expect(text).toContain(TIPPING_SUBSTR);
  });
  test('meh review shows bad details form section with meh title and hides tipping', () => {
    const {e} = setup(3);
    const text = e.render().text();
    expect(text).toContain(MEH_FORM_SUBSTR);
    expect(text).not.toContain(TIPPING_SUBSTR);
  });
  test('low review shows bad details form section and hides tipping', () => {
    const {e} = setup(1);
    const text = e.render().text();
    expect(text).toContain(BAD_FORM_SUBSTR);
    expect(text).not.toContain(TIPPING_SUBSTR);
  });
  test('selecting a primary issue shows qualifier section', () => {
    const {e} = setup(1);
    e.find("#primaryIssueSelect").simulate('change', {target: {value: 'Duration'}})
    expect(e.render().text()).toContain(QUALIFIER_FORM_SUBSTR);
  });
  test('can return home without a review', () => {
    const {props, e} = setup();
    e.find('#submit').prop('onClick')();
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });
  test('triggers sharing when button pressed', () => {
    const {props, e} = setup();
    e.find("#shareButton").simulate('click');
    expect(props.onShare).toHaveBeenCalledTimes(1);
  });
  test('blocks negative submit if no issue given and shows error', () => {
    const {props, e} = setup(1);
    e.find('#submit').prop('onClick')();
    e.update();
    expect(props.onSubmit).toHaveBeenCalledTimes(0);
    expect(e.render().text()).toContain(NEEDS_ISSUE_SUBSTR);
  });
  test('submits negative review a issue given', () => {
    const {props, e} = setup(1);
    e.find("#primaryIssueSelect").simulate('change', {target: {value: 'Duration'}})
    e.find('#submit').prop('onClick')();
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  test.skip('can tip if tipping enabled', () => { /* TODO */ });
  test.skip('disables tipping if tipping disabled', () => { /* TODO */ });
});
