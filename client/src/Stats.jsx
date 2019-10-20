import React, { useEffect, useState, useContext } from 'react'

import api from './api'
import AssoContext from './AssoContext'

const Stats = () => {
  const associations = useContext(AssoContext)

  const [dons, setDons] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    api.getDons().then(dons => {
      setTimeout(() => setDons(dons), 1)
      setTotal(dons.map(d => d.dons).reduce((a, b) => a + b))
    })
  }, [])

  return (
    <div id="stats">
      <div className="wrapper">
        <div className="associations">
          {associations.map(asso => {
            const count = dons ? dons.find(d => Number(d.associationId) === asso.id).dons : 0

            const max = dons ? Math.max(...dons.map(d => d.dons)) : 1

            return (
              <div key={asso.id} className="association">
                <div className="image-wrapper">
                  <img src={asso.image} alt={`Logo of ${asso.nom}`} />
                </div>
                <div className="bar-wrapper">
                  <div className="bar" style={{ width: `${(count / max) * 100}%` }}>
                    <span className="count">{count}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="total">Grâce à vous, Zenika va reverser au total {total}€</div>
      </div>
    </div>
  )
}

export default Stats
