import React from 'react'
import Portal from './Portal'
import './DescriptionModal.css'
import TMDBImage from './TMDBImage'
import { IoMdClose } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';

export const DescriptionModal = ({movie, closeModal}) => {
    const {title, poster_path, vote_average, release_date, overview} = movie
    return(
        <div>
            {
                movie && (
                    <Portal>
                        <div className="modalContainer">
                            <div className="modal">
                                <TMDBImage src={poster_path} className="modal-poster"/>
                                <div className="modal-content">
                                    <div className="modal-close" onClick={closeModal}>
                                        <IoMdClose color="#ffffff" size ="2em" />
                                    </div>
                                    <h2>{title}</h2>
                                    <div className="modal-rating">
                                        <div>
                                            <AiFillStar color="#ffffff" className="star-icon"/>
                                            <p>{vote_average}</p>
                                        </div>
                                        <p>{`Release: ${release_date}`}</p>
                                    </div>
                                    <div className="modal-overview">
                                        <p>{overview}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </Portal>
                )
            }
        </div>
    )
}