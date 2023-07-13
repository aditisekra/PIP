
let app;
let player;
let keys = {};
let bg;
let texbutton;
let startButton;
let random_x;
let random_y;
let j;
let enemyStore;
// let ob = [1, 2, 3, 4];
let makeEnemy = new Map();
let cont1, cont2;
let emitter;
let enemycount=1;

window.onload = function () {

    app = new PIXI.Application(
        {
            width: 500,
            height: 500,
            backgroundColor: 0xAAAAAA,
        }
    );
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);

    //container and intro image
    cont1 = new PIXI.Container();
    cont1.visible = true;

    bg = PIXI.Sprite.from("images/bgg.png");
    bg.anchor.set(0);
    bg.x = app.screen.x;
    bg.y = app.screen.y;
    bg.width = app.view.width;
    bg.height = app.view.height;
    app.stage.addChild(cont1);
    cont1.addChild(bg);


    //intro text
    let text = new PIXI.Text(
        "FLYING FLASH",
        {
            anchor: 0.5,
            font: "Arial",
            fill: "white",
        });
    text.x = 500;
    text.y = 400;
    text.scale.x = 2;
    text.scale.y = 2;
    cont1.addChild(text);

    //startButton to start the game
    startButton = PIXI.Sprite.from("images/start.png")
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.anchor.set(0.5);
    startButton.x = 900;
    startButton.y = 650;
    startButton.scale.x = 0.5;
    startButton.scale.y = 0.5;
    cont1.addChild(startButton);
    startButton.on('pointerdown', onButtonDown)


    cont2 = new PIXI.Container();
    app.stage.addChild(cont2);
    cont2.visible = false;
    //moving background
    bg1 = PIXI.Sprite.from("images/bg.jpg");
    bg1.anchor.set(0);
    bg1.x = app.screen.x;
    bg1.y = app.screen.y;
    bg1.width = app.view.width;
    bg1.height = app.view.height;

    bg2 = PIXI.Sprite.from("images/bg.jpg");
    bg2.anchor.set(0);
    bg2.x = app.view.width;
    bg2.y = app.screen.y;
    bg2.width = app.view.width;
    bg2.height = app.view.height;
    cont2.addChild(bg1);
    cont2.addChild(bg2);



    // //aeroplane object
    player = PIXI.Sprite.from("images/aeroplane.png");
    player.anchor.set(0.5);
    player.x = app.view.width / 12;
    player.y = app.view.height / 4;
    player.scale.x = 0.35;
    player.scale.y = 0.35;
    cont2.addChild(player);
    
    enemies("images/savitar.png");
    enemies("images/zoom.png");
    enemies("images/godspeed.png");
    enemies("images/reverseflash.png");
    


    fall = PIXI.Sprite.from("images/fall.png");
    fall.anchor.set(0.5);
    fall.scale.x = 0.25;
    fall.scale.y = 0.25;

    fall.acceleration = new PIXI.Point(0);



    //mouse interaction
    cont2.interactive = true;
    cont2.on("pointermove", movePlayer)
    window.addEventListener("keydown", keysdown);
    window.addEventListener("keyup", keysup);
    window.addEventListener("keyforward", keysforward)
    random();
}


function enemies(path){
   let  object = PIXI.Sprite.from(path);
    object.anchor.set(0.5);
    object.scale.x = 0.3;
    object.scale.y = 0.3;
    object.acceleration = new PIXI.Point(0);
    makeEnemy.set("ob"+enemycount,object)
    cont2.addChild(object);
    //cont2.addChild(object);
    enemycount++;
    if(enemycount===5){
        enemycount=1;
    }
}


