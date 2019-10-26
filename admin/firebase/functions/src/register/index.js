const functions = require('firebase-functions')
const admin = require('firebase-admin')

const { events, charities } = require('./starter')

const db = admin.firestore()

module.exports = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async user => {
    const userRef = db.collection('users').doc(user.uid)
    const charitiesRef = userRef.collection('charities')
    const eventsRef = userRef.collection('events')
    const eventsCharitiesRef = userRef.collection('events-charities')

    return db.runTransaction(async t => {
      // 0. Verify user don't exists
      const user = await t.get(userRef)
      if (user.exists) return

      // 1. Create User doc
      t.set(userRef, { registered: true })

      // 2. Add charities
      const charitiesRefs = charities.map(charity => {
        const charityRef = charitiesRef.doc()
        t.set(charityRef, charity)
        return charityRef
      })

      // For each event
      events.map(({ charitiesIndex, donations, ...event }) => {
        // 3. Add event
        const eventRef = eventsRef.doc()
        t.set(eventRef, {
          ...event,
          donations: donations.reduce((acc, donation) => {
            acc[donation.hash] = {
              charity: charitiesRefs[donation.charityIndex],
              date: donation.date
            }
            return acc
          }, {})
        })

        // 4. Add eventCharities

        return charitiesIndex.map(index => {
          const charityRef = charitiesRefs[index]
          const eventCharityRef = eventsCharitiesRef.doc()
          return t.set(eventCharityRef, {
            event: eventRef,
            charity: charityRef,
            devise: 'EUR',
            multiplier: event.multiplier,
            count: donations.filter(({ charityIndex }) => charityIndex === index).length
          })
        })
      })
    })
  })
