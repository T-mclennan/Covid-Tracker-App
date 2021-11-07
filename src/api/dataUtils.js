import keys from '../config/keys';

const {CASE_SUMMARY_DATA, HOSPITAL_RATE_API, ALT_CASES_DEATHS, SF_ORIGINAL_DATA, GENDER_CASES_API, RACE_ETHNICITY_API, AGE_API,  CASES_MAP_GEOJSON} = keys

export const ageConfig = {
  ageLabels: [
    '0-4',
    '5-11',
    '12-17',
    '18-20',
    '21-24',
    '25-29',
    '30-39',
    '40-49',
    '50-59',
    '60-69',
    '70-79',
    '80+',
  ],
  ageDoughnutColors: [
    'rgba(233, 201, 94, 0.6)',
    'rgba(226, 122, 84, 0.5)',
    'rgba(44, 130, 228, 0.5)',
    'rgba(127, 192, 241, 0.6)',
    'rgba(190, 111, 184, 0.6)',
    'rgba(69, 180, 152, 0.6)',
    'rgba(189, 54, 67, 0.6)',
    'rgba(131, 74, 197, 0.6)',
    'rgba(50, 13, 109 0.6)',
    'rgba(255, 191, 183, 0.6)',
    'rgba(255, 212, 71, 0.6)',
    'rgba(112, 3, 83, 0.6)',
    'rgba(76, 28, 0, 0.6)',
  ],
  colorList: [
    {
        primary: 'rgba(233, 201, 94, 0.6)',
        secondary: 'rgba(207, 132, 46, 0.6)',
      },
    {
        primary: 'rgba(226, 122, 84, 0.5)',
        secondary: 'rgba(185, 65, 22, 0.5)',
      },
    {
        primary: 'rgba(44, 130, 228, 0.5)',
        secondary: 'rgba(44, 47, 228, 0.5)',
      },
    {
        primary: 'rgba(127, 192, 241, 0.6)',
        secondary: 'rgba(63, 171, 190, 0.6)',
      },
    {
        primary: 'rgba(190, 111, 184, 0.6)',
        secondary: 'rgba(160, 48, 170, 0.6)',
      },
    {
        primary: 'rgba(127, 192, 241, 0.6)',
        secondary: 'rgba(63, 171, 190, 0.6)',
      },

    {
        primary: 'rgba(189, 54, 67, 0.5)',
        secondary: 'rgba(156, 26, 104, 0.6)',
      },
    {
        primary: 'rgba(131, 74, 197, 0.6)',
        secondary: 'rgba(67, 49, 185, 0.6)',
      },
  ]
}

const totalColors = [
  {
    primary: '#ffa39e',
    secondary: '#cf1322',
  },
  {
    primary: '#ffbb96',
    secondary: '#d4380d',
  },
  {
    primary: '#ffc069',
    secondary: '#d46b08',
  },
  {
    primary: '#ffd666',
    secondary: '#d48806',
  },
  {
    primary: '#fff566',
    secondary: '#d4b106',
  },
  {
    primary: '#d3f261',
    secondary: '#7cb305',
  },
  {
    primary: '#95de64',
    secondary: '#389e0d',
  },
  {
    primary: '#5cdbd3',
    secondary: '#08979c',
  },
  {
    primary: '#69c0ff',
    secondary: '#096dd9',
  },
  {
    primary: '#85a5ff',
    secondary: '#096dd9',
  },
  {
    primary: '#d3adf7',
    secondary: '#096dd9',
  },
  {
    primary: '#ffadd2',
    secondary: '#c41d7f',
  },
  // {
  //   primary: 'rgba(233, 201, 94, 0.6)',
  //   secondary: 'rgba(207, 132, 46, 0.6)',
  // },
  // {
  //   primary: 'rgba(226, 122, 84, 0.5)',
  //   secondary: 'rgba(185, 65, 22, 0.5)',
  // },
  // {
  //   primary: 'rgba(44, 130, 228, 0.5)',
  //   secondary: 'rgba(44, 47, 228, 0.5)',
  // },
  // {
  //   primary: 'rgba(127, 192, 241, 0.6)',
  //   secondary: 'rgba(63, 171, 190, 0.6)',
  // },
  // {
  //   primary: 'rgba(190, 111, 184, 0.6)',
  //   secondary: 'rgba(160, 48, 170, 0.6)',
  // },
  // {
  //   primary: 'rgba(127, 192, 241, 0.6)',
  //   secondary: 'rgba(63, 171, 190, 0.6)',
  // },

  // {
  //   primary: 'rgba(189, 54, 67, 0.5)',
  //   secondary: 'rgba(156, 26, 104, 0.6)',
  // },
  // {
  //   primary: 'rgba(131, 74, 197, 0.6)',
  //   secondary: 'rgba(67, 49, 185, 0.6)',
  // },
]

