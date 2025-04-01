let player;
// create a function in setup that defines all the locations of env obj - stores into obstacles array
// create a function that draws all the env obj

//one array to store the hitboxes, and one array to store the draw locations.
let obstacles = [
  [
    // room 0
    { x: 207, y: 0, w: 593, h: 118 },
    { x: 662, y: 103, w: 138, h: 467 },
    { x: 207, y: 263, w: 215, h: 45 },
    { x: 207, y: 103, w: 117, h: 160 },
    { x: 566, y: 163, w: 1, h: 20 },
    { x: 354, y: 103, w: 213, h: 60 },
    { x: 0, y: 0, w: 207, h: 600 },
    { x: 207, y: 477, w: 169, h: 123 },
  ], //{ x: , y: , w: , h:  },
  [
    // room 1
    { x: 764, y: 120, w: 54, h: 38 },
    { x: 760, y: 523, w: 40, h: 77 },
    { x: 71, y: 578, w: 689, h: 22 },
    { x: 0, y: 0, w: 71, h: 600 },
    { x: 71, y: 0, w: 729, h: 16 },
    { x: 0, y: 382, w: 24, h: 48 },
    { x: 24, y: 349, w: 58, h: 48 },
    { x: 53, y: 315, w: 89, h: 34 },
    { x: 82, y: 292, w: 139, h: 23 },
    { x: 173, y: 254, w: 48, h: 19 },
    { x: 112, y: 273, w: 109, h: 19 },
    { x: 322, y: 254, w: 379, h: 61 },
    { x: 701, y: 266, w: 99, h: 53 },
  ],
  [
    // room 2
    { x: 0, y: 0, w: 376, h: 16 },
    { x: 662, y: 0, w: 138, h: 37 },
    { x: 0, y: 120, w: 13, h: 38 },
    { x: 0, y: 523, w: 800, h: 77 },
    { x: 0, y: 266, w: 478, h: 53 },
    { x: 478, y: 247, w: 105, h: 53 },
    { x: 583, y: 221, w: 64, h: 66 },
    { x: 647, y: 177, w: 76, h: 80 },
    { x: 723, y: 139, w: 77, h: 84 },
  ],
  [
    // room 3
    { x: 0, y: 523, w: 152, h: 77 },
    { x: 86, y: 0, w: 393, h: 12 },
    { x: 398, y: 569, w: 402, h: 31 },
    { x: 746, y: 216, w: 54, h: 284 },
    { x: 690, y: 51, w: 110, h: 165 },
    { x: 479, y: 0, w: 379, h: 51 },
    { x: 0, y: 0, w: 86, h: 37 },
    { x: 0, y: 139, w: 59, h: 84 },
    { x: 59, y: 125, w: 94, h: 54 },
    { x: 263, y: 66, w: 54, h: 83 },
    { x: 386, y: 0, w: 75, h: 49 },
    { x: 317, y: 0, w: 69, h: 98 },
  ],
  [
    // room 4
    { x: 760, y: 207, w: 54, h: 25 },
    { x: 252, y: 15, w: 454, h: 20 },
    { x: 0, y: 0, w: 800, h: 15 },
    { x: 0, y: 542, w: 322, h: 58 },
    { x: 522, y: 578, w: 278, h: 54 },
    { x: 0, y: 0, w: 59, h: 600 },
    { x: 59, y: 133, w: 59, h: 467 },
    { x: 118, y: 187, w: 78, h: 413 },
    { x: 196, y: 222, w: 46, h: 378 },
  ],
  [
    // room 5
    { x: 762, y: 265, w: 44, h: 102 },
    { x: 0, y: 0, w: 585, h: 15 },
    { x: 585, y: 0, w: 215, h: 45 },
    { x: 2, y: 207, w: 15, h: 25 },
    { x: 0, y: 542, w: 800, h: 90 },
  ],
  [
    // room 6
    { x: 0, y: 265, w: 13, h: 102 },
    { x: 0, y: 542, w: 694, h: 90 },
    { x: 694, y: 10, w: 106, h: 590 },
    { x: 398, y: 0, w: 402, h: 10 },
    { x: 0, y: 0, w: 152, h: 45 },
  ],
  [
    // room 7
    { x: 0, y: 0, w: 35, h: 376 },
    { x: 35, y: 0, w: 747, h: 5 },
    { x: 0, y: 372, w: 88, h: 228 },
    { x: 148, y: 533, w: 112, h: 67 },
    { x: 462, y: 579, w: 65, h: 21 },
    { x: 755, y: 364, w: 42, h: 65 },
    { x: 68, y: 460, w: 103, h: 140 },
    { x: 113, y: 410, w: 87, h: 50 },
    { x: 146, y: 360, w: 87, h: 50 },
    { x: 177, y: 310, w: 87, h: 50 },
    { x: 220, y: 260, w: 74, h: 50 },
    { x: 269, y: 218, w: 66, h: 42 },
    { x: 442, y: 136, w: 72, h: 48 },
    { x: 514, y: 125, w: 165, h: 30 },
    { x: 514, y: 0, w: 286, h: 125 },
  ],
  [
    // room 8
    { x: 0, y: 0, w: 236, h: 5 },
    { x: 236, y: 0, w: 86, h: 41 },
    { x: 522, y: 0, w: 278, h: 41 },
    { x: 747, y: 41, w: 53, h: 559 },
    { x: 727, y: 588, w: 20, h: 12 },
    { x: 283, y: 588, w: 302, h: 12 },
    { x: 59, y: 579, w: 65, h: 21 },
    { x: 0, y: 364, w: 10, h: 65 },
    { x: 0, y: 0, w: 242, h: 65 },
    { x: 0, y: 65, w: 61, h: 60 },
  ],
  [
    // room 9
    { x: 0, y: 0, w: 88, h: 600 },
    { x: 148, y: 4, w: 112, h: 48 },
    { x: 462, y: 0, w: 65, h: 29 },
    { x: 751, y: 31, w: 49, h: 97 },
    { x: 754, y: 276, w: 48, h: 48 },
    { x: 743, y: 441, w: 57, h: 74 },
    { x: 88, y: 580, w: 712, h: 20 },
    { x: 0, y: 272, w: 103, h: 328 },
    { x: 25, y: 138, w: 97, h: 134 },
    { x: 51, y: 69, w: 88, h: 69 },
    { x: 68, y: 0, w: 103, h: 69 },
    { x: 126, y: 108, w: 216, h: 234 },
    { x: 342, y: 134, w: 80, h: 176 },
    { x: 422, y: 161, w: 28, h: 149 },
    { x: 422, y: 161, w: 28, h: 149 },
  ],
  [
    // room 10
    { x: 59, y: 0, w: 65, h: 29 },
    { x: 283, y: 0, w: 302, h: 29 },
    { x: 727, y: 0, w: 20, h: 29 },
    { x: 747, 7: 0, w: 53, h: 547 },
    { x: 800, y: 547, w: 53, h: 800 },
    { x: 547, y: 516, w: 200, h: 31 },
    { x: 230, y: 500, w: 177, h: 47 },
    { x: 0, y: 441, w: 17, h: 106 },
    { x: 0, y: 276, w: 48, h: 48 },
    { x: 0, y: 31, w: 9, h: 97 },
  ],
];
let obstaclesCurrent = [...obstacles];

