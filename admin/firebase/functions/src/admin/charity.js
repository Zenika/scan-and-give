module.exports = app => {
  app.get('/charity/list', async (req, res) => {
    const user = await req.userRef.get()

    const col = await req.userRef.collection('charities').get()

    const charities = await Promise.all(
      col.docs.map(async doc => {
        const charity = doc.data()

        const events = await req.userRef
          .collection('events-charities')
          .where('charity', '==', doc.ref)
          .get()

        return { id: doc.id, ...charity, events: events.docs.map(doc => doc.data()) }
      })
    )

    return res.send({ charities, registrationInProgress: !user.exists })
  })

  app.post('/charity/new', async (req, res) => {
    const { name, image, description, notes } = req.body

    const charity = await req.userRef
      .collection('charities')
      .add({ name, image: image || 'https://via.placeholder.com/200', description, notes })

    return res.send({ charity: { id: charity.id } })
  })

  app.get('/charity/:id', async (req, res) => {
    const doc = await req.userRef
      .collection('charities')
      .doc(req.params.id)
      .get()

    const charityEvents = await req.userRef
      .collection('events-charities')
      .where('charity', '==', doc.ref)
      .get()

    const events = await Promise.all(
      charityEvents.docs.map(async doc => {
        const data = doc.data()
        const event = await data.event.get().then(d => ({ id: d.id, ...d.data() }))

        return {
          ...data,
          event
        }
      })
    )

    const charity = {
      id: doc.id,
      ...doc.data(),
      events
    }

    return res.send({ charity })
  })

  app.post('/charity/:id', async (req, res) => {
    const { name, image, description, notes } = req.body

    await req.userRef
      .collection('charities')
      .doc(req.params.id)
      .update({ name, image: image || 'https://via.placeholder.com/200', description, notes })

    return res.send({ charity: { id: req.params.id } })
  })

  app.delete('/charity/:id', async (req, res) => {
    await req.userRef
      .collection('charities')
      .doc(req.params.id)
      .delete()

    const charityEvents = await req.userRef
      .collection('events-charities')
      .where('charity', '==', req.userRef.collection('charities').doc(req.params.id))
      .get()

    await Promise.all(charityEvents.docs.map(charityEvent => charityEvent.ref.delete()))

    return res.send({ deleted: true })
  })
}
