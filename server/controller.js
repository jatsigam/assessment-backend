let mentors = require('./db.json');
let globalID = 1;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = ["Distance yourself from the vain.!", "A good time to finish up old tasks!", "Adventure can be real happiness.","An inch of time is an inch of gold.","It takes courage to admit fault."];
      
        // choose random fortune//change outputs about for fortunes
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
        
    },getAllMentors: (req, res) => {
        res.status(200).send(mentors)
    },
    deleteMentor: (req, res) => {
    let index = mentors.findIndex(elem => elem.id === +req.params.id)
    mentors.splice(index, 1);
    res.status(200).send(mentors)
    },
    createMentor: (req, res) => {
        // console.log(req.body)
        const{person,price,imageURL} = req.body;
        let newMentor = {
            id: globalID,
            person,
            price: price,
            imageURL
    }
    mentors.push(newMentor);
        globalID++;
        res.status(200).send(mentors);
},
updateMentor: (req, res) => {
    const {id} = req.params;
    const {type} = req.body;
    let index = mentors.findIndex(elem => +elem.id === +id);
    console.log(type);
    if(type === 'minus' && mentors[index].price > 10000){
        mentors[index].price -= 100;
        res.status(200).send(mentors);
    } else if(type === 'plus'){
        mentors[index].price += 100;
        res.status(200).send(mentors);
    } else {
        res.status(400).send('Invalid price!')
    }
}
    
}
