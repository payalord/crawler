import Crawler from '../crawler'
jest.mock('../libraries/request')

describe('Crawler test', () => {
    const url = 'https://localhost:3000/'
    it('Response should be an html document', async () => {
        const result = await Crawler(url)
        expect(result).toMatchSnapshot()
    })
})