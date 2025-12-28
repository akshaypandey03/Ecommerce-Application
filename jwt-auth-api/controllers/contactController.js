const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
    try{
        const {name, email, subject, message} = req.body;
        const contact = new Contact({ name, email, subject, message});
        await contact.save();
        res.status(201).json({ message: "Contact message sent successfully", contact});
    } catch (error){
        res.status(500).json({error: "Server error"});
    }
};