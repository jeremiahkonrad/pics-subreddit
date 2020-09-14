/** @jsx jsx */
// ^ enables emotion `css` syntax to be used
import React from 'react';
import { Layout, Row, Col, List, Avatar } from 'antd';
import { css, jsx } from '@emotion/core';
import ImageDetail from './components/image-detail/image-detail';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;

const tempListData = [
  {
    title: 'Pic Title 1',
  },
  {
    title: 'Pic Title 2',
  },
  {
    title: 'Pic Title 3',
  },
  {
    title: 'Pic Title 4',
  },
];

const App = () => {
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
          /pics
        </h2>
      </Header>
      <Content>
        <Row>
          <Col span={24} md={{ span: 12, push: 12 }}>
            <div
              css={css`
                position: sticky;
                top: 64px;
              `}
            >
              <ImageDetail />
            </div>
          </Col>
          <Col span={24} md={{ span: 12, pull: 12 }}>
            <List
              css={css`
                min-height: 100vh;
                margin: 1rem;
              `}
              itemLayout="horizontal"
              dataSource={tempListData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default App;
