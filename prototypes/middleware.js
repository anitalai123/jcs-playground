// Password protection for the whole site, using the browser's standard sign-in box (HTTP Basic auth).
// Vercel's own password protection isn't available on the Hobby plan, so this runs before every
// request and only serves the site once the right password is given.
// The password lives in the SITE_PASSWORD environment variable in Vercel, never in this code.
// Any username works; only the password is checked.

export const config = { matcher: '/:path*' }

const askForPassword = (message) => new Response(message, {
  status: 401,
  headers: { 'WWW-Authenticate': 'Basic realm="JCS playground", charset="UTF-8"' }
})

export default function middleware (request) {
  const password = process.env.SITE_PASSWORD
  // Fail closed: if the password setting goes missing, keep the site locked rather than open
  if (!password) return askForPassword('This site is password protected, but no password is set up yet.')

  const [scheme, encoded] = (request.headers.get('authorization') || '').split(' ')
  if (scheme === 'Basic' && encoded) {
    const decoded = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)))
    if (decoded.slice(decoded.indexOf(':') + 1) === password) return
  }
  return askForPassword('Password required')
}
