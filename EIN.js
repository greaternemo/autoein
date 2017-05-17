// EIN
// Definitely not Uno, nope.

var EIN = {
    // Core bits
    eRouter: null,
    eRegistry: null,
    
    // Systems
    eArena: null,
    eGame: null,
    eNarr: null,
    eUtil: null,
};

EIN.init = function () {
    EIN.eRouter = new EIN.Router(EIN.BASE);

    EIN.eRegistry = new EIN.Registry(EIN.BASE);
    EIN.eRouter.import('Registry', EIN.eRegistry);

    EIN.eUtil = new EIN.Util();
    EIN.eRouter.import('Util', EIN.eUtil);

    EIN.eNarr = new EIN.Narrator();
    EIN.eRouter.import('Narrator', EIN.eNarr);

    EIN.eArena = new EIN.Arena();
    EIN.eRouter.import('Arena', EIN.eArena);

    EIN.eGame = new EIN.Game();
    EIN.eRouter.import('Game', EIN.eGame);
}

function SIG(rSig, rParams) {
    return EIN.eRouter.reroute(rSig, rParams);
}



// hurk



/*
*
*
*
* Courtesy Space
*
*
*
*/