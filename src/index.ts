import { Chart, ScatterController, TimeScale, LinearScale, PointElement, Tooltip } from "chart.js";
import "chartjs-adapter-date-fns";

// Register the necessary components
Chart.register(ScatterController, TimeScale, LinearScale, PointElement, Tooltip);

const releaseData = [
  { date: "2016-08-23", title: "Made in merica" },
  { date: "2016-11-14", title: "Ultimate Chaos" },
  { date: "2017-06-19", title: "Septem Numero" },
  { date: "2017-08-09", title: "Spectrum" },
  { date: "2018-11-03", title: "Distant Utopia" },
  { date: "2019-08-19", title: "Raise to Conflict" },
  { date: "2021-09-22", title: "Elkosaurus Tex" },
  { date: "2021-10-15", title: "Corruption Junction" },
  { date: "2021-11-14", title: "Flatlands" },
  { date: "2021-12-05", title: "The Midranges" },
  { date: "2022-01-04", title: "Three Ways to Sunday" },
  { date: "2022-01-27", title: "Electro Capacitoritor" },
  { date: "2022-02-05", title: "Abundance" },
  { date: "2022-02-15", title: "RESERVED A" },
  { date: "2022-03-09", title: "A Sight to Behold" },
  { date: "2022-04-05", title: "Streetlight" },
  { date: "2022-05-21", title: "Laboratory" },
  { date: "2022-06-13", title: "Scary House" },
  { date: "2022-08-19", title: "End of Summer" },
  { date: "2022-10-24", title: "Transcend" },
  { date: "2022-12-12", title: "Lordsmith" },
  { date: "2022-12-20", title: "Emotional Literacy" },
  { date: "2023-01-02", title: "Ooble? Yeah!" },
  { date: "2023-02-15", title: "Centerland" },
  { date: "2023-02-19", title: "Nosebleed" },
  { date: "2023-03-17", title: "Sponge, Assert, Expunge" },
  { date: "2023-04-05", title: "Sienna" },
  { date: "2023-05-05", title: "Orange paradox" },
  { date: "2023-07-06", title: "Catastrophic Failure as a Human Being" },
  { date: "2023-09-15", title: "so, many, bad, decisions" },
  { date: "2023-09-15", title: "Colloquial Outtakes" },
  { date: "2023-09-28", title: "Carpincho" },
  { date: "2023-10-23", title: "duds" },
  { date: "2023-11-15", title: "The Reaction Factor" },
  { date: "2024-02-16", title: "(zein-zein)" },
];

const ctx: CanvasRenderingContext2D = document.querySelector<HTMLCanvasElement>("#releaseTimeline")!.getContext("2d")!;
new Chart(ctx, {
  type: "scatter",
  data: {
    datasets: [{
      label: "Releases",
      data: releaseData.map(item => ({
        x: item.date,
        y: 1, // Arbitrary y-value since we're only interested in date positioning
        title: item.title
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
      }
    }
  }
});