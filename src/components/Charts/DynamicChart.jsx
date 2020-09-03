import React, { useState, useEffect } from 'react';
import { fetchData } from './utils';
import { fetchTestApi } from '../../api';
import {
  dataSetLabels,
  dateRangeValues,
  fetchSecondary,
} from '../Select/SelectConfig';
import { MapChart } from './MapChart';
import { Line, Doughnut } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';
import styles from './DynamicChart.module.css';
import SimpleSelect from '../Select/SimpleSelect';
import { composeOptions, composeData, legend } from './ChartConfig';

const OriginalChart = (props) => {
  //Chart data:
  const [currentData, setCurrentData] = useState({});
  const [totalData, setTotalData] = useState({});
  const [chartType, setChartType] = useState('');

  //Input bar:
  const [dayCount, setDayCount] = useState(90);
  const [criteria, setCriteria] = useState('SF_CASE_DATA');
  const [subCategory, setSubCategory] = useState('chart1');

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchData(criteria);
      if (criteria !== 'MAP_DATA') parseData(data);
      setDayCount(isMobile ? 30 : dayCount);
    };

    fetchAPI();
  }, [criteria]);

  const parseData = (data) => {
    const { setSource, setDate } = props;
    setTotalData(data);
    setSource(data.source);
    setDate(data.date_recorded);
    setCurrentData(data[subCategory]);
    setChartType(data[subCategory].type);
  };

  const handleCriteria = (input) => {
    setCriteria(input);
    setSubCategory('chart1');
    if (input === 'MAP_DATA') {
      setChartType('map');
    }
  };

  const inputBar = (
    <div className={styles.inputBar}>
      <SimpleSelect
        action={handleCriteria}
        heading='Data Set'
        values={dataSetLabels}
        defaultValue={'SF_CASE_DATA'}
      />
      {!isMobile && (
        <SimpleSelect
          action={(event) => {
            setSubCategory(event);
            setCurrentData(totalData[event]);
          }}
          heading='Visualization'
          values={fetchSecondary(criteria)}
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
    </div>
  );

  const dynamicChart =
    (chartType === 'average' ||
      chartType === 'line' ||
      chartType === 'stacked') &&
    currentData ? (
      <Line
        data={composeData(currentData, dayCount)}
        height={
          isMobile ? window.innerHeight * 0.45 : window.innerHeight * 0.15
        }
        width={'auto'}
        options={composeOptions(currentData, dayCount)}
        legend={legend}
      />
    ) : null;

  const doughnutChart = currentData ? (
    <Doughnut
      data={currentData.primary}
      height={isMobile ? window.innerHeight * 0.45 : 100}
      width={'auto'}
      options={{}}
      legend={legend}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {inputBar}
      {chartType === 'map' && <MapChart />}
      {(chartType === 'average' ||
        chartType === 'line' ||
        chartType === 'stacked') &&
        dynamicChart}
      {chartType === 'doughnut' && doughnutChart}
    </div>
  );
};

export default OriginalChart;
