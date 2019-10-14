import React from 'react'
import App from 'next/app'
import { createGlobalStyle } from 'styled-components'
import AppStyles from 'themes/AppStyles';


const GlobalStyle = createGlobalStyle`
  ${AppStyles}
`


class Layout extends React.Component {
  render () {
    return <div {...this.props} />
  }
}

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    )
  }
}
