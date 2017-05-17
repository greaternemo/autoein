// EIN.Arena

EIN.Arena = function () {
    /*
    this.p1 = new EIN.Player();
    this.p2 = new EIN.Player();
    this.p3 = new EIN.Player();
    this.p4 = new EIN.Player();
    
    this.p1.pId = 'p1';
    this.p2.pId = 'p2';
    this.p3.pId = 'p3';
    this.p4.pId = 'p4';
    
    this.p1.pName = 'Nemo';
    this.p2.pName = 'Shoag';
    this.p3.pName = 'Dooty';
    this.p4.pName = 'Dagmar';
    
    this.p1.pStats = SIG('byId', 'p1_stats');
    this.p2.pStats = SIG('byId', 'p2_stats');
    this.p3.pStats = SIG('byId', 'p3_stats');
    this.p4.pStats = SIG('byId', 'p4_stats');
    this.p1 = {
        pId: 'p1',
        pName: 'Nemo',
        pScore: 0,
        pWins: 0,
        pLosses: 0,
        pStatus: 'READY',
        pHand: [],
        pLastCard: null,
        pStats: SIG('byId', 'p1_stats'),
    };
    this.p2 = {
        pId: 'p2',
        pName: 'Shoag',
        pScore: 0,
        pWins: 0,
        pLosses: 0,
        pStatus: 'READY',
        pHand: [],
        pLastCard: null,
        pStats: SIG('byId', 'p2_stats'),
    };
    this.p3 = {
        pId: 'p2',
        pName: 'Dagmar',
        pScore: 0,
        pWins: 0,
        pLosses: 0,
        pStatus: 'READY',
        pHand: [],
        pLastCard: null,
        pStats: SIG('byId', 'p2_stats'),
    };
    */
    this.g0 = {
        gPlayerCount: null,
        gPlayers: [],
        // This should be populated with a call to randomName
        gPlayerNames: null,
        // gDealer should be a valid string from gPlayers
        gDealer: null,
        // gReversed is a boolean value
        gReversed: false,
        // gSkipped is a boolean value
        gSkipped: false,
        // gDeck is an array of strings that represent cards
        gDeck: [],
        // gDiscard is an array of strings that represent cards
        gDiscard: [],
        // gTopDiscard is an array of a single string that represents
        // the top card of the discard pile, which determines which
        // cards can be played on top of it
        gTopDiscard: [],
        // gDiscardColor is the current color of cards that can be 
        // played, generally determined by the color of gTopDiscard,
        // but wild cards let the color be chosen independently.
        gDiscardColor: null,
        // gLastTurn should be a valid string from gPlayers
        gLastTurn: null,
        gRound: 0,
        gGame: 0,
        gTurn: 0,
        gStats: SIG('byId', 'ein_stats'),
    };
};

/*
EIN.Arena.p1/p2.pStatus values can only be one of:
"READY"
"EIN"
"EIN_UNCALLED"
"EIN_CALLED"
"OUT_OF_CARDS"
"SCORING_HAND"
*/

/*
EIN.Arena.prototype
*/

EIN.Arena.prototype.prepPlayers = function (playerNum) {
    let pcn = 0;
    let nps = '';
    pcn += playerNum;
    while (pcn > 0) {
        nps = 'p' + pcn.toString();
        this.g0.gPlayers.unshift(nps);
        pcn -= 1;
    }
    
    this.g0.gPlayerNames = SIG('randomName', this.g0.gPlayers.length);
    
    let prx = 0;
    let pstr = null;
    let pdat = null;
    for (prx; prx < this.g0.gPlayers.length; prx += 1) {
        pstr = this.g0.gPlayers[prx];
        pdat = SIG('playerData', pstr);
        this[pstr] = new EIN.Player();
        this[pstr].pId = pdat.pId;
        this[pstr].pName = this.g0.gPlayerNames[prx];
        this[pstr].pStatsId = pdat.pStatsId;
        this[pstr].pStats = SIG('byId', this[pstr].pStatsId);
    }
    
    return SIG('swapPanes');
};

EIN.Arena.prototype.newGame = function (debug) {
    // Increment the game count, reset the round count
    this.g0.gGame += 1;
    this.g0.gRound = 0;
    this.g0.gDealer = null;
    SIG("narrate", "Prepping a new game...");
    let sx = 0;
    for (sx; sx < this.g0.gPlayers.length; sx += 1) {
        this[this.g0.gPlayers[sx]].pScore = 0;
    }
    // this.p1.pScore = 0;
    // this.p2.pScore = 0;
};

