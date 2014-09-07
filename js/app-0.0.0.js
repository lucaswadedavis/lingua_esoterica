$(document).ready(function(){
	app.c.init();
	app.v.init();
	app.c.listeners();
})
/////////////////////////////////////////////////////////////////////////////////

var app={m:{},v:{},c:{}};

/////////////////////////////////////////////////////////////////////////////////

app.m.inspiration=false;
app.m.lexicon=false;
app.m.colors={};
app.m.colors.primary="#f37";
app.m.colors.secondary="#f67";
app.m.colors.grey="#555";

/////////////////////////////////////////////////////////////////////////////////

app.c.init=function(){
	app.m.metadata={"name":"Lingua Esoterica","version":"0.0.2"};
};

app.c.listeners=function(){

$("input#count").click(function(){
	var input=$("#input").val();
	var inspiration=$("input[type=text]#inspiration").val();
	var count=$("input[name=count]:checked").val();
	var division=$("input[name=division]:checked").val();
	if (parseInt(division)==1){
		division=true;
	}else{
		division=false;
	}
	//console.log(division);
	input=app.c.ziph(input,parseInt(count,10),division);
	
	var sortable=[];
	for (var key in input){sortable.push([key,input[key].count],input[key].translation);}
	sortable.sort(function(a,b){return b[1]-a[1];});
	
	var s=[];
	for (var i=0;i<sortable.length;i++){
		if (sortable[i]!==undefined){s.push(sortable[i]);}
	}
	sortable=s;
	

	app.m.lexicon=app.c.translate(input,app.c.phonemify(inspiration));
	app.v.glossary(sortable);
	
	
});

};

app.c.ziph=function(sample,n,spaces){
	var spaces=spaces||false;
	var n=n||1;
	var lex={};
	var sample=sample.toLowerCase();
	if (spaces==true){
		sample=sample.split(" ");
	}
	else{
		sample=sample.split("");
	}

	app.m.sampleLength=sample.length;

	for (var i=0;i<=(sample.length-n);i++){
		//then populate the lexicon
			var compilation=[];
			for (var j=0;j<n;j++){
				compilation.push(sample[i+j])
			}
			if (spaces==true){
				compilation=compilation.join(" ");
			}
			else{
				compilation=compilation.join("");
			}

		if (!lex[compilation]){
			lex[compilation]={};
			lex[compilation].count=1;
		}
		else{
			lex[compilation].count++;
		}
	}
	return lex;
};

app.c.translate=function(lexicon,phonemes){
	var s=[];
	
	console.log("lexicon");
	
	var i=0;
	for (var key in lexicon){i++;}
	console.log(i);
	
	var ps=[];
	while (ps.length<i){
		var nt=davis.pick(phonemes);
		while(ps.indexOf(nt)>-1){
			nt+=davis.pick(phonemes);
		}
		
		ps.push(nt);
		console.log(nt);
		ps=_.uniq(ps);
	};
	
	
	var i=0;
	for (var key in lexicon){
		var t=ps[i];
		s.push({source:key,count:lexicon[key],translation:t});	
		i++;
	};
	
	return s;
};

app.c.phonemify = function (inspiration) {
	var soft = [
		'c', 'f', 'h', 'l', 'm', 'n', 'r', 's', 'v', 'w', 'z', 'y'
	];
	var hard = [
		'b', 'c', 'd', 'g', 'j', 'k', 'p', 'q', 't', 'x', 'y'
	];
	var vowels = [
		'a', 'e', 'i', 'o', 'u', 'y'
	];
	var softp = inspiration.match(new RegExp('([' + vowels.join('|') + "]+["+ soft.join('|') + ']+)', 'gi')) || [];
	var hardp = inspiration.match(new RegExp('([' + vowels.join('|') + "]+["+ hard.join('|') + ']+)', 'gi')) || [];
	var softsoft = inspiration.match(new RegExp('([' + soft.join('|') + ']+[' + vowels.join('|') + "]+["+ soft.join('|') + ']+)', 'gi')) || [];
	var softhard = inspiration.match(new RegExp('([' + soft.join('|') + ']+[' + vowels.join('|') + "]+["+ hard.join('|') + ']+)', 'gi')) || [];
	var hardsoft = inspiration.match(new RegExp('([' + hard.join('|') + ']+[' + vowels.join('|') + "]+["+ soft.join('|') + ']+)', 'gi')) || [];
	var hardhard = inspiration.match(new RegExp('([' + hard.join('|') + ']+[' + vowels.join('|') + "]+["+ hard.join('|') + ']+)', 'gi')) || [];
	var default_ret = [
		'sa','so','si','da','do','di'
	];
	
	var ret = _.uniq([].concat(softp, hardp, softsoft, softhard, hardsoft, hardhard));
	
	if (ret.length < 1) {
		return default_ret;
	}
	
	return ret || default_ret;
}

