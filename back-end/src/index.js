import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import apiRouter from './API'
import morgan from 'morgan'

const PORT = process.env.PORT || 3000


const app = express()

app.disable('x-powered-by')
app.use(cors({}))
app.use(bodyParser.json())
app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'))


app.use(apiRouter)

app.get('/', (req, res) => {
     res.sendStatus(200)
})



app.use('*', (req, res) => res.status(404).end())
app.listen(PORT, () => {
    console.log("Server started successfully on : http://localhost:" + PORT)
})