import axios from 'axios';
import keys from '../config/keys';

export const fetchCaseDeathData = async (country) => {
  let changeableUrl = keys.SF_ORIGINAL_DATA;

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
  let changeableUrl = keys.SF_ORIGINAL_DATA;
  try {
    const responseData = await axios.get(changeableUrl);
    console.log(responseData);
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

// export const fetchCountries = async () => {
//   try {
//     const {
//       data: { countries },
//     } = await axios.get(`${url}/countries`);
//     return countries.map((country) => country.name);
//   } catch (error) {
//     console.log(error);
//   }
// };
