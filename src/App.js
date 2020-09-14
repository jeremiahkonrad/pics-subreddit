/** @jsx jsx */
// ^ enables emotion `css` syntax to be used
import { useEffect, useState } from 'react';
import { Layout, Row, Col, List, Avatar } from 'antd';
import { css, jsx } from '@emotion/core';
import ImageDetail from './components/image-detail/image-detail';
import { REDDIT_PICS_BASE_ENDPOINT } from './constants';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Content } = Layout;

const App = () => {
  const [pics, setPics] = useState([]);

  useEffect(() => {
    fetch(`${REDDIT_PICS_BASE_ENDPOINT}?jsonp=`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => setPics(json?.data?.children || []));
  }, []);

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
              dataSource={pics}
              renderItem={(item) => {
                console.log({ item });

                const { thumbnail, title, url } = item?.data;
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={thumbnail} />}
                      title={title}
                    />
                  </List.Item>
                );
              }}
            />
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default App;
