import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';

import type { ChartData } from 'chart.js';

Chart.register(...registerables, annotationPlugin);

const ctx = document.getElementById('releaseTimeline').getContext('2d');

const today: string = new Date().toISOString().split("T")[0]!; // Replace "present" with today's date

function annotation({ type, name, date }: { type: "studio" | "other"; name: string; date: string; }): [string, object] {
  switch (type) {
    case "studio": return [name, {
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
    }];
    case "other": return [name, {
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
    }];
  }
}

// Render the chart
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Project 1", "Project 2"],
    datasets: [
      {
        label: 'Task 1',
        data: [
          null,
          [new Date('2021-09-11T00:00:00'), new Date('2021-09-13T00:00:00')]
        ],
        backgroundColor: "red",
      },
      {
        label: 'Task 2',
        data: [
          [new Date('2021-09-12T00:00:00'), new Date('2021-09-14T00:00:00')],
          [new Date('2021-09-14T00:00:00'), new Date('2021-09-15T00:00:00')]
        ],
        backgroundColor: "blue",
      },
      {
        label: 'Task 3',
        data: [
          null,
          [new Date('2021-09-16T00:00:00'), new Date('2021-09-18T00:00:00')]
        ],
        backgroundColor: "orange",
      },
    ]
  },
  options: {
    responsive: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Floating Horizontal Bar Chart'
      }
    },
    scales: {
      y: {
        stacked: true
      },
      x: {
        type: 'time',
        time: {
          // Luxon format string
          tooltipFormat: 'DD'
        },
        min: new Date('2021-09-11T00:00:00'),
        max: new Date('2021-09-18T00:00:00')
      }
    }
  }
});