///////////////////////////////////////////

app.v.init=function(){
	app.v.style();
	app.v.LAYOUT();
};

app.v.LAYOUT=function(){
var d="";
	d+="<div id='area-right'>";
		d+="<h1>"+app.m.metadata.name+"</h1>";
		d+=app.v.exposition();
		d+="<div id='options'>";
		d+="<input type='radio' value='1' name='count' checked><label>count by singletons</label></br>";
		d+="<input type='radio' value='2' name='count'><label>count by doubles</label><br/>";
		d+="<input type='radio' value='3' name='count'><label>count by triples</label><br>";
		d+="<input type='radio' value='4' name='count'><label>count by quadruples</label><br>";
		d+="<hr>";
		d+="<input type='radio' value='1' name='division' checked><label>count by words</label></br>";
		d+="<input type='radio' value='0' name='division'><label>count by characters</label><br/>";
		d+="</div>";
		d+="<h2>inspirational seed</h2>";
		d+="<div class='wrapper'>";
			d+="<input type='text' id='inspiration'></input>";
		d+="</div>";
		d+="<h2>text to translate</h2>";
		d+="<textarea rows='10' cols='5' id='input' autofocus></textarea>";
		d+="<input type='button' value='translate' id='count'></input>";
	d+="</div>";
	d+="<div id='output'>";
	d+="</div>";
	$("body").html(d);
};

app.v.exposition=function(){
	var d="<p id='exposition'>";
	d+="a quick way to create a fantasy language: ";
	d+="just give esoterica a little inspiration, and some text to translate, ";
	d+="and you'll get a quick english to fantasy-language dictionary.";
	d+="</p>";
	return d;
};

app.v.glossary=function(sortable){
	var lex=app.m.lexicon;
	var d="";
	d+="<table>";
	d+="<tr><td colspan='2'>sample length: "+app.m.sampleLength+"</td></tr>";
	for (var i=0;i<lex.length;i++){
		var rowClass="odd";
		if (i%2==0){rowClass="even";}
		d+="<tr class='"+rowClass+"'><td>"+lex[i].source+"</td><td>"+lex[i].translation+"</td></tr>";
	}
	d+="</table>";
	$("#output").html(d);
};

//////////////////////////////////////////
//////////////////////////////////////////

app.v.style=function(){
	davis.style("body",{
		"width":"100%",
		"margin":"0px",
		"padding":"0px",
		"color":"#555",
		"font-size":"1em",
		"font-family":"sans-serif"
	});
	davis.style("div",{
		"padding":"0",
		"font-size":"1.5em",
		"margin":"30px"
	});
	davis.style("h1",{
		"text-align":"left",
		"font-size":"2em",
		"margin-bottom":"30px",
		"color":app.m.colors.primary
	});
	davis.style("input[type=button]",{
		"width":"100%",
		"font-size":"2em",
		"background":app.m.colors.primary,
		"border":"2px solid "+app.m.colors.grey,
		"cursor":"pointer",
		"color":"#fff"
	});
	davis.style("textarea",{
		"width":"100%",
		"font-size":"0.8em",
		"font-family":"arial sans-serif",
		"border":"1px solid "+app.m.colors.grey,
		"margin":"0",
		"margin-top":"10px"
	});
	davis.style("table",{
		"width":"100%"
	});
	davis.style("table#layout",{
		"height":"100%",
		"table-layout":"fixed"
	});
	davis.style("td",{
		"padding":"30px",
		"margin":"0px",
		"vertical-align":"top",
		"text-align":"left"
	});
	davis.style("div#output",{
		"background":app.m.colors.primary,
		"text-align":"left",
		"padding":"0"
	});
	davis.style("div#output td",{
		"color":"#fff",
		"padding":"3px",
		"margin":"0",
	});
	davis.style("tr.odd td",{
		"background":app.m.colors.secondary
	});
	davis.style("td#output td:hover",{
		"background":"#555"
	});
	davis.style("div.wrapper",{
		"padding":"0",
		"margin":"0",
		"border":"0"
	});
	davis.style("div#options",{
		"display":"none"	
	});
	davis.style("p#exposition",{
		"font-size":"0.8em"	
	});
	davis.style("input[type=text]",{
		"width":"100%"	
	});
};