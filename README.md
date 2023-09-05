# Airbnb clone with React
This project consists of basic features of well-known Airbnb website including but not limited to:
- Creating and listing houses
- Listing houses acc. to the category type
- Creating and listing reservations
- Favouriting houses
  
![desktop-main-image](/screenshots/desktop-main.png)

## Tech stack
- `React:` A JavaScript library for building user interfaces.
- `Next.js 13 (w/ app router):` A javascript framework works top on the React and uses all the benefits of React. It helps for SSG, SSR and routing.
- `Tailwind.css:` A utility-first CSS framework that enables rapid UI development with pre-defined styles and components. Flexbox and Grid structure has been used for creating the layout.
- `Typescript:` Type safe version of Javascript.
- `Prisma:` An ORM toolkit for database processings.
- `Mongo.db`

## Live Site
Check out the [live site](https://airbnb-clone-mehmetakifakkus.vercel.app/).

## Folder Structure
- `app`: Contains the source code of the Nextjs application. It uses Nextjs app router.
  - `page.tsx`: Entry point of the application that runs when routing is `/`.
  - `components`: Contains reusable React components used throughout the application.
  - `context`: It contains context used in the application. There are two context: 1) User context: stores main user that interacts with the comments section 2) Comments context which makes comments and their replies available throughout the application
- `globals.css`: Contains Tailwind directives and custom styles for the application.
- `screenshots`: Includes screenshots of the application.
- 
## Deployment
To deploy the application to production, run `npm run build`. This will create an optimized build in the dist folder, which can be deployed to a web server or hosting service of your choice.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions to the project are welcome! Feel free to open issues and pull requests for bug fixes, improvements, or new features.

## Author
- Website - [mehmetakifakkus](https://mehmetakifakkus.github.io)
- Frontend Mentor - [@mehmetakifakkus](https://www.frontendmentor.io/profile/mehmetakifakkus)
- 
## License
This project is licensed under the [MIT License](LICENSE).


## Screenshots
![desktop-main-image](/screenshots/desktop-main.png)

## What npm package to install for this project?

For State Management:
- Zustand from [this link](https://github.com/pmndrs/zustand)

For DB: 
- prisma from [this link](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres)
- prisma-client from [this link](https://www.prisma.io/docs/concepts/components/prisma-client)
- @prisma/client @auth/prisma-adapter from [this link](https://authjs.dev/reference/adapter/prisma)
  
For form creating and field  validation:
- react-hook-form
- react-select

For creating map:
- leaflet (npm i leaflet, npm i -D @types/leaflet, npm i react-leaflet)
  
For authorization (with credentials and well-know 3rd parties such as Google and Facebook)
- next-auth 

General encription for storing and comparing passwords:  
- bcrypt from [this link](https://www.npmjs.com/package/bcrypt)

Rest api for country information (inc. region, capital, location w/ lang. and lat.)
- world-countries

For storing and manipulating image in a CDN
- next-cloudinary (https://next.cloudinary.dev/installation)

For date manipulation and creating date picker
- date-fns
- moment
- react-date-range (npm i -D @types/react-date-range)

Others:
- query-string (creating query string from an object)
- react-hot-toast (for user feedback in animation)
