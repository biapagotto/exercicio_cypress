describe('Testar funcionalidades de contato', () => {
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/');
  });

  it('Deve incluir um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type('Nome Exemplo');
    cy.get('input[placeholder="E-mail"]').type('exemplo@exemplo.com');
    cy.get('input[placeholder="Telefone"]').type('99 99999-9999');
    cy.get('button.adicionar').click();

    cy.get('.contato', { timeout: 10000 })
      .should('contain', 'Nome Exemplo')
      .should('contain', 'exemplo@exemplo.com')
      .should('contain', '99 99999-9999');
  });

  it('Deve alterar um contato', () => {
    cy.get('button.edit').first().click();

    cy.get('input[placeholder="Nome"]').clear().type('Nome Alterado');
    cy.get('input[placeholder="E-mail"]').clear().type('alterado@exemplo.com');
    cy.get('input[placeholder="Telefone"]').clear().type('99 12345-6789');
    cy.get('button.alterar').click();

    cy.get('.contato', { timeout: 10000 })
      .should('contain', 'Nome Alterado')
      .should('contain', 'alterado@exemplo.com')
      .should('contain', '99 12345-6789');
  });

  it('Deve remover um contato', () => {
    cy.get('input[placeholder="Nome"]').type('Nome Exemplo');
    cy.get('input[placeholder="E-mail"]').type('exemplo@exemplo.com');
    cy.get('input[placeholder="Telefone"]').type('99 99999-9999');
    cy.get('button.adicionar').click();

    cy.get('.contato', { timeout: 10000 })
      .should('contain', 'Nome Exemplo');

    cy.get('button.delete').first().click();
    cy.on('window:confirm', () => true); 

    cy.wait(2000); 
    cy.get('.contato', { timeout: 10000 })
      .should('not.contain');
  });
});