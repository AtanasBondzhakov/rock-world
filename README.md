# Rock World
### A React-based application that allows users to explore various rock albums. Users can register, log in, browse featured content, create, add comments and more.
#### Recommended resolution: 1920x1080
#### This project uses the SoftUni Practice Server to handle backend operations and data management.

## You can access deployed app at [Rock-World](https://rock-world-32534.firebaseapp.com/) or follow the instructions to run it locally

## Getting Started

1. Clone the repository:

    ```sh
    git clone https://github.com/AtanasBondzhakov/rock-world.git
    ```

2. Navigate to `client` folder, install dependencies and run the app:
   ```sh
   cd client
   npm install
   npm run dev
   ```

3. Open a new terminal window and navigate to `server` folder **WITHOUT** shutting down the terminal where the app (the client) is running:
   ```sh
   cd server
   node server.js
   ```  

4. Set up environment variables:

    Obtain your IDs after after registering at https://www.emailjs.com/

    Create a `.env.development` file in the root of your project and add your credentials (replace the placeholders with the actual values):

    VITE_API_URL=http://localhost:3030

    VITE_SERVICE_ID=Your Service ID 
    - You can access it on Email Service tab after add new service

    VITE_TEMPLATE_ID=Your Template ID 
    - You can access it on Email Templates tab after create new template

    VITE_USER_ID=Your Public Key
    - You can access it on Account tab

5. Open the app:

    Go to http://localhost:5173 (or the displayed port) in your browser.

## Features
### Authentication

- **Register**: Users can register, providing Username Email, Password and Confirm Password - an error message is shown when the requirements are not met.
- **Login**: Users can log in to their account after it has been created.
- **Logout**: Users can log out of their accounts after they have been logged in.

**Register**
![Image](https://github.com/user-attachments/assets/1b1808b2-daa9-4dcb-8a24-bf8540d0e7a9)

**Login**
![Image](https://github.com/user-attachments/assets/2c9b3c7e-c605-49a5-9cc9-dd12883c0d3a)

### Header
- **Navigation Links**:
  - **Home**: Redirects to the `Home` page.
  - **Albums**: Redirects to the `Albums` page.
  - **About**: Redirects to the `About` page.
  - **Search Bar**: Allows users to `Search` for albums.
  - **Contacts**: Redirects to the `Contacts` page.
  - **User Authentication Links**
    - **Guest**:
        - **Log In**: Redirects to the `Login` page.
        - **Register**: Redirects to the `Register`.
    - **User**:
        - **Create**: Redirects to `Create` page.
        - **Profile**: Redirects to `Profile` page.
        - **Logout**: Allows users to log out.

**Header for users**
![Image](https://github.com/user-attachments/assets/b37f2a17-54f0-48c5-92d0-0e17a322cdce)

**Header for guests**
![Image](https://github.com/user-attachments/assets/a461c048-1d72-4ee6-82b9-dcc6afb8c6dc)

### Home Page
- **Hero**: Users greeting.
- **Latest Albums**: See the latest added albums.
- **Choose Us**: Clean inviting layout with essential information.

![Image](https://github.com/user-attachments/assets/be95804e-6b1f-4750-8571-bb8b7fde600c)
![Image](https://github.com/user-attachments/assets/31559c21-4a78-4d96-af85-5fc49a33be52)

### Albums Page
- The Albums page displays all the albums in a paginated format, showing 10 albums per page. Users can easily navigate through the collection by using pagination controls to move between pages and view more albums. 

![Image](https://github.com/user-attachments/assets/548dc7a9-956f-478a-bb23-519abbca9c51)

### Create Page
- The Create page allows users to add new albums to the collection. It features a form where users can input album details such as the album title, band name, genre, album cover image... Once all required fields are filled, users can submit the form to create a new album. An error message is shown when the requirements are not met.

![Image](https://github.com/user-attachments/assets/a45618f7-b4d3-4580-be8f-58778f70d83f)

### Album Details Page
- The Details Page provides users with comprehensive information about a specific album. Below the album information users can view and leave comments about the album. Additionally users have the option to add the album to their favorites. If the user is the owner of the album they have the ability to edit or delete the album.

**Details Album**
![Image](https://github.com/user-attachments/assets/475b2963-ba66-493c-aa0c-caeb4739c715)

**Details Album as owner**
![Image](https://github.com/user-attachments/assets/cf30d05d-cc04-4cc3-af65-17281af6993f)

**Details Album as guest**
![Image](https://github.com/user-attachments/assets/95b5c6ed-4fc3-4122-9e71-1d71c66dfa13)

### Album Edit Page
- The Edit Page allows the owner of an album to modify its details. On this page, users can update any information about the album. An error message is shown when the requirements are not met.

![Image](https://github.com/user-attachments/assets/2eecb973-4d5f-43ce-b978-7fd1c2e9fefe)

### Profile Page
- The Profile Page allows users to view and manage their personal information. Additionally users can view their favorite albums and access or remove them. The page may also offer options to update the profile information.

**Initial Profile Page**
![Image](https://github.com/user-attachments/assets/0a854b87-7ee6-4984-83f3-24ffb1e3b545)

**Updated Profile Page**
![Image](https://github.com/user-attachments/assets/7ef34280-95ec-4d19-b9e2-1179b1710969)

### Profile Page Update
- The Profile Page Update allows users to manage and update their personal information. If the user has already provided their details, the update page will be pre-populated with their existing information, making it easy to edit and save changes. 

![Image](https://github.com/user-attachments/assets/83b75432-d203-4cb4-8737-765504f0262b)

### About Page
- The About Page provides users with simple information about the website and its purpose.

![Image](https://github.com/user-attachments/assets/8a892f6b-8048-4712-bca2-b68863e4d8a9)

### Contacts Page
- The Contacts Page provides users with the ability to send email to us. Additionally, the page displays the location, offering users a physical address or a map for reference. This page serves as a convenient point of contact for users who wish to connect with us or get more information about the project.

![Image](https://github.com/user-attachments/assets/7a7c1012-ef34-4dbc-9221-b7a041f5c5c5)

### Footer
- The Footer provides contacts information, quick links and social media links

![Image](https://github.com/user-attachments/assets/0ee4513e-4a1c-4657-b8b4-0b176fbc0986)

### Search
- The Search Bar allows users to search for specific albums by title or band name. It supports partial symbol searches enabling users to find albums even with incomplete terms. 

![Image](https://github.com/user-attachments/assets/f23324ab-53a9-47d5-9b57-fb58328adeb5)

### Not Found Page

- The Not Found Page is displayed when the user tries to access a route that doesn't exist

![Image](https://github.com/user-attachments/assets/fecd8b4c-b41c-4eaf-9808-3665bb671811)

## Used Technologies
- **JavaScript**: Core language for functionality.
- **React**: Front-end framework for building the user interface and functionality.
- **CSS**: Styling the application.
- **Firebase** Deployment platform.
- **Yup**: Form validation.
- **Ant Design**: Using modal and spinner.
- **react-spring**: Home page animation.
- **emailjs-com**: Sending and receiving emails.
- **react-leaflet**: Integrating map.
- **react-slick**: Using carousel.
- **react-toastify**: Using toaster messages.
- **Vitest: Unit testing.**

##  User for testing
- **Users**:
  - **Email:** admin@abv.bg; **password:** admin
  - **Email:** peter@abv.bg; **password:** 123456
  - **Email:** george@abv.bg; **password:** 123456
