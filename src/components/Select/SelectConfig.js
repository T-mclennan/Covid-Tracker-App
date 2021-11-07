import {dataConfig} from '../../api/dataUtils'
const {Age_Data, Race_Data, Gender_Data, Sexual_Data, Transmission_Data} = dataConfig;

export const dataSetLabels = [
  {
    label: 'Case Data',
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
    label: 'Sexual Orientation',
    value: 'SEXUAL_DATA',
  },
  {
    label: 'Transmission Data',
    value: 'TRANSMISSION_DATA',
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
    label: 'Daily Tests',
    value: 'chart2',
  },
  {
    label: 'Positive %',
    value: 'chart3',
  },
];

const comparisonChart = {
  label: 'Compare All',
  value: 'chart1',
}


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

//The issue here is that when each dataset is parsed the charts are created dynamically,
//we are not in control of what content is present or how it is ordered on the doughnut.
//However the labels of the select dropdown are organized, and if the two don't correspond,
//we access the wrong chart onClick. To remedy this labelMap gives us a reference of which 
//chart each label refers to, and use that as a mapping for a click occurance.

export const fetchSecondary = (dataSet, labelMap) => {

  //This functions creates the label and values input needed to populate the Select component
  //of a given category. The user selects by label and the corresponding chart will be shown.
  const createLineChartLabels = ({titles}, labelProducer) => {
    return Object.keys(titles).map((entry, i) => {
      return {
        label: labelProducer(`${titles[entry]}`),
        value: labelMap[entry],
      }
    })
  }

  const ageLabelProducer = (value) => `Ages ${value}`
  const ageSecondary = [
    comparisonChart,
    ...createLineChartLabels(Age_Data, ageLabelProducer)
  ];

  const genderLabelProducer = (value) => `${value} Cases`;
  const genderSecondary = [
    comparisonChart,
    ...createLineChartLabels(Gender_Data, genderLabelProducer)
  ];

  const raceLabelProducer = (value) => `${value} Cases`;
  const raceSecondary = [
    comparisonChart,
    ...createLineChartLabels(Race_Data, raceLabelProducer)
  ];

  const sexLabelProducer = (value) => `${value} Cases`;
  const sexSecondary = [
    comparisonChart,
    ...createLineChartLabels(Sexual_Data, sexLabelProducer)
  ];

  const transmissionLabelProducer = (value) => `${value} Transmission`;
  const transmissionSecondary = [
    comparisonChart,
    ...createLineChartLabels(Transmission_Data, transmissionLabelProducer)
  ];

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
    case 'SEXUAL_DATA':
      return sexSecondary;
    case 'TRANSMISSION_DATA':
      return transmissionSecondary;
    case 'MAP_DATA':
      return [];
    default:
      console.log(`Dataset ${dataSet} not recognized.`);
      return null;
  }
};
