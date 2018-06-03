var enemy1 = {
    full_life: 50,
    life: 50,
    number: 1,
    size: 100
}
var user = {
    full_life: 100,
    life: 100,
    atk: 50,//원래 20인데 임시로 50
    kill: 0,
    opportunity: 2,//원래 10인데 임시로 2
    score: 0,
    count: 0
}
var monster = document.getElementById('monster');
monster.textContent = 'monster ' + enemy1.number;
monster.style.width = enemy1.size + 'px';
monster.style.height = enemy1.size + 'px';
monster.style.lineHeight = enemy1.size + 'px';
var opportunity = document.getElementById('oppo');
opportunity.textContent = user.opportunity;
var atk = document.getElementById('atk');
atk.textContent = user.atk;
var kill = document.getElementById('kill');
kill.textContent = user.kill;
var full_life = document.getElementById('life');
full_life.textContent = user.life + ' / ' + user.full_life;

var log = "";
var attack_result = "";
var weapon = "";

var input = document.getElementById('form').submit_attack.value;

var gameover_trigger = false;
var monsterkill_trigger = false;

function attackWin(){
    user.score += 500;
    enemy1.life = enemy1.life - user.atk;
    
    if (enemy1.life <= 0) {//몬스터 킬
        console.log('kill');
        monsterKill();
    }
    var monster_health_txt = document.getElementById('monster_health_text');
    var monster_health_gauge = document.getElementById('monster_health_gauge');
    monster_health_txt.textContent = enemy1.life + ' / ' + enemy1.full_life;
    monster_health_gauge.style.width = enemy1.life / enemy1.full_life * 100 +'%';
    log = user.atk + '의 피해를 입혔다!';
    
}

function attackDraw(){
    user.score += 100;
    log = '공격이 빗나갔다!';
}

function attacklose(){
    user.score += 20;
    user.life -= 10;
    var user_health_txt = document.getElementById('user_health_text');
    var user_health_gauge = document.getElementById('user_health_gauge');
    user_health_txt.textContent = user.life + ' / ' + user.full_life;
    user_health_gauge.style.width = user.life / user.full_life * 100 + '%';
    full_life.textContent = user.life + ' / ' + user.full_life;
    log = '피해를 10 입었다 ㅠㅠ';
}


function attack(ev) {//가위바위보 실행
    ev.preventDefault();
    user.count++;
    
    var monsterWeapon = ['rock', 'scissor', 'paper'];
    var ran = Math.floor(Math.random() * 3);
    var monsterChoice = monsterWeapon[ran];
    var input = document.getElementById('form').submit_attack.value;
    
    gameover_trigger = false;
    monsterkill_trigger = false;
    
    if (input === 'rock') {
        weapon = '바위';
    } else if (input === 'scissor') {
        weapon = '가위';
    } else if (input === 'paper') {
        weapon = '보';
    }
    
    if (monsterChoice === input) {
        alert('비겼습니다');
        attack_result = '무';
        attackDraw();
    } else if ((input === 'rock' && monsterChoice === 'scissor')||
               (input === 'scissor' && monsterChoice === 'paper')||
               (input === 'paper' && monsterChoice === 'rock')) {
        alert('공격 성공!');
        attack_result = '승'
        attackWin();
    } else if (
        (input === 'rock' && monsterChoice === 'paper')||
        (input === 'scissor' && monsterChoice === 'rock')||
        (input === 'paper' && monsterChoice === 'scissor')
              ) {
        alert('공격 실패 ㅠㅠ');
        attack_result = '패'
        attacklose();
    }
    user.opportunity--;
    if (user.opportunity <= 0) {//게임 오버
        gameover();
    }
    opportunity.textContent = user.opportunity;
    
    var table_row = document.createElement('tr');
    var table_data = document.createElement('td');
    var table_data2 = document.createElement('td');
    var table_data3 = document.createElement('td');
    var table_data4 = document.createElement('td');
    table_row.appendChild(table_data);
    table_row.appendChild(table_data2);
    table_row.appendChild(table_data3);
    table_row.appendChild(table_data4);
    table_data.textContent = user.count;
    table_data2.textContent = weapon;
    table_data3.textContent = attack_result;
    table_data4.textContent = log;
    document.getElementById('table').appendChild(table_row);
    
    
    if (monsterkill_trigger) {
        var table_row2 = document.createElement('tr');
        var table_data5 = document.createElement('td');
        table_data5.colSpan = "4";
        var log_kill = 'monster ' + enemy1.number + '를 물리쳤다!';
        enemy1.number++;
        table_data5.textContent = log_kill;
        table_row2.appendChild(table_data5);
        document.getElementById('table').appendChild(table_row2);
        
        monster.textContent = 'monster ' + enemy1.number;
    }
    
    if (gameover_trigger) {
        var table_row3 = document.createElement('tr');
        var table_data6 = document.createElement('td');
        table_data6.colSpan = '4';
        var log_over = '게임 종료!';
        table_data6.textContent = log_over;
        table_row3.appendChild(table_data6);
        document.getElementById('table').appendChild(table_row3);
    }
    return false;
}

function monsterKill () {
    alert('monster ' + enemy1.number + '를 물리쳤다!');
    
    user.kill++;
    kill.textContent = user.kill;
    user.score += 30 * enemy1.size;
    enemy1.full_life += 10;
    enemy1.life = enemy1.full_life;
    monster.style.backgroundColor = '#' + Math.floor(Math.random()*1000000);
    
    enemy1.size += 20;
    monster.style.width = enemy1.size + 'px';
    monster.style.height = enemy1.size + 'px';
    monster.style.lineHeight = enemy1.size + 'px';
    
    monsterkill_trigger = true;
}

function gameover () {
    alert('게임이 끝났습니다!');

    var end_game = document.createElement('p');
    end_game.style.textAlign = 'center';
    end_game.textContent = 'SCORE = ';
    document.querySelector('.user_section').appendChild(end_game);

    var end_game_score = document.createElement('span');
    end_game_score.textContent = user.score;
    end_game_score.style.color = 'tomato';
    end_game_score.style.fontSize = '45px';
    end_game.appendChild(end_game_score);
    
    gameover_trigger = true;
    
    var restart_button = document.createElement('div');
    restart_button.addEventListener('click',function restart() {
        location.reload();
    });
    restart_button.textContent = '다시하기';
    restart_button.classList.add('restart_button');
    document.querySelector('.user_section').appendChild(restart_button);
    
    document.getElementById('form').style.display = 'none';
}

function restart() {
    location.reload();
}

document.getElementById('form').addEventListener('submit', attack);