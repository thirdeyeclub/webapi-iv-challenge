const express = require("express");
const db = require("./data/db.js");

const router = express.Router();

router.post("/", async (req, res) => {
const { title, contents } = req.body;
if (!title.length > 0 || !contents.length > 0) {
    res.status(400).json({
    errorMessage: "Please provide title and contents for the post."
    });
} else {
    try {
    const newPost = await db.insert(req.body);
    res.status(201).json(newPost);
    } catch (e) {
    res.status(500).json({
        error: "There was an error while saving the post to the database"
    });
    }
}
});

router.get("/", async (req, res) => {
try {
    const data = await db.find();
    res.status(200).json(data);
} catch (e) {
    res
    .status(500)
    .json({ error: "The posts information could not be retrieved." });
}
});

router.get("/:id", async (req, res) => {
try {
    const post = await db.findById(req.params.id);
    if (!post) {
    res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
    res.status(200).json(post);
    }
} catch (e) {
    res.status(500).json({
    error: "The post information could not be retrieved."
    });
}
});

router.delete("/:id", async (req, res) => {
const post = await db.findById(req.params.id);
if (!post) {
    res
    .status(404)
    .json({ message: "The post with the specified ID does not exist." });
} else {
    try {
    const records = await db.remove(req.params.id);
    res.status(200).json(records);
    } catch (e) {
    res.status(500).json({
        error: "The post information could not be retrieved."
    });
    }
}
});

router.put("/:id", async (req, res) => {
const post = await db.findById(req.params.id);
if (!post) {
    res
    .status(404)
    .json({ message: "The post with the specified ID does not exist." });
} else {
    const { title, contents } = req.body;
    if (!title.length > 0 || !contents.length > 0) {
    res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
    });
    } else {
    try {
        const newPost = await db.update(req.params.id, req.body);
        res.status(200).json(newPost);
    } catch (e) {
        res.status(500).json({
        error: "The post information could not be retrieved."
        });
    }
    }

});

module.exports = router;
