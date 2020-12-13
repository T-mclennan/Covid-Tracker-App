import React, { useState, useLayoutEffect } from 'react';
import { fetchData, fetchTitle } from './utils';
import {
  generateData
} from '../../api';
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



const DynamicChart = ({ category, data }) => {

  console.log(`${category} Chart`)
  console.log(data)

   //Input bar:
 const [dayCount, setDayCount] = useState(90);
 const [subCategory, setSubCategory] = useState('chart1');

 //Chart data:
 const [currentData, setCurrentData] = useState(null);
 const [totalData, setTotalData] = useState(null);
 const [chartType, setChartType] = useState('chart1');


  useLayoutEffect(() => {
    setCurrentData(data[subCategory])
    setTotalData(data)
    setChartType(data[subCategory].type)
  }, [data]);

  const inputBar = currentData ? (
    <>
    <div className={styles.inputBar}>
      <div className={styles.headerContainer}>
        <h5>{fetchTitle(category)}</h5>
      </div>
      <div className={styles.dropdownContainer}>
      {/* {window.innerWidth >= 900 && chartType !== 'map' &&( */}
        <SimpleSelect
          action={(event) => {
            setSubCategory(event);
            setCurrentData(totalData[event]);
            setChartType(totalData[event].type)
          }}
          heading='Visualization'
          values={fetchSecondary(category)}
          newValue={subCategory}
        />
      {/* )} */}
      {window.innerWidth >= 900 && chartType !== 'map' &&(
        <SimpleSelect
          action={setDayCount}
          heading='Date Range'
          values={dateRangeValues}
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
      height={isMobile ? 175: 175}
      />
    ) : null;

  const doughnutChart = currentData ? (
    <Doughnut
      data={currentData.primary}
      options={isMobile ? mobileOptions : desktopOptions}
      height={isMobile ? 175: 175}
    />
  ) : null;

  return (
    currentData && <div className={chartType === 'map' ? `${styles.map} ${styles.container}`: styles.container}>
      
      {inputBar}
      <div className={styles.chartContainer}> 
        {chartType === 'map' && <MapChart />}
        {(chartType === 'average' ||
          chartType === 'line' ||
          chartType === 'stacked') &&
          dynamicChart}
        {chartType === 'doughnut' && doughnutChart}
        {/* {!isMobile && <Footer date={date} source={source}/>} */}
      </div>
    </div>
  ) 
};

export default DynamicChart;
