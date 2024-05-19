dialogue_dict = {
    'teacher1': [
        {
            'is_question': false,
            'question': 'Привет! Я сова'
        },
        {
            'is_question': false,
            'is_input_text': true,
            'link': 'https://www.16personalities.com/ru/test-lichnosti',
            'question': 'Перейдите по ссылке и пройдите тест. После прохождения перейдите на вкладку \"Ваши результаты\", скопируйте ссылку и вставьте в поле ниже',
        },
        {
            'is_question': false,
            'question': 'Теперь нужно пройти профориентационный тест, чтобы определиться с направлением, которое вам подойдёт больше всего.'
        },
        {
            'is_question': true,
            'question_id': 1,
            'many_answers': false,
            'question': 'Тебе нравится решать задачи, где нужно логически мыслить и просчитывать все ходы наперед?',
            'answers': {
                1: 'Да, это мой конёк!',
                2: 'Не особо люблю такие задачи.',
                3: 'Зависит от сложности задачи.',
            }
        },
        {
            'is_question': true,
            'question_id': 2,
            'many_answers': false,
            'question': 'Тебя больше привлекает:',
            'answers': {
                4: 'Мир цифр и формул.',
                5: 'Мир компьютерных программ и алгоритмов.',
                6: 'Мир прикладных задач и бизнес-решений.',
            }
        },
        {
            'is_question': true,
            'question_id': 3,
            'many_answers': false,
            'question': 'Тебе интересно:',
            'answers': {
                7: 'Докапываться до сути вещей, изучать фундаментальные принципы работы информационных систем.',
                8: 'Разрабатывать алгоритмы, программировать и создавать новые приложения.',
                9: 'Использовать информационные технологии для решения реальных проблем в бизнесе и других сферах.',
            }
        },
        {
            'is_question': true,
            'question_id': 4,
            'many_answers': false,
            'question': 'Ты хочешь:',
            'answers': {
                10: 'Получить глубокие знания в математике и информатике.',
                11: 'Стать искусным программистом и разработчиком.',
                12: 'Научиться управлять ИТ-проектами и использовать информационные технологии для достижения бизнес-целей.',
            }
        },
        {
            'is_question': true,
            'question_id': 5,
            'many_answers': true,
            'question': 'В магазине 5 ящиков с яблоками. В 3 из них - красные яблоки, в 2 - зеленые. Из одного ящика наугад вытаскивают 4 яблока. Все они красные. Какова вероятность того, что следующий вытащенный плод будет зеленым?',
            'answers': {
                13: '1/3',
                14: '1/4',
                15: '2/3',
                16: '1',
            }
        },
        {
            'is_question': false,
            'question': 'Пока'
        },
    ],
    'teacher2': [
        {
            'is_question': false,
            'question': 'Привет! Я сова'
        },

    ],
    'teacher3': [
        {
            'is_question': false,
            'question': 'Привет! Я сова'
        },

    ],
    'teacher4': [
        {
            'is_question': false,
            'question': 'Привет! Я сова'
        },
    ],
    'teacher5': [
        {
            'is_question': false,
            'question': 'Привет! Я сова'
        },
    ],
    'teacher6': [
        {
            'is_question': false,
            'question': 'Привет! Я сова'
        },
    ],
    'teacher1_2': [
        {
            'is_question': false,
            'question': 'Привет! Я сова'
        },
    ],
}

count_question_dict = {
    'teacher1': 5,
    'teacher2': 0,
    'teacher3': 0,
    'teacher4': 0,
    'teacher5': 0,
    'teacher6': 0,
}

user_answers = new Set();;

current_teacher = ''
current_dialogue = 0;
current_question = 0;
is_typing = false;
current_typing = 0;
current_type_txt = '';
is_in_dialogue = false;
is_acept_sending = false;
passed_teachers = [];

speed = 300;


