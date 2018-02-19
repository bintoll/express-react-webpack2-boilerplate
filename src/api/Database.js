
const MongoClient = require('mongodb').MongoClient

import { mongoUri } from '../constants/config.js'

export let db;

export const initDatabase = (callback) => {
  MongoClient.connect(mongoUri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('facebookDataFetch')

    // db.collection('posts').find().toArray(function(err, results) {
    //   console.log(results)
    //   // send HTML file populated with quotes here
    // })

    callback()
  })
}