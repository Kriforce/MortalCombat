const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

// Task 0 in HM2
const player1 = {
    player: 1,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice sword', 'Ice scepter'],
    attack: function() {
        console.log(player1 + 'Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Nunchucks', 'Dragon sword'],
    attack: function() {
        console.log(player2 + 'Fight...');
    }
};

// Task 1 in HM2

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className)
    }
    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressBar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');

    const $life = createElement('div', 'life');;
    $life.style.width = playerObj.hp + '%';

    const $name = createElement('div', 'name');
    $name.innerHTML = playerObj.name;

    const $img = createElement('img');
    $img.src = playerObj.img;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressBar);
    $player.appendChild($character);

    return $player;
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil(Math.random() * 20);
    $playerLife.style.width = player.hp + '%';

    if (player2.hp <= 0 && player1.hp > 0) {
        $arenas.appendChild(playerWin(player1.name));
        player2.hp = 0;
        $playerLife.style.width = 0;
        $randomButton.disabled = true;
    } else if (player1.hp <= 0 && player2.hp > 0) {
        $arenas.appendChild(playerWin(player2.name));
        player1.hp = 0;
        $playerLife.style.width = 0;
        $randomButton.disabled = true;
    } else if (player1.hp <= 0 && player2.hp <= 0) {
        player1.hp = 0;
        player2.hp = 0;
        $playerLife.style.width = 0;
        $arenas.appendChild(nobodyWin());
        $randomButton.disabled = true;
    }
    console.log(player.hp);
}

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerHTML = name + ' wins';
    return $winTitle;
}

function nobodyWin() {
    const $nobodyWins = createElement('div', 'nobodyTitle');
    $nobodyWins.innerHTML = 'nobody wins';
    return $nobodyWins;
}

$randomButton.addEventListener('click', function() {
    console.log('####: Click Random Button');
    changeHP(player1);
    changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));