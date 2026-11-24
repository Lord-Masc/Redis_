import express from 'express';
import  redisClient  from "./redis.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/api/redis/:key", async (req, res) => {

    try {
        const { key } = req.params;
        const value = req.body.value;

        if (value === undefined) {
            return res.status(400).json({
                sucess: false,
                message: "Value is required"
            })
        }

        await redisClient.set(key, JSON.stringify(value));

        res.status(201).json({
            success: true,
            message: "Data stored successfully",
            key,
            value
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

app.get("/api/redis/:key", async (req, res) => {

    try {
        const { key } = req.params;
        const value = await redisClient.get(key);
        if (value === null) {

            return res.status(404).json({
                success: false,
                message: "Key not found"

            })
        }

        res.status(200).json({
            sucess: true,
            key,
            value: JSON.parse(value)
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

app.put("/api/redis/:key", async (req, res) => {

    try {
        const { key } = req.params;
        const value = req.body.value;

        if (value === undefined) {
            return res.status(400).json({
                success: false,
                message: "Value is required"
            })
        }

        const exists = await redisClient.exists(key)
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "Key does not exist"
            });
        }

        await redisClient.set(key, JSON.stringify(value));

        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            key,
            value
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})

app.delete("/api/redis/:key", async (req, res) => {
    try {
        const { key } = req.params;

        const deleted = await redisClient.del(key);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Key not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Data deleted successfully",
            key
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// SERVER START
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
