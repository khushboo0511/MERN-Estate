const Listing = require("../models/listing.model.js");
const { errorHandler } = require("../utils/error.js");

exports.createListing = async (req, res, next) => {

    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error)
    }
}

exports.deleteListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id)
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'))
        }
        if(req.user.id !== listing.useRef) {
            return next(errorHandler(401, 'You can only delete your own listing!'))
        }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing has been deleted!')
    } catch (error) {
        next(error)
    }
}

exports.updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(401, 'Listibg not found'))
    }
    if (req.user.id !== listing.useRef) {
        return next(errorHandler(401, 'You can only update your own listings!'))
    }  
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
    
}

exports.getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'))
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}