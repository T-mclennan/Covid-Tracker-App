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
import { composeOptions, composeData, mobileOptions, desktopOptions} from './ChartConfig';
import Footer from './ChartFooter';

const DynamicChart = ({ category }) => {

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
    <>
    <div className={styles.inputBar}>
      <div className={styles.headerContainer}>
        <h5>{fetchTitle(category)}</h5>
      </div>
      <div className={styles.dropdownContainer}>
      {!isMobile && chartType !== 'map' &&(
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
      {!isMobile && chartType !== 'map' &&(
        <SimpleSelect
          action={setDayCount}
          heading='Date Range'
          values={dateRangeValues}
          defaultValue={30}
        />
      )}
      </div>
    </div>
    </>
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
      options={isMobile ? mobileOptions : desktopOptions}
    />
  ) : null;

  return (
    <div className={chartType === 'map' ? `${styles.map} ${styles.container}`: styles.container}>
      
      {/* {chartType !== 'map' && inputBar} */}
      {inputBar}
      <div className={styles.chartContainer}> 
        {chartType === 'map' && <MapChart />}
        {(chartType === 'average' ||
          chartType === 'line' ||
          chartType === 'stacked') &&
          dynamicChart}
        {chartType === 'doughnut' && doughnutChart}
        {!isMobile && <Footer date={date} source={source}/>}
      </div>
    </div>
  ) 
};

export default DynamicChart;
