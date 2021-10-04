## Description

Tech Net is a social networking platform for tech enthusiasts. 
Create profiles, make an impressive portfolio and connect with other techies! 

## Tech Stack

- React
- Redux ( for state management ) 
- Node.js
- Express
- MongoDB

##  Features

- User authentication
- User profiles
- Posts, Like and Comment
- Showcase GitHub repositories in your profile

## To Try This On Your Own 
- Fork the repository.
- Clone the repository

```
git clone https://github.com/karishmashuklaa/technet.git
```
- `npm install` to install dependencies.
- `npm install` in `client` folder to install dependencies.
- `npm run dev` to run the project.

If you want to have a local db, run `docker-compose up -d`

Add a `default.json` file in /config folder with something like this:
```
{
  "mongoURI": "mongodb://localhost:27017/technet",
  "jwtSecret": "secret"
}
```

***Thanks for reading! ⭐ Dont forget to star the [Repository](https://github.com/karishmashuklaa/technet) ⭐***
