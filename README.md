# Hirexpert

Hirexpert is a powerful, modern platform designed to streamline the recruitment process. It offers comprehensive features for recruiters to efficiently manage job postings and applications, leveraging the latest technologies to ensure a smooth and effective hiring experience

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Best link](#Best-link)
- [Contributing](#contributing)




## Features
- **Job Posting Management:**: Create, update, and manage job postings with ease. Customize job descriptions, requirements, and other details to attract the best candidates

- **Application Tracking:**: Track and manage applications. View and organize  application statuses.

- **Advanced Search & Filtering**:Quickly find candidates that match specific criteria using powerful search and filtering options.

- **Analytics**: Gain insights into your recruitment efforts with detailed analytics. Track key metrics and make data-driven decisions.

- **User-Friendly Interface**: Designed with a modern, intuitive interface to make it easy for recruiters of all skill levels to navigate and use.

## Technology Stack
- **Frontend**: React, React Router, Redux
- **Backend**: Azle, ICP


## Setup Instructions

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **dfx**: You have installed the latest version of the DFINITY Canister SDK, `dfx`. You can download it from the DFINITY SDK page. [installation guide](https://demergent-labs.github.io/azle/get_started.html#installation)

 ```
  use version dfx 0.22.0
 ```
- **Node.js**: You have installed Node.js, version 18 or above.
```
 v20.12.2

```
- Azle version use 
 ```
  azle 0.24.1
 ```

 - podman verion use

 ```
  podman version 3.4.4
  
 ```
Please ensure all these prerequisites are met before proceeding with the setup of the project.
# Running the project locally

If you want to test your project locally, you can use the following commands:

Cloning repo:

```bash
git clone https://github.com/Rutarenzi/HireXpert
cd HireXpert
```


### run and deploy:

```bash

# Installing Dependencies
npm i

# Starts the replica, running in the background
dfx start --host 127.0.0.1:8000 --clean --background

# Deploys
dfx deploy
or

AZLE_AUTORELOAD=true dfx deploy
```


## Usage 

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.
` http://{canisterId}.localhost:8000/`

## Best link

- **Users**
  - `/` : - Homepage and Job post list
  - `/jobDetail/:id` : - View Job post detail
  - `/jobDetail/apply/:id` : - Apply to a position 


- **Admin**
  - `/Dashboard` : - Homepage and Job post list
  - `/CreateJob` : -  Create job post
  - `/EditJob/:id` : - Edit Job post 
  - `/Applicants/:id` : - View All applicants to certain position

  

## Contributing
We invite community contributions! To contribute, please fork the repository and submit a pull request with your modifications. Make sure your code adheres to the current coding standards and is thoroughly documented.

