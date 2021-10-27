describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'test',
      password: 'test'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form').should('not.have.css', 'display', 'none')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#loginButton').click()
      cy.get('html').should('contain', 'Succesfully loged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.get('html').should('contain', 'Wrong Login or Password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.contains('Add Blog').click()
      cy.get('#title').type('New blog added by cypress')
      cy.get('#author').type('Marcin')
      cy.get('#url').type('www.wp.pl')
      cy.contains('Create').click()

      cy.contains('New blog added by cypress')
    })

    describe('and blog was created', function() {
      beforeEach(function() {
        cy.contains('Add Blog').click()
        cy.get('#title').type('Another blog added by cypress')
        cy.get('#author').type('Marcin')
        cy.get('#url').type('www.wp.pl')
        cy.contains('Create').click()
      })

      it('A blog can be liked', function() {
        cy.contains('Another blog added by cypress').contains('Show more').click()
        cy.contains('Another blog added by cypress').parent().contains('Like').click()

        cy.contains('Another blog added by cypress').parent().should('contain', 'Likes: 1')
      })

      it('A blog can be deleted, by a user who created it', function() {
        cy.contains('Another blog added by cypress').contains('Show more').click()
        cy.contains('Another blog added by cypress').parent().contains('Delete').click()
        cy.get('html').should('not.contain', 'Another blog added by cypress')
      })
    })

    describe('and multiple blogs are created', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'First cypress', author: 'mar', url: 'wp.pl' })
        cy.createBlog({ title: 'Second cypress', author: 'cin', url: 'wp.pl' })
        cy.createBlog({ title: 'Third cypress', author: 'jankowski', url: 'wp.pl' })
      })

      it('A blog can be liked multiple times', function() {
        cy.contains('Second cypress').contains('Show more').click()
        cy.contains('Second cypress').parent().contains('Like').click().click()

        cy.contains('Second cypress').parent().should('contain', 'Likes: 2')
      })

      it.only('they are sorted by ammount of likes', function() {
        cy.contains('Third cypress').contains('Show more').click()
        cy.contains('Third cypress').parent().contains('Like').click().click()

        cy.contains('Second cypress').contains('Show more').click()
        cy.contains('Second cypress').parent().contains('Like').click()

        cy.visit('http://localhost:3000')
        cy.get('.blogContainer').then(res => console.log(res))
      })
    })

  })
})