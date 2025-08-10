import React, { useState } from 'react'
import { seed, store } from '../utils/storage.js'
const state = seed()

export default function Profile(){
  const [p, setP] = useState(state.profile)
  function save(){
    state.profile = p; store.set(state); alert('Saved')
  }
  function reset(){ localStorage.removeItem('giddyup-v1'); location.reload() }
  function exportData(){
    const blob = new Blob([JSON.stringify(state,null,2)],{type:'application/json'})
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='giddyup-local-backup.json'; a.click()
  }
  return (
    <div className="card">
      <h3>Profile & Settings</h3>
      <div className="grid2">
        <div>
          <label>Age</label>
          <input type="number" value={p.age||''} onChange={e=> setP({...p, age:+e.target.value})}/>
          <label style={{marginTop:10}}>Weight (lb)</label>
          <input type="number" value={p.weightLb||''} onChange={e=> setP({...p, weightLb:+e.target.value})}/>
          <label style={{marginTop:10}}>Height (in)</label>
          <input type="number" value={p.heightIn||''} onChange={e=> setP({...p, heightIn:+e.target.value})}/>
          <div style={{marginTop:12}} className="flex">
            <button className="btn" onClick={save}>Save</button>
            <button className="btn" onClick={reset}>Reset demo</button>
            <button className="btn primary" onClick={exportData}>Export data</button>
          </div>
        </div>
        <div>
          <p className="muted">Data is stored locally in your browser. Use Export to back up to a file (e.g., Google Drive).</p>
        </div>
      </div>
    </div>
  )
}
