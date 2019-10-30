import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
 
class Rating extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      rating: props.Rating
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
 
  render() {
    const { rating } = this.state;
    return (                
   <div>
        {/* <h2>Rating from state: {rating}</h2> */}
        <StarRatingComponent 
           
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
    </div>
    );
  }
}
 
export default Rating;