var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
     initialize:
 
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },
 
    preload: function ()
    {
        // тайлы для карты
        this.load.image('tiles', 'assets/map/png/tileset.png');
         
        // карта в json формате
        this.load.tilemapTiledJSON('map', 'assets/map/main_map.json');
         
        // персонаж
        this.load.svg('player', 'assets/img/min_player.svg', { width: 96, height: 96 });

        // //Учителя
        // this.load.image('teacher1', '../img/teacher1.png');
        // this.load.image('teacher2', '../img/teacher2.png');
        // this.load.image('teacher3', '../img/teacher3.png');
        // this.load.image('teacher4', '../img/teacher4.png');
        // this.load.image('teacher5', '../img/teacher5.png');
        // this.load.image('teacher6', '../img/teacher6.png');

        //Клавиша
        this.load.image('button_e', 'assets/img/e_button.png')

    },
 
    create: function ()
    {
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
 
    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },
    preload: function ()
    {
 
    },
    create: function ()
    {
        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('main', 'tiles');
 
        var background = map.createLayer('background', tiles, 0, 0);
        var stairs = map.createLayer('stairs', tiles, 0, 0);
        var walls1 = map.createLayer('walls', tiles, 0, 0);
        walls1.setCollisionByExclusion([-1]);
        var decors = map.createLayer('decors', tiles, 0, 0);
        decors.setCollisionByExclusion([-1]);
        var decors_on = map.createLayer('decors_on', tiles, 0, 0);
        var teachers = map.createLayer('teachers', tiles, 0, 0);
        var walls2_under_player = map.createLayer('walls2_under_player', tiles, 0, 0);
        this.player = this.physics.add.sprite(220, 120, 'player', 0);
        this.player.setSize(66, 25, false).setOffset(15, 66);
        var walls2 = map.createLayer('walls2', tiles, 0, 0);

        this.col_walls = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('collision_walls').objects.forEach((spike) => {
            if (spike.width > spike.height) {
                const spikeSprite = this.col_walls.create(spike.x + 16, spike.y, 'spike');
                spikeSprite.body.setSize(spike.width, 1).setOffset(0, 20);
                spikeSprite.setVisible(false);
            } else {
                const spikeSprite = this.col_walls.create(spike.x + 16, spike.y, 'spike');
                spikeSprite.body.setSize(1, spike.height).setOffset(0, 15);
                spikeSprite.setVisible(false);
            }
            
        });

        // Teacher1
        this.button_e1 = this.add.sprite(350, 110, 'button_e', 0);
        this.button_e1.visible = false;
        this.zone_teacher1 = new Phaser.GameObjects.Zone(this, 375, 200, 140, 120);
        this.physics.add.existing(this.zone_teacher1);

        // Teacher2
        this.button_e2 = this.add.sprite(450, 400, 'button_e', 0);
        this.button_e2.visible = false;
        this.zone_teacher2 = new Phaser.GameObjects.Zone(this, 450, 480, 140, 120);
        this.physics.add.existing(this.zone_teacher2);

        // Teacher3
        this.button_e3 = this.add.sprite(828, 1260, 'button_e', 0);
        this.button_e3.visible = false;
        this.zone_teacher3 = new Phaser.GameObjects.Zone(this, 800, 1360, 140, 220);
        this.physics.add.existing(this.zone_teacher3);

        // Teacher4
        this.button_e4 = this.add.sprite(1115, 1260, 'button_e', 0);
        this.button_e4.visible = false;
        this.zone_teacher4 = new Phaser.GameObjects.Zone(this, 1120, 1360, 140, 220);
        this.physics.add.existing(this.zone_teacher4);

        // Teacher5
        this.button_e5 = this.add.sprite(1450, 300, 'button_e', 0);
        this.button_e5.visible = false;
        this.zone_teacher5 = new Phaser.GameObjects.Zone(this, 1450, 460, 250, 220);
        this.physics.add.existing(this.zone_teacher5);

        // Teacher6
        this.button_e6 = this.add.sprite(1358, 60, 'button_e', 0);
        this.button_e6.visible = false;
        this.zone_teacher6 = new Phaser.GameObjects.Zone(this, 1375, 160, 150, 100);
        this.physics.add.existing(this.zone_teacher6);


        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.addKeys('left,right,up,down,W,A,S,D');
        this.e_key = this.input.keyboard.addKey('E');
        this.e_key.on('down', this.e_press, this);

        this.esc_key = this.input.keyboard.addKey('ESC');
        this.esc_key.on('down', this.esc_press, this);

        // ограничиваем камеру размерами карты
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // заставляем камеру следовать за игроком
        this.cameras.main.startFollow(this.player);
        //своего рода хак, чтобы предотвратить пояление полос в тайлах
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player, walls1);
        this.physics.add.collider(this.player, decors);
        this.physics.add.collider(this.player, walls2);
        this.physics.add.collider(this.player, this.col_walls);

        // TODO вынести это в отдельную функцию
        if (!passed_teachers.includes('teacher1'))
        {
            if (current_teacher != 'teacher1')
            {
                current_teacher = 'teacher1';
                current_dialogue = 0;
                current_question = 0;
                is_acept_sending = false;
            }
            updateDialogue(current_dialogue, current_teacher);
            document.getElementById('content').style.filter = 'blur(2px)';
            document.getElementById('dialogue_container').style.animation = 'shows 1s';
            document.getElementById('dialogue_container').style.display = 'block';
        }
    },
    update: function (time, delta)
    {
        this.player.body.setVelocity(0);
        this.button_e1.visible = false;
        this.button_e2.visible = false;
        this.button_e3.visible = false;
        this.button_e4.visible = false;
        this.button_e5.visible = false;
        this.button_e6.visible = false;

        if (!is_in_dialogue) {
            // горизонтальное перемещение
            if (this.cursors.left.isDown || this.cursors.A.isDown)
            {
                this.player.body.setVelocityX(-speed);
            }
            else if (this.cursors.right.isDown || this.cursors.D.isDown)
            {
                this.player.body.setVelocityX(speed);
            }
     
            // вертикальное перемещение
            if (this.cursors.up.isDown || this.cursors.W.isDown)
            {
                this.player.body.setVelocityY(-speed);
            }
            else if (this.cursors.down.isDown || this.cursors.S.isDown)
            {
                this.player.body.setVelocityY(speed);
            }
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher1.getBounds())) {
            temp_array = ['teacher1','teacher2','teacher3','teacher4','teacher5','teacher6'];
            every_teacher_passed = temp_array.every((val) => passed_teachers.includes(val));
            if (every_teacher_passed)
            {
                this.button_e1.visible = true;
            }
        } 

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher2.getBounds())) {
            if (!passed_teachers.includes('teacher2'))
            {
                this.button_e2.visible = true;
            }
        } 

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher3.getBounds())) {
            if (!passed_teachers.includes('teacher3'))
            {
                this.button_e3.visible = true;
            }
        } 

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher4.getBounds())) {
            if (!passed_teachers.includes('teacher4'))
            {
                this.button_e4.visible = true;
            }
        } 

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher5.getBounds())) {
            if (!passed_teachers.includes('teacher5'))
            {
                this.button_e5.visible = true;
            }
        } 

        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher6.getBounds())) {
            if (!passed_teachers.includes('teacher6'))
            {
                this.button_e6.visible = true;
            }
        } 
    },
    e_press: function(event) {
        if (!is_in_dialogue) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher1.getBounds())) {
                // if (!passed_teachers.includes('teacher1'))
                // {
                //     if (current_teacher != 'teacher1')
                //     {
                //         current_teacher = 'teacher1';
                //         current_dialogue = 0;
                //         current_question = 0;
                //         is_acept_sending = false;
                //     }
                //     updateDialogue(current_dialogue, current_teacher);
                //     document.getElementById('content').style.filter = 'blur(2px)';
                //     document.getElementById('dialogue_container').style.animation = 'shows 1s';
                //     document.getElementById('dialogue_container').style.display = 'block';
                // }
                temp_array = ['teacher1','teacher2','teacher3','teacher4','teacher5','teacher6'];
                every_teacher_passed = temp_array.every((val) => passed_teachers.includes(val));
                if (every_teacher_passed && !passed_teachers.includes('teacher1_2'))
                {
                    if (current_teacher != 'teacher1_2')
                    {
                        current_teacher = 'teacher1_2';
                        current_dialogue = 0;
                        current_question = 0;
                        is_acept_sending = false;
                    }
                    updateDialogue(current_dialogue, current_teacher);
                    document.getElementById('content').style.filter = 'blur(2px)';
                    document.getElementById('dialogue_container').style.animation = 'shows 1s';
                    document.getElementById('dialogue_container').style.display = 'block';
                }
            }

            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher2.getBounds())) {
                if (!passed_teachers.includes('teacher2'))
                {
                    if (current_teacher != 'teacher2')
                    {
                        current_teacher = 'teacher2';
                        current_dialogue = 0;
                        current_question = 0;
                        is_acept_sending = false;
                    }
                    updateDialogue(current_dialogue, current_teacher);
                    document.getElementById('content').style.filter = 'blur(2px)';
                    document.getElementById('dialogue_container').style.animation = 'shows 1s';
                    document.getElementById('dialogue_container').style.display = 'block';
                }
            } 

            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher3.getBounds())) {
                if (!passed_teachers.includes('teacher3'))
                {
                    if (current_teacher != 'teacher3')
                    {
                        current_teacher = 'teacher3';
                        current_dialogue = 0;
                        current_question = 0;
                        is_acept_sending = false;
                    }
                    updateDialogue(current_dialogue, current_teacher);
                    document.getElementById('content').style.filter = 'blur(2px)';
                    document.getElementById('dialogue_container').style.animation = 'shows 1s';
                    document.getElementById('dialogue_container').style.display = 'block';
                }
            } 

            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher4.getBounds())) {
                if (!passed_teachers.includes('teacher4'))
                {
                    if (current_teacher != 'teacher4')
                    {
                        current_teacher = 'teacher4';
                        current_dialogue = 0;
                        current_question = 0;
                        is_acept_sending = false;
                    }
                    updateDialogue(current_dialogue, current_teacher);
                    document.getElementById('content').style.filter = 'blur(2px)';
                    document.getElementById('dialogue_container').style.animation = 'shows 1s';
                    document.getElementById('dialogue_container').style.display = 'block';
                }
            } 

            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher5.getBounds())) {
                if (!passed_teachers.includes('teacher5'))
                {
                    if (current_teacher != 'teacher5')
                    {
                        current_teacher = 'teacher5';
                        current_dialogue = 0;
                        current_question = 0;
                        is_acept_sending = false;
                    }
                    updateDialogue(current_dialogue, current_teacher);
                    document.getElementById('content').style.filter = 'blur(2px)';
                    document.getElementById('dialogue_container').style.animation = 'shows 1s';
                    document.getElementById('dialogue_container').style.display = 'block';
                }
            } 

            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.zone_teacher6.getBounds())) {
                if (!passed_teachers.includes('teacher6'))
                {
                    if (current_teacher != 'teacher6')
                    {
                        current_teacher = 'teacher6';
                        current_dialogue = 0;
                        current_question = 0;
                        is_acept_sending = false;
                    }
                    updateDialogue(current_dialogue, current_teacher);
                    document.getElementById('content').style.filter = 'blur(2px)';
                    document.getElementById('dialogue_container').style.animation = 'shows 1s';
                    document.getElementById('dialogue_container').style.display = 'block';
                }
            } 
        }
    },

    esc_press: function(event) {
        if (config['physics']['arcade']['debug'])
        {
            document.getElementById('dialogue_container').style.display = 'none';
            document.getElementById('content').style.filter = 'none';
            is_in_dialogue = false;
        }
    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight,
    // zoom: 3,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
};


