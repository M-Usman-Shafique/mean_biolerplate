import connectDB from "./configs/mongodb.js";
import app from "./configs/express.js";
import routes from "./routes/router.js";

const port = process.env.PORT || 3000;
const URL = process.env.API_URL;

app.get("/", (req, res) => {
    res.status(200).send(`🚀  Express server is running at port ${port}`);
});

app.use("/api", routes);

connectDB()
    .then(async () => {
        app.listen(port, () => {
            console.warn(`🚀 Server is running at ${URL}:${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    });
