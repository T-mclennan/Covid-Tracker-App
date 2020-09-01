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
    console.log('inside hospital');
    console.log(patients);
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

    console.log('mod');
    console.log(modifiedData);
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
  try {
    const { data } = await axios.get(keys.AGE_API);

    const underEighteen = data.filter((item) => item.age_group === 'under 18');
    const eighteenThirty = data.filter((item) => item.age_group === '18-30');
    const thirtyForty = data.filter((item) => item.age_group === '31-40');
    const fortyFifty = data.filter((item) => item.age_group === '41-50');
    const fiftySixty = data.filter((item) => item.age_group === '51-60');
    const sixtySeventy = data.filter((item) => item.age_group === '61-70');
    const seventyEighty = data.filter((item) => item.age_group === '71-80');
    const eightyPlus = data.filter((item) => item.age_group === '81+');

    const underEighteenCases = underEighteen.map(
      (item) => item.new_confirmed_cases
    );
    const eighteenThirtyCases = eighteenThirty.map(
      (item) => item.new_confirmed_cases
    );
    const thirtyFortyCases = thirtyForty.map(
      (item) => item.new_confirmed_cases
    );
    const fortyFiftyCases = fortyFifty.map((item) => item.new_confirmed_cases);
    const fiftySixtyCases = fiftySixty.map((item) => item.new_confirmed_cases);
    const sixtySeventyCases = sixtySeventy.map(
      (item) => item.new_confirmed_cases
    );
    const seventyEightyCases = seventyEighty.map(
      (item) => item.new_confirmed_cases
    );
    const eightyPlusCases = eightyPlus.map((item) => item.new_confirmed_cases);

    const dates = underEighteen.map((item) =>
      item.specimen_collection_date.slice(5, 10)
    );

    const chart1 = {
      primary: {
        labels: [
          'Under 18',
          '18-30',
          '31-40',
          '41-50',
          '51-60',
          '61-70',
          '71-80',
          '80+',
        ],
        datasets: [
          {
            data: [
              underEighteen[underEighteen.length - 1]
                .cumulative_confirmed_cases,
              eighteenThirty[eighteenThirty.length - 1]
                .cumulative_confirmed_cases,
              thirtyForty[thirtyForty.length - 1].cumulative_confirmed_cases,
              fortyFifty[fortyFifty.length - 1].cumulative_confirmed_cases,
              fiftySixty[fiftySixty.length - 1].cumulative_confirmed_cases,
              sixtySeventy[sixtySeventy.length - 1].cumulative_confirmed_cases,
              seventyEighty[seventyEighty.length - 1]
                .cumulative_confirmed_cases,
              eightyPlus[eightyPlus.length - 1].cumulative_confirmed_cases,
            ],
            backgroundColor: [
              'rgba(233, 201, 94, 0.6)',
              'rgba(226, 122, 84, 0.5)',
              'rgba(44, 130, 228, 0.5)',
              'rgba(127, 192, 241, 0.6)',
              'rgba(190, 111, 184, 0.6)',
              'rgba(69, 180, 152, 0.6)',
              'rgba(189, 54, 67, 0.6)',
              'rgba(131, 74, 197, 0.6)',
            ],
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

    const chart2 = {
      primary: underEighteenCases,
      secondary: makeSevenDayAverage(underEighteenCases),
      dates: underEighteen.map((item) =>
        item.specimen_collection_date.slice(5, 10)
      ),
      primaryLabel: 'Confirmed cases between 18-30 years',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(233, 201, 94, 0.6)',
        secondary: 'rgba(207, 132, 46, 0.6)',
      },
    };

    const chart3 = {
      primary: eighteenThirtyCases,
      secondary: makeSevenDayAverage(eighteenThirtyCases),
      dates: eighteenThirty.map((item) =>
        item.specimen_collection_date.slice(5, 10)
      ),
      primaryLabel: 'Confirmed cases between 18-30 years',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(226, 122, 84, 0.5)',
        secondary: 'rgba(185, 65, 22, 0.5)',
      },
    };

    const chart4 = {
      primary: thirtyFortyCases,
      secondary: makeSevenDayAverage(thirtyFortyCases),
      dates: thirtyForty.map((item) =>
        item.specimen_collection_date.slice(5, 10)
      ),
      primaryLabel: 'Confirmed cases between 31-40 years',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(44, 130, 228, 0.5)',
        secondary: 'rgba(44, 47, 228, 0.5)',
      },
    };

    const chart5 = {
      primary: fortyFiftyCases,
      secondary: makeSevenDayAverage(fortyFiftyCases),
      dates: fortyFifty.map((item) =>
        item.specimen_collection_date.slice(5, 10)
      ),
      primaryLabel: 'Confirmed cases between 41-50 years',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(127, 192, 241, 0.6)',
        secondary: 'rgba(63, 171, 190, 0.6)',
      },
    };

    const chart6 = {
      primary: fiftySixtyCases,
      secondary: makeSevenDayAverage(fiftySixtyCases),
      dates: fiftySixty.map((item) =>
        item.specimen_collection_date.slice(5, 10)
      ),
      primaryLabel: 'Confirmed cases between 51-60 years',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(190, 111, 184, 0.6)',
        secondary: 'rgba(160, 48, 170, 0.6)',
      },
    };

    const chart7 = {
      primary: sixtySeventyCases,
      secondary: makeSevenDayAverage(sixtySeventyCases),
      dates: sixtySeventy.map((item) =>
        item.specimen_collection_date.slice(5, 10)
      ),
      primaryLabel: 'Confirmed cases between 61-70 years',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(127, 192, 241, 0.6)',
        secondary: 'rgba(63, 171, 190, 0.6)',
      },
    };

    const chart8 = {
      primary: seventyEightyCases,
      secondary: makeSevenDayAverage(seventyEightyCases),
      dates: seventyEighty.map((item) =>
        item.specimen_collection_date.slice(5, 10)
      ),
      primaryLabel: 'Confirmed cases between 71-80 years',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(189, 54, 67, 0.5)',
        secondary: 'rgba(156, 26, 104, 0.6)',
      },
    };

    const chart9 = {
      primary: eightyPlusCases,
      secondary: makeSevenDayAverage(eightyPlusCases),
      dates: eightyPlus.map((item) =>
        item.specimen_collection_date.slice(5, 10)
      ),
      primaryLabel: 'Confirmed cases over 80 years of age',
      secondaryLabel: '7-day average',
      chartLabel: 'daily cases',
      type: 'average',
      colors: {
        primary: 'rgba(131, 74, 197, 0.6)',
        secondary: 'rgba(67, 49, 185, 0.6)',
      },
    };

    const modifiedData = {
      chart1,
      chart2,
      chart3,
      chart4,
      chart5,
      chart6,
      chart7,
      chart8,
      chart9,
      source: 'https://data.sfgov.org/resource/sunc-2t3k.json',
      date_recorded: dates[dates.length - 1],
    };

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
