import React, { useState, useEffect } from 'react';
import { fetchData } from './utils';
import { fetchTestApi } from '../../api';
// import { Line, Bar } from 'react-chartjs-2';
import {
  dataSetLabels,
  dateRangeValues,
  fetchSecondary,
} from '../Select/SelectConfig';
import { MapChart } from './MapChart';
import { Line, Bar } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';
import styles from './OriginalChart.module.css';
import SimpleSelect from '../Select/SimpleSelect';
import { composeOptions, composeData, legend } from './ChartConfig';

const OriginalChart = (props) => {
  //Chart data state:
  const [dates, setDates] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [totalData, setTotalData] = useState({});

  //Input bar state:
  const [dayCount, setDayCount] = useState(90);
  const [criteria, setCriteria] = useState('SF_CASE_DATA');
  const [subCatagory, setSubCatagory] = useState('chart1');

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchData(criteria);
      // const testData = await fetchTestApi();
      // console.log('useEffect test');
      // console.log(testData);
      // console.log(data);
      if (criteria !== 'MAP_DATA') parseData(data);
      setDayCount(isMobile ? 30 : dayCount);
    };

    fetchAPI();
  }, [criteria, dayCount]);

  const parseData = (data) => {
    const { setSource, setDate } = props;
    console.log(data[subCatagory]);
    setTotalData(data);
    setSource(data.source);
    setDate(data.date_recorded);
    setCurrentData(data[subCatagory]);
    setDates(data[subCatagory].dates);
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
          action={(event) => {
            setSubCatagory(event);
            setCurrentData(totalData[event]);
          }}
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

  const dynamicChart = dates.length ? (
    <Line
      data={composeData(currentData, dayCount)}
      height={isMobile ? window.innerHeight * 0.45 : '100vh'}
      width={'auto'}
      options={composeOptions(currentData, dayCount)}
      legend={legend}
    />
  ) : null;

  console.log('Dates: ', dates.length);
  return (
    <div className={styles.container}>
      {inputBar}
      {criteria === 'MAP_DATA' ? <MapChart /> : dynamicChart}
    </div>
  );
};

export default OriginalChart;
