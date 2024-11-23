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
        data: [
          ['1994-01-01', '1995-01-01']
        ]
      },
      {
        label: "Russell Allen",
        backgroundColor: 'red',
        data: [
          ['1995-01-01', today]
        ]
      },
      {
        label: "Michael Romeo",
        backgroundColor: 'green',
        data: [
          null,
          ['1994-01-01', today]
        ]
      },
      {
        label: "Michael Pinnella",
        backgroundColor: 'purple',
        data: [
          null,
          null,
          null,
          ['1994-01-01', today]
        ]
      },
    ] satisfies ChartData<"line", ([string, string] | null)[]>["datasets"]
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
        annotations: Object.fromEntries([
          { date: '1994-12-06', name: 'Symphony X', type: 'studio' as const },
          { date: '1995-11-06', name: 'The Damnation Game', type: 'studio' as const },
          { date: '1996-11-01', name: 'The Divine Wings of Tragedy', type: 'studio' as const },
          { date: '1998-03-13', name: 'Twilight in Olympus', type: 'studio' as const },
          { date: '2000-10-09', name: 'V: The New Mythology Suite', type: 'studio' as const },
          { date: '2002-11-04', name: 'The Odyssey', type: 'studio' as const },
          { date: '2007-06-26', name: 'Paradise Lost', type: 'studio' as const },
          { date: '2011-06-17', name: 'Iconoclast', type: 'studio' as const },
          { date: '2015-07-24', name: 'Underworld', type: 'studio' as const },
          { date: '1994-06-01', name: 'The Dark Chapter', type: 'other' as const },
          { date: '1999-02-02', name: 'Prelude to the Millennium', type: 'other' as const },
          { date: '2001-11-13', name: 'Live on the Edge of Forever', type: 'other' as const },
          // Add more annotations as needed for other releases
        ].map(entry => annotation(entry)))
      }
    }
  }
});