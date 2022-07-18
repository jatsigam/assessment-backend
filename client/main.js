const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const mentorsContainer = document.querySelector('#mentors-container')
const form = document.querySelector('form')

const getCompliment = () => {
    axios.get("http://localhost:4040/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

// Fortune 
const getFortune = () => {
    axios.get("http://localhost:4040/api/fortune")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

fortuneBtn.addEventListener('click', getFortune)
 
const baseURL = `http://localhost:4040/api/mentors`

const mentorsCallback = ({ data: mentors }) => displayMentors(mentors)
const errCallback = err => console.log(err)

const getAllMentors = () => axios.get(baseURL).then(mentorsCallback).catch(errCallback)
const createMentor = body => axios.post(baseURL, body).then(mentorsCallback).catch(errCallback)
const deleteMentor = id => axios.delete(`${baseURL}/${id}`).then(mentorsCallback).catch(errCallback)
const updateMentor = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(mentorsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let person = document.querySelector('#person')
    let price = document.querySelector('#price')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        person: person.value,
        price: price.value, 
        imageURL: imageURL.value
    }

    createMentor(bodyObj)

    person.value = ''
    price.value = ''
    imageURL.value = ''
}

function createMentorCard(mentor) {
    const mentorCard = document.createElement('div')
    mentorCard.classList.add('mentor-card')

    mentorCard.innerHTML = `<img alt='mentor cover image' src=${mentor.imageURL} class="mentor-cover-image"/>
    <p class="person">${mentor.person}</p>
    <div class="btns-container">
        <button onclick="updateMentor(${mentor.id}, 'minus')">-</button>
        <p class="mentor-price">$${mentor.price}</p>
        <button onclick="updateMentor(${mentor.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteMentor(${mentor.id})">delete</button>
    `

    mentorsContainer.appendChild(mentorCard)
}

function displayMentors(arr) {
    mentorsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMentorCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllMentors()

