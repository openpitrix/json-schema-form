import factory, { isNodeItem } from './factory';
import * as utils from '../utils';

const CLUSTER_KEY = 'cluster';
const NAME_KEY = 'name';
const DESC_KEY = 'description';
const SUBNET_KEY = 'subnet';
const ENV_KEY = 'env';

export default class SchemaParser {
  constructor(schema, options = {}) {
    this.setSchema(schema);
    this.options = Object.assign({}, options);
  }

  setSchema(schema = {}) {
    if (typeof schema === 'string') {
      schema = JSON.parse(schema);
    }
    this.schema = schema;
    return this;
  }

  valid(schema = this.schema) {
    return (
      utils.isObject(schema) &&
      typeof schema.type === 'string' &&
      Array.isArray(schema.properties)
    );
  }

  getConfigByKey(config, key) {
    if (typeof config === 'string' && !key) {
      key = config;
      config = null;
    }

    if (typeof key !== 'string') {
      console.error(`key should be string, ${typeof key} given`);
      return;
    }

    config = config || this.schema;
    if (utils.isEmpty(config)) {
      return;
    }

    const properties = config.properties || config;

    if (Array.isArray(properties)) {
      return properties.find(v => v.key === key);
    }
    if (utils.isObject(properties)) {
      return Object.assign({}, properties[key], { key });
    }
  }

  getClusterSetting() {
    return this.getConfigByKey(CLUSTER_KEY);
  }

  getBasicSetting() {
    const clusterSetting = this.getClusterSetting();
    const nameConf = this.getConfigByKey(clusterSetting, NAME_KEY);
    const descConf = this.getConfigByKey(clusterSetting, DESC_KEY);

    return factory([nameConf, descConf], { keyPrefix: CLUSTER_KEY });
  }

  getNodeSetting() {
    const clusterSetting = this.getClusterSetting();
    if (!clusterSetting) {
      return;
    }

    return factory((clusterSetting.properties || []).filter(isNodeItem), {
      keyPrefix: 'node',
    });
  }

  getEnvSetting() {
    const envSetting = this.getConfigByKey(ENV_KEY);
    if (!envSetting) {
      return;
    }

    return factory(envSetting.properties || [], {
      keyPrefix: 'env',
      labelPrefix: 'env',
    });
  }

  getVxnetSetting() {
    // todo
    return;
  }

  getEnvDefaultParams(env = this.getEnvSetting()) {
    if (!Array.isArray(env)) {
      env = [env];
    }

    return env.reduce((res, setting) => {
      const { key, properties } = setting;
      res[key] = (properties || []).reduce((r, item) => {
        r[item.key] = item.default;
        return r;
      }, {});

      return res;
    }, {});
  }

  getRenderGroups() {
    return [].concat(
      { title: 'Basic setting', items: this.getBasicSetting() },
      this.getNodeSetting(),
      this.getVxnetSetting(),
      this.getEnvSetting()
    );
  }
}

SchemaParser.factory = factory;
