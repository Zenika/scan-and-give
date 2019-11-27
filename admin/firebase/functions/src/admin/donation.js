module.exports = app => {
  app.post('/event/:id/charity/:id_charity/donation', async (req, res) => {
    const eventRef = req.userRef.collection('events').doc(req.params.id)
    const charityRef = req.userRef.collection('charities').doc(req.params.id_charity)

    const { hash } = req.body

    req.db
      .runTransaction(async t => {
        const event = await t.get(eventRef)

        const { donations } = event.data()

        if (donations[hash]) {
          throw new Error('hash_already_used')
        }

        const docs = await req.userRef
          .collection('events-charities')
          .where('event', '==', eventRef)
          .where('charity', '==', charityRef)
          .get()

        const eventCharity = docs.docs[0].ref

        donations[hash] = {
          charity: charityRef,
          date: new Date()
        }

        await t.update(eventRef, {
          donations
        })

        await t.update(eventCharity, {
          count: req.admin.firestore.FieldValue.increment(1)
        })
      })
      .then(() => res.send({ success: true }))
      .catch(err => res.send({ success: false, error: err.message }))
  })

  app.delete('/event/:id/charity/:id_charity/donation', async (req, res) => {
    const eventRef = req.userRef.collection('events').doc(req.params.id)
    const charityRef = req.userRef.collection('charities').doc(req.params.id_charity)

    const { hash } = req.body

    req.db
      .runTransaction(async t => {
        const event = await t.get(eventRef)

        const { donations } = event.data()

        if (!donations[hash]) {
          throw new Error('hash_does_not_exist')
        }

        const docs = await req.userRef
          .collection('events-charities')
          .where('event', '==', eventRef)
          .where('charity', '==', charityRef)
          .get()

        const eventCharity = docs.docs[0].ref

        delete donations[hash]

        await t.update(eventRef, {
          donations
        })

        await t.update(eventCharity, {
          count: req.admin.firestore.FieldValue.increment(-1)
        })
      })
      .then(() => res.send({ deleted: true }))
      .catch(err => res.send({ deleted: false, error: err.message }))
  })
}
