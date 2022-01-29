import axios from 'axios';
import { dataConfig, generateColorPallete } from './dataUtils'
import { makeSevenDayAverage } from '../components/Charts/utils';
import keys from '../config/keys';

const {CASE_SUMMARY_DATA, HOSPITAL_RATE_API, DEATH_RATE_API, CASE_RATE_API, SF_ORIGINAL_DATA} = keys

export const processHospitalData = (data) => {
  try {
    const icuData = data.filter((item) => item.dphcategory === 'ICU' && item.covidstatus === 'COVID+');
    const regularPatientData = data.filter(
      (item) => item.dphcategory === 'Med/Surg' && item.covidstatus === 'COVID+'
    );
    const label = regularPatientData.map(({ reportdate }) => (new Date(reportdate)).toDateString().slice(4,10));
    const patients = regularPatientData.map(({ patientcount }) => patientcount);
    const icu = icuData.map(({ patientcount }) => patientcount);

    const [doughnutColors, colorList] = generateColorPallete(3, 'Hospital_Data')

    //Acute care 7 day average:
    const chart1 = {
      primary: patients,
      secondary: makeSevenDayAverage(patients),
      dates: label,
      primaryLabel: 'Daily acute care patients',
      secondaryLabel: 'Seven day average',
      type: 'average',
      colors: colorList[0],
    };

    //ICU care 7 day average:
    const chart2 = {
      primary: icu,
      secondary: makeSevenDayAverage(icu),
      dates: label,
      primaryLabel: 'Daily ICU patients',
      secondaryLabel: 'Seven day average',
      type: 'average',
      colors: colorList[1],
    };

    //ICU care 7 day average:
    const chart3 = {
      primary: icu,
      secondary: patients,
      dates: label,
      primaryLabel: 'Daily ICU patients',
      secondaryLabel: 'Daily Acute care patients',
      type: 'stacked',
      colors: colorList[2],
    };

    const hospitalData = {
      chart1,
      chart2,
      chart3,
      source: 'https://data.sfgov.org/resource/nxjg-bhem.json',
      details: 'https://data.sfgov.org/COVID-19/COVID-19-Hospitalizations/nxjg-bhem',
      date_recorded: label[label.length - 1],
      labelMap: {}
    };

    return hospitalData;
  } catch (error) {
    console.log(error);
  }
};

export const processDeathData = (data) => {

  const lastDay = data[data.length-1]
  const lastWeek = data.slice(data.length-7)
  const weekly_deaths = lastWeek.reduce((acc, day) => {
    return acc + +day.new_deaths
  }, 0)

  return {
    daily: +lastDay.new_deaths,
    weekly: +weekly_deaths,
    total: +lastDay.cumulative_deaths,
    source: 'https://data.sfgov.org/resource/nfpa-mg4g.json',
    details: 'https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Date-Transmission-and/tvq9-ec9w',
    date_recorded: (new Date(lastDay.date_of_death)).toDateString().slice(4,10)
    
  }
}

export const processCaseData = (data) => {
  const lastDay = data[data.length-1]
  const lastWeek = data.slice(data.length-7)
  const weekly_cases = lastWeek.reduce((acc, day) => {
    return acc + +day.new_cases
  }, 0)

  return {
    daily: +lastDay.new_cases,
    weekly: +weekly_cases,
    total: +lastDay.cumulative_cases,
    source: 'https://data.sfgov.org/resource/gyr2-k29z.json',
    details: 'https://data.sfgov.org/COVID-19/COVID-19-Cases-Over-Time/gyr2-k29z',
    date_recorded: (new Date(lastDay.date_of_death)).toDateString().slice(4,10)
  }
}

export const processSFData = (data) => {
    const dates = [],
      positive = [],
      total_tests = [],
      percent = [],
      negative = [],
      average = [];

    const sorted = data.sort((a, b) => new Date(a.specimen_collection_date) - new Date(b.specimen_collection_date));
    sorted.forEach(
      ({ specimen_collection_date, pos, pct, neg, tests }) => {
        if ((new Date(specimen_collection_date)).toDateString().slice(4, 10) !== dates[dates.length - 1]) {
          positive.push(pos);
          dates.push((new Date(specimen_collection_date)).toDateString().slice(4, 10))
          total_tests.push(tests);
          average.push(pct * 100);
          percent.push((pct * 100).toFixed(2));
          negative.push(neg);
        }
      }
    );

    const [doughnutColors, colorList] = generateColorPallete(3, 'Case_Data')

    //Positive cases + seven day average:
    const chart1 = {
      primary: positive,
      secondary: makeSevenDayAverage(positive),
      dates,
      primaryLabel: 'Positive Tests',
      secondaryLabel: '7-day average',
      type: 'average',
      colors: colorList[0],
    };

    const chart2 = {
      primary: total_tests,
      secondary: makeSevenDayAverage(total_tests),
      dates,
      primaryLabel: 'Tests Conducted',
      secondaryLabel: '7-day average',
      type: 'average',
      colors: colorList[1],
    };

    const chart3 = {
      primary: percent,
      secondary: makeSevenDayAverage(average),
      dates,
      primaryLabel: '% of positive tests',
      secondaryLabel: '7-day average',
      type: 'average',
      colors: colorList[2],
    };

    const SFData = {
      chart1,
      chart2,
      chart3,
      source: 'https://data.sfgov.org/resource/nfpa-mg4g.json',
      details: 'https://data.sfgov.org/resource/nfpa-mg4g',
      date_recorded: dates[dates.length - 1],
      labelMap: {}
    };

    return SFData;
};

