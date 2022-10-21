import express from 'express'
import routes from './routes/index'

const port = 3000
const app = express()

app.use('/api', routes)

// start server
app.listen(port, () => {
	console.log(`Server is starting at port:${port}`)
})

export default app
