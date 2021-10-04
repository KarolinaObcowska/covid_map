import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const api_key = 'a2b1d0a586954cf1a36e69f010c967fc';

const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const fetchArticles = async () => {
        const res = await fetch(`https://newsapi.org/v2/everything?q=covid19&from=2021-10-03&to=2021-10-03&sortBy=popularity&apiKey=${api_key}`)
        const json = await res.json();
        const data = json.articles;
        setArticles(data);
        }
        fetchArticles()
    }, [])
    console.log(articles);

    return (
        <>
            <h1>
        The latest articles:
    </h1>
<Grid container spacing={1}>
    {
        articles.map((el) => (
            <Grid item xs={3}>
                <Card className='card' sx={{height: 'fit-content'}}>
                    <CardContent>
                    <Typography variant="h5" gutterBottom>{el.title.substring(0,30)}...</Typography>
                    
                    <CardMedia
                        component="img"
                        height="150"
                        image={el.urlToImage}
                        alt="Article image"
                        />
                        <Typography variant="body2" color="text.secondary">
                        {el.content.substring(0, 120)}...
        </Typography>
                    </CardContent>
                    <CardActions>
        <Button href={el.url} size="small">Read more</Button>
      </CardActions>
                </Card>
            </Grid>
        ))
    }
</Grid>
</>
    )
}

export default Articles
