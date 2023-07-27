# Project Notes

## auth0 Set-up

auth0 quickstart docs: https://auth0.com/docs/quickstart/spa/react/interactive
auth0 - Deepdive (for later use with Browser Router?): 

  https://developer.auth0.com/resources/guides/spa/react/basic-authentication?_gl=1*4tpnkw*_gcl_aw*R0NMLjE2OTAzMzE1MTguQ2owS0NRanc1ZjJsQmhDa0FSSXNBSGVUdmxpUHFPbHU1eUlVWjBVaGl2Z2dNcUY3cDlaS3JjNVZXN2txZ3BIZFNWYThQS1MwTTJSejlMWWFBcmowRUFMd193Y0I.*_gcl_au*MTI0NzkwNDI5OC4xNjkwMzMxNTE4*rollup_ga*MTI4OTM2MzcxMi4xNjkwMzMxNTE4*rollup_ga_F1G3E656YZ*MTY5MDQxODA5My41LjEuMTY5MDQxODEyMy4zMC4wLjA.*_ga*MTI4OTM2MzcxMi4xNjkwMzMxNTE4*_ga_QKMSDV5369*MTY5MDQxODA5My41LjEuMTY5MDQxODEyMy4zMC4wLjA.&_ga=2.218315609.1913116850.1690331518-1289363712.1690331518&_gac=1.258341240.1690331518.Cj0KCQjw5f2lBhCkARIsAHeTvliPqOlu5yIUZ0UhivggMqF7p9ZKrc5VW7kqgpHdSVa8PKS0M2Rz9LYaArj0EALw_wcB

## API Routes Planning

**Login/Registration**

- **POST /api/register**: Create a new user (register).
- **POST /api/login**: Authenticate an existing user (login).

**Homepage (Profile)**

- **POST /api/profile**: Create a new profile for the logged-in user.
- **GET /api/profile/:userId**: Get a user's profile for viewing or editing
- **PUT /api/profile/:userId**: Update a user's profile. Save Edit

**Connect Page**

- **GET /api/profiles/industry/:industryId**: Get a list of users in a selected industry.
    - users points will determine the order of the carousel
- **POST /api/connect**: Record a "connect". Match if two connects exist
    - Logic happens here - if user you are recording a connect for also has connect for your user id, a match is made
- **POST /api/pass**: Record a "pass".
- **GET /api/matches/:userId**: Retrieve a list of matches for a user.

**Chat Page**

- **GET /api/chats/:userId**: Retrieve a list of chats for a user.
- **POST /api/chats**: Start a new chat. The request body would contain the IDs of the two users who are matched.
- **POST /api/messages**: Send a message. The request body would contain the chat ID, the sender ID, and the message text.
- **GET /api/messages/:chatId**: Retrieve the messages for a specific chat.