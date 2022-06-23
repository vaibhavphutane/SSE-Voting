import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { API_URL } from "./Constants";

const Dashboard = ({ offices }) => {
  const [options, setOption] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Thoughtworks office votes",
    },
    yAxis: {
      title: {
        text: "Votes",
      },
    },
    xAxis: {
      type: "category",
      min: 0,
      labels: {
        animate: true,
      },
    },
  });

  useEffect(() => {
    setOption({
      ...options,
      series: [
        {
          name: "Number of Votes",
          data: offices.map((of) => [of.name, of.count]),
          dataSorting: {
            enabled: true,
            matchByName: true,
          },
          dataLabels: {
            enabled: true,
          },
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offices]);

  const resetHandler = async () => {
    await fetch(`${API_URL}/reset`);
  };

  return (
    <div className="Dashboard">
      <div className="DashboardContainer">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <button className="btn" onClick={resetHandler}>
        Reset Chart Data
      </button>
    </div>
  );
};

export default Dashboard;
