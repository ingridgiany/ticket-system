# Ticket System
Ticket system created with ReactJS, JavaScript and Firebase.

## Sign in or Sign up
The system starts with a screen to log in or create an account.  

**Example:**
```


{

    "name": "Ingrid"
    "email": "example@email.com",
    "password": "****"
}


```

_The password must have at least 6 characters._  

The information will be saved in Firebase and if the new user uses the system, their ID will be linked to the ticket they opened.

## Manage my account

The system allows you to manage the registered user's profile, such as adding a photo and changing the name, with changes to the account email not being permitted.

## Register customers

The system registers the name, business identification number and address of customers and places them in the database. To later open a ticket with the registered customer.

## Open a ticket

The system allows you to create a ticket with the customer's name, the subject _(financial, support or technical visit)_, the date, the status _(open, progress or complete)_ and a note about the problem _(optional)_.

The ticket information is saved in the database, along with the ID of the user who registered it.

It is allowed to edit the ticket, change its information and status (to complete, for example). The new changes will also be edited in the Firebase.
