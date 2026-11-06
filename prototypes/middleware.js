// Password protection for the whole site, using the browser's standard sign-in box (HTTP Basic auth).
// Vercel's own password protection isn't available on the Hobby plan, so this runs before every
// request and only serves the site once the right password is given.
// The username and password live in the SITE_USERNAME and SITE_PASSWORD environment variables in
// Vercel, never in this code.

export const config = { matcher: '/:path*' }

const askForPassword = (message) => new Response(message, {
  status: 401,
  headers: { 'WWW-Authenticate': 'Basic realm="JCS playground", charset="UTF-8"' }
})

export default function middleware (request) {
  const username = process.env.SITE_USERNAME
  const password = process.env.SITE_PASSWORD
  // Fail closed: if either setting goes missing, keep the site locked rather than open
  if (!username || !password) return askForPassword('This site is password protected, but the sign in details are not set up yet.')

  const [scheme, encoded] = (request.headers.get('authorization') || '').split(' ')
  if (scheme === 'Basic' && encoded) {
    const decoded = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)))
    const split = decoded.indexOf(':')
    if (decoded.slice(0, split) === username && decoded.slice(split + 1) === password) return
  }
  return askForPassword('Password required')
}
