export const composeData = (
  { primary, secondary, primaryLabel, secondaryLabel, dates, type, colors },
  dayCount
) => {
  const length = dates.length;
  if (type === 'doughnut') return {};

  console.log(colors.secondary);

  const averageLine = {
    label: secondaryLabel,
    type: 'line',
    data: secondary.slice(length - dayCount, length - 3),
    fill: false,
    // borderJoinStyle: 'miter',
    pointRadius: 2,
    pointHoverRadius: 5,
    borderColor: colors.secondary,
    // backgroundColor: colors.secondary,
    pointBorderColor: colors.secondary,
    pointBackgroundColor: colors.secondary,
    pointHoverBackgroundColor: colors.secondary,
    pointHoverBorderColor: 'whitesmoke',
  };

  const primaryBar = {
    label: primaryLabel,
    type: 'bar',
    data: primary.slice(length - dayCount, length - 3),
    fill: false,
    backgroundColor: colors.primary,
    borderColor: '#3333ff',
    hoverBackgroundColor: colors.secondary,
    hoverBorderColor: colors.secondary,
    yAxisID: 'y-axis-1',
  };

  // fill: false,
  // lineTension: 0.1,
  // backgroundColor: 'rgba(75,192,192,0.4)',
  // borderColor: 'rgba(75,192,192,1)',
  // borderCapStyle: 'butt',
  // borderDash: [],
  // borderDashOffset: 0.0,
  // borderJoinStyle: 'miter',
  // pointBorderColor: 'rgba(75,192,192,1)',
  // pointBackgroundColor: '#fff',
  // pointBorderWidth: 1,
  // pointHoverRadius: 5,
  // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  // pointHoverBorderColor: 'rgba(220,220,220,1)',
  // pointHoverBorderWidth: 2,
  // pointRadius: 1,
  // pointHitRadius: 10,
  // data: [65, 59, 80, 81, 56, 55, 40]

  const secondaryBar = {
    label: secondaryLabel,
    type: 'bar',
    data: secondary.slice(length - dayCount, length - 3),
    fill: false,
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    hoverBackgroundColor: 'rgba(173,216,230 ,1 )',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1',
  };

  const line1 = {
    label: primaryLabel,
    data: primary,
    type: 'line',
    fill: true,
    lineTension: 0.1,
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: colors.primary,
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    // backgroundColor: 'rgba(75,192,192,0.2)',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  };

  const line2 = {
    label: secondaryLabel,
    data: secondary,
    type: 'line',
    fill: true,
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'colors.secondary',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    borderColor: colors.secondary,
    // backgroundColor: 'rgba(116, 39, 116, 0.2)',
    backgroundColor: colors.secondary,
  };

  switch (type) {
    case 'average':
      return { datasets: [averageLine, primaryBar] };
    case 'stacked':
      return { datasets: [primaryBar, secondaryBar] };
    case 'line':
      return { datasets: [line1, line2] };
    default:
      console.log(`Chart type ${type} not recognized.`);
      return null;
  }
};

export const composeOptions = ({ dates, type }, dayCount) => {
  const length = dates.length;

  const options = {
    responsive: true,
    labels: dates.slice(length - dayCount, length - 3),
    tooltips: {
      mode: 'label',
    },
    legend: {
      display: true,
      padding: 10,
    },

    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          stacked: true,
          labels: dates.slice(length - dayCount, length - 3),
          ticks: {
            autoSkip: true,
            maxTicksLimit: 22,
            // fontSize: 12,
            // fontFamily: 'Montserrat',
            // fontColor: '#0f1222',
          },
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
          stacked: false,
        },
        // {},
        // {
        //   type: 'linear',
        //   display: true,
        //   position: 'right',
        //   id: 'y-axis-2',
        //   gridLines: {
        //     display: false,
        //   },
        //   labels: {
        //     show: true,
        //   },
        // },
      ],
    },
  };

  return options;
};

export const legend = {
  display: true,
  position: 'bottom',
  labels: {
    fontColor: '#323130',
    fontSize: 14,
  },
};
