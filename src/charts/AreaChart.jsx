import React, { useRef, useEffect } from 'react';
import {
    select,
    curveCardinal,
    area,
    scaleTime,
    scaleLinear,
    max,
    extent
} from 'd3';

// const width = 219.79;
// const height = 28.5;

const data = [
    { date: new Date(2007, 3, 24), value: 15.24 },
    { date: new Date(2007, 3, 25), value: 20.35 },
    { date: new Date(2007, 3, 26), value: 40.84 },
    { date: new Date(2007, 3, 27), value: 90.92 },
    { date: new Date(2007, 3, 30), value: 40.80 },
    { date: new Date(2007, 4, 1), value: 60.47 },
    { date: new Date(2007, 4, 9), value: 9.47 }
];

export default function AreaChart({ width, height }) {
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const x = scaleLinear()
            .domain(extent(data, d => d.date))
            .range([0, width]);

        const y = scaleLinear()
            .domain([0, max(data, d => d.value)])
            .range([height, 0]);

        const drawArea = area()
            .x(d => x(d.date))
            .y0(y(0))
            .y1(d => y(d.value))
            .curve(curveCardinal);

        var lg = svg.append("defs").append("linearGradient")
            .attr("id", "mygrad")
            .attr("x1", "0%")
            .attr("x2", "0%")
            .attr("y1", "0%")
            .attr("y2", "100%");

        lg.append("stop")
            .attr("offset", "0%")
            .style("stop-color", "#d9d2ea")
            .style("stop-opacity", 1)

        lg.append("stop")
            .attr("offset", "100%")
            .style("stop-color", "#fff")
            .style("stop-opacity", 1);

        svg
            .append('path')
            .datum(data)
            .attr('d', d => drawArea(d))
            .attr('fill', 'url(#mygrad)')
            .attr('stroke', '#7c66b8')
            .attr('stroke-width', '1');

    }, []);

    return (<>
        <svg width={width} height={height} ref={svgRef}></svg>
    </>);
};
