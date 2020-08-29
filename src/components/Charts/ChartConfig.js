export const composeData = (
  { primary, secondary, primaryLabel, secondaryLabel, dates, type, colors },
  dayCount
) => {
  const length = dates.length;
  if (type === 'doughnut') return {};

  const averageLine = {
    label: secondaryLabel,
    type: 'line',
    data: secondary.slice(length - dayCount, length - 3),
    fill: false,
    borderColor: colors.secondary,
    backgroundColor: colors.secondary,
    pointBorderColor: colors.secondary,
    pointBackgroundColor: colors.secondary,
    pointHoverBackgroundColor: 'rgb(66, 129, 164)',
    pointHoverBorderColor: 'rgb(66, 129, 164)',
  };

  const primaryBar = {
    label: primaryLabel,
    type: 'bar',
    data: primary.slice(length - dayCount, length - 3),
    fill: false,
    // backgroundColor: 'rgba(173,216,230 ,0.5 )',
    backgroundColor: colors.primary,
    borderColor: '#3333ff',
    hoverBackgroundColor: 'rgba(173,216,230 ,1 )',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1',
  };

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
    fill: true,
    // backgroundColor: 'rgba(75,192,192,0.2)',
    backgroundColor: colors.secondary,
    borderColor: 'rgba(75,192,192,1)',
  };

  const line2 = {
    label: secondaryLabel,
    data: secondary,
    fill: true,
    borderColor: '#742774',
    // backgroundColor: 'rgba(116, 39, 116, 0.2)',
    backgroundColor: colors.secondary,
  };

  switch (type) {
    case 'average':
      return { datasets: [averageLine, primaryBar] };
    case 'stacked':
      return { datasets: [primaryBar, secondaryBar] };
    case 'line':
      return { datasets: [line2, line1] };
    default:
      console.log(`Chart type ${type} not recognized.`);
      return null;
  }
};

export const composeOptions = ({ dates }, dayCount) => {
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
          stacked: true,
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

  const theoptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      mode: 'nearest',
    },
    cornerRadius: 20,
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 4,
            fontSize: 12,
            fontFamily: 'Montserrat',
            fontColor: '#0f1222',
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            fontSize: 12,
            fontFamily: 'Montserrat',
            fontColor: '#0f1222',
          },
        },
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
