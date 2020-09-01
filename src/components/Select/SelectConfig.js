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
    label: 'Gender Data',
    value: 'GENDER_DATA',
  },
  {
    label: 'Age Data',
    value: 'AGE_DATA',
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

const ageSecondary = [
  {
    label: 'Age Pie Chart',
    value: 'chart1',
  },
  {
    label: 'Under 18',
    value: 'chart2',
  },
  {
    label: 'Ages 18-30',
    value: 'chart3',
  },
  {
    label: 'Ages 31-40',
    value: 'chart4',
  },
  {
    label: 'Ages 41-50',
    value: 'chart5',
  },
  {
    label: 'Ages 51-60',
    value: 'chart6',
  },
  {
    label: 'Ages 61-70',
    value: 'chart7',
  },
  {
    label: 'Ages 71-80',
    value: 'chart8',
  },
  {
    label: 'Ages 80+',
    value: 'chart9',
  },
];

const raceSecondary = [
  {
    label: 'Demographic Pie Chart',
    value: 'chart1',
  },
  {
    label: 'Asian',
    value: 'chart2',
  },
  {
    label: 'White',
    value: 'chart3',
  },
  {
    label: 'Black',
    value: 'chart4',
  },
  {
    label: 'Hispanic',
    value: 'chart5',
  },
  {
    label: 'Native American',
    value: 'chart6',
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
    label: 'Gender Pie Chart',
    value: 'chart1',
  },
  {
    label: 'Male Cases',
    value: 'chart2',
  },
  {
    label: 'Female Cases',
    value: 'chart3',
  },
  {
    label: 'Cumulative Cases',
    value: 'chart4',
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
    label: 'Last 180 days',
    value: 180,
  },
  {
    label: 'All available data',
    value: 'All data',
  },
];

export const fetchSecondary = (dataSet) => {
  switch (dataSet) {
    case 'HOSPITAL_DATA':
      return hospitalSecondary;
    case 'SF_CASE_DATA':
      return caseSecondary;
    case 'AGE_DATA':
      return ageSecondary;
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
