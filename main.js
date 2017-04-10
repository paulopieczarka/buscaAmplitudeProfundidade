
/* Golbal graph. */
var open = [];

/* Initial state. */
var initialState = [1,1,1,1];

/* While loop is running. (Graph Generation) */
var running = true;

/* Function for graph generation. */
var solve = function()
{
	/* Add initial state. */
	open.unshift(initialState);
	var over = 60; // Overflow controll.

	do
	{
		getMoves(); //Get newest nodes.

		if((--over) == 0){
			console.log("overflow");
			break;
		}
	}
	while(running);

	/* Reverse the graph. */
	open.reverse();
};

/* Graph generator. */
var isOdd = false;
var getMoves = function()
{
	if(open.length == 1)
	{
		var m = open[0];
		nextPossibleMove(m);
	}
	else if(isOdd)
	{
		var ms = [open[0].slice(), open[1].slice(), open[2].slice()];
		ms.forEach(function(v){
			nextPossibleMove(v);
		});

		isOdd = false;
	}
	else if(!isOdd)
	{
		var ms = [open[0].slice(), open[1].slice(), open[2].slice()];
		ms.forEach(function(v){
			var temp = v.slice();
			temp[0] = 1;
			addToOpen(temp);
		});

		isOdd = true;
	}
};

/* Possible states retriver. */
var nextPossibleMove = function(m)
{
	for(var i=1; i < 4; i++)
	{
		var temp = m.slice();

		temp[i] = 0;
		temp[0] = 0;

		addToOpen(temp);

		if(equals(temp, [0,0,0,0])){
			running = false;
		}
	}
};

/* Busca por Amplitude is here. BRBRBR */
var buscaAmplitude = function(graph = open){
	return search(graph, function(arr){
		return arr.pop();
	});
};

/* Busca por Profundidade is here. BRBRBR */
var buscaProfundidade = function(graph = open){
	return search(graph, function(arr){
		return arr.shift();
	});
};

/**
  * Search functions for "Amplitude" and "Profundidade".
  * Args @graph : array of nodes.
  *      @_remove : function for get nodes a.k.a. shift and pop.
  *      @_add : function for add nodes a.k.a. unshift and push.
  * Return true if meta node was found;
  *        false if meta node not found;
  */
var search = function(graph, _remove, _add)
{
	var graph = graph.slice();
	var opened = [];
	var closed = [];

	/* Add first node to open. */
	opened.push(graph.shift());

	/* While array of opens has items. */
	while(opened.length != 0)
	{
		var x = _remove(opened); //most left node.

		/* Stop if current state is meta. */
		if(equals(x, [0,0,0,0]))
		{
			closed.push(x);
			console.log("[END]", "META FOO", [0,0,0,0]);
			console.log("STEPS > "+closed.length, closed);
			return true;
		}

		/* Get x's child. */
		var xchildren = adjacentNodes(x);
		closed.push(x); // Close the current node.

		/* Add each node to opened array. */
		xchildren.forEach(function(node){
			if(!contains(closed, node)){
				opened.unshift(node);
			}
		});

		console.log(x, xchildren);
	}

	console.log(closed);
	return false;
};

/**
  * Get all adjacent nodes.
  * Args @node : array of nodes.
  * Return @array adjacent nodes. 
  */
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
		adjs.push(open[7], open[9]);
	}
	else if(equals(node, [1,1,1,0])){
		adjs.push(open[8], open[9]);
	}

	// col 4
	else if(equals(node, [0,0,1,0])){
		adjs.push(open[11]);
	}
	else if(equals(node, [0,0,0,1])){
		adjs.push(open[5], open[6]);
	}
	else if(equals(node, [0,1,0,0])){
		adjs.push(open[5], open[4]);
	}

	// col 5
	else if(equals(node, [1,0,1,0])){
		adjs.push(open[13]);
	}

	return adjs;
}

/* If two nodes are equal. */
function equals(a1, a2){
	return a1.length==a2.length && a1.every(function(v,i) { return v === a2[i]});
}

/* If array a1 include node a2. */
function contains(a1, a2){
	return !a1.every(function(v){
		return !equals(v, a2);
	});
}

/* Add to graph is node doesn't exist. */
function addToOpen(node){
	if(!contains(open, node)){
		open.unshift(node);
	}
}

/* When page finish loading, create graph. */
window.addEventListener("load", solve);
