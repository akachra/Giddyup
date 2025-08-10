import React, { useState } from 'react'
import { seed, store } from '../utils/storage.js'
const state = seed()

export default function Activity(){
  const [n, setN] = useState((state.activities||[]).length)

  function logDummy(){
    state.activities.unshift({
      when:new Date().toLocaleString(),
      type:'Walking', minutes:30+Math.round(Math.random()*40), avgHr:95+Math.round(Math.random()*40)
    })
    store.set(state); setN(state.activities.length)
  }
  function clearAll(){ state.activities=[]; store.set(state); setN(0) }
  function del(i){ state.activities.splice(i,1); store.set(state); setN(state.activities.length) }

  return (
    <div className="card">
      <h3>Activity Log</h3>
      <div className="flex" style={{marginBottom:10}}>
        <button className="btn" onClick={logDummy}>+ Quick Activity</button>
        <button className="btn" onClick={clearAll}>Clear All</button>
      </div>
      <table>
        <thead><tr><th>Type</th><th>Duration</th><th>Avg HR</th><th>When</th><th></th></tr></thead>
        <tbody>
          {(state.activities||[]).map((a,i)=> (
            <tr key={i}>
              <td>{a.type}</td>
              <td>{a.minutes} min</td>
              <td>{a.avgHr||'-'} bpm</td>
              <td className="muted">{a.when}</td>
              <td><button className="btn" onClick={()=>del(i)}>Delete</button></td>
            </tr>
          ))}
          {(!state.activities || state.activities.length===0) && (
            <tr><td colSpan="5" className="muted">No activities yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
