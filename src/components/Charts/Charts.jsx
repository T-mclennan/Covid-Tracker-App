import React, { useState, useEffect } from 'react';
import { fetchDailyData, fetchSFData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Charts.module.css';

const Charts = ({ data: { data } }) => {
  console.log('Inside chart!');
  console.log(data);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      // setDailyData(await fetchDailyData());
      const data = await fetchSFData();
      console.log(`data fetch: `);
      console.log(data.data);
      setDailyData(data.data);
    };
    console.log('Daily Data');
    console.log(dailyData);

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.reverse().map(({ result_date }) => {
          return result_date.slice(6, 10);
        }),
        datasets: [
          {
            data: dailyData.map(({ pos }) => pos),
            // label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Rate of cases in San Francisco` },
      }}
      height={window.innerHeight * 0.6}
      width={window.innerWidth * 0.7}
      options={{ maintainAspectRatio: false, legend: false }}
    />
  ) : null;

  // const lineChart = dailyData.length ? (
  //   <Line
  //     data={{
  //       labels: dailyData.map(({ date }) => {
  //         return date.slice(6, 10);
  //       }),
  //       datasets: [
  //         {
  //           data: dailyData.map(({ confirmed }) => confirmed),
  //           // label: 'Infected',
  //           borderColor: '#3333ff',
  //           fill: true,
  //         },
  //         {
  //           data: dailyData.map(({ deaths }) => deaths),
  //           label: 'Deaths',
  //           borderColor: 'red',
  //           backgroundColor: 'rgba(255, 0, 0, 0.5)',
  //           fill: true,
  //         },
  //       ],
  //     }}
  //     options={{
  //       legend: { display: false },
  //       title: { display: true, text: `Current state in ${country}` },
  //     }}
  //     // width={50}
  //     height={window.innerHeight * 0.6}
  //     width={window.innerWidth * 0.7}
  //     options={{ maintainAspectRatio: false, legend: false }}
  //   />
  // ) : null;

  // const barChart = confirmed ? (
  //   <Bar
  //     data={{
  //       labels: ['Infected', 'Recovered', 'Deaths'],
  //       datasets: [
  //         {
  //           label: 'People',
  //           backgroundColor: [
  //             'rgba(1, 1, 255, 0.5)',
  //             'rgba(0, 255, 0, 0.5)',
  //             'rgba(255, 0, 0, 0.5)',
  //           ],
  //           data: [confirmed.value, recovered.value, deaths.value],
  //         },
  //       ],
  //     }}
  //     options={{
  //       legend: { display: false },
  //       title: { display: true, text: `Current state in ${country}` },
  //     }}
  //   />
  // ) : null;

  return (
    // <div className={styles.container}>{country ? barChart : lineChart}</div>

    <div className={styles.container}>{lineChart}</div>
  );
};

export default Charts;
