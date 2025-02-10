import React from 'react';
import { Row, Col, Typography, Collapse, Avatar, Statistic, Spin } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoExchangesApi';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchanges, isFetching, error } = useGetExchangesQuery();

  if (isFetching) return <Spin size="large" />;
  if (error) return 'Error loading exchanges';
  if (!exchanges) return 'No exchanges data available';

  return (
    <div className="exchange-container">
      <Title level={3} className="exchange-title" style={{ color: "white" }}>Crypto Exchanges</Title>
      <Row gutter={[16, 16]} className="exchange-header" style={{inbetwee: '10px'}}>
        <Col span={6}><Text strong style={{ color: "white" }}>Exchange</Text></Col>
        <Col span={6}><Text strong style={{ color: "white" }}>24h Trade Volume</Text></Col>
        <Col span={6}><Text strong style={{ color: "white" }}>Trust Score</Text></Col>
        <Col span={6}><Text strong style={{ color: "white" }}>Established</Text></Col>
      </Row>
      <Row gutter={[16, 16]} className="exchange-body">
        {exchanges.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse accordion>
              <Panel
                key={exchange.id}
                className="exchange-panel"
                header={(
                  <Row align="middle" className="exchange-row">
                    <Col span={6} className="exchange-col">
                      <Avatar className="exchange-avatar" src={exchange.image} />
                      <Text className="exchange-name">{exchange.name}</Text>
                    </Col>
                    <Col span={6} className="exchange-col">
                      <Statistic value={millify(exchange.trade_volume_24h_btc)} suffix="BTC" />
                    </Col>
                    <Col span={6} className="exchange-col">
                      <Text>{exchange.trust_score || 'N/A'}</Text>
                    </Col>
                    <Col span={6} className="exchange-col">
                      <Text>{exchange.year_established || 'N/A'}</Text>
                    </Col>
                  </Row>
                )}
              >
                <div className="exchange-details">
                  <Text><strong>Website:</strong> <a href={exchange.url} target="_blank" rel="noreferrer">{exchange.url}</a></Text>
                  <br />
                  <Text><strong>Description:</strong> {exchange.description ? HTMLReactParser(exchange.description) : 'No description available'}</Text>
                  <br />
                  <Text><strong>Country:</strong> {exchange.country || 'Not specified'}</Text>
                </div>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;
