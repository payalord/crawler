import express from 'express'
import Crawler from './crawler'
import { parse } from 'node-html-parser'

const app = express()
const port = 3000

Array.prototype.FilterSameOrigin = function(origin) {
    return this.filter((item) => {
        const href = item.getAttribute('href')
        if (href.startsWith('/') || href.startsWith(`http://${origin}`) || href.startsWith(`https://${origin}`)) {
            return true
        }
        return false
    })
}

Array.prototype.FilterExternalOrigin = function(origin) {
    return this.filter((item) => {
        const href = item.getAttribute('href')
        if (href.startsWith('/') || href.startsWith(`http://${origin}`) || href.startsWith(`https://${origin}`)) {
            return false
        }
        return true
    })
}

const Action = async (origin, url, processedLinks) => {
    const data = await Crawler(url && url.startsWith('http') ? url : `https://${origin}/${url}` || origin)
    if (data) {
        const root = parse(data);
        const elements = root.querySelectorAll('a')
        
        const externalLinks = [...new Set(elements?.FilterExternalOrigin(origin))]
        processedLinks.push(...externalLinks)

        const links = [...new Set(elements?.FilterSameOrigin(origin))]

        links.map(async (i) => {
            const href = i.getAttribute('href').split(/[?#]/)[0]

            if (processedLinks.findIndex(l => l.getAttribute('href') === href) === -1) {
                processedLinks.push(i)
                await Action(origin, href, processedLinks)
            }
        })
    }
}

app.get('/', async (req, res) => {
    if (req.query.origin) {
        const processedLinks = []
        await Action(req.query.origin, null, processedLinks)
        res.json(processedLinks.map(i => i.getAttribute('href')))
    }
    res.json([])
})

app.listen(port, () => {
    console.log(`Crawler server listening at http://localhost:${port}`)
})