export const extractDates = (data) => {
      return data.map((item) => 
        (new Date(item.specimen_collection_date)).toDateString().slice(4, 10));
}

//Processes the general datasets and produces a comparison doughnut chart and one linechart
//for each sub-category. Returns an object with these and metadata.
export const processData = (data, category) => {
  const {chartLabel, titles} = dataConfig[category];
  const processedData = processSubSet(data, Object.keys(titles))
  const organizedData = Object.values(processedData)
  const labels = Object.keys(processedData)
  const dates = extractDates(organizedData[0]);

  const [doughnutColors, colorList] = generateColorPallete(labels?.length, category)

    const chart1 = {
      primary: {
        labels: labels.map(label => titles[label]),
        datasets: [
          {
            data: organizedData.map((entry) => entry.length > 0 ? entry[entry.length-1].cumulative_cases : 0
            
            ),
            backgroundColor: doughnutColors,
          },
        ],
      },
      secondary: {},
      primaryLabel: '',
      secondaryLabel: '',
      dates: extractDates(organizedData[0]),
      chartLabel,
      type: 'doughnut',
    };

    const returnData = {
      chart1,
      source: 'https://data.sfgov.org/resource/j7i3-u9ke.json',
      details: 'https://data.sfgov.org/resource/j7i3-u9ke',
      date_recorded: dates[dates.length - 1],
    };  

    const labelMap = {}
    labels.forEach((label, i) => {
      const entry = processedData[label];
      const new_case_data =  entry.map((item) => item.new_cases)
      returnData[`chart${i+2}`] = {
        primary: new_case_data,
        secondary: makeSevenDayAverage(new_case_data),
        dates: extractDates(entry),
        primaryLabel: entry[0]?.characteristic_group,
        secondaryLabel: '7-day average',
        chartLabel: `Confirmed daily cases of ${entry[0]?.characteristic_group}`,
        type: 'average',
        colors: colorList[i % colorList.length]
      };
      labelMap[label] = `chart${i+2}`;
    })
  return {...returnData, labelMap}
};

export const processMapData = (data) => {

    return {
      primary: data,
      source: 'https://data.sfgov.org/resource/tpyr-dvnc.geojson',
      details: 'https://data.sfgov.org/resource/tpyr-dvnc.json',
      date_recorded: (new Date()).toDateString().slice(4, 10),
      chart1: {}
    };
}

//Returns data that is grouped by sub-categories, charactersitic_group.
export const processSubSet = (data, titles={}) => {
  const organizedData = {}
  data.forEach(item => {
      const {characteristic_group} = item;
      // if (titles.includes(characteristic_group)) {
        const categoryData = organizedData[`${characteristic_group}`] || [];
        organizedData[`${characteristic_group}`] = [...categoryData, item];
      // }
  })
  return organizedData
}

//Filters the dataset and returns a data object organized by characteristic_type.  
export const partitionSummaryData = (inputData) => {
  const summaryData = {}

  inputData.forEach(item => {
    //only keep the entries that show case data
    if (item.cumulative_cases) {
      const {characteristic_type} = item;
      const categoryData = summaryData[`${characteristic_type}`] || [];
      summaryData[`${characteristic_type}`] = [...categoryData, item];
    }
  })
  return summaryData;
}

export const fetchData = async (url) => {
  
  try {
    const {data} = await axios.get(url)
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const generateData = async () => {
  try {
    const combinedData = await fetchData(CASE_SUMMARY_DATA);
    const hospitalData = await fetchData(HOSPITAL_RATE_API);
    const deathData = await fetchData(DEATH_RATE_API)
    const caseData = await fetchData(CASE_RATE_API)
    const sfData = await fetchData(SF_ORIGINAL_DATA)
    const partitionedData = partitionSummaryData(combinedData)

    // Object.entries(partitionedData).forEach(entry => {
    //   const [key, value] = entry;
    //   console.log(key)
    //   console.log(value)
    // });

    const Age_Data = processData(partitionedData['Age Group'], 'Age_Data');
    const Race_Data = processData(partitionedData['Race/Ethnicity'], 'Race_Data');
    const Gender_Data = processData(partitionedData['Gender'], 'Gender_Data');
    const Sexual_Data = processData(partitionedData['Sexual Orientation'], 'Sexual_Data')
    const Transmission_Data = processData(partitionedData['Transmission Type'], 'Transmission_Data')
    const Hospital_Data = processHospitalData(hospitalData)
    const Death_Data = processDeathData(deathData)
    const Case_Data = processCaseData(caseData)
    const SF_Data = processSFData(sfData)

    return {Age_Data, Race_Data, Gender_Data, Sexual_Data, Hospital_Data, Death_Data, Case_Data, SF_Data, Transmission_Data};
  } catch(error) {
    console.log(error)
  }
}

export const generateTableData = (data) => {
  const titles = Object.keys(data);
  return titles.map((title) => {
    const {source, date_recorded, details} = data[`${title}`]
    return {title, source, date: date_recorded, details}
  })
}