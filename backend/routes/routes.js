const express = require('express');
const Model = require('../models/todo');

const router = express.Router();

router.post('/createTodo', async (req, res) => {
    const data = new Model({
        isChecked: req.body.isChecked,
        name: req.body.name,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAllTodos', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/updateTodo/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id,
            updatedData,
            options,
        );

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/deleteTodo/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.status(200).json({
            message: "Todo deleted successfully",
            deletedItemId: data.id,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
