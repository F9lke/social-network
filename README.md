# Social Network Application

A social network application built with the mern stack for educational purposes.

## Getting Started

These instructions will get you the latest version of this project up and running on your local mashine for testing and development purposes. See deployment on how to deploy it on a live system. Please notice, that social-network is still under development.

### Prerequesites

* **[NodeJS](https://nodejs.org/en/)** - A recent version of NodeJS, preferably PHP 8.11.2 or higher
* **MongoDB Instance** - [mlab](https://mlab.com/) is recommended

### Installing

A short guidance on how to setup the project on you local mashine.

After forfilling the prerequesites mentioned above, the project can be cloned with the following command in your git bash:

```
git clone https://github.com/F9lke/social-network
```

Thanks to the use of MongoDB, it is not necessary to manually create the database structure. In order to make this database system work on the other hand, you have to create a file called "keys.js" inside the folder "config" with the following code:

```
module.exports = {
    mongoURI: 'YOUR MONGODB URI',
    secretOrKey: 'secret'
}
```


### Known Bugs

Please notice, that this project is both under development and still in a very early state. That is why there are a few unfixed bugs that are getting worked on in the process.


**Bug 1** The first and thankfully only bug at this point of time involves the auth system; Currently it is possible to view the dashboard route without being logged in.



## Deployment

The installation on a live system does not differ much from the deployment on a local mashine. See installation for further notes.


## Built With

* [mern](http://mern.io/) - The web stack used
* [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) - The routing system used
* [react-redux](https://github.com/reduxjs/react-redux) - used for better Redux-ReactJS compatibility
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Encryption system used
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) and
* [passport]() used for authentication system
* [Gravatar](https://en.gravatar.com/) - Avatar system used


## Something does not work?

If you encounter a serious bug besides the listed ones, make sure to immediately contact me by preferably writing an email to info@floriangoetzrath.de or simply opening a thread at Github.


## Contributing

It is highly appreciated to leave your thoughts and/or comitting your code related suggestions in order to improve code quality, project structure and functionality.

Since this project mainly focuses on self-study practice I rely on getting to know the right things at the right time. That is why I would go on to consider to list you under authors at event of help.


## Versioning

The latest version of this project is always available in this repository. Please notice, that updates are published very irregularly.


## Acknowledgments

* **[Brad Traversy](https://www.traversymedia.com/)**


## MIT License

Copyright (c) 2018 Florian Götzrath

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.