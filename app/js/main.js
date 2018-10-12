$(document).ready(function(){

	var htmlPlayer = $('#dot');
	var down = false;

	var GameMap = {
		width: $(window).width(),
		height: $(window).height()
	};
		// console.log($(window).width());
		// console.log($(window).height());

	var Player = {
		sizes: {
			width: 80,
			height: 80
		},
		position: {
			top: 0,
			left: 0
		},
		direction: {
			transform: 0
		},
		speed: 1.5,
		backgroundImage: 'img/player.png',
		shadow: {
			width: 100,
			height: 100
		},
		
		setPosition: function(pos){
			switch(pos){
				case 'center':
					this.position.top = GameMap.height / 2 - (this.sizes.height/2);
					this.position.left = GameMap.width / 2 - (this.sizes.width/2);
				break
			}
		},
		renderPosition: function(elm,Player){
			elm.css({
				left: Player.position.left + 'px',
				top: Player.position.top + 'px',
				width: Player.sizes.width + 'px',
				height: Player.sizes.height + 'px',
				transform: 'rotate' + '('+ Player.direction.transform + 'deg)',
				backgroundImage: 'url('+ Player.backgroundImage +')',
			});
		}
	};
	Player.setPosition('center');
	Player.renderPosition(htmlPlayer,Player);

 	document.onkeydown = function (event){

    if (event.keyCode == 32) {
      Player.backgroundImage = 'img/playerSpace.png';
    }else {
			Player.backgroundImage = 'img/player.gif';
			switch (event.keyCode) {
				case 37:
					Player.position.left = Player.position.left <= 0 ? 0 : Player.position.left -= Player.speed;
					Player.direction.transform = 180;
				break

				case 38:
					Player.position.top = Player.position.top <= 0 ? 0 : Player.position.top-=Player.speed;
					Player.direction.transform = -90;
				break

				case 39:
					Player.position.left = Player.position.left >= GameMap.width - Player.sizes.width ? GameMap.width-Player.sizes.width : Player.position.left += Player.speed;
					Player.direction.transform = 0;
				break

				case 40:
					Player.position.top = Player.position.top >= GameMap.height-Player.sizes.height ? GameMap.height-Player.sizes.height : Player.position.top+=Player.speed;
					Player.direction.transform = 90;
				break;
			}
		}

		Player.renderPosition(htmlPlayer,Player);
		// console.log(Player.direction.transform);
	};

	document.onkeyup = function(evt){
		Player.backgroundImage = 'img/player.png';		
		Player.renderPosition(htmlPlayer,Player);
	};
});