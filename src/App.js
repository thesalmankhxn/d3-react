import { useState, useEffect } from 'react';
import './App.css';
import AreaChart from './charts/AreaChart';
import BubbleChart from './charts/BubbleChart';
import DoughnutChart from './charts/DoughnutChart';
import LineChart from './charts/LineChart';

// const figures = [
//   [7, 4],
//   [10, 30],
//   [60, 10]
// ];
const figures = [
  { x: 0, y: 10, },
  { x: 1, y: 15, },
  { x: 2, y: 35, },
  { x: 3, y: 20, },
];

var dataIndex = 0;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    setData(figures[dataIndex++]);
    if (dataIndex === figures.length) dataIndex = 0;
  };

  return (
    <div className="App">
      <h1>SK77</h1>
      {/* <BarChart width={100} height={100} data={data} /> */}
      {/* <StackedBarChart width={100} height={100} data={data} /> */}
      <br />
      {/* <LineChart width={350} height={150} /> */}
      <AreaChart width={350} height={150} />
      <DoughnutChart width={150} height={250} />
      <BubbleChart width={254} height={286} />
      <br />
      <LineChart width={350} height={150} />
      {/* <button onClick={changeData}>Change Data</button> */}
    </div>
  );
}

export default App;
