import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={ {background: "rgba(245,242,241,1)"} }>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument