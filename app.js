const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const WeightRecord = require('./model/WeightRecord')
const router = express.Router()


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())