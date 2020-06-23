# Knotted

I have tried many habit tracking applications over the years, and none of them allow logged habits to count towards multiple goals.

For example, if you have two goals -- having a morning routine and getting in shape. Which one should "eat a healthy breakfast" count towards? Clearly not just one of them; our lives are a bit more entangled than that.

Knotted is a web application that solves this problem by supporting many-to-many relationships between goals and habits. 

Visit https://knotted.app to sign up.

## Examples

<p align="center">
<img src="https://via.placeholder.com/414x736">
</p>

## API

### Auth
```
POST /api/auth/register

  Description: Register user
  Access: Public
  Body Parameters:
    email: The email address of the user
      type: String
    password: The password of the user
      type: String
      requirement: 6+ characters
```

```
POST /api/auth/login

  Description: Login user
  Access: Public
  Body Parameters:
    email: The email address of the user
      type: String
    password: The password of the user
      type: String
      requirement: 6+ characters
```

```
DELETE /api/auth

  Description: Delete user
  Access: Private
```


### Habits
```
GET /api/habits
  Description: Get all habits
  Access: Private
```

```
GET /api/habits/:id
  Description: Get specific habit
  Access: Private
```

```
POST /api/habits
  Description: Create habit
  Access: Private
  Body Parameters:
    name: The name of the habit to create
      type: String
```

```
DELETE /api/habits/:id
  Description: Delete habit
  Access: Private
```


```
POST api/habits/:id/dates
  Description: Log habit for a specific date
  Access: Private
  Body Parameters:
  date: The date to log
    type: Date
```

```
POST api/habits/:id/goals
  Description: Link a goal to a habit
  Access: Private
  Body Parameters:
  goal_id: The ID for the goal to link
    type: String
```

### Goals
```
GET /api/goals
  Description: Get all goals
  Access: Private
```

```
GET /api/goals/:id
  Description: Get specific goal
  Access: Private
```

```
POST /api/goals
  Description: Create goal
  Access: Private
  Body Parameters:
    name: The name of the goal to create
      type: String
```

```
DELETE /api/goals/:id
  Description: Delete goal
  Access: Private
```

```
POST api/goals/:id/habits
  Description: Link a habit to a goal
  Access: Private
  Body Parameters:
  habit_id: The ID for the habit to link
    type: String
```
## Licence
GPL2
