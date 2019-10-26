const validateFirebaseIdToken = admin => async (req, res, next) => {
  req.admin = admin
  req.db = admin.firestore()

  console.log('Check if request is authorized with Firebase ID token')

  if (
    (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    )
    res.status(403).send({ error: 'Unauthorized' })
    return
  }

  let idToken
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header')
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else if (req.cookies) {
    console.log('Found "__session" cookie')
    // Read the ID Token from cookie.
    idToken = req.cookies.__session
  } else {
    // No cookie
    res.status(403).send({ error: 'Unauthorized' })
    return
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken)
    console.log('ID Token correctly decoded', decodedIdToken)
    req.user = decodedIdToken
    req.userRef = req.db.collection('users').doc(req.user.uid)
    next()
    return
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error)
    res.status(403).send({ error: 'Unauthorized' })
    return
  }
}

module.exports = validateFirebaseIdToken
