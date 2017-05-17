// EIN.Registry
// For holding ur datas

EIN.Registry = function (eBase) {
    this.base = eBase;
    this.primeRegistry = {};
    
    
};

/*
EIN.Registry.prototype
*/

EIN.Registry.prototype.factory = function (eTemp) {
    return;
};

EIN.Registry.prototype.stdDeck = function () {
    return this.base.RefData.StdDeck.slice();
};

EIN.Registry.prototype.einDeck = function () {
    return this.base.RefData.EinDeck.slice();
}

EIN.Registry.prototype.einCard = function (eCard) {
    return this.base.RefData.EinCards[eCard];
}

EIN.Registry.prototype.playerData = function (pStr) {
    return this.base.RefData.PlayerData[pStr];
}

EIN.Registry.prototype.suitColor = function (sColor) {
    return this.base.RefData.SuitColors[sColor];
}


/*
*
*
*
* Courtesy Space
*
*
*
*/