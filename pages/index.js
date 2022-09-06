import Container from '../components/Container'
import Link from 'next/link'
import { getNotionData } from '../lib/getNotionData'

export default function Home({ posts }) {
  return (
    <Container>
      <div className="mx-auto mb-16 max-w-2xl">
        {!posts.length && <p className="mb-4 text-gray-600">No posts found.</p>}

        {posts.map((post) => {
          return (
            <div key={post.id} className="mb-8 sm:flex text-center">
              <Link href={`/${post.properties.Slug.rich_text[0].plain_text}`}>
                <a className="w-full decoration-slate-300 hover:decoration-slate-400	">
                    <h3 className="w-full text-6xl font-extralight text-slate-600 ">
                      {post.properties.Post.title[0].plain_text}
                    </h3>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const database = await getNotionData(process.env.NOTION_DATABASE_ID)

  return {
    props: {
      posts: database,
    },
  }
}
