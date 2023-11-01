import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { merge } from "lodash-es";
import AnnotationPlugin from "chartjs-plugin-annotation";
import { Bar } from "react-chartjs-2";
import { getChartOptions, formatBarChartData } from "./utils";
import { BarChartDataset } from "../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  AnnotationPlugin
);

export type VerticalBarChartJSOptions = ChartOptions<"bar">;

export interface VerticalBarChartProps {
  chartDatasets: BarChartDataset[];
  includeLegend?: boolean;
  maintainAspectRatio?: boolean;
  threshold?: number;
  isResponsive?: boolean;
  usePercentage?: boolean;
  chartOptions?: VerticalBarChartJSOptions;
}

export function VerticalBarChart(
  props: VerticalBarChartProps
): React.ReactElement {
  const {
    chartDatasets,
    threshold,
    chartOptions,
    includeLegend = true,
    maintainAspectRatio = true,
    isResponsive = true,
    usePercentage = true,
  } = props;
  const chartData = formatBarChartData(chartDatasets);
  const baseOptions = getChartOptions(
    includeLegend,
    maintainAspectRatio,
    isResponsive,
    usePercentage,
    threshold
  );
  const mergedOptions = merge(baseOptions, chartOptions);

  return <Bar data={chartData} options={mergedOptions} />;
}
