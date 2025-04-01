# Rock World
### A React-based application that allows users to explore various rock albums. Users can register, log in, browse featured content, create, add comments and more.
### Recommended resolution: 1920x1080

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
- This page displays all the albums in a paginated format, showing 10 albums per page. Users can easily navigate through the collection by using pagination controls to move between pages and view more albums. 

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