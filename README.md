![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# To do List

## Description

_Duration: 2 day Sprint_

The goal of this project is to provide a small but useful tool for storing daily tasks. Using the application is very simple and only takes a few steps. You can add tasks to a list bellow, toggle their status for completion of task, remove tasks off the list, and edit the existing tasks.

## Screen Shots

![list_01](todo-list-01.png)
![list_02](todo-list-02.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Express.js]
- [Postgres]

## Installation

1. Create a database named `weekend-to-do-app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm start` in your terminal
5. Open your browser and go to `localhost:5000`

## Usage

1. Enter in the name of your task and optionaly a description, in the top 2 inputs named "Title" and "Description".
2. Click the "Add Task" button.
3. The data you entered is now on your task list, click on the "To do list" element at the bottom of the screen to reveal the table.
4. If you need to, you are now able to click on any title or description to edit them. You can also press the remove button to remove a specific task.
5. When you're done with a task, click the button under the "Status" column, this will change the text to completed. If you want to change it back to incomplete, then just click the button again.

## Built With

- Javascript
- Node.js
- Express.js
- Postgresql
- JQuery
- Bootstrap v5

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [smrdelb@gmail.com].