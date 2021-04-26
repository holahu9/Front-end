import React from 'react'
import { BsStarHalf, BsStarFill } from "react-icons/bs";
const ListReviews = (props) => {
    const {listReviews} = props
    return (
        <React.Fragment>
            {
                listReviews?.length != 0 && listReviews ? (
                    listReviews.map((item) => (
                        <div className="containerReviewss">
                            <span>{item.user.name}</span>
                            <span>{item.comment}</span>
                            <div className="containerReviewsStart">
                                {Array(parseInt(item.star)).fill(0).map((_, index) => {
                                    return (
                                        <BsStarFill
                                            key={index}
                                            size={24}
                                            style={{
                                                marginRight: 10,
                                                cursor: "pointer",
                                                color: 'rgb(255 185 13)'
                                            }}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    ))
                ) :
                    <div className="containerReviewss">
                        <span style={{ textAlign: 'center', margin: '1rem', fontFamily: 'Prata' }}>No Reviews</span>
                    </div >
            }
        </React.Fragment>
    )
}
export default React.memo(ListReviews)