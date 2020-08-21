import React, { Component } from 'react';
import Chart from 'chart.js';
import { fetchSFData } from '../../api';
import classes from './NewCasesChart.module.css';

export default class NewCasesChart extends Component {
  state = {
    data: '',
    labels: '',
  };

  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');
    this.fetchAPI();
    new Chart(myChartRef, {
      type: 'line',
      data: {
        //Bring in data
        labels: this.state.labels,
        datasets: [
          {
            label: 'Cases of Covid',
            data: this.state.data,
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  }

  // const fetchAPI = async () => {
  //   const { data } = await fetchSFData();
  //   this.setState({
  //     data: data.slice(60).map(({ pos }) => pos),
  //     labels: data.slice(60).map(({ specimen_collection_date }) => {
  //       return specimen_collection_date.slice(5, 10);
  //     }),
  //   });
  // };

  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id='myChart' ref={this.chartRef} />
      </div>
    );
  }
}
