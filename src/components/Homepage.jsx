import React, { useEffect } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Card, Button } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
import { useTheme } from '../ThemeContext';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  

  if (isFetching) return <Loader />;

  return (
    <>

<Title level={2} className="heading" style={{ color: "white" }}>Global Crypto Stats</Title>


<div className="stats-container"  style={{ backgroundColor: "#030a18" }}>
  {[
    { title: "Total Cryptocurrencies", value: globalStats.total },
    { title: "Total Exchanges", value: millify(globalStats.totalExchanges) },
    { title: "Total Market Cap", value: `$${millify(globalStats.totalMarketCap)}` },
    { title: "Total 24h Volume", value: `$${millify(globalStats.total24hVolume)}` },
    { title: "Total Markets", value: millify(globalStats.totalMarkets) }
  ].map((stat, index) => (
    <Card key={index} className="stat-card" >
      <Statistic title={stat.title} value={stat.value} />
    </Card>
  ))}
</div>

      <div className="home-heading-container" style={{ backgroundColor: "#030a18" }}>
        <Title level={2} className="home-title" style={{ color: "white" }}>Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title" style={{ color: "white" }}>Latest Crypto News</Title>
        <Title level={3}><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
