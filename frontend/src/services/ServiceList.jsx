import React from "react";
import ServiceCard from "./ServiceCard";
import {Col} from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData=[
    {
        imgUrl:weatherImg,
        title:"calculate weather",
        desc:"Our Weather Checker lets you view real-time weather updates for your selected tour location — so you know exactly what to pack and when to travel.",
    },
    {
        imgUrl:guideImg,
        title:"Best Tour Guide",
        desc:"Our experienced and friendly tour guides are passionate locals who know every hidden gem, must-see landmark, and local story worth telling.",
    },
    {
        imgUrl:customizationImg,
        title:"customization",
        desc:"With Travel World’s customization feature, you can tailor your tour exactly the way you want it. From selecting destinations, accommodations, and activities to setting your budget."
    },
]
const ServiceList=()=>{
    return (
    <>
    {
        servicesData.map((item, index) => (
            <Col lg='3' md="6" sm="12" className="mb-4" key={index}>
                <ServiceCard item={item}/>
            </Col>
        ))
    }
    </>
    );
};
export default ServiceList;