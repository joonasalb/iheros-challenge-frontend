### !Heros Challenge Frontend

## Run the application

In the project directory, you can run:

# First install the dependencies
### `yarn install`

# Runnning application
### `yarn start`

# Run on Docker

```bash
docker build -t iheros-frontend . 
docker run -p 3000:3000 -d iheros-frontend
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

# Run tests
### `yarn test`

# Run build the application
### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
