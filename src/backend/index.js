const express = require('express');
const app = express();
const cors = require('cors')
const fileUpload = require('express-fileupload')

app.use(express.json());

const db = require('./models');
app.use(cors());
app.use(fileUpload());

//Routers
const quoteRouter = require('./routes/Quotes')
app.use("/quotes", quoteRouter)
const commentRouter = require('./routes/Comments')
app.use("/comments", commentRouter)
const userRouter = require('./routes/Users')
app.use("/auth", userRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    })
});

