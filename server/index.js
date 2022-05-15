const experss = require("express")
const axios = require("axios").default
const bodyParser = require("body-parser")

const app = experss()
app.use(bodyParser.json())

app.get("/test", (req, res) => {
    console.log("Someone pinged me", req.rawHeaders)

    res.send("It's working!!! (Konstantin)")
})

let subscriptions = []
const the_password = "abc123"

app.post("/subscribe", (req, res) => {
    const { url, password, interest } = req.body

    if (password !== the_password) {
        res.status(401).end()
        return
    }

    subscriptions.push({ url: url, interest: interest })

    res.end()
})

app.delete("/subscribe", (req, res) => {
    const url = req.query.url

    subscriptions = subscriptions.filter((el) => el !== url)

    console.log(url + " unsubscribed")

    res.end()
})

app.listen(5555, () => {
    console.log("listening on port 5555")
})

const fakeMessages = [
    "Hey, I have a problem with my order",
    "I'd like to return my purchase",
    "Do you have any new promos?",
]

const pokemons = [
    {
        id: 1,
        name: "Bulbasaur",
        image: "images/bulbasaur.jpg",
    },
    {
        id: 2,
        name: "Ivysaur",
        image: "images/ivysaur.jpg",
    },
    {
        id: 3,
        name: "Venusaur",
        image: "images/venusaur.jpg",
    },
    {
        id: 4,
        name: "Charmander",
        image: "images/charmander.jpg",
    },
]
setInterval(() => {
    const message = fakeMessages[Math.floor(Math.random() * 3)]
    const randomPokemonImage =
        pokemons[Math.floor(Math.random() * pokemons.length)].image

    subscriptions.forEach((url) => {
        if (interest === "pokemon") {
            axios.post(url, randomPokemonImage)
        } else axios.post(url, { message })
    })
}, 5000)
