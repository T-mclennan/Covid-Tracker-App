import {
  fetchSFData,
  fetchCaseDeathData,
  fetchHospitalData,
  fetchTestApi,
} from '../../api';

export const fetchData = async (criteria) => {
  switch (criteria) {
    case 'HOSPITAL_DATA':
      return fetchHospitalData();
    case 'SF_CASE_DATA':
      return fetchSFData();
    case 'TEST':
      return fetchTestApi();
    default:
      console.log(`Criteria ${criteria} not recognized.`);
      return null;
  }
};

export const makeSevenDayAverage = (dataset) => {
  const ret = [];
  let sum = 0;
  for (let i = 0; i < dataset.length; i++) {
    if (i < 7) {
      sum += parseInt(dataset[i]);

      const average = sum === 0 ? 0 : sum / i + 1;

      ret.push(Math.round(average).toString());
    } else {
      sum -= parseInt(dataset[i - 7]);
      sum += parseInt(dataset[i]);
      const average = sum / 7;
      ret.push(Math.round(average).toString());
    }
  }
  return ret;
};