function movingobj() {
    j = Math.floor(Math.random() * 4) + 1;
    setInterval(movingobj12, 5000);
    setInterval(movingobj23, 8000);
    random_x = Math.floor(Math.random() * (1800 - 400 + 1) + 400);
    random_y = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    let enemyStore = makeEnemy.get("ob"+j);
    enemyStore.x = app.view.width;
    enemyStore.y = random_y;
    app.ticker.add(function () {
        if (enemyStore.x <= (-app.screen.width)) {
            enemyStore.x = app.view.width;
        }
        enemyStore.x -= 1;
    })
}
function movingobj12() {
    j = Math.floor(Math.random() * 4) + 1;
    //   setInterval(movingobj12, 3000);
    random_x = Math.floor(Math.random() * (1800 - 400 + 1) + 400);
    random_y = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    enemyStore = makeEnemy.get("ob" + j);
    enemyStore.x = app.view.width;
    enemyStore.y = random_y;
    app.ticker.add(function () {
        if (enemyStore.x <= (-app.screen.width)) {
            enemyStore.x = app.view.width;
        }
        enemyStore.x -= 1;
    })
}
function movingobj23() {
    j = Math.floor(Math.random() * 4) + 1;
    random_x = Math.floor(Math.random() * (1800 - 400 + 1) + 400);
    random_y = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    let enemyStore = makeEnemy.get("ob" + j);
    enemyStore.x = app.view.width;
    enemyStore.y = random_y;
    app.ticker.add(function () {
        if (enemyStore.x <= (-app.screen.width)) {
            enemyStore.x = app.view.width;
        }
        enemyStore.x -= 1;
    })
}


function movingTicker() {
    app.ticker.add(function () {
        //makeEnemy.get("ob1").acceleration.set(makeEnemy.get("ob1").acceleration.x * 0.99, makeEnemy.get("ob1").acceleration.y * 0.99);
        // ob2.acceleration.set(ob2.acceleration.x * 0.99, ob2.acceleration.y * 0.99);
        // ob3.acceleration.set(ob3.acceleration.x * 0.99, ob3.acceleration.y * 0.99);
        // ob4.acceleration.set(ob4.acceleration.x * 0.99, ob4.acceleration.y * 0.99);
        // if (enemyStore.x <= (-app.screen.width)) {
        //     enemyStore.x = app.view.width;
        // }
        //  // enemyStore.x -= 1; 
        if (testForAABB(player, makeEnemy.get("ob1"))) {
            fallflash();
        }
    })
}


function fallflash() {
    cont2.addChild(fall);
    fall.x = player.x;
    fall.y = app.view.height;
    player.visible = false;
    // particle();
}

function keysdown(e) {
    keys[e.keyCode] = true;
}
function keysforward(e) {
    keys[e.keyCode] = false;
}
function keysup(e) {
    keys[e.keyCode] = false;
}


function gameloop() {
    if (keys["39"]) {
        player.x += 5;
    }
    if (keys["38"]) {
        player.y -= 5
    }
    if (keys["40"]) {
        player.y += 5
    }
}


function onButtonDown() {
    cont1.visible = false;
    cont2.visible = true
    startgame();
    startButton.visible = false;
    app.ticker.add(gameloop);
}

function random() {
    // movingobj();
}

function movePlayer(e) {
    let pos = e.data.global;
}

function startgame() {
    // setInterval(movingobj, 3000);
    movingobj();
    for (let i = 0; i < 10; i++) {
        app.ticker.add(function () {
            if (bg2.x <= (-app.screen.width)) {
                bg2.x = app.view.width;
            }
            if (bg1.x <= (-app.screen.width)) {
                bg1.x = app.view.width;
            }
            bg1.x -= 1
            bg2.x -= 1

        })
    }
    player.x += 5;
}

function particle() {
    emitter = new PIXI.particles.Emitter(cont2,
        [PIXI.Sprite.from("images/particle.png")],
        {
            "alpha": {
                "start": 0.74,
                "end": 0
            },
            "scale": {
                "start": 0.54,
                "end": 1.2,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#ffdfa0",
                "end": "#100f0c"
            },
            "speed": {
                "start": 700,
                "end": 0,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 200
            },
            "lifetime": {
                "min": 0.5,
                "max": 1
            },
            "blendMode": "normal",
            "ease": [
                {
                    "s": 0,
                    "cp": 0.329,
                    "e": 0.548
                },
                {
                    "s": 0.548,
                    "cp": 0.767,
                    "e": 0.876
                },
                {
                    "s": 0.876,
                    "cp": 0.985,
                    "e": 1
                }
            ],
            "frequency": 0.001,
            "emitterLifetime": 0.1,
            "maxParticles": 100,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": true,
            "spawnType": "point"
        }
    );
    emitter.emit = true;
    emitter.x=player.x;
    emitter.y=player.y;
}


//test for hit
function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;

}