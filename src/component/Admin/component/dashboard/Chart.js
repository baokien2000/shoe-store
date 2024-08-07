import React, { useEffect } from 'react';
import { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const ChartData = [{
    name: 'Revenue',
    data: [3404.22, 4271.5, 2106.4, 1129.2, 3144.0, 2176.0, 1935.6]
}, {
    name: 'Order',
    data: [53, 92, 40, 24, 45, 33, 36],
}, {
    name: 'User',
    data: [3, 7, 2, 0, 2, 4, 1,],
}, {
    name: 'Visitor',
    data: [6, 12, 6, 3, 5, 7, 4],
}]
const Chart = () => {
    const [option, setOption] = useState(10);
    const [currentData, setCurrentData] = useState(ChartData[0])
    const sevenDay = () => {
        const date = new Date()
        const miliSecond = date.getTime()
        const dateList = []
        const oneDayTime = 60 * 60 * 24 * 1000
        for (let i = 1; i <= 7; i++) {
            const dayAgo = new Date(miliSecond - (oneDayTime * i))
            dateList.unshift(dayAgo.getDate() + "/" + (dayAgo.getMonth() + 1),)

        }
        return dateList
    }
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com'
        // },
        xAxis: {
            categories: sevenDay(),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ' '
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [currentData],
    }

    useEffect(() => {
        switch (option) {
            case 10:
                setCurrentData(ChartData[0])
                break;
            case 20:
                setCurrentData(ChartData[1])
                break;
            case 30:
                setCurrentData(ChartData[2])
                break;
            case 40:
                setCurrentData(ChartData[3])
                break;
            default:
                break;
        }
    }, [option])

    const handleChange = (event) => {
        setOption(event.target.value);
    };
    return (
        <div className='Chart'>
            <div className='Title'>
                <FormControl size='small' >
                    <InputLabel id="demo-simple-select-label">Option</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={option}
                        label="Option"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Revenue</MenuItem>
                        <MenuItem value={20}>Order</MenuItem>
                        <MenuItem value={30}>User</MenuItem>
                        <MenuItem value={40}>Visitor</MenuItem>
                    </Select>
                </FormControl>
                <h2>Daily Statistics</h2>
            </div>

            <HighchartsReact highcharts={Highchart} options={options} />
        </div>
    );
};

export default Chart;