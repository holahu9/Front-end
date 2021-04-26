import React from 'react'
import { BsStarHalf, BsStarFill } from "react-icons/bs";
const ListReviews = (props) => {
    const { listReviews, setidReviews, setitemReviews } = props
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
                            <div className="containerAction">
                                <div className="btnUpdate" style={{
                                    border: 'inherit'
                                }}>

                                    <span onClick={() => {
                                        props.onhandlerEditShow()
                                        setitemReviews(item)
                                    }}>Edit</span>
                                </div>
                                <div className="btnDelete" style={{
                                    border: 'inherit'
                                }}>
                                    <span onClick={() => {
                                        props.handlerDelete()
                                        setidReviews(item._id)
                                    }}>Delete</span>
                                </div>
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