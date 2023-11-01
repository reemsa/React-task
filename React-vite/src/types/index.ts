import { ChartData, ChartDataset } from "chart.js";

export enum DataVisualizationColor {
  DATA_BLUE_5 = "#e5f5ff",
  DATA_BLUE_10 = "#cceaff",
  DATA_BLUE_20 = "#a8deff",
  DATA_BLUE_30 = "#75c5f0",
  DATA_BLUE_40 = "#41b0f1",
  DATA_BLUE_50 = "#0690e0",
  DATA_BLUE_60 = "#0077bd",
  DATA_BLUE_70 = "#004d7a",
  DATA_BLUE_80 = "#023550",
  DATA_BLUE_90 = "#001e2e",
  DATA_CYAN_5 = "#dffbef",
  DATA_CYAN_10 = "#c9f3e1",
  DATA_CYAN_20 = "#9fefcc",
  DATA_CYAN_30 = "#54d9a8",
  DATA_CYAN_40 = "#2ec298",
  DATA_CYAN_50 = "#21a17d",
  DATA_CYAN_60 = "#237663",
  DATA_CYAN_70 = "#1f5c4e",
  DATA_CYAN_80 = "#0b413c",
  DATA_CYAN_90 = "#002926",
  DATA_GREEN_5 = "#e6fab7",
  DATA_GREEN_10 = "#cfef85",
  DATA_GREEN_20 = "#b5e359",
  DATA_GREEN_30 = "#91d11a",
  DATA_GREEN_40 = "#7faf0d",
  DATA_GREEN_50 = "#699306",
  DATA_GREEN_60 = "#547605",
  DATA_GREEN_70 = "#3f5705",
  DATA_GREEN_80 = "#223701",
  DATA_GREEN_90 = "#192900",
  DATA_YELLOW_5 = "#ffefcb",
  DATA_YELLOW_10 = "#ffdf8e",
  DATA_YELLOW_20 = "#f3bf25",
  DATA_YELLOW_30 = "#d4a400",
  DATA_YELLOW_40 = "#b58b00",
  DATA_YELLOW_50 = "#957200",
  DATA_YELLOW_60 = "#775a00",
  DATA_YELLOW_70 = "#5a4300",
  DATA_YELLOW_80 = "#3f2e00",
  DATA_YELLOW_90 = "#221b07",
  DATA_ORANGE_5 = "#ffeee0",
  DATA_ORANGE_10 = "#ffdcc1",
  DATA_ORANGE_20 = "#f9bd86",
  DATA_ORANGE_30 = "#f8a354",
  DATA_ORANGE_40 = "#e97c16",
  DATA_ORANGE_50 = "#c2630a",
  DATA_ORANGE_60 = "#914c00",
  DATA_ORANGE_70 = "#663100",
  DATA_ORANGE_80 = "#472000",
  DATA_ORANGE_90 = "#2f1500",
  DATA_RED_5 = "#ffebeb",
  DATA_RED_10 = "#ffdad9",
  DATA_RED_20 = "#f0bdb7",
  DATA_RED_30 = "#dd9b92",
  DATA_RED_40 = "#c97b78",
  DATA_RED_50 = "#af5d5a",
  DATA_RED_60 = "#914b50",
  DATA_RED_70 = "#73303b",
  DATA_RED_80 = "#571922",
  DATA_RED_90 = "#430912",
  DATA_ROSE_5 = "#ffecf1",
  DATA_ROSE_10 = "#ffd8e4",
  DATA_ROSE_20 = "#efb8c8",
  DATA_ROSE_30 = "#d29dac",
  DATA_ROSE_40 = "#b58392",
  DATA_ROSE_50 = "#986977",
  DATA_ROSE_60 = "#7d5260",
  DATA_ROSE_70 = "#633b48",
  DATA_ROSE_80 = "#492532",
  DATA_ROSE_90 = "#31111d",
  DATA_PURPLE_5 = "#f6edff",
  DATA_PURPLE_10 = "#eaddff",
  DATA_PURPLE_20 = "#d08cff",
  DATA_PURPLE_30 = "#b69df8",
  DATA_PURPLE_40 = "#9a82db",
  DATA_PURPLE_50 = "#7f67be",
  DATA_PURPLE_60 = "#6750a4",
  DATA_PURPLE_70 = "#4f378b",
  DATA_PURPLE_80 = "#381e72",
  DATA_PURPLE_90 = "#21005d",
  DATA_GRAY_5 = "#f4eff4",
  DATA_GRAY_10 = "#e5e1e5",
  DATA_GRAY_20 = "#c9c5ca",
  DATA_GRAY_30 = "#aeaaae",
  DATA_GRAY_40 = "#929093",
  DATA_GRAY_50 = "#787579",
  DATA_GRAY_60 = "#625f63",
  DATA_GRAY_70 = "#484649",
  DATA_GRAY_80 = "#343338",
  DATA_GRAY_90 = "#1c1b1f",
}

export interface ChartDataItem {
  label: string;
  value: number;
}

export interface BarChartDataItem extends ChartDataItem {
  backgroundColor?: keyof typeof DataVisualizationColor;
  percentage?: number;
  tooltipLabel?: string;
  dataLabel?: string;
}
// Override the `backgroundColor` of the `ChartDataset` type to be a key of `DataVisualizationColor`.
export type BarChartDataset = Omit<
  ChartDataset<"bar", BarChartDataItem[]>,
  "backgroundColor"
> & {
  backgroundColor: keyof typeof DataVisualizationColor;
};
export type BarChartData = ChartData<"bar", BarChartDataItem[], string>;
