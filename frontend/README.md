# CLIENT web blog
## Project Overview: 
Provide a brief introduction to the project, mentioning that it's a web blog client built using Vite and React. Briefly describe its purpose and key features.
## set Up : 
1. **Install Vite:**
Before setting up the Vite-React client, ensure that Vite is installed on your device. If not, you can install it globally using npm with the following command:
    `npm install -g vite` <br>

2. **Clone the repository**
3. **Install dependencies by running:**<br>
  `npm intall js-md5`<br>
  `npm install jwt-decode`<br>
4. **Start the Development Server:**
 After installing dependencies, start the development server by running vite or `npm run dev` if configured in the project's scripts.
5. **Access the Application:**
 Once the server is running, access the application in your web browser by navigating to `http://localhost:3000` (it may not be the port 3000 in your device).

## Usage: 
Explain how to use the web blog client, including any commands or scripts necessary for development and deployment.
## Folder Structure: 
Provide an overview of the project's folder structure, highlighting important directories such as src, components, and styles.
`src/`:
Contains all the logic and style of the web blog.
`assets/`
Contains local images and assets for rendering wouthout internet
`components/`
Contains logic and style for all reusable components for this project (such as buttons, inputs, etc)
`hooks/`
Contains all hooks used throughout the project
`pages/`
Contains logic and style for the pages to render

## Dependencies: 
js-md5: This library is used for generating MD5 hashes, which can be useful for various purposes such as hashing passwords or creating checksums.
jwt-decode: This library is used for decoding JSON Web Tokens (JWT) in JavaScript, allowing you to extract information from JWTs without requiring a server-side implementation.

## File Structure: 

### Api
The useApi hook is designed to facilitate data fetching and management in React applications. It provides functionality for making HTTP requests with various methods such as GET, POST, and DELETE. Additionally, it handles loading states and error handling.

- Features:
Data Management: Allows fetching and updating of data from external APIs.
Loading State: Automatically manages loading state during data fetching operations.
Error Handling: Provides error handling functionality for failed HTTP requests.
Flexible Configuration: Supports different HTTP methods and authentication requirements through configurable options.

### Pages
- **Home**
The Home component in this React application serves as the landing page where posts from an external API are displayed. It utilizes hooks for managing state, fetching data, and displaying loading indicators.

* Features:
Post Display: Renders posts fetched from an external API onto the page.
Loading Indicator: Displays a loading indicator while fetching posts.
Error Handling: Handles errors gracefully if there's an issue fetching posts from the API.
Modular Design: Utilizes modular components for posts and loading indicators.
* Implementation:
State Management: Uses useState hook to manage the state of posts fetched from the API.
Effect Hook: Utilizes useEffect hook to fetch posts from the API when the component mounts.
API Interaction: Utilizes the useApi custom hook to fetch posts asynchronously from the specified URL.
Error Handling: Displays error messages in a modal if there's an issue fetching posts from the API.
* Components Used:
Post Component: Renders individual posts with the received JSON data.
Loading Component: Displays a loading indicator while fetching posts.
* Usage:
Include the Home component in your React application to serve as the landing page.
Ensure that the required components (Post, Loading) are imported and available within your project.
Customize the API endpoint in the fetchData function call to fetch posts from your desired source.

- **Login**
The Login component is responsible for rendering a login form and handling user authentication. It utilizes various custom hooks and components to facilitate the login process.

* Features:
Form Validation: Utilizes the useForm hook with Yup schema validation to ensure that the username and password fields are filled out correctly.
API Interaction: Uses the useApi hook to interact with the backend API for user authentication.
Token Management: Manages user authentication token using the useToken hook to store the token in local storage upon successful login.
* Error Handling: 
Displays error messages for invalid username or password and handles loading states during the authentication process.
Hashing Passwords: Hashes the user's password using MD5 encryption before sending it to the backend for security purposes.
* Components and Hooks Used:
Input: Custom input component for rendering text and password input fields.
Button: Custom button component for handling form submission.
Loading: Component for displaying loading indicator while waiting for API responses.
useForm: Custom hook for managing form state and validation.
useToken: Custom hook for managing user authentication token.
useApi: Custom hook for making API requests.
useMsg: Custom hook for managing and displaying modal messages.
* Usage:
Import the Login component into your React application.
Pass a callback function (onSignal) to handle the login signal.
Use the Login component within your application to render the login form and handle user authentication.

- **Admin:**
The Admin page in this React application serves as an interface for managing posts. It interacts with a REST API to retrieve, display, update, and delete posts.
* Features:
Post Management: Displays a list of posts fetched from the API, including their IDs and titles.
CRUD Operations: Allows users to perform CRUD operations on posts (Create, Read, Update, Delete).
User Interaction: Users can edit or delete posts, triggering corresponding actions.
Error Handling: Provides error messages for failed API requests or operations.
* Components and Hooks:
Loading Component: Displays a loading indicator while fetching data from the API.
Icon Component: Renders icons for edit, delete, and add actions.
Custom Hooks: Utilizes custom hooks (useApi, useToken, useMsg, useRouter) for handling API requests, authentication tokens, messages, and routing.
* Functionality:
Fetch Posts: Retrieves posts from the API upon component mounting.
Delete Confirmation: Prompts users for confirmation before deleting a post.
Navigation: Navigates to different routes for creating or updating posts.
Error Handling: Displays error messages if there are issues with fetching or deleting posts.
* Usage:
Ensure proper setup and configuration of API endpoints.
Import and integrate the Admin component into the application routing.
Customize API URLs and functionality as per application requirements.
- **PostForm**
The PostForm component is responsible for rendering a form used to create or update posts in a web blog application. It allows users to input information such as song name, artist, album, rank, music URL, cover art URL, release date, and content. Additionally, it provides validation for required fields and handles data submission to the server.

* Features:
Form Inputs: Provides input fields for various post details including song, artist, album, rank, URLs, release date, and content.
Validation: Utilizes Yup schema validation to ensure that required fields are filled and meet specific criteria such as maximum length, URL format, and positive numbers.
Data Submission: Handles the submission of post data to the server using the useApi hook for making HTTP requests.
Error Handling: Displays error messages if there are issues during form validation or data submission.
Exit Confirmation: Prompts users with a confirmation message before exiting the form to prevent accidental data loss.
* Usage:
Import the PostForm component into your React application.
Place the PostForm component within your application where post creation or editing functionality is required.

### Navigation:
#### src/Router.jsx
This file handles the routing and rendering of different components based on the current URL. It utilizes a custom hook useRouter to manage navigation and a TokenProvider to handle authentication.

Imports: Import necessary components and hooks including useRouter and the pages to render: Login, Home, Admin, PostForm. ALso, useToken, and NavBar are used.
Routes: Define routes and corresponding components in the routes object.
Background Styling: Dynamically set the background color based on the user's authentication status.
Navigation: Handle navigation between pages based on user interactions.
Component Rendering: Render the appropriate component based on the current route.
#### src/hooks/useRouter.jsx (Hook)
This custom hook provides functionality to manage navigation within the application.

Functionality: Handles navigation and tracks the current page.
Dependencies: Relies on React hooks such as useState and useEffect.
Navigation Handling: Navigates to different pages based on user actions.
Navigation Control: Exposes functions to navigate to specific pages.

## CSS and Styling: 
The style for each component is stored next to its jsx file as to avoid extra retreival of files. As for naming conventions, every css file is named exactly as the jsx file.