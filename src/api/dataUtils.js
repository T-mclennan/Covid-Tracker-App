import keys from '../config/keys';

const {HOSPITAL_RATE_API, ALT_CASES_DEATHS, SF_ORIGINAL_DATA, GENDER_CASES_API, RACE_ETHNICITY_API, AGE_API} = keys

export const ageConfig = {
  ageLabels: [
    '0-4',
    '5-10',
    '11-13',
    '14-17',
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
  
   urls: [
    HOSPITAL_RATE_API,
    ALT_CASES_DEATHS,
    SF_ORIGINAL_DATA,
    GENDER_CASES_API,
    RACE_ETHNICITY_API,
    AGE_API,
  ],

  titles: [
    'hospital', 
    'sample',
    'sf',
    'gender',
    'race',
    'age',
  ]
}