var game = new Phaser.Game(config);

function updateDialogue(number_dialogue, teacher) {
    is_in_dialogue = true;
    document.getElementById('teacher-img').src = 'assets/img/' + teacher + '.png';
    if (number_dialogue == 0) {
        document.getElementById('prev-button').style.display = 'none';
        document.getElementById('next-button').style.width = '100%';
    } else {
        document.getElementById('prev-button').style.display = 'block';
        document.getElementById('next-button').style.width = '50%';
        document.getElementById('prev-button').innerHTML = 'Назад';
    }
    if (number_dialogue == dialogue_dict[current_teacher].length - 1) {
        document.getElementById('next-button').innerHTML = 'Выйти';
    } else {
        document.getElementById('next-button').innerHTML = 'Далее';
    }
    document.getElementById("answers").style.display = 'none';
    dialogue_text = dialogue_dict[teacher][number_dialogue];
    if (dialogue_text['is_question']) {
        document.getElementById('next-button').innerHTML = 'Далее';
        parent_answers = document.getElementById("answers");
        parent_answers.innerHTML = '';
        document.getElementById('number-question').style.display = 'block';
        answers = dialogue_text['answers'];
        document.getElementById('current-question').innerHTML = current_question;
        document.getElementById('question-count').innerHTML = count_question_dict[teacher];
        document.getElementById('question').innerHTML = dialogue_text['question'];
        Object.keys(answers).forEach(function(key) {
            el = document.createElement("div");
            input_check = document.createElement("input");
            if (dialogue_text['many_answers']) {
                input_check.type = 'checkbox';
                input_check.name = 'checkbox_answer';
            }
            else {
                input_check.type = 'radio';
                input_check.name = 'radio_answer';
            }
            if (user_answers.has(key)) {
                input_check.checked = true;
            }
            input_check.id = key;
            label_check = document.createElement("label");
            label_check.htmlFor = key;
            label_check.innerHTML = answers[key];

            parent_answers.appendChild(el);
            el.appendChild(input_check);
            el.appendChild(label_check);
        });
    }
    else {
        text_dial = dialogue_text['question'];
        document.getElementById('number-question').style.display = 'none';
        document.getElementById('question').innerHTML = text_dial;
        if (dialogue_text['is_input_text']) {
            input_text = document.createElement("input");
            input_text.type = 'text';
            input_text.id = 'input-text-in-question';
            link = document.createElement("a");
            link.href = dialogue_text['link'];
            link.target = '_blank';
            link.innerHTML = 'Ссылка';
            link.style.fontSize = '18pt'
            parent_answers = document.getElementById("answers");
            parent_answers.innerHTML = '';
            parent_answers.appendChild(link);
            parent_answers.appendChild(input_text);

        } else {
            document.getElementById("answers").style.display = 'none'
        }
    }
    current_type_txt = document.getElementById('question').textContent;
    i = 0;
    document.getElementById('question').innerHTML = '';
    typeWriter(current_type_txt);
}

