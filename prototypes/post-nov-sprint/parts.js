// Parts shared by the post-November sprint pages (the signed out homepage and the signed in account home):
// its own mega menu and the current Work hub footer. Pages hold placeholders like
// <div data-part="mega-menu"></div>, which this swaps for the markup below, so both pages stay in step.
// It also loads the shared GOV.UK header and menu behaviour (/menu-shared/menu.js), then points Sign in
// at this prototype's account home, and Sign out back to its homepage.
// Signed in pages (<body data-signed-in>) also get a My account item in the service navigation, which opens
// every signed in item, and the side menu holds the same items. Both come from ACCOUNT_MENU below, so a new
// item only needs adding there.
// Import it before govuk-frontend's initAll(). It loads /menu-shared/menu.js itself, after adding the
// My account button, so the shared menu behaviour (one panel open at a time, Escape to close) covers it.

const parts = {
  'mega-menu': `
    <!-- Mega menu (copied from the November sprint) -->
    <div class="jcs-mega-menu" id="mega-menu" hidden>
      <div class="govuk-width-container">
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Explore what I can do</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Chat with AI about jobs you can do</a><p class="jcs-mega-menu__description">AI work assistant</p></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Learn about different jobs and sectors</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Skills assessment</a></li>
              </ul>
            </div>
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Get my CV together</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Chat with AI about your CV</a><p class="jcs-mega-menu__description">AI work assistant</p></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Build a CV</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">CV guidance</a></li>
              </ul>
            </div>
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Prepare for an interview</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Chat with AI about an interview</a><p class="jcs-mega-menu__description">AI work assistant</p></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Interview guidance</a></li>
              </ul>
            </div>
          </div>
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Build skills &amp; experience</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Chat with AI about your skills</a><p class="jcs-mega-menu__description">AI work assistant</p></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find a course</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find T-levels</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find university courses on UCAS</a></li>
              </ul>
            </div>
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Find jobs &amp; opportunities</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find a job</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find seasonal jobs</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find an apprenticeship</a></li>
              </ul>
            </div>
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Get support</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Disabilities and work</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Mental health support</a></li>
              </ul>
            </div>
          </div>
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Not sure where to start?</a></h2>
              <ul class="govuk-list">
                <li class="jcs-mega-menu__item--with-icon"><img src="/menu-shared/images/chat-icon.svg" width="49" height="40" alt="" aria-hidden="true"><a class="govuk-link jcs-mega-menu__link" href="#">Chat with AI work assistant</a></li>
              </ul>
            </div>
            <!-- Placeholder for the young people (YP) entry point. Same grey box as the potential ad space in Option 1,
                 and like it, skips the middle column so it sits under Get support -->
            <div class="govuk-grid-column-one-third jcs-mega-menu__yp-column">
              <div class="jcs-mega-menu__ad" aria-hidden="true">YP entry point</div>
            </div>
          </div>
      </div>
    <!-- Other UK career services: a thin strip along the bottom of the menu, hairline above (content width).
         Title and links on one line. -->
    <div class="jcs-mega-menu__strip">
      <div class="govuk-width-container jcs-mega-menu__strap">
        <h2 class="jcs-mega-menu__strap-title">Other UK career services</h2>
        <ul class="jcs-mega-menu__strap-list">
          <li><a class="govuk-link jcs-mega-menu__link" href="#">Scotland</a></li>
          <li><a class="govuk-link jcs-mega-menu__link" href="#">Wales</a></li>
          <li><a class="govuk-link jcs-mega-menu__link" href="#">Northern Ireland</a></li>
        </ul>
      </div>
    </div>
    </div>
`,

  footer: `
  <!-- The current Work hub footer (www.jobs.service.gov.uk): crown, support links, licence and copyright -->
  <footer class="govuk-footer">
    <div class="govuk-width-container">
      <div class="govuk-footer__meta">
        <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
          <img src="/menu-shared/images/govuk-crown-logo.svg" class="govuk-!-margin-bottom-4" width="32" height="30" alt="" aria-hidden="true">
          <h2 class="govuk-visually-hidden">Support links</h2>
          <ul class="govuk-footer__inline-list">
            <li class="govuk-footer__inline-list-item"><a class="govuk-footer__link" href="#">Accessibility</a></li>
            <li class="govuk-footer__inline-list-item"><a class="govuk-footer__link" href="#">Contact</a></li>
            <li class="govuk-footer__inline-list-item"><a class="govuk-footer__link" href="#">Cookies</a></li>
            <li class="govuk-footer__inline-list-item"><a class="govuk-footer__link" href="#">Privacy</a></li>
            <li class="govuk-footer__inline-list-item"><a class="govuk-footer__link" href="#">Terms of use</a></li>
          </ul>
          <svg aria-hidden="true" focusable="false" class="govuk-footer__licence-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.2 195.7" height="17" width="41">
            <path fill="currentColor" d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"/>
          </svg>
          <span class="govuk-footer__licence-description">
            All content is available under the
            <a class="govuk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated
          </span>
        </div>
        <div class="govuk-footer__meta-item">
          <a class="govuk-footer__link govuk-footer__copyright-logo" href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">© Crown copyright</a>
        </div>
      </div>
    </div>
  </footer>
`
}


