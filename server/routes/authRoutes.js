const express = require('express');
const router = express.Router();
const axios = require('axios');
const { env } = require("node:process")

const { handleUser } = require("../controllers/users")

const {G_AUTH_CLIENT_ID,G_AUTH_CLIENT_SECRET} = env
const REDIRECT_URI = 'http://localhost:8000/auth/google/callback';

// Initiates the Google Login flow
router.get('/google/login', (req, res) => {
// router.get('/auth/google', (req, res) => {
  console.log("/auth hit")
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${G_AUTH_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  console.log("/auth/google/callback hit")

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: G_AUTH_CLIENT_ID,
      client_secret: G_AUTH_CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if(profile.verified_email) {
      handleUser(profile, res)
    }

    // Code to handle user authentication and retrieval using the profile data
    res.json({"success" : true})    
  } catch (error) {
    console.error('Error:', error);
    res.json({"success" : false})
  }
});

// Logout route
router.get('/logout', (req, res) => {
  // Code to handle user logout
  res.redirect('/login');
});

module.exports = router;