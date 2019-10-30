import React from 'react';

import LatestProductsSlider from '../ProductComponents/LatestProductsSlider/LatestProductsSlider';

import {
    fireViewEndCustomEvent
  } from '../../Analytics';
  
const home = (props) => {
    const { loggedIn, cartLength, token, server } = props.digitalDataDetails;
    window.digitalData = {
        "page": {
            "pageInfo": {
                "pageName": "HomePage",
                "destinationURL": document.location,
                "referringURL": document.referrer,
                "hierarchie1": "ecommerce:Home Page",
                "server": server
            },
            "category": {
                "primaryCategory": "Home Page",
                "pageType": "Home Page"
            },
            "attributes": {},
            "components": []
        },
        "product": [
            {
                "productInfo": {}
            }
        ],
        "cart": {
            "productsInCart": cartLength
        },
        "user": [
            {
                "profile": [
                    {
                        "profileInfo": {},
                        "attributes": {
                            "loggedIn": loggedIn,
                            "username": token
                        }
                    }
                ]
            }
        ],
    };

    fireViewEndCustomEvent();

    return (
        <div style={{ marginTop: '10px' }}>
            <LatestProductsSlider
                products={props.products}
                imageUri={props.imageUri}
                selectProduct={(product) => props.selectProduct(product)} />
        </div>
    );
}

export default home;