let envObj = [
  [
    // room 0
  ],
  [
    // room 1
    { x: 592, y: 112, type: "BUSH_BIG" },
    { x: 731, y: 130, type: "ROCK_SMALL" },
    { x: -72, y: 233, type: "BUSH_BIG" },
    { x: -20, y: 160, type: "ROCK_MEDIUM" },
    { x: -23, y: 520, type: "ROCK_BIG" },
    { x: 319, y: 539, type: "BUSH_BIG" },
    { x: 458, y: 504, type: "TREE_SMALL" },
    { x: 660, y: 482, type: "TREE_BIG" },
    { x: 608, y: 515, type: "ROCK_MEDIUM" },
    { x: 83, y: 524, type: "TREE_BIG" },
    { x: 207, y: 102, type: "ROCK_MEDIUM" },
    { x: 13, y: 353, type: "TREE_SMALL" },
    { x: -140, y: -57, type: "TREE_BIG" },
    { x: 339, y: 230, type: "TREE_BIG" },
    { x: 552, y: 353, type: "ROCK_MEDIUM" },
    { x: 267, y: 102, type: "BUSH_SMALL" },
  ],
  [
    // room 2
    { x: -125, y: 482, type: "TREE_BIG" },
    { x: 411, y: 456, type: "TREE_BIG" },
    { x: 666, y: 512, type: "BUSH_BIG" },
    { x: 265, y: 319, type: "BUSH_BIG" },
    { x: 113, y: 169, type: "BUSH_BIG" },
    { x: 82, y: 158, type: "ROCK_SMALL" },
    { x: 341, y: 490, type: "TREE_SMALL" },
    { x: 102, y: 440, type: "TREE_SMALL" },
    { x: 580, y: 383, type: "TREE_SMALL" },
    { x: 250, y: 507, type: "ROCK_MEDIUM" },
    { x: 301, y: 473, type: "BUSH_BIG" },
    { x: 272, y: 45, type: "ROCK_MEDIUM" },
    { x: 151, y: -6, type: "BUSH_BIG" },
    { x: -7, y: 121, type: "BUSH_SMALL" },
    { x: -18, y: -168, type: "TREE_BIG" },
    { x: -37, y: -64, type: "ROCK_BIG" },
    { x: 228, y: -143, type: "TREE_SMALL" },
    { x: 707, y: 429, type: "ROCK_BIG" },
  ],
  [
    // room 3
    { x: 631, y: 555, type: "BUSH_BIG" },
    { x: 471, y: 51, type: "ROCK_SMALL" },
    { x: 527, y: 68, type: "BUSH_SMALL" },
    { x: 493, y: 560, type: "TREE_SMALL" },
    { x: 579, y: 504, type: "ROCK_BIG" },
    { x: 397, y: 520, type: "ROCK_BIG" },
    { x: -6, y: 438, type: "TREE_SMALL" },
    { x: 101, y: 420, type: "BUSH_SMALL" },
    { x: 674, y: 401, type: "TREE_SMALL" },
    { x: 718, y: 325, type: "BUSH_BIG" },
    { x: 721, y: 272, type: "BUSH_SMALL" },
    { x: 673, y: 202, type: "ROCK_MEDIUM" },
    { x: 328, y: 267, type: "ROCK_MEDIUM" },
    { x: 653, y: 12, type: "TREE_SMALL" },
    { x: 375, y: 207, type: "BUSH_BIG" },
    { x: 425, y: 354, type: "TREE_BIG" },
    { x: -88, y: 429, type: "ROCK_BIG" },
  ],
  [
    // room 4
    { x: 695, y: 570, type: "ROCK_BIG" },
    { x: 522, y: 578, type: "ROCK_MEDIUM" },
    { x: 576, y: 544, type: "BUSH_BIG" },
    { x: 247, y: 94, type: "BUSH_SMALL" },
    { x: 731, y: 363, type: "TREE_SMALL" },
    { x: 296, y: 25, type: "ROCK_MEDIUM" },
    { x: 217, y: 533, type: "BUSH_SMALL" },
    { x: 592, y: 120, type: "ROCK_SMALL" },
    { x: 438, y: 418, type: "ROCK_SMALL" },
    { x: 385, y: 210, type: "TREE_BIG" },
    { x: 249, y: 443, type: "ROCK_BIG" },
    { x: 631, y: 196, type: "ROCK_BIG" },
    { x: 748, y: 211, type: "BUSH_SMALL" },
    { x: 333, y: 223, type: "BUSH_SMALL" },
    { x: 700, y: 523, type: "BUSH_SMALL" },
  ],
  [
    // room 5
    { x: 753, y: 348, type: "ROCK_SMALL" },
    { x: 596, y: 206, type: "ROCK_SMALL" },
    { x: 148, y: 289, type: "ROCK_SMALL" },
    { x: 484, y: 518, type: "BUSH_BIG" },
    { x: 244, y: 518, type: "TREE_SMALL" },
    { x: 374, y: 539, type: "ROCK_BIG" },
    { x: 472, y: 46, type: "ROCK_BIG" },
    { x: 577, y: 509, type: "TREE_BIG" },
    { x: -61, y: 533, type: "BUSH_SMALL" },
    { x: 665, y: 314, type: "BUSH_SMALL" },
    { x: 739, y: 265, type: "ROCK_MEDIUM" },
    { x: -40, y: 206, type: "BUSH_SMALL" },
    { x: 161, y: 533, type: "ROCK_MEDIUM" },
    { x: 47, y: 157, type: "ROCK_MEDIUM" },
    { x: 17, y: 515, type: "BUSH_BIG" },
    { x: 118, y: 136, type: "BUSH_BIG" },
    { x: 344, y: 350, type: "TREE_BIG" },
    { x: -69, y: 363, type: "TREE_SMALL" },
    { x: 330, y: 181, type: "TREE_SMALL" },
  ],
  [
    // room 6
    { x: 494, y: -39, type: "TREE_SMALL" },
    { x: 631, y: 432, type: "TREE_BIG" },
    { x: 688, y: 338, type: "ROCK_BIG" },
    { x: 161, y: 509, type: "TREE_BIG" },
    { x: 686, y: 146, type: "TREE_SMALL" },
    { x: 672, y: 4, type: "TREE_BIG" },
    { x: -219, y: 509, type: "TREE_BIG" },
    { x: 9, y: 538, type: "ROCK_MEDIUM" },
    { x: 92, y: 536, type: "BUSH_SMALL" },
    { x: 400, y: 423, type: "TREE_SMALL" },
    { x: 602, y: 236, type: "BUSH_BIG" },
    { x: 533, y: 530, type: "ROCK_BIG" },
    { x: 128, y: 302, type: "ROCK_BIG" },
    { x: 4, y: 309, type: "BUSH_BIG" },
    { x: -41, y: 349, type: "ROCK_SMALL" },
    { x: -56, y: 265, type: "ROCK_MEDIUM" },
    { x: 197, y: 177, type: "TREE_BIG" },
    { x: 393, y: 230, type: "BUSH_BIG" },
  ],
  [
    // room 7
    { x: 583, y: 522, type: "TREE_BIG" },
    { x: 456, y: 572, type: "BUSH_BIG" },
    { x: 462, y: 541, type: "ROCK_SMALL" },
    { x: 620, y: 364, type: "TREE_BIG" },
    { x: 564, y: 500, type: "ROCK_BIG" },
    { x: 495, y: 327, type: "ROCK_SMALL" },
    { x: 439, y: 126, type: "TREE_BIG" },
    { x: 135, y: 363, type: "TREE_SMALL" },
    { x: 292, y: 461, type: "ROCK_SMALL" },
    { x: 260, y: 384, type: "BUSH_BIG" },
    { x: 148, y: 105, type: "ROCK_BIG" },
  ],
  [
    // room 8
    { x: 183, y: -31, type: "ROCK_BIG" },
    { x: 31, y: 130, type: "ROCK_MEDIUM" },
    { x: 87, y: 116, type: "BUSH_BIG" },
    { x: -43, y: 501, type: "TREE_SMALL" },
    { x: -196, y: 364, type: "TREE_BIG" },
    { x: 359, y: 157, type: "TREE_SMALL" },
    { x: 476, y: 118, type: "ROCK_BIG" },
    { x: 277, y: 520, type: "TREE_SMALL" },
    { x: 305, y: 421, type: "TREE_BIG" },
    { x: 35, y: 433, type: "ROCK_BIG" },
    { x: 148, y: 452, type: "ROCK_SMALL" },
    { x: 466, y: 76, type: "BUSH_BIG" }, //
    { x: 139, y: 399, type: "BUSH_SMALL" },
    { x: 157, y: 313, type: "BUSH_BIG" },
    { x: 234, y: 146, type: "ROCK_SMALL" },
    { x: 112, y: 339, type: "ROCK_SMALL" },
  ],
  [
    // room 9
    { x: -174, y: -85, type: "TREE_BIG" },
    { x: 143, y: 75, type: "ROCK_SMALL" },
    { x: 696, y: 276, type: "BUSH_BIG" },
    { x: 631, y: 248, type: "BUSH_SMALL" },
    { x: 586, y: 172, type: "ROCK_MEDIUM" },
    { x: -56, y: 460, type: "TREE_BIG" },
    { x: 168, y: 511, type: "ROCK_MEDIUM" },
    { x: 248, y: 560, type: "BUSH_SMALL" },
    { x: 444, y: 460, type: "TREE_BIG" },
    { x: 331, y: 515, type: "ROCK_BIG" },
    { x: 84, y: 441, type: "BUSH_BIG" },
    { x: 523, y: -34, type: "TREE_BIG" },
    { x: -75, y: 128, type: "BUSH_SMALL" },
    { x: 152, y: 24, type: "BUSH_SMALL" },
    { x: 177, y: 386, type: "BUSH_SMALL" },
    { x: 709, y: -13, type: "BUSH_BIG" },
    { x: 456, y: -22, type: "BUSH_BIG" },
    { x: 660, y: 441, type: "TREE_SMALL" },
    { x: 660, y: 441, type: "TREE_SMALL" },
    { x: 559, y: -32, type: "ROCK_BIG" },
    { x: 104, y: 99, type: "OWL_TREE" },
  ],
  [
    // room 10
    { x: 663, y: 247, type: "ROCK_SMALL" },
    { x: 286, y: 288, type: "ROCK_SMALL" },
    { x: 195, y: 222, type: "BUSH_BIG" },
    { x: 327, y: 233, type: "BUSH_SMALL" },
    { x: -258, y: -34, type: "TREE_BIG" },
    { x: 607, y: 424, type: "TREE_BIG" },
    { x: 379, y: 374, type: "BUSH_SMALL" },
    { x: 445, y: 313, type: "ROCK_BIG" },
    { x: 507, y: 296, type: "BUSH_SMALL" },
    { x: -100, y: 276, type: "BUSH_BIG" },
    { x: -43, y: -96, type: "TREE_SMALL" },
    { x: 49, y: 68, type: "BUSH_SMALL" },
    { x: 137, y: 62, type: "ROCK_SMALL" },
    { x: 687, y: 262, type: "TREE_SMALL" },
    { x: 38, y: 239, type: "ROCK_MEDIUM" },
    { x: 277, y: -77, type: "TREE_SMALL" },
    { x: 409, y: 38, type: "ROCK_MEDIUM" },
    { x: 129, y: 363, type: "TREE_SMALL" },
    { x: 432, y: -13, type: "BUSH_BIG" },
    { x: 305, y: -175, type: "TREE_BIG" },
    { x: 619, y: 54, type: "TREE_BIG" },
    { x: 724, y: -34, type: "ROCK_BIG" },
    { x: 101, y: 172, type: "ROCK_BIG" },
  ],
];
let envObjCurrent = [...envObj];

