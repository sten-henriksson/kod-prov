
import express from 'express'


const app = express()
app.use(express.json())

app.post(`/scrapedata`, async (req, res) => {


    // res.json(result)
})

app.get('/', async (req, res) => {
    const { inctag, disctag } = req.body
    try {

        res.json("posts")
    } catch (error) {
        res.status(400)
    }
})
app.get('/urls', async (req, res) => {
    const { inctag, disctag } = req.body
    try {

        res.json("posts")
    } catch (error) {
        res.status(400)
    }
})

