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
    const patients = regularPatientData.map(({ patientcount }) => patientcount);
    const icu = icuData.map(({ patientcount }) => patientcount);

    //Acute care 7 day average:
    const chart1 = {
      primary: patients,
      secondary: makeSevenDayAverage(patients),
      dates: label,
      primaryLabel: 'Acute care patients',
      secondaryLabel: 'Seven day average',
      type: 'average',
    };

    //ICU care 7 day average:
    const chart2 = {
      primary: icu,
      secondary: makeSevenDayAverage(icu),
      dates: label,
      primaryLabel: 'ICU patients',
      secondaryLabel: 'Seven day average',
      type: 'average',
    };

    //ICU care 7 day average:
    const chart3 = {
      primary: icu,
      secondary: patients,
      dates: label,
      primaryLabel: 'ICU patients',
      secondaryLabel: 'Acute care patients',
      type: 'stacked',
    };

    const modifiedData = {
      chart1,
      chart2,
      chart3,
      source: 'https://data.sfgov.org/resource/nxjg-bhem.json',
      date_recorded: label[label.length - 1],
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

export const fetchGenderData = async () => {
  try {
    const { data } = await axios.get(keys.GENDER_CASES_API);
    const male = data.filter((item) => item.gender === 'Male');
    const female = data.filter((item) => item.gender === 'Female');
    const cumulativeMale = male.map((item) => item.cumulative_confirmed_cases);
    const cumulativeFemale = female.map(
      (item) => item.cumulative_confirmed_cases
    );
    const dayCasesMale = male.map((item) => item.new_confirmed_cases);
    const dayCasesFemale = female.map((item) => item.new_confirmed_cases);
    const dates = male.map((item) =>
      item.specimen_collection_date.slice(5, 10)
    );

    const trans = data.filter((item) => item.gender === 'Trans Female');
    const unknown = data.filter((item) => item.gender === 'Unknown');

    const chart1 = {
      primary: {
        labels: ['Male', 'Female', 'Trans', 'Unknown'],
        datasets: [
          {
            data: [
              male[male.length - 1].cumulative_confirmed_cases,
              female[female.length - 1].cumulative_confirmed_cases,
              trans[trans.length - 1].cumulative_confirmed_cases,
              unknown[unknown.length - 1].cumulative_confirmed_cases,
            ],
            backgroundColor: ['red', 'orange', 'yellow', 'pink'],
          },
        ],
      },
      secondary: {},
      primaryLabel: '',
      secondaryLabel: '',
      dates,
      chartLabel: 'Gender of confirmed cases',
      type: 'doughnut',
    };

    const chart2 = {
      primary: dayCasesMale,
      secondary: makeSevenDayAverage(dayCasesMale),
      dates,
      primaryLabel: 'Daily male cases',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
    };

    const chart3 = {
      primary: dayCasesFemale,
      secondary: makeSevenDayAverage(dayCasesFemale),
      dates,
      primaryLabel: 'Daily female cases',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
    };

    const chart4 = {
      primary: cumulativeMale,
      secondary: cumulativeFemale,
      dates,
      primaryLabel: 'Male Cases',
      secondaryLabel: 'Female Cases',
      chartLabel: 'Cumulative Cases',
      type: 'line',
    };

    const modifiedData = {
      chart1,
      chart2,
      chart3,
      chart4,
      source: 'https://data.sfgov.org/resource/nhy6-gqam.json',
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
