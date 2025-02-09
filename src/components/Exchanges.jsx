import React from 'react';
import { Row, Col, Typography, Collapse, Avatar, Statistic } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoExchangesApi';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchanges, isFetching, error } = useGetExchangesQuery();

  if (isFetching) return 'Loading...';
  if (error) return 'Error loading exchanges';
  if (!exchanges) return 'No exchanges data available';

  return (
    <>
      <Row>
        <Col span={6}><Title level={5}>Exchange</Title></Col>
        <Col span={6}><Title level={5}>24h Trade Volume</Title></Col>
        <Col span={6}><Title level={5}>Trust Score</Title></Col>
        <Col span={6}><Title level={5}>Established</Title></Col>
      </Row>
      <Row>
        {exchanges.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>
                      <Statistic 
                        value={millify(exchange.trade_volume_24h_btc)} 
                        suffix="BTC"
                      />
                    </Col>
                    <Col span={6}>
                      <Text>{exchange.trust_score}</Text>
                    </Col>
                    <Col span={6}>
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
    </>
  );
};

export default Exchanges;
