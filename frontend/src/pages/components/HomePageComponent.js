import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import {Container, Row} from "react-bootstrap";

import {useEffect, useState} from "react";


const HomePageComponent = ({categories, getBestsellers}) => {

    const [mainCategories, setMainCategories] = useState([]);
    const [bestSellers, setBestsellers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getBestsellers()
            .then((data) => {
                setBestsellers(data);
            })
            .catch((er) => {
                setError(er.response.data.message ? er.response.data.message : er.response.data)
                console.log(er.response.data.message ? er.response.data.message : er.response.data)
            });
        setMainCategories((cat) => categories.filter((item) => !item.name.includes("/")));
    }, [categories])

    return (
        <>
            <ProductCarouselComponent bestSellers={bestSellers}/>
            <Container>
                <Row xs={1} md={2} className="g-4 mt-5">
                    {mainCategories.map((category, idx) => (
                        <CategoryCardComponent key={idx} category={category} idx={idx}/>
                    ))}
                </Row>
                {error}
            </Container>
        </>
    );
};

export default HomePageComponent;
