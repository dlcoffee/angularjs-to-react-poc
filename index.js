const express = require('express')
const app = express()
const port = 3000

const NODE_MODULES = __dirname + '/node_modules'

app.use(express.static('dist'))
app.use('/angular', express.static(`${NODE_MODULES}/angular/`))
app.use(
  '/angular-ui-router',
  express.static(`${NODE_MODULES}/@uirouter/angularjs/release/`)
)
app.use('/react', express.static(`${NODE_MODULES}/react/umd/`))
app.use('/react-dom', express.static(`${NODE_MODULES}/react-dom/umd/`))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
