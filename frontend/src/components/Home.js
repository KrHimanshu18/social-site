import { React, useState, useEffect } from "react";

function Home() {
  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      by: "Steve Jobs",
    },
    {
      quote:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      by: "Winston Churchill",
    },
    {
      quote: "In the middle of every difficulty lies opportunity.",
      by: "Albert Einstein",
    },
    {
      quote: "The best way to predict the future is to create it.",
      by: "Abraham Lincoln",
    },
    {
      quote: "Life isn’t about finding yourself. It’s about creating yourself.",
      by: "George Bernard Shaw",
    },
    {
      quote:
        "Happiness is not something ready-made. It comes from your own actions.",
      by: "Dalai Lama",
    },
    {
      quote:
        "The only limit to our realization of tomorrow is our doubts of today.",
      by: "Franklin D. Roosevelt",
    },
    {
      quote:
        "Do not go where the path may lead, go instead where there is no path and leave a trail.",
      by: "Ralph Waldo Emerson",
    },
    {
      quote: "It does not matter how slowly you go as long as you do not stop.",
      by: "Confucius",
    },
    {
      quote: "You miss 100% of the shots you don’t take.",
      by: "Wayne Gretzky",
    },
    {
      quote: "Be the change that you wish to see in the world.",
      by: "Mahatma Gandhi",
    },
    {
      quote:
        "Success is not the key to happiness. Happiness is the key to success.",
      by: "Albert Schweitzer",
    },
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      by: "Eleanor Roosevelt",
    },
    {
      quote:
        "The only way to achieve the impossible is to believe it is possible.",
      by: "Charles Kingsleigh",
    },
    {
      quote:
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      by: "Ralph Waldo Emerson",
    },
  ];

  const [currInd, setCurrInd] = useState(0);
  const length = quotes.length;

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrInd((prevIndex) => (prevIndex + 1) % length);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, [length]);

  return (
    <div className="bg-yellow-600">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a
          href="/"
          className="d-flex align-items-center my-2 my-lg-0 me-lg-auto font-bold text-2xl text-white text-decoration-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)", transform: "0", msfilter: "0" }}
            className="flex items-center justify-center"
          >
            <path d="m22 3.41-.12-1.26-1.2.4a13.84 13.84 0 0 1-6.41.64 11.87 11.87 0 0 0-6.68.9A7.23 7.23 0 0 0 3.3 9.5a9 9 0 0 0 .39 4.58 16.6 16.6 0 0 1 1.18-2.2 9.85 9.85 0 0 1 4.07-3.43 11.16 11.16 0 0 1 5.06-1A12.08 12.08 0 0 0 9.34 9.2a9.48 9.48 0 0 0-1.86 1.53 11.38 11.38 0 0 0-1.39 1.91 16.39 16.39 0 0 0-1.57 4.54A26.42 26.42 0 0 0 4 22h2a30.69 30.69 0 0 1 .59-4.32 9.25 9.25 0 0 0 4.52 1.11 11 11 0 0 0 4.28-.87C23 14.67 22 3.86 22 3.41z"></path>
          </svg>
          THOUGHTS
        </a>

        <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
          <li>
            <a
              href="/"
              className="nav-link text-secondary flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "0",
                  msfilter: "0",
                }}
              >
                <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path>
              </svg>
              <span>Home</span>
            </a>
          </li>

          <li>
            <a
              href="/"
              className="nav-link text-white flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "0",
                  msfilter: "0",
                }}
              >
                <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
              </svg>
              <span>Explore</span>
            </a>
          </li>

          <li>
            <a
              href="/"
              className="nav-link text-white flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "0",
                  msfilter: "0",
                }}
              >
                <path d="M4 21h15.893c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2v-5h4v5H4zM14 7v5h-4V7h4zM8 7v5H4V7h4zm2 12v-5h4v5h-4zm6 0v-5h3.894v5H16zm3.893-7H16V7h3.893v5z"></path>
              </svg>
              <span>Profile</span>
            </a>
          </li>

          <li>
            <a
              href="/"
              className="nav-link text-white flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "0",
                  msfilter: "0",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{
                    fill: "rgba(0, 0, 0, 1)",
                    transform: "0",
                    msfilter: "0",
                  }}
                >
                  <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
                </svg>
              </svg>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </div>

      {/* HERO SECTION */}
      <section className="pt-5 my-5 text-center">
        <h1 className="display-4 fw-bold text-dark mb-2">
          Share Your Thoughts
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 font-semibold">
            Easily write, edit, and share your ideas with the world. Our app
            lets you create content effortlessly and publish it online. Connect
            with others, express your thoughts, and inspire your audience—your
            voice matters and is just a click away from being heard
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Write
            </button>
          </div>
        </div>
        <div className="bg-yellow-800 py-32">
          <h1 className="text-2xl font-bold">{quotes[currInd].quote}</h1>
          <p className="text-xl font-semibold">{quotes[currInd].by}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-2">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-body-secondary">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-body-secondary">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-body-secondary">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-body-secondary">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-body-secondary">
              About
            </a>
          </li>
        </ul>
        <p className="text-center text-body-secondary">© 2024 Company, Inc</p>
      </footer>
    </div>
  );
}

export default Home;
