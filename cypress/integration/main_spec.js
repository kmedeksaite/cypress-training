/* eslint-disable no-undef */
let todos;
describe('To-do testing', function () {
  // The before hook runs only once at the start of the test run.
  before(function () {
    cy.fixture('main').then(function (data) {
      todos = data; 
    })

    cy.visit('/');
  })

  it('should add a new todos and persist them in the storage', function() {
    for (let todo of todos) {
      cy.get('input[name="add-todo"]').type(todo);
      cy.get('button[type="submit"').click();
    }
    
    cy.get('.todos')
      .children()
      .then(function (children) {
        cy.expect(children.length).to.equal(todos.length);
      });

    cy.reload();

    cy.get('.todos')
      .children()
      .then(function (children) {
        cy.expect(children.length).to.equal(todos.length);
      });
  });

  // it('should mark todo as completed and save state in the store', function() {});

  // it('should delete a todo and remove it from the store' , function() {});
})