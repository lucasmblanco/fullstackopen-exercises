import React from 'react'

export default function Add({onHandleSubmit, onNameChange, onNumberChange, newName, newNumber}) {
  return (
    <form onSubmit={onHandleSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  )
}
