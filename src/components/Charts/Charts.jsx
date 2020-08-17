import React, { useState, useEffect } from 'react';
import { fetchSFData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';
import { criteriaValues, dateRangeValues } from '../Charts/ChartConfig';
import styles from './Charts.module.css';
import SimpleSelect from '../Select/SimpleSelect';

const Charts = ({ data: { data } }) => {
  const [dailyData, setDailyData] = useState([]);
  const [dayCount, setDayCount] = useState(0);
  const [criteria, setCriteria] = useState('Daily Infections');
  const [chartStyle, setChartStyle] = useState('line');

  // Data in the form of:

  // indeterminate: "6.0"
  // last_updated_at: "2020-08-14T15:30:00.000"
  // neg: "1853.0"
  // pct: "0.012260127931769723"
  // pos: "23.0"
  // specimen_collection_date: "2020-06-07T00:00:00.000"
  // tests: "1882.0"

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchSFData();
      setDailyData(data.data);
      setDayCount(isMobile ? 30 : 120);
    };

    fetchAPI();
  }, []);

  const inputBar = (
    <div className={styles.inputBar}>
      <SimpleSelect
        action={setCriteria}
        heading='Criteria'
        values={criteriaValues}
        defaultValue={'Daily infections'}
      />
      {!isMobile && (
        <SimpleSelect
          action={setCriteria}
          heading='Criteria'
          values={dateRangeValues}
        />
      )}
      {!isMobile && (
        <SimpleSelect action={{}} heading='Range' values={[{}, {}, {}]} />
      )}
    </div>
  );

  const dataProps = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 100, 0);
    const length = dailyData.length;
    return {
      backgroundColor: gradient,
      labels: dailyData
        .slice(length - dayCount)
        .map(({ specimen_collection_date }) => {
          return specimen_collection_date.slice(5, 10);
        }),
      datasets: [
        {
          data: dailyData.slice(length - dayCount).map(({ pos }) => pos),
          borderColor: '#3333ff',
          backgroundColor: 'lightblue',
          fill: true,
        },
      ],
    };
  };

  const lineChart = dailyData.length ? (
    <Line
      data={dataProps}
      options={{
        legend: { display: false },
        title: { display: true, text: `Rate of cases in San Francisco` },
      }}
      height={window.innerHeight * 0.3}
      width={window.innerWidth * 0.3}
      options={{ maintainAspectRatio: false, legend: false }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {inputBar}
      {lineChart}
    </div>
  );
};

export default Charts;
