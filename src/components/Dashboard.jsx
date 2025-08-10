import React, { useEffect } from 'react'
import { seed } from '../utils/storage.js'

const state = seed()

function donutPath(percent, size=140, stroke=14){
  const r = (size/2) - stroke/2
  const C = 2*Math.PI*r
  const off = C * (1 - percent)
  return { r, C, off, size, stroke }
}

export default function Dashboard(){
  const last = state.weekly.recoveryPct.at(-1)
  const avgSleep = state.weekly.sleepHrs.reduce((a,b)=>a+b,0)/state.weekly.sleepHrs.length
  const avgStrain = state.weekly.strain.reduce((a,b)=>a+b,0)/state.weekly.strain.length
  const d = donutPath(last/100)

  useEffect(()=>{
    const c = document.getElementById('trend')
    if(!c) return
    const ctx = c.getContext('2d')
    const w = c.width, h = c.height
    ctx.clearRect(0,0,w,h)
    ctx.strokeStyle = 'rgba(255,255,255,.08)'
    for(let i=1;i<5;i++){ const y=(h/5)*i; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
    const series = [state.weekly.sleepHrs, state.weekly.recoveryPct, state.weekly.strain]
    const colors = ['#3ec6ff','#27d67a','#ff9f43']
    series.forEach((arr, idx)=>{
      const max = Math.max(...arr), min = Math.min(...arr)
      const pad = 8, step = (w - pad*2) / (arr.length-1)
      const path = new Path2D()
      arr.forEach((v,i)=>{
        const x = pad + step*i
        const y = h - pad - ((v-min)/(max-min+1e-6))*(h-pad*2)
        if(i===0) path.moveTo(x,y); else path.lineTo(x,y)
      })
      ctx.lineWidth = 2
      ctx.strokeStyle = colors[idx%colors.length]
      ctx.stroke(path)
    })
  }, [])

  return (
    <section className="grid">
      <div className="card">
        <h3>Today’s Recovery</h3>
        <div className="ring">
          <svg width={d.size} height={d.size} viewBox={`0 0 ${d.size} ${d.size}`} aria-label="recovery ring">
            <circle cx={d.size/2} cy={d.size/2} r={d.r} stroke="#263650" strokeWidth={d.stroke} fill="none" strokeLinecap="round"/>
            <circle cx={d.size/2} cy={d.size/2} r={d.r} stroke="#27d67a" strokeWidth={d.stroke} fill="none"
              strokeLinecap="round" strokeDasharray={d.C} strokeDashoffset={d.off} transform={`rotate(-90 ${d.size/2} ${d.size/2})`}/>
          </svg>
          <div>
            <div className="kpi">{last}%</div>
            <div className="muted">Avg Sleep: <b>{Math.round(avgSleep*10)/10}h</b> • Avg Strain: <b>{Math.round(avgStrain*10)/10}</b></div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3>Weekly Trend</h3>
        <canvas id="trend" width="520" height="160" style={{width:'100%'}}/>
        <div className="muted">Sleep (h), Recovery (%), Strain</div>
      </div>
      <div className="card">
        <h3>Quick Actions</h3>
        <div className="flex">
          <button className="btn" onClick={()=> location.hash = '#/activity'}>+ Log Activity</button>
          <button className="btn" onClick={()=> location.hash = '#/import'}>Import Health Connect</button>
        </div>
      </div>
    </section>
  )
}
