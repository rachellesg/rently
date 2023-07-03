# RENTLY Front End Task

This is my submission for the Rently Front End Task. The task is to implement an inventory list for apartments.

## Requirements

- There will be an apartment list
- Each apartment has one inventory list
- Users can create or update list
- They will select an item from the dropdown list and add quantities
- User can add a maximum of 20 items
- User can preview the list without editing
- User can then approve and the list will be saved

## Technologies Used

- Nuxt.js
- Tailwind CSS
- DaisyUI

## Installation and Usage

To run the login component in a local development environment, follow these steps:

- Clone the repository: git clone <repository-url>
- Navigate to the project directory: cd rently
- Install the dependencies: npm install
- Start the development server: npm run dev
- Open a web browser and navigate to http://localhost:3000 to view the login component.

---

## Thought Process

1. Familiarizing with Nuxt.js and DaisyUI: As it was my first time working with Nuxt3, I spent some time reading through their documentation to understand it's features, concepts and how to set up the project.

2. Setting up the project: I created my project and configured the necessary dependencies, including Tailwind & DaisyUI for styling. I structured the application into different pages and components based on the desired functionality.

3. Implementing Apartment List:

## Limitations and Workarounds

1. Deployment: When attempting to deploy the website on Vercel, encountered an issue where Vercel was unable to host SSR (Server-Side Rendered) websites.
   Resolution: Switched to another hosting platform.

2. Issues with Netlify deployment: While deploying on Netlify, faced multiple issues during the deployment process. Additional steps were taken to troubleshoot and resolve the deployment issues on Netlify. It was here I realized I was not using Composition API and I had to refactor my code for deployment.
