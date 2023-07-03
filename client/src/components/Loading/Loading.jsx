import React from 'react'
import "./Loading.css"

const Loading = () => {
  return (
    <div className='loading'>
      <div className='container'>
        <div className='coast'>
            <div className='wave-rel-wrap'>
                <div className='wave'></div>
            </div>
        </div>
        <div className='coast delay'>
            <div className='wave-rel-wrap'>
                <div className='wave delay'></div>
            </div>
        </div>
        <div className='text text-L'>L</div>
        <div className='text text-o'>o</div>
        <div className='text text-a'>a</div>
        <div className='text text-d'>d</div>
        <div className='text text-i'>i</div>
        <div className='text text-n'>n</div>
        <div className='text text-g'>g</div>
      </div>
    </div>
  )
}

export default Loading
