// EIN.Player

EIN.Player = function () {
    // Should be 'pX' where X is an integer
    // example: 'p1'
    this.pId = '';
    // Should be a string for the name
    // example: 'Nemo'
    this.pName = '';
    // Will always be an integer
    // Reset when a new game is started
    this.pScore = 0;
    // Will always be an integer, is not reset
    this.pWins = 0;
    // Will always be an integer, is not reset
    this.pLosses = 0;
    // Isn't really used at all right now?
    this.pStatus = 'READY';
    // Holds strings representing cards
    this.pHand = [];
    // Holds a single string representing the last card drawn
    this.pLastCard = null;
    // Holds the written id for the element used to display
    // this player's stats during games
    this.pStatsId = ''
    // Holds a reference to the element used to display this
    // player's stats during games
    this.pStats = null;
};