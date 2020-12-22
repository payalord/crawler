import request from './libraries/request'

const Crawler = (url) => {
    return request({ url: url.startsWith('http') ? url : `https://${url}/` });
}

export default Crawler