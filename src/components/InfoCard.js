import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import '../style.css'

const InfoCard = ({data}) => {

    const totalDeaths = data
                          .map(el => el.latest_data.deaths)
                          .reduce((a,b) => a+b, 0);
   
    const totalCases = data
                        .map(el => el.latest_data.confirmed)
                        .reduce((a,b) => a+b, 0);
    const totalRecovered = data
                        .map(el => el.latest_data.recovered)
                        .reduce((a,b) => a+b, 0);

    const todayCases = data
                        .map(el => el.today.confirmed)
                        .reduce((a,b) => a+b, 0);
    const todayDeaths = data
                    .map(el => el.today.deaths)
                    .reduce((a,b) => a+b, 0);
    return (
        <div className='wrapper'>
        <Card className='card'>
            <CardContent>
                <Typography>
                    Total Cases:
                </Typography>
                <h2>{totalCases}</h2>
                <Typography>
                    Today:
                </Typography>
                <h2 className='active'>+{todayCases}</h2>
            </CardContent>
        </Card>
        <Card className='card'>
        <CardContent>
            <Typography>
                Total Deaths:
            </Typography>
            <h2>{totalDeaths}</h2>
            <Typography>
                    Today:
                </Typography>
            <h2 className='active'>+{todayDeaths}</h2>
        </CardContent>
    </Card>
    <Card className='card'>
            <CardContent>
                <Typography>
                    Total Recovered:
                </Typography>
                <h2>{totalRecovered}</h2>
            </CardContent>
        </Card>
    </div>
    )
}

export default InfoCard
