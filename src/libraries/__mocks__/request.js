// __mocks__/request.js
const mock = [{
    url: 'https://localhost:3000/',
    html: `<!DOCTYPE html>
    <html>
    <body>
    <a href="https://localhost:3000/test1">Test Page 1</a>
    <a href="https://localhost:3000/test2">Test Page 2</a>
    <a href="https://example.com/test3">Example of External link</a>
    <img src="https://localhost:3000/image1.png" />
    <img src="https://localhost:3000/image2.png" />
    </body>
    </html>`
}, {
    url: 'https://localhost:3000/test1',
    html: `<!DOCTYPE html>
    <html>
    <body>
    <a href="https://localhost:3000/test2">Test Page 2</a>
    <a href="https://example.com/test3">Example of External link</a>
    <img src="https://localhost:3000/image1.png" />
    <img src="https://localhost:3000/image2.png" />
    </body>
    </html>`
}, {
    url: 'https://localhost:3000/test2',
    html: `<!DOCTYPE html>
    <html>
    <body>
    <a href="https://localhost:3000/test1">Test Page 1</a>
    <a href="https://example.com/test3">Example of External link</a>
    <img src="https://localhost:3000/image1.png" />
    <img src="https://localhost:3000/image2.png" />
    </body>
    </html>`
}]
  
export default function request(options) {
    return new Promise((resolve, reject) => {
        const url = options.url.split('?')[0]
        const item = mock.find(i => i.url === url)
        process.nextTick(() =>
            item
                ? resolve(item.html)
                : reject({
                    error: 'Page not found.',
                })
        );
    });
}