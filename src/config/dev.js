module.exports = {
  //Tokens:
  MAPBOX_TOKEN:
    'pk.eyJ1IjoidG1jbGVubmFuIiwiYSI6ImNrZTdpN2wwYjFoOG8yeXFnd25wc2N4YzcifQ.r850FQb6ArgwOR11LPhxbA',

  //SODA data access tokens:
  SODA_APP_TOKEN: 'ZZTDsFbChmBjIDzoNPxj1U13s',
  SODA_SECRET_TOKEN: '7XMypTS5annUPvpWSZsr0V4Hymi-0uCpuJGa',

  //Endpoints:
  //COVID-19 Cases Summarized by Date, Transmission and Case Disposition
  //Inludes: age, gender, sexual orientation, homelessness
  CASE_SUMMARY_DATA: 'https://data.sfgov.org/resource/j7i3-u9ke.json?$limit=40000',

  //Deaths - over time:
  DEATH_DATA: 'https://data.sfgov.org/resource/g2di-xufg.json',

  //  Covid Tracking API - State / National
  COVID_TRACKING_API: 'https://api.covidtracking.com',

  //  Transmission / Case type API - San Francisco
  DASHBOARD_API: 'https://data.sfgov.org/resource/tvq9-ec9w.json?$limit=10000',

  //  Response Data / Reports API - San Francisco
  RESPONSE_DATA_API: 'https://data.sfgov.org/resource/fjki-2fab.json?$limit=10000',

  // Hospitalization Rates - San Francisco
  HOSPITAL_RATE_API: 'https://data.sfgov.org/resource/nxjg-bhem.json?$limit=10000',

  // Map of cases - San Francisco
  CASES_MAP_API: 'https://data.sfgov.org/resource/tpyr-dvnc.json',
  CASES_MAP_GEOJSON: 'https://data.sfgov.org/resource/tpyr-dvnc.geojson',

  // Cases summarized by gender - San Francisco
  GENDER_CASES_API: 'https://data.sfgov.org/resource/nhy6-gqam.json?$limit=10000',

  // Cases summarized by race / ethnicity - San Francisco
  RACE_ETHNICITY_API:
    'https://data.sfgov.org/resource/vqqm-nsqg.json?$limit=10000',

  // Cases summarized by age - San Francisco
  AGE_API: 'https://data.sfgov.org/resource/sunc-2t3k.json?$limit=10000',

  // DETAILS: 'https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Date-Transmission-and/tvq9-ec9w',
  ALT_CASES_DEATHS: 'https://data.sfgov.org/resource/tvq9-ec9w.json?$limit=10000',

  // Misc APIs:
  SF_ORIGINAL_DATA:
    'https://data.sfgov.org/resource/nfpa-mg4g.json?$limit=10000',
  US_COVID_DATA: 'https://covid19.mathdro.id/api',

  DEATH_RATE_API: 'https://data.sfgov.org/resource/g2di-xufg.json',
  CASE_RATE_API: 'https://data.sfgov.org/resource/gyr2-k29z.json',
};
