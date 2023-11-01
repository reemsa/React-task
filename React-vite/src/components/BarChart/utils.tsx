import {
  ChartOptions,
  ScriptableContext,
  TickOptions,
  TooltipItem,
} from "chart.js";
import { BarChartData, BarChartDataItem, BarChartDataset } from "../../types";

const NO_DISPLAY = {
  display: false,
};

const fontFamily = "'Inter', sans-serif";

const DEFAULT_X_AXIS_TICK_OPTIONS: Partial<TickOptions> = {
  font: {
    family: fontFamily,
    size: 12,
  },
};

const DEFAULT_Y_AXIS_TICKS_OPTIONS: Partial<TickOptions> = {
  // eslint-disable-next-line id-denylist
  callback: (value: number | string) => value,
  font: {
    family: fontFamily,
    size: 12,
  },
  padding: 12,
};

export const generateChartLegends = (includeLegend: boolean) => {
  if (!includeLegend) {
    return {
      display: false,
    };
  }

  return {
    position: "bottom",
    onClick: () => {},
    labels: {
      pointStyle: "circle",
      usePointStyle: true,
      boxWidth: 8,
      boxHeight: 8,
      font: {
        family: fontFamily,
        size: 14,
      },
      padding: 16,
      color: "#6d6d6d",
    },
  };
};

const getReponsiveDataLabelsPlugin = (usePercentage: boolean) => ({
  datalabels: {
    color: "#6d6d6d",
    font: {
      size: 12,
      family: fontFamily,
    },
    anchor: "end",
    align: "top",
    rotation: 270,
    formatter: (dataItem: BarChartDataItem) => {
      const value = usePercentage ? dataItem.percentage : dataItem.value;
      if (value === undefined || value === null) {
        return "";
      }
      return `${value}%`;
    },
  },
});

const getThresholdAnnotation = (threshold: number) => ({
  annotations: {
    threshold: {
      type: "line",
      scaleID: "y",
      borderColor: "#0030e2",
      borderWidth: 1,
      value: threshold,
      borderDash: [14, 4],
    },
  },
});

const DEFAULT_BAR_ELEMENT_OPTIONS = {
  hoverBorderWidth: 2,
  // The hover border color should be the same as the background color of the bar.
  hoverBorderColor: (ctx: ScriptableContext<"bar">) => {
    const { dataset, dataIndex } = ctx;
    const backgroundColors = dataset.backgroundColor as string[];
    return backgroundColors[dataIndex];
  },
};

const getDefaultTooltipPlugin = (usePercentage: boolean) => ({
  backgroundColor: "#fff",
  titleColor: "#6d6d6d",
  cornerRadius: 8,
  padding: 20,
  bodyColor: "#222",
  caretSize: 0,
  titleFont: {
    size: 12,
    family: fontFamily,
    weight: "400",
  },
  borderColor: "#d8d8d8",
  borderWidth: 1,
  displayColors: false,
  titleMarginBottom: 16,
  bodyFont: {
    size: 14,
    family: fontFamily,
  },
  footerFont: {
    size: 40,
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    title: (tooltips: string | any[]) => {
      if (!tooltips.length) {
        return "";
      }
      const { dataIndex, dataset } = tooltips[0];
      const { label: datasetLabel } = dataset;
      const dataItem = dataset.data[dataIndex] as unknown as BarChartDataItem;
      return `${dataItem.tooltipLabel}\n${datasetLabel}`;
    },
    label: (ctx: TooltipItem<"bar">) => {
      const dataItem = ctx.raw as BarChartDataItem;
      const { label, value, percentage } = dataItem;
      const maxTooltipWidth = 150;
      const valueString = value.toFixed();

      const whiteSpaceToFill =
        (maxTooltipWidth -
          label.length -
          valueString.length -
          (percentage ?? 0).toFixed().length) /
        6;
      const whiteSpace = " ".repeat(whiteSpaceToFill);

      return `${label}${whiteSpace} ${
        usePercentage ? percentage : value
      }% (${value})`;
    },
  },
});

export const getChartOptions = (
  includeLegend: boolean,
  maintainAspectRatio: boolean,
  isResponsive: boolean,
  usePercentage: boolean,
  threshold?: number
  // eslint-disable-next-line max-params
): ChartOptions<"bar"> => ({
  onClick: () => {},
  maintainAspectRatio,
  elements: {
    bar: DEFAULT_BAR_ELEMENT_OPTIONS,
  },
  plugins: {
    ...(!isResponsive
      ? getReponsiveDataLabelsPlugin(usePercentage)
      : {
          datalabels: NO_DISPLAY,
        }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    legend: generateChartLegends(includeLegend),
    tooltip: {
      ...(isResponsive
        ? getDefaultTooltipPlugin(usePercentage)
        : {
            enabled: false,
          }),
    },
    ...(threshold && {
      annotation: getThresholdAnnotation(threshold),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  parsing: {
    xAxisKey: "label",
    yAxisKey: usePercentage ? "percentage" : "value",
  },
  scales: {
    y: {
      border: NO_DISPLAY,
      ticks: DEFAULT_Y_AXIS_TICKS_OPTIONS,
    },
    x: {
      grid: NO_DISPLAY,
      border: NO_DISPLAY,
      ticks: DEFAULT_X_AXIS_TICK_OPTIONS,
    },
  },
});
/**
 * Filling up the missing labels in each dataset.
 *
 * ChartJS expects each dataset to use the same size of data, and in
 * particular, each data assumed to be sorted the same way.
 *
 * Example:
 *    sortedLabels = ['a', 'b', 'c', 'd', 'e']
 *    data = [{label: 'b'}, {label: 'd'}]
 *    output = [
 *              { label: null, value: null },
 *              { label: 'b' },
 *              { label: null, value: null },
 *              { label: 'd' },
 *              { label: null, value: null },
 *             ]
 */
export const fillUpDataset = (
  chartData: BarChartDataset[],
  sortedLabels: string[]
): void => {
  chartData.forEach((dataset) => {
    const filledUpData = [] as typeof dataset.data;

    sortedLabels.forEach((label) => {
      const existingItem = dataset.data.find((data) => data.label === label);
      if (existingItem) {
        filledUpData.push(existingItem);
      } else {
        filledUpData.push({ label: "", value: 0 });
      }
    });
    dataset.data = filledUpData;
  });
};

export const extractSortedLabelsFromDatasets = (
  chartDatasets: BarChartDataset[]
): string[] => {
  const labelsSet = chartDatasets.reduce((accum, dataset) => {
    dataset.data.forEach((item) => accum.add(item.label));
    return accum;
  }, new Set<string>());

  return Array.from(labelsSet.values()).sort();
};
/**
 * Formats the chart data from the datasets by assigning the background color
 * and calculating percantages of each data item in a dataset.
 */
export const formatBarChartData = (
  chartDatasets: BarChartDataset[]
): BarChartData => {
  const datasetSums = chartDatasets.map((dataset) =>
    dataset.data.reduce<number>((sum, dataItem) => sum + dataItem.value, 0)
  );

  // Prepare the labels and sort them, so the groups will be displayed in alphabetical order.
  const labels = extractSortedLabelsFromDatasets(chartDatasets);
  fillUpDataset(chartDatasets, labels);

  return {
    labels,
    datasets: chartDatasets.map((dataset, datasetIndex) => ({
      ...dataset,
      backgroundColor: dataset.data.map((dataItem) => dataItem.backgroundColor),
      data: dataset.data.map((dataItem) => ({
        ...dataItem,
        percentage: Math.round(
          (dataItem.value / datasetSums[datasetIndex]) * 100
        ),
      })),
    })),
  };
};
