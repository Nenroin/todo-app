const express = require('express');
const Model = require('../models/todo');

const router = express.Router();

router.post('/todo', async (req, res) => {
    const data = new Model({
        isChecked: req.body.isChecked,
        name: req.body.name,
    });

    try {
        const dataToSave = await data.save();

        res.status(200).json({
            id: dataToSave.id,
            isChecked: dataToSave.isChecked,
            name: dataToSave.name,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/todos', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data.map(i => ({id: i.id, isChecked: i.isChecked, name: i.name})));
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/todo/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id,
            updatedData,
            options,
        );

        res.send({
            id: result.id,
            isChecked: result.isChecked,
            name: result.name,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/todo/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.status(200).json({
            message: "Todo deleted successfully",
            id: data.id,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
