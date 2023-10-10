
const express = require('express');
require('./db/config');
const User = require('./db/User');
const product = require('./db/Product')
const cors = require('cors');
const Product = require('./db/Product');
const jwt = require('jsonwebtoken');

const jwtkey = "ecom";

const app = express();
app.use(express.json());
app.use(cors())


// middleware for jwt 

const verifyjwt = (req, resp, next) => {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
resp.status(401).send(err)
console.log(err)
            } else {
                next()
            }
        })
    } else {
        resp.status(403).send({ result: "please add token with headers" })
    }
    console.log("middleware called", token)
    
}

// sign up api

app.post("/register", async (req, res) => {

    try {

        let data = new User(req.body);
        let result = await data.save();
        result = result.toObject();
        delete result.password
        jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                res.send({ result: "No user found" })
            }
            res.send({ result, auth: token });
        })

    }
    catch (error) {

        console.error("MongoDB Error:", error);
        res.status(500).send("Internal Server Error");
    }

}
)

// login api

app.post("/login", async (req, res) => {


    if (req.body.email && req.body.password) {

        let user = await User.findOne(req.body).select("-password");

        if (user) {

            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "No user found" })
                }
                res.send({ user, auth: token });
            })


        } else {
            res.send({ result: 'No user found' })
        }
    } else {
        res.send({ result: "No user found" })
    }


})

// add product api

app.post("/add-product",verifyjwt, async (req, res) => {

    try {

        // delete req.body._id;

        let product = new Product(req.body);
        let result = await product.save();
        res.send(result);

    } catch (error) {
        console.error("MongoDB Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

// api for data getting

app.get("/products", verifyjwt, async (req, res) => {

    try {

        let products = await Product.find();
        if (products.length > 0) {
            res.send(products)
        } else {
            res.send({ result: "data not found" })
        }

    } catch (error) {
        console.error("MongoDB Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

// delete product api

app.delete('/product/:id', verifyjwt, async (req, res) => {

    let result = await Product.deleteOne({ _id: req.params.id });

    res.send(result)
})

// single product api

app.get('/singleproduct/:id', verifyjwt, async (req, res) => {

    let result = await Product.findOne({ _id: req.params.id });

    if (result) {
        res.send(result)
    } else {
        res.send({ result: "no result found" })
    }
})

// api for product update

app.put('/update-product/:id', verifyjwt, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    res.send(result);
})

// api for search product

app.get('/search-product/:key', verifyjwt, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })

    res.send(result);
})



app.listen(5500);

