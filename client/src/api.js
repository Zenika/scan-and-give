export default {
  getAssociations: () => fetch('/api/associations').then(r => r.json()),
  getDons: () => fetch('/api/dons').then(r => r.json()),
  addDon: (assoId, hash) =>
    fetch('/api/dons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hash,
        date: new Date(),
        associationId: assoId
      })
    })
}
