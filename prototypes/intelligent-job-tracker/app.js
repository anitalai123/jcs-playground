// Shared data and helpers for the intelligent job tracker prototype.
// Jobs are kept in localStorage so changes carry across pages. The data reseeds each day,
// so the "interview yesterday" and "interview coming up" examples always line up with today.

const KEY = 'ijt-data-v3'
export const PAGE_SIZE = 5

export const STAGES = {
  shortlisted: { label: 'Shortlisted', tag: 'govuk-tag--turquoise', next: 'applied', action: 'Mark as applied', dateLabel: 'Added' },
  applied: { label: 'Applied', tag: '', next: 'interview', action: 'Got an interview', dateLabel: 'Applied' },
  interview: { label: 'Interview', tag: 'govuk-tag--purple', next: 'offered', action: 'Got an offer', dateLabel: 'Interview offered' },
  offered: { label: 'Offer', tag: 'govuk-tag--green', dateLabel: 'Offered' }
}

// Dates

const pad = (n) => String(n).padStart(2, '0')
const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const midnight = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }

export function daysFromToday (offset) {
  const d = midnight()
  d.setDate(d.getDate() + offset)
  return isoDay(d)
}

export function parseDay (s) {
  const [y, m, d] = s.slice(0, 10).split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const dayDiff = (s) => Math.round((parseDay(s) - midnight()) / 86400000)

export function relDay (s) {
  const n = dayDiff(s)
  if (n === 0) return 'today'
  if (n === -1) return 'yesterday'
  if (n === 1) return 'tomorrow'
  return n < 0 ? `${-n} days ago` : `in ${n} days`
}

export const longDate = (s) => parseDay(s).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

export function time (s) {
  const [h, m] = s.slice(11, 16).split(':').map(Number)
  return `${h % 12 || 12}${m ? ':' + pad(m) : ''}${h < 12 ? 'am' : 'pm'}`
}

export const interviewWhen = (j) => `${longDate(j.interviewAt)} at ${time(j.interviewAt)}`

// Seed data

// The person: a junior pastry chef stepping up to a more senior role. Senior pastry and
// supervisor jobs get interviews. Bakery manager jobs, a bigger jump, get nothing.

const SHORTLISTED = [
  // title, employer, location, type, days since added, days until closing date
  ['Bakery team leader', 'Greggs', 'Leeds', 'Bakery supervisor', 0, 6],
  ['Pastry chef de partie', 'Hotel du Vin', 'York', 'Senior pastry chef', 1, 3],
  ['Senior baker', "GAIL's", 'Harrogate', 'Bakery supervisor', 2, 12],
  ['Bakery manager', 'Cooplands', 'Wakefield', 'Bakery manager', 4, 9],
  ['Junior pastry sous chef', 'The Queens Hotel', 'Leeds', 'Senior pastry chef', 6, 2]
]

const APPLIED = [
  // title, employer, location, type, days since applied, unsuccessful
  ['Bakery manager', 'Greggs', 'Leeds', 'Bakery manager', 1, false],
  ['Senior pastry chef', 'Rise & Crumb Patisserie', 'Leeds', 'Senior pastry chef', 2, false],
  ['Bakery team leader', 'M&S Food', 'Bradford', 'Bakery supervisor', 4, false],
  ['Assistant bakery manager', "Sainsbury's", 'Wakefield', 'Bakery manager', 5, true],
  ['Pastry chef de partie', 'The Grand', 'York', 'Senior pastry chef', 6, false],
  ['Head baker', "GAIL's", 'York', 'Bakery manager', 9, false],
  ['Shop manager', 'Greggs', 'Huddersfield', 'Bakery manager', 10, true],
  ['Senior pastry chef', 'Larkspur Patisserie', 'York', 'Senior pastry chef', 15, false],
  ['Bakery supervisor', 'Waitrose', 'Harrogate', 'Bakery supervisor', 16, false],
  ['Bakery department manager', 'Tesco', 'Bradford', 'Bakery manager', 17, true],
  ['Production supervisor', 'Northern Butter Bakehouse', 'Huddersfield', 'Bakery supervisor', 18, true],
  ['Senior baker', 'PAUL', 'Leeds', 'Bakery supervisor', 19, false],
  ['Pastry section lead', 'Hotel du Vin', 'Harrogate', 'Senior pastry chef', 20, false],
  ['Bakery manager', 'Cooplands', 'Halifax', 'Bakery manager', 21, true],
  ['Bakery team leader', 'Cooplands', 'Halifax', 'Bakery supervisor', 22, false],
  ['Assistant manager', "GAIL's", 'Leeds', 'Bakery manager', 23, true],
  ['Senior pastry chef', 'The Ivy', 'Leeds', 'Senior pastry chef', 24, true],
  ['Bakery supervisor', 'M&S Food', 'Wakefield', 'Bakery supervisor', 25, false],
  ['Bakery manager', 'PAUL', 'York', 'Bakery manager', 26, false],
  ['Pastry chef de partie', 'Rudding Park', 'Harrogate', 'Senior pastry chef', 27, true],
  ['Bakery manager', 'Cooplands', 'Huddersfield', 'Bakery manager', 28, true],
  ['Production team leader', 'Greggs', 'Leeds', 'Bakery supervisor', 29, false],
  ['Senior baker', 'Waitrose', 'York', 'Bakery supervisor', 30, false],
  ['Pastry chef', 'Crumb & Co', 'Bradford', 'Senior pastry chef', 31, false]
]

// Health check example: lots of senior pastry applications, 3 interviews, no offers.
// Head pastry chef jobs, a bigger step up, got no interviews at all.

const HEALTH_SHORTLISTED = [
  ['Senior pastry chef', 'Hotel du Vin', 'York', 'Senior pastry chef', 1, 5],
  ['Pastry sous chef', 'The Queens Hotel', 'Leeds', 'Senior pastry chef', 2, 8],
  ['Head pastry chef', 'Grantley Hall', 'Ripon', 'Head pastry chef', 3, 4]
]

const HEALTH_APPLIED = [
  ['Senior pastry chef', 'Rise & Crumb Patisserie', 'Leeds', 'Senior pastry chef', 1, false],
  ['Pastry sous chef', 'The Grand', 'York', 'Senior pastry chef', 2, false],
  ['Head pastry chef', 'Rudding Park', 'Harrogate', 'Head pastry chef', 3, false],
  ['Senior pastry chef', 'The Ivy', 'Leeds', 'Senior pastry chef', 3, false],
  ['Senior pastry chef', 'Larkspur Patisserie', 'York', 'Senior pastry chef', 4, false],
  ['Pastry sous chef', 'Malmaison', 'Leeds', 'Senior pastry chef', 5, true],
  ['Head pastry chef', 'Hotel du Vin', 'Harrogate', 'Head pastry chef', 6, false],
  ['Senior pastry chef', 'Crumb & Co', 'Bradford', 'Senior pastry chef', 7, false],
  ['Senior pastry chef', 'Bettys', 'York', 'Senior pastry chef', 8, false],
  ['Pastry sous chef', 'Swinton Estate', 'Masham', 'Senior pastry chef', 9, true],
  ['Head pastry chef', 'The Star Inn', 'Helmsley', 'Head pastry chef', 10, true],
  ['Senior pastry chef', 'Ox Club', 'Leeds', 'Senior pastry chef', 11, false],
  ['Senior pastry chef', 'Northern Butter Bakehouse', 'Huddersfield', 'Senior pastry chef', 13, false],
  ['Pastry sous chef', 'Oulton Hall', 'Leeds', 'Senior pastry chef', 14, true],
  ['Head pastry chef', 'The Cow & Calf', 'Ilkley', 'Head pastry chef', 15, true],
  ['Senior pastry chef', 'Ivy Asia', 'Leeds', 'Senior pastry chef', 16, false],
  ['Senior pastry chef', "GAIL's", 'York', 'Senior pastry chef', 17, false],
  ['Pastry sous chef', 'Middlethorpe Hall', 'York', 'Senior pastry chef', 18, true],
  ['Senior pastry chef', 'Harvey Nichols', 'Leeds', 'Senior pastry chef', 19, false],
  ['Head pastry chef', 'Ashwood Hall Hotel', 'Harrogate', 'Head pastry chef', 21, true],
  ['Senior pastry chef', 'PAUL', 'Leeds', 'Senior pastry chef', 22, false],
  ['Pastry sous chef', 'Wentbridge House', 'Pontefract', 'Senior pastry chef', 23, true],
  ['Senior pastry chef', 'The Pass', 'Wakefield', 'Senior pastry chef', 24, false],
  ['Head pastry chef', 'Thorpe Park Hotel', 'Leeds', 'Head pastry chef', 25, true],
  ['Senior pastry chef', 'Blue Bell Inn', 'Halifax', 'Senior pastry chef', 26, false],
  ['Pastry sous chef', 'The Devonshire Arms', 'Bolton Abbey', 'Senior pastry chef', 27, true],
  ['Senior pastry chef', 'Cooplands', 'Halifax', 'Senior pastry chef', 28, false]
]

export const PERSONAS = { usual: 'Usual example', healthcheck: 'Health check example' }

function seed (persona = 'usual') {
  const jobs = []
  const add = (title, employer, location, type, stage, dates, extra = {}) => {
    const iso = Object.fromEntries(Object.entries(dates).map(([k, v]) => [k, daysFromToday(-v)]))
    jobs.push({ id: String(jobs.length + 1), title, employer, location, type, stage, closed: false, dates: iso, ...extra })
  }
  const add3 = (t, e, l, type, applied, interview, interviewAt) =>
    add(t, e, l, type, 'interview', { shortlisted: applied + 2, applied, interview }, { closed: true, checkin: 'done', interviewAt: daysFromToday(-interviewAt) + 'T10:30' })
  if (persona === 'healthcheck') {
    for (const [t, e, l, type, ago, closes] of HEALTH_SHORTLISTED) {
      add(t, e, l, type, 'shortlisted', { shortlisted: ago }, { closingDate: daysFromToday(closes) })
    }
    for (const [t, e, l, type, ago, closed] of HEALTH_APPLIED) {
      add(t, e, l, type, 'applied', { shortlisted: ago + 2, applied: ago }, { closed })
    }
    add3('Senior pastry chef', 'Bettys', 'Harrogate', 'Senior pastry chef', 29, 24, 20)
    add3('Pastry sous chef', 'Hotel du Vin', 'York', 'Senior pastry chef', 20, 15, 12)
    add3('Senior pastry chef', 'Larkspur Patisserie', 'Leeds', 'Senior pastry chef', 12, 9, 6)
    return jobs
  }
  for (const [t, e, l, type, ago, closes] of SHORTLISTED) {
    add(t, e, l, type, 'shortlisted', { shortlisted: ago }, { closingDate: daysFromToday(closes) })
  }
  for (const [t, e, l, type, ago, closed] of APPLIED) {
    add(t, e, l, type, 'applied', { shortlisted: ago + 2, applied: ago }, { closed })
  }
  add('Senior pastry chef', 'Harvey Nichols', 'Leeds', 'Senior pastry chef', 'interview',
    { shortlisted: 34, applied: 32, interview: 26 }, { closed: true, interviewAt: daysFromToday(-21) + 'T11:00' })
  add('Pastry chef de partie', 'Bettys', 'Harrogate', 'Senior pastry chef', 'offered',
    { shortlisted: 30, applied: 28, interview: 22, offered: 10 }, { interviewAt: daysFromToday(-18) + 'T09:30' })
  add('Bakery team leader', "GAIL's", 'Leeds', 'Bakery supervisor', 'interview',
    { shortlisted: 18, applied: 16, interview: 6 }, { interviewAt: daysFromToday(-1) + 'T10:00' })
  add('Bakery supervisor', 'M&S Food', 'Leeds', 'Bakery supervisor', 'interview',
    { shortlisted: 14, applied: 12, interview: 3 }, { interviewAt: daysFromToday(3) + 'T14:30' })
  return jobs
}

// Storage. If localStorage is unavailable, changes last until the page reloads.

let memory = null
let persona = 'usual'

export function load () {
  if (memory) return memory
  try {
    const d = JSON.parse(localStorage.getItem(KEY))
    if (d && d.seededOn === daysFromToday(0)) {
      persona = d.persona || 'usual'
      return (memory = d.jobs)
    }
  } catch {}
  memory = seed(persona)
  save(memory)
  return memory
}

export function save (jobs) {
  memory = jobs
  try { localStorage.setItem(KEY, JSON.stringify({ seededOn: daysFromToday(0), persona, jobs })) } catch {}
}

export function reset () {
  memory = null
  try { localStorage.removeItem(KEY) } catch {}
}

export function currentPersona () {
  load()
  return persona
}

// Switch to another example data set. Keeps the current data if it's already loaded.
export function usePersona (name) {
  load()
  if (name === persona || !PERSONAS[name]) return memory
  persona = name
  memory = seed(name)
  save(memory)
  return memory
}

export const find = (jobs, id) => jobs.find((j) => j.id === id)

export function addJob (jobs, job) {
  const id = String(Math.max(...jobs.map((j) => Number(j.id))) + 1)
  jobs.push({ id, closed: false, ...job })
  save(jobs)
  return id
}

export function move (jobs, id, stage, extra = {}) {
  const j = find(jobs, id)
  j.stage = stage
  j.dates[stage] = daysFromToday(0)
  Object.assign(j, extra)
  save(jobs)
  return j
}

// Numbers

export function counts (jobs) {
  const reached = (s) => jobs.filter((j) => j.dates[s]).length
  return {
    shortlisted: jobs.filter((j) => j.stage === 'shortlisted' && !j.closed).length,
    applied: reached('applied'),
    interview: reached('interview'),
    offered: reached('offered')
  }
}

const newestFirst = (stage) => (a, b) => b.dates[stage].localeCompare(a.dates[stage]) || Number(b.id) - Number(a.id)

// Shortlisted shows jobs still waiting to be applied for. The other stages show every job that reached them.
export function listFor (jobs, stage) {
  const list = stage === 'shortlisted'
    ? jobs.filter((j) => j.stage === 'shortlisted' && !j.closed)
    : jobs.filter((j) => j.dates[stage])
  return list.sort(newestFirst(stage))
}

// Rate of `part` out of `whole`, as a percentage (and as "1 in 7")
export function rate (part, whole) {
  if (!part) return null
  const n = Math.max(1, Math.round(whole / part))
  return { n, exact: whole % part === 0, percent: Math.round((part / whole) * 100) }
}

// Which kinds of job lead to interviews, and which get nothing (3 or more applications, no interviews)
export function patterns (jobs) {
  const byType = {}
  for (const j of jobs.filter((j) => j.dates.applied)) {
    byType[j.type] ??= { n: 0, interviews: 0 }
    byType[j.type].n++
    if (j.dates.interview) byType[j.type].interviews++
  }
  const working = Object.keys(byType).filter((t) => byType[t].interviews).sort((a, b) => byType[b].n - byType[a].n)
  const notWorking = Object.entries(byType).filter(([, v]) => !v.interviews && v.n >= 3).sort((a, b) => b[1].n - a[1].n).slice(0, 2)
  return { byType, working, notWorking }
}

export const waiting = (jobs) => jobs.filter((j) => j.stage === 'applied' && !j.closed)
export const staleApplications = (jobs) => waiting(jobs).filter((j) => dayDiff(j.dates.applied) < -14)

export function upcomingInterview (jobs) {
  const now = new Date()
  return jobs
    .filter((j) => j.stage === 'interview' && !j.closed && j.interviewAt && new Date(j.interviewAt) > now)
    .sort((a, b) => a.interviewAt.localeCompare(b.interviewAt))[0]
}

export const interviewYesterday = (jobs) =>
  jobs.find((j) => j.stage === 'interview' && !j.closed && j.interviewAt && dayDiff(j.interviewAt) === -1 && !j.checkin)

// Misc

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export const params = new URLSearchParams(location.search)

export function listSentence (items) {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

// Placeholder links (href="#") are dead ends in the prototype. Stop them jumping to the top of the page.
document.addEventListener('click', (e) => {
  if (e.target.closest('a[href="#"]')) e.preventDefault()
})

// "Choose date" button for a GOV.UK date input. It opens the browser's own calendar and fills in
// day, month and year. People can still type the date instead.
const CALENDAR_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/><path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>'

export function addDatePicker (dateInput) {
  const [day, month, year] = dateInput.querySelectorAll('input')
  const item = document.createElement('div')
  item.className = 'govuk-date-input__item ijt-date-picker'
  item.innerHTML = `
    <button type="button" class="govuk-button govuk-button--secondary ijt-button-icon" data-module="govuk-button">${CALENDAR_ICON}Choose date</button>
    <input type="date" class="ijt-date-picker__native" tabindex="-1" aria-hidden="true">`
  dateInput.appendChild(item)
  const native = item.querySelector('input')
  item.querySelector('button').addEventListener('click', () => {
    if (day.value && month.value && year.value) native.value = `${year.value}-${pad(month.value)}-${pad(day.value)}`
    try { native.showPicker() } catch { native.focus() }
  })
  native.addEventListener('change', () => {
    if (!native.value) return
    const [y, m, d] = native.value.split('-')
    day.value = Number(d)
    month.value = Number(m)
    year.value = y
    day.focus()
  })
}
