
export default function LoadingScreen() {


  return (
    <article className='loading-container'>
      <div className='loading-title'>
        <h2>Loading<span className='loading-dots' id='dot-1'>.</span><span className='loading-dots' id='dot-2'>.</span><span className='loading-dots' id='dot-3'>.</span></h2>
        <div>
          <div className="dot-flashing"></div>
        </div>
      </div>
      <div className='loader'></div>
    </article>
  )
}