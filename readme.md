# **Inspection Application API**

### Api for the Inspection Application

#### Inspection Application [Git Hub](https://github.com/c-usher/InspFrontEnd.git)

 <br />
 <br />

# **How to use**:

- run `git clone https://github.com/c-usher/inspUserAPI.git`
- run `npm install`
- run `npm start`

 <br />
 <br />

# **Routes**

## User Routes:

#### - Starts with **`/user`**

<br />

| #   | Routes                 | Type   | Private | Description                                        |
| --- | :--------------------- | :----- | :-----: | :------------------------------------------------- |
| 1   | `/user`                | GET    |   YES   | Get user info                                      |
| 2   | `/user/create`         | POST   |   NO    | Create user                                        |
| 3   | `/user/login`          | POST   |   NO    | Verifies user authentication and returns JWT       |
| 4   | `/user/reset-password` | POST   |   NO    | Verifies email and email pin to reset the password |
| 5   | `/user/reset-password` | PATCH  |   NO    | Changes password to new password                   |
| 6   | `/user/logout`         | DELETE |   YES   | Delete user accessJWT                              |

<br/>
<br/>

## Unit Routes:

#### - Starts with **`/units`**

<br />

| #   | Routes                   | Type  | Private | Description                     |
| --- | :----------------------- | :---- | :-----: | :------------------------------ |
| 1   | `/units`                 | POST  |   YES   | Creates new unit                |
| 2   | `/units`                 | GET   |   YES   | Gets all units                  |
| 3   | `/units/unit/{id}`       | GET   |   YES   | Gets a specific unit            |
| 4   | `/units/unit/prefs/{id}` | PUT   |   YES   | Creates a new preference        |
| 5   | `/units/unit/note/{id}`  | PUT   |   YES   | Creates a new note              |
| 6   | `/unit/note-status/{id}` | PATCH |   YES   | Updates the note status to true |
| 7   | `/unit/note/{id}`        | PATCH |   YES   | Removes the done note           |

<br/>
<br/>

## Tokens API Resources

#### - Starts with **`/v1/tokens`**

<br />

| #   | Routers      | Type | Private | Description            |
| --- | ------------ | :--- | :-----: | ---------------------- |
| 1   | `/v1/tokens` | GET  |   No    | Get a fresh access JWT |

---

<br/>
<br/>

### TODO:

- Add logic for when to change the status of the note.
- Add Link to working Inspections Application.
- Add a section for technology/packages used.
