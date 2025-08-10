export const store = {
  get(){ try { return JSON.parse(localStorage.getItem('giddyup-v1')) || null } catch { return null } },
  set(v){ localStorage.setItem('giddyup-v1', JSON.stringify(v)); }
}

export function seed(){
  let state = store.get()
  if(!state){
    state = {
      profile: { name:'Aly', age:50, weightLb:202, heightIn:68 },
      weekly: {
        sleepHrs:[7.2,6.8,7.9,7.1,6.5,8.1,7.6],
        strain:[10.2,12.9,14.5,9.8,11.1,13.0,12.4],
        recoveryPct:[78,83,65,91,72,88,80]
      },
      activities: [
        { when:'Yesterday 6:03 PM', type:'Padel', minutes:55, avgHr:132},
        { when:'Sun 8:12 AM', type:'Hike', minutes:105, avgHr:118}
      ]
    }
    store.set(state)
  }
  return state
}
