var F = 0;
var C = 1;
var S = 2;
var W = 3;

var open = [];
var mLeft = [1,1,1,1];
var running = true;

var solve = function()
{
	open.unshift(mLeft);

	var over = 60;

	do
	{
		getMoves();

		if((--over) == 0){
			console.log("overflow");
			break;
		}

		console.log(running);
	}
	while(running);

	open.reverse();

	//steps();
};

var gambi = false;
var getMoves = function()
{
	if(open.length == 1)
	{
		var m = open[0];
		fuckit(m);
	}
	else if(gambi)
	{
		var ms = [open[0].slice(), open[1].slice(), open[2].slice()];
		ms.forEach(function(v){
			fuckit(v);
		});

		gambi = false;
	}
	else if(!gambi)
	{
		var ms = [open[0].slice(), open[1].slice(), open[2].slice()];
		ms.forEach(function(v){
			var temp = v.slice();
			temp[0] = 1;
			// open.unshift(temp);
			addToOpen(temp);
		});

		gambi = true;
	}

	// console.log(open);
};

var fuckit = function(m)
{
	for(var i=1; i < 4; i++)
	{
		var temp = m.slice();

		temp[i] = 0;
		temp[0] = 0;

		// open.unshift(temp);
		addToOpen(temp);

		if(equals(temp, [0,0,0,0])){
			console.log("FINAL ENCONTRADO!");
			running = false;
		}
	}
};

var steps = function()
{
	var path = [];
	var list = open.slice();
	var temp = [];
	var visited = [];
	var queue = [];

	var s = list.shift();
	queue.unshift(s);
	visited.push(s);

	var i = [];
	while(queue.length > 0)
	{
		s = queue.shift();

		i = adjacentNodes(s);

		i.every(function(v){
			if(equals(v, [0,0,0,0])){
				console.log("FIM");
				return false;
			}

			if(!contains(visited, v)){
				visited.push(v);
				queue.unshift(v);
			}
		});

		path.push(s);
	}

	console.log(path);
};

function adjacentNodes(node)
{
	var adjs = [];

	// col 1
	if(equals(node, [1,1,1,1])){
		adjs.push(open[2]);
	}

	// col 2
	else if(equals(node, [0,1,0,1])){
		adjs.push(open[5]);
	}

	// col 3
	else if(equals(node, [1,0,1,1])){
		adjs.push(open[7], open[8]);
	}
	else if(equals(node, [1,1,0,1])){
		adjs.push(open[9], open[10]);
	}
	else if(equals(node, [1,1,1,0])){
		adjs.push(open[7], open[9]);
	}

	// col 4
	else if(equals(node, [0,0,1,0])){
		adjs.push(open[10]);
	}
	else if(equals(node, [0,0,0,1])){
		adjs.push(open[4], open[5]);
	}
	else if(equals(node, [0,1,0,0])){
		adjs.push(open[5], open[6]);
	}

	// col 5
	else if(equals(node, [1,0,1,0])){
		adjs.push(open[13]);
	}

	return adjs;
}

function isNodeFree(node)
{
	

	return true;
}

function equals(a1, a2){
	return a1.length==a2.length && a1.every(function(v,i) { return v === a2[i]});
}

function contains(a1, a2){
	return !a1.every(function(v){
		return !equals(v, a2);
	});
}

function addToOpen(node){
	if(!contains(open, node)){
		open.unshift(node);
	}
}
