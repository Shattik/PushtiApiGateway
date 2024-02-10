require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

const JWT_SECRET = process.env.JWT_SECRET;
const AUTH_URL = process.env.authenticationUrl;

const farmerRouter = require("./routes-protected/farmerRoute"); // Import farmerRoute
const agentRouter = require("./routes-protected/agentRoute"); // Import agentRoute
const vendorRouter = require("./routes-protected/vendorRoute"); // Import vendorRoute
const registrationRouter = require("./registerRoute"); // Import registerRoute
const smeRouter = require("./routes-protected/smeRoute"); // Import smeRoute


// Middleware for token validation, this adds req.user, example req.user = { nid: '1234567890', accountType: 'farmer' }
function validateToken(req, res, next) {
  const token = req.headers["authorization"];
  //const token = req.cookies.token;

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(req.user);

    // Check if token is close to expiration
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    if (decoded.exp - currentTime < 5 * 60) {
      // less than 5 minutes to expire
      const userData = { id: req.user.id, accountType: req.user.accountType };
      const newToken = generateToken(userData);
      res.setHeader("x-auth-token", newToken); // send new token in response header
    }

    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

// Middleware to check account type
function checkAccountType(accountType) {
  return (req, res, next) => {
    if (req.user.accountType !== accountType) {
      return res.status(403).send("Access forbidden: Incorrect account type.");
    }
    next();
  };
}

// Generate JWT token
function generateToken(userData) {
  return jwt.sign(userData, JWT_SECRET, { expiresIn: "12h" });
}

app.use("/register", registrationRouter);

// login
app.get("/login", async (req, res, next) => {
  // hit AUTH_URL in get method and just send the response back to the client with the status code
  axios
    .get(AUTH_URL + "/login")
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
});

app.post("/login/validate", async (req, res) => {
  // hit the url with request-body and if res.success = true, then generate token and send it back to the client
  try {
    const nid = req.body.nid;
    const password = req.body.password;

    const resp = await axios.post(AUTH_URL + "/login/validate", {
      nid: nid,
      password: password,
    });

    console.log(resp.data);
    if (resp.data.success) {
      // const accountTypeLower = String(accountType).toLowerCase();
      // console.log("Holla bro");
      const userData = { id: resp.data.id, accountType: resp.data.accountType };
      const token = generateToken(userData);

      // Set token in HttpOnly cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // set to true if using https
        sameSite: "Strict", // helps mitigate CSRF
        maxAge: 3600000 * 12, // cookie expiry, should match JWT expiry
      });

      const redirectUrl = `/${resp.data.accountType}/dashboard`;

      res
        .status(200)
        .send({ success: true, token: token, redirectUrl: redirectUrl });
    } else {
      res.status(200).send({ success: false, message: resp.data.message });
    }
  } catch (error) {
    res.status(401).send({ success: false, message: "mara kha" });
  }
});

// Protected routes for account types
app.use("/farmer", validateToken, checkAccountType("farmer"), farmerRouter);
app.use("/agent", validateToken, checkAccountType("agent"), agentRouter);
app.use("/vendor", validateToken, checkAccountType("vendor"), vendorRouter);
app.use("/sme", validateToken, checkAccountType("sme"), smeRouter);

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Api-gateway running on port ${port}`));
