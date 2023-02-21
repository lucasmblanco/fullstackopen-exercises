import React from 'react'

export default function Phonebook({ phoneList, deletePerson }) {


  return (
    <table>
        <tbody>
          {
          phoneList.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td><td><button name={person.name} id={person.id} onClick={deletePerson}>delete</button></td></tr>)
          }
        </tbody>
      </table>
  )
}
