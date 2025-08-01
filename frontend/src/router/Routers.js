import React from "react";
import {Routes,Route,Navigate} from 'react-router-dom';
import Home from './../pages/Home';
import Login from './../pages/Login';
import Register from './../pages/Register';
import Tours from './../pages/Tours';
import ToursDetails from './../pages/TourDetails';
import About from './../pages/About';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from "../pages/ThankYou";
import Payment from "../pages/payment";
import Gallery from "../pages/Gallery";
import PaymentTest from "../pages/bookingpayment";
import ThankYouSubscription from "../pages/thank-you-subscription";


const Routers=()=>{
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home'/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/tours' element={<Tours/>}/>
            <Route path='/tours/:id' element={<ToursDetails/>}/>
            <Route path='/gallery' element={<Gallery/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/thank-you' element={<ThankYou/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/tours/search' element={<SearchResultList/>}/>
            <Route path="/subscribe/payment" element={<Payment />} />
            <Route path="/payment-test" element={<PaymentTest />} />
            <Route path="/thank-you-subscription" element={<ThankYouSubscription />} />
            <Route path='/tours/gallery' element={<Gallery />} />

        </Routes>
    );
}
export default Routers;