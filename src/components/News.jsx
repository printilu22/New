import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;

const demoImage = 'https://www.cryptocompare.com/media/350991/crypto-news.png';

const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery({
    count: simplified ? 6 : 12,
  });
  if (isFetching) return <span style={{ color: 'white' }}>Loading...</span>;

  if (error) {
    return 'Error loading news';
  }

  if (!cryptoNews?.value) {
    return 'No news available';
  }

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

// Add PropTypes validation
News.propTypes = {
  simplified: PropTypes.bool,
};

export default News;
