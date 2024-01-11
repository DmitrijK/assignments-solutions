it.only('Should have five elements in issue priorities', () => {
  const expectedLength = 5;
  let priorityArray = [];

  getIssueDetailsModal().within(() => {
    let selectedPriority = getSelectedPriority();
    priorityArray.push(selectedPriority);

    cy.log(`Added value: ${selectedPriority}, Array length: ${priorityArray.length}`);

    // Access all options from the dropdown
    for (let i = 0; i < 4; i++) {
      getPriorityFromDropdown(i).then((text) => {
        let priorityOption = text;
        cy.log(priorityOption);
        priorityArray.push(priorityOption);
        cy.log(`Added value: ${priorityOption}, Array length: ${priorityArray.length}`);
      });
    }
  });
  cy.wrap(priorityArray).should('have.length', expectedLength);
});

const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

function getSelectedPriority() {
  return 'High';
}

function getPriorityFromDropdown(i) {
  return cy.get('[data-testid="select:priority"]').click().get('[placeholder="Search"]').next().children().eq(i).invoke('text');
}
