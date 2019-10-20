import React, { useContext } from 'react'

import AssoContext from './AssoContext'

import AssociationItem from './AssociationItem'

const AssociationList = () => {
  const associations = useContext(AssoContext)

  return (
    <div id="associations">
      {associations.map(association => (
        <AssociationItem key={association.id} association={association} />
      ))}
    </div>
  )
}

export default AssociationList
