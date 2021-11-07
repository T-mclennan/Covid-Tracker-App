import axios from 'axios';
import { dataConfig } from './dataUtils'
import { makeSevenDayAverage } from '../components/Charts/utils';
import keys from '../config/keys';

const {CASE_SUMMARY_DATA} = keys

export const processHospitalData = (data) => {
  try {
    const icuData = data.filter((item) => item.dphcategory === 'ICU');
    const regularPatientData = data.filter(
      (item) => item.dphcategory === 'Med/Surg'
    );
    const label = regularPatientData.map(({ reportdate }) => (new Date(reportdate)).toDateString().slice(4,10));
    const patients = regularPatientData.map(({ patientcount }) => patientcount);
    const icu = icuData.map(({ patientcount }) => patientcount);

    //Acute care 7 day average:
    const chart1 = {
      primary: patients,
      secondary: makeSevenDayAverage(patients),
      dates: label,
      primaryLabel: 'Daily acute care patients',
      secondaryLabel: 'Seven day average',
      type: 'average',
      colors: {
        primary: 'rgba(111, 255, 233, 0.5)',
        secondary: 'rgba(10, 173, 149, 0.7)',
      },
    };

    //ICU care 7 day average:
    const chart2 = {
      primary: icu,
      secondary: makeSevenDayAverage(icu),
      dates: label,
      primaryLabel: 'Daily ICU patients',
      secondaryLabel: 'Seven day average',
      type: 'average',
      colors: {
        primary: 'rgba(131, 188, 255, 0.5)',
        secondary: 'rgba(43, 85, 133, 0.7)',
      },
    };

    //ICU care 7 day average:
    const chart3 = {
      primary: icu,
      secondary: patients,
      dates: label,
      primaryLabel: 'Daily ICU patients',
      secondaryLabel: 'Daily Acute care patients',
      type: 'stacked',
      colors: {
        primary: 'rgba(111, 255, 233, 0.5)',
        secondary: 'rgba(131, 188, 255, 0.5)',
      },
    };

    const hospitalData = {
      chart1,
      chart2,
      chart3,
      source: 'https://data.sfgov.org/resource/nxjg-bhem.json',
      details: 'https://data.sfgov.org/COVID-19/COVID-19-Hospitalizations/nxjg-bhem',
      date_recorded: label[label.length - 1],
    };

    return hospitalData;
  } catch (error) {
    console.log(error);
  }
};

export const processSampleData = (data) => {

    let cases = 0
    let deaths = 0
    let weekly_cases = 0
    let weekly_deaths = 0
    let daily_cases = 0
    let daily_deaths = 0
    
    data.forEach(({case_disposition, case_count}) => {
        if (case_disposition === "Confirmed") {
          cases += parseInt(case_count)
        }
        if (case_disposition === "Death") {
          deaths += parseInt(case_count)
        }
    })
    data.slice(0, 22).forEach(({case_disposition, case_count}) => {
      if (case_disposition === "Confirmed") {
        weekly_cases += parseInt(case_count)
      }
      if (case_disposition === "Death") {
        weekly_deaths += parseInt(case_count)
      }
    })
    data.slice(0, 4).forEach(({case_disposition, case_count}) => {
      if (case_disposition === "Confirmed") {
        daily_cases += parseInt(case_count)
      }
      if (case_disposition === "Death") {
        daily_deaths += parseInt(case_count)
      }
    })

    return {
      cases: {
        daily: daily_cases,
        weekly: weekly_cases,
        total: cases,
      },
      deaths: {
        daily: daily_deaths,
        weekly: weekly_deaths,
        total: deaths,
      },
      source: 'https://data.sfgov.org/resource/nfpa-mg4g.json',
      details: 'https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Date-Transmission-and/tvq9-ec9w',
      date_recorded: (new Date(data[0].specimen_collection_date)).toDateString().slice(4,10)
      
    }
}