function nextDialogue() {
    if (is_typing) {
        clearTimeout(current_typing);
        document.getElementById('question').innerHTML = current_type_txt;
        is_typing = false;
        if (dialogue_dict[current_teacher][current_dialogue]['is_question'] || dialogue_dict[current_teacher][current_dialogue]['is_input_text']) {
            document.getElementById("answers").style.display = 'flex';
        }
        if (current_question == count_question_dict[current_teacher] && dialogue_dict[current_teacher][current_dialogue]['is_question']) {
            document.getElementById('next-button').innerHTML = 'Отправить';
        }
    }
    else {
        if (dialogue_dict[current_teacher][current_dialogue]['is_input_text']) {
            if (!document.getElementById('input-text-in-question').value.length) {
                is_exist_error = document.getElementsByClassName('error-div').length != 0;
                if (!is_exist_error){
                    error_div = document.createElement("div");
                    error_div.className = "error-div";
                    error_div.innerHTML = 'Для продолжения необходимо заполнить поле';
                    error_div.style.color = 'red';
                    error_div.style.fontSize = '12pt'
                    parent_answers = document.getElementById("answers");
                    parent_answers.appendChild(error_div);
                    document.getElementById('input-text-in-question').style.border = '1px solid red'; 
                }
                return;
            }
        }
        if (current_question == count_question_dict[current_teacher] && count_question_dict[current_teacher] != 0 && !is_acept_sending) {
            document.getElementById('number-question').style.display = 'none';
            document.getElementById('question').innerHTML = 'Вы уверены, что хотите отправить?';
            document.getElementById("answers").style.display = 'none';
            next_but = document.getElementById('next-button');
            prev_but = document.getElementById('prev-button');
            next_but.innerHTML = 'Да';
            next_but.onclick = agree_sending;
            prev_but.onclick = disagree_sending;
            prev_but.innerHTML = 'Нет';
        }
        else if (current_dialogue >= dialogue_dict[current_teacher].length - 1) {
            document.getElementById('dialogue_container').style.display = 'none';
            document.getElementById('content').style.filter = 'none';
            is_in_dialogue = false;
            passed_teachers.push(current_teacher);
            return;
        }
        else {
            if (dialogue_dict[current_teacher][current_dialogue]['is_question']) {
                checkedBoxes = document.querySelectorAll('input[name=checkbox_answer]:checked');
                checkedBoxes.forEach(p => user_answers.add(p.id));
                checkedRadio = document.querySelectorAll('input[name=radio_answer]:checked');
                checkedRadio.forEach(p => user_answers.add(p.id));
            }
            current_dialogue++;
            if (dialogue_dict[current_teacher][current_dialogue]['is_question']) {
                current_question++;
            }
            updateDialogue(current_dialogue, current_teacher);
        }
    }
}

