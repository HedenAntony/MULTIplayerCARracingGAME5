class Game {
    constructor() {

    }
    getState() {
        var gameStateRef = database.ref("gameState")
        gameStateRef.on("value", function(data) {
            gameState = data.val();


        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }
    start() {
        if (gameState === 0) {
            form = new Form()
            form.display();
            player = new Player()
            player.getCount();
        }

        car1 = createSprite(100, 200);
        car1.addImage(car1Img);
        car2 = createSprite(300, 200);
        car2.addImage(car2Img);
        car3 = createSprite(500, 200);
        car3.addImage(car3Img);
        car4 = createSprite(700, 200);
        car4.addImage(car4Img);

        cars = [car1, car2, car3, car4]

    }
    play() {
        form.hide();
        textSize(30);
        stroke("skyblue");
        fill("blue")
        text("GAME START", 120, 100);

        image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);



        Player.getPlayerInfo();



        if (allPlayers !== undefined) {
            //var display_position=130;

            //index of the cars array
            var index = 0

            //x and y position of the cars
            var x = 150;
            var y;

            for (var plr in allPlayers) {

                //add 1 to the index for every loop
                index = index + 1

                //position the cars  a little away from each other in x direction
                x = x + 200;

                //use data from the database to display the cars in y direction
                y = displayHeight - allPlayers[plr].distance

                if (index === player.index) {
                    cars[index - 1].shapeColor = "red"
                    camera.position.x = displayWidth / 2;
                    camera.position.y = cars[index - 1].y;
                } else {
                    cars[index - 1].shapeColor = "black"
                }

                cars[index - 1].x = x;
                cars[index - 1].y = y;


                /* display_position+=20;
                 textSize(15);
                 text(allPlayers[plr].name+": "+allPlayers[plr].distance,120,display_position)*/
            }
        }

        if (keyIsDown(UP_ARROW) && player.index != null) {
            player.distance += 20;
            player.update();
        }
        if (player.distance > 4760) {
            gameState = 2;
            this.update(2);

        }

        drawSprites();
    }
    end() {
        console.log("GAME ENDED");
    }
}