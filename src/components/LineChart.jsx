import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from 'recharts';
import moment from 'moment';
import './LineChart.css';
import PropTypes from 'prop-types';

const CryptoChart = ({ coinHistory, currentPrice, coinName }) => {
  useEffect(() =>
    // Cleanup function
    () => {
      // Clear any subscriptions or timeouts if added in future
    },
   []);

  if (!coinHistory?.data?.history) {
    return <div className="chart-wrapper">No data available</div>;
  }

  // Add error boundary
  try {
    const data = coinHistory.data.history.map((item) => ({
      date: moment(item.timestamp * 1000).format('MMM DD, YYYY'),
      price: parseFloat(item.price) || 0, // Fallback to 0 if parsing fails
    })).reverse();

    const maxPrice = Math.max(...data.map((item) => item.price));
    const maxPricePoint = data.find((item) => item.price === maxPrice);

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`Date: ${label}`}</p>
            <p className="price">{`Price: $${Number(payload[0].value).toFixed(2)}`}</p>
          </div>
        );
      }
      return null;
    };

    // Add prop-types for CustomTooltip
    CustomTooltip.propTypes = {
      active: PropTypes.bool,
      payload: PropTypes.array,
      label: PropTypes.string,
    };

    return (
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 100,
              left: 60,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={60}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              label={{
                value: 'Price in USD',
                angle: -90,
                position: 'insideLeft',
                offset: -45,
                style: {
                  textAnchor: 'middle',
                  fill: '#666',
                  fontSize: '14px',
                },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine
              y={currentPrice}
              stroke="#1677ff"
              strokeDasharray="3 3"
            >
              <Label
                value="Current Price"
                position="insideRight"
                fill="#1677ff"
                fontSize={12}
                offset={10}
              />
            </ReferenceLine>
            {maxPrice && (
              <ReferenceLine
                y={maxPrice}
                stroke="#52c41a"
                strokeDasharray="3 3"
              >
                <Label
                  value={`ATH: $${maxPrice.toFixed(2)}`}
                  position="insideRight"
                  fill="#52c41a"
                  fontSize={12}
                  offset={10}
                />
              </ReferenceLine>
            )}
            {maxPricePoint && (
              <ReferenceLine
                x={maxPricePoint.date}
                stroke="#52c41a"
                label={{ value: 'ATH Date', position: 'top' }}
              />
            )}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#0071bd"
              dot={false}
              activeDot={{ r: 8 }}
              name={coinName}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    // console.error('Chart data processing error:', error);
    return <div className="chart-wrapper">Error processing chart data</div>;
  }
};

// Add PropTypes for type checking
CryptoChart.propTypes = {
  coinHistory: PropTypes.shape({
    data: PropTypes.shape({
      history: PropTypes.array,
    }),
  }),
  currentPrice: PropTypes.number,
  coinName: PropTypes.string.isRequired,
};

CryptoChart.defaultProps = {
  coinHistory: {
    data: {
      history: [],
    },
  },
  currentPrice: 0,
};

export default CryptoChart;
