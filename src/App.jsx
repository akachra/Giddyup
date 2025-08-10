import React from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Activity from './components/Activity.jsx'
import Sleep from './components/Sleep.jsx'
import Recovery from './components/Recovery.jsx'
import Importer from './components/Importer.jsx'
import Profile from './components/Profile.jsx'

function Topbar() {
  const { pathname } = useLocation()
  const active = (p) => (pathname === p || (p==='/' && pathname === '/')) ? 'tab active' : 'tab'
  return (
    <header className="topbar">
      <div className="wrap">
        <h1>Giddyup</h1>
        <span className="badge">Phase 1.5</span>
      </div>
      <nav className="wrap tabs">
        <Link className={active('/')} to="/">Dashboard</Link>
        <Link className={active('/activity')} to="/activity">Activity</Link>
        <Link className={active('/sleep')} to="/sleep">Sleep</Link>
        <Link className={active('/recovery')} to="/recovery">Recovery</Link>
        <Link className={active('/import')} to="/import">Import</Link>
        <Link className={active('/profile')} to="/profile">Profile</Link>
      </nav>
    </header>
  )
}

export default function App(){
  return (
    <>
      <Topbar />
      <main className="wrap">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/sleep" element={<Sleep />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/import" element={<Importer />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <footer className="footnote">
          Local-only prototype. Data stays in your browser. Use Profile → Export to back up.
        </footer>
      </main>
    </>
  )
}
