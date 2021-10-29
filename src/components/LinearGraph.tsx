import { AreaClosed, LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import { extent, max } from 'd3-array';
import { curveBasis,curveMonotoneX } from '@visx/curve';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';

interface MeasuredValue {
    _time: string,
    _value: number,
    _field: string,
    _measurement: string,
}

type GraphData = Array<MeasuredValue>

export type LinearGraphProps = {
    width: number;
    height: number;
    data: GraphData;
}

const LinearGraph = ({width, height, data}: LinearGraphProps) => {
    const legendWidth = 32.0;
    const legendHeight = 32.0;

    const margin = {
        left: legendWidth,
        right: 4.0,
        top: 4.0,
        bottom: legendHeight,
    };

    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const getX = (d: MeasuredValue) => new Date(d._time).valueOf();
    const getY = (d: MeasuredValue) => Number(d._value);

    const xScale = scaleTime<number>({
        domain: [Math.min(...data.map(getX)), Math.max(...data.map(getX))],
        nice: true
    });
    const yScale = scaleLinear<number>({
        domain: [0, max(data, getY) as number],
    });

    xScale.range([0, graphWidth]);
    yScale.range([graphHeight, 0]);

    const tickColor = "#e0e0e0"

    const dateFormat = (d: any) => {
        const date = new Date(d)
        return date.toISOString().substr(11, 8)
    }
    const usageFormat = (d: any) => { return `${d} %` }


    return (
        <div className={"linear-graph"}>
            <svg width={width} height={height}>
                <rect width={width} height={height} fill="#2b2b2b" rx={4} ry={4} />
                <Group left={margin.left} top={margin.top}>
                    <Group >
                        <AxisLeft scale={yScale} numTicks={graphHeight > 480 ? 8 : 5} tickLabelProps={() => ({
                            fill: "#e0e0e0"
                        })} tickFormat={usageFormat} tickLength={legendWidth} tickStroke={"#3b3b3b"}/>
                        <AxisBottom top={graphHeight} scale={xScale} numTicks={graphWidth > 520 ? 5 : 4} tickLabelProps={() => ({
                            fill: "#e0e0e0"
                        })} tickFormat={dateFormat} tickStroke={"#3b3b3b"}/>
                    </Group>
                    <Group >
                        <GridColumns scale={xScale} width={graphWidth} height={graphHeight} stroke={"#3b3b3b"} strokeWidth={1} />
                        <GridRows scale={yScale} width={graphWidth} height={graphHeight} stroke={"#3b3b3b"} strokeWidth={1} />
                        <LinearGradient id="area-gradient" to={"#039301"} from={"#c72c07"} toOpacity={0.7} />
                        <AreaClosed
                            curve={curveMonotoneX}
                            data={data}
                            x={d => xScale(getX(d)) ?? 0}
                            y={d => yScale(getY(d)) ?? 0}
                            yScale={yScale}
                            strokeWidth={1}
                            strokeOpacity={1}
                            stroke="url(#area-gradient)"
                            fill="url(#area-gradient)"
                            shapeRendering="geometricPrecision"
                        />
                    </Group>
                </Group>
            </svg>
        </div>
    )
}

export default LinearGraph