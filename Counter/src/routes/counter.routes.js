import express from 'express';
import redisClient from "../config/redis.js";

const router = express.Router();

const user = "page:visit";
router.get("/visit", async (req, res) => {
    try {
        const count = await redisClient.incr(user);
        res.json({
            message: "Page visit sucessfully",
            visited: count
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to increment counter",
        })
    }
})

// get count
router.get("/", async (req, res) => {
    try {
        const count = await redisClient.get(user)
        res.json({
            totalVisits: Number(count ?? 0),
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch counter",
        });
    }
})

// Reset counter (for development)
router.delete("/reset", async (req, res) => {
  try {
    await redisClient.del(user);

    res.json({
      message: "Counter reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reset counter",
    });
  }
});

export default router;