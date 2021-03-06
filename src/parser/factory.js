import { isObject, isNumber } from '../utils';

const validRenderTypes = [
  'radio',
  // 'checkbox',
  'input',
  'select',
  'text',
  'slider',
  'number',
  'node-role',
  'yaml',

  // todo: special types
  // 'loadbalancer',
  // 'accesskey'
];

const TEXT_KEYS = ['description']; // keys will be transformed to text area

// todo
const NODE_MUST_HAVE_KEYS = ['cpu', 'memory'];

// keys to check if object can be normalized to Section
const featureKeys = ['key'];

const sectionProto = {
  default: '',
  description: '',
  key: '',
  label: '',
  required: false,
  type: 'string',
  getRenderType() {
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

    throw Error(`unknown render type for section`);
  },
  toJSON() {
    // transform to object that react can accept
    const ret = Object.assign({}, this, {
      label: this.label || this.key,
      required:
        typeof this.required === 'boolean'
          ? this.required
          : this.required !== 'false',
      renderType: this.getRenderType(),
    });

    ret.originKey = ret.key;
    ret.keyName = ret.key; // key in react is reserved
    ret.defaultValue = ret.default;

    delete ret.key;
    delete ret.default;

    // generate unique keyName based on each level
    if (ret.keyPrefix) {
      ret.keyName = [ret.keyPrefix, ret.keyName].join('.');
      delete ret.keyPrefix;
    }

    return ret;
  },
};

export const isNodeItem = (item = {}) => {
  if (!Array.isArray(item.properties)) {
    return false;
  }

  const itemKeys = item.properties.map(o => o.key);

  return NODE_MUST_HAVE_KEYS.every(v => itemKeys.indexOf(v) > -1);
};

export const genPrefix = (prefix, base) => {
  if (typeof prefix === 'string' && prefix) {
    return [prefix, base].join('.');
  }
  return base;
};

const factory = (schema = {}, extendProps = {}) => {
  const wrapObj = obj => {
    const ownKeys = Object.keys(obj);
    const hasFeatureKeys = featureKeys.every(v => ownKeys.indexOf(v) > -1);

    if (!hasFeatureKeys) {
      return obj;
    }

    const inst = Object.create(sectionProto);

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
    return schema.filter(Boolean).map(prop => wrapObj(prop));
  }
};

export default factory;