// need 3 arrays of 3 different level objectives
// change sticks show into objectives show?
// make a function that runs only once each time it switches to a new level, to initialize the objectivesShow into the current level's objective objects
let belongings = [
  { x: 442, y: 452, w: 50, h: 50, type: 3 }, // waterbottle
  { x: 706, y: 420, w: 50, h: 50, type: 0 }, // flashlight
  { x: 50, y: 199, w: 50, h: 50, type: 4 }, // bunny slippers
  { x: 82, y: 71, w: 50, h: 50, type: 1 }, //binoculars
  { x: 128, y: 49, w: 50, h: 50, type: 2 }, // sketchbook
];

let sticks = [
  { x: 118, y: 99, w: 45, h: 24, type: 6 }, // room 4
  { x: 260, y: 461, w: 45, h: 24, type: 6 }, // room 5
  { x: 599, y: 351, w: 45, h: 24, type: 6 }, // room 6
  { x: 260, y: 252, w: 45, h: 24, type: 6 }, // room 8
  { x: 416, y: 397, w: 45, h: 24, type: 6 }, // room 9
];

let worms = [
  { x: 278, y: 456, w: 50, h: 34, type: 7 }, // room 3
  { x: 293, y: 346, w: 50, h: 34, type: 7 }, // room 4
  { x: 95, y: 247, w: 50, h: 34, type: 7 }, // room 7
  { x: 628, y: 133, w: 50, h: 34, type: 7 }, // room 8
  { x: 49, y: 453, w: 50, h: 34, type: 7 }, // room 10
];

