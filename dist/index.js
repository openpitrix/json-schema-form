(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports, require('react'), require('prop-types'))
    : typeof define === 'function' && define.amd
    ? define(['exports', 'react', 'prop-types'], factory)
    : ((global = global || self),
      factory((global.JsonSchemaForm = {}), global.React, global.PropTypes));
})(this, function(exports, React, PropTypes) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes =
    PropTypes && PropTypes.hasOwnProperty('default')
      ? PropTypes['default']
      : PropTypes;

  function _typeof(obj) {
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function');
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true,
      },
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === 'object' || typeof call === 'function')) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var toStr = Object.prototype.toString; // types

  var isObject = function isObject(val) {
    return toStr.call(val) === '[object Object]';
  };
  var isArray = function isArray(val) {
    return toStr.call(val) === '[object Array]';
  };
  var isNumber = function isNumber(val) {
    return toStr.call(val) === '[object Number]';
  };
  var isEmpty = function isEmpty(val) {
    if (isObject(val)) {
      return !Object.keys(val).length;
    }

    if (isArray(val)) {
      return !val.length;
    }

    return Boolean(val) === false;
  }; // array

  var ucfirst = function ucfirst() {
    var str =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (!str) {
      return str;
    }

    return str[0].toUpperCase() + str.substring(1);
  };
  var noop = function noop() {};

  var Section =
    /*#__PURE__*/
    (function(_Component) {
      _inherits(Section, _Component);

      function Section() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, Section);

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(
          this,
          (_getPrototypeOf2 = _getPrototypeOf(Section)).call.apply(
            _getPrototypeOf2,
            [this].concat(args)
          )
        );
        _this.state = {
          value: null,
        };

        _this.handleChange = function(val) {
          var keyName = _this.props.detail.keyName;

          if (_typeof(val) === 'object' && val.nativeEvent) {
            val = val.currentTarget.value;
          }

          _this.setState({
            value: val,
          });

          _this.props.onChange(keyName, val);
        };

        _this.formatLabel = function(value, key) {
          var name = '';

          switch (key) {
            case 'cpu':
              name = ''.concat(value, ' Core');
              break;

            case 'memory':
              name = ''.concat(value / 1024, ' GB');
              break;

            case 'instance_class':
              name =
                value === 0 ? 'High Performance' : 'Super-high Performance';
              break;

            default:
              name = value.toString();
              break;
          }

          return name;
        };

        return _this;
      }

      _createClass(Section, [
        {
          key: 'getDefaultValue',
          value: function getDefaultValue() {
            var _this$props$detail = this.props.detail,
              defaultValue = _this$props$detail.defaultValue,
              rest = _objectWithoutProperties(_this$props$detail, [
                'defaultValue',
              ]);

            if (!defaultValue) {
              if (Array.isArray(rest.range)) {
                return isObject(rest.range[0])
                  ? rest.range[0].value
                  : rest.range[0];
              }

              if (Array.isArray(rest.items)) {
                return isObject(rest.items[0]) && rest.items[0].value;
              }
            }

            return defaultValue;
          },
        },
        {
          key: 'getValue',
          value: function getValue() {
            var value = this.state.value;
            return value !== null ? value : this.getDefaultValue();
          },
        },
        {
          key: 'getNumbericValue',
          value: function getNumbericValue() {
            var val = parseInt(this.getValue());
            return Number.isNaN(val) ? 0 : val;
          },
        },
        {
          key: 'renderLabel',
          value: function renderLabel() {
            var _this$props = this.props,
              detail = _this$props.detail,
              labelCls = _this$props.labelCls;
            var keyName = detail.keyName,
              label = detail.label,
              renderType = detail.renderType;
            return React__default.createElement(
              'label',
              null,
              label || keyName
            );
          },
        },
        {
          key: 'renderItem',
          value: function renderItem() {
            var _this2 = this;

            var _this$props$detail2 = this.props.detail,
              renderType = _this$props$detail2.renderType,
              description = _this$props$detail2.description,
              defaultValue = _this$props$detail2.defaultValue,
              keyName = _this$props$detail2.keyName,
              originKey = _this$props$detail2.originKey,
              items = _this$props$detail2.items,
              required = _this$props$detail2.required,
              rest = _objectWithoutProperties(_this$props$detail2, [
                'renderType',
                'description',
                'defaultValue',
                'keyName',
                'originKey',
                'items',
                'required',
              ]); // hook: render content for empty items

            if (renderType === 'radio' && isEmpty(rest.range)) {
              return this.props.onEmpty(keyName);
            }

            var content = null;

            switch (renderType) {
              case 'input':
                content = React__default.createElement(
                  React.Fragment,
                  null,
                  React__default.createElement('input', {
                    name: keyName,
                    type: 'text',
                    defaultValue: defaultValue,
                    maxLength: 50,
                    onChange: this.handleChange,
                    required: required,
                  }),
                  React__default.createElement('p', null, description)
                );
                break;

              case 'number':
                content = React__default.createElement(
                  React.Fragment,
                  null,
                  React__default.createElement('input', {
                    name: keyName,
                    type: 'number',
                    defaultValue: defaultValue,
                    onChange: this.handleChange,
                    min: rest.min,
                    max: rest.max,
                    required: required,
                  }),
                  React__default.createElement(
                    'p',
                    null,
                    'Range: ',
                    rest.min,
                    ' - ',
                    rest.max
                  )
                );
                break;

              case 'radio':
                content = React__default.createElement(
                  React.Fragment, // onChange={this.handleChange}
                  // name={keyName}
                  // value={this.getValue()}
                  null,
                  rest.range.map(function(item, idx) {
                    var value = '';

                    if (isObject(item)) {
                      value = item.value;
                    } else {
                      value = item;
                    }

                    var name =
                      keyName === 'cluster.runtime'
                        ? item.name
                        : _this2.formatLabel(value, originKey);
                    return React__default.createElement(
                      'span',
                      {
                        key: idx,
                      },
                      React__default.createElement(
                        'label',
                        {
                          htmlFor: '',
                        },
                        name
                      ),
                      React__default.createElement('input', {
                        type: 'radio',
                        value: value,
                      })
                    );
                  })
                );
                break;

              case 'select':
                content = React__default.createElement(
                  'select',
                  {
                    onChange: this.handleChange,
                    disabled: items.length === 0,
                    name: keyName,
                    value: this.getValue(),
                  },
                  items.map(function(_ref, idx) {
                    var name = _ref.name,
                      value = _ref.value;
                    return React__default.createElement(
                      'option',
                      {
                        key: idx,
                        value: value,
                      },
                      name
                    );
                  })
                );
                break;

              case 'text':
                content = React__default.createElement('textarea', {
                  name: keyName,
                  defaultValue: defaultValue,
                  maxLength: 1000,
                  onChange: this.handleChange,
                });
                break;

              case 'slider':
                content = React__default.createElement(
                  React.Fragment,
                  null,
                  React__default.createElement(
                    'span',
                    null,
                    React__default.createElement('input', {
                      type: 'number',
                      name: keyName,
                      value: this.getValue(),
                      min: rest.min,
                      max: rest.max,
                      onChange: this.handleChange,
                    }),
                    ' ',
                    'GB'
                  ),
                  React__default.createElement(
                    'p',
                    null,
                    ''
                      .concat(rest.min, 'GB - ')
                      .concat(rest.max, 'GB, The volume size for each instance')
                  )
                );
                break;

              case 'yaml':
                content =
                  rest.yaml &&
                  React__default.createElement(
                    'textarea',
                    {
                      name: keyName,
                      onChange: this.handleChange,
                    },
                    rest.yaml
                  );
                break;

              default:
                break;
            }

            return content;
          },
        },
        {
          key: 'render',
          value: function render() {
            // const { className, detail } = this.props;
            return React__default.createElement(
              'div',
              null,
              this.renderLabel(),
              React__default.createElement('div', null, this.renderItem())
            );
          },
        },
      ]);

      return Section;
    })(React.Component);

  Section.propTypes = {
    className: PropTypes.string,
    detail: PropTypes.shape({
      defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      description: PropTypes.string,
      keyName: PropTypes.string.isRequired,
      // key is reserved by react
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
  Section.defaultProps = {
    detail: {
      description: '',
      keyName: '',
      label: '',
      required: false,
      type: 'string',
    },
    onChange: noop,
    onEmpty: noop,
  };

  var noop$1 = function noop() {};

  var Group =
    /*#__PURE__*/
    (function(_Component) {
      _inherits(Group, _Component);

      function Group() {
        _classCallCheck(this, Group);

        return _possibleConstructorReturn(
          this,
          _getPrototypeOf(Group).apply(this, arguments)
        );
      }

      _createClass(Group, [
        {
          key: 'renderTitle',
          value: function renderTitle() {
            var _this$props = this.props,
              group = _this$props.group,
              seq = _this$props.seq,
              titleCls = _this$props.titleCls;
            var title = this.isNormalGroup
              ? group.title
              : group.label || group.key;
            return React__default.createElement(
              'h2',
              {
                className: titleCls,
              },
              ''
                .concat(seq + 1, '. ')
                .concat(ucfirst(group.labelPrefix), ' ')
                .concat(title)
            );
          },
        },
        {
          key: 'render',
          value: function render() {
            var _this = this;

            var _this$props2 = this.props,
              group = _this$props2.group,
              className = _this$props2.className;
            var items = this.isNormalGroup ? group.items : group.properties;
            return React__default.createElement(
              'div',
              {
                className: className,
              },
              this.renderTitle(),
              items.map(function(item, idx) {
                if (typeof item.toJSON === 'function') {
                  item = item.toJSON();
                }

                return React__default.createElement(Section, {
                  key: idx,
                  detail: item,
                  onChange: _this.props.onChange,
                  onEmpty: _this.props.onEmpty,
                });
              })
            );
          },
        },
        {
          key: 'isNormalGroup',
          get: function get() {
            return Array.isArray(this.props.group.items);
          },
        },
      ]);

      return Group;
    })(React.Component);

  Group.propTypes = {
    group: PropTypes.object,
    onChange: PropTypes.func,
    onEmpty: PropTypes.func,
    seq: PropTypes.number,
    className: PropTypes.string,
    titleCls: PropTypes.string,
  };
  Group.defaultProps = {
    group: {},
    seq: 0,
    onChange: noop$1,
    onEmpty: noop$1,
    className: '',
    titleCls: '',
  };

  var validRenderTypes = [
    'radio', // 'checkbox',
    'input',
    'select',
    'text',
    'slider',
    'number',
    'node-role',
    'yaml',
  ];
  var TEXT_KEYS = ['description']; // keys will be transformed to text area
  // todo

  var NODE_MUST_HAVE_KEYS = ['cpu', 'memory']; // keys to check if object can be normalized to Section

  var featureKeys = ['key'];
  var sectionProto = {
    default: '',
    description: '',
    key: '',
    label: '',
    required: false,
    type: 'string',
    getRenderType: function getRenderType() {
      if (validRenderTypes.includes(this.renderType)) {
        return this.renderType;
      }

      if (TEXT_KEYS.includes(this.key)) {
        return 'text';
      }

      if (
        this.type === 'string' &&
        !this.items &&
        !TEXT_KEYS.includes(this.key) &&
        !(this.range || this.step)
      ) {
        return 'input';
      }

      if (this.type === 'integer' && Array.isArray(this.range)) {
        return 'radio';
      }

      if (
        this.type === 'integer' &&
        isNumber(this.step) &&
        isNumber(this.min) &&
        isNumber(this.max)
      ) {
        return 'slider';
      }

      if (
        this.type === 'integer' &&
        !this.step &&
        (isNumber(this.min) || isNumber(this.max))
      ) {
        return 'number';
      }

      if (this.type === 'string' && Array.isArray(this.items)) {
        return 'select';
      }

      if (this.type === 'array' && isNodeItem(this)) {
        return 'node-role';
      }

      if (typeof this.type === 'string') {
        return Array.isArray(this.range) ? 'radio' : 'input';
      }

      throw Error('unknown render type for section');
    },
    toJSON: function toJSON() {
      // transform to object that react can accept
      var ret = Object.assign({}, this, {
        label: this.label || this.key,
        required:
          typeof this.required === 'boolean'
            ? this.required
            : this.required !== 'false',
        renderType: this.getRenderType(),
      });
      ret.originKey = ret.key;
      ret.keyName = ret.key; // key in react is reserved

      ret.defaultValue = ret['default'];
      delete ret.key;
      delete ret['default']; // generate unique keyName based on each level

      if (ret.keyPrefix) {
        ret.keyName = [ret.keyPrefix, ret.keyName].join('.');
        delete ret.keyPrefix;
      }

      return ret;
    },
  };
  var isNodeItem = function isNodeItem() {
    var item =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!Array.isArray(item.properties)) {
      return false;
    }

    var itemKeys = item.properties.map(function(o) {
      return o.key;
    });
    return NODE_MUST_HAVE_KEYS.every(function(v) {
      return itemKeys.indexOf(v) > -1;
    });
  };
  var genPrefix = function genPrefix(prefix, base) {
    if (typeof prefix === 'string' && prefix) {
      return [prefix, base].join('.');
    }

    return base;
  };

  var factory = function factory() {
    var schema =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var extendProps =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var wrapObj = function wrapObj(obj) {
      var ownKeys = Object.keys(obj);
      var hasFeatureKeys = featureKeys.every(function(v) {
        return ownKeys.indexOf(v) > -1;
      });

      if (!hasFeatureKeys) {
        return obj;
      }

      var inst = Object.create(sectionProto);

      if (Array.isArray(obj.properties)) {
        obj.properties = factory(obj.properties, {
          keyPrefix: genPrefix(extendProps.keyPrefix, obj.key),
        });
      }

      return Object.assign(inst, obj, extendProps);
    };

    if (isObject(schema)) {
      return wrapObj(schema);
    }

    if (Array.isArray(schema)) {
      return schema.filter(Boolean).map(function(prop) {
        return wrapObj(prop);
      });
    }
  };

  var CLUSTER_KEY = 'cluster';
  var NAME_KEY = 'name';
  var DESC_KEY = 'description';
  var ENV_KEY = 'env';

  var SchemaParser =
    /*#__PURE__*/
    (function() {
      function SchemaParser(schema) {
        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        _classCallCheck(this, SchemaParser);

        this.setSchema(schema);
        this.options = Object.assign({}, options);
      }

      _createClass(SchemaParser, [
        {
          key: 'setSchema',
          value: function setSchema() {
            var schema =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : {};

            if (typeof schema === 'string') {
              schema = JSON.parse(schema);
            }

            this.schema = schema;
            return this;
          },
        },
        {
          key: 'valid',
          value: function valid() {
            var schema =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this.schema;
            return (
              isObject(schema) &&
              typeof schema.type === 'string' &&
              Array.isArray(schema.properties)
            );
          },
        },
        {
          key: 'getConfigByKey',
          value: function getConfigByKey(config, key) {
            if (typeof config === 'string' && !key) {
              key = config;
              config = null;
            }

            if (typeof key !== 'string') {
              console.error(
                'key should be string, '.concat(_typeof(key), ' given')
              );
              return;
            }

            config = config || this.schema;

            if (isEmpty(config)) {
              return;
            }

            var properties = config.properties || config;

            if (Array.isArray(properties)) {
              return properties.find(function(v) {
                return v.key === key;
              });
            }

            if (isObject(properties)) {
              return Object.assign({}, properties[key], {
                key: key,
              });
            }
          },
        },
        {
          key: 'getClusterSetting',
          value: function getClusterSetting() {
            return this.getConfigByKey(CLUSTER_KEY);
          },
        },
        {
          key: 'getBasicSetting',
          value: function getBasicSetting() {
            var clusterSetting = this.getClusterSetting();
            var nameConf = this.getConfigByKey(clusterSetting, NAME_KEY);
            var descConf = this.getConfigByKey(clusterSetting, DESC_KEY);
            return factory([nameConf, descConf], {
              keyPrefix: CLUSTER_KEY,
            });
          },
        },
        {
          key: 'getNodeSetting',
          value: function getNodeSetting() {
            var clusterSetting = this.getClusterSetting();

            if (!clusterSetting) {
              return;
            }

            return factory(
              (clusterSetting.properties || []).filter(isNodeItem),
              {
                keyPrefix: 'node',
              }
            );
          },
        },
        {
          key: 'getEnvSetting',
          value: function getEnvSetting() {
            var envSetting = this.getConfigByKey(ENV_KEY);

            if (!envSetting) {
              return;
            }

            return factory(envSetting.properties || [], {
              keyPrefix: 'env',
              labelPrefix: 'env',
            });
          },
        },
        {
          key: 'getVxnetSetting',
          value: function getVxnetSetting() {
            // todo
            return;
          },
        },
        {
          key: 'getEnvDefaultParams',
          value: function getEnvDefaultParams() {
            var env =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this.getEnvSetting();

            if (!Array.isArray(env)) {
              env = [env];
            }

            return env.reduce(function(res, setting) {
              var key = setting.key,
                properties = setting.properties;
              res[key] = (properties || []).reduce(function(r, item) {
                r[item.key] = item['default'];
                return r;
              }, {});
              return res;
            }, {});
          },
        },
        {
          key: 'getRenderGroups',
          value: function getRenderGroups() {
            return [].concat(
              {
                title: 'Basic setting',
                items: this.getBasicSetting(),
              },
              this.getNodeSetting(),
              this.getVxnetSetting(),
              this.getEnvSetting()
            );
          },
        },
      ]);

      return SchemaParser;
    })();
  SchemaParser.factory = factory;

  var noop$2 = function noop() {};

  var Form =
    /*#__PURE__*/
    (function(_Component) {
      _inherits(Form, _Component);

      function Form(props) {
        var _this;

        _classCallCheck(this, Form);

        _this = _possibleConstructorReturn(
          this,
          _getPrototypeOf(Form).call(this, props)
        );
        _this.parser = new SchemaParser();
        return _this;
      }

      _createClass(Form, [
        {
          key: 'render',
          value: function render() {
            var _this$props = this.props,
              schema = _this$props.schema,
              onChange = _this$props.onChange,
              children = _this$props.children,
              className = _this$props.className,
              rest = _objectWithoutProperties(_this$props, [
                'schema',
                'onChange',
                'children',
                'className',
              ]);

            var groups = this.parser.setSchema(schema).getRenderGroups();
            return React__default.createElement(
              'form',
              {
                className: className,
              },
              groups
                .filter(function(gp) {
                  return !isEmpty(gp);
                })
                .map(function(gp, idx) {
                  return React__default.createElement(
                    Group,
                    _extends(
                      {
                        group: gp,
                        onChange: onChange,
                        seq: idx,
                        key: idx,
                      },
                      rest
                    )
                  );
                }),
              children
            );
          },
        },
      ]);

      return Form;
    })(React.Component);

  Form.propTypes = {
    schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    parser: PropTypes.object,
    onChange: PropTypes.func,
  };
  Form.defaultProps = {
    schema: '',
    parser: {},
    onChange: noop$2,
  };

  Form.Group = Group;
  Form.Section = Section;

  exports.Parser = SchemaParser;
  exports.default = Form;

  Object.defineProperty(exports, '__esModule', { value: true });
});
