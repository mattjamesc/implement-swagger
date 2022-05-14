const express = require("express");
const app     = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// data parser - used to parse post data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Sample API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /players:
 *   get:
 *     description: Get player info
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get("/players", (req, res) => {
  res.send([
    {
      player: "Patrice Bergeron",
      number: "37",
      position: "Center",
      age: 37,
    },
  ]);
});

/**
 * @swagger
 * /player:
 *   post:
 *     description: Get one player
 *     parameters:
 *     - name: player
 *       description: Player Name
 *       in: body
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.post("/player", (req, res) => {
  const player = req.body.player;
  res.send({ player });
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});