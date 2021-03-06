const express = require('express');
const mongoose = require("mongoose");

const Lecturer = require('../models/lecturer');


const createLecturer = async (req, res) => {
    const {
        name,
        email,
        unavailablePeriods,
        courses
    } = req.body

    const lecturer = await Lecturer.create({
            name,
            email,
            unavailablePeriods,
            courses
        });

        if (!lecturer) {
            res.status(400).json({
                success: false,
                message: "lecturer not created"
            });
        }
        res.json({
            success: true,
            message: "lecturer created",
            data: lecturer
        });
    
}

const getAllLecturer = async (req, res) => {
    try {
        const data = await Lecturer.find({})
        if(!data) {
            res.status(404).json({
                success: false,
                message: "not found"
            });
            return
        } else {
            res.status(200).json({
                success: true,
                data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
}

// delete a lecturer
const Deletelecturer = async (req, res) => {

    const { id } = req.body;
    try {
        const data = await Room.findOneAndDelete({ _id: req.body.id});
        if (!data) {
            res.status(404).json({ success: false, message: 'not found' });
            return;
        }
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};
module.exports = { createLecturer, getAllLecturer, Deletelecturer }