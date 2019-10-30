import React from 'react';

import ExpansionPanel from './ExpansionPanel/ExpansionPanel';

const category = (props) => {
    const { category, index } = props;
    return (
        <ExpansionPanel
            category={category}
            index={index}
            toggleDrawer={val => props.toggleDrawer(val)} />
    );
}

export default category;