import React from 'react'

export default function Filter({filter, onFilterChange}) {
  return (
    <div>
        filter show with <input type="text" value={filter} onChange={onFilterChange} />
      </div>
  )
}
