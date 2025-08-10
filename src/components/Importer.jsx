import React from 'react'
import { seed, store } from '../utils/storage.js'
const state = seed()

export default function Importer(){
  function onFile(e){
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader()
    reader.onload = () => {
      try{
        const text = reader.result
        let payload; try{ payload = JSON.parse(text) } catch { payload = { csv:text } }
        state.importRaw = payload; store.set(state)
        alert('Imported. We will add parsing/mapping next.')
      }catch(err){
        alert('Import failed: '+err.message)
      }
    }
    reader.readAsText(file)
  }
  return (
    <div className="card">
      <h3>Import Health Connect (CSV / JSON)</h3>
      <input type="file" accept=".csv,.json" onChange={onFile} />
      <div className="muted" style={{marginTop:8}}>Files are parsed and stored locally (no upload).</div>
    </div>
  )
}
