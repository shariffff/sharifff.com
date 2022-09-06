import Link from 'next/link'

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
)

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center mx-auto mb-8 w-full max-w-2xl">
      <hr className="mb-8 w-full border border-slate-300" />
      <Link href="/">
          <a className="p-1 text-slate-600 hover:underline sm:p-4">Home</a>
        </Link>
    </footer>
  )
}