function prevDialogue() {
    if (is_typing) {
        clearTimeout(current_typing);
        is_typing = false;
    }
    if (current_dialogue <= 0) {
        document.getElementById('dialogue_container').style.display = 'none';
        document.getElementById('content').style.filter = 'none';
        is_in_dialogue = false;
        return;
    } else {
        if (dialogue_dict[current_teacher][current_dialogue]['is_question']) {
            checkedBoxes = document.querySelectorAll('input[name=checkbox_answer]:checked');
            checkedBoxes.forEach(p => user_answers.add(p.id));
            checkedRadio = document.querySelectorAll('input[name=radio_answer]:checked');
            checkedRadio.forEach(p => user_answers.add(p.id));
            current_question--;
        }
        current_dialogue--;
        if (dialogue_dict[current_teacher][current_dialogue]['is_question'] && is_acept_sending){
            current_dialogue++;
            return;
        }
        updateDialogue(current_dialogue, current_teacher);
    }
}

function disagree_sending() {
    is_acept_sending = false;
    next_but.onclick = nextDialogue;
    prev_but.onclick = prevDialogue;
    updateDialogue(current_dialogue, current_teacher);
}

function agree_sending() {
    is_acept_sending = true;
    next_but.onclick = nextDialogue;
    prev_but.onclick = prevDialogue;
    nextDialogue();
}

var typing_speed = 20; /* Скорость/длительность эффекта в миллисекундах */

function typeWriter(txt) {
    is_typing = true;
    if (i == txt.length) {
        is_typing = false;
        if (current_question == count_question_dict[current_teacher] && dialogue_dict[current_teacher][current_dialogue]['is_question']) {
            document.getElementById('next-button').innerHTML = 'Отправить';
        }
    }
    if ((dialogue_dict[current_teacher][current_dialogue]['is_question'] || dialogue_dict[current_teacher][current_dialogue]['is_input_text']) && is_typing == false ) {
        document.getElementById("answers").style.display = 'flex';
    }
    if (i < txt.length) {
        document.getElementById("question").innerHTML += txt.charAt(i);
        i++;
        current_typing = setTimeout(typeWriter, typing_speed, txt);
    }
}

// TODO
// Решить проблему с wasd и e
// Сделать проверку на правильность поля
// Переделать растягивание игры
// [Оптимизация] Всё что повторяется вынести в отдельные функции
// [Оптимизация] По возможности занести всё в класс

// Таблицы Users, Dialogues, Answers, Schools, Medias, Results