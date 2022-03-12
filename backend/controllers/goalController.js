const asyncHandler = require('express-async-handler');

// @desc    GET goals
// @route   GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({
        mamasita: "la mamasita está bien nalgona"
    });
})

// @desc    ADD goals
// @route   ADD /api/goals
// @access Private
const addGoal = asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }
    res.status(200).json({
        mamasita: "la mamasita está bien nalgona"
    });
});

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler( async (req,res) => {
    res.status(200).json({
        mamasita: `la mamasita está bien nalgona, put request with id: ${req.params.id}`
    });
});

// @desc    DELETE goals
// @route   DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req,res) => {
    res.status(200).json({
        mamasita: `la mamasita está bien nalgona, delete request with id: ${req.params.id}`
    });
});

module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal
};