import React, { useState, useLayoutEffect } from 'react';
import { fetchData, fetchTitle } from './utils';
import {
  dateRangeValues,
  fetchSecondary,
} from '../Select/SelectConfig';
import { MapChart } from './MapChart';
import { Line, Doughnut } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';
import styles from './DynamicChart.module.css';
import SimpleSelect from '../Select/SimpleSelect';
import { Skeleton } from '@material-ui/lab';
import { composeOptions, composeData, mobileOptions} from './ChartConfig';
import Footer from './ChartFooter';

const DynamicChart = ({ category, title }) => {

  //Chart data:
  const [currentData, setCurrentData] = useState({});
  const [totalData, setTotalData] = useState({});
  const [chartType, setChartType] = useState('');
  const [ date, setDate ] = useState('')
  const [ source, setSource] = useState('')


  //Input bar:
  const [dayCount, setDayCount] = useState(90);
  const [subCategory, setSubCategory] = useState('chart1');

  useLayoutEffect(() => {
    console.log('inside useffect main chart')
    const fetchAPI = async () => {
      const data = await fetchData(category);
      if (category !== 'MAP_DATA') {parseData(data)}
      else {
        setChartType('map')
      }
      setDayCount(isMobile ? 30 : dayCount);
    };

    fetchAPI();
  }, [subCategory, dayCount]);

  const parseData = (data) => {
    setTotalData(data);
    setSource(data.source);
    setDate(data.date_recorded);
    setCurrentData(data[subCategory]);
    setChartType(data[subCategory].type);
  };

  const inputBar = currentData ? (
    <div className={styles.inputBar}>
      {/* <h1>{fetchTitle(category)}</h1> */}
      {/* <div className={styles.dropdownContainer}> */}
      {!isMobile && (
        <SimpleSelect
          action={(event) => {
            setSubCategory(event);
            setCurrentData(totalData[event]);
          }}
          heading='Visualization'
          values={fetchSecondary(category)}
          newValue={subCategory}
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
      {/* </div> */}
    </div>
  ) : null;


  const dynamicChart =
    (chartType === 'average' ||
      chartType === 'line' ||
      chartType === 'stacked') &&
    currentData ? (
      <Line
        data={composeData(currentData, dayCount)}
        options={composeOptions(currentData, dayCount)}
      />
    ) : null;

  const doughnutChart = currentData ? (
    <Doughnut
      data={currentData.primary}
      options={isMobile ? mobileOptions : {}}
    />
  ) : null;

  return currentData ? (
    <div className={chartType === 'map' ? `${styles.map} ${styles.container}`: styles.container}>
      
      {/* {chartType !== 'map' && inputBar} */}
      {chartType === 'map' && <MapChart />}
      {(chartType === 'average' ||
        chartType === 'line' ||
        chartType === 'stacked') &&
        dynamicChart}
      {chartType === 'doughnut' && doughnutChart}
      {!isMobile && <Footer date={date} source={source}/>}
    </div>
  ) : (
    <div>
      <Skeleton variant='text' />
      <Skeleton variant='circle' width={40} height={40} />
      <Skeleton variant='rect' width={210} height={151} />
      <Skeleton variant='rect' width={210} height={151} />
    </div>
  );
};

export default DynamicChart;
