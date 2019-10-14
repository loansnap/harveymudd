import React from 'react'
import uuid from 'uuid'
import cookie from 'cookie'

const generateIdentifier = () => Math.floor(Math.random() * 128)

export function ensureIdentifier(req, res) {
  if (process.browser) {
    throw new Error('ensureIdentifier() called in browser-mode')
  }
  const reqCookie = req.headers.cookie || ''
  const cookies = cookie.parse(reqCookie)
  if (!cookies.identifier) {
    const identifier = generateIdentifier()
    cookies.identifier = identifier
    req.headers.cookie = cookie.serialize('identifier', identifier) + '; ' + reqCookie
    res.setHeader('Set-Cookie', cookie.serialize('identifier', identifier, { maxAge: 60*60*24*7*365 }))
  }
  return cookies.identifier
}

export function getIdentifier(cookie) {
  return cookie.parse(cookie).identifier
}

export function resetIdentifier() {
  const newIdentifier = generateIdentifier()
  const updatedCookie = cookie.serialize('identifier', newIdentifier)
  document.cookie = updatedCookie
}

export const UserIdentifierContext = React.createContext(0)
