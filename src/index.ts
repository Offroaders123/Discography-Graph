import { Chart, BarController, BarElement, CategoryScale, LinearScale, TimeScale, Tooltip, Legend, ScatterController, PointElement } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(PointElement, ScatterController, BarController, BarElement, CategoryScale, LinearScale, TimeScale, Tooltip, Legend);

const ctx = document.getElementById('releaseTimeline').getContext('2d');

// Data configuration
const data = {
  datasets: [
    // Band Members
    {
      label: "Rod Tyler",
      backgroundColor: 'red',
      data: [{ x: '1994-01-01', y: 'Vocals' }, { x: '1995-01-01', y: 'Vocals' }]
    },
    {
      label: "Russell Allen",
      backgroundColor: 'red',
      data: [{ x: '1995-01-01', y: 'Vocals' }, { x: '2024-01-01', y: 'Vocals' }]
    },
    {
      label: "Michael Romeo",
      backgroundColor: 'green',
      data: [{ x: '1994-01-01', y: 'Guitar' }, { x: '2024-01-01', y: 'Guitar' }]
    },
    {
      label: "Michael Pinnella",
      backgroundColor: 'purple',
      data: [{ x: '1994-01-01', y: 'Keyboards' }, { x: '2024-01-01', y: 'Keyboards' }]
    },
    // Releases
    {
      type: 'scatter',
      label: 'Studio Album',
      pointBackgroundColor: 'black',
      pointBorderColor: 'black',
      data: [
        { x: '1994-12-06', y: 'Albums' },
        { x: '1995-11-06', y: 'Albums' },
        { x: '1996-11-01', y: 'Albums' },
        { x: '1998-03-13', y: 'Albums' },
        { x: '2000-10-09', y: 'Albums' },
        { x: '2002-11-04', y: 'Albums' },
        { x: '2007-06-26', y: 'Albums' },
        { x: '2011-06-17', y: 'Albums' },
        { x: '2015-07-24', y: 'Albums' },
      ],
      showLine: false,
      pointRadius: 5,
    },
    {
      type: 'scatter',
      label: 'Other Release',
      pointBackgroundColor: 'gray',
      pointBorderColor: 'gray',
      data: [
        { x: '1994-06-01', y: 'Albums' },
        { x: '1999-02-02', y: 'Albums' },
        { x: '2001-11-13', y: 'Albums' },
      ],
      showLine: false,
      pointRadius: 5,
    }
  ]
};

// Chart configuration
const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    indexAxis: 'y',  // Makes bars horizontal
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year',
          tooltipFormat: 'MMMM dd, yyyy',
          displayFormats: {
            year: 'yyyy'
          }
        },
        title: {
          display: true,
          text: 'Timeline'
        }
      },
      y: {
        type: 'category',
        labels: ['Vocals', 'Guitar', 'Keyboards', 'Bass', 'Drums', 'Albums'],
        title: {
          display: true,
          text: 'Band Members & Releases'
        },
        reverse: true // Reverses the order to align with the typical timeline
      }
    },
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context) => context.raw?.title || context.dataset.label
        }
      }
    }
  }
};

// Render the chart
new Chart(ctx, config);