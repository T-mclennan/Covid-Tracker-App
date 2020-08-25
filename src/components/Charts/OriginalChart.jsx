import React, { useState, useEffect } from 'react';
import { fetchData, makeSevenDayAverage } from './utils';
import { fetchMapGeoJSON, fetchTestApi } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';
import { criteriaValues, dateRangeValues } from '../Charts/ChartConfig';
import styles from './OriginalChart.module.css';
import SimpleSelect from '../Select/SimpleSelect';
import { MapChart } from './MapChart';

const OriginalChart = () => {
  const [dates, setDates] = useState([]);
  const [primaryData, setPrimaryData] = useState([]);
  const [primaryLabel, setPrimaryLabel] = useState('');
  const [secondaryData, setSecondaryData] = useState([]);
  const [secondaryLabel, setSecondaryLabel] = useState('');
  const [otherData, setOtherData] = useState([]);

  const [dayCount, setDayCount] = useState(90);
  const [criteria, setCriteria] = useState('SF_CASE_DATA');
  const [chartStyle, setChartStyle] = useState('line');

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchData(criteria);
      const testData = await fetchTestApi();
      console.log('useEffect test');
      console.log(testData);
      // console.log(data);
      if (criteria !== 'MAP_DATA') setData(data);
      setDayCount(isMobile ? 30 : dayCount);
    };

    fetchAPI();
  }, [criteria]);

  const setData = ({
    primary,
    secondary,
    label,
    primaryLabel,
    secondaryLabel,
    other,
  }) => {
    setPrimaryData(primary);
    setSecondaryData(secondary);
    setPrimaryLabel(primaryLabel);
    setSecondaryLabel(secondaryLabel);
    setDates(label);
    setOtherData(other);
  };

  const inputBar = (
    <div className={styles.inputBar}>
      <SimpleSelect
        action={setCriteria}
        heading='Criteria'
        values={criteriaValues}
        defaultValue={'SF_CASE_DATA'}
      />
      {!isMobile && (
        <SimpleSelect
          action={setDayCount}
          heading='Date Range'
          values={dateRangeValues}
          defaultValue={30}
        />
      )}
      {!isMobile && (
        <SimpleSelect action={{}} heading='Range' values={[{}, {}, {}]} />
      )}
    </div>
  );

  const legend = {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: '#323130',
      fontSize: 14,
    },
  };

  const length = dates.length;

  const sevenDayAverage = {
    label: '7-day average',
    type: 'line',
    data: makeSevenDayAverage(primaryData).slice(length - dayCount, length - 3),
    fill: false,
    borderColor: 'rgb(145, 142, 244)',
    backgroundColor: 'rgb(145, 142, 244)',
    pointBorderColor: 'rgb(145, 142, 244)',
    pointBackgroundColor: 'rgb(145, 142, 244)',
    pointHoverBackgroundColor: 'rgb(66, 129, 164)',
    pointHoverBorderColor: 'rgb(66, 129, 164)',
    yAxisID: 'y-axis-1',
  };

  const secondary = {
    label: secondaryLabel,
    type: 'bar',
    data: secondaryData.slice(length - dayCount, length - 3),
    fill: false,
    backgroundColor: 'blue',
    borderColor: 'blue',
    hoverBackgroundColor: 'rgba(173,216,230 ,1 )',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1',
  };

  const primary = {
    label: primaryLabel,
    type: 'bar',
    data: primaryData.slice(length - dayCount, length - 3),
    fill: false,
    backgroundColor: 'rgba(173,216,230 ,0.5 )',
    borderColor: '#3333ff',
    hoverBackgroundColor: 'rgba(173,216,230 ,1 )',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1',
  };

  // const dataProps = (canvas) => {
  //   const ctx = canvas.getContext('2d');
  //   const gradient = ctx.createLinearGradient(0, 0, 100, 0);
  //   const length = dates.length;
  //   return {
  //     backgroundColor: gradient,
  //     labels: dates.slice(length - dayCount, length - 3),
  //     datasets: [
  //       {
  //         label: primaryLabel,
  //         data: primaryData.slice(length - dayCount, length - 3),
  //         borderColor: '#3333ff',
  //         backgroundColor: 'rgba(173,216,230 ,0.5 )',
  //         fill: true,
  //       },
  //     ],
  //   };
  // };
  const newData = {
    datasets: [secondaryData.length ? secondary : sevenDayAverage, primary],
  };

  const options = {
    responsive: true,
    labels: dates.slice(length - dayCount, length - 3),
    tooltips: {
      mode: 'label',
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          stacked: true,
          labels: dates.slice(length - dayCount, length - 3),
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
          stacked: true,
        },
        // {
        //   type: 'linear',
        //   display: true,
        //   position: 'right',
        //   id: 'y-axis-2',
        //   gridLines: {
        //     display: false,
        //   },
        //   labels: {
        //     show: true,
        //   },
        // },
      ],
    },
  };

  const lineChart = dates.length ? (
    <Line
      data={newData}
      options={{
        legend: { display: false },
        title: { display: true, text: `Rate of cases in San Francisco` },
      }}
      // height={window.innerHeight * 0.3}
      height={isMobile ? window.innerHeight * 0.45 : '100vh'}
      width={'auto'}
      // width={window.innerWidth * 0.3}
      // options={{ maintainAspectRatio: false, legend: false }}
      options={options}
      legend={legend}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {inputBar}
      {criteria === 'MAP_DATA' ? <MapChart /> : lineChart}
    </div>
  );
};

export default OriginalChart;
