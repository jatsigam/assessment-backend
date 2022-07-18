const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const { getCompliment } = require('./controller')
const { getFortune } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);

const {getAllMentors,createMentor,deleteMentor,updateMentor} = require('./controller.js') 

app.get('/api/mentors', getAllMentors)
app.post('/api/mentors',createMentor)
app.delete('/api/mentors/:id', deleteMentor)
app.put('/api/mentors/:id', updateMentor)


app.listen(4040, () => console.log("Server running on 4040"));
