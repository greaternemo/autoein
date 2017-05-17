// EIN.Util

EIN.Util = function (params) {};

/*
EIN.Util.prototype
*/

// returns a random integer between 0 and max-1
EIN.Util.prototype.rand = function (max) {
    return Math.floor(Math.random() * max);
};

EIN.Util.prototype.randomColor = function () {
    let cardColors = ['red', 'yellow', 'blue', 'green'];
    return cardColors[this.rand(4)];
};

EIN.Util.prototype.randomName = function (pNum) {
    let playerNames = [
        'Nemo', 'Shoag', 'Dooty', 'Dagmar', 'Tex',
        'Boo', 'Big Boo', 'King Boo', 'Lakitu', 'Shyguy',
        'Captain Toad', 'Dry Bones', 'BFB', 'Sex Bob-omb',
        'Puppycat', 'Zorbat', 'Dukburg', 'Garbador',
        'Tom Nook', 'DJ K.K.', 'Blathers', 'Waluigi',
        'Nolan', 'Hestu', 
    ];
    let ourPlayers = [];
    let rIdx = 0;
    let playa = null;
    while (ourPlayers.length < pNum) {
        rIdx = this.rand(playerNames.length);
        playa = playerNames[rIdx];
        if (playa === 'Nolan') {
            ourPlayers.push(this.randomNolan());
        }
        else {
            ourPlayers.push(playa);
        }
        playerNames.splice(rIdx, 1);
    }
    return ourPlayers;
};

EIN.Util.prototype.randomNolan = function () {
    let rareNolans = [
        'Gold Nolan',
        'Shiny Nolan', 
        'Fat Nolan',
        'The Dreaded MEGA BACONOLAN',
        "A Wendy's Baconator",
        'Nolan, as played by Jeff',
        'Nolan, as played by Freddy',
        'Nolan, as played by James Franco',
        'A licened Nolan anime body pillow',
        'A Nolan voodoo doll',
        'Silver Nolan',
        'Tiny Nolan',
        '2 Tiny Nolans in a trenchcoat',
        'A vase or 2 Nolans',
        'Evil Nolan',
        'RoboNolan',
        "An alien in Nolan's skin",
    ];
    if (this.rand(25) === 0) {
        return rareNolans[this.rand(rareNolans.length)];
    }
    else {
        return 'Nolan';
    }
};

// Takes an array, creates a new array, adds the elements of the original
// array to the new array at random, returns the new array.
// Proper usage should look like:
// let xDeck = SIG("shuffle", yDeck);
EIN.Util.prototype.shuffle = function (aDeck) {
    let newDeck = [];
    while (aDeck.length) {
        newDeck.push(aDeck.splice(this.rand(aDeck.length), 1)[0]);
    }
    return newDeck;
};

EIN.Util.prototype.cap = function (nStr) {
    return nStr.charAt(0).toUpperCase() + nStr.slice(1);
};

EIN.Util.prototype.byId = function (elemId) {
    return document.getElementById(elemId);
};

EIN.Util.prototype.scrollToNew = function (panel) {
    panel.scrollTop = panel.scrollHeight - panel.clientHeight;
    return;
};

EIN.Util.prototype.depair = function (param) {
    // Returns an array containing the split elements.
    // Remember, if you just want X from string "X,Y"
    // use depair(param)[0] !
    return param.split(',');
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