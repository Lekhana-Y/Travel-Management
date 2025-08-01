import Booking from '../models/Booking.js'

export const createBooking=async(req,res)=>{
    const newBooking=new Booking(req.body)
    try {
        const savedBooking=await newBooking.save()

        res.status(200).json({success:true,message:"your tour is booked",data:savedBooking})
    } catch (err) {
        res.status(500).json({success:false,message:'internal server error'})
    }
}
//get single book
export const getBooking=async(req,res)=>{
    const id=req.params.id
    try{
        const book=await Booking.findById(id)
        return res.status(200).json({
            success:true,
            message:"successfull",
            data:book,
        });
    }catch(err){
        return res.status(404).json({success:false,message:"not found"})
    }
}
//get allbookings
export const getAllBooking=async(req,res)=>{
    try{
        const books=await Booking.find()
        return res.status(200).json({
            success:true,
            message:"successfull",
            data:books,
        });
    }catch(err){
        return res.status(500).json({success:flase,message:"internal server error"})
    }
}