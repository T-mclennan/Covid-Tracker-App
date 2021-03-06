export const composeData = (
  { primary, secondary, primaryLabel, secondaryLabel, dates, type, colors },
  dayCount
) => {
  if (type === 'doughnut') return {};
  const length = dates.length - 3;
  const offset =
    dayCount === 'All data' || dayCount > length ? length : dayCount;

  const averageLine = {
    label: secondaryLabel,
    type: 'line',
    data: secondary.slice(length - offset, length),
    fill: false,
    pointRadius: 2,
    pointHoverRadius: 5,
    borderColor: colors.secondary,
    pointBorderColor: colors.secondary,
    pointBackgroundColor: colors.secondary,
    pointHoverBackgroundColor: colors.secondary,
    pointHoverBorderColor: 'whitesmoke',
  };

  const primaryBar = {
    label: primaryLabel,
    type: 'bar',
    data: primary.slice(length - offset, length),
    fill: false,
    backgroundColor: colors.primary,
    borderColor: '#3333ff',
    hoverBackgroundColor: colors.secondary,
    hoverBorderColor: colors.secondary,
    yAxisID: 'y-axis-1',
  };

  const secondaryBar = {
    label: secondaryLabel,
    type: 'bar',
    data: secondary.slice(length - offset, length),
    fill: false,
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    hoverBackgroundColor: 'rgba(173,216,230 ,1 )',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1',
  };

  const line1 = {
    label: primaryLabel,
    data: primary.slice(length - offset, length),
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
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  };

  const line2 = {
    label: secondaryLabel,
    data: secondary.slice(length - offset, length),
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

export const doughnutOptions = (mobile) => {
  const desktopOptions = {
    legend: {
      display: true,
      position: "bottom",
      align: 'center',
      responsive: true,
      maintainAspectRatio: true,
      labels: {
        fontSize: 12,
        padding: 10,
        boxWidth: 12,
      }
    },
  }

  const mobileOptions = {
    legend: {
      display: true,
      position: "bottom",
      align: 'center',
      responsive: true,
      maintainAspectRatio: true,
      labels: {
        fontSize: 12,
        padding: 10,
        boxWidth: 12,
      }
    },
  }
  return mobile ? mobileOptions : desktopOptions
}
  

export const composeOptions = ({ dates, type }, dayCount) => {
  const length = dates.length - 3;
  const offset =
    dayCount === 'All data' || dayCount > length ? length : dayCount;

  const mobileOptions = {
    display: true,
    position: "bottom",
    align: 'center',
    labels: {
      fontSize: 11,
      padding: 5,
      boxWidth: 12,
    }
  }

  const desktopOptions = {
    display: true,
    position: "bottom",
    align: 'center',
    labels: {
      fontSize: 11,
      padding: 5,
      boxWidth: 12,
    }
  }
  
  const options = {
    responsive: true,
    labels: dates.slice(length - offset, length),
    tooltips: {
      mode: 'label',
    },
    legend: window.innerWidth <= 500 ? mobileOptions : desktopOptions,

    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
          },
          stacked: true,
          labels: dates.slice(length - offset, length),
          ticks: {
            autoSkip: true,
            maxTicksLimit: window.innerWidth <= 500? 10 : 17,
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
            show: false,
          },
          stacked: type !== 'line',
          ticks: {
            autoSkip: true,
            maxTicksLimit: window.innerWidth <= 500? 6 : 10,
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
