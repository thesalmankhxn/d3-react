import React, { useRef, useEffect } from 'react';
import { select, line, curveCardinal, scaleLinear, extent, max, curveMonotoneX, bisector } from 'd3';

// export const data = [
//     { label: new Date(2007, 3, 24), value: 15.24 },
//     { label: new Date(2007, 3, 25), value: 20.35 },
//     { label: new Date(2007, 3, 26), value: 40.84 },
//     { label: new Date(2007, 3, 27), value: 90.92 },
//     { label: new Date(2007, 3, 30), value: 40.8 },
//     { label: new Date(2007, 4, 1), value: 60.47 },
//     { label: new Date(2007, 4, 9), value: 9.47 },
// ];

// export const data = [
//     { label: 9, value: 15.24 },
//     { label: 10, value: 20.35 },
//     { label: 12, value: 40.84 },
//     { label: 14, value: 90.92 },
//     { label: 15, value: 40.8 },
//     { label: 17, value: 60.47 },
//     { label: 19, value: 9.47 },
// ];

export default function LineChart({ data, width, height }) {
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

        // Append the path going through the data points
        svg
            .selectAll('path')
            .data([data])
            .join('path')
            .attr('d', value => myLine(value))
            .attr('fill', 'none')
            .attr('stroke', '#7C66B8')
            .attr('stroke-width', '3');

        // Append tooltip
        const tooltip = select('#container')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        // Used for tracking events and positioning the marker and tooltip
        svg
            .append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .style('opacity', 0)
            .on('mouseover', (event) => {
                // console.log(event.pageX)
            })
            .on('mouseout', () => {
                tooltip
                    .transition()
                    .duration(300)
                    .style('opacity', 0);
            })
            .on('mousemove', mousemove);

        function mousemove(event) {
            const bisect = bisector(d => d.label).left;
            const xPos = event.pageX;
            const x0 = bisect(data, x.invert(xPos));
            const d0 = data[x0];
            console.log(data, x0)
            // tooltip
            //     .transition()
            //     .duration(300)
            //     .style('opacity', 0.9);

            // tooltip
            //     .html(d0.tooltipContent || d0.label)
            //     .style(
            //         'transform',
            //         `translate(${x(d0.label) + 30}px,${y(d0.value) - 30}px)`,
            //     );
        }

    }, []);

    return (<>
        <div id="chart" >
            <svg width={width} height={height} ref={svgRef}></svg>
        </div>
    </>);
};
