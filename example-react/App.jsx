import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import _ from 'lodash';

import Form, { Parser } from 'json-schema-form';

import elk from '../fixtures/elk';
import zk from '../fixtures/zk';
import wordpress from '../fixtures/wordpress';
import env from '../fixtures/env';

const schemas = {
  elk,
  zk,
  wordpress,
  env,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentApp: '',
      mode: 'json',
    };

    this.parser = new Parser();
  }
  componentDidMount() {
    const { currentApp } = this.state;
    if (!currentApp) {
      this.setState({
        currentApp: Object.keys(schemas)[0],
      });
    }
  }

  handleClickApp = app => {
    this.setState({
      currentApp: app,
    });
  };

  handleToggleMode = mode => {
    this.setState({
      mode,
    });
  };

  handleChangeForm = (fieldName, val) => {
    console.log(`change: ${fieldName}: current val: ${val}`);
  };

  renderNav() {
    const { currentApp } = this.state;

    return (
      <Nav>
        {Object.keys(schemas).map(app => (
          <li
            onClick={() => this.handleClickApp(app)}
            key={app}
            className={classnames({ active: currentApp === app })}
          >
            {app}
          </li>
        ))}
      </Nav>
    );
  }

  renderToggleModeBtns() {
    const { mode } = this.state;

    return (
      <ToggleBtns>
        {['json', 'view'].map(item => (
          <a
            href="#"
            key={item}
            className={classnames({ active: item === mode })}
            onClick={() => this.handleToggleMode(item)}
          >
            {item}
          </a>
        ))}
      </ToggleBtns>
    );
  }

  renderForm(schema) {
    return <Form schema={schema} onChange={this.handleChangeForm} />;
  }

  renderContent() {
    const { currentApp, mode } = this.state;
    const curSchema = schemas[currentApp] || '';

    return (
      <Content>
        {this.renderToggleModeBtns()}
        {mode === 'json' ? (
          <pre>
            {_.isObject(curSchema)
              ? JSON.stringify(curSchema, null, 2)
              : curSchema}
          </pre>
        ) : (
          <div className="form-wrap">{this.renderForm(curSchema)}</div>
        )}
      </Content>
    );
  }

  render() {
    return (
      <Wrapper>
        <Title>json-schema parser</Title>
        {this.renderNav()}
        {this.renderContent()}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 70px;
  border: 1px solid #ccc;
`;

const Title = styled.h2`
  position: absolute;
  top: 10px;
  font-size: 1.5rem;
`;
const Nav = styled.ul`
  background: #ededed;
  width: 8rem;
  margin: 0;
  padding: 0;

  > li {
    list-style-type: none;
    cursor: pointer;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    &:hover,
    &.active {
      background: #8bc7fa;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Content = styled.div`
  position: relative;
  flex: 1;
  //background: #f5f5d2;
  overflow: scroll;

  .form-wrap {
    padding: 20px;
  }
`;

const ToggleBtns = styled.div`
  display: inline-block;
  position: absolute;
  right: 15px;
  margin-top: 5px;

  > a {
    font-size: 12px;
    text-decoration: none;
    padding: 2px 6px;
    margin-right: 4px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: azure;
    &.active {
      background: blue;
      color: white;
    }
  }
`;
