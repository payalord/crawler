import express from 'express'
import Crawler from './crawler'
import { parse } from 'node-html-parser'

const app = express()
const port = 3000

Array.prototype.FilterSameOrigin = function(origin) {
    return this.filter((item) => {
        const href = item.getAttribute('href')
        if (href.startsWith('/') || href.startsWith('#') || href.startsWith(`http://${origin}`) || href.startsWith(`https://${origin}`)) {
            return true
        }
        return false
    })
}

Array.prototype.FilterExternalOrigin = function(origin) {
    return this.filter((item) => {
        const href = item.getAttribute('href')
        if (href.startsWith('/') || href.startsWith('#') || href.startsWith(`http://${origin}`) || href.startsWith(`https://${origin}`)) {
            return false
        }
        return true
    })
}

String.prototype.rmQueryString = function() {
    return this.split(/[?#]/)[0]
}

const Action = async (origin, url, processedLinks, externalProcessedLinks) => {
    const data = await Crawler(url && url.startsWith('http') ? url : `https://${origin}/${url}/` || origin)
    if (data) {
        const root = parse(data);
        const elements = root.querySelectorAll('a')
        
        const externalLinks = [...new Set(elements?.FilterExternalOrigin(origin))]
        externalLinks.map(i => {
            const href = i.getAttribute('href').rmQueryString()
            if (externalProcessedLinks.findIndex(l => l.getAttribute('href').rmQueryString() === href || l.getAttribute('href').rmQueryString()+'/' === href) === -1) {
                externalProcessedLinks.push(i)
            }
        })

        const links = [...new Set(elements?.FilterSameOrigin(origin))]

        await Promise.all(
            links.map(async i => {
                const href = i.getAttribute('href').rmQueryString()
                
                if (processedLinks.findIndex(l => l.getAttribute('href').rmQueryString() === href || l.getAttribute('href').rmQueryString()+'/' === href) === -1) {
                    processedLinks.push(i)
                    await Action(origin, href, processedLinks, externalProcessedLinks)
                }
            })
        )
    }
}

app.get('/', async (req, res, next) => {
    if (req.query.origin) {
        const processedLinks = []
        const externalProcessedLinks = []
        console.log('Starting to crawl, please wait...')
        await Action(req.query.origin, null, processedLinks, externalProcessedLinks)
        processedLinks.push(...externalProcessedLinks)
        console.log('Full crawl completed')
        res.json(processedLinks.map(i => i.getAttribute('href')))
        next()
    } else {
        res.json([])
        next()
    }
})

app.listen(port, () => {
    console.log(`Crawler server listening at http://localhost:${port}`)
})