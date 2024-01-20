export default function Home() {

  const letters = ['T', 'h', 'e', " ", ' B', 'o', 'a', 'r', 'd', ' ', 'G', 'a', 'm', 'e', ' ', 'L', 'i', 'b', 'r', 'a', 'r', 'y' ]

  // Functions
  function scrollUp() {
    document.documentElement.scrollTop = 0
  }
  scrollUp()
  
  return (
    <>
      <section className="hero">
        <h3>Welcome to</h3>
        <div className="wavey">
          {letters.map((letter, index) => (
            <h1 key={index} style={{ '--i': index + 1 }}>
              {letter}
            </h1>
          ))}
        </div>
      </section>
    </>
  )
}