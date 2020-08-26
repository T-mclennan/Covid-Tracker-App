export const dataSetLabels = [
  {
    label: 'Daily Cases',
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
    label: 'Positive Cases',
    value: 'option1',
  },
  {
    label: 'Tests Conducted',
    value: 'option2',
  },
  {
    label: '% of Tests Positive',
    value: 'option3',
  },
];

const dashboardSecondary = [
  {
    label: 'Positive Cases',
    value: 'option1',
  },
  {
    label: 'Tests Conducted',
    value: 'option2',
  },
  {
    label: '% of Tests Positive',
    value: 'option3',
  },
];

const raceSecondary = [
  {
    label: 'Positive Cases',
    value: 'option1',
  },
  {
    label: 'Tests Conducted',
    value: 'option2',
  },
  {
    label: '% of Tests Positive',
    value: 'option3',
  },
];

const hospitalSecondary = [
  {
    label: 'Positive Cases',
    value: 'option1',
  },
  {
    label: 'Tests Conducted',
    value: 'option2',
  },
  {
    label: '% of Tests Positive',
    value: 'option3',
  },
];

const genderSecondary = [
  {
    label: 'Positive Cases',
    value: 'option1',
  },
  {
    label: 'Tests Conducted',
    value: 'option2',
  },
  {
    label: '% of Tests Positive',
    value: 'option3',
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

export const mapDataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'value',
      stops: [
        [0, '#F2F12D'],
        [1, '#EED322'],
        [2, '#E6B71E'],
        [3, '#DA9C20'],
        [4, '#CA8323'],
        [5, '#B86B25'],
        [6, '#A25626'],
        [7, '#8B4225'],
        [8, '#723122'],
      ],
    },
    'fill-opacity': 0.2,
  },
};

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
    default:
      console.log(`Dataset ${dataSet} not recognized.`);
      return null;
  }
};
