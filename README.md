# Pamaantify

Pamaantify is a website based on Create-React-App and the purpose of this website is to create a playlist for your Spotify account.

And this website is a submission for Final Project at Generasi GIGIH 2.0 by YABB & GoTo.

## Features

Features implementations (requirements):
- User has to login first before creating a playlist. If user hasn't login, user will be redirected to login page
- User can search song
- User can see songs details (title, artist, album, and duration)
- User can select and deselect songs
- Can't select the same song that already selected
- Selected song will not be lost after another search
- Create a playlist on the form
- Create a private and not collaborative playlist
- Showing an notification if playlist successfully created
- Using react-redux to store access token, user, and login state
- Using the test-library for testing
- Tried MSW to testing but not working
- User has to input 10 characters for playlist title, if not, it will be showing an alert to remind user

Additional features (bonus):
- Add profile button in navbar to show dropdown menu such as my account, profile, and logout
- Profile button also shows username and profile picture
- Add a profile page to show user profile by accessing from profile button
- Add a logout function

## Installation

1. Clone the repository
```bash
git clone https://github.com/anugrahkresnaya/GIGIH2-FE-Homework.git
```
2. Install the dependencies in the project directory
```bash
npm install
```
3. Start the app
```bash
npm run start or npm start
```