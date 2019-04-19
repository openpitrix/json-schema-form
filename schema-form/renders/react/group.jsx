import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from './section';
import { ucfirst } from '../../utils';

const noop = () => {};

export default class Group extends Component {
  static propTypes = {
    group: PropTypes.object,
    onChange: PropTypes.func,
    onEmpty: PropTypes.func,
    seq: PropTypes.number,
    className: PropTypes.string,
    titleCls: PropTypes.string,
  };

  static defaultProps = {
    group: {},
    seq: 0,
    onChange: noop,
    onEmpty: noop,
    className: '',
    titleCls: '',
  };

  get isNormalGroup() {
    return Array.isArray(this.props.group.items);
  }

  renderTitle() {
    const { group, seq, titleCls } = this.props;
    const title = this.isNormalGroup ? group.title : group.label || group.key;

    return (
      <h2 className={titleCls}>{`${seq + 1}. ${ucfirst(
        group.labelPrefix
      )} ${title}`}</h2>
    );
  }

  render() {
    const { group, className } = this.props;
    const items = this.isNormalGroup ? group.items : group.properties;

    return (
      <div className={className}>
        {this.renderTitle()}
        {items.map((item, idx) => {
          if (typeof item.toJSON === 'function') {
            item = item.toJSON();
          }

          return (
            <Section
              key={idx}
              detail={item}
              onChange={this.props.onChange}
              onEmpty={this.props.onEmpty}
            />
          );
        })}
      </div>
    );
  }
}
