// Shared parts of the menu & navigation prototypes (nav-mega-menu, nav-hero-tools, ...).
// Each page has placeholders like <div data-shared="footer"></div>; this swaps in the markup below,
// so the header, mega menu, footer and bottom menu only need changing here.
// Import it before govuk-frontend's initAll() so GOV.UK components in these parts get set up.

const parts = {
  header: `
    <div class="govuk-header" data-module="govuk-header">
      <div class="govuk-header__container govuk-width-container jcs-header__container">
        <div class="govuk-header__logo">
          <a href="/" class="govuk-header__homepage-link">
            <svg
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 324 60"
              height="30"
              width="162"
              fill="currentcolor"
              class="govuk-header__logotype"
              aria-label="GOV.UK"
            >
              <title>GOV.UK</title>
              <g>
                <circle cx="20" cy="17.6" r="3.7"/>
                <circle cx="10.2" cy="23.5" r="3.7"/>
                <circle cx="3.7" cy="33.2" r="3.7"/>
                <circle cx="31.7" cy="30.6" r="3.7"/>
                <circle cx="43.3" cy="17.6" r="3.7"/>
                <circle cx="53.2" cy="23.5" r="3.7"/>
                <circle cx="59.7" cy="33.2" r="3.7"/>
                <circle cx="31.7" cy="30.6" r="3.7"/>
                <path d="M33.1,9.8c.2-.1.3-.3.5-.5l4.6,2.4v-6.8l-4.6,1.5c-.1-.2-.3-.3-.5-.5l1.9-5.9h-6.7l1.9,5.9c-.2.1-.3.3-.5.5l-4.6-1.5v6.8l4.6-2.4c.1.2.3.3.5.5l-2.6,8c-.9,2.8,1.2,5.7,4.1,5.7h0c3,0,5.1-2.9,4.1-5.7l-2.6-8ZM37,37.9s-3.4,3.8-4.1,6.1c2.2,0,4.2-.5,6.4-2.8l-.7,8.5c-2-2.8-4.4-4.1-5.7-3.8.1,3.1.5,6.7,5.8,7.2,3.7.3,6.7-1.5,7-3.8.4-2.6-2-4.3-3.7-1.6-1.4-4.5,2.4-6.1,4.9-3.2-1.9-4.5-1.8-7.7,2.4-10.9,3,4,2.6,7.3-1.2,11.1,2.4-1.3,6.2,0,4,4.6-1.2-2.8-3.7-2.2-4.2.2-.3,1.7.7,3.7,3,4.2,1.9.3,4.7-.9,7-5.9-1.3,0-2.4.7-3.9,1.7l2.4-8c.6,2.3,1.4,3.7,2.2,4.5.6-1.6.5-2.8,0-5.3l5,1.8c-2.6,3.6-5.2,8.7-7.3,17.5-7.4-1.1-15.7-1.7-24.5-1.7h0c-8.8,0-17.1.6-24.5,1.7-2.1-8.9-4.7-13.9-7.3-17.5l5-1.8c-.5,2.5-.6,3.7,0,5.3.8-.8,1.6-2.3,2.2-4.5l2.4,8c-1.5-1-2.6-1.7-3.9-1.7,2.3,5,5.2,6.2,7,5.9,2.3-.4,3.3-2.4,3-4.2-.5-2.4-3-3.1-4.2-.2-2.2-4.6,1.6-6,4-4.6-3.7-3.7-4.2-7.1-1.2-11.1,4.2,3.2,4.3,6.4,2.4,10.9,2.5-2.8,6.3-1.3,4.9,3.2-1.8-2.7-4.1-1-3.7,1.6.3,2.3,3.3,4.1,7,3.8,5.4-.5,5.7-4.2,5.8-7.2-1.3-.2-3.7,1-5.7,3.8l-.7-8.5c2.2,2.3,4.2,2.7,6.4,2.8-.7-2.3-4.1-6.1-4.1-6.1h10.6,0Z"/>
              </g>
              <circle class="govuk-logo-dot" cx="226" cy="36" r="7.3"/>
              <path d="M93.94 41.25c.4 1.81 1.2 3.21 2.21 4.62 1 1.4 2.21 2.41 3.61 3.21s3.21 1.2 5.22 1.2 3.61-.4 4.82-1c1.4-.6 2.41-1.4 3.21-2.41.8-1 1.4-2.01 1.61-3.01s.4-2.01.4-3.01v.14h-10.86v-7.02h20.07v24.08h-8.03v-5.56c-.6.8-1.38 1.61-2.19 2.41-.8.8-1.81 1.2-2.81 1.81-1 .4-2.21.8-3.41 1.2s-2.41.4-3.81.4a18.56 18.56 0 0 1-14.65-6.63c-1.6-2.01-3.01-4.41-3.81-7.02s-1.4-5.62-1.4-8.83.4-6.02 1.4-8.83a20.45 20.45 0 0 1 19.46-13.65c3.21 0 4.01.2 5.82.8 1.81.4 3.61 1.2 5.02 2.01 1.61.8 2.81 2.01 4.01 3.21s2.21 2.61 2.81 4.21l-7.63 4.41c-.4-1-1-1.81-1.61-2.61-.6-.8-1.4-1.4-2.21-2.01-.8-.6-1.81-1-2.81-1.4-1-.4-2.21-.4-3.61-.4-2.01 0-3.81.4-5.22 1.2-1.4.8-2.61 1.81-3.61 3.21s-1.61 2.81-2.21 4.62c-.4 1.81-.6 3.71-.6 5.42s.8 5.22.8 5.22Zm57.8-27.9c3.21 0 6.22.6 8.63 1.81 2.41 1.2 4.82 2.81 6.62 4.82S170.2 24.39 171 27s1.4 5.62 1.4 8.83-.4 6.02-1.4 8.83-2.41 5.02-4.01 7.02-4.01 3.61-6.62 4.82-5.42 1.81-8.63 1.81-6.22-.6-8.63-1.81-4.82-2.81-6.42-4.82-3.21-4.41-4.01-7.02-1.4-5.62-1.4-8.83.4-6.02 1.4-8.83 2.41-5.02 4.01-7.02 4.01-3.61 6.42-4.82 5.42-1.81 8.63-1.81Zm0 36.73c1.81 0 3.61-.4 5.02-1s2.61-1.81 3.61-3.01 1.81-2.81 2.21-4.41c.4-1.81.8-3.61.8-5.62 0-2.21-.2-4.21-.8-6.02s-1.2-3.21-2.21-4.62c-1-1.2-2.21-2.21-3.61-3.01s-3.21-1-5.02-1-3.61.4-5.02 1c-1.4.8-2.61 1.81-3.61 3.01s-1.81 2.81-2.21 4.62c-.4 1.81-.8 3.61-.8 5.62 0 2.41.2 4.21.8 6.02.4 1.81 1.2 3.21 2.21 4.41s2.21 2.21 3.61 3.01c1.4.8 3.21 1 5.02 1Zm36.32 7.96-12.24-44.15h9.83l8.43 32.77h.4l8.23-32.77h9.83L200.3 58.04h-12.24Zm74.14-7.96c2.18 0 3.51-.6 3.51-.6 1.2-.6 2.01-1 2.81-1.81s1.4-1.81 1.81-2.81a13 13 0 0 0 .8-4.01V13.9h8.63v28.15c0 2.41-.4 4.62-1.4 6.62-.8 2.01-2.21 3.61-3.61 5.02s-3.41 2.41-5.62 3.21-4.62 1.2-7.02 1.2-5.02-.4-7.02-1.2c-2.21-.8-4.01-1.81-5.62-3.21s-2.81-3.01-3.61-5.02-1.4-4.21-1.4-6.62V13.9h8.63v26.95c0 1.61.2 3.01.8 4.01.4 1.2 1.2 2.21 2.01 2.81.8.8 1.81 1.4 2.81 1.81 0 0 1.34.6 3.51.6Zm34.22-36.18v18.92l15.65-18.92h10.82l-15.03 17.32 16.03 26.83h-10.21l-11.44-20.21-5.62 6.22v13.99h-8.83V13.9"/>
            </svg>
          </a>
        </div>
        <a href="#" class="govuk-link govuk-link--inverse govuk-link--no-underline jcs-header__sign-in">Sign in</a>
      </div>
    </div>`,

  'mega-menu': `
    <!-- Mega menu, grouped by what someone is trying to do -->
    <div class="jcs-mega-menu" id="mega-menu" hidden>
      <div class="govuk-width-container">
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Explore what I can do</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Jobs and career quiz</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Learn about different jobs and sectors</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Chat with AI about different jobs</a><p class="jcs-mega-menu__description">AI work assistant</p></li>
              </ul>
            </div>
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Get my CV together</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Build a CV</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">CV support</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Get CV feedback</a><p class="jcs-mega-menu__description">AI work assistant</p></li>
              </ul>
            </div>
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Prepare for an interview</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Mock interview</a> <strong class="govuk-tag govuk-tag--yellow">Experimental</strong></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Interview guidance</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Chat with AI about an interview</a><p class="jcs-mega-menu__description">AI work assistant</p></li>
              </ul>
            </div>
          </div>
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-one-third">
              <h2 class="govuk-heading-s govuk-!-margin-bottom-4"><a class="govuk-link govuk-link--text-colour govuk-link--no-underline" href="#">Build skills &amp; experience</a></h2>
              <ul class="govuk-list">
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find a course</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find T-levels</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Find university courses on UCAS</a></li>
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Discover your skills</a><p class="jcs-mega-menu__description">AI work assistant</p></li>
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
                <li><a class="govuk-link jcs-mega-menu__link" href="#">Create an action plan</a></li>
                <li class="jcs-mega-menu__item--with-icon"><img src="/menu-shared/images/chat-icon.svg" width="49" height="40" alt="" aria-hidden="true"><a class="govuk-link jcs-mega-menu__link" href="#">Chat with AI work assistant</a></li>
              </ul>
            </div>
          </div>
      </div>
    </div>`,

  footer: `
  <!-- GOV.UK footer without the crown. Navigation above the line; below it, the same links as
       the current Work hub footer (www.jobs.service.gov.uk) -->
  <footer class="govuk-footer">
    <div class="govuk-width-container">
      <!-- Work hub proposition, above the footer navigation. Heading is the same size as the section headings. -->
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds govuk-!-margin-bottom-8">
          <h2 class="govuk-heading-m">Work hub</h2>
          <p class="govuk-body govuk-!-margin-bottom-0">Proposition goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div class="govuk-footer__navigation">
        <div class="govuk-footer__section govuk-grid-column-one-quarter">
          <h2 class="govuk-footer__heading govuk-heading-m">Tools</h2>
          <ul class="govuk-footer__list">
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">AI work assistant</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Jobs &amp; careers quiz</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Build a CV</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Create an action plan</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Cover letter maker</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Mock interview</a></li>
          </ul>
        </div>
        <div class="govuk-footer__section govuk-grid-column-one-quarter">
          <h2 class="govuk-footer__heading govuk-heading-m">Find a …</h2>
          <ul class="govuk-footer__list">
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Find a job</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Find a course</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Find a T-level</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Find an apprenticeship</a></li>
          </ul>
        </div>
        <div class="govuk-footer__section govuk-grid-column-one-quarter">
          <h2 class="govuk-footer__heading govuk-heading-m">Resources</h2>
          <ul class="govuk-footer__list">
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">CV support</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Interview support</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Explore jobs and sectors</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Support with barriers &amp; circumstances</a></li>
          </ul>
        </div>
        <div class="govuk-footer__section govuk-grid-column-one-quarter">
          <h2 class="govuk-footer__heading govuk-heading-m">Other UK career services</h2>
          <ul class="govuk-footer__list">
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Scotland</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Wales</a></li>
            <li class="govuk-footer__list-item"><a class="govuk-footer__link" href="#">Northern Ireland</a></li>
          </ul>
        </div>
      </div>
      <hr class="govuk-footer__section-break">
      <div class="govuk-footer__meta">
        <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
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
  </footer>`,

  dock: `
  <!-- Persistent bottom menu: entry points by who someone is -->
  <nav class="jcs-dock" id="dock" aria-label="Find help for you">
    <div class="jcs-dock__inner">
      <ul class="jcs-dock__list">
        <li class="jcs-dock__item"><a class="jcs-dock__link" href="#"><span class="jcs-dock__icon" aria-hidden="true"><img src="/menu-shared/images/person_phone.svg" alt="" style="--x0: 0.40; --y0: 0.03; --cw: 0.60; --aspect: 1.226"></span><span class="jcs-dock__text">Looking for my first <span class="jcs-dock__nowrap">job<svg class="jcs-dock__chevron" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" aria-hidden="true" focusable="false"><path d="M1.5 1.5 6 6.5l-4.5 5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span></a></li>
        <li class="jcs-dock__item"><a class="jcs-dock__link" href="#"><span class="jcs-dock__icon" aria-hidden="true"><img src="/menu-shared/images/person_yellow_boxes.svg" alt="" style="--x0: 0.20; --y0: 0.42; --cw: 0.50; --aspect: 0.896"></span><span class="jcs-dock__text">Looking to switch <span class="jcs-dock__nowrap">career<svg class="jcs-dock__chevron" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" aria-hidden="true" focusable="false"><path d="M1.5 1.5 6 6.5l-4.5 5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span></a></li>
        <li class="jcs-dock__item"><a class="jcs-dock__link" href="#"><span class="jcs-dock__icon" aria-hidden="true"><img src="/menu-shared/images/person_laptop.svg" alt="" style="--x0: 0.40; --y0: 0; --cw: 0.60; --aspect: 0.994"></span><span class="jcs-dock__text">New to the UK looking for <span class="jcs-dock__nowrap">work<svg class="jcs-dock__chevron" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" aria-hidden="true" focusable="false"><path d="M1.5 1.5 6 6.5l-4.5 5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span></a></li>
      </ul>
    </div>
  </nav>`
}

