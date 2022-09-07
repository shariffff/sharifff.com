import Container from '../components/Container'


export default function About() {
  return (
    <Container>
      <div className="mx-auto mb-16 max-w-2xl text-slate-600">
      <div className="">
        <h2 className="font-extralight text-4xl mb-5 text-slate-700">Sharif Mohammad Eunus</h2>
        <span className=""> Dhaka, Bangladesh 🇧🇩</span>

        <p className="">Currently researching Linux servers and working at Incsub as a DevOps Support Engineer. In 2018, I began developing for the web with React, Laravel, and WordPress. I am an avid learner.<br/><br/>You might be interested in my <a className='bg-slate-100 p-1 rounded bold'  rel="noreferrer noopener" href="https://www.linkedin.com/in/sharif-mohammad-eunus-a962b310b/" target="_blank">LinkedIn</a> or { ' '}
        <a  className='bg-slate-100 p-1 rounded bold' rel="noreferrer noopener" href="https://github.com/shariffff" target="_blank">GitHub</a>{ ' '}
         account.
        </p>

        <h4>Contact</h4>

        <p className="">You can drop me an email at <mark className='bg-slate-100 p-1 rounded bold'>sharif.eunus[at]gmail.com</mark> </p>
        </div>
        </div>

    </Container>
  )
}
