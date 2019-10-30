import React from 'react';

import Category from './Category/Category';

const categories = (props) => {
    const { categories } = props;
    return (
        categories.map((category, index) =>
            <Category
                key={"category" + index}
                category={category}
                index={index}
                toggleDrawer={val => props.toggleDrawer(val)} />
        )
    );
}

export default categories;