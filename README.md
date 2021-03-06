
<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  
<img src="https://github.com/kube-greeners/frontend/blob/main/public/logo.png" width="250" height="250" />
<h3 align="center">kube-green Dashboard Frontend</h3>

  <p align="center">
    Making the kube-green savings stand out
    <br />
    <br />
    <a href="https://github.com/kube-greeners/frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/kube-greeners/frontend/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#used-technologies-and-libraries">Used Technologies and Libraries</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#local-installation-and-running">Local Installation and Running</a></li>
        <li><a href="#installation-to-a-kubernetes-cluster">Installation to a Kubernetes Cluster</a></li>
      </ul>
    </li>
    <li>
      <a href="#code-structure">Code Structure</a>
      <ul>
        <li><a href="#directories">Directories</a></li>
        <li><a href="#logic">Logic</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#people">People</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

This project, as a part of the Dashboard for kube-green project intends to provide the frontend application for the Dashboard.
By itself this project is not that much of use and it would be better to combine it with the backend to deploy.
This project is developed as a part of Distributed Software Development course taught at Politecnico di Milano and Mälardalen University in academic year 2021-2022, with the proposal provided by Mia Platform.
This project is built with the expectancy of accompanying [kube-green](https://github.com/kube-green/kube-green).

<p align="right">(<a href="#top">back to top</a>)</p>

### Used technologies and Libraries

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
- [Ant Design](https://ant.design/)
- [kube-green](https://github.com/kube-green/kube-green)

##### README is based on [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started
The project was bootstrapped with [Create-react-app](https://create-react-app.dev/) and includes all of the scripts that are preconfigured with this tool:

Make sure to navigate to the root folder of the project before running each commands

-  And then run the start script `npm start`
- Build the app `npm run build`  
- Run tests `npm run test`


### Prerequisites

The [backend](https://github.com/kube-greeners/backend) project needs to be setup and running


### Local Installation and Running

Make sure to have [Node](https://nodejs.org/en/) installed

Clone the repository and install dependencies with `npm i`

Change the `REACT_APP_API_BASE_URL` in [.env.development](https://github.com/kube-greeners/frontend/blob/main/.env.development) to reference the URL of the backend.


<p align="right">(<a href="#top">back to top</a>)</p>

## Code structure

This repository consists of the main code for the frontend. It follows a typical folder structure for a react project where each component along with it styles has its own folder.

### Directories

* `build/`: Production ready build of the app. Will be generated when running `npm run build` 
* `public/`: Static assets
* `src/`: Contains all the source code of the project
  * `Components/`: React components
  * `__snapshots__/`: Snapshot tests for the components
  * `redux/`: Redux slices, and store configuration
  * `Utilities/`: Utility functions
* `env.development` - development environment variables
* `.github` - configuration files for github actions.
* `connect.mjs`: A zx script that allows provisioning and connecting to our cluster backend, it helps developers of both frontend and backend projects to easily turn-on and turn-off the test cluster we have and port-forward the cluster pods.





## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## People

#### Built by:

#### [kube-green frontend](https://github.com/kube-greeners/frontend/) by:

- Boris Grunwald [@jikol1906](https://github.com/jikol1906)
- Ragnhild Kleiven [@RagnhildK](https://github.com/RagnhildK)
- Hanna Torjusen [@hanntorj](https://github.com/hanntorj)
- Marija Popovic [@marijapopovic28](https://github.com/marijapopovic28)
- Amila Cizmic [@amilacizmic](https://github.com/amilacizmic)

#### [kube-green backend](https://github.com/kube-greeners/backned/) by:

- Ozan İncesulu [@ozyinc](https://github.com/ozyinc)
- Alban Delishi [@albandelishi](https://github.com/albandelishi)
- Zoé Pesleux [@zoepj](https://github.com/zoepj)
- Redion Lila [@rlila97](https://github.com/rlila97)

#### Acknowledgements:

We would like to thank:

- Malvina Latifaj and Samuele Giussani for their assistance and feedback through this project and for sharing this journey with us.
- Davide Bianchi for kube-green and valuable guidance for integration of this project
- Francesca Carta for feedback regarding each step of the product built.

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/kube-greeners/backend.svg?style=for-the-badge
[contributors-url]: https://github.com/kube-greeners/backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kube-greeners/backend.svg?style=for-the-badge
[forks-url]: https://github.com/kube-greeners/backend/network/members
[stars-shield]: https://img.shields.io/github/stars/kube-greeners/backend.svg?style=for-the-badge
[stars-url]: https://github.com/kube-greeners/backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/kube-greeners/backend.svg?style=for-the-badge
[issues-url]: https://github.com/kube-greeners/backend/issues
[license-shield]: https://img.shields.io/github/license/kube-greeners/backend.svg?style=for-the-badge
[license-url]: https://github.com/kube-greeners/backend/blob/dev/LICENSE
