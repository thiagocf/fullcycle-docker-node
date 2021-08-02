const express = require('express')
const mysql = require('mysql')

const app = express()

const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const insertSql = `INSERT INTO people(name) VALUES ('Thiago');`
const listSql = `SELECT name FROM people;`

app.get('/', async (req, res) => {
  const connection = mysql.createConnection(config)

  await query(connection, insertSql)
  const people = await query(connection, listSql)
  
  connection.end()

  let response = '<h1>Full Cycle Rocks!</h1>'
  if (Array.isArray(people)) {
    people.forEach(({ name }) => response += `</br> ${name}`)
  }

  res.send(response)
})


app.listen(port, () => {
  console.log('Rodando na porta', port)
})


function query(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (errors, results) => {
      if (errors) reject(errors)
      else resolve(results)
    })
  })
}