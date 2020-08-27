export const dataSetLabels = [
  {
    label: 'Positive Cases',
    value: 'SF_CASE_DATA',
  },
  {
    label: 'Hospital Data',
    value: 'HOSPITAL_DATA',
  },
  {
    label: 'Dashboard',
    value: 'DASHBOARD',
  },
  {
    label: 'Gender Data',
    value: 'GENDER_DATA',
  },
  {
    label: 'Demographic Data',
    value: 'RACE_DATA',
  },
  {
    label: 'Neighborhood Map',
    value: 'MAP_DATA',
  },
];

const caseSecondary = [
  {
    label: 'Daily Cases',
    value: 'chart1',
  },
  {
    label: 'Tests Conducted',
    value: 'chart2',
  },
  {
    label: 'Positive Test %',
    value: 'chart3',
  },
];

const dashboardSecondary = [
  {
    label: 'Cases per Day',
    value: 'chart1',
  },
  {
    label: 'Tests Conducted',
    value: 'chart2',
  },
  {
    label: 'Positive Test %',
    value: 'chart3',
  },
];

const raceSecondary = [
  {
    label: 'Positive Cases',
    value: 'chart1',
  },
  {
    label: 'Tests Conducted',
    value: 'chart2',
  },
  {
    label: '% of Tests Positive',
    value: 'chart3',
  },
];

const hospitalSecondary = [
  {
    label: 'Acute Care',
    value: 'chart1',
  },
  {
    label: 'Intensive Care',
    value: 'chart2',
  },
  {
    label: 'Combined',
    value: 'chart3',
  },
];

const genderSecondary = [
  {
    label: 'Positive Cases',
    value: 'chart1',
  },
  {
    label: 'Tests Conducted',
    value: 'chart2',
  },
  {
    label: '% of Tests Positive',
    value: 'chart3',
  },
];

export const dateRangeValues = [
  {
    label: 'Last 30 days',
    value: 30,
  },
  {
    label: 'Last 60 days',
    value: 60,
  },
  {
    label: 'Last 90 days',
    value: 90,
  },
  {
    label: 'Last 120 days',
    value: 120,
  },
  {
    label: 'Last 150 days',
    value: 150,
  },
  {
    label: 'All available data',
    value: 'all data',
  },
];

export const fetchSecondary = (dataSet) => {
  switch (dataSet) {
    case 'HOSPITAL_DATA':
      return hospitalSecondary;
    case 'SF_CASE_DATA':
      return caseSecondary;
    case 'DASHBOARD':
      return dashboardSecondary;
    case 'RACE_DATA':
      return raceSecondary;
    case 'GENDER_DATA':
      return genderSecondary;
    case 'MAP_DATA':
      return [];
    default:
      console.log(`Dataset ${dataSet} not recognized.`);
      return null;
  }
};
