
# Project Description

The Cross-Border Payment Platform is a blockchain-based solution developed using Hyperledger Fabric technology. It aims to address the challenges and inefficiencies associated with cross-border payments, such as high transaction costs, long settlement times, and lack of transparency. By leveraging the decentralized and immutable nature of blockchain, the platform provides a secure, efficient, and transparent mechanism for conducting cross-border transactions.

# Teams

Winston Edwards –101454440
 Xianming Luo —101396133
 Rutuja Dalvi —101423188 
Rushikesh Chavan —101423193 
Vineeth George —101460498


# Requirments

•Hyperledger Fabric
•Amazon Elastic Compute Cloud
•React•Chaincode
•RESTful APIs
•Database -MongoDB

# Reasons

The reason results in the rise of usage of cross border payment is as below1.
1.Manufacturers 
2.Cross border asset management and global investment flows
3.Increasing international trade and e-commerce in a larger scale.
4.Migrants sending money 
5.Reduced product recall.

# Currency Transaction App
This is a React application that allows users to perform currency transactions such as sending funds and currency exchange. It includes the following components:


# Transact
The Transact component serves as the main transaction screen. It displays options for sending funds, funding the balance, and currency exchange. It uses the isVisible prop to determine which component to display based on the user's selection.

To use the Transact component, include it in your application and manage the isVisible prop to control the visibility of the transaction components.


import Transact from './components/Transact';

  const [isVisible, setIsVisible] = React.useState(0);
    <!-- <div>
      <Transact isVisible={isVisible} setIsVisible={setIsVisible} />
    </div> -->

# SendTransferComponent
The SendTransferComponent allows users to send funds. It includes input fields for the recipient's address, amount, and a send button.

To use the SendTransferComponent, include it within the Transact component and handle the isVisible prop accordingly.

# FundComponent
The FundComponent enables users to fund their balance. It includes input fields for entering the value in ETH and CAD, and an exchange rate display. Users can swap the values by clicking the swap button.

To use the FundComponent, include it within the Transact component and handle the isVisible prop accordingly.

# ExchangeComponent
The ExchangeComponent allows users to perform currency exchange. It includes input fields for entering the value and selecting the currency for both USDT and CAD. Users can swap the values and currencies by clicking the swap button.

To use the ExchangeComponent, include it within the Transact component and handle the isVisible prop accordingly.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# hyperForeX
