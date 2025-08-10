import React from 'react'
import { seed } from '../utils/storage.js'
const state = seed()

export default function Sleep(){
  const avg = state.weekly.sleepHrs.reduce((a,b)=>a+b,0)/state.weekly.sleepHrs.length
  return (
    <div className="card">
      <h3>Sleep</h3>
      <p>Average last 7 days: <b>{Math.round(avg*10)/10}h</b></p>
      <p className="muted">Parsing sleep stages from Health Connect comes next.</p>
    </div>
  )
}
