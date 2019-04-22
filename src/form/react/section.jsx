import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils';

export default class Section extends Component {
  static propTypes = {
    className: PropTypes.string,
    detail: PropTypes.shape({
      defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      description: PropTypes.string,
      keyName: PropTypes.string.isRequired, // key is reserved by react
      label: PropTypes.string,
      required: PropTypes.bool,
      type: PropTypes.string.isRequired,
      renderType: PropTypes.string,
      items: PropTypes.array,
    }),
    labelCls: PropTypes.string,
    onChange: PropTypes.func,
    onEmpty: PropTypes.func,
  };

  static defaultProps = {
    detail: {
      description: '',
      keyName: '',
      label: '',
      required: false,
      type: 'string',
    },
    onChange: utils.noop,
    onEmpty: utils.noop,
  };

  state = {
    value: null,
  };

  handleChange = val => {
    const { keyName } = this.props.detail;

    if (typeof val === 'object' && val.nativeEvent) {
      val = val.currentTarget.value;
    }

    this.setState({ value: val });

    this.props.onChange(keyName, val);
  };

  getDefaultValue() {
    const { defaultValue, ...rest } = this.props.detail;

    if (!defaultValue) {
      if (Array.isArray(rest.range)) {
        return utils.isObject(rest.range[0])
          ? rest.range[0].value
          : rest.range[0];
      }
      if (Array.isArray(rest.items)) {
        return utils.isObject(rest.items[0]) && rest.items[0].value;
      }
    }

    return defaultValue;
  }

  getValue() {
    const { value } = this.state;
    return value !== null ? value : this.getDefaultValue();
  }

  getNumbericValue() {
    const val = parseInt(this.getValue());
    return Number.isNaN(val) ? 0 : val;
  }

  formatLabel = (value, key) => {
    let name = '';
    switch (key) {
      case 'cpu':
        name = `${value} Core`;
        break;
      case 'memory':
        name = `${value / 1024} GB`;
        break;
      case 'instance_class':
        name = value === 0 ? 'High Performance' : 'Super-high Performance';
        break;
      default:
        name = value.toString();
        break;
    }
    return name;
  };

  renderLabel() {
    const { detail, labelCls } = this.props;
    const { keyName, label, renderType } = detail;

    return <label>{label || keyName}</label>;
  }

  renderItem() {
    const {
      renderType,
      description,
      defaultValue,
      keyName,
      originKey,
      items,
      required,
      ...rest
    } = this.props.detail;

    // hook: render content for empty items
    if (renderType === 'radio' && utils.isEmpty(rest.range)) {
      return this.props.onEmpty(keyName);
    }

    let content = null;

    switch (renderType) {
      case 'input':
        content = (
          <Fragment>
            <input
              name={keyName}
              type="text"
              defaultValue={defaultValue}
              maxLength={50}
              onChange={this.handleChange}
              required={required}
            />
            <p>{description}</p>
          </Fragment>
        );
        break;

      case 'number':
        content = (
          <Fragment>
            <input
              name={keyName}
              type="number"
              defaultValue={defaultValue}
              onChange={this.handleChange}
              min={rest.min}
              max={rest.max}
              required={required}
            />
            <p>
              Range: {rest.min} - {rest.max}
            </p>
          </Fragment>
        );
        break;

      case 'radio':
        content = (
          <Fragment
          // onChange={this.handleChange}
          // name={keyName}
          // value={this.getValue()}
          >
            {rest.range.map((item, idx) => {
              let value = '';
              if (utils.isObject(item)) {
                value = item.value;
              } else {
                value = item;
              }
              const name =
                keyName === 'cluster.runtime'
                  ? item.name
                  : this.formatLabel(value, originKey);

              return (
                <span key={idx}>
                  <label htmlFor="">{name}</label>
                  <input type="radio" value={value} />
                </span>
              );
            })}
          </Fragment>
        );
        break;

      case 'select':
        content = (
          <select
            onChange={this.handleChange}
            disabled={items.length === 0}
            name={keyName}
            value={this.getValue()}
          >
            {items.map(({ name, value }, idx) => (
              <option key={idx} value={value}>
                {name}
              </option>
            ))}
          </select>
        );
        break;

      case 'text':
        content = (
          <textarea
            name={keyName}
            defaultValue={defaultValue}
            maxLength={1000}
            onChange={this.handleChange}
          />
        );
        break;

      case 'slider':
        content = (
          <Fragment>
            {/*<Slider*/}
            {/*min={rest.min}*/}
            {/*max={rest.max}*/}
            {/*step={rest.step}*/}
            {/*value={this.getNumbericValue()}*/}
            {/*onChange={this.handleChange}*/}
            {/*/>*/}
            <span>
              <input
                type="number"
                name={keyName}
                value={this.getValue()}
                min={rest.min}
                max={rest.max}
                onChange={this.handleChange}
              />{' '}
              GB
            </span>
            <p>
              {`${rest.min}GB - ${
                rest.max
              }GB, The volume size for each instance`}
            </p>
          </Fragment>
        );
        break;

      case 'yaml':
        content = rest.yaml && (
          <textarea name={keyName} onChange={this.handleChange}>
            {rest.yaml}
          </textarea>
        );
        break;

      default:
        break;
    }

    return content;
  }

  render() {
    // const { className, detail } = this.props;

    return (
      <div>
        {this.renderLabel()}
        <div>{this.renderItem()}</div>
      </div>
    );
  }
}
