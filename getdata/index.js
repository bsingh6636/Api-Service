
import mongoose from 'mongoose'
import app from './app.js'
import { config } from 'dotenv'

config({ path: './config.env' })

const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_SRV, {
    dbname: 'proxy'
}).then(() => {
    console.log(`sucessfully connected to mongoose server`)
}).catch((err) => {
    console.log(`Error occured while connecting to db : Errror ${err}`)
})
//cc
app.listen(PORT, () => {
    console.log(`Server listening on PORTS ${PORT}`)
})
