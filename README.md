# :evergreen_tree: Cypress Testing Training

> ### *“All code is guilty, until proven innocent.”* – Anonymous
<br>

## :eyes: Overview
It is always safer to test our code than to simply assume that everything is working. The price of shipping faulty software is too big compared to the investment of time that testing requires. However, this investment don't need to be greater than necessary. Automated testing is a reliable and efficient way to optimize our time as developers and guarantee that we are always shipping working code to our clients.

In this training, you will learn the first steps of setting up the E2E testing tool [Cypress](https://www.cypress.io/) in your front-end applications. By the end of this session you should feel comfortable installing and working with basic Cypress functionalities, writing simple test cases, and running them against your application.

**Here are a few resources to help get you started:**
 - [Introduction to Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes)
 - [Cypress in a Nutshell](https://www.youtube.com/watch?reload=9&v=LcGHiFnBh3Y)
 - [How to Test Your Frontend with the Cypress.io Framework](https://medium.com/free-code-camp/how-to-test-your-frontend-with-the-cypress-io-framework-f048070f4330)
 - [Testing Tips](./assets/testing-tips.md)

This repository contains a simple to-do web application developed with ReactJS that you will use to run your tests against. The principles of what you will learn should work with any front-end frameworks.

 ## :world_map: Instructions

During the training I will walk you through setting up Cypress and writing your first test cases. If you get lost, please refer to this section. All information you need will be found here.

### **Setting up project repository**.

Fork this repository so you can have a copy saved to your GitHub that you can work on. Please, do not sync your fork with this repository. If you do not know how to fork GitHub repositories, check this page: [Fork a repo](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo).

Clone your fork to your local machine. For the purposes of this training, I advise you to clone your project into a windows directory and not into a WSL directory (if you use WSL at all). Unfortunately, WSL only supports cypress headless mode. There are a few workarounds to make the cypress UI work in WSL that will not be covered in this training.

After you sucessfully cloned your forked repository run: `npm i` or `yarn` (this project uses yarn, but running an npm command should work just fine).

### **Installing and setting up Cypress**

To start the application all you need to do is run `npm start` or `yarn start`. It will be available locally at `http://localhost:3000`. It should look something like this:

![](./assets/todo-testing.gif)

Now that our app is working, let's focus in setting up cypress. Run `npm i cypress -D` or `yarn add -D cypress`.

Cypress is now installed. Now, add these scripts to `package.json`: `"cypress": "cypress open"` and `"cy:test": "cypress run"`. These scripts will make our lives easier when we need to open the Cypress UI or execute tests in headless mode.

After adding the scripts, run `npm run cypress` or `yarn cypress`. There will be a small setup that cypress will arrange for you automatically. After the setup is done you should see a cypress window opened, a new file, and a new folder in your project. The new project strucure should look like this:

```
/
  ...
  cypress/
    fixtures/
      example.json/
    integration/
      examples/
    plugins/
      index.js
    support/
      commands.js
      index.js
  ...
  cypress.json
  ...  
```

Cypress add a bunch of example files to help you get started and learn about the purpose of each folder and file. In summary:

- **cypress/** : All files related to cypress and its set up will go inside this folder. Think of it as your "tests" folder.
- **cypress/fixtures** : Here you will put all files that represent "dummy data" that you will stub out for your front-end. These are written in JSON, and are great way to stub informationt that will be used to fill a form, for example.
- **cypress/integration** : This is where your test cases will go. In cypress tests are called specs, and each spec can contain several test cases.
- **cypress/plugins** : There are hundreds of plugins that you can install to work with cypress. When you add these plugins to your project you will set them up in files that are kept here.
- **cypress/support** : Any custom commands or simple abstractions can be written in the `commands.js` files that lives inside the support folder.
- **cypress.json** : This is cypress default custom configurations file, at first it is empty but over time we can fill it with important settings that will tune our test suite to our needs. Things like environment variables, security settings, timeout, etc, are defined here.

I also suggest you to explore some of the example spec files. They can give you really good insight on how to write test cases.

As you write and run your tests other folders and files will be added to the `cypress/` folder. More specifically, the `cypress/screenshots` and `cypress/videos` folders.

When you are ready, go ahead and delete the `cypress/integration/examples` folder and the `cypress/fixtures/example.json` file. We want to have a clean structure for our project.

Now, add the following lines to your `cypress.json` file:
```json
{
  "baseUrl": "http://localhost:3000",
  "viewportHeight": 1000
}
```

You can learn more about the config options here: [Configuration](https://docs.cypress.io/guides/references/configuration.html#Options).

Now the setup for this simple test suite is done. We are ready to start writing our test cases.

### **Writing test cases**

We will start by creating a new file inside the `cypress/integration` folder. You can name whatever you want as long as it finishes with `_spec.js`. I will name it `main_spec.js`.

With this new file created, let's think about the features of our app:
- Users can add todos
- Users can mark todos as completed
- Users can delete todos
- Todos are saved in the storage (if the page is reloaded no information will be lost.)

We could (and should!) write a test case for each of these features. For the purposes of this training, we will check the storage in each of the three features. In the end, these will be our test cases:
- **It (the app) should add new todos and persist them in the store.**
- **It should mark todos as completed and save state in the store.**
- **It should delete todos and remove them from the store.**

Now that we clearly defined our test cases, we can outline them in our `main_spec.js` file.

```javascript
/* eslint-disable no-undef */

describe('To-do testing', function () {
  
  it('should add new todos and persist them in the storage', function() {});

  it('should mark todos as completed and save state in the store', function() {});

  it('should delete todos and remove it from the store' , function() {});

})
```

If you have ever written tests in Mocha+Chai or Jest you will notice the similarity. The way you build tests cases in Cypress is essentially the same way you write them in Mocha. The difference is that Cypress add some abstraction on top of it, and a few other features to "drive" the testing in the browser.

Now that we have outlined our test cases, we can begin writing them. An important aspect of these tests is the data that will be used as todos. We can provide this data beforehand by using a fixture file. In the `cypress/fixtures` folder, create a file named `main.json`. Fixtures files can be named anything, but they necessarily need to be JSON files. It is a good practice to give a descriptive name if these fixtures are used across different specs or, if they are only used by one spec file, give them the same name.

Inside the `main.json`, add:

```json
[
  "Install cypress",
  "Set up cypress",
  "Write fixture file",
  "Write test cases",
  "Use UI to run tests",
  "Run tests in headless mode",
  "Buy Lucas an Ice Cream"
]
```

To use the fixture file, we will add a `before(function () {})` hook to our `main_spec.js`:

```javascript
/* eslint-disable no-undef */
describe('To-do testing', function () {
  
  before(function () {
    cy.fixture('main').then(function (data) {
      this.todos = data; 
    })

    cy.visit('/');
  });

  /* 'it' test cases */
  // ...
})
```
The before hook executes once, before all test cases. Cypress have support for other hooks like `beforeEach`, `after`, `afterEach`, etc.

In order to acces the data of a fixture file, we call the `cy.fixture(filename)` function. This function yields the contents of the file, to access the contents the `.then()` chainable can be used. Cypress functions work similarly to promises. By chaining a `.then()` function we can have access to the data of the fixture an assign it to a global property called `todos`. Hence the reason to favor anonymous functions rather than arrow functions.

Now that we have access to the todo data, we can write the test cases as follows. For more details on the Cypress api, please refer to the documentation. The final test cases should look like this:

```javascript
/* eslint-disable no-undef */
describe('To-do testing', function () {
  before(function () {
    cy.fixture('main').then(function (data) {
      this.todos = data; 
    })

    cy.visit('/');
  });

  it('should add new todos and persist them in the storage', function() {
    for (let todo of this.todos) {
      cy.get('input[name="add-todo"]').type(todo);
      cy.get('button[type="submit"').click();
    }
    
    cy.get('.todos')
      .children()
      .then(function (children) {
        cy.expect(children.length).to.equal(this.todos.length);
      });

    cy.reload();

    cy.get('.todos')
      .children()
      .then(function (children) {
        cy.expect(children.length).to.equal(this.todos.length);
      });
  });

  it('should mark todos as completed and save state in the store', function() {
    cy.get('.todo-item label').should('not.have.class', 'striked');

    cy.get('.todo-item input').click({ multiple: true });

    cy.get('.todo-item label').should('have.class', 'striked');

    cy.reload();

    cy.get('.todo-item label').should('have.class', 'striked');
  });

  it('should delete todos and remove it from the store' , function() {
    cy.get('.todo-item').should('exist');

    cy.get('.todo-item button').click({ multiple: true });

    cy.get('.todo-item').should('not.exist');

    cy.reload();

    cy.get('.todo-item').should('not.exist');
  });
})
```

With your test cases written, you can finally run then using the Cypress UI by running `npm run cypress` or `yarn cypress`. You can also run your tests in headless mode by running `npm run cy:test` or `yarn cy:test`.

Notice that a new `videos` folder was created in your cypress directory. These are particularly useful when tests fail running in headless mode. By default, any time a test case fails, a screenshot is also taken and saved in a directory called `screenshots`. Try failing a test on purpose to see that.

 ## :writing_hand: Conclusion

Now that you have a nice introduction to Cypress.io, you ready to start adding it to your front-end projects and developing automated tests suites for your applications.

There is much to learn yet, how to spoof endpoints, set up deployment integrations, intercepting server responses, and much more. Cypress is a great tool and there is whole lot of resources to help you.

I hope this training got you excited about automated tests, and got you thiking how you can use this tool to improve the quality of the code that you and your is currently shipping. Testing requires some investment of time, and it may sound counterproductive at first, but over time it will truly save you time and headaches.

Let me know if I can do anything to help.

Sincerely,

[Lucas Castro](https://github.com/lucasamonrc)
