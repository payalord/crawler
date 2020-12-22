import express from 'express'
import Crawler from './crawler'
import { parse } from 'node-html-parser'

const app = express()
const port = 3000

app.get('/', async (req, res) => {
    if (req.query.url) {
        const data = await Crawler(req.query.url)
        if (data) {
            const root = parse(data);
    
            const links = root.querySelectorAll('a')
    
            res.send(links.map((item, index) => {
                const href = item.getAttribute('href')
                return href
            }))
        }
    }
    res.send('Nothing to crawl!')
})

app.listen(port, () => {
    console.log(`Crawler server listening at http://localhost:${port}`)
})