for (const el of document.querySelectorAll('[data-shared]')) {
  el.outerHTML = parts[el.dataset.shared]
}

// Menu buttons (class jcs-menu-button) each open the panel named in their aria-controls: the mega menu
// in Options 1 and 2, a dropdown per stage in Option 3. Only one panel is open at a time. Escape
// closes it and returns focus to its button.
const toggles = [...document.querySelectorAll('.jcs-menu-button[aria-controls]')]
const panelFor = (t) => document.getElementById(t.getAttribute('aria-controls'))
const setOpen = (toggle, open) => {
  toggle.setAttribute('aria-expanded', String(open))
  panelFor(toggle).hidden = !open
}
for (const toggle of toggles) {
  toggle.addEventListener('click', () => {
    const open = panelFor(toggle).hidden
    for (const other of toggles) if (other !== toggle) setOpen(other, false)
    setOpen(toggle, open)
  })
}
document.addEventListener('keydown', (e) => {
  const open = toggles.find((t) => !panelFor(t).hidden)
  if (e.key === 'Escape' && open) {
    setOpen(open, false)
    open.focus()
  }
})

// Bottom menu hides at the very bottom of the page (so it doesn't cover the footer) and comes
// back as soon as you scroll up. While hidden it's inert, so keyboard users can't tab into it.
const dock = document.getElementById('dock')
const updateDock = () => {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  dock.classList.toggle('jcs-dock--hidden', atBottom)
  dock.inert = atBottom
}
window.addEventListener('scroll', updateDock, { passive: true })
window.addEventListener('resize', updateDock)
updateDock()

// Placeholder links (href="#") are dead ends in the prototype. Stop them jumping to the top of the page.
document.addEventListener('click', (e) => {
  if (e.target.closest('a[href="#"]')) e.preventDefault()
})
