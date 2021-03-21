import { useEffect, useState } from 'react';
import './App.css';
import AreaChart from './charts/AreaChart';
import BubbleChart from './charts/BubbleChart';
import DoughnutChart from './charts/DoughnutChart';
import LineChart from './charts/LineChart';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    regenerateData();
  }, []);

  function regenerateData() {
    const chartData = [
      { label: 9, value: 15.24 },
      { label: 10, value: 20.35 },
      { label: 12, value: 40.84 },
      { label: 14, value: 90.92 },
      { label: 15, value: 40.8 },
      { label: 17, value: 60.47 },
      { label: 19, value: 9.47 },
    ];

    for (let i = 0; i < chartData.length; i++) {
      chartData.push({
        label: chartData[i].label,
        value: chartData[i].value,
        tooltipContent: `<b>label: </b>${chartData[i].label}<br><b>Value: </b>${chartData[i].value}`
      });
    };

    setData(chartData);
  }
  console.log(data)
  return (
    <div className="App">
      <h1>SK77</h1>
      <br />
      <br />
      <AreaChart width={350} height={150} />
      <br />
      <DoughnutChart width={150} height={250} />
      <br />
      <BubbleChart width={254} height={286} />
      <br />
      <LineChart data={data} width={350} height={150} />
    </div>
  );
}

export default App;
