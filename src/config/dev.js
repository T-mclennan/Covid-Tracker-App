module.exports = {
  //Tokens:
  MAPBOX_TOKEN:
    'pk.eyJ1IjoidG1jbGVubmFuIiwiYSI6ImNrZTdpN2wwYjFoOG8yeXFnd25wc2N4YzcifQ.r850FQb6ArgwOR11LPhxbA',

  //SODA data access tokens:
  SODA_APP_TOKEN: 'ZZTDsFbChmBjIDzoNPxj1U13s',
  SODA_SECRET_TOKEN: '7XMypTS5annUPvpWSZsr0V4Hymi-0uCpuJGa',

  //Endpoints:

  //  Covid Tracking API - State / National
  //  https://covidtracking.com/data/api
  COVID_TRACKING_API: 'https://api.covidtracking.com',

  //  Transmission / Case type API - San Francisco
  //  Details: https://data.sfgov.org/resource/tvq9-ec9w
  //  Example: https://data.sfgov.org/stories/s/COVID-19-Cases-and-Deaths/dak2-gvuj
  DASHBOARD_API: 'https://data.sfgov.org/resource/tvq9-ec9w.json',

  //  Response Data / Reports API - San Francisco
  //  Details: 'https://data.sfgov.org/stories/s/San-Francisco-COVID-19-Data-and-Reports/fjki-2fab',
  RESPONSE_DATA_API: 'https://data.sfgov.org/resource/fjki-2fab.json',

  // Hospitalization Rates - San Francisco
  // Details: 'https://data.sfgov.org/COVID-19/COVID-19-Hospitalizations/nxjg-bhem'
  HOSPITAL_RATE_API: 'https://data.sfgov.org/resource/nxjg-bhem.json?$limit=2000',

  // Map of cases - San Francisco
  // Details: https://data.sfgov.org/stories/s/Map-of-Cumulative-Cases/adm5-wq8i/
  CASES_MAP_API: 'https://data.sfgov.org/resource/tpyr-dvnc.json',
  CASES_MAP_GEOJSON: 'https://data.sfgov.org/resource/tpyr-dvnc.geojson',

  // Cases summarized by gender - San Francisco
  // Details: https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Gender/nhy6-gqam
  GENDER_CASES_API: 'https://data.sfgov.org/resource/nhy6-gqam.json',

  // Cases summarized by race / ethnicity - San Francisco
  // Details: https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Race-and-Ethnicity/vqqm-nsqg
  RACE_ETHNICITY_API:
    'https://data.sfgov.org/resource/vqqm-nsqg.json?$limit=5000',

  // Cases summarized by age - San Francisco
  // DETAILS: 'https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Age-Group/sunc-2t3k',
  AGE_API: 'https://data.sfgov.org/resource/sunc-2t3k.json?$limit=5000',

  // DETAILS: 'https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Date-Transmission-and/tvq9-ec9w',
  ALT_CASES_DEATHS: 'https://data.sfgov.org/resource/tvq9-ec9w.json',


  // Misc APIs:
  SF_ORIGINAL_DATA:
    'https://data.sfgov.org/resource/nfpa-mg4g.json?$limit=5000',
  US_COVID_DATA: 'https://covid19.mathdro.id/api',
};
