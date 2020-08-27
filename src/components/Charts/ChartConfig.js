export const composeData = (
  { primary, secondary, primaryLabel, secondaryLabel, dates, type },
  dayCount
) => {
  const length = dates.length;
  if (type === 'doughnut') return {};

  const averageSet = {
    label: secondaryLabel,
    type: 'line',
    data: secondary.slice(length - dayCount, length - 3),
    fill: false,
    borderColor: 'rgb(145, 142, 244)',
    backgroundColor: 'rgb(145, 142, 244)',
    pointBorderColor: 'rgb(145, 142, 244)',
    pointBackgroundColor: 'rgb(145, 142, 244)',
    pointHoverBackgroundColor: 'rgb(66, 129, 164)',
    pointHoverBorderColor: 'rgb(66, 129, 164)',
    yAxisID: 'y-axis-1',
  };

  const primarySet = {
    label: primaryLabel,
    type: 'bar',
    data: primary.slice(length - dayCount, length - 3),
    fill: false,
    backgroundColor: 'rgba(173,216,230 ,0.5 )',
    borderColor: '#3333ff',
    hoverBackgroundColor: 'rgba(173,216,230 ,1 )',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1',
  };

  const secondarySet = {
    label: secondaryLabel,
    type: 'bar',
    data: secondary.slice(length - dayCount, length - 3),
    fill: false,
    backgroundColor: 'blue',
    borderColor: 'blue',
    hoverBackgroundColor: 'rgba(173,216,230 ,1 )',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1',
  };

  switch (type) {
    case 'average':
      return { datasets: [primarySet, averageSet] };
    case 'stacked':
      return { datasets: [primarySet, secondarySet] };
    case 'pie':
      return { labels: primaryLabel, datasets: primary };
    default:
      console.log(`Chart type ${type} not recognized.`);
      return null;
  }
};

const pieOptions = {};

export const composeOptions = (
  { primary, secondary, primaryLabel, secondaryLabel, dates, type },
  dayCount
) => {
  const length = dates.length;

  const options = {
    responsive: true,
    labels: dates.slice(length - dayCount, length - 3),
    tooltips: {
      mode: 'label',
    },
    elements: {
      line: {
        fill: false,
      },
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
          stacked: true,
        },
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
