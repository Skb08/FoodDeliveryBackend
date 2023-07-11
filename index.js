require("dotenv").config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoDB = require('./db')
const cors = require("cors");

mongoDB();
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin",`http://localhost:3000`);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Request-Width, Content-Type, Accept"
//   );
//   next();
// })

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// })

const start=async()=>{
  try {
      await mongoDB(process.env.DATABASE);
      app.listen(PORT,()=>{
          console.log(`Running on PORT ${PORT} `);
      });
  } catch (error) {
      console.log(error);
  }
};

start();