export const processSFData = (data) => {
    const dates = [],
      positive = [],
      total_tests = [],
      percent = [],
      negative = [],
      average = [];

    data.forEach(
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

    //Positive cases + seven day average:
    const chart1 = {
      primary: positive,
      secondary: makeSevenDayAverage(positive),
      dates,
      primaryLabel: 'Positive Tests',
      secondaryLabel: '7-day average',
      type: 'average',
      colors: {
        primary: 'rgba(146, 201, 219, 0.5)',
        secondary: 'rgba(25, 195, 214, 0.5)',
      },
    };

    const chart2 = {
      primary: total_tests,
      secondary: makeSevenDayAverage(total_tests),
      dates,
      primaryLabel: 'Tests Conducted',
      secondaryLabel: '7-day average',
      type: 'average',
      colors: {
        primary: 'rgba(159, 233, 211, 0.5)',
        secondary: 'rgba(26, 153, 115, 0.7)',
      },
    };

    const chart3 = {
      primary: percent,
      secondary: makeSevenDayAverage(average),
      dates,
      primaryLabel: '% of positive tests',
      secondaryLabel: '7-day average',
      type: 'average',
      colors: {
        primary: 'rgba(230, 194, 173, 0.5)',
        secondary: 'rgba(173, 81, 27, 0.7)',
      },
    };

    const SFData = {
      chart1,
      chart2,
      chart3,
      source: 'https://data.sfgov.org/resource/nfpa-mg4g.json',
      details: 'https://data.sfgov.org/stories/s/San-Francisco-COVID-19-Data-and-Reports/fjki-2fab',
      date_recorded: dates[dates.length - 1],
    };

    return SFData;
};

export const extractDates = (data) => {
      return data.map((item) => 
        (new Date(item.specimen_collection_date)).toDateString().slice(4, 10));
}

export const processData = (data, category) => {
  const {doughnutColors, colorList, chartLabel, titles} = dataConfig[category];
  const processedData = processSubSet(data, Object.keys(titles))
  const organizedData = Object.values(processedData)
  const labels = Object.keys(processedData)
  const dates = extractDates(organizedData[0]);

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
      source: 'https://data.sfgov.org/resource/sunc-2t3k.json',
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
export const processSubSet = (data, titles) => {
  const organizedData = {}
  data.forEach(item => {
      const {characteristic_group} = item;
      if (titles.includes(characteristic_group)) {
        const categoryData = organizedData[`${characteristic_group}`] || [];
        organizedData[`${characteristic_group}`] = [...categoryData, item];
      }
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

export const fetchSummaryData = async () => {
  
  try {
    const {data} = await axios.get(CASE_SUMMARY_DATA)
    return data;
  } catch (error) {
    console.log(error)
  }
}

// const processes = [processHospitalData, processSampleData, processSFData, processGenderData, processRaceData, processAgeData, processMapData]
  
export const generateData = async () => {
  try {
    const combinedData = await fetchSummaryData();
    const partitionedData = partitionSummaryData(combinedData)

    Object.entries(partitionedData).forEach(entry => {
      const [key, value] = entry;
      // console.log(key)
      // console.log(value)
    });

    const Age_Data = processData(partitionedData['Age Group'], 'Age_Data');
    const Race_Data = processData(partitionedData['Race/Ethnicity'], 'Race_Data');
    const Gender_Data = processData(partitionedData['Gender'], 'Gender_Data');
    const Sexual_Data = processData(partitionedData['Sexual Orientation'], 'Sexual_Data')

    console.log(Race_Data)
    // const unparsed = processSubSet(partitionedData['Sexual Orientation']);

    return {Age_Data, Race_Data, Gender_Data, Sexual_Data};
  } catch(error) {
    console.log(error)
  }
}

export const generateTableData = (data) => {
  // return titles.map((title) => {
  //   const {source, date_recorded, details} = data[`${title}`]
  //   return {title, source, date: date_recorded, details}
  // })
}