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

export const dataConfig = {
  
  //  urls: [
  //   HOSPITAL_RATE_API,
  //   ALT_CASES_DEATHS,
  //   SF_ORIGINAL_DATA,
  //   GENDER_CASES_API,
  //   RACE_ETHNICITY_API,
  //   AGE_API,
  //   CASES_MAP_GEOJSON
  // ],

  Hospital_Data: {
  },

  Outcome_Data: {},
  Case_Data: {},
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
    doughnutColors: [
      'rgba(94, 233, 175, 0.6)',
      'rgba(216, 194, 107, 0.6)',
      'rgba(226, 139, 84, 0.5)',
      'rgba(44, 182, 228, 0.5)',
      '#dca7f1',
      'rgba(100, 77, 212, 0.6)',
      'rgba(184, 70, 123, 0.6)',
    ],
    colorList: [
      {
        primary: 'rgba(94, 233, 175, 0.6)',
        secondary: 'rgba(50, 205, 216, 0.6)',
      },
      {
        primary: 'rgba(226, 139, 84, 0.5)',
        secondary: 'rgba(196, 82, 41, 0.6)',
      },
      {
        primary: 'rgba(216, 194, 107, 0.6)',
        secondary: 'rgba(204, 143, 68, 0.6)',
      },
      {
        primary: 'rgba(44, 182, 228, 0.5)',
        secondary: 'rgba(50, 104, 206, 0.6)',
      },
      {
        primary: '#dca7f1',
        secondary: '#752e91',
      },
      {
        primary: 'rgba(131, 74, 197, 0.6)',
        secondary: 'rgba(67, 49, 185, 0.6)',
      },
      {
        primary: 'rgba(190, 111, 184, 0.6)',
        secondary: 'rgba(160, 48, 170, 0.6)',
      },
    ]
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
  }
}