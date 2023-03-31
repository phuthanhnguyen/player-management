# Player Management

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#what-to-do-for-a-safe-production-deployment">What to do for a safe production deployment?</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a NodeJS in Typescript back-end project.
This project aims to manage rank of players in a competition.
This back-end API can do:
* add a new player with usename
* update score of a player
* get informations about a player (username, score and rank in the competition)
* get the list of players ordered by score in descending order
* delete all players at the end of the competition



### Built With

This project is built with:
* <b>NodeJS</b>
* <b>ExpressJS</b>/Typescript
* <b>MongoDB</b> with ORM library <b>mongoose</b>/Typescript
* <b>Jest</b> for the unit tests 
* <b>Eslint</b> and <b>Prettier</b> for the code formatting



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You need to install Node on your PC.

### Installation

You can install this project on your localhost by following these steps:

1. Clone the repo
    ```
    git clone https://github.com/phuthanhnguyen/player-management.git
    ```
2. Install NPM packages
    ```
    npm install
    ```
3. Build poroject
    ```
    npm run build
    ```
4. Start server
    ```
    npm run start
    ```

## Usage

You can test this project by 2 methods:
* With Postman<br />
    You can use the export file from postman at './player-management-api.postman_collection.json' of this repository to save your time.<br />
    As this back-end was deployed on a free remote server of <b>render.com</b>, you can also try this back-end server by sending request to this URL:
    ```
    https://player-manangement.onrender.com/players/
    ```
* With front-end project built with Angular15
    ```
    https://github.com/phuthanhnguyen/player-management-cs
    ```
  Try front-end project in live at 
    ```
    https://player-management-cs.web.app
    ```
<br>

## What to do for a safe production deployment?

Pre-deployment:
- code review
- write and run unit test (already done)
- run integration tests of all features on develop environnement (already done)
- make release branch from develop branch
- merge release to master
- create automated deployment pipeline for the project (with Jenkins for example), link pipeline to master branch of the git repository

In this CI/CD pipeline, we have these stages to do:
- checkout branch from git
- check code format(Example: ESLint for typescript or sonnarqube for java)
- compile code with all dependencies
- run all unit tests
- run all automated integration tests
- package code
- deploy the package to prod environnment
- set version live

Post-deployment:
- Verify prod is still up after the deployment.
- Run integration tests on prod to make sure everything works fine.

Rollback plan:
- If something goes wrong within or after the deployement, redeploy the latest version that works for sure.

Sometime we can do hotfix on prod if the bug can be fixed quickly:
- Do a hotfix to fix the bug and merge it to release branch and develop branch
- Merge release branch to master
- Redeploy the code with the hotfix to prod.





