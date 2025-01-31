const express = require("express");
const cors = require("cors");
const jobRoutes = require("../routes/jobs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./zar-api/swagger.json");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
