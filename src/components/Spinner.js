import React from 'react'

const Spinner = () => {
  return (
    <section className='spinner-container'>
        <div>
            <div className='spinner'>
                <div></div>
                <div></div>
            </div>
            <h1>Loading questions</h1>
        </div>
    </section>
  )
}

export default Spinner