let jackets = [
  { x: 339, y: 425, w: 50, h: 50, type: 8 }, // room 1
  { x: 486, y: 504, w: 50, h: 50, type: 8 }, // room 4
  { x: 215, y: 110, w: 50, h: 50, type: 8 }, // room 10
];

let headphones = [
  { x: 76, y: 186, w: 50, h: 50, type: 8 }, // room 6
  { x: 483, y: 410, w: 50, h: 50, type: 8 }, // room 7
  //{ x: 338, y: 338, w: 50, h: 50, type: 8 }, // room 10
];

let objectives = [...belongings];
let objectivesShow = new Array(belongings.length).fill(true);
let objectivesCurrent = [...belongings];
let objectivesShowCurrent = [...objectivesShow];

let objectivesCounter = 0;
let objectivesTotal = belongings.length;

let jacketsShow = new Array(jackets.length).fill(true);
let jacketsShowCurrent = [...jacketsShow];
let jacketsCurrent = [...jackets];

let headphonesShow = new Array(headphones.length).fill(true);
let headphonesShowCurrent = [...headphonesShow];
let headphonesCurrent = [...headphones];

let thorns = [
  { x: 148, y: 29, w: 90, h: 52 }, // room 1
  { x: 200, y: 129, w: 90, h: 52 }, // room 2
  { x: 400, y: 339, w: 90, h: 52 }, // room 3
  { x: 522, y: 68, w: 90, h: 52 }, //room 4
  { x: 560, y: 405, w: 90, h: 52 },
  { x: 253, y: 212, w: 90, h: 52 }, // room 5
  { x: 97, y: 418, w: 90, h: 52 },
  { x: 554, y: 157, w: 90, h: 52 },
  { x: 152, y: 484, w: 90, h: 52 }, // room 6
  { x: 74, y: 94, w: 90, h: 52 },
  { x: 490, y: 184, w: 90, h: 52 },
  { x: 217, y: 53, w: 90, h: 52 }, // room 7
  { x: 568, y: 363, w: 90, h: 52 },
  { x: 510, y: 284, w: 90, h: 52 }, // room 8
  { x: 643, y: 451, w: 90, h: 52 },
  { x: 418, y: 75, w: 90, h: 52 }, // room 9
  { x: 591, y: 409, w: 90, h: 52 },
  { x: 327, y: 160, w: 90, h: 52 }, // room 10
  { x: 379, y: 285, w: 90, h: 52 },
];
let thornsCurrent = [...thorns];

