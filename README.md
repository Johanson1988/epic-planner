PROJECT 2

# EPIC PLANNER

### Description

**Main elements**

Epic planner is a urban micro-planner that allows you to create a legendary route in Barcelona on a specific day and area.  Its features include an array of leisure options located in the desired area: concerts, cultural events, cafes and bars.  

----

*EPIC Planner generates a map with all the stops including starting times, duration and time needed to get to each place.* 



## User Stories

- **ERROR PAGES**
  - **404** - page doesn’t exist 
  - **500** - programming error
- **home page - no cookie**
  - log in
  - sign up
  - log out redirects here.
- **home page - with cookie**
  - main user page with saved day plan(s)
  - edit plan options (edit name field, delete event, add event button, create new plan button)
  - profile edit button
- **edit user profile** change: avatar, location, interest keywords.
- **search page**
  - FIELDS:
    - day name
    - date 
    - location
    - leisure filter options: bar, concert, culture, cafe, club
    - results display
  - MORE INFO button (in results list)
- **event / place card**  displays details of event / place ( name, location, description, times, duration, fee)
- **Map page**  displays route of events and timings. 

## 

## API Routes (Back-end):

| **Method** | **Route**               | **Description**                                              | Request  - Body                                              |
| ---------- | ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `GET`      | `/`                     | Main page route.  Renders home `index` view                  |                                                              |
| `GET`      | `/login`                | Renders `login` form view.                                   |                                                              |
| `POST`     | `/login`                | Sends Login form data to the server.                         | { email, password }                                          |
| `GET`      | `/signup`               | Renders `signup` form view.                                  |                                                              |
| `POST`     | `/signup`               | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                        |
| `GET`      | `/private/main`         | *Private route*. Render the `day-plan` view.                 |                                                              |
|            |                         |                                                              |                                                              |
| `GET`      | `/private/edit-profile` | *Private route*. Renders `edit-profile` form view.           |                                                              |
| `PUT`      | `/private/edit-profile` | *Private route*. Sends edit-profile info to server and updates user in DB. | { email, password, userName], location, avatarUrl, [keyWords] } |
| `POST`     | `/private/search/`      | *Private route*. Renders `event-list`.                       | { date, location, activity type }                            |
| `GET`      | `/:eventid`             | *Private route*. Render `event-details` view for the particular event/place. |                                                              |
| `DELETE`   | `/private/:eventId`     | *Private route*. Deletes `event` from `day-plan`.            |                                                              |

## 

## Models

**User** model

```js
{
  name: String,
  email: String,
  password: String,
  keywords: [Strings],
}
```

**Event** model

```js
{
  eventId: String,
  location: String,
  date: date,
  duration: String,
  price: String
  type: String
  
}
```

**Place** model

```js
{
  placeId: String,
  location: String,
  type: String,
  Opening schedule: [String]
}
```



## Backlog

[See the Trello board.](https://trello.com/b/pawm0XYn)



## Links

### Git

[Repository Link]()

[Deploy Link]()



### Slides

[Slides Link]()