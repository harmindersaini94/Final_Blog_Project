import React from 'react'
import { Link } from 'react-router-dom'
import postDbObj from '../Appwrite/Database'

const Card = ({$id, title, image}) => {
  return (
    <Link to={`/viewpost/${$id}`}>
        <div className='w-full h-72 justify-center bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-3'>
              {console.log("Image here", image)}
                <img src={postDbObj.PreviewFile(image[0])} alt={title} className='rounded-xl w-52 h-52'></img>
            </div>
            <h2 className='whitespace-nowrap w-full overflow-hidden overflow-ellipsis font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default Card