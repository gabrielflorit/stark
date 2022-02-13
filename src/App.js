import React, { useState } from 'react'

function App(props) {
  let [data, setData] = useState(props.data)

  function handleSelectAll(e) {
    setData(data =>
      data.map(d => ({
        ...d,
        selected: d.status == 'available' ? e.target.checked : false,
      }))
    )
  }

  function handleSelectOne(e) {
    setData(data =>
      data.map((d, i) => ({
        ...d,
        selected: i == e.target.value ? !d.selected : d.selected,
      }))
    )
  }

  function handleClick() {
    alert(
      data
        .filter(d => d.selected)
        .map(d => [d.path, d.device].join(', '))
        .join('\n')
    )
  }

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={!data.some(d => d.status == 'available' && !d.selected)}
          />
          {data.filter(d => d.selected).length
            ? `Selected ${data.filter(d => d.selected).length}`
            : 'None selected'}
        </label>
        <button onClick={handleClick} disabled={!data.some(d => d.selected)}>
          Download selected
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr
              key={i}
              className={`${d.status} ${d.selected ? 'selected' : ''}`}
            >
              <td>
                <input
                  type="checkbox"
                  onChange={handleSelectOne}
                  checked={d.selected || false}
                  value={i}
                  disabled={d.status != 'available'}
                />
              </td>
              <td>{d.name}</td>
              <td>{d.device}</td>
              <td>{d.path}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
