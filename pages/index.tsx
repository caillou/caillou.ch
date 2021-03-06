import Head from 'next/head';

import { renditions } from '../public/renditions/renditions';

export default function Home() {
  const sources = renditions['pierre-hq.jpg']
    .sort((a, b) => b.aspectRatio - a.aspectRatio)
    .map((config) => {
      const query = `(min-aspect-ratio: ${config.aspectRatio * 1000}/1000)`;
      const sources = config.sizes
        .map(
          (size) =>
            `/renditions/pierre-hq.jpg-${size}@${config.aspectRatio}.jpeg ${size}w`
        )
        .join(', ');
      return <source media={query} srcSet={sources} />;
    });
  const source = sources.pop();
  const lastSrcSet = source?.props.srcSet;
  return (
    <>
      <Head>
        <title>CV - Pierre Spring</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="image-container">
        <picture>
          {sources}
          <img
            src=""
            srcSet={lastSrcSet}
            alt="Pierre's crazy eyes…"
            className="full-image"
          />
        </picture>
      </div>
      <main>
        <div className="fill-viewport"></div>
        <div className="bg">
          <div className="content">
            <h1>Pierre Spring</h1>
            <p>Full Stack Node.js and Frontend&nbsp;Developer</p>

            <dl>
              <dt>December 2013 - Present</dt>
              <dd>Freelance Node.js and Frontend&nbsp;Developer</dd>
              <dd>
                Incorporate teams and help with the transition to modern web
                application development.
              </dd>
              <dt>May 2011 - December 2013</dt>
              <dd>Partner and Lead Frontend Developer at&nbsp;Nelmio</dd>
              <dd>
                Bootstrapped a fully-remote web agency specialized on single
                page applications.
              </dd>
              <dt>January 2005 - April 2011</dt>
              <dd>Full Stack Web Developer at&nbsp;Liip</dd>
              <dd>Early years - from full stack to frontend.</dd>
              <dt>2000 - 2006</dt>{' '}
              <dd>BSc Computer Science University&nbsp;of&nbsp;Fribourg</dd>
            </dl>
            <h2>About Me</h2>
            <p>
              Hi, my name’s Pierre. I am a full stack web developer with 15
              years of experience, based in Zürich, Switzerland. I have worked
              with a range of different languages and frameworks and ultimately
              fell in love with <em>TypeScript</em>. In my career I have
              acquired experience in leading teams, product development, agile
              methodologies, building companies, working with clients and
              customers.
            </p>
            <p>
              I love to share my passion for <em>Clean Code</em> and{' '}
              <em>Maintainable CSS</em>. I am currently mostly fluent with the
              following technologies:
            </p>
            <ul>
              <li>TypeScript</li>
              <li>JavaScript</li>
              <li>React &amp; Redux</li>
              <li>Vue</li>
              <li>Angular</li>
              <li>Jest</li>
              <li>Express</li>
              <li>GraphQL</li>
              <li>PostgreSQL</li>
              <li>SASS</li>
              <li>Docker</li>
            </ul>
            <p>
              Most of all, I believe that clean and maintainable code is a
              side-effect of continuously evolving and adapting the{' '}
              <em>development process</em>. Simple tools like{' '}
              <em>code reviews</em>, <em>pair programming</em>,{' '}
              <em>git flow</em>, <em>continuous integration</em>,{' '}
              <em>continuous deployment</em>, and <em>automated testing</em> are
              often easy to implement and have a tremendous effect on{' '}
              <em>long-term productivity</em> of a team.
            </p>

            <h2>Experience</h2>

            <h3>Freelance</h3>

            <div role="doc-subtitle">
              <span>2013 - Present</span>
              <br />
              Node.js and Frontend Developer
            </div>

            <p>
              As a freelancer, I incorporate teams and help with the transition
              to modern web application development.
            </p>
            <p>
              <em>BKW</em> Development of a <em>web components</em> style guide
              which caters both static pages, and web applications.{' '}
              <a href="https://bkw.ch">bkw.ch</a>
              <br />
            </p>
            <p>
              <em>Republik</em> Maintain the <em>Node.js</em> backend of the
              publication tool for an independent Swiss online newspaper and
              helped kick-start the transition to <em>TypeScript</em>. I learned
              a lot about the tradeoffs necessary to deploy a functioning tool
              in a short amount of time with a small team, which aims for{' '}
              <em>100% uptime</em>.{' '}
              <a href="https://republik.ch">republik.ch</a>
            </p>
            <p>
              <em>SBB</em> Worked with a team of frontend developers on the
              relaunch of the SBB Website over a period of 3 years. While
              bringing in my experience in writing maintainable JS and CSS, I
              learned a lot about <em>Accessibility</em> and <em>Analytics</em>{' '}
              on this job. <a href="https://sbb.ch">sbb.ch</a>
            </p>
            <p>
              <em>Neue Zürcher Zeitung &amp; Livingdocs</em> I joined the team
              that worked on a <em>full-stack</em> publication tool, written in{' '}
              <em>Node.js</em> and Angular. While bringing in my experience with
              writing single page application, I learned a lot about unit
              testing, <em>continuous integration and deployment</em>,{' '}
              <em>authoring NPM libraries</em> on this job.{' '}
              <a href="https://nzz.ch">nzz.ch</a>
            </p>
            <p>
              <em>Credit Suisse</em> I joined the team that worked on a redesign
              of the website. I brought in my knowledge of{' '}
              <em>maintainable CSS</em> and <em>modern frontend development</em>{' '}
              and learned a lot about working in a <em>big corporation</em>.{' '}
              <a href="https://www.credit-suisse.ch/">credit-suisse.ch</a>
            </p>

            <h3>Nelmio AG</h3>

            <div role="doc-subtitle">
              May 2011 - December 2013
              <br />
              Partner and Lead Frontend Developer
            </div>

            <p>
              Together with{' '}
              <a href="https://github.com/Seldaek">Jordi Boggiano</a> I
              bootstrapped a fully remote web agency. We specialized in{' '}
              <em>single page applications</em>, with Jordi taking the lead in
              backend and open source development, while I took the lead in
              frontend development.
            </p>
            <p>
              Additionally I helped our clients with{' '}
              <em>product development</em> and took care of our sales, hiring,
              and administration. Some of the clients we worked with were:
            </p>
            <ul>
              <li>
                <a href="https://local.ch">local.ch</a>
              </li>
              <li>
                <a href="https://www.zkb.ch/">Zürcher Kantonalbank</a>
              </li>
              <li>
                <a href="https://colibird.ch/">colibird.ch</a>
              </li>
              <li>
                <a href="https://www.unic.com/">Unic</a>
              </li>
              <li>
                <a href="https://ginetta.net/">Ginetta</a>
              </li>
              <li>
                <a href="https://www.swiss.com/">Swiss</a>
              </li>
            </ul>
            <p>
              Both Jordi and I <em>spoke at many conferences</em> during these
              years, which is how we met most of the talented developers we
              hired.
            </p>
            <p>
              While the company quickly grew both in size and recognition, my
              role shifted mostly to administrative tasks. In order to focus
              more on <em>development and system architecture</em>, I gradually
              transitioned to freelance development, completely leaving my
              administrative tasks at the end of 2013.
            </p>
            <h3>Liip AG</h3>
            <div role="doc-subtitle">
              January 2005 - April 2011
              <br />
              Full Stack Web Developer
            </div>
            <p>Early years - from full stack to frontend.</p>
            <p>
              I joined Mediagonal AG in its very early years. This company in
              Fribourg later merged with the Zurich based bitflux GmbH to become
              Liip AG.
            </p>
            <p>
              At that time the web was booming. At Liip, we believed in the
              Sematic Web, embraced XHTML, were happy to see it replaced by
              HTML5, went from administrating servers to automated dev ops. As
              browsers and computers become powerful enough for serious frontend
              development, I started concentrating more and more on frontend.
              After reading Douglas Crockford's{' '}
              <a href="https://www.oreilly.com/library/view/javascript-the-good/9780596517748/">
                JavaScript: The Good Parts
              </a>{' '}
              and understanding the functional nature of JavaScript while
              falling in love with its prototypal inheritance, my path was
              sealed.
            </p>
            <p>
              My years at Liip were probably the most formative of my life. We
              worked crazy hours and had a tremendous amount of fun. We were
              constantly ahead of the curve, used clever tricks to design
              responsive pages before the browsers offered the tools necessary
              for it. Delivered standard conform pages using progressive
              enhancement. And when the iPhone sealed the faith of Flash, we
              were more than prepared to take over the single page applications
              market.
            </p>
            <p>
              After 6 years at Liip, the company had grown form 5 employees to
              60. I started to miss the craze of growing a small company. I left
              Liip to create my own agency.
            </p>
            <h2>Education</h2>
            <div role="doc-subtitle">
              2000 - 2006
              <br />
              BSc Computer Science
              <br />
              University of Fribourg
            </div>
            <p>
              My time at the University of Fribourg provided me with a good
              theoretical foundation in computer science and gave me a toolset I
              still regularly find myself using.
            </p>
            <p>
              In parallel I discovered the web, which took me by surprise.
              Combining the theoretical knowledge from the classes with the
              down-to-earth experience in the early days of the web was a
              fantastic experience. While most of my student colleagues pursued
              a masters degree, I chose to go into web development full-time. A
              decision I never regretted.
            </p>
            <h2>When I'm Not Programming</h2>
            <h3>JSZurich</h3>
            <div role="doc-subtitle">
              2011 - 2015
              <br />A monthly JavaScript meetup.
            </div>
            <p>
              Together with <a href="https://github.com/Seldaek">Jordi</a> we
              organized a monthly meetup for JavaScript developers. Being very
              passionate about JavaScript, this helped us and others keep up
              with its evolution.
            </p>
            <h3>SwissJS Conference</h3>
            <div role="doc-subtitle">
              2012 - 2015
              <br />A JavaScript community event for and by locals.
            </div>
            <p>
              The next obvious step after organizing a local meetup was a
              national community event. We organized the{' '}
              <a href="http://swissjs.ch">SwissJS Conference</a> in the years
              2012, 2014, and 2015.
            </p>
            <p>
              While knowledge transfer was an obvious part of the event, the
              main focus was to meet JS developers from all over Switzerland.
              The ticket prices were as affordable as CHF 25, in order not to
              leave anyone behind.
            </p>
            <p>
              Organizing these conferences, I learned about the lack of
              diversity in our community, realized that I was probably part of
              this problem and how we, as a community, could mitigate these
              problems. To this day, this is something I personally work on.
            </p>

            <h3>Public Speaking</h3>
            <div role="doc-subtitle">
              2011 - 2015
              <br />
              Sharing my passion for the open web.
            </div>

            <p>
              In the years 2011 - 2015 I spoke at various{' '}
              <em>conferences in Europe</em>, mostly with a focus on
              performance, maintainable CSS and best practices in JavaScript
              development.
            </p>

            <h3>Hobbies</h3>
            <p>The web is not everything.</p>
            <p>
              <em>Vintage Computers</em> I recently aquired an{' '}
              <a href="http://oldcomputers.net/ibm5155.html">IBM 5155</a> with
              the aim to learn about operating systems. The plan is to install{' '}
              <em>Minix</em> on this machine and write a driver for the{' '}
              <a href="https://www.bluelavasystems.com/xt-ide/">XT IDE</a> card.
            </p>
            <p>
              <em>Homelab</em> I maintain a self-hosted homelab. It gives me the
              opportunity to learn about <em>containers</em> and linux.{' '}
              <em>ZFS</em> is my Filesystem of choice, all of this is running on
              an Ubuntu Server.
            </p>
            <p>
              <em>Family</em> I am the father of 4 kids and spend most of my
              free time with my children.
            </p>
          </div>
        </div>{' '}
      </main>
    </>
  );
}
