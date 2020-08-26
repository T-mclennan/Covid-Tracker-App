import React, { useState, useEffect } from 'react';
import { fetchData, makeSevenDayAverage } from './utils';
import { fetchTestApi } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';
import {
  dataSetLabels,
  dateRangeValues,
  fetchSecondary,
} from '../Charts/ChartConfig';
import styles from './OriginalChart.module.css';
import SimpleSelect from '../Select/SimpleSelect';
import { MapChart } from './MapChart';

const OriginalChart = (props) => {
  const [dates, setDates] = useState([]);
  const [primaryData, setPrimaryData] = useState([]);
  const [primaryLabel, setPrimaryLabel] = useState('');
  const [secondaryData, setSecondaryData] = useState([]);
  const [secondaryLabel, setSecondaryLabel] = useState('');
  const [otherData, setOtherData] = useState([]);

  const [dayCount, setDayCount] = useState(90);
  const [criteria, setCriteria] = useState('SF_CASE_DATA');
  const [subCatagory, setSubCatagory] = useState('default');
  const [chartStyle, setChartStyle] = useState('line');

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchData(criteria);
      const testData = await fetchTestApi();
      // console.log('useEffect test');
      // console.log(testData);
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
    source,
    date,
  }) => {
    const { setSource, setDate } = props;
    setPrimaryData(primary);
    setSecondaryData(secondary);
    setPrimaryLabel(primaryLabel);
    setSecondaryLabel(secondaryLabel);
    setDates(label);
    setOtherData(other);
    setSource(source);
    setDate(date);
  };

  const inputBar = (
    <div className={styles.inputBar}>
      <SimpleSelect
        action={setCriteria}
        heading='Data Set'
        values={dataSetLabels}
        defaultValue={'SF_CASE_DATA'}
      />
      {!isMobile && (
        <SimpleSelect
          action={{}}
          heading='Visualization'
          values={fetchSecondary(criteria)}
        />
      )}
      {!isMobile && (
        <SimpleSelect
          action={setDayCount}
          heading='Date Range'
          values={dateRangeValues}
          defaultValue={30}
        />
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
