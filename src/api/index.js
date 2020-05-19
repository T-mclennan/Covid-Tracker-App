import axios from 'axios';

const countryUrl = 'https://covid19.mathdro.id/api';
const url = 'https://covid19.mathdro.id/api';
const urlSF = 'https://data.sfgov.org/resource/nfpa-mg4g.json';
const urlUS = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = urlSF;

  try {
    const {
      data: { result_date, tests, pos, pct },
    } = await axios.get(changeableUrl);

    const modifiedData = {
      result_date,
      tests,
      pos,
      pct,
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSFData = async () => {
  let changeableUrl = urlSF;
  try {
    const responseData = await axios.get(changeableUrl);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     const modifiedData = data.map((dailyData) => ({
//       confirmed: dailyData.confirmed.total,
//       deaths: dailyData.deaths.total,
//       date: dailyData.reportDate,
//     }));
//     return modifiedData;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
