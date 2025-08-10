import React from 'react'
import { seed } from '../utils/storage.js'
const state = seed()

export default function Recovery(){
  const last = state.weekly.recoveryPct.slice(-1)[0]
  return (
    <div className="card">
      <h3>Recovery</h3>
      <p>Today: <b>{last}%</b>. Composite from HRV/RHR/Sleep coming next.</p>
    </div>
  )
}