// Every signed in item, grouped so the list can grow: a new item goes in the group it belongs to, and a new
// kind of thing gets a new group. Links are placeholders apart from Account home.
const ACCOUNT_HOME = { text: 'Account home', href: '/post-nov-sprint/account/' }
const ACCOUNT_MENU = [
  { heading: 'Plan your next steps', items: [
    { text: 'My action plan' },
    { text: 'Chat history' }
  ] },
  { heading: 'Apply for jobs', items: [
    { text: 'Saved and applied jobs' },
    { text: 'My CVs' }
  ] },
  { heading: 'Settings', items: [
    { text: 'Manage my account' }
  ] }
]
const current = document.body.dataset.accountPage
const linkAttrs = (item) => `href="${item.href || '#'}"${item.text === current ? ' aria-current="page"' : ''}`

// My account panel: like the mega menu. On desktop it drops down under the service navigation;
// on phones it opens in place under My account.
parts['account-menu'] = `
    <div class="jcs-mega-menu jcs-account-menu" id="account-menu" hidden>
      <div class="govuk-width-container">
        <p class="jcs-account-menu__home"><a class="govuk-link jcs-mega-menu__link" ${linkAttrs(ACCOUNT_HOME)}>${ACCOUNT_HOME.text}</a></p>
        <div class="govuk-grid-row">
${ACCOUNT_MENU.map((group) => `          <div class="govuk-grid-column-one-third">
            <h2 class="govuk-heading-s govuk-!-margin-bottom-4">${group.heading}</h2>
            <ul class="govuk-list">
${group.items.map((item) => `              <li><a class="govuk-link jcs-mega-menu__link" ${linkAttrs(item)}>${item.text}</a></li>`).join('\n')}
            </ul>
          </div>`).join('\n')}
        </div>
      </div>
    </div>`

// Side menu on signed in pages (desktop): the same items and groups
parts['account-nav'] = `
      <nav class="jcs-side-nav" aria-label="Your account">
        <ul class="jcs-side-nav__list">
          <li><a class="jcs-side-nav__link jcs-side-nav__link--home" ${linkAttrs(ACCOUNT_HOME)}>${ACCOUNT_HOME.text}</a></li>
        </ul>
${ACCOUNT_MENU.map((group) => `        <h2 class="jcs-side-nav__heading">${group.heading}</h2>
        <ul class="jcs-side-nav__list">
${group.items.map((item) => `          <li><a class="jcs-side-nav__link" ${linkAttrs(item)}>${item.text}</a></li>`).join('\n')}
        </ul>`).join('\n')}
      </nav>`

const signedIn = document.body.hasAttribute('data-signed-in')

// Signed in: add My account to the end of the service navigation (after More), and its panel to the header
if (signedIn) {
  const moreItem = document.getElementById('mega-menu-toggle')?.closest('li')
  moreItem?.insertAdjacentHTML('afterend', `
              <li class="govuk-service-navigation__item">
                <button type="button" class="jcs-menu-button jcs-menu-button--regular" id="account-menu-toggle" aria-expanded="false" aria-controls="account-menu">
                  My account
                  <svg class="jcs-menu-button__icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 12 1 4h14z"/></svg>
                </button>
              </li>`)
  document.querySelector('[data-part="mega-menu"]')?.insertAdjacentHTML('afterend', '<div data-part="account-menu"></div>')
}

for (const el of document.querySelectorAll('[data-part]')) {
  el.outerHTML = parts[el.dataset.part]
}

// Shared header and menu behaviour, loaded now so it picks up the My account button
await import('/menu-shared/menu.js')

const signIn = document.querySelector('.jcs-header__sign-in')
if (signIn) signIn.href = signedIn ? '/post-nov-sprint/' : '/post-nov-sprint/account/'

// Phones: More and My account open in place, like the sections of the GOV.UK Design System website's mobile
// menu, so each panel moves inside its menu item. On wider screens they go back under the service navigation.
const phone = window.matchMedia('(max-width: 40.0525em)')
for (const toggle of document.querySelectorAll('.govuk-service-navigation .jcs-menu-button[aria-controls]')) {
  const panel = document.getElementById(toggle.getAttribute('aria-controls'))
  const item = toggle.closest('li')
  if (!panel || !item) continue
  item.classList.add('jcs-menu-item--panel')
  const home = document.createComment(`${panel.id} sits here on wider screens`)
  panel.before(home)
  const place = () => (phone.matches ? item.append(panel) : home.after(panel))
  phone.addEventListener('change', place)
  place()
}
