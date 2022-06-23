import React, { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dashboard = ({ offices }) => {
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
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offices]);



  const resetHandler = async () => {
    await fetch('https://best-thoughtworks-office.netlify.app/reset');
  }

  return (<div className="Dashboard">
    <div className="DashboardContainer">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    <button className="btn" onClick={resetHandler}>Reset</button>
  </div>)
}

export default Dashboard;
