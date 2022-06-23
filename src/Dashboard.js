import React, { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dashboard = ({ offices }) => {

  useEffect(() => {
    setOption({
      ...options,
      series: [
        {
          name: 'Number of Votes', 
          data: offices.map(of => of.count),
        }
      ],
      xAxis: {
        categories: offices.map(of => of.name),
        crosshair: true,
        title: {
          text: 'Locations'
        }
      }
    })
  }, [offices]);

  const [options, setOption] = useState({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Votes'
    },
    yAxis: {
      title: {
        text: 'Votes'
      }
    }
  });

  const resetHandler = async () => {
    await fetch('http://localhost:3030/reset');
  }

  return (<div className="Dashboard">
    <div className="DashboardContainer">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    <button className="btn" onClick={resetHandler}>Reset</button>
  </div>)
}

export default Dashboard;
