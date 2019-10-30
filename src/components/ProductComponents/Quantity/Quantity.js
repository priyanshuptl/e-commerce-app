import React from 'react';

class Quantity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: props.Quantity
        };
    }
    onQuantityClick(event) {
        event.preventDefault();
        this.setState({ quantity: event.target.value });
    }
    render() {
        const { quantity } = this.state;
        return (         
                <input type="number" value={quantity} onChange={(event)=> this.onQuantityClick(event)} min="1" max="10"/>
        );
    }
}
export default Quantity;
