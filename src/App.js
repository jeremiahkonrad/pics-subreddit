/** @jsx jsx */
// ^ enables emotion `css` syntax to be used
import { useEffect, useState } from 'react';
import { Layout, Row, Col, List, Avatar, Button, Skeleton } from 'antd';
import { css, jsx } from '@emotion/core';
import ImageDetail from './components/image-detail/image-detail';
import { REDDIT_PICS_BASE_ENDPOINT } from './constants';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Content } = Layout;

const App = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pics, setPics] = useState([]);
  const [lastSeenHash, setLastSeenHash] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const ITEM_FETCH_LIMIT = 10;

  useEffect(() => {
    initLoading &&
      fetch(`${REDDIT_PICS_BASE_ENDPOINT}?jsonp=&limit=${ITEM_FETCH_LIMIT}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          const data = json?.data || {};
          setInitLoading(false);
          setPics(data?.children);
          setFetchedData(data?.children);
          // reddit api passes us a value to help keep track of the next page of items
          setLastSeenHash(data?.after);
        });
  }, [initLoading]);

  const onLoadMore = () => {
    setIsLoading(true);
    setPics(
      // prefill the acting array of pics with the expected return items, stubbing expected data
      // these expectant data items will be rendered in a Skeleton state, by ANT design
      pics.concat(
        [...new Array(ITEM_FETCH_LIMIT)].map(() => ({
          loading: true,
          data: {
            title: '',
            thumbnail: '',
          },
        }))
      )
    );

    fetch(
      `${REDDIT_PICS_BASE_ENDPOINT}?jsonp=&limit=${ITEM_FETCH_LIMIT}&after=${lastSeenHash}&count=${pics.length}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const fetchedPics = json?.data?.children || [];
        const latestData = [...fetchedData, ...fetchedPics];

        setFetchedData(latestData);
        setPics(latestData);
        setLastSeenHash(json?.data?.after);
        setIsLoading(false);
      });
  };

  const loadMore =
    !initLoading && !isLoading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const handleImageClick = (item) => setSelectedImage(item);

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
              <ImageDetail image={selectedImage} />
            </div>
          </Col>
          <Col span={24} md={{ span: 12, pull: 12 }}>
            <List
              css={css`
                margin: 1rem;
              `}
              itemLayout="horizontal"
              dataSource={pics}
              loadMore={loadMore}
              renderItem={(item) => {
                const { thumbnail, title } = item?.data; // we have url too
                return (
                  <List.Item
                    onClick={() => {
                      handleImageClick(item.data);
                    }}
                    css={css`
                      cursor: pointer;
                    `}
                  >
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={thumbnail} />}
                        title={title}
                      />
                    </Skeleton>
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
