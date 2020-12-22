import fetch from 'isomorphic-unfetch';

const request = function(options) {
    const defaultFetchOptions = {
        method: 'GET'
    };
    const defaultHeaders = {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    };

    // Options
    const fetchOptions = Object.assign(defaultFetchOptions, options);
    fetchOptions.headers = Object.assign(defaultHeaders, fetchOptions.headers);

    // Add base url
    let url = fetchOptions.url;
    delete fetchOptions.url;

    // On success
    const success = function (response) {
        return response.text();
    }

    // On error
    const error = function (error) {
        console.error('Request Failed:', error);
        return Promise.reject(error);
    }

    return fetch(url, fetchOptions).then(success).catch(error);
}

export default request;
