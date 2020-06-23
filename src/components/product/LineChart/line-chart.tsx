import React from "react";
import * as HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type LineChartProps = {
  options: HighCharts.Options;
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { options } = props;

  return (
    <div>
      <HighchartsReact highcharts={HighCharts} options={options} />
    </div>
  );
};

export default LineChart;