EIN.Arena.prototype.newRound = function (debug) {
    // Increment the round count
    this.g0.gRound += 1;
    SIG("narrate", "Starting a new round...");
    this.g0.gTurn = 0;
    
    // Clear the game data
    this.g0.gDiscard = [];
    this.g0.gTopDiscard = [];
    this.g0.gReversed = false;
    this.g0.gSkipped = false;
    this.g0.gDiscardColor = null;
    this.g0.gDealer = this.getDealer();

    // Clear the player data
    let sx = 0;
    for (sx; sx < this.g0.gPlayers.length; sx += 1) {
        this[this.g0.gPlayers[sx]].pStatus = "READY";
        this[this.g0.gPlayers[sx]].pHand = [];
        this[this.g0.gPlayers[sx]].pLastCard = null;
    }
    
    // Shuffle the deck
    SIG("narrate", "Shuffling the deck...");
    this.g0.gDeck = SIG("shuffle", SIG("einDeck"));

    // Deal each player 7 cards
    let dMsg = '' + this[this.g0.gDealer].pName + ' deals each player 7 cards...';
    SIG("narrate", dMsg);
    let cx = 0;
    for (cx; cx < this.g0.gPlayers.length; cx += 1) {
        this.dealCards(7, this[this.g0.gPlayers[cx]]);
    }

    // Put the top card of the deck onto the discard
    SIG("narrate", "Flipping the top card of the deck...")
    this.flipTopOfDeckToDiscard();
    let fInfo = SIG("einCard", this.g0.gTopDiscard);

    // ...I think that's it

};

EIN.Arena.prototype.getDealer = function () {
    let dIdx = null;
    let dealer = null;
    if (this.g0.gDealer === null) {
        dealer = 'p1';
    }
    else {
        dIdx = this.g0.gPlayers.indexOf(this.g0.gDealer);
        dIdx += 1;
        if (dIdx === this.g0.gPlayers.length) {
            dIdx = 0;
        }
        dealer = this.g0.gPlayers[dIdx];
    }
    return dealer;
};

// Deals a number of cards to a player
// cNum: positive Int, number of cards to deal
// pGuy: a player object, i.e. this.p1
EIN.Arena.prototype.dealCards = function (cNum, pGuy) {
    if (cNum <= 0) {
        return;
    }
    let aCard = null;
    let cInfo = null;
    let cClass = null;
    let dMsg = null;
    // console.log('deck: ' + this.g0.gDeck);
    // console.log('deck.length: ' + this.g0.gDeck.length);
    while (cNum > 0) {
        // You MUST make sure there's a deck to draw from
        if (this.g0.gDeck.length === 0) {
            this.discardToDeck();
        }
        aCard = this.g0.gDeck.pop();
        cInfo = SIG("einCard", aCard);
        cClass = SIG("suitColor", cInfo.cSuit);
        dMsg = '' + pGuy.pName + ' draws a ' + cInfo.cName + '.';
        SIG("colorrate", [dMsg, cClass]);
        pGuy.pHand.push(aCard);
        pGuy.pLastCard = aCard;
        cNum -= 1;
    }
};

// Shortcut to draw a single card
EIN.Arena.prototype.drawACard = function (pGuy) {
    return this.dealCards(1, pGuy);
};

// Takes the discard pile, shuffles it, and uses it as the new deck
EIN.Arena.prototype.discardToDeck = function () {
    SIG("narrate", "Reshuffling the discard pile into the deck...");
    let cPile = this.g0.gDiscard.slice();
    this.g0.gDiscard = [];
    cPile = SIG("shuffle", cPile.slice());
    this.g0.gDeck = cPile.slice();
};

EIN.Arena.prototype.flipTopOfDeckToDiscard = function () {
    // Always move the card that's on the discard down if there is one
    // There shouldn't EVER be here.
    this.pushDownDiscard();
    this.g0.gTopDiscard.push(this.g0.gDeck.pop());
    let cInfo = SIG('einCard', this.g0.gTopDiscard);
    let cClass = SIG('suitColor', cInfo.cSuit);
    let fMsg = "It's a " + cInfo.cName + "!";
    SIG("colorrate", [fMsg, cClass]);
    
    this.handleCardEffect(this[this.g0.gDealer], this.g0.gTopDiscard);
};

