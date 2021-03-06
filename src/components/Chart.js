import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0')
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'DD/MM/YYYY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a')
          },
        },
      },
    ],
  },
}

const buildChartData = (data, casesType = 'cases') => {
  let chartData = []
  let lastDataPoint
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      }
      chartData.push(newDataPoint)
    }
    lastDataPoint = data[casesType][date]
  }
  return chartData
}

const Chart = ({ casesType }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=100')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType)
          setData(chartData)
        })
    }

    fetchData()
  }, [casesType])

  return (
    <div style={{margin: '5px'}}>
      {data?.length > 0 && (
        <Line
          height={300}
          data={{
            datasets: [
              {
                label: 'Confirmed Cases',
                backgroundColor: '#F29C1E',
                borderColor: '#F29C1E',
                data: data,
              },
            ],
          }}
          options={options}
        />
        
      )}
    </div>
  )
}

export default Chart
