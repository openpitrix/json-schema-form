import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Group from './group';
import { isEmpty } from '../../utils';

const noop = () => {};

export default class Form extends Component {
  static propTypes = {
    groups: PropTypes.array,
    onChange: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    groups: [],
    onChange: noop,
  };

  render() {
    const { groups, onChange, children, className, ...rest } = this.props;

    return (
      <form className={className}>
        {groups
          .filter(gp => !isEmpty(gp))
          .map((gp, idx) => (
            <Group
              group={gp}
              onChange={onChange}
              seq={idx}
              key={idx}
              {...rest}
            />
          ))}

        {children}
      </form>
    );
  }
}
