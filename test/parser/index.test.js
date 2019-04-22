import Parser from '<src>/parser';
import elk from '../../fixtures/elk';

describe(`Schema Parser`, () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  });

  it(`Accept valid json string as schema`, () => {
    expect(() => {
      parser.setSchema('{}');
    }).not.toThrow();

    expect(parser).toMatchObject({
      schema: {},
    });
  });

  it(`Throw error when schema is invalid json string`, () => {
    expect(() => {
      parser.setSchema('invalid schema');
    }).toThrow();
  });

  it(`Valid schema must contain properties key`, () => {
    parser.setSchema('{}');
    expect(parser.valid()).not.toBeTruthy();
  });

  describe(`Real-world elk schema`, () => {
    let parser;
    beforeAll(() => {
      parser = new Parser(elk);
    });

    it(`Schema is valid`, () => {
      expect(parser.valid()).toBeTruthy();
    });

    it(`getClusterSetting`, () => {
      const clusterSetting = parser.getClusterSetting();
      expect(clusterSetting).toMatchObject({
        description: expect.any(String),
        key: 'cluster',
        properties: expect.any(Array),
      });
    });

    it(`getBasicSetting`, () => {
      const basicSetting = parser.getBasicSetting();
      expect(basicSetting.map(v => v.key)).toEqual(['name', 'description']);
    });

    it(`getNodeSetting`, () => {
      const nodeSetting = parser.getNodeSetting();
      // console.log('node setting: ', nodeSetting)
      expect(nodeSetting).toHaveLength(3);
      expect(nodeSetting.map(v => v.key)).toEqual([
        'es_node',
        'kbn_node',
        'lst_node',
      ]);

      const es_node = nodeSetting.find(v => v.key === 'es_node');
      expect('getRenderType' in es_node).toBeTruthy();
      expect(typeof es_node.getRenderType()).toBe('string');
    });
  });
});
