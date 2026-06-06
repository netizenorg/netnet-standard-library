/* global Netitor */
;(function () {
  const CSS = `
    nn-nav { display: contents; }

    #topnav {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: var(--nav-height, 48px);
      background: var(--netizen-background);
      border-bottom: var(--divider-width, 1px) var(--divider-style, dashed) var(--divider-color, currentColor);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      font-family: sans-serif;
      font-size: 20px;
      padding: 20px 0;
      color: var(--netizen-keyword);
      letter-spacing: 0.1em;
      display: flex;
      align-items: center;
    }
    .logo > * { margin-right: 10px; }

    .logo > .face {
      color: var(--netizen-keyword);
      text-decoration: none;
      display: flex;
      align-items: center;
    }
    .logo > .face:hover { color: var(--netizen-tag); }
    .logo > .face > * {
      width: 20px; height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    #theme-select {
      appearance: none;
      background: var(--code-bg, var(--netizen-background));
      color: var(--netizen-text);
      border: 1px solid var(--border, currentColor);
      border-radius: 4px;
      padding: 4px 10px;
      font-family: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    #theme-select:focus { outline: none; border-color: var(--netizen-tag); }

    .nav-icon-link {
      display: flex;
      align-items: center;
      opacity: 0.75;
      transition: opacity 0.15s;
    }
    .nav-icon-link:hover { opacity: 1; }
    .nav-icon-link svg { fill: var(--netizen-tag); display: block; }
    .nav-icon-link.active { opacity: 1; }
    .nav-icon-link.active svg { fill: var(--netizen-keyword); }

    .github-link {
      display: flex;
      align-items: center;
      color: inherit;
      opacity: 0.75;
      transition: opacity 0.15s;
    }
    .github-link:hover { opacity: 1; }
    .github-link svg { fill: var(--netizen-tag); display: block; }
  `

  // classic document icon with folded corner (evenodd cuts out the fold triangle)
  const DOC_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6z"/></svg>'
  const DEMOS_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>'
  const GITHUB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'

  class NNNav extends window.HTMLElement {
    connectedCallback () {
      const base = this.getAttribute('base') || './'
      const page = this.getAttribute('page') || ''

      // inject shared nav styles once per document
      if (!document.getElementById('nn-nav-styles')) {
        const s = document.createElement('style')
        s.id = 'nn-nav-styles'
        s.textContent = CSS
        document.head.appendChild(s)
      }

      let currentTheme = window.localStorage.getItem('nn-docs-theme') || 'dark'

      this.innerHTML = `
        <nav id="topnav">
          <span class="logo">
            <code>nn</code>
            <a class="face" href="${base}" aria-label="home">
              ( <span class="eye">◕</span> <span>◞</span> <span class="eye">◕</span> )
            </a>
            <i>the netnet-standard-library</i>
          </span>
          <div class="nav-right">
            <select id="theme-select">
              <option value="dark">dark</option>
              <option value="light">light</option>
              <option value="monokai">monokai</option>
              <option value="sonnenzimmer">sonnenzimmer</option>
              <option value="moz-dark">moz-dark</option>
              <option value="moz-light">moz-light</option>
            </select>
            <a class="nav-icon-link${page === 'docs' ? ' active' : ''}" href="${base}docs/" title="docs" aria-label="Documentation">
              ${DOC_SVG}
            </a>
            <a class="nav-icon-link${page === 'demos' ? ' active' : ''}" href="${base}examples/demos/" title="demos" aria-label="Demos gallery">
              ${DEMOS_SVG}
            </a>
            <a class="github-link" href="https://github.com/netizenorg/netnet-standard-library" target="_blank" aria-label="GitHub repository">
              ${GITHUB_SVG}
            </a>
          </div>
        </nav>
      `

      // Netitor theme engine — appended to body so Netitor can find it via document.querySelector
      const uid = 'nn-theme-engine-' + Math.random().toString(36).slice(2)
      const themeEl = document.createElement('div')
      themeEl.id = uid
      themeEl.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;pointer-events:none'
      document.body.appendChild(themeEl)
      const themeEngine = new Netitor({ ele: '#' + uid, theme: currentTheme })

      const themeSelect = this.querySelector('#theme-select')
      themeSelect.value = currentTheme

      themeSelect.addEventListener('change', () => {
        currentTheme = themeSelect.value
        window.localStorage.setItem('nn-docs-theme', currentTheme)
        themeEngine.theme = currentTheme
        this.dispatchEvent(new window.CustomEvent('nn-theme-change', {
          detail: { theme: currentTheme },
          bubbles: true
        }))
      })

      // eye animation — uses native DOM, no nn dependency
      const eyes = Array.from(this.querySelectorAll('.eye'))
      let idleTimer = null

      const sleep = ms => new window.Promise(r => setTimeout(r, ms))

      const blink = async () => {
        eyes.forEach(e => { e.style.transform = 'rotate(0deg)'; e.textContent = '-' })
        await sleep(250)
        eyes.forEach(e => { e.textContent = '◕' })
        idleTimer = setTimeout(blink, Math.random() * 5000 + 5000)
      }

      document.addEventListener('mousemove', e => {
        clearTimeout(idleTimer)
        idleTimer = setTimeout(blink, 5000)
        eyes.forEach(eye => {
          const r = eye.getBoundingClientRect()
          const deg = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * (180 / Math.PI) + 130
          eye.style.transform = `rotate(${deg}deg)`
        })
      })

      idleTimer = setTimeout(blink, Math.random() * 4000 + 3000)
    }
  }

  window.customElements.define('nn-nav', NNNav)
})()
