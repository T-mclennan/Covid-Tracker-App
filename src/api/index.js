import axios from 'axios';
import keys from '../config/keys';
import { makeSevenDayAverage } from '../components/Charts/utils';

// FetchhospitalData response template:
// covidstatus: 'COVID+';
// dphcategory: 'Med/Surg';
// hospital: 'All SF Hospitals';
// patientcount: '46';
// reportdate: '2020-07-07T00:00:00.000';

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
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

// SFData in the form of:

// indeterminate: "6.0"
// last_updated_at: "2020-08-14T15:30:00.000"
// neg: "1853.0"
// pct: "0.012260127931769723"
// pos: "23.0"
// specimen_collection_date: "2020-06-07T00:00:00.000"
// tests: "1882.0"

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
        console.log(
          `last: ${
            label[label.length - 1]
          } curr: ${specimen_collection_date.slice(5, 10)} ${lastIndex}`
        );
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
    const { data } = await axios.get(keys.CASES_MAP_GEOJSON);
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
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const fetchTestApi = async () => {
//   try {
//     const { data } = await axios.get(keys.ALT_CASES_DEATHS);
//     console.log('TEST');
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     const modifiedData = data.map((dailyData) => ({
//       confirmed: dailyData.confirmed.total,
//       deaths: dailyData.deaths.total,
//       date: dailyData.reportDate,
//     }));
//     return modifiedData;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchCountries = async () => {
//   try {
//     const {
//       data: { countries },
//     } = await axios.get(`${url}/countries`);
//     return countries.map((country) => country.name);
//   } catch (error) {
//     console.log(error);
//   }
// };
