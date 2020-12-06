import {
  fetchSFData,
  fetchHospitalData,
  fetchMapGeoJSON,
  fetchGenderData,
  fetchRaceData,
  fetchAgeData,
  fetchSampleData
} from '../../api/old-index';

export const fetchData = (criteria) => {
  switch (criteria) {
    case 'HOSPITAL_DATA':
      return fetchHospitalData();
    case 'SF_CASE_DATA':
      return fetchSFData();
    case 'GENDER_DATA':
      return fetchGenderData();
    case 'RACE_DATA':
      return fetchRaceData();
    case 'AGE_DATA':
      return fetchAgeData();
    case 'MAP_DATA':
      return fetchMapGeoJSON();
    case 'SAMPLE_DATA':
      return fetchSampleData();
    default:
      console.log(`Criteria ${criteria} not recognized.`);
      return null;
  }
};

export const fetchTitle = (criteria) => {
  switch (criteria) {
    case 'HOSPITAL_DATA':
      return 'Hospital Data';
    case 'SF_CASE_DATA':
      return 'Total Cases';
    case 'GENDER_DATA':
      return 'Cases by Gender';
    case 'RACE_DATA':
      return 'Cases by Race';
    case 'AGE_DATA':
      return 'Cases by Age';
    case 'MAP_DATA':
      return 'Cases by Neighborhood';
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

      const average = sum === 0 ? 0 : sum / (i + 1);

      ret.push(Math.round(average).toString());
    } else {
      sum -= parseInt(dataset[i - 7]);
      sum += parseInt(dataset[i]);
      const average = sum / 7;
      ret.push(average.toFixed(2).toString());
    }
  }
  return ret;
};
