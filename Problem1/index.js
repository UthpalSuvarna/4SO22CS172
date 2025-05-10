import express, { json } from "express"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
    "email": "uthpal33@gmail.com",
    "name": "uthpal",
    "rollNo": "4so22cs172",
    "accessCode": "KjJAxP",
    "clientID": "ec95c4e8-8f1c-427b-a440-8989a81c311b",
    "clientSecret": "HKffvjYPEZumaytE"
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};


const mpp = {
    'p': "primes",
    'f': "fibo",
    'e': "even",
    'r': "random"
}


app.get('/numbers/:numberid', async (req, res) => {
    const tokenres = await fetch("http://20.244.56.144/evaluation-service/auth", requestOptions)
        .then((response) => response.text())
        .then((result) => { return result })
        .catch((error) => console.error(error));

    const token = (JSON.parse(tokenres)).access_token
    console.log(token)
    const numberid = req.params.numberid
    const reqid = mpp[numberid]


    const resp = await fetch(`http://20.244.56.144/evaluation-service/${reqid}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            redirect: "follow"
        }
    ).then((response) => response.text())
        .then((result) => { return result })
        .catch((error) => console.error(error));

    const numbers = JSON.parse(resp)["numbers"]

    console.log(numbers)

    res.send("Done")

})

app.listen(9876, () => {
    console.log("Running")
})