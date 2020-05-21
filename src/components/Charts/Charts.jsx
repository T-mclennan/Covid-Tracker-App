import React, { useState, useEffect } from 'react';
import { fetchDailyData, fetchSFData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Charts.module.css';

const Charts = ({ data: { data } }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      // setDailyData(await fetchDailyData());
      const data = await fetchSFData();
      console.log(`data fetch: `);
      console.log(data);
      setDailyData(data.data);
    };
    console.log('Daily Data');
    console.log(dailyData);

    fetchAPI();
  }, []);

  const inputBar = <div className={styles.inputBar}>this is input</div>;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.reverse().map(({ result_date }) => {
          return result_date.slice(5, 10);
        }),
        datasets: [
          {
            data: dailyData.map(({ pos }) => pos),
            // label: 'Infected',
            borderColor: '#3333ff',
            backgroundColor: 'lightblue',
            fill: true,
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Rate of cases in San Francisco` },
      }}
      height={window.innerHeight * 0.6}
      width={window.innerWidth * 0.6}
      options={{ maintainAspectRatio: false, legend: false }}
    />
  ) : null;

  return (
    // <div className={styles.container}>{country ? barChart : lineChart}</div>

    <div className={styles.container}>
      {inputBar}
      {lineChart}
    </div>
  );
};

export default Charts;
