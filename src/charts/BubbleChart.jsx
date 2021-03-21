import React, { useRef, useEffect } from 'react';
import {
    select,
    scaleOrdinal,
    extent,
    forceSimulation,
    forceX,
    forceY,
    scaleSqrt,
    forceCollide,
    pack,
    hierarchy,
} from 'd3';

const width = 254;
const height = 286;

const colors = [
    '#4B4188', '#666DB5', '#935393', '#B08DE2', '#7B65B7', '#C1A9E5', '#E0AFDE', '#E8CBF4', '#E0B6F0'
];

const data = [
    {
        "label": "Accounting",
        "value": 206
    },
    {
        "label": "Admin & Clerical",
        "value": 92
    },
    {
        "label": "Automotive",
        "value": 40
    },
    {
        "label": "Banking",
        "value": 79
    },
    {
        "label": "Information Technology",
        "value": 14
    },
    {
        "label": "Biotech",
        "value": 26
    },
    {
        "label": "Broadcast Journalism",
        "value": 12
    }
];

const color = scaleOrdinal()
    .domain(extent(data, d => d.label))
    .range(colors);

const radiusScale = scaleSqrt()
    .domain(extent(data, d => d.value))
    .range([20, 65]);


export default function BubbleChart() {
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);

        const simulation = forceSimulation()
            .force('x', forceX(0).strength(.005))
            .force('y', forceY(0).strength(.005))
            .force('collide', forceCollide(d => radiusScale(d.value) + 1));

        const circles = svg
            .selectAll('.circle')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', "translate(" + width / 2 + "," + height / 2 + ")")
            // .attr('transform', 'translate(0,0)')
            .append('circle')
            // .attr('r', 10)
            .attr('r', d => radiusScale(d.value))
            .attr('fill', d => color(d.label));

        const text = svg
            .selectAll('g')
            .append("text")
            .style('fill', 'white')
            // .each(d => {
            //     console.log(d);
            //     const obj = d.label + '\n' + d.value + '%';
            //     console.log(obj)
            //     svg
            //         .select('text')
            //         .selectAll('text')
            //         .enter()
            //         .append('tspan')
            //         .attr("text-anchor", "middle")
            //         .attr("x", 0)
            //         .style("font-size", "10px")
            //         .attr('dy', (d, i) => '11px')
            //         .text('SK77');
            // })
            .style("text-anchor", "middle")
            .attr("x", 0)
            .style("font", "10px sans-serif")
            .attr('dy', (d, i) => '11px')
            .text(d => d.label)

        const textBelow = svg
            .selectAll('g')
            .append('text')
            .style('fill', 'white')
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .style("font-size", "10px")
            .text(d => d.value + '%');

        const updatePosition = () => {
            circles
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            text
                .attr('dx', d => d.x)
                .attr('dy', d => d.y);

            textBelow
                .attr('dx', d => d.x)
                .attr('dy', d => d.y + 12);
        };

        simulation.nodes(data)
            .on('tick', updatePosition);

    }, []);

    return (<>
        <svg width={width} height={height} ref={svgRef}></svg>
    </>);
};
