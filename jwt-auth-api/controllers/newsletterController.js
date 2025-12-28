const Newsletter = require('../models/Newsletter')

exports.subscribeNewsletter = async(req, res)=> {

    try{
        const {email} = req.body;
        const existing = await Newsletter.findOne({email});
        if(existing) return res.status(400).json({ error: "Email already subscribed"});

        const subsciber = new Newsletter({ email});
        await subsciber.save();
        res.status(201).json({ message:"Subscriber successfully", subsciber});
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
}