describe('Search Page', () => {
	it('renders without crashing', () => {
		cy.visit('/');
	});

	it('searches for publishers by name', () => {
		cy.get('[for="name-input"]').click();
		cy.get('input#search').type('tribunedigital-thecourant');
		cy.contains('1008945');
	});

	it('searches publishers by description', () => {
		cy.get('[for="description-input"]').click();
		cy.get('input#search').clear().type('NBCUniversal - Syfy');
		cy.contains('nbcuniversal-syfy');
	});

	it('searches publishers by id', () => {
		cy.get('[for="id-input"]').click();
		cy.get('input#search').clear().type('1008945');
		cy.contains('tribunedigital-thecourant');
	});

	it("does not break when searching for pubs that don't exist", () => {
		cy.get('[for="name-input"]').click();
		cy.get('input#search').clear().type('i am not a real publisher');
		cy.contains('No Results');

		cy.get('[for="id-input"]').click();
		cy.get('input#search').clear().type('1');
		cy.contains('No Results');


		cy.get('[for="description-input"]').click();
		cy.get('input#search').clear().type('109dfjbng982y3rbads');
		cy.contains('No Results');
	});

	it("takes you to the publisher's video page when you click on a link", () => {
		cy.get('[for="id-input"]').click();
		cy.get('input#search').clear().type('1008945');
		cy.contains('tribunedigital-thecourant').click();
		cy.url().should('include', '/videos?id=1008945');
	});
});
