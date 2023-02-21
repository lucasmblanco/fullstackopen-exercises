import React from 'react'

export default function NotificationMessage({ message, isError }) {
    if (!message) return null
    
    const errorStyle = {
        padding: '10px', 
        margin: '2px', 
        width: 'fit-content', 
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '20%'
    }

    const notificationStyle = {
        padding: '10px', 
        margin: '2px', 
        width: 'fit-content', 
        backgroundColor: 'green',
        color: 'white', 
        borderRadius: '5px'
    }

  return (
    <div style={isError ? errorStyle : notificationStyle}>{message}</div>
  )
}