let maxHealth = 5;
let health = maxHealth;

function initializeCols() {
  // Initialize player
  player = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: 30,
    h: 70,
    speed: 3.5,
  };
  for (let i = 0; i < envObj.length; i++) {
    envObj[i] = envObj[i].reverse();
  }

  // initialize collisions for envObj from the array
  for (let i = 0; i < envObj.length; i++) {
    let room = envObj[i];

    for (let j = 0; j < room.length; j++) {
      let env = room[j];

      if (env.type == "TREE_BIG") {
        obstacles[i].push({ x: 65 + env.x, y: 27 + env.y, w: 66, h: 119 });
        obstacles[i].push({ x: 42 + env.x, y: 52 + env.y, w: 29, h: 31 });
        obstacles[i].push({ x: 87 + env.x, y: 8 + env.y, w: 82, h: 31 });
        obstacles[i].push({ x: 15 + env.x, y: 72 + env.y, w: 66, h: 75 });
        obstacles[i].push({ x: 172 + env.x, y: 31 + env.y, w: 66, h: 75 });
        obstacles[i].push({ x: 254 + env.x, y: 73 + env.y, w: 31, h: 54 });
        obstacles[i].push({ x: 173 + env.x, y: 49 + env.y, w: 78, h: 98 });
        obstacles[i].push({ x: 119 + env.x, y: 25 + env.y, w: 60, h: 150 });
      } else if (env.type == "TREE_SMALL") {
        obstacles[i].push({ x: 149 + env.x, y: 91 + env.y, w: 9, h: 20 });
        obstacles[i].push({ x: 41 + env.x, y: 31 + env.y, w: 13, h: 10 });
        obstacles[i].push({ x: 19 + env.x, y: 67 + env.y, w: 12, h: 13 });
        obstacles[i].push({ x: 149 + env.x, y: 111 + env.y, w: 18, h: 30 });
        obstacles[i].push({ x: 138 + env.x, y: 36 + env.y, w: 11, h: 109 });
        obstacles[i].push({ x: 120 + env.x, y: 17 + env.y, w: 18, h: 128 });
        obstacles[i].push({ x: 106 + env.x, y: 9 + env.y, w: 14, h: 136 });
        obstacles[i].push({ x: 8 + env.x, y: 80 + env.y, w: 23, h: 65 });
        obstacles[i].push({ x: 31 + env.x, y: 41 + env.y, w: 23, h: 104 });
        obstacles[i].push({ x: 54 + env.x, y: 12 + env.y, w: 29, h: 133 });
        obstacles[i].push({ x: 83 + env.x, y: 1 + env.y, w: 23, h: 161 });
      } else if (env.type == "BUSH_BIG") {
        obstacles[i].push({ x: 37 + env.x, y: 15 + env.y, w: 23, h: 16 });
        obstacles[i].push({ x: 58 + env.x, y: 6 + env.y, w: 57, h: 25 });
        obstacles[i].push({ x: 116 + env.x, y: 15 + env.y, w: 12, h: 16 });
      } else if (env.type == "BUSH_SMALL") {
        obstacles[i].push({ x: 25 + env.x, y: env.y, w: 56, h: 1 });
      } else if (env.type == "ROCK_BIG") {
        obstacles[i].push({ x: 16 + env.x, y: 45 + env.y, w: 6, h: 12 });
        obstacles[i].push({ x: 22 + env.x, y: 32 + env.y, w: 8, h: 23 });
        obstacles[i].push({ x: 30 + env.x, y: 21 + env.y, w: 10, h: 36 });
        obstacles[i].push({ x: 112 + env.x, y: 45 + env.y, w: 6, h: 12 });
        obstacles[i].push({ x: 40 + env.x, y: 10 + env.y, w: 11, h: 47 });
        obstacles[i].push({ x: 104 + env.x, y: 26 + env.y, w: 9, h: 31 });
        obstacles[i].push({ x: 92 + env.x, y: 13 + env.y, w: 12, h: 44 });
        obstacles[i].push({ x: 84 + env.x, y: 7 + env.y, w: 8, h: 50 });
        obstacles[i].push({ x: 50 + env.x, y: 2 + env.y, w: 34, h: 55 });
      } else if (env.type == "ROCK_MEDIUM") {
        obstacles[i].push({ x: 17 + env.x, y: 13 + env.y, w: 11, h: 11 });
        obstacles[i].push({ x: 59 + env.x, y: 15 + env.y, w: 7, h: 17 });
        obstacles[i].push({ x: 6 + env.x, y: 24 + env.y, w: 22, h: 9 });
        obstacles[i].push({ x: 66 + env.x, y: 29 + env.y, w: 28, h: 4 });
        obstacles[i].push({ x: 28 + env.x, y: env.y, w: 33, h: 33 });
      } else if (env.type == "ROCK_SMALL") {
        obstacles[i].push({ x: 14 + env.x, y: env.y, w: 38, h: 1 });
      }
    } // obstacles[i].push({ x: + env.x, y:  + env.y, w: , h:  });
  }
}

