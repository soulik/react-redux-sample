import { AreaClosed, Bar, LinePath } from '@visx/shape';
import { scaleTime, scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import { extent, max } from 'd3-array';
import { curveBasis,curveMonotoneX } from '@visx/curve';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';

interface MeasuredValue {
    country: string,
    infected: number,
    deceased: number,
    recovered: number,
}

type GraphData = Array<MeasuredValue>

export type BarChartProps = {
    width: number;
    height: number;
    data: Readonly<GraphData>;
}

const BarChart = ({width, height, data}: BarChartProps) => {
    const legendWidth = 100.0;
    const legendHeight = 32.0;

    let processedData = [...data]

    processedData.sort((a: MeasuredValue, b: MeasuredValue): number => {
        if (a.infected < b.infected)
            return 1
        if (a.infected > b.infected)
            return -1
        return 0
    })

    processedData = processedData.slice(0, 10)

    const margin = {
        left: legendWidth,
        right: 4.0,
        top: 4.0,
        bottom: legendHeight,
    };

    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const getX = (d: MeasuredValue) => d.country;
    const getY = (d: MeasuredValue) => d.infected;

    const xScale = scaleBand<string>({
        domain: processedData.map(getX),
        range: [0, graphWidth],
    });
    const yScale = scaleLinear<number>({
        domain: [0, max(processedData, getY) as number],
        range: [graphHeight, 0],
    });

    const tickColor = "#e0e0e0"
    const hot1 = '#77312f';
    const hot2 = '#f33d15';

    return (
        <div className={"linear-graph"}>
            <svg width={width} height={height}>
                <rect width={width} height={height} fill="#2b2b2b" rx={4} ry={4} />
                <Group left={margin.left} top={margin.top}>
                    <Group >
                        <AxisLeft scale={yScale} numTicks={graphHeight > 480 ? 8 : 5} tickLabelProps={() => ({
                            fill: "#e0e0e0"
                        })} tickLength={legendWidth} tickStroke={"#3b3b3b"}/>
                        <AxisBottom top={graphHeight} scale={xScale} tickLabelProps={() => ({
                            fill: "#e0e0e0",
                            textAnchor: "middle"
                        })} tickStroke={"#3b3b3b"}/>
                    </Group>
                    <Group >
                        <GridColumns scale={xScale} width={graphWidth} height={graphHeight} stroke={"#3b3b3b"} strokeWidth={1} />
                        <GridRows scale={yScale} width={graphWidth} height={graphHeight} stroke={"#3b3b3b"} strokeWidth={1} />
                        <LinearGradient id="area-gradient" from={hot2} to={hot1} />
                        <Group>
                            { processedData.map((d) => {
                                const barWidth = xScale.bandwidth()
                                const barHeight = graphHeight - yScale(d.infected)
                                const barX = xScale(d.country)
                                const barY = graphHeight - barHeight

                                return (
                                    <Bar
                                        key={d.country}
                                        x={barX}
                                        y={barY}
                                        width={barWidth}
                                        height={barHeight}
                                        strokeWidth={1}
                                        strokeOpacity={1}
                                        stroke="url(#area-gradient)"
                                        fill="url(#area-gradient)"
                                        shapeRendering="geometricPrecision"
                                    />
                                )
                            })}
                        </Group>
                    </Group>
                </Group>
            </svg>
        </div>
    )
}

export default BarChart