export const runtime = 'edge';

import 'dotenv/config';
import path from 'path';
import morgan from "morgan";
import Router from "../src/routes/index.js";
import express from "express"
const app = express()

// Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// Routes
app.use(Router);
// Static content

app.use(express.static(path.resolve(process.cwd(),"public")))




const port = 3000;

app.listen(port,() => {
  console.log(`Server listening on port ${port}`);
});