// checks if the player can move or not and return boolean value
function canMove(newX, newY) {
  // Create temporary player rectangle
  let playerRect = {
    x: newX,
    y: newY,
    w: player.w,
    h: player.h,
  };

  // Check against all obstacles
  for (let obs of obstaclesCurrent) {
    if (rectCollision(playerRect, obs)) {
      return false;
    }
  }
  return true;
}

// checks the collision between 2 rectangular objects
function rectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}

// draws the background objects
// also debugging function that draws shapes to show the hitbox of obstacles and character
function backgroundDrawCols() {
  push();
  imageMode(CORNER);
  // draw the environment objects
  for (let env of envObjCurrent) {
    if (env.type == "TREE_BIG") {
      image(envObjImage[0], env.x, env.y);
    } else if (env.type == "TREE_SMALL") {
      image(envObjImage[1], env.x, env.y);
    } else if (env.type == "BUSH_BIG") {
      image(envObjImage[2], env.x, env.y);
    } else if (env.type == "BUSH_SMALL") {
      image(envObjImage[3], env.x, env.y);
    } else if (env.type == "ROCK_BIG") {
      image(envObjImage[4], env.x, env.y);
    } else if (env.type == "ROCK_MEDIUM") {
      image(envObjImage[5], env.x, env.y);
    } else if (env.type == "ROCK_SMALL") {
      image(envObjImage[6], env.x, env.y);
    } else if (env.type == "OWL_TREE") {
      image(envObjImage[7], env.x, env.y);
    }
  }
  noStroke();
  // debugging for hitboxes
  if (debuggingHitboxes) {
    fill(255, 0, 0, 100);
    for (let obs of obstaclesCurrent) {
      rect(obs.x, obs.y, obs.w, obs.h);
    }
    fill(0, 255, 0, 100);
    rect(playerPos.colX, playerPos.colY, 30, 70);
  }

  pop();

  push();
  imageMode(CORNER);
  objectivesDraw();
  thornsDraw();
  if (currentLevel == 2 || currentLevel == 3) {
    jacketsDraw();
    if (currentLevel == 3) {
      headphonesDraw();
    }
  }

  pop();
}

