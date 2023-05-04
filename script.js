    var pos = 0;
    const pacArray = [
        ['./images/PacMan1.png', './images/PacMan2.png'],
        ['./images/PacMan3.png', './images/PacMan4.png']
    ];
    var direction = 0;
    const pacMen = [];

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }

    function makePac() {

        let velocity = setToRandom(10);
        let position = setToRandom(200);

        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = pacArray[0][0];
        newimg.width = 100;
        newimg.style.left = position.x
        newimg.style.top = position.y
        game.appendChild( newimg );
        return {
            position,
            velocity,
            newimg
        }
    }

    function update(count) {
        pacMen.forEach((item) => {
            checkCollisions(item)
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;

            if (count == 0) {
                chewSwap(item);
            }
        })

        setTimeout(() => {
            update((count+1) % 15)
        }, 10); 
    }

    function chewSwap(item) {
        if (item.newimg.src.includes('1.png')) {item.newimg.src = pacArray[0][1];}
        else if (item.newimg.src.includes('2.png')) {item.newimg.src = pacArray[0][0];}
        else if (item.newimg.src.includes('3.png')) {item.newimg.src = pacArray[1][1];}
        else if (item.newimg.src.includes('4.png')) {item.newimg.src = pacArray[1][0];}
        }
    

    function checkCollisions(item) {
        if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
            item.position.x + item.velocity.x < 0) {
                item.velocity.x = -item.velocity.x; 
                swapPacs(item);   
            }

        if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
            item.position.y + item.velocity.y < 0) {item.velocity.y = -item.velocity.y}    
  
    }

    function swapPacs (item) {
        if (item.newimg.src.includes('1.png') || item.newimg.src.includes('2.png')) {item.newimg.src = pacArray[1][0];}
        else if (item.newimg.src.includes('3.png') || item.newimg.src.includes('4.png')) {item.newimg.src = pacArray[0][0]}
    }

    function makeOne() {
        pacMen.push(makePac());
    }