import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Spin, Alert } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery({
    count: simplified ? 6 : 12,
  });

  const { data } = useGetCryptosQuery(100);

  if (isFetching) return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Spin size="large" />
    </div>
  );

  if (error) {
    console.error('News API Error:', error);
    return (
      <Alert
        message="Error"
        description="Failed to load news. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  const newsData = cryptoNews?.data?.Data;

  if (!newsData || newsData.length === 0) {
    return (
      <Alert
        message="No News"
        description="No news articles available at the moment."
        type="info"
        showIcon
      />
    );
  }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => console.log(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option value={currency.name} key={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {newsData.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news.imageurl || demoImage}
                  alt="news"
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = demoImage;
                  }}
                />
              </div>
              <p>
                {news.body?.length > 100
                  ? `${news.body.substring(0, 100)}...`
                  : news.body}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news.source_info?.img || demoImage}
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.source_info?.name || news.source || 'Unknown Source'}
                  </Text>
                </div>
                <Text>{moment.unix(news.published_on).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