function thornsDraw() {
  push();
  fill(0);
  thornsCol();
  for (let thr of thornsCurrent) {
    image(thornsImage, thr.x - 10, thr.y);
    if (debuggingHitboxes) {
      fill(0, 0, 255, 100);
      rect(thr.x, thr.y, thr.w, thr.h);
    }
  }
  pop();
  updateThornsHit();
}
let firstThorns = true;

let thornsHit = false;
let previousThornsHit = false;

function thornsCol() {
  let playerRect = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: player.w,
    h: player.h,
  };
  thornsHit = false;
  for (let thr of thornsCurrent) {
    if (rectCollision(playerRect, thr)) {
      thornsHit = true;
    }
  }
}

function updateThornsHit() {
  // Call this every frame to detect changes
  detectThornsReset();
}

function detectThornsReset() {
  if (previousThornsHit && !thornsHit) {
    if (firstThorns) {
      runDialogue(9);
    }
    if (hitboxesOn) {
      if (wearingJacket) {
        health -= 0.5;
      } else {
        health--;
      }
      firstThorns = false;
    }
    if (wearingJacket) {
      hitThornsCounter++;
    }
  }
  // Update previous state
  previousThornsHit = thornsHit;
  if (hitThornsCounter > 2) {
    hitThornsCounter = 0;
    wearingJacket = false;
  }
}

let hitThornsCounter = 0;

let level = 0; // 0 is prologue, then levels 1, 2, 3

let objectiveHit = false;
let previousObjectiveHit = false;

function objectivesDraw() {
  push();
  fill(0, 100);
  objectivesCol();
  for (let i = 0; i < objectivesCurrent.length; i++) {
    let obj = objectivesCurrent[i]; // Get the current element
    if (objectivesShowCurrent[i]) {
      if (currentLevel == 1) {
        image(groundItemsImage[obj.type], obj.x, obj.y);
      } else if (currentLevel == 2) {
        image(stickImage, obj.x, obj.y);
      } else if (currentLevel == 3) {
        image(wormImage, obj.x, obj.y);
      }
      if (debuggingHitboxes) {
        rect(obj.x, obj.y, obj.w, obj.h);
      }
    }
  }
  pop();
}
//collision for objectives

function objectivesCol() {
  let playerRect = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: player.w,
    h: player.h,
  };
  objectiveHit = false;
  for (let i = 0; i < objectives.length; i++) {
    let obj = objectives[i];
    if (rectCollision(playerRect, obj)) {
      if (
        roomObjectivesIndices[currentRoom]?.includes(i) &&
        objectivesShow[i]
      ) {
        objectiveHit = true;
        newItem = obj.type;
        if (obj.type == 0) {
          runDialogue(4);
        } else if (obj.type == 1) {
          runDialogue(5);
        } else if (obj.type == 2) {
          runDialogue(6);
        } else if (obj.type == 3) {
          runDialogue(7);
        } else if (obj.type == 4) {
          runDialogue(8);
        }
      }
      // special stick
      if (currentRoom == 9 && currentLevel == 2 && objectivesShow[i]) {
        // start cutscene
        specialCutscene = true;
        cutscene = true;
        playGame = false;
      }

      updateObjectivesShow(currentRoom, i);
    }
  }
  if (objectiveHit && !previousObjectiveHit) {
    if (currentLevel !== 2 && objectivesCounter !== objectivesTotal) {
      ifNewItem = true;
    }
  }
  previousObjectiveHit = objectiveHit;
  // counts how many objective items the player has collected
  objectivesCounter = 0;
  for (let i = 0; i < objectivesShow.length; i++) {
    if (!objectivesShow[i]) {
      objectivesCounter++;
      addToInventory(objectives[i].type);
    }
  }
}

let headphonesHit = false;
let previousHeadphonesHit = false;

