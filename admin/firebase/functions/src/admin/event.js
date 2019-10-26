module.exports = app => {
  app.get('/event/list', async (req, res) => {
    const user = await req.userRef.get()

    const col = await req.userRef.collection('events').get()

    const events = await Promise.all(
      col.docs.map(async doc => {
        const event = doc.data()

        const charities = await req.userRef
          .collection('events-charities')
          .where('event', '==', doc.ref)
          .get()

        return {
          id: doc.id,
          ...event,
          charities: charities.docs.map(doc => doc.data())
        }
      })
    )

    return res.send({ events, registrationInProgress: !user.exists })
  })

  app.post('/event/new', async (req, res) => {
    const { name, image, color, date, devise, multiplier, customCss } = req.body

    const event = await req.userRef.collection('events').add({
      name,
      image: image || 'https://via.placeholder.com/200',
      color,
      date: req.admin.firestore.Timestamp.fromDate(new Date(date)),
      devise,
      multiplier,
      donations: {},
      customCss
    })

    return res.send({ event: { id: event.id } })
  })

  app.get('/event/:id', async (req, res) => {
    const doc = await req.userRef
      .collection('events')
      .doc(req.params.id)
      .get()

    const eventCharities = await req.userRef
      .collection('events-charities')
      .where('event', '==', doc.ref)
      .get()

    const charities = await Promise.all(
      eventCharities.docs.map(async doc => {
        const data = doc.data()
        const charity = await data.charity.get().then(d => ({ id: d.id, ...d.data() }))

        return {
          ...data,
          charity
        }
      })
    )

    const event = {
      id: doc.id,
      ...doc.data(),
      charities
    }

    return res.send({ event })
  })

  app.post('/event/:id', async (req, res) => {
    const { name, image, color, date, devise, multiplier, customCss } = req.body

    await req.userRef
      .collection('events')
      .doc(req.params.id)
      .update({
        name,
        image: image || 'https://via.placeholder.com/200',
        color,
        date: req.admin.firestore.Timestamp.fromDate(new Date(date)),
        devise,
        multiplier,
        customCss
      })

    const eventCharities = await req.userRef
      .collection('events-charities')
      .where('event', '==', req.userRef.collection('events').doc(req.params.id))
      .get()

    await Promise.all(
      eventCharities.docs.map(eventCharity =>
        eventCharity.ref.update({
          devise,
          multiplier
        })
      )
    )

    return res.send({ event: { id: req.params.id } })
  })

  app.post('/event/:id/charity/link', async (req, res) => {
    const { charity: charityId } = req.body

    const doc = await req.userRef
      .collection('events')
      .doc(req.params.id)
      .get()

    const { multiplier, devise } = doc.data()

    const eventCharity = await req.userRef.collection('events-charities').add({
      event: doc.ref,
      charity: req.userRef.collection('charities').doc(charityId),
      devise,
      multiplier,
      count: 0
    })

    return res.send({ 'event-charity': { id: eventCharity.id } })
  })

  app.delete('/event/:id/charity/:id_charity', async (req, res) => {
    const eventRef = req.userRef.collection('events').doc(req.params.id)
    const charityRef = req.userRef.collection('charities').doc(req.params.id_charity)

    const event = await eventRef.get()

    const { donations } = event.data()

    const donationsToCharity = Object.values(donations).filter(({ charity }) =>
      charity.isEqual(charityRef)
    )

    if (donationsToCharity.length > 0) {
      return res.send({ deleted: false, error: 'donations_made_to_this_charity' })
    }

    const docs = await req.userRef
      .collection('events-charities')
      .where('event', '==', eventRef)
      .where('charity', '==', charityRef)
      .get()

    await docs.docs[0].ref.delete()

    return res.send({ deleted: true })
  })

  app.delete('/event/:id', async (req, res) => {
    await req.userRef
      .collection('events')
      .doc(req.params.id)
      .delete()

    const eventCharities = await req.userRef
      .collection('events-charities')
      .where('event', '==', req.userRef.collection('events').doc(req.params.id))
      .get()

    await Promise.all(eventCharities.docs.map(eventCharity => eventCharity.ref.delete()))

    return res.send({ deleted: true })
  })
}
