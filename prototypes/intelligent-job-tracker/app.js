// Shared data and helpers for the intelligent job tracker prototype.
// Jobs are kept in localStorage so changes carry across pages. The data reseeds each day,
// so the "interview yesterday" and "interview coming up" examples always line up with today.

const KEY = 'ijt-data-v1'
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

const SHORTLISTED = [
  // title, employer, location, type, days since added, days until closing date
  ['Customer service team member', 'Pebble Bank', 'Leeds', 'Customer service', 0, 6],
  ['Admin officer', 'Seaview Borough Council', 'Wakefield', 'Admin', 1, 3],
  ['Guest services assistant', 'Lakeside Leisure Park', 'Harrogate', 'Customer service', 2, 12],
  ['Patient coordinator', 'Elm Park Health Centre', 'Leeds', 'Reception', 4, 9],
  ['Receptionist', 'Marlowe Vets', 'Bradford', 'Reception', 6, 2]
]

const APPLIED = [
  // title, employer, location, type, days since applied, unsuccessful
  ['Customer experience advisor', 'Tidewater Rail', 'Leeds', 'Customer service', 1, false],
  ['Stock controller', 'Kestrel Foods', 'Wakefield', 'Warehouse', 2, false],
  ['Office administrator', 'Ashby & Cole Solicitors', 'Leeds', 'Admin', 4, false],
  ['Telesales advisor', 'Bluebell Insurance', 'Remote', 'Call centre', 5, true],
  ['Retail assistant', 'Fern & Fable Books', 'Harrogate', 'Retail', 6, false],
  ['Customer support adviser', 'Lumen Broadband', 'Remote', 'Customer service', 9, false],
  ['Picker packer', 'Northway Distribution', 'Wakefield', 'Warehouse', 10, true],
  ['Front desk receptionist', 'The Grange Hotel', 'Harrogate', 'Reception', 15, false],
  ['Data entry clerk', 'Pennine Insurance', 'Leeds', 'Data entry', 16, false],
  ['Inbound sales advisor', 'Orbit Mobile', 'Bradford', 'Call centre', 17, true],
  ['Admin assistant', 'Riverside Academy', 'Huddersfield', 'Admin', 18, true],
  ['Warehouse assistant', 'Kestrel Foods', 'Wakefield', 'Warehouse', 19, false],
  ['Team leader', 'Sunrise Café', 'Leeds', 'Hospitality', 20, false],
  ['Collections advisor', 'Trustline Finance', 'Bradford', 'Call centre', 21, true],
  ['Store assistant', 'Corner Market', 'Leeds', 'Retail', 22, false],
  ['Forklift driver', 'Delta Freight', 'Halifax', 'Warehouse', 23, true],
  ['Customer service assistant', 'Greenfield Leisure', 'Leeds', 'Customer service', 24, false],
  ['Records assistant', 'Westfield Clinic', 'Huddersfield', 'Data entry', 25, true],
  ['Call centre agent', 'Sapphire Telecom', 'Bradford', 'Call centre', 26, false],
  ['Payroll assistant', 'Ledger & Co', 'Leeds', 'Finance', 27, false],
  ['Visual merchandiser', "Hartley's Department Store", 'Leeds', 'Retail', 28, true],
  ['Warehouse operative', 'Swift Parcel Hub', 'Wakefield', 'Warehouse', 29, true],
  ['Customer service advisor', 'Harbourside Energy', 'Remote', 'Customer service', 30, false],
  ['Receptionist', 'Oakwood Dental', 'Halifax', 'Reception', 31, false]
]

function seed () {
  const jobs = []
  const add = (title, employer, location, type, stage, dates, extra = {}) => {
    const iso = Object.fromEntries(Object.entries(dates).map(([k, v]) => [k, daysFromToday(-v)]))
    jobs.push({ id: String(jobs.length + 1), title, employer, location, type, stage, closed: false, dates: iso, ...extra })
  }
  for (const [t, e, l, type, ago, closes] of SHORTLISTED) {
    add(t, e, l, type, 'shortlisted', { shortlisted: ago }, { closingDate: daysFromToday(closes) })
  }
  for (const [t, e, l, type, ago, closed] of APPLIED) {
    add(t, e, l, type, 'applied', { shortlisted: ago + 2, applied: ago }, { closed })
  }
  add('Sales assistant', 'Brightwater Retail', 'Leeds', 'Retail', 'interview',
    { shortlisted: 34, applied: 32, interview: 26 }, { closed: true, interviewAt: daysFromToday(-21) + 'T11:00' })
  add('Administrative assistant', 'Calder Logistics', 'Wakefield', 'Admin', 'offered',
    { shortlisted: 30, applied: 28, interview: 22, offered: 10 }, { interviewAt: daysFromToday(-18) + 'T09:30' })
  add('Receptionist', 'Meadow Lane Surgery', 'Leeds', 'Reception', 'interview',
    { shortlisted: 18, applied: 16, interview: 6 }, { interviewAt: daysFromToday(-1) + 'T10:00' })
  add('Customer service advisor', 'Northbridge Housing', 'Leeds', 'Customer service', 'interview',
    { shortlisted: 14, applied: 12, interview: 3 }, { interviewAt: daysFromToday(3) + 'T14:30' })
  return jobs
}

// Storage. If localStorage is unavailable, changes last until the page reloads.

let memory = null

export function load () {
  if (memory) return memory
  try {
    const d = JSON.parse(localStorage.getItem(KEY))
    if (d && d.seededOn === daysFromToday(0)) return (memory = d.jobs)
  } catch {}
  memory = seed()
  save(memory)
  return memory
}

export function save (jobs) {
  memory = jobs
  try { localStorage.setItem(KEY, JSON.stringify({ seededOn: daysFromToday(0), jobs })) } catch {}
}

export function reset () {
  memory = null
  try { localStorage.removeItem(KEY) } catch {}
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

// "1 in 7" style rate: how many of `whole` it took to get one `part`
export function rate (part, whole) {
  if (!part) return null
  const n = Math.max(1, Math.round(whole / part))
  return { n, exact: whole % part === 0, percent: Math.round((part / whole) * 100) }
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
