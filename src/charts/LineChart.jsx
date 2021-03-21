import React, { useRef, useEffect } from 'react';
import { select, line, curveCardinal, scaleLinear, extent, max } from 'd3';

// export const data = [
//     { label: new Date(2007, 3, 24), value: 15.24 },
//     { label: new Date(2007, 3, 25), value: 20.35 },
//     { label: new Date(2007, 3, 26), value: 40.84 },
//     { label: new Date(2007, 3, 27), value: 90.92 },
//     { label: new Date(2007, 3, 30), value: 40.8 },
//     { label: new Date(2007, 4, 1), value: 60.47 },
//     { label: new Date(2007, 4, 9), value: 9.47 },
// ];

export const data = [
    { label: 9, value: 15.24 },
    { label: 10, value: 20.35 },
    { label: 12, value: 40.84 },
    { label: 14, value: 90.92 },
    { label: 15, value: 40.8 },
    { label: 17, value: 60.47 },
    { label: 19, value: 9.47 },
];

export default function LineChart({ width, height }) {
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const x = scaleLinear()
            .domain(extent(data, d => d.label))
            .range([0, width]);

        const y = scaleLinear()
            .domain([0, max(data, d => d.value)])
            .range([height, 0]);

        const myLine = line()
            .x(d => x(d.label))
            .y(d => y(d.value))
            .curve(curveCardinal);

        svg
            .selectAll('path')
            .data([data])
            .join('path')
            .attr('d', value => myLine(value))
            .attr('fill', 'none')
            .attr('stroke', '#7C66B8')
            .attr('stroke-width', '3');

    }, []);

    return (<>
        <svg width={width} height={height} ref={svgRef}></svg>
    </>);
};
