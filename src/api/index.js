import axios from 'axios';
import keys from '../config/keys';
import {ageConfig} from './dataUtils'
import { makeSevenDayAverage } from '../components/Charts/utils';
import { mobileOptions } from '../components/Charts/ChartConfig';

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
      primaryLabel: 'Daily acute care patients',
      secondaryLabel: 'Seven day average',
      type: 'average',
      colors: {
        primary: 'rgba(111, 255, 233, 0.5)',
        secondary: 'rgba(10, 173, 149, 0.7)',
      },
    };

    //ICU care 7 day average:
    const chart2 = {
      primary: icu,
      secondary: makeSevenDayAverage(icu),
      dates: label,
      primaryLabel: 'Daily ICU patients',
      secondaryLabel: 'Seven day average',
      type: 'average',
      colors: {
        primary: 'rgba(131, 188, 255, 0.5)',
        secondary: 'rgba(43, 85, 133, 0.7)',
      },
    };

    //ICU care 7 day average:
    const chart3 = {
      primary: icu,
      secondary: patients,
      dates: label,
      primaryLabel: 'Daily ICU patients',
      secondaryLabel: 'Daily Acute care patients',
      type: 'stacked',
      colors: {
        primary: 'rgba(111, 255, 233, 0.5)',
        secondary: 'rgba(131, 188, 255, 0.5)',
      },
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

    inputData.data.forEach(
      ({ specimen_collection_date, pos, pct, neg, tests, indeterminate }) => {
        if (specimen_collection_date.slice(5, 10) !== dates[dates.length - 1]) {
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
      secondaryLabel: '7-day average',
      type: 'average',
      colors: {
        primary: 'rgba(146, 201, 219, 0.5)',
        secondary: 'rgba(25, 195, 214, 0.5)',
      },
    };

    const chart2 = {
      primary: total_tests,
      secondary: makeSevenDayAverage(total_tests),
      dates,
      primaryLabel: 'Tests Conducted',
      secondaryLabel: '7-day average',
      type: 'average',
      colors: {
        primary: 'rgba(159, 233, 211, 0.5)',
        secondary: 'rgba(26, 153, 115, 0.7)',
      },
    };

    const chart3 = {
      primary: percent,
      secondary: makeSevenDayAverage(average),
      dates,
      primaryLabel: '% of positive tests',
      secondaryLabel: '7-day average',
      type: 'average',
      colors: {
        primary: 'rgba(230, 194, 173, 0.5)',
        secondary: 'rgba(173, 81, 27, 0.7)',
      },
    };

    const modifiedData = {
      chart1,
      chart2,
      chart3,
      source: 'https://data.sfgov.org/resource/nfpa-mg4g.json',
      date_recorded: dates[dates.length - 1],
    };

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
            backgroundColor: [
              'rgba(112, 214, 255, 0.5)',
              'rgba(255, 188, 126, 0.5)',
              'rgba(225, 102, 110, 0.5)',
              'rgba(255, 214, 112, 0.5)',
            ],
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
      colors: {
        primary: 'rgba(112, 214, 255, 0.5)',
        secondary: 'rgba(36, 98, 211, 0.7)',
      },
    };

    const chart3 = {
      primary: dayCasesFemale,
      secondary: makeSevenDayAverage(dayCasesFemale),
      dates,
      primaryLabel: 'Daily female cases',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(255, 188, 126, 0.5)',
        secondary: 'rgba(242, 103, 124, 0.5)',
      },
    };

    const chart4 = {
      primary: cumulativeMale,
      secondary: cumulativeFemale,
      dates,
      primaryLabel: 'Male Cases',
      secondaryLabel: 'Female Cases',
      chartLabel: 'Cumulative Cases',
      type: 'line',
      colors: {
        primary: 'rgba(112, 214, 255, 0.5)',
        secondary: 'rgba(255, 112, 166, 0.5)',
      },
    };

    const modifiedData = {
      chart1,
      chart2,
      chart3,
      chart4,
      source: 'https://data.sfgov.org/resource/nhy6-gqam.json',
      date_recorded: dates[dates.length - 1],
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRaceData = async () => {
  try {
    const { data } = await axios.get(keys.RACE_ETHNICITY_API);
    console.log(data);
    const Asian = data.filter((item) => item.race_ethnicity === 'Asian');
    const White = data.filter((item) => item.race_ethnicity === 'White');
    const Unknown = data.filter((item) => item.race_ethnicity === 'Unknown');
    const Black = data.filter(
      (item) => item.race_ethnicity === 'Black or African American'
    );
    console.log(Black);
    const Native = data.filter(
      (item) =>
        item.race_ethnicity === 'Native Hawaiian or Other Pacific Islander'
    );
    const Hispanic = data.filter(
      (item) => item.race_ethnicity === 'Hispanic or Latino/a, all races'
    );
    const MultiRacial = data.filter(
      (item) => item.race_ethnicity === 'Multi-racial'
    );

    const dailyAsian = Asian.map((item) => item.new_confirmed_cases);
    const dailyWhite = White.map((item) => item.new_confirmed_cases);
    const dailyBlack = Black.map((item) => item.new_confirmed_cases);
    const dailyNative = Native.map((item) => item.new_confirmed_cases);
    const dailyHispanic = Hispanic.map((item) => item.new_confirmed_cases);

    const dates = White.map((item) =>
      item.specimen_collection_date.slice(5, 10)
    );

    const chart1 = {
      primary: {
        labels: [
          'Asian',
          'Black',
          'White',
          'Hispanic',
          'Native American',
          'Multi-Racial',
          'Unknown',
        ],
        datasets: [
          {
            data: [
              Asian[Asian.length - 1].cumulative_confirmed_cases,
              Black[Black.length - 1].cumulative_confirmed_cases,
              White[White.length - 1].cumulative_confirmed_cases,
              Hispanic[Hispanic.length - 1].cumulative_confirmed_cases,
              Native[Native.length - 1].cumulative_confirmed_cases,
              MultiRacial[MultiRacial.length - 1].cumulative_confirmed_cases,
              Unknown[Unknown.length - 1].cumulative_confirmed_cases,
            ],
            backgroundColor: [
              'rgba(94, 233, 175, 0.6)',
              'rgba(216, 194, 107, 0.6)',
              'rgba(226, 139, 84, 0.5)',
              'rgba(44, 182, 228, 0.5)',

              '#dca7f1',
              'rgba(100, 77, 212, 0.6)',
              'rgba(184, 70, 123, 0.6)',
            ],
          },
        ],
      },
      secondary: {},
      primaryLabel: '',
      secondaryLabel: '',
      dates,
      chartLabel: 'Race of confirmed cases',
      type: 'doughnut',
    };

    const chart2 = {
      primary: dailyAsian,
      secondary: makeSevenDayAverage(dailyAsian),
      dates: Asian.map((item) => item.specimen_collection_date.slice(5, 10)),
      primaryLabel: 'Confirmed cases of Asian descent',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(94, 233, 175, 0.6)',
        secondary: 'rgba(50, 205, 216, 0.6)',
      },
    };

    const chart3 = {
      primary: dailyWhite,
      secondary: makeSevenDayAverage(dailyWhite),
      dates: White.map((item) => item.specimen_collection_date.slice(5, 10)),
      primaryLabel: 'Confirmed cases of White descent',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(226, 139, 84, 0.5)',
        secondary: 'rgba(196, 82, 41, 0.6)',
      },
    };

    const chart4 = {
      primary: dailyBlack,
      secondary: makeSevenDayAverage(dailyBlack),
      dates,
      primaryLabel: 'Confirmed cases of Black descent',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(216, 194, 107, 0.6)',
        secondary: 'rgba(204, 143, 68, 0.6)',
      },
    };

    const chart5 = {
      primary: dailyHispanic,
      secondary: makeSevenDayAverage(dailyHispanic),
      dates: Hispanic.map((item) => item.specimen_collection_date.slice(5, 10)),
      primaryLabel: 'Confirmed cases of Hispanic descent',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(44, 182, 228, 0.5)',
        secondary: 'rgba(50, 104, 206, 0.6)',
      },
    };

    const chart6 = {
      primary: dailyNative,
      secondary: makeSevenDayAverage(dailyNative),
      dates: Native.map((item) => item.specimen_collection_date.slice(5, 10)),
      primaryLabel: 'Confirmed cases of Native American descent',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: '#dca7f1',
        secondary: '#752e91',
      },
    };

    const modifiedData = {
      chart1,
      chart2,
      chart3,
      chart4,
      chart5,
      chart6,
      source: 'https://data.sfgov.org/resource/vqqm-nsqg.json',
      date_recorded: dates[dates.length - 1],
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAgeData = async () => {
  const {ageLabels, ageDoughnutColors, colorList} = ageConfig

  console.log('inside age API:')

  try {
    const { data } = await axios.get(keys.AGE_API);
    console.log(data)

    const age_group_data = ageLabels.map((label) => data.filter((item) => item.age_group === label))
    const dates = age_group_data[6].map((item) =>
      item.specimen_collection_date.slice(5, 10)
    );

    const chart1 = {
      primary: {
        labels: ageLabels,
        datasets: [
            {
            data: age_group_data.map((entry) => entry[entry.length-1].cumulative_confirmed_cases),
            backgroundColor: ageDoughnutColors,
          },
        ],
      },
      secondary: {},
      primaryLabel: '',
      secondaryLabel: '',
      dates,
      chartLabel: 'Age of confirmed cases',
      type: 'doughnut',
    };

    const modifiedData = {
      chart1,
      source: 'https://data.sfgov.org/resource/sunc-2t3k.json',
      date_recorded: dates[dates.length - 1],
    };  

    age_group_data.forEach((entry, i) => {
        const new_case_data =  entry.map((item) => item.new_confirmed_cases)
        modifiedData[`chart${i+2}`] = {
              primary: new_case_data,
              secondary: makeSevenDayAverage(new_case_data),
              dates: entry.map((item) =>
                item.specimen_collection_date.slice(5, 10)
              ),
              primaryLabel: `Confirmed cases for ${ageLabels[i]} years`,
              secondaryLabel: '7-day average',
              chartLabel: 'daily cases',
              type: 'average',
              colors: colorList[i]
        };
    })
    
    console.log(modifiedData)
    return modifiedData
  } catch (error) {
    console.log('Error in Age Data API call: ')
    console.log(error);
  }
};

export const fetchMapGeoJSON = async () => {
  try {
    const { data } = await axios.get(keys.CASES_MAP_GEOJSON);
    return {
      primary: data,
      source: 'https://data.sfgov.org/resource/tpyr-dvnc.geojson',
      date: new Date().getMonth() + '-' + new Date().getDate(),
    };
  } catch (error) {
    console.log(error);
  }
};
