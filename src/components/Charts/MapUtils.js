import React from 'react';

const layers = [
  '0-20',
  '20-40',
  '40-60',
  '60-80',
  '80-100',
  '100-120',
  '120-140',
  '140-160',
  '160-180',
  '180+',
];
const colors = [
  '#ebfff9',
  '#9effe2',
  '#70ffe7',
  '#01f4d7',
  '#01efeb',
  '#01dcdf',
  '#01c7d5',
  '#01aed5',
  '#0180d5',
  '#005fdb',
];

export const generateLegend = () => {
  return layers.map((layer, i) => {
    return (
      <div key={i}>
        <span className='legend-key' style={{ backgroundColor: colors[i] }} />{' '}
        {layer}
      </div>
    );
  });
};
