import React from "react";
import ava01 from '../../assets/images/ava-1.jpg';
import ava02 from '../../assets/images/ava-2.jpg';
import ava03 from '../../assets/images/ava-3.jpg';
import Slider from 'react-slick';
const Testinomials=()=>{
    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint:992,
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite: true,
                    dots: true
                },
            },
            {
                breakpoint:576,
                settings:{
                    slidesToShow:1,
                    slidesToScroll:1,
                    },
            },
        ]
    }
    return (
        <Slider {...settings}>
            <div className="testinomial py-4 px-3">
                <p>This was by far the best trip I've ever taken! The itinerary was well-paced, and every spot was absolutely breathtaking. Highly recommend!</p>


                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testinomial py-4 px-3">
                <p>I loved how I could customize the whole trip! I picked my own destinations, added a hot air balloon ride, and stayed in a homestay. It felt so personal.</p>

                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">Lara</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testinomial py-4 px-3">
                <p>"The built-in weather info was super helpful — I was able to plan my outfits and activities better. It even warned me about rain in advance!"</p>

                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">Kiran</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testinomial py-4 px-3">
                <p>This tour was Instagram heaven! From mountain viewpoints to vibrant local markets — every stop was picture perfect!</p>

                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">Jash</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testinomial py-4 px-3">
                <p>"The booking process was smooth and quick. I had to change my travel dates and the support team responded immediately and helped with everything. Very impressed!"</p>

                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">RAHA</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testinomial py-4 px-3">
                <p>Great value! Got so much for the price — accommodation, food, guide, and even entry tickets were all covered. Will definitely book again</p>

                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">Harsh</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
        </Slider>
    )
}
export default Testinomials;