function headphonesDraw() {
  push();
  fill(0, 100);
  headphonesCol();
  for (let i = 0; i < headphonesCurrent.length; i++) {
    let hdp = headphonesCurrent[i]; // Get the current element
    if (headphonesShowCurrent[i]) {
      if (headphonesStage < 2) {
        image(headphonesImage[headphonesStage], hdp.x, hdp.y);
      }
    }
  }
  pop();
}
//collision for objectives
function headphonesCol() {
  let playerRect = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: player.w,
    h: player.h,
  };
  headphonesHit = false;

  for (let i = 0; i < headphones.length; i++) {
    let hdp = headphones[i];
    if (rectCollision(playerRect, hdp)) {
      if (roomHeadphonesIndices[currentRoom]?.includes(i)) {
        headphonesHit = true;
        headphonesShow[i] = false;
      }
    }
  }
  if (headphonesHit && !previousHeadphonesHit && headphonesShowCurrent[0]) {
    if (headphonesStage == 0) {
      newItem = 9;
    } else if (headphonesStage == 1) {
      newItem = 10;
    }
    addToInventory(9);
    ifNewItem = true;
    //headphonesStage = min(headphonesStage + 1, 2);
  }
  previousHeadphonesHit = headphonesHit;
}

let jacketsHit = false;
let previousJacketsHit = false;

function jacketsDraw() {
  push();
  fill(0, 100);
  jacketsCol();
  for (let i = 0; i < jacketsCurrent.length; i++) {
    let jkt = jacketsCurrent[i]; // Get the current element
    if (jacketsShowCurrent[i]) {
      image(jacketImage, jkt.x, jkt.y);
    }
  }
  pop();
}
//collision for objectives
function jacketsCol() {
  let playerRect = {
    x: playerPos.colX,
    y: playerPos.colY,
    w: player.w,
    h: player.h,
  };
  jacketsHit = false;

  for (let i = 0; i < jackets.length; i++) {
    let jkt = jackets[i];
    if (rectCollision(playerRect, jkt)) {
      if (roomJacketsIndices[currentRoom]?.includes(i)) {
        jacketsHit = true;
        jacketsShow[i] = false;
        newItem = 8;
      }
    }
  }
  if (jacketsHit && !previousJacketsHit && jacketsShowCurrent[0]) {
    addToInventory(8);
    ifNewItem = true;
    /*
    if (wearingJacket) {
      addToInventory(8);
    } else {
      wearingJacket = true;
    }*/
  }
  previousJacketsHit = jacketsHit;
}

// defines which objectives in the array is in which room
let roomObjectivesIndices = {
  0: [0], // Room 0 affects index 0
  1: [1], // Room 1 affects indices 1 and 2 separately
  2: [2, 3],
  3: [4],
};

let roomJacketsIndices = Object.fromEntries(
  Array.from({ length: 11 }, (_, i) => [i, []])
);

// Manually assign the indices that should have values
roomJacketsIndices[1] = [0];
roomJacketsIndices[4] = [1];
roomJacketsIndices[10] = [2];

let roomHeadphonesIndices = Object.fromEntries(
  Array.from({ length: 11 }, (_, i) => [i, []])
);

// Manually assign the indices that should have values
roomHeadphonesIndices[6] = [0];
roomHeadphonesIndices[7] = [1];
roomHeadphonesIndices[10] = [2];

function updateObjectivesShow(currentRoom, objIndex) {
  if (roomObjectivesIndices[currentRoom]?.includes(objIndex)) {
    objectivesShow[objIndex] = false;
  }
}

function addToInventory(itemType) {
  // Check if the item is already in the inventory
  let existingItem = inventoryArr.find((item) => item.type === itemType);
  let quant;
  let ifUsable;
  if (itemType == 9 || itemType == 10) {
    if (headphonesStage == 0) {
      // no headphones
      // add stage 1 headphones
      inventoryArr.push({
        type: 9,
        quantity: 1,
        usable: true,
      });
      headphonesStage = 1;
    } else if (headphonesStage == 1) {
      // headphones 1
      // add stage 2 headphones
      inventoryArr.push({
        type: 10,
        quantity: 1,
        usable: true,
      });
      headphonesStage = 2;
    }
  } else {
    if (itemType == 8) {
      quant = 1;
    } else if (itemType !== 5) {
      if (currentLevel == 1) {
        quant = 1;
      } else if (currentLevel == 2 || currentLevel == 3) {
        quant = objectivesCounter;
      }
    } else {
      quant = 1;
    }
    // if item is health kit, set to usable
    if (itemType == 5 || itemType == 8) {
      ifUsable = true;
    } else {
      ifUsable = false;
    }
    if (inventoryArr.length <= 6) {
      if (existingItem) {
        if (itemType !== 5 && itemType !== 8) {
          existingItem.quantity = quant; // Increase quantity if already collected
        } else {
          existingItem.quantity += 1;
        }
      } else {
        inventoryArr.push({
          type: itemType,
          quantity: quant,
          usable: ifUsable,
        }); // Add new item
      }
    }
  }
}

let newItem = 3;
let ifNewItem = false;
