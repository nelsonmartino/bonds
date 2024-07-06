import app from './app'

// app.use(express.json()) // Middleware que transforma req.body a json

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
