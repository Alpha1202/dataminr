
DATAMINR CODING TEST.
=======


## Getting Started
Clone the Repo.
-------------
`git clone https://github.com/Alpha1202/dataminr`

## Prerequisites
The following tools will be needed to run this application successfully:
* Node v16.13.1 or above
* npm v6.4 or above or yarn v1.222.10 or above
* Postgres 9.6.14 or above

## Installation
**On your Local Machine**
- Pull the [develop](https://github.com/Alpha1202/dataminr) branch off this repository
- Run `yarn` to install all dependencies
- Run `yarn run dev` to start the local/development server of the app
- Access endpoints on **localhost:5060** or you can change this in the .env file
## Running the database migrations
Run `yarn run undo:migrate` in the terminal for the cloned folder to undo existing migrations.

Run `yarn run migrate` in the terminal for the cloned folder to do migrations.

Run `yarn run seed` in the terminal for the cloned folder to add seeds to the database.

---

## API Spec
The preferred JSON object to be returned by the API should be structured as follows:

### Tasks

```source-json
{
    "status": "success",
    "data": {
        "task_id": "7f8bb3d9-0173-46e3-aa85-0cf0aa4601b2",
        "title": "new title",
        "updatedAt": "2022-02-11T16:04:12.117Z",
        "createdAt": "2022-02-11T16:04:12.117Z"
    }
}
```
### Task list
```source-json
{
    "status": "success",
    "data": {
        "taskList_id": "8829edc1-3d13-4056-a780-298ac551ca4d",
        "title": "Add task",
        "updatedAt": "2022-02-11T16:06:31.792Z",
        "createdAt": "2022-02-11T16:06:31.792Z"
    }
}
```

### Errors and Status Codes
If a request fails any validations, expect errors in the following format:

```source-json
{
    "status": "Request Failed",
    "error": "Task title is required"
}
```
### Other status codes:

404 for Not found requests, when a resource can't be found to fulfill the request


Endpoints:
----------

### Create New Task:

`POST /api/v1/tasks/create`

Example request body:

```source-json
{
    "title": "new title"
}
```

returns a task

Required fields: `title`,

### Fetch a single task:

`GET /api/v1/tasks/task/${task_id}`

Example request params:

```source-json
{
 task_id
}
```

returns a task

Required req.param fields: `task_id`


### Edit task

`PUT /api/v1/tasks/task`

Example request body:

```source-json
{
    "title": "todo",
    "task_id": "7f8bb3d9-0173-46e3-aa85-0cf0aa4601b2"
}
```

returns the edited task

### Get all tasks

`GET /api/v1/tasks/all`


returns all tasks records with  pagination

### Delete a single task:

`DELETE /api/v1/tasks/task/${task_id}`

Example request params:

```source-json
{
 task_id
}
```

returns an empty array with 204 status code 

Required req.param fields: `task_id`

### Create New Task List:

`POST /api/v1/tasks/create`

Example request body:

```source-json
{
    "title": "new tasklist"
}
```

returns a tasklist

Required fields: `title`,

### Fetch a single task list:

`GET /api/v1/taskLists/taskList/${task_id}`

Example request params:

```source-json
{
 taskList_id
}
```

returns a task list

Required req.param fields: `taskList_id`


### Edit tasklist

`PUT /api/v1/taskLists/taskList`

Example request body:

```source-json
{
    "title": "updated task list title",
    "taskList_id": "457d584e-7de0-40b4-8d67-609a29359bba"
}
```

returns the edited task list

### Get all tasksllist

`GET /api/v1/taskLists/all`


returns all tasklist records with  pagination

### Delete a single task:

`DELETE /api/v1/taskLists/taskList/${task_id}`

Example request params:

```source-json
{
 taskList_id
}
```

returns an empty array with 204 status code 

Required req.param fields: `taskList_id`

### Add a task to Task List:

`POST /api/v1/taskLists/taskList/add/task`

Example request body:

```source-json
{
   "task_id": "30e2a2c8-27bc-4817-a1b8-638c4c7e0778",
   "taskList_id": "8829edc1-3d13-4056-a780-298ac551ca4d"
}
```
returns the tasklist

### Removes a task to Task List:

`POST /api/v1/taskLists/taskList/remove/task`

Example request body:

```source-json
{
   "task_id": "30e2a2c8-27bc-4817-a1b8-638c4c7e0778",
   "taskList_id": "8829edc1-3d13-4056-a780-298ac551ca4d"
}
```
returns the tasklist