import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

const ctx = document.getElementById('releaseTimeline').getContext('2d');

const today: string = new Date().toISOString().split("T")[0]!; // Replace "present" with today's date

function annotation({ type, date }: { type: "studio" | "other"; date: string; }) {
  switch (type) {
    case "studio": return {
      type: 'line',
      mode: 'vertical',
      scaleID: 'x',
      value: date,
      borderColor: 'black',
      borderWidth: 2,
      label: {
        content: 'Studio Album',
        enabled: true,
        position: 'top',
        backgroundColor: 'rgba(0,0,0,0.8)'
      }
    };
    case "other": return {
      type: 'line',
      mode: 'vertical',
      scaleID: 'x',
      value: date,
      borderColor: 'gray',
      borderWidth: 2,
      label: {
        content: 'other Release',
        enabled: true,
        position: 'top',
        backgroundColor: 'rgba(128,128,128,0.8)'
      }
    };
  }
}

// Render the chart
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [
      'Vocals',
      'Guitar',
      'Keyboards',
      'Bass',
      'Drums',
    ],
    datasets: [
      // Band Members
      {
        label: "Rod Tyler",
        backgroundColor: 'red',
        data: [{ x: '1994-01-01', y: 'Vocals', x2: '1995-01-01' }]
      },
      {
        label: "Russell Allen",
        backgroundColor: 'red',
        data: [{ x: '1995-01-01', y: 'Vocals', x2: today }]
      },
      {
        label: "Michael Romeo",
        backgroundColor: 'green',
        data: [{ x: '1994-01-01', y: 'Guitar', x2: today }]
      },
      {
        label: "Michael Pinnella",
        backgroundColor: 'purple',
        data: [{ x: '1994-01-01', y: 'Keyboards', x2: today }]
      },
    ]
  },
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
        min: '1994-01-01',
        max: today,
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
          { date: '1994-12-06', type: 'studio' as const },
          { date: '1995-11-06', type: 'studio' as const },
          { date: '1996-11-01', type: 'studio' as const },
          { date: '1998-03-13', type: 'studio' as const },
          { date: '2000-10-09', type: 'studio' as const },
          { date: '2002-11-04', type: 'studio' as const },
          { date: '2007-06-26', type: 'studio' as const },
          { date: '2011-06-17', type: 'studio' as const },
          { date: '2015-07-24', type: 'studio' as const },
          { date: '1994-06-01', type: 'other' as const },
          { date: '1999-02-02', type: 'other' as const },
          { date: '2001-11-13', type: 'other' as const },
          // Add more annotations as needed for other releases
        ].map(entry => annotation(entry))
      }
    }
  }
});