EIN.Arena.prototype.pushDownDiscard = function () {
    // gTopDiscard should ONLY EVER be an array of length 0 or 1
    // console.log('topdiscard: ' + this.g0.gTopDiscard);
    if (this.g0.gTopDiscard.length) {
        this.g0.gDiscard.push(this.g0.gTopDiscard.pop());
    }
    // console.log('discard: ' + this.g0.gDiscard);
    // console.log('discard.length: ' + this.g0.gDiscard.length);
};

EIN.Arena.prototype.adjacentPlayer = function (pGuy) {
    let pLast = this.g0.gPlayers.indexOf(pGuy.pId);
    let pNext = null;
    let pDir = null;
    
    // Are we reversed? Math properly, my dude
    if (this.g0.gReversed) {
        pDir = 'back';
    }
    else {
        pDir = 'fore';
    }
    
    // Determine which player is next
    // Start our walk from the last player's index
    pNext += pLast;
    if (pDir === 'back') {
        pNext -= 1;
        // Reconcile this math
        if (pNext < 0) {
            pNext = this.g0.gPlayers.length - 1;
        }
    }
    else if (pDir === 'fore') {
        pNext += 1;
        if (pNext === this.g0.gPlayers.length) {
            pNext = 0;
        }
    }
    
    return this.g0.gPlayers[pNext];
};

EIN.Arena.prototype.nextPlayer = function () {
    let pLast = this.g0.gPlayers.indexOf(this.g0.gLastTurn);
    // console.log('last: ' + this.g0.gLastTurn);
    let pNext = null;
    let pDist = 1;
    let pDir = null;
    
    // Are we reversed? Math properly, my dude
    if (this.g0.gReversed) {
        pDir = 'back';
    }
    else {
        pDir = 'fore';
    }
    
    // If someone was skipped, skip them
    if (this.g0.gSkipped) {
        pDist += 1;
    }
    
    // Determine which player is next
    pNext += pLast;    
    while (pDist > 0) {
        // Start our walk from the last player's index
        if (pDir === 'back') {
            pNext -= 1;
            // Reconcile this math
            if (pNext < 0) {
                pNext = this.g0.gPlayers.length - 1;
            }
        }
        else if (pDir === 'fore') {
            pNext += 1;
            if (pNext === this.g0.gPlayers.length) {
                pNext = 0;
            }
        }
        pDist -= 1;
    }
    
    // console.log('pnext: ' + this.g0.gPlayers[pNext]);
    return this.g0.gPlayers[pNext];
};

EIN.Arena.prototype.nextTurn = function () {
    // Get the next player
    let nextGuy = this[this.nextPlayer()];
    // console.log('next: ' + nextGuy);
    
    // Clear any bullshit
    this.g0.gSkipped = false;
    
    // Do a turn now
    return this.takeTurn(nextGuy);
};

EIN.Arena.prototype.takeTurn = function (pGuy) {
    this.g0.gTurn += 1;
    let tMsg = '>>>>> TURN ' + this.g0.gTurn + ': ' + pGuy.pName + ' <<<<<';
    SIG('dub');
    SIG('narrate', tMsg);
    // console.log('taking turn: ' + pGuy.pId);
    return this.tryToPlayACard(pGuy);
};

EIN.Arena.prototype.tryToPlayACard = function (pGuy) {
    let playable = this.determineCurrentPlayableCards(pGuy);
    let cMsg = '' + pGuy.pName + ' has no playable cards!'
    if (!playable.length) {
        SIG('narrate', cMsg);
        return this.drawAndTryToPlay(pGuy);
    }
    else {
        return this.decideWhichCardToPlay(pGuy, playable);
    }
};

EIN.Arena.prototype.drawAndTryToPlay = function (pGuy) {
    this.drawACard(pGuy);
    let canPlay = this.isCardPlayable(pGuy.pLastCard);
    if (canPlay) {
        return this.playACard(pGuy, pGuy.pLastCard);
    }
    else {
        return this.finishTurn(pGuy);
    }
};

EIN.Arena.prototype.determineCurrentPlayableCards = function (pGuy) {
    let playable = [];
    let isIt = null;
    let aHand = pGuy.pHand.slice();
    // console.log(aHand);
    let cx = 0;
    for (cx; cx < aHand.length; cx += 1) {
        // console.log('is playable? - ' + aHand[cx]);
        isIt = this.isCardPlayable(aHand[cx]);
        if (isIt) {
            playable.push(aHand[cx]);
        }
    }
    return playable;
};

