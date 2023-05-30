import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductById } from '../api-client'

const ProductDetails = () => {
    const history = useNavigate();

    const [productsArray, setProductsArray] = useState([]);
    const uri = useLocation();
    let parts = uri.pathname.split("/");
    const getProductId = parts[2];

    const getProducts = async () => {
        try {
            const id = parseInt(getProductId);
            const response = await getProductById(id);
            if (response.code === "SUCCESS") {
                const { products } = response;
                setProductsArray(products);
            } else {
                console.log('something went wrong');
            }
        } catch (error) {
            console.log('something went wrong');
        }
    };

    const gotoProductDetail = async (productId) => {
        history(`/product-details/${productId}`)
    };

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
            <div className="container">
                {productsArray.length ? (
                    <>
                        {productsArray?.map((record, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <div className="product" onClick={() => {
                                        gotoProductDetail(record.id);
                                    }}>
                                        <h3 className="product-name">{record.name}</h3>
                                        <p className="product-description">{record.description}</p>
                                        <p className="product-price">{record.price}</p>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </>
                ) : (
                    <>
                        <h1>not match any product againt this id.</h1>
                    </>
                )}
            </div>
        </>
    )
};

export default ProductDetails