const colorMap = {
  Case_Data: 8,
  Hospital_Data: 1,
  Age_Data: 5,
  Race_Data: 1,
  Gender_Data: 9,
  Transmission_Data: 6,
  Sexual_Data: 11
}

export const generateColorPallete = (number, category) => {
  // const startIndex = Math.floor(Math.random() * (totalColors.length));
  const startIndex = colorMap[category]
  const colorList = []
  let index = startIndex;
  for (let i = 0; i < number; i++) {
    colorList.push(totalColors[index]);
    index++;
    if (index > totalColors.length-1) index = 0;
  }
  const doughnutColors = colorList.map(item => item.primary)
  return [doughnutColors, colorList]
}

export const dataConfig = {

  Hospital_Data: {
  },

  Gender_Data: {
    chartLabel: 'Confirmed cases by Gender',
    source: 'https://data.sfgov.org/resource/nhy6-gqam.json',
    details: 'https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Gender/nhy6-gqam',
    titles: {
      'Female': 'Female',
      'Male': 'Male',
      'Unknown': 'Unknown',
      'Trans Female': 'Trans Female',
      'Trans Male': 'Trans Male',
      'Other': 'Other'
    }, 
    doughnutColors: [
      'rgba(112, 214, 255, 0.5)',
      'rgba(255, 188, 126, 0.5)',
      'rgba(225, 102, 110, 0.5)',
      'rgba(255, 214, 112, 0.5)',
      'rgba(156, 26, 104, 0.6)',
    ],
    colorList: [
      {
        primary: 'rgba(112, 214, 255, 0.5)',
        secondary: 'rgba(36, 98, 211, 0.7)',
      },
      {
        primary: 'rgba(255, 188, 126, 0.5)',
        secondary: 'rgba(242, 103, 124, 0.5)',
      },
      {
        primary: 'rgba(112, 214, 255, 0.5)',
        secondary: 'rgba(255, 112, 166, 0.5)',
      },
      {
        primary: 'rgba(189, 54, 67, 0.5)',
        secondary: 'rgba(156, 26, 104, 0.6)',
      },
    ]
  },
  Race_Data: {
    chartLabel: 'Confirmed cases by Race',
    source: 'https://data.sfgov.org/resource/vqqm-nsqg.json',
    details: '',
    titles: {
      'Asian': 'Asian',
      'White': 'White',
      'Black or African American': 'Black',
      'Hispanic or Latino/a, all races': 'Hispanic',
      'Native American': 'Native American',
      'Native Hawaiian or Other Pacific Islander': 'Pacific Islander',
      'Multi-racial': 'Multi-racial',
      'Unknown': 'Unknown',
      'Other': 'Other'
    }, 
  },
  Age_Data: {
    chartLabel: 'Confirmed cases by Age',
    source: 'https://data.sfgov.org/resource/sunc-2t3k.json',
    titles: {
      '0-4': '0-4',
      '5-11': '5-11',
      '12-17': '12-17',
      '18-20': '18-20',
      '21-24': '21-24',
      '25-29': '25-29',
      '30-39': '30-39',
      '40-49': '40-49',
      '50-59': '50-59',
      '60-69': '60-69',
      '70-79': '70-79',
      '80+': '80+',
      'Unknown': 'Unknown'
    }, 
    doughnutColors: [
      'rgba(233, 201, 94, 0.6)',
      'rgba(226, 122, 84, 0.5)',
      'rgba(44, 130, 228, 0.5)',
      'rgba(127, 192, 241, 0.6)',
      'rgba(190, 111, 184, 0.6)',
      'rgba(69, 180, 152, 0.6)',
      'rgba(189, 54, 67, 0.6)',
      'rgba(131, 74, 197, 0.6)',
      'rgba(50, 13, 109 0.6)',
      'rgba(255, 191, 183, 0.6)',
      'rgba(255, 212, 71, 0.6)',
      'rgba(112, 3, 83, 0.6)',
      'rgba(76, 28, 0, 0.6)',
    ],
    colorList: [
      {
          primary: 'rgba(233, 201, 94, 0.6)',
          secondary: 'rgba(207, 132, 46, 0.6)',
        },
      {
          primary: 'rgba(226, 122, 84, 0.5)',
          secondary: 'rgba(185, 65, 22, 0.5)',
        },
      {
          primary: 'rgba(44, 130, 228, 0.5)',
          secondary: 'rgba(44, 47, 228, 0.5)',
        },
      {
          primary: 'rgba(127, 192, 241, 0.6)',
          secondary: 'rgba(63, 171, 190, 0.6)',
        },
      {
          primary: 'rgba(190, 111, 184, 0.6)',
          secondary: 'rgba(160, 48, 170, 0.6)',
        },
      {
          primary: 'rgba(127, 192, 241, 0.6)',
          secondary: 'rgba(63, 171, 190, 0.6)',
        },
  
      {
          primary: 'rgba(189, 54, 67, 0.5)',
          secondary: 'rgba(156, 26, 104, 0.6)',
        },
      {
          primary: 'rgba(131, 74, 197, 0.6)',
          secondary: 'rgba(67, 49, 185, 0.6)',
        },
    ],
  },

  Sexual_Data: {
    chartLabel: 'Confirmed cases by Sexual Orientation',
    source: 'https://data.sfgov.org/resource/sunc-2t3k.json',
    titles: {
      'Bisexual': 'Bisexual',
      'Declined': 'Declined',
      'Gay or Lesbian': 'Gay/Lesbian',
      'Heterosexual': 'Hetero',
      'Other': 'Other',
      'Unknown': 'Unknown',
      // 'Unsure': 'Unsure',
    }, 
    doughnutColors: [
      'rgba(226, 122, 84, 0.5)',
      'rgba(127, 192, 241, 0.6)',
      'rgba(190, 111, 184, 0.6)',
      'rgba(69, 180, 152, 0.6)',
      'rgba(189, 54, 67, 0.6)',
      'rgba(131, 74, 197, 0.6)',
      'rgba(255, 191, 183, 0.6)',
    ],
    colorList: [
      {
          primary: 'rgba(233, 201, 94, 0.6)',
          secondary: 'rgba(207, 132, 46, 0.6)',
        },
      {
          primary: 'rgba(226, 122, 84, 0.5)',
          secondary: 'rgba(185, 65, 22, 0.5)',
        },
      {
          primary: 'rgba(44, 130, 228, 0.5)',
          secondary: 'rgba(44, 47, 228, 0.5)',
        },
      {
          primary: 'rgba(127, 192, 241, 0.6)',
          secondary: 'rgba(63, 171, 190, 0.6)',
        },
      {
          primary: 'rgba(190, 111, 184, 0.6)',
          secondary: 'rgba(160, 48, 170, 0.6)',
        },
      {
          primary: 'rgba(127, 192, 241, 0.6)',
          secondary: 'rgba(63, 171, 190, 0.6)',
        },
  
      {
          primary: 'rgba(189, 54, 67, 0.5)',
          secondary: 'rgba(156, 26, 104, 0.6)',
        },
    ],
  }, 

  Transmission_Data: {
    chartLabel: 'Confirmed cases by Transmission Type',
    source: 'https://data.sfgov.org/resource/sunc-2t3k.json',
    titles: {
      'From Contact': 'Contact',
      'Community': 'Community',
      'Unknown': 'Unknown',
    }
  }
}