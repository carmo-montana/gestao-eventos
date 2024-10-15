import 'dotenv/config'
import express from 'express'


const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Word')
})


app.listen(process.env.PORT, () => {
    console.log('API está funcionando')
})