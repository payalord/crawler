import request from './libraries/request'

const Crawler = (url) => {
    return request({ url: `https://${url}/` });
}

export default Crawler