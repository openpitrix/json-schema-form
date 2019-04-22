import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Group from './group';
import { isEmpty } from '../../utils';
import Parser from '../../parser';

const noop = () => {};

export default class Form extends Component {
  static propTypes = {
    schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    parser: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    schema: '',
    parser: {},
    onChange: noop,
  };

  constructor(props) {
    super(props);
    this.parser = new Parser();
  }

  render() {
    const { schema, onChange, children, className, ...rest } = this.props;
    const groups = this.parser.setSchema(schema).getRenderGroups();

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
