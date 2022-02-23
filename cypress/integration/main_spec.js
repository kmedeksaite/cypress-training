/* eslint-disable no-undef */
describe('To-do testing', function(){

    // to use the main.json fixture
    // executes once
    before(function(){
        cy.fixture('main').then(function(data){
            this.todos = data;
        })
        
        cy.visit('/');
    })

    it('should add new todos and persist to storage',function(){

        for (let todo of this.todos){
            cy.get('[id="add-todo"]').type(todo);
            cy.get('button[type="submit"]').click();
        }
        
        cy.get('.todos')
            .children()
            .then(function(children){
                cy.expect(children.length).to.equal(this.todos.length);
        });
        cy.reload();
        cy.get('.todos')
        .children()
        .then(function(children){
            cy.expect(children.length).to.equal(this.todos.length);
        });

    });

    it('should mark todos as complete and save state to storage',function(){
        
        cy.get('.todo-item label').should('not.have.class', 'striked');
        cy.get('.todo-item input').click({multiple:true});

        cy.get('.todo-item label').should('have.class', 'striked');
        cy.reload();
        cy.get('.todo-item label').should('have.class', 'striked');

    });

    it('should delete todos and remove from storage',function(){

        cy.get('.todo-item').should('exist');
        cy.get('.todo-item button').click({multiple:true});
        
        cy.get('.todo-item').should('not.exist');
        cy.reload();
        cy.get('.todo-item').should('not.exist');


    });


})