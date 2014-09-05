$(document).ready(function(){
	app.c.init();
	app.v.init();
	app.c.listeners();
})
/////////////////////////////////////////////////////////////////////////////////

var app={m:{},v:{},c:{}};

/////////////////////////////////////////////////////////////////////////////////

/*
Notes on ROILA:

a "bat"
e "red"
i "big"
o "frost"
u "but"

b 	p
f 	s
l 	w
m 	n

j
k 	
t


*/

///////////////

app.m.lexer=[
	[/^a/gi,"var "],
	[/o$/gi,"=function(){return "],
	[/^i/gi,"for (var "],
	[/a$/gi,'; '],
	[/u$/gi,";};"],
	[/i$/gi,'()'],
	[/won/gi,"1"],
	[/tun/gi,'2'],
	[/thir/gi,'3'],
	[/vor/gi,'4'],
	[/viev/gi,'5'],
	[/sik/gi,'6'],
	[/sev/gi,'7'],
	[/naet/gi,'8'],
	[/nien/gi,'9'],
	[/zur/gi,'0'],
	[/bos/gi,'+'],
	[/mien/gi,'-'],
	[/div/gi,'/'],
	[/zen/gi,'*'],
	[/shal/gi,'='],
	[/shul/gi,'+=']
];

/////////////////////////////////////////////////////////////////////////////////

app.c.init=function(){
	app.m.metadata={"name":"Arcane","version":"0.0.1"};
};

app.c.listeners=function(){

$("input#compile").click(function(){
	var input=$("#arcane").val();
	input=app.c.lexer(input);
	$("div#output").html(input);
});


};

app.c.lexer=function(input){
	input=input.split(" ");
	for (var i=0;i<input.length;i++){
		for (var j=0;j<app.m.lexer.length;j++){
			//console.log(app.m.lexer[j]);
			console.log(app.m.lexer[j][0].exec(input[i]));
			input[i]=input[i].replace(app.m.lexer[j][0],app.m.lexer[j][1]);
		}
	}
	input=input.join(" ");
	return input;
};

///////////////////////////////////////////

app.v.init=function(){
	app.v.style();
	var d="";
	d+="<h1>arcane</h1>";
	d+="<div><textarea rows='5' cols='5' id='arcane' autofocus></textarea></div>";
	d+="<input type='button' value='compile' id='compile'></input>";
	d+="<div id='output'></div>";
	$("body").html(d);
};


app.v.style=function(){
	davis.style("body",{
		"width":"100%",
		"margin":"0px",
		"padding":"0px",
		"text-align":"center",
		"background":"#555",
		"color":"#fff",
		"font-size":"2em"
	});
	davis.style("div",{
		"padding":"0",
		"margin":"30px"
	});
	davis.style("textarea",{
		"width":"100%",
		"font-size":"1.5em"
	})
};