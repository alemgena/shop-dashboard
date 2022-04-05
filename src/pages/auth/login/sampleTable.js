import React from 'react'
import './table.css'
function App() {
  const data = [{ name: 'Anom' }, { name: 'Megha' }, { name: 'Subham' }]
  let x = 5
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>
                {Array.from(Array(x), (e, i) => {
                  return(
                      <span>
                   <td key={i}>Round{i}</td>
                      <tr>
                    <td key={i}>Checkbox{i}</td>
                </tr>
                </span>
                  )
                })}
             
              </td>
            </tr>
          )
        })}
      </table>
      <ul>
        {Array.from(Array(x), (e, i) => {
          return <li key={i}>{i}</li>
        })}
      </ul>
    </div>
  )
}

export default App
