import express from 'express'
import Fb from 'fb'
require("babel-polyfill");

import { db } from '../api/Database.js'

import { users } from '../constants/config.js'
import { resolve } from 'dns';

var router = express.Router();
Fb.options({ timeout: 10000, accessToken: 'EAACEdEose0cBAE0Tx3bBQHr26wG1y2fqxjRHJBPW1YYyvnDJygPZAcLLoTXVXIpyNyjU1bkZAuIpKMaPamcBIGjx6EL1SrrWZCKugggiBvXfZAFJAxZBnQF6MA6EahN34F6OIB0YVs6JK8qiuAjrN3anBkEPX1vPbcMDWv7Wr4DsZCZAksEZB4ZB6Mu72KipmeJGToOuL0Hq9GQZDZD' });

/* GET users listing. */
router.get('/', function (req, res) {
    const sinceTimestamp = String(Date.now() - (86400 * 10000000)).slice(0, -3)
    
    if (users) return Promise.all(users.map(user => {
        return new Promise((resolve, reject) => {
            Fb.api(user + '/feed', { fields: ['comments.limit(1).summary(true)', 'likes.limit(1).summary(true)', 'created_time'], limit: '10', since: sinceTimestamp }, function (data) {
                if(!data || data.error) {
                    console.log(!data ? 'error occurred' : res.error);
                    return;
                }
                console.log(data)
        
        
                if (data && data.data) {
                    db.collection('posts').insertMany(data.data.map(dataItem => ({...dataItem, _id: dataItem.id})))
                        .then(data => {
                            console.log('saved')
                            return resolve(data)
                        })
                        .catch(error => {
                            if (error) {
                                console.log(error)
                                reject(error)
                            }
                        })
                }
            })
        })
    }))
        .then(async data => {
            var allPosts = await db.collection('posts').find().toArray();
            res.json({status: 'success', data: allPosts})
        })
        .catch(async error => {
            if (error) console.log(error)
            var allPosts = await db.collection('posts').find().toArray();
            res.json({status: 'success', data: allPosts})
        })
});

module.exports = router;