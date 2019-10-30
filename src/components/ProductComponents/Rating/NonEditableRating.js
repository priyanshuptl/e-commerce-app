import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Rating extends React.Component {
    render() {

        return (
            <div>
                {/* <h2>Rating from state: {rating}</h2> */}
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.props.Rating}
                />
            </div>
        );
    }
}

export default Rating;
