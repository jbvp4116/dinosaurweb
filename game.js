var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dinorun = new Image();
dinorun.src = 'dinorun_0.png';

var dino =
{
	x : 10,
	y : 200,
	width : 80,
	height : 80,
	draw()
	{
		ctx.fillStyle = 'green';
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(dinorun, this.x, this.y)
	}
}

class Obstacle
{
	constructor()
	{
		this.x = 500;
		this.y = 230;
		this.width = 50;
		this.height = 50;
	}
	draw()
	{
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

var timer = 0;
var jump_timer = 0;
var is_it_jumping = false;
var obstacle_arr = [];
var gaming;
var obstacle_period = 0;
var score = 0;
var dinocode = 0;

function frame_process()
{
	gaming = requestAnimationFrame(frame_process);
	
	score++;
	timer++;
	
	obstacle_period = getRandom(120, 170);
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if (timer % obstacle_period == 0)
	{
		var cactus = new Obstacle();
		obstacle_arr.push(cactus);
	}

	if (is_it_jumping == true)
	{
		dino.y -= 5;
		jump_timer++;
		
	}
	
	if (is_it_jumping == false)
	{
		if (dino.y < 200)
		{
			dino.y += 5;
		}
	}
	
	if (jump_timer > 30)
	{
		is_it_jumping = false;
		jump_timer = 0
	}
	
	if (dinocode == 5)
	{
		dinocode = 0;
	}

	else
	{
		dinocode++;
	}
	
	dinorun.src = 'dinorun_0.png';
	
	dino.draw();
	
	obstacle_arr.forEach((a, i, o) =>
	{
		if (a.x < -50)
		{
			o.splice(i, 1)
		}
		
		collision_check(dino, a);
		
		a.x -= 5;
		a.draw();
	})
	
	scoring();
}

frame_process();

function collision_check(dino, cactus)
{
	var is_x_coor_collided = cactus.x - (dino.x + dino.width);
	var is_y_coor_collided = cactus.y - (dino.y + dino.height);
	
	if (is_x_coor_collided < 0 && is_y_coor_collided < 0)
	{
		cancelAnimationFrame(gaming)
		location.href = "saveScore.jsp?score=" + encodeURIComponent(score);
	}
}

document.addEventListener('keydown', function(e)
{
	if (e.code === 'Space')
	{
			is_it_jumping = true;
	}
})

function getRandom(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
}

function scoring()
{
	ctx.font = "16px Arial";
	ctx.filltyle = "#000000";
	ctx.fillText("Score: " + score, 8, 20);	
}