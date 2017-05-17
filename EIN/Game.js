// EIN.Game

EIN.Game = function () {
    // Acceptable values:
    // true
    // false
    this.gameState = false;
    
    // Acceptable values:
    // true
    // false
    this.roundState = false;
    
    // Acceptable values:
    // "READY"
    // "PLAYING"
    // "ROUND_OVER"
    // "GAME_OVER"
    this.playState = null;
    
    // Acceptable values:
    // false
    // true
    this.loopState = false;
    
    this.loopInterval = null;
    this.loopSpeed = 'SLOW';
    this.ctrl   = SIG("byId", "ctrl_loop");
    this.spd    = SIG("byId", "loop_speed");
    this.preopt = SIG("byId", "preopt_panel");
    this.opt    = SIG("byId", "opt_panel");
};

/*
EIN.Game.prototype
*/

EIN.Game.prototype.swapPanes = function () {
    this.preopt.classList.add('hidden');
    this.opt.className = '';
    return this.startGame();
};

EIN.Game.prototype.startGame = function () {
    SIG("clearFeed");
    this.gameState = true;
    this.playState = "READY";
    // Commented out debug flag for newWar
    SIG("newGame"/*, true*/);
    return this.startRound();
};

EIN.Game.prototype.startRound = function () {
    this.roundState = true;
    this.playState = "READY";
    SIG("newRound"/* true*/);
    
    if (this.loopSpeed === "SLOW") {
        this.loopInterval = setInterval(SIG, 500, "playTurn");
    } else if (this.loopSpeed === "FAST") {
        this.loopInterval = setInterval(SIG, (1000/30), "playTurn");
    }
};

EIN.Game.prototype.endRound = function () {
    clearInterval(this.loopInterval);
    this.roundState = false;
    this.loopState = false;
    this.ctrl.innerHTML = "Start Next Round";
};

EIN.Game.prototype.endGame = function () {
    clearInterval(this.loopInterval);
    this.gameState = false;
    this.loopState = false;
    this.ctrl.innerHTML = "Start Next Game";
};

EIN.Game.prototype.startNewGame = function () {
    return this.startGame();
};

EIN.Game.prototype.startNewRound = function () {
    this.ctrl.innerHTML = "Pause Round";
    this.loopState = true;
    SIG("clearFeed");
    return this.startRound();
};

EIN.Game.prototype.toggleLoop = function () {
    if (this.gameState === false) {
        return this.startNewGame();
    }
    else if (this.roundState === false) {
        return this.startNewRound();
    }
    
    if (this.loopState) {
        this.loopState = false;
        this.ctrl.innerHTML = "Start Round";
    } else {
        this.loopState = true;
        this.ctrl.innerHTML = "Pause Round";
    }
};

EIN.Game.prototype.toggleLoopSpeed = function () {
    if (this.loopInterval) {
        if (this.loopSpeed === "SLOW") {
            this.loopSpeed = "FAST";
            this.spd.innerHTML = "Slow Down";
            clearInterval(this.loopInterval);
            this.loopInterval = setInterval(SIG, (1000/30), "playTurn");
        } else if (this.loopSpeed === "FAST") {
            this.loopSpeed = "SLOW";
            this.spd.innerHTML = "Speed Up";
            clearInterval(this.loopInterval);
            this.loopInterval = setInterval(SIG, 500, "playTurn");
        }
    }
};

EIN.Game.prototype.playTurn = function () {
    // Always update stats
    SIG('updateStats');

    if (!this.loopState) {
        return;
    }
    
    if (this.playState === "READY") {
        // We don't stop the loop, it keeps iterating.
        // We just set a flag to say "don't battle again
        // until the current battle is done and no player
        // has lost yet"
        this.playState = "PLAYING";
        
        let turnResult = SIG("nextTurn");
        SIG('updateStats');
        if (turnResult === "GAME_OVER") {
            this.playState = "GAME_OVER";
            return this.endGame();
        }
        else if (turnResult === "ROUND_OVER") {
            this.playState = "ROUND_OVER";
            return this.endRound();
        }
        else {
            this.playState = "READY";
            return;
        }
    }
    else {
        return;
    }
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