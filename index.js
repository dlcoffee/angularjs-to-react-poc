const express = require('express')
const app = express()
const port = 3000

app.use(express.static('src'))
app.use('/angular', express.static(__dirname + '/node_modules/angular/'))
app.use(
  '/angular-ui-router',
  express.static(__dirname + '/node_modules/@uirouter/angularjs/release/')
)

// app.get('/', (req, res) => {
//   res.render('src/index')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
