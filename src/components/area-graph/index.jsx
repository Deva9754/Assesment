import { useEffect, useState } from "react";
import { BULK_DATA_API_URL } from "../../../env.contanst";

export const AreaGraph = ({ city = "" }) => {
  const [chartData, setChartData] = useState([]);
  const margins = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  const width = 960 - margins.left - margins.right;
  const height = 960 - margins.top - margins.bottom;

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = d3.axisBottom().scale(x);
  const yAxis = d3.axisLeft().scale(y);

  const parseTime = d3.timeFormat("%b %d");

  const svg = d3
    .select("#area-graph")
    .append("svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)
    .append("g")
    .attr("transform", `translate(${margins.left}, ${margins.right})`);

  async function fetchData() {
    const response = await fetch(BULK_DATA_API_URL + city);
    const data = await response.json();

    const newData = data?.list?.filter((val) => {
      const hours = new Date(val.dt_txt).getHours();
      if (hours <= 12 && hours >= 6) {
        return val;
      }
    });
    return newData;
  }

  const plotGraph = (data) => {
    x.domain(d3.extent(data, (d) => parseTime(new Date(d.dt_txt))));

    y.domain([0, d3.max(data, (d) => d.main.temp)]);

    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
    svg.append("g").call(yAxis);

    svg
      .append("g")
      .append("path")
      .datum(data)
      .attr("fill", "blue")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .area()
          .x((d) => parseTime(d.dt_txt))
          .y((d) => d.main.temp)
      );
  };

  useEffect(() => {
    if (city) {
      async function getData() {
        const data = await fetchData();
        setChartData(data);
      }
      getData();
    }
  }, [city]);

  useEffect(() => {
    if (chartData?.length) {
      plotGraph(chartData);
    }
  }, [chartData]);

  return <div id="area-graph"></div>;
};
