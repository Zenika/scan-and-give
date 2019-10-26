'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')({ origin: true })

const app = express()

app.use(cors)
app.use(express.json())

const db = admin.firestore()

app.get('/event/:user_id/:event_id', async (req, res) => {
  const userRef = db.collection('users').doc(req.params.user_id)
  const eventRef = userRef.collection('events').doc(req.params.event_id)

  const event = await eventRef.get()

  if (!event.exists) return res.status(404).send({ error: 'event_not_found' })

  const eventCharities = await userRef
    .collection('events-charities')
    .where('event', '==', eventRef)
    .get()

  const charities = await Promise.all(
    eventCharities.docs.map(async doc => {
      const data = doc.data()
      const charity = await data.charity.get().then(d => {
        const c = d.data()
        return {
          id: d.id,
          image: c.image,
          name: c.name,
          description: c.description
        }
      })

      return charity
    })
  )

  const donations = Object.entries(event.data().donations || {}).map(
    ([hash, { charity, date }]) => ({
      hash,
      charity: charity.id,
      date: date.seconds
    })
  )

  return res.send({
    event: {
      id: event.id,
      ...event.data(),
      date: event.data().date.seconds,
      donations,
      charities
    }
  })
})

app.post('/event/:user_id/:event_id/donations', async (req, res) => {
  const userRef = db.collection('users').doc(req.params.user_id)
  const eventRef = userRef.collection('events').doc(req.params.event_id)

  const { donations } = req.body

  const ret = await Promise.all(
    donations.map(donation => {
      const charityRef = userRef.collection('charities').doc(donation.charity)

      return db.runTransaction(async t => {
        const event = await t.get(eventRef)

        const { donations } = event.data()

        if (donations[donation.hash]) {
          return {
            ...donation,
            success: false,
            error: 'hash_already_used'
          }
        }

        const docs = await userRef
          .collection('events-charities')
          .where('event', '==', eventRef)
          .where('charity', '==', charityRef)
          .get()

        const eventCharity = docs.docs[0].ref

        donations[donation.hash] = {
          charity: charityRef,
          date: new admin.firestore.Timestamp(
            Math.floor(donation.date / 1000),
            donation.date % 1000
          )
        }

        await t.update(eventRef, {
          donations
        })

        await t.update(eventCharity, {
          count: admin.firestore.FieldValue.increment(1)
        })

        return {
          ...donation,
          success: true
        }
      })
    })
  )

  return res.send({ donations: ret })
})

module.exports = functions.region('europe-west1').https.onRequest(app)
