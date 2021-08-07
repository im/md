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
                queryAllStared()
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
        str += `##### /${item.ukpron}/\n`
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
            } else {
                queryAllStared()
            }
        }
    })
const play = (index) => {
    const { word } = wordList[index]
    const url = `https://audio2.beingfine.cn/speeches/UK/UK-speech/${word}.mp3`
    const mp3 = new Audio(url)
    mp3.play()
}

window.historyChange = (index) => {
    play(index)
    if (wordList.length - 1 === index) {
        if (!loading) {
            page++
            queryAllStared()
        }
    }
}
