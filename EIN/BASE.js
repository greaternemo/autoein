// EIN.BASE
// Template and reference data

EIN.BASE = {
    Templates: {
        
        Arena: {},
        Game: {},
        Narrator: {},
        Util: {},

    },

    Routes: {
        
        Arena: [
            'prepPlayers',
            'newGame',
            'newRound',
            'getDealer',
            'dealCards',
            'drawACard',
            'discardToDeck',
            'flipTopOfDeckToDiscard',
            'pushDownDiscard',
            'adjacentPlayer',
            'nextPlayer',
            'nextTurn',
            'takeTurn',
            'tryToPlayACard',
            'drawAndTryToPlay',
            'determineCurrentPlayableCards',
            'isCardPlayable',
            'decideWhichCardToPlay',
            'playACard',
            'handleCardEffect',
            'makeSomeoneDrawTwo',
            'makeSomeoneDrawFour',
            'makeSomeoneDraw',
            'pickAColor',
            'finishTurn',
            'endOfRound',
            'endOfGame',
            'scoreRound',
            'scoreHand',
            'updateStats',
        ],
        Game: [
            'swapPanes',
            'startGame',
            'startRound',
            'endRound',
            'endGame',
            'startNewGame',
            'startNewRound',
            'toggleLoop',
            'toggleLoopSpeed',
            'playTurn',
        ],
        Narrator: [
            'narrate',
            'colorrate',
            'clearFeed',
            'dub',
            'addLine',
            'addColorLine',
        ],
        Registry: [
            'stdDeck',
            'einDeck',
            'einCard',
            'playerData',
            'suitColor',
        ],
        Util: [
            'rand',
            'randomColor',
            'randomName',
            'shuffle',
            'cap',
            'byId',
            'scrollToNew',
            'depair',
        ],
    },

    RefData: {
        SuitColors: {
            red: 'redcard',
            yellow: 'yellowcard',
            blue: 'bluecard',
            green: 'greencard',
            wild: '',
        },
        PlayerData: {
            p1: {
                pId: 'p1',
                pStatsId: 'p1_stats',
            },
            p2: {
                pId: 'p2',
                pStatsId: 'p2_stats',
            },
            p3: {
                pId: 'p3',
                pStatsId: 'p3_stats',
            },
            p4: {
                pId: 'p4',
                pStatsId: 'p4_stats',
            },
            p5: {
                pId: 'p5',
                pStatsId: 'p5_stats',
            },
            p6: {
                pId: 'p6',
                pStatsId: 'p6_stats',
            },
        },
        StdDeck: [
          "A,S", "2,S", "3,S", "4,S", "5,S",
          "6,S", "7,S", "8,S", "9,S", "X,S",
          "J,S", "Q,S", "K,S",
          "A,C", "2,C", "3,C", "4,C", "5,C",
          "6,C", "7,C", "8,C", "9,C", "X,C",
          "J,C", "Q,C", "K,C",
          "A,D", "2,D", "3,D", "4,D", "5,D",
          "6,D", "7,D", "8,D", "9,D", "X,D",
          "J,D", "Q,D", "K,D",
          "A,H", "2,H", "3,H", "4,H", "5,H",
          "6,H", "7,H", "8,H", "9,H", "X,H",
          "J,H", "Q,H", "K,H"
        ],
        // An Uno deck contains 108 cards:
        // [4]  1x 0 in each color (RBYG),
        // [72] 2x of each number 1-9 in each color (RBYG), 
        // [24] 2x of each action card in each color:
        // Skip, Reverse, Draw Two (RBYG),
        // [8]  4x Wild, 4x Wild Draw Four.
        EinDeck: [
            "0,R", "1,R", "1,R", "2,R", "2,R", "3,R", "3,R",
            "4,R", "4,R", "5,R", "5,R", "6,R", "6,R",
            "7,R", "7,R", "8,R", "8,R", "9,R", "9,R",
            "S,R", "S,R", "R,R", "R,R", "D,R", "D,R",
            "0,Y", "1,Y", "1,Y", "2,Y", "2,Y", "3,Y", "3,Y",
            "4,Y", "4,Y", "5,Y", "5,Y", "6,Y", "6,Y",
            "7,Y", "7,Y", "8,Y", "8,Y", "9,Y", "9,Y",
            "S,Y", "S,Y", "R,Y", "R,Y", "D,Y", "D,Y",
            "0,B", "1,B", "1,B", "2,B", "2,B", "3,B", "3,B",
            "4,B", "4,B", "5,B", "5,B", "6,B", "6,B",
            "7,B", "7,B", "8,B", "8,B", "9,B", "9,B",
            "S,B", "S,B", "R,B", "R,B", "D,B", "D,B",
            "0,G", "1,G", "1,G", "2,G", "2,G", "3,G", "3,G",
            "4,G", "4,G", "5,G", "5,G", "6,G", "6,G",
            "7,G", "7,G", "8,G", "8,G", "9,G", "9,G",
            "S,G", "S,G", "R,G", "R,G", "D,G", "D,G",
            "W,W", "W,W", "W,W", "W,W",
            "D,W", "D,W", "D,W", "D,W"
        ],
        EinCards: {
            /*
            "0,R": {
                cKind: "number"/"action"/"wild",
                cSuit: "red"/"yellow"/"blue"/"green"/"wild",
                cVal: 0/1/2/3/4/5/6/7/8/9/"skip"/"reverse"/"drawtwo"/"wild"/"wilddrawfour",
                cName: "",
            },
            */
            "0,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 0,
                cName: "red Zero",
            },
            "1,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 1,
                cName: "red One",
            },
            "2,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 2,
                cName: "red Two",
            },
            "3,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 3,
                cName: "red Three",
            },
            "4,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 4,
                cName: "red Four",
            },
            "5,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 5,
                cName: "red Five",
            },
            "6,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 6,
                cName: "red Six",
            },
            "7,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 7,
                cName: "red Seven",
            },
            "8,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 8,
                cName: "red Eight",
            },
            "9,R": {
                cKind: "number",
                cSuit: "red",
                cVal: 9,
                cName: "red Nine",
            },
            "S,R": {
                cKind: "action",
                cSuit: "red",
                cVal: "skip",
                cName: "red Skip",
            },
            "R,R": {
                cKind: "action",
                cSuit: "red",
                cVal: "reverse",
                cName: "red Reverse",
            },
            "D,R": {
                cKind: "action",
                cSuit: "red",
                cVal: "drawtwo",
                cName: "red Draw Two",
            },
            "0,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 0,
                cName: "yellow Zero",
            },
            "1,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 1,
                cName: "yellow One",
            },
            "2,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 2,
                cName: "yellow Two",
            },
            "3,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 3,
                cName: "yellow Three",
            },
            "4,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 4,
                cName: "yellow Four",
            },
            "5,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 5,
                cName: "yellow Five",
            },
            "6,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 6,
                cName: "yellow Six",
            },
            "7,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 7,
                cName: "yellow Seven",
            },
            "8,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 8,
                cName: "yellow Eight",
            },
            "9,Y": {
                cKind: "number",
                cSuit: "yellow",
                cVal: 9,
                cName: "yellow Nine",
            },
            "S,Y": {
                cKind: "action",
                cSuit: "yellow",
                cVal: "skip",
                cName: "yellow Skip",
            },
            "R,Y": {
                cKind: "action",
                cSuit: "yellow",
                cVal: "reverse",
                cName: "yellow Reverse",
            },
            "D,Y": {
                cKind: "action",
                cSuit: "yellow",
                cVal: "drawtwo",
                cName: "yellow Draw Two",
            },
            "0,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 0,
                cName: "blue Zero",
            },
            "1,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 1,
                cName: "blue One",
            },
            "2,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 2,
                cName: "blue Two",
            },
            "3,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 3,
                cName: "blue Three",
            },
            "4,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 4,
                cName: "blue Four",
            },
            "5,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 5,
                cName: "blue Five",
            },
            "6,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 6,
                cName: "blue Six",
            },
            "7,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 7,
                cName: "blue Seven",
            },
            "8,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 8,
                cName: "blue Eight",
            },
            "9,B": {
                cKind: "number",
                cSuit: "blue",
                cVal: 9,
                cName: "blue Nine",
            },
            "S,B": {
                cKind: "action",
                cSuit: "blue",
                cVal: "skip",
                cName: "blue Skip",
            },
            "R,B": {
                cKind: "action",
                cSuit: "blue",
                cVal: "reverse",
                cName: "blue Reverse",
            },
            "D,B": {
                cKind: "action",
                cSuit: "blue",
                cVal: "drawtwo",
                cName: "blue Draw Two",
            },
            "0,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 0,
                cName: "green Zero",
            },
            "1,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 1,
                cName: "green One",
            },
            "2,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 2,
                cName: "green Two",
            },
            "3,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 3,
                cName: "green Three",
            },
            "4,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 4,
                cName: "green Four",
            },
            "5,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 5,
                cName: "green Five",
            },
            "6,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 6,
                cName: "green Six",
            },
            "7,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 7,
                cName: "green Seven",
            },
            "8,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 8,
                cName: "green Eight",
            },
            "9,G": {
                cKind: "number",
                cSuit: "green",
                cVal: 9,
                cName: "green Nine",
            },
            "S,G": {
                cKind: "action",
                cSuit: "green",
                cVal: "skip",
                cName: "green Skip",
            },
            "R,G": {
                cKind: "action",
                cSuit: "green",
                cVal: "reverse",
                cName: "green Reverse",
            },
            "D,G": {
                cKind: "action",
                cSuit: "green",
                cVal: "drawtwo",
                cName: "green Draw Two",
            },
            "W,W": {
                cKind: "wild",
                cSuit: "wild",
                cVal: "wild",
                cName: "Wild card",
            },
            "D,W": {
                cKind: "wild",
                cSuit: "wild",
                cVal: "wilddrawfour",
                cName: "Wild Draw Four",
            },

        }
    },
};



/*
 *
 *
 *
 * Courtesy Spaces
 *
 *
 *
 */