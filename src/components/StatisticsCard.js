import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import '../style.css'

const StatisticsCard = ({data}) => {

    const recoveryRate = data
    .map(el => el.latest_data.calculated.recovery_rate)
    .reduce((a,b) => a+b, 0) / data.length;
console.log(recoveryRate)
const deathRate = data
  .map(el => el.latest_data.calculated.death_rate)
  .reduce((a,b) => a+b, 0) / data.length;
    const recoveredDeathRatio = recoveryRate/deathRate;
    return (
        <div className='wrapper'>
        <Card className='card'>
            <CardContent>
                <Typography>
                    Recovery Rate :
                </Typography>
                <h2>{Math.round(recoveryRate * 100)/100}</h2>
            </CardContent>
        </Card>
        <Card className='card'>
        <CardContent>
                <Typography>
                    Death Rate :
                </Typography>
                <h2>{Math.round(deathRate * 100)/100}</h2>
            </CardContent>
    </Card>
    <Card className='card'>
        <CardContent>
                <Typography>
                    Recovery : Death
                </Typography>
                <h2>{Math.round(recoveredDeathRatio)} : 1</h2>
            </CardContent>
    </Card>
    </div>
    )
}

export default StatisticsCard
