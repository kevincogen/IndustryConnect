# Industry Connect: Networking App

Welcome to Industry Connect! We've brought together the simplicity of a matching carousel app, infused with the professional networking might of platforms like LinkedIn, all while giving users the power of advanced AI tools for an unrivaled CV building experience.

## Introduction

**Industry Connect's Mission**: 

> Our goal was to infuse the simple appeal of a carousel-based matching app with the robust networking capabilities akin to LinkedIn. To further enhance user experience, we've integrated cutting-edge AI tools that assist in crafting an outstanding CV.

**Visit our live website**: [Industry Connect](https://industryconnect-react.onrender.com/)

[![Demo Video](https://i.imgur.com/3rleU54.png)](https://www.youtube.com/watch?v=Y8Ega9iLNks)
**Click the image above to play the video!** If it doesn't work, [click here](https://www.youtube.com/watch?v=Y8Ega9iLNks).


## Tech Stack
* **Backend**: PostgreSQL, Express.js, Node.js
* **Frontend**: React, Material UI with custom CSS
* **Deployment**: Render

## Features

### Login and Authorization
* **Auth0 API**: Enables user authentication. 
* **Sign Up**: Users can utilize their Gmail accounts for a seamless sign-up process.
* **Active Users Redirection**: Existing users will be swiftly redirected to our connection portal, kickstarting their networking journey.

### Connect Page
* **Top Appbar**: Comprises navigational links, a uniquely designed logo, and a logout button.
* **Sidebar**: Showcases the user's profile card complete with bio and statistics.
* **Swiping Experience**: 
  * A profile carousel introduces users for potential networking.
  * Users can swipe left to skip or right to connect.
  * Alternative options for connection include `ConnectButton` and `PassButton`.
  * Continuous profile loading ensures uninterrupted networking.
* **Industry Search Bar**: Tailor your networking with industry-specific searches.
* **Connect and Pass History**: Keep track of your networking journey.

### Chat Page
* **Sidebar Match List**: See who you've connected with and jump into conversations.
* **Profile Card**: View detailed information of your networking contact.
* **Live Chatting**:
  * **WebSockets**: Enables a real-time chat experience.
  * **Chat History**: An organized view of all your past messages.
  * **Interactive Chat UI**: Send messages using a user-friendly form.
* **Rating System**: 
  * Located in the sidebar, this allows users to rate their connections.
  * Impactful as it adjusts the average rating seen on the rated user's profile.

### Profile Page
* **AI-Driven Resume Builder**:
  * Leverages OpenAI's GPT model to innovate resume creation.
  * Users provide basic details, and the AI refines the content.
* **Functional Breakdown**:
  * **Prompt Creation**: Generates a professional objective and highlights core strengths.
  * **Experience Processing**: Customizes bullet points detailing roles and achievements.

### User Registration
* A seamless process ensuring quick access to the networking platform.

## Upcoming Features (Roadmap)
* **Localisation**: Encouraging face-to-face interactions like coffee chats and workplace meetings.
* **Video Chat Integration**: To support our remote-friendly ethos, we plan on integrating video chat.