EIN.Arena.prototype.isCardPlayable = function (aCard) {
    let acInfo = SIG('einCard', aCard);
    let dtInfo = SIG('einCard', this.g0.gTopDiscard);
    // console.log('acInfo: ' + acInfo);
    // console.log('dtInfo: ' + dtInfo);
    // If it's wild, you can play it.
    if (acInfo.cKind === 'wild') {
        return true;
    }
    // If it's the same color, you can play it.
    else if (acInfo.cSuit === dtInfo.cSuit) {
        return true;
    }
    else if (acInfo.cSuit === this.g0.gDiscardColor) {
        return true;
    }
    // If it's the same number or action, you can play it.
    else if (acInfo.cVal === dtInfo.cVal) {
        return true;
    }
    // If it's none of those, you can't play it.
    else {
        return false;
    }
};

EIN.Arena.prototype.decideWhichCardToPlay = function (pGuy, pCards) {
    // PLACEHOLDER LOGIC LULLLLL
    return this.playACard(pGuy, pCards[0]);
};

EIN.Arena.prototype.playACard = function (pGuy, aCard) {
    // Always push the discard first
    this.pushDownDiscard();
    
    // Announce the successful play
    let acInfo = SIG('einCard', aCard);
    let cClass = SIG('suitColor', acInfo.cSuit);
    let cMsg = '' + pGuy.pName + ' plays a ' + acInfo.cName + '.';
    SIG('colorrate', [cMsg, cClass]);
    
    // Actually move the card from A to B
    this.g0.gTopDiscard.push(aCard);
    pGuy.pHand.splice(pGuy.pHand.lastIndexOf(aCard), 1);
    
    // HANDLE IT
    return this.handleCardEffect(pGuy, aCard);
};

EIN.Arena.prototype.handleCardEffect = function (pGuy, aCard) {
    // If you win a round by playing a Draw card, they have to draw.
    // Those cards are then counted toward your points for the round.
    let acInfo = SIG('einCard', aCard);
    
    // If wild, we need to pick a color, but we don't return yet
    // in case it's a Wild Draw Four, still gotta handle the draw.
    if (acInfo.cSuit === 'wild') {
        this.pickAColor(pGuy);
    }
    else {
        this.g0.gDiscardColor = acInfo.cSuit;
    }
    
    // Numbers have no side effects other than color
    if (acInfo.cKind === 'number') {
        return this.finishTurn(pGuy);
    }
    // Figure out who needs to draw and DESTROY THEM
    else if (acInfo.cVal === 'wilddrawfour') {
        this.makeSomeoneDrawFour(pGuy);
    }
    // Figure out who needs to draw and make it happen
    else if (acInfo.cVal === 'drawtwo') {
        this.makeSomeoneDrawTwo(pGuy);
    }
    // Toggle skipped
    else if (acInfo.cVal === 'skip') {
        this.g0.gSkipped = true;
    }
    //
    else if (acInfo.cVal === 'reverse') {
        if (this.g0.gReversed) {
            this.g0.gReversed = false;
        }
        else {
            this.g0.gReversed = true;
        }
        
        // In a 2 player game, a Reverse is a Skip.
        if (this.g0.gPlayers.length === 2) {
            this.g0.gSkipped = true;
        }
    }
    
    return this.finishTurn(pGuy);
};

EIN.Arena.prototype.makeSomeoneDrawTwo = function (pGuy) {
    return this.makeSomeoneDraw(pGuy, 2);
};

EIN.Arena.prototype.makeSomeoneDrawFour = function (pGuy) {
    return this.makeSomeoneDraw(pGuy, 4);
};

EIN.Arena.prototype.makeSomeoneDraw = function (pGuy, cNum) {
    let victim = this.adjacentPlayer(pGuy);
    // console.log('victim: ' + victim);
    this.dealCards(cNum, this[victim]);
    this.g0.gSkipped = true;
};

EIN.Arena.prototype.pickAColor = function (pGuy) {
    // PLACEHOLDER
    this.g0.gDiscardColor = SIG('randomColor');
    let cClass = SIG('suitColor', this.g0.gDiscardColor);
    let cMsg = '' + pGuy.pName + ' chooses ' + this.g0.gDiscardColor + '.';
    SIG('colorrate', [cMsg, cClass]);
};

