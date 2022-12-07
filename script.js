window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const canvas_width = canvas.width = 600
    const canvas_height = canvas.height = 600
    const player = new Image()
    player.src = 'assets/shadow_dog.png';
    const spriteWidth = 575;
    const spriteHeight = 523;
    let frameX = 0;
    let frameY = 0;
    let maxFrame = 6;
    let maxInterval = 30;

    class InputHandler{
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if(e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4'
                || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8'
                || e.key === '9' || e.key === '0'){
                    this.changeAnimation(e.key)
                }
            });
            window.addEventListener('keyup', e => {
                if(this.game.keys.indexOf(e.key)>-1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key),1);
                }
            })
        }
        changeAnimation(key){
            frameX = 0;
            if(key === '1'){
                frameY = 1;
                maxFrame = 6;
                maxInterval = 30;
            }else if(key === '2'){
                frameY = 2;
                maxFrame = 6;
                maxInterval = 30;
            }else if(key === '3'){
                frameY = 3;
                maxFrame = 8;
                maxInterval = 27;
            }else if(key === '4'){
                frameY = 4;
                maxFrame = 10;
                maxInterval = 42;
            }else if(key === '5'){
                frameY = 5;
                maxFrame = 4;
                maxInterval = 23;
            }else if(key === '6'){
                frameY = 6;
                maxFrame = 6;
                maxInterval = 29;
            }else if(key === '7'){
                frameY = 7;
                maxFrame = 6;
                maxInterval = 35;
            }else if(key === '8'){
                frameY = 8;
                maxFrame = 11;
                maxInterval = 35;
            }else if(key === '0'){
                frameY = 9;
                maxFrame = 3;
                maxInterval = 50;
            }else{
                frameY = 0;
                maxFrame = 6;
                maxInterval = 30;
            }
        }
    }
    class UI{
        constructor(game){
            this.game = game;
            this.fontSize = 14;
            this.color = 'black';
            this.fontFamily = 'Arial';
            this.animations = [
                '1: Salto',
                '2: Caida',
                '3: Correr',
                '4: Dormir',
                '5: Sentar',
                '6: Rodar',
                '7: Comer',
                '8: Acostar',
                '9: Parar',
                '0: Herido'
            ]
        }

        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'white';
            
            context.font = this.fontSize + 'px ' + this.fontFamily;
            let skips = 10;

            this.animations.forEach(element => {
                skips += 20;
                context.fillText(element, 20, skips);
            });
        }
    }
    class Game{
        constructor(){
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            // this.background = new Background(this);
            // this.sound = new SoundController();
            this.keys = [];
        }

        draw(context){
            // this.background.draw(context);
            this.ui.draw(context);
        }
    }
    const game = new Game(canvas_width, canvas_height);
    function animate(){
        ctx.clearRect(0,0, canvas_width, canvas_height);
        ctx.drawImage(player, frameX * spriteWidth, frameY * spriteHeight, 
            spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        if(frameX < maxFrame) frameX++;
        else frameX = 0;
        game.draw(ctx);
        setTimeout(() => requestAnimationFrame(animate), maxInterval);
    }

    animate(0);
})