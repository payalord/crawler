import app from './app'

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Crawler server listening at http://localhost:${port}`)
})

export default app