EIN.Arena.prototype.finishTurn = function (pGuy) {
    // console.log('p1.pHand: ' + this.p1.pHand.length);
    // console.log('p2.pHand: ' + this.p2.pHand.length);
    this.g0.gLastTurn = pGuy.pId;
    let tMsg = null;
    if (pGuy.pHand.length === 0) {
        tMsg = '' + pGuy.pName + ' is out of cards!';
        SIG('narrate', tMsg);
        return this.endOfRound(pGuy);
    }
    else {
        return "FINISHED";
    }
};

// Triggers the end of the round, possibly the game
EIN.Arena.prototype.endOfRound = function (victor) {
    // console.log('WIN: ' + victor.pName);
    let vMsg = '' + victor.pName + ' wins the round!';
    SIG('narrate', vMsg);
    // DEBUG SHIT
    // return "GAME_OVER";
    
    this.scoreRound(victor);
    
    if (victor.pScore >= 500) {
        return this.endOfGame(victor);
    }
    else {
        return "ROUND_OVER";
    }
};

EIN.Arena.prototype.endOfGame = function (victor) {
    let vMsg = '' + victor.pName + ' wins the game!';
    SIG('narrate', vMsg);
    
    // Update the wins/losses
    let gx = 0;
    victor.pWins += 1;
    for (gx; gx < this.g0.gPlayers.length; gx += 1) {
        if (victor.pId !== this.g0.gPlayers[gx]) {
            this[this.g0.gPlayers[gx]].pLosses += 1;
        }
    }

    return "GAME_OVER";
};

EIN.Arena.prototype.scoreRound = function (victor) {
    let total = 0;
    let gx = 0;
    for (gx; gx < this.g0.gPlayers.length; gx += 1) {
        if (victor.pId !== this.g0.gPlayers[gx]) {
            total += this.scoreHand(this[this.g0.gPlayers[gx]]);
        }
    }
    
    let vMsg = '' + victor.pName + ' scores ' + total.toString() + ' points!';
    SIG('narrate', vMsg);
    victor.pScore += total;
};

// Adds up the point value of a player's hand and returns the total
EIN.Arena.prototype.scoreHand = function (loser) {
    let tally = 0;
    let cardInfo = null;
    let cHand = loser.pHand.slice();
    let cx = 0;
    for (cx; cx < cHand.length; cx += 1) {
        cardInfo = SIG("einCard", cHand[cx]);
        switch(cardInfo.cKind) {
            case "wild":
                tally += 50;
                break;
            case "action":
                tally += 20;
                break;
            case "number":
                tally += cardInfo.cVal;
                break;
        }
    }
    return tally;
};

EIN.Arena.prototype.updateStats = function () {
    this.g0.gStats.innerHTML =
        "Game " + this.g0.gGame + ", Round " + this.g0.gRound;
    
    let sx = 0;
    let sp = null;
    for (sx; sx < this.g0.gPlayers.length; sx += 1) {
        sp = this[this.g0.gPlayers[sx]];
        sp.pStats.innerHTML = '' + sp.pName + ':';
        sp.pStats.innerHTML += '\n' + "Score: " + sp.pScore;
        sp.pStats.innerHTML += '\n' + "W: " + sp.pWins + " L: " + sp.pLosses;
        sp.pStats.innerHTML += '\n' + "Hand: " + sp.pHand.length;
    }

    /*
    this.p1.pStats.innerHTML = '' + this.p1.pName + ':';
    this.p1.pStats.innerHTML += '\n' + "Score: " + this.p1.pScore;
    this.p1.pStats.innerHTML += '\n' + "W: " + this.p1.pWins + " L: " + this.p1.pLosses;
    this.p1.pStats.innerHTML += '\n' + "Hand: " + this.p1.pHand.length;

    this.p2.pStats.innerHTML = '' + this.p2.pName + ':';
    this.p2.pStats.innerHTML += '\n' + "Score: " + this.p2.pScore;
    this.p2.pStats.innerHTML += '\n' + "W: " + this.p2.pWins + " L: " + this.p2.pLosses;
    this.p2.pStats.innerHTML += '\n' + "Hand: " + this.p2.pHand.length;
    */
};



/*
 *
 *
 *
 * Courtesy Space
 *
 *
 *
 */