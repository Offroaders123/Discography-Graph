import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import annotationPlugin from "chartjs-plugin-annotation";

import type { ChartData } from "chart.js";

Chart.register(...registerables, annotationPlugin);

const releaseData = [
  { date: "2016-08-23", name: "Made in merica", type: "studio" },
  { date: "2016-11-14", name: "Ultimate Chaos", type: "studio" },
  { date: "2017-06-19", name: "Septem Numero", type: "studio" },
  { date: "2017-08-09", name: "Spectrum", type: "studio" },
  { date: "2018-11-03", name: "Distant Utopia", type: "studio" },
  { date: "2019-08-19", name: "Raise to Conflict", type: "studio" },
  { date: "2021-09-22", name: "Elkosaurus Tex", type: "studio" },
  { date: "2021-10-15", name: "Corruption Junction", type: "other" },
  { date: "2021-11-14", name: "Flatlands", type: "studio" },
  { date: "2021-12-05", name: "The Midranges", type: "other" },
  { date: "2022-01-04", name: "Three Ways to Sunday", type: "studio" },
  { date: "2022-01-27", name: "Electro Capacitoritor", type: "studio" },
  { date: "2022-02-05", name: "Abundance", type: "studio" },
  { date: "2022-02-15", name: "RESERVED A", type: "studio" },
  { date: "2022-03-09", name: "A Sight to Behold", type: "studio" },
  { date: "2022-04-05", name: "Streetlight", type: "studio" },
  { date: "2022-05-21", name: "Laboratory", type: "studio" },
  { date: "2022-06-13", name: "Scary House", type: "studio" },
  { date: "2022-08-19", name: "End of Summer", type: "studio" },
  { date: "2022-10-24", name: "Transcend", type: "studio" },
  { date: "2022-12-12", name: "Lordsmith", type: "studio" },
  { date: "2022-12-20", name: "Emotional Literacy", type: "studio" },
  { date: "2023-01-02", name: "Ooble? Yeah!", type: "studio" },
  { date: "2023-02-15", name: "Centerland", type: "studio" },
  { date: "2023-02-19", name: "Nosebleed", type: "studio" },
  { date: "2023-03-17", name: "Sponge, Assert, Expunge", type: "studio" },
  { date: "2023-04-05", name: "Sienna", type: "studio" },
  { date: "2023-05-05", name: "Orange paradox", type: "studio" },
  { date: "2023-07-06", name: "Catastrophic Failure as a Human Being", type: "studio" },
  { date: "2023-09-15", name: "so, many, bad, decisions", type: "studio" },
  { date: "2023-09-15", name: "Colloquial Outtakes", type: "other" },
  { date: "2023-09-28", name: "Carpincho", type: "studio" },
  { date: "2023-10-23", name: "duds", type: "studio" },
  { date: "2023-11-15", name: "The Reaction Factor", type: "studio" },
  { date: "2024-02-16", name: "(zein-zein)", type: "studio" },
] satisfies Parameters<typeof annotation>[0][];

const ctx: CanvasRenderingContext2D = document.querySelector<HTMLCanvasElement>("#releaseTimeline")!.getContext("2d")!;

const today: string = new Date().toISOString().split("T")[0]!; // Replace "present" with today's date

function annotation({ type, name, date }: { type: "studio" | "other"; name: string; date: string; }): [string, object] {
  switch (type) {
    case "studio": return [name, {
      type: "line",
      mode: "vertical",
      scaleID: "x",
      value: date,
      borderColor: "black",
      borderWidth: 2,
      label: {
        content: "Studio Album",
        enabled: true,
        position: "top",
        backgroundColor: "rgba(0,0,0,0.8)"
      }
    }];
    case "other": return [name, {
      type: "line",
      mode: "vertical",
      scaleID: "x",
      value: date,
      borderColor: "gray",
      borderWidth: 2,
      label: {
        content: "other Release",
        enabled: true,
        position: "top",
        backgroundColor: "rgba(128,128,128,0.8)"
      }
    }];
  }
}

// Render the chart
new Chart(ctx, {
  type: "scatter",
  data: {
    datasets: [{
      label: "Releases",
      data: releaseData.map(item => ({
        x: item.date,
        y: 1, // Arbitrary y-value since we're only interested in date positioning
        title: item.name
      })),
      pointBackgroundColor: "blue",
      pointBorderColor: "black",
      pointRadius: 5,
      showLine: false,
    }]
  },
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month', // Choose the unit granularity
          tooltipFormat: 'MMMM dd, yyyy', // Format for tooltip dates
          displayFormats: {
            month: 'MMM yyyy' // Format for x-axis labels
          }
        },
        min: "2016-03-01",
        max: today,
        title: {
          display: true,
          text: "Release Date"
        }
      },
      y: {
        display: false // Hide y-axis
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => (context.raw as { x: string; y: number; title: string; }).title // Display album title in tooltip
        }
      },
      annotation: {
        annotations: Object.fromEntries([
          ...releaseData
        ].map(entry => annotation(entry)))
      }
    }
  }
});