/** @jsx jsx */
// ^ enables emotion `css` syntax to be used
import React from 'react';
import { Layout, Row, Col } from 'antd';
import { css, jsx } from '@emotion/core';

import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Header
        css={css`
          top: 0;
          position: sticky;
          z-index: 1;
          width: 100%;
        `}
      >
        <h2
          css={css`
            color: white;
          `}
        >
          Scroll to find an interesting picture, click it to learn more!
        </h2>
      </Header>
      <Content>
        <Row>
          <Col span={12}>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>Let's list the images here</p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </Col>
          <Col span={12}>
            <div
              css={css`
                position: sticky;
                top: 64px;
              `}
            >
              Details
            </div>
          </Col>
        </Row>
      </Content>
      <Footer>a /pics browser</Footer>
    </div>
  );
}

export default App;
