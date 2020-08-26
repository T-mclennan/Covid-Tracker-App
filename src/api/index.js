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
    const label = [],
      primary = [],
      secondary = [],
      other = [];

    let lastIndex = 0;
    inputData.data.forEach(
      (
        { specimen_collection_date, pos, pct, neg, tests, indeterminate },
        index
      ) => {
        if (specimen_collection_date.slice(5, 10) !== label[label.length - 1]) {
          lastIndex = index;
          //Positive count
          primary.push(pos);

          // Test count
          label.push(specimen_collection_date.slice(5, 10));
          other.push({
            neg,
            indeterminate,
            pct,
            tests,
          });
        }
      }
    );

    const sevenAverage = makeSevenDayAverage(primary);

    const modifiedData = {
      label,
      primary,
      secondary,
      other,
      primaryLabel: 'Positive Count',
      secondaryLabel: 'Test Count',
      sevenAverage,
      source: 'https://data.sfgov.org/resource/nfpa-mg4g.json',
      date: label[label.length - 1],
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
    const { data } = await axios.get(keys.SF_ORIGINAL_DATA);
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
    // const deathData = data.filter((item) => item.case_disposition === 'Death');
    console.log('TEST');
    console.log(data);

    // console.log(deathData);
    return {
      primary: data,
      source: 'https://data.sfgov.org/resource/tpyr-dvnc.geojson',
      date: new Date().getMonth() + '-' + new Date().getDate(),
    };
  } catch (error) {
    console.log(error);
  }
};
