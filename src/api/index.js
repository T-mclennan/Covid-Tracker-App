import axios from 'axios';
import keys from '../config/keys';
import { makeSevenDayAverage } from '../components/Charts/utils';

export const fetchHospitalData = async () => {
  try {
    const { data } = await axios.get(keys.HOSPITAL_RATE_API);
    const icuData = data.filter((item) => item.dphcategory === 'ICU');
    const regularPatientData = data.filter(
      (item) => item.dphcategory === 'Med/Surg'
    );
    const label = regularPatientData.map(({ reportdate }) =>
      reportdate.slice(5, 10)
    );
    const primary = regularPatientData.map(({ patientcount }) => patientcount);
    const secondary = icuData.map(({ patientcount }) => patientcount);

    const modifiedData = {
      label,
      primary,
      secondary,
      primaryLabel: 'patient data',
      secondaryLabel: 'ICU parient data',
      source: 'https://data.sfgov.org/resource/nxjg-bhem.json',
      date: label[label.length - 1],
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSFData = async () => {
  try {
    const inputData = await axios.get(keys.SF_ORIGINAL_DATA);
    const dates = [],
      positive = [],
      total_tests = [],
      percent = [],
      negative = [],
      average = [];

    let lastIndex = 0;
    inputData.data.forEach(
      (
        { specimen_collection_date, pos, pct, neg, tests, indeterminate },
        index
      ) => {
        if (specimen_collection_date.slice(5, 10) !== dates[dates.length - 1]) {
          lastIndex = index;
          positive.push(pos);
          dates.push(specimen_collection_date.slice(5, 10));
          total_tests.push(tests);
          average.push(pct * 100);
          percent.push((pct * 100).toFixed(2));
          negative.push(neg);
        }
      }
    );
    //Positive cases + seven day average:
    const chart1 = {
      primary: positive,
      secondary: makeSevenDayAverage(positive),
      dates,
      primaryLabel: 'Positive Tests',
      secondaryLabel: 'Seven day average',
      type: 'average',
    };

    const chart2 = {
      primary: total_tests,
      secondary: makeSevenDayAverage(total_tests),
      dates,
      primaryLabel: 'Tests Conducted',
      secondaryLabel: 'Seven day average',
      type: 'average',
    };

    const chart3 = {
      primary: percent,
      secondary: makeSevenDayAverage(average),
      dates,
      primaryLabel: '% of Tests Positive',
      secondaryLabel: 'Seven day average',
      type: 'average',
    };

    const modifiedData = {
      chart1,
      chart2,
      chart3,
      source: 'https://data.sfgov.org/resource/nfpa-mg4g.json',
      date_recorded: dates[dates.length - 1],
    };

    console.log('mod');
    console.log(modifiedData);
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTestApi = async () => {
  try {
    console.log('test');
    const { data } = await axios.get(keys.HEALTH_DATA_API);
    // const deathData = data.filter((item) => item.case_disposition === 'Death');
    console.log('TEST');
    console.log(data);
    // console.log(deathData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMapGeoJSON = async () => {
  try {
    console.log('geoJSON');
    const { data } = await axios.get(keys.CASES_MAP_GEOJSON);
    console.log('TEST');
    console.log(data);
    return {
      primary: data,
      source: 'https://data.sfgov.org/resource/tpyr-dvnc.geojson',
      date: new Date().getMonth() + '-' + new Date().getDate(),
    };
  } catch (error) {
    console.log(error);
  }
};
