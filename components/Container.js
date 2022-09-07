import { useRouter } from 'next/router'
import Head from 'next/head'
import Nav from './Nav'
import Footer from './Footer'

export default function Container(props) {
  const { children, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: 'Sharif Mohammad Eunus',
    description: ``,
    type: 'website',
    image: '/site.png',
    ...customMeta,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="viewport" content="width=device-width" />
        {/* <meta content={meta.description} name="description" /> */}
        {meta.date && <meta property="article:published_time" content={meta.date} />}
      </Head>
      <Nav />
      <main id="skip" className="p-4 p mx-auto prose prose-headings:tracking-tight">
        {children}
        <Footer />
      </main>
    </>
  )
}
