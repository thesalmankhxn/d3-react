import React, { useRef, useEffect } from 'react';
import {
    select,
    scaleOrdinal,
    extent,
    pie,
    arc,
} from 'd3';

const width = 150;
const height = 250;
const radius = Math.min(width, height) / 2 - 1;
const innerRadius = radius - 14;

// const centerX = width / 2;
// const centerY = height / 2;

const colors = [
    '#4B4188', '#666DB5', '#935393', '#B08DE2', '#7B65B7', '#C1A9E5', '#E0AFDE', '#E8CBF4', '#E0B6F0'
];

const data = [
    {
        "state": "accounting",
        "positions": 206
    },
    {
        "state": "admin & clerical",
        "positions": 92
    },
    {
        "state": "automotive",
        "positions": 40
    },
    {
        "state": "banking",
        "positions": 79
    },
    {
        "state": "information technology",
        "positions": 14
    },
    {
        "state": "biotech",
        "positions": 26
    },
    {
        "state": "broadcast journalism",
        "positions": 12
    }
];

const color = scaleOrdinal()
    .domain(extent(data, d => d.state))
    .range(colors);

const createPie = pie()
    .sort(null)
    .value(d => d.positions)
    .padAngle(.015);

const path = arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

export default function DoughnutChart() {

    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const pieData = createPie(data);

        const arch = svg
            .selectAll('.arc')
            .data(pieData)
            .enter()
            .append('g')
            .attr('class', 'arc')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr('fill', d => color(d.data.state))
            .attr("stroke", "#fff");
        // .style("stroke-width", "1px");

        arch
            .append('path')
            .attr('d', path);

    }, []);

    return (<>
        <svg width={width} height={height} ref={svgRef}></svg>
    </>);
};
