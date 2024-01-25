# Project 4: The Board Game Library ReadMe

## Description
This project was the fourth and final project of my software engineering bootcamp with General Assembly. The aim of the project was to create a full stack web application with CRUD (Create, Read, Update and Delete) capabilities. It was also to be a solo project which meant that I could theme the project around something that I’m really passionate about… board games.

## Deployment link
The site can be found here: 
https://board-games-library-babd93547dd0.herokuapp.com/ 

In order to experience the full site it is recommended that you navigate to the register page and make an account. (As this site was created for educational purposes the email address isn’t verified and therefore does not have to be a real email address)

## Getting Started/Code Installation
HTML, CSS and JavaScript for this project can be found here: 
https://github.com/benelliottkelly/Board_Games
Both the server side and the client side have their own packages which are included in the dependencies of the package.json for each and can be installed using ‘npm i’.
You will also need your own .env files in both the server side and client side. The server side .env requires a SECRET_KEY, DATABASE_NAME, DATABASE_USER and DATABASE_PASS on the server side (I used [neon](https://neon.tech/) to store a PostgreSQL database, which you can find Django connection details for on your dashboard when you create a DB with them). The client .env will need a VITE_UPLOAD_PRESET, VITE_UPLOAD_URL and VITE_BACKEND_SERVER client side (I linked the VITE_UPLOAD_URL to my own Cloudinary, which stores and returns URLs for any pictures users want to upload for their profile picture or board game pictures).

## Timeframe & Working Team
This project was a solo project. I had 7 working days to build it however this stretched over two weekends so there was an additional 4 days available which I took full advantage of.

## Technologies Used
### Front end:
HTML, CSS, JavaScript, SASS, Bootstrap and React.

### Back end:
Python, PostgreSQL,  Django and Node.js 

### Development tools:
GitHub, Heroku, Neon and Cloudinary

## Brief
I was given 7 days to build a full stack application which used a Python Django application programming interface (API) consumed by a separate front end built in React and had full CRUD functionality.

Technical requirements for the project were:
- Build a full-stack application by making your own backend and your own front-end.
- Use a Python Django API using Django REST Framework to serve your data from a Postgres database.
- Consume your API with a separate front-end built with React.
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
- Complex Functionality like integrating a 3rd party API or using a particularly complex React Component would mean that the CRUD and multiple relationships requirement can be relaxed, speak to your instructor if you think this could be you.
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
- Have a visually impressive design to kick your portfolio up a notch.
- Be deployed online so it's publicly accessible.

The necessary deliverables were:
- A working app hosted on the internet.
- A link to your hosted working app in the URL section of your Github repo.
- A git repository hosted on Github, with a link to your hosted project, and frequent commits dating back to the very beginning of the project.
- A readme.md file.

## Planning
My original concept for this site was to have a database of board games, which users could contribute to, where users would be able to have a list of these games that they owned and would be able to send trade requests to other users offering a game they own for a game someone else owns. However, I knew this would be very ambitious in the timeframe that we had and so I downscaled the site's scope so that users could add games to the existing library and edit or delete games that they had created. Users would also be able to select games that they own, adding a quantity and thus creating a list of games that they own. This is so that in the future I will still be able to add the trading feature to the site and so everything in the site is set up with that future project in mind.

With this concept and future plan in mind I created a wireframe and an Entity Relationship Diagram (ERD)  for the site. The site would be based on four main pages (a landing page, index page, single game page and the users profile page) which they would be able to easily navigate between. Something I knew I really wanted to implement was a function in the nav bar which changed depending whether the user was logged in or not, preferably showing their profile picture if they were logged in.

![Screenshot of the wireframe created to plan the site](https://github.com/benelliottkelly/Board_Games/assets/143013767/61f894e7-1170-4224-b82e-74b7b8ad3a1d)

![Screenshot of the ERD used to plan relationships for the database](https://github.com/benelliottkelly/Board_Games/assets/143013767/d71ac664-c551-4dd2-8012-46fa76b14bc1)

## Build/Code Process
### Day 1
The first day of the project was primarily spent planning and creating the wireframe and ERD. After being signed off to start I created the project in python and installed the Django REST framework and created the user model using Django’s AbstractUser model along with fields for an image and a bio.

### Day 2
I began day 2 by creating urls, views and serializer for registering and logging in along with adding the JWT Authentication which would act as the secure route in the back end. I then created the back end apps for board games, genres, games owned (which would serve as a through field where users could link board games to their accounts with the quantity of each game owned) and reviews. For each of these apps I added models based on my ERD, urls and serializers.

### Weekend 1
Over the first weekend I created the client side using Vite, created page components for the index page, home page, register, login and single user pages as well as ones for creating and editing single board games. Once the bare bones of these components were created I added their router paths, loaders, actions and helpers. 

### Day 3
I figured the first page to flesh out would be the register form because I wanted the site to be responsive depending on if you were logged in or not so I created the registry form and added the log in function. 
Part of the registry form that I am really happy with is the file upload field where the user can add a profile picture. I achieved this by creating an image upload component (so I could reuse it for uploading pictures of board games and making my code as DRY as possible), this component contained a conditional (ternary) operator which showed the file upload field when falsey that when a field was uploaded, changed the state of a formData hook and rendered a small picture of the uploaded file in its place. The picture also had a small ‘x’ button which would return the hook to falsey allowing the user to change their mind and upload a different picture. 
To store and retrieve pictures that users uploaded I used Cloudinary, which received any files added into the upload field and sent back a link which I stored in a hidden field within the register form to be sent to the database upon form submission. 
Obviously not all users want to upload a picture of themselves and so if they chose not to, a default  profile picture is used instead.

![Screenshot of code for the register form](https://github.com/benelliottkelly/Board_Games/assets/143013767/c52d7db4-413c-4a11-b8ae-75f548e0cfd0)

![Screenshot of the image upload field that sends the uploaded image to Cloudinary](https://github.com/benelliottkelly/Board_Games/assets/143013767/1ba2235e-4cb4-482e-9d24-3212223c4b2a)

### Day 4
Now that the login and register were functioning I set out to achieve something that though very small, I felt was a really important detail that really gives the user a feeling of interactivity and connection with the site. This was a dynamic nav bar that updated with your profile picture and a logout button once you had logged in to your specific profile. Below is what the nav bar looks like before you log in and after you log in (with the default photo that is used when you don’t add your own profile picture).

![Screenshot of the nav bar before user is logged in](https://github.com/benelliottkelly/Board_Games/assets/143013767/0d53ac6d-e822-414b-aaf3-b7453b8fc90c)

![Screenshot of the nav bar once user is logged in, showing the default profile picture](https://github.com/benelliottkelly/Board_Games/assets/143013767/a8ee1774-eec8-4e97-94ef-47e4c546099c)

To make this work across the entire site I used the built-in React API, ‘createContext’ to make a site-wide state for loggedIn. I wrapped this context around all of my components within the App.jsx and for every action which would change if a user was logged in or not, I also changed the loggedIn context to reflect that change. Within the login context app I also added a useState function which would check to see if the user’s local storage still had the access token for the site and therefore still display the correct logged in state on refresh or reopening of the site.

![Screenshot showing the login context and the function that determins if the user is logged in or not](https://github.com/benelliottkelly/Board_Games/assets/143013767/fcd0da39-ef28-48ff-be04-26211415f795)

### Day 5
Next I added the ability for a logged in user to create, edit and delete board games. All of these functions used a similar conditional operator which required the user to be logged in to add a game and the user to be the games creator to edit or delete a game. The options for each of these would not be visible to the user unless the conditions were met. This utilised a very simple function that matched the current user id with the board games creator id, if they didn’t match then the edit and delete options were hidden.

![Screenshot showing the edit and delete buttons available for users who created that specific board game](https://github.com/benelliottkelly/Board_Games/assets/143013767/fc2be891-1732-404e-8969-a41e28ecdc70)

### Day 6
With all of the CRUD capabilities now in place I turned my attention to styling the site. As this was a site about board games I wanted it to be fun and exciting, so I took this opportunity to learn some more about css animations. My home page title I took heavy inspiration from an animation I found on CodePen by [Álvaro](https://codepen.io/alvarotrigo/pen/xxLvyOG). 
One problem that I had to solve here was that my title had white space in it which because I was mapping through each letter and space as an array wasn’t rendering in the final title. I first tried just setting each single letter element in the title to a certain width, but letters are not naturally the exact same width so while this gave me the spaces between words that I needed, it made the actual text look really weird. I figured my way around this by using the CSS min-width property, which meant that the white-spaces all had some width so creating gaps between the words, but wider letters weren’t getting squashed into a smaller space. It was a very simple solution but it gave me a really nice “eureka!” moment when I worked it out.  

![Gif showing the home screen title animations](https://github.com/benelliottkelly/Board_Games/assets/143013767/7ff08be3-0b4f-4ba3-87c4-e0e87f3f57f1)

Another priority aspect of this project for me was to have a responsive design for many different screen types as 51% of European internet users access it through their phones1. As such I made use of media queries throughout the styling of the entire site so that it looks good on any screen size, including adding a large logo picture into some of the form screens so there isn’t too much dead space at large screen sizes.

![Gif showing the screen being made smaller demonstrating the responsive design](https://github.com/benelliottkelly/Board_Games/assets/143013767/9c03ded6-fcf4-4edd-b98f-4e00b6eb5b99)

### Day 7
As I was feeling good about where my site was in terms of completion at this point I added a little extra functionality so that users could add board games to their own collection which would then display on their own profile page. This would also add a list of users who owned each game, to the individual games details page, which sets the site up for me adding the trading functionality later.
With this done I spent the rest of the day styling the board games index page. From the start I had wanted this page to look like a bookshelf which would dynamically get bigger and display the board games as more games were added to the database.

![Gif showing a demonstration of the index page filtering board games](https://github.com/benelliottkelly/Board_Games/assets/143013767/cd9506ec-082d-45bf-890e-97106e2d339b)

### Weekend 2
Over the final weekend before presenting my site I tweaked the styling and added some small quality of life functions such as the filter to the board game index page and a scroll up function that brings you to the top of the page when you load a new page. 
Unfortunately I used generic populated serializers when each HTML request was made, which meant that the API response times could be really slow. To improve user experience I added a cute little loading screen in while the user waited. The loader I added was a small gif of penguins playing a game, but this wasn’t obvious enough to me that it was a loader so I also added in an h2 element with the word “Loading” along with 3 dots which I used css animations to give a pleasing movement.

 ![Gif showing the loading screen](https://github.com/benelliottkelly/Board_Games/assets/143013767/ecc3f947-9ddf-47f0-b709-9433a67f2b74)

![Screenshot showing the code for the loading screen](https://github.com/benelliottkelly/Board_Games/assets/143013767/bb00274f-2a71-4a3b-88ce-01dbb8b4c138)

Probably the biggest improvement I made to really get my site ready for presentation was adding a slideshow to the home screen which initially loads a gif of going through a library and then when the API response is received has pictures of board games scrolling over the top of a board game store.
To achieve this effect I used a React slider component and changed the background image (which is what showed the board game) down to 75%, centred with no-repeat. Each of these images are also linked so you can click the game and go straight to the that games details page. I think that this final touch was what really made my home page pop and hopefully draws the users into a fun exciting site.

![Gif showing the landing page](https://github.com/benelliottkelly/Board_Games/assets/143013767/53815379-9b36-4f75-8b4d-e28eac760265)

## Challenges
My biggest challenge for this project was the timeframe. There was so much that I wanted to cram in but that was unfortunately not possible. For every page component I created I really had to keep myself focused on the essentials that I needed to add in and not go down rabbit holes of cool but non-essential functionality.

## Wins
My key win was making a really dynamic site, both in terms of the responsive design that looks great on a multitude of screen sizes and with the ways the site changes when you are logged in. Specifically for me having the nav bar displaying your profile picture once you’ve logged in is probably my favourite part as I feel it really puts the user in the site.

## Key Learnings/Takeaways
I learnt so much from this project, the key takeaways for me were:
- Looking back over the duration of this project I really solidified how models and serializers work in the Django REST framework.
- I also learnt some new skills in CSS/Sass, specifically around animations.
- React’s createContext was a huge learning point for me. Being able to access state across multiple components has so many potential uses and I’m very excited to explore it more.

## Bugs
There are not currently any bugs that I am aware of.

## Future Improvements
Insert your Future Improvements here:
Key future improvements include:
- Adding the ability to offer, view and accept board game trades with other users, which would really boost interactivity with the site.
- Adding the ability to review board games. This is already set up and ready to go, it just needs a component added in the front end.
- Adding better error messages for incorrect/invalid inputs into forms/logins
- Currently users can only add a quantity of games owned but cannot delete or edit it, this will be an essential improvement for the future.
