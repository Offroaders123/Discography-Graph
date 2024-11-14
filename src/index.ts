import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

const ctx = document.getElementById('releaseTimeline').getContext('2d');

// Data configuration
const data = {
  labels: [
    'Vocals',
    'Guitar',
    'Keyboards',
    'Bass',
    'Drums',
  ],
  datasets: [
    {
      label: "Russell Allen",
      backgroundColor: 'red',
      data: [{ x: '1995-01-01', y: 'Vocals', x2: 'present' }]
    },
    {
      label: "Michael Romeo",
      backgroundColor: 'green',
      data: [{ x: '1994-01-01', y: 'Guitar', x2: 'present' }]
    },
    // Add other band members as needed
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
        labels: ['Vocals', 'Guitar', 'Keyboards', 'Bass', 'Drums'],
        title: {
          display: true,
          text: 'Band Members'
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
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: '1994-06-01',
            borderColor: 'gray',
            borderWidth: 2,
            label: {
              content: 'Demo Release',
              enabled: true,
              position: 'top',
              backgroundColor: 'rgba(128,128,128,0.8)'
            }
          },
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: '1994-12-06',
            borderColor: 'black',
            borderWidth: 2,
            label: {
              content: 'Studio Album',
              enabled: true,
              position: 'top',
              backgroundColor: 'rgba(0,0,0,0.8)'
            }
          },
          // Add more annotations as needed for other releases
        ]
      }
    }
  }
};

new Chart(ctx, config);