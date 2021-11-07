
export const fetchTitle = (criteria) => {
  switch (criteria) {
    case 'HOSPITAL_DATA':
      return 'Hospital Data';
    case 'SF_CASE_DATA':
      return 'Case Data';
    case 'GENDER_DATA':
      return 'Gender Data';
    case 'RACE_DATA':
      return 'Race Data';
    case 'AGE_DATA':
      return 'Age Data';
    case 'SEXUAL_DATA':
      return 'Sexual Orientation';
    case 'TRANSMISSION_DATA':
      return 'Transmission Vector';
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

export const findWidth = () => {
  const {innerWidth} = window
  let ret = null
  if (innerWidth >= 800) {
    ret = '46rem'
  } else if (innerWidth >= 700 && innerWidth < 800) {
    ret = '40rem'
  } else if (innerWidth >= 600 && innerWidth < 700) {
    ret = '35rem'
  } else if (innerWidth >= 500 && innerWidth < 600) {
    ret = '28rem'
  } else {
    ret = '100%'
    
  }
  return ret
}