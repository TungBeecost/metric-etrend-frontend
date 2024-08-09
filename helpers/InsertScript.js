const insertScriptRaw = (scriptText, idAdjacentElement) => {
  if (process.env.SSR !== 'true') {
    let script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('language', 'javascript')
    script.textContent = scriptText
    if (document.getElementById(idAdjacentElement)) {
      document.getElementById(idAdjacentElement)
        .insertAdjacentElement('afterend', script)
    }
  }
}

const insertScriptSrc = (src, selectorAdjacentElement, position = 'afterend', idValue = null) => {
  if (process.env.SSR !== 'true') {
    let script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('language', 'javascript')
    script.setAttribute('src', src)
    script.setAttribute('async', true)
    if (idValue != null) {
      script.setAttribute('id', idValue)
    }
    // console.log('insert getElementById: ', document.getElementById(idAdjacentElement))

    if (document.querySelector(selectorAdjacentElement)) {
      document.querySelector(selectorAdjacentElement)
        .insertAdjacentElement(position, script)
    }
  }
}

export {
  insertScriptRaw,
  insertScriptSrc
}
