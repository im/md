const markdownDeck = document.querySelector('#markdown-deck')

let wordList = []
let page = 0
let loading = false
let host =
    window.location.host === 'tangxiaomi.top'
        ? 'https://fanyi.vercel.app'
        : 'http://localhost:3000'

const login = () => {
    fetch(`${host}/login`, {
        body: JSON.stringify({
            name: '81195314@qq.com',
            passwd: 'Txiaomi258417',
        }),
        credentials: 'include',
        method: 'POST',
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data.statusCode === 200) {
                window.location.reload()
            }
        })
}
const queryAllStared = () => {
    loading = true
    fetch(`${host}/queryAllStared?page=${page}`, {
        credentials: 'include',
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            wordList = wordList.concat(data.body.wordList)
            format()
        })
}

const format = () => {
    let str = ''
    wordList.forEach((item, index) => {
        str += '---\n'
        str += `## ${item.word}\n`
        str += `##### /${item.uspron}/\n`
        // str += `##### /${item.ukpron}/\n`
        item.interpret.split(/\r?\n/).forEach((i) => {
            str += `* ${i} \n`
        })
        if (index === wordList.length - 1) {
            str += '---'
        } else {
            str += '---\n'
        }
    })
    // console.log(str)
    markdownDeck.setAttribute('markdown', str)
    loading = false
}
fetch(`${host}/userInfo`, {
    credentials: 'include',
})
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        const body = data.body || {}
        if (body) {
            if (body.type === '0') {
                login()
            }
        }
    })

queryAllStared()

window.onhashchange = function (event) {
    console.log(event)
}
//或者
window.addEventListener('hashchange', function (event) {
    console.log(event)
})
