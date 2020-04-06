const divPiece=document.querySelectorAll(".piece"),image=document.querySelectorAll("img");

let c=0;for(let i=8;i>0;i--){for(let j=97;j<105;j++){let id=document.createAttribute("id");id.value=String.fromCharCode(j)+i;image[c].setAttributeNode(id);for(let i=0;i<64;i++){let classList=image[c].parentElement.classList,sum;for(let k=0;k<classList.length;k++){if(classList[k]==="odd"){sum=0;k=classList.length;}else{sum=1;}}if(sum>0){image[c].bgcolor="white";}else{image[c].bgcolor="black";}}c+=1;}}

for(let i=0;i<64;i++){image[i].value = i;}

function resetBackgroundColor(){for(let x =8;x>0;x--){for(let w=97;w<105;w++){let u = String.fromCharCode(w)+x;if((x+w)%2==1){document.getElementById(u).style.backgroundColor = "white";}else{document.getElementById(u).style.backgroundColor = "gray";}}}}

function colorCheck(sorc){let colour=r="";if(sorc){for(let i=sorc.length-5;i>0;i--){if(sorc[i]!=="/"){r=sorc[i]+r;}else{i=0;}}for(let i=0;i<5;i++){colour=colour+r[i];}return colour;}}

function sourceCheck(sorc){let b="";for(let i=sorc.length-5;i>0;i--){if(sorc[i]!=="/"){b=sorc[i]+b;}else{i=0;}}return b;}

function pieceCheck(sorc){let source=sourceCheck(sorc),piece="";for(let i=source.length-1;i>4;i--){piece=source[i]+piece;}return piece;}

let colour=colorCheck(image[0].src),wSP,bSP;if(colour==="white"){wSP="top";bSP="bottom";}else{wSP="bottom";bSP="top";}

let action="notActive",prevId,prevColor,prevSrc,prevValue,kCheck;

function checkPieceAndAvailableMoves(p,c,s,i,check){
	let fI = i.charCodeAt(0);
	let lI = Number(i[1]);
	if(check !== true){
		king(p,c,s,i,fI,lI,"false");
	}
	if(p === "pawn"){return pawn(p,c,s,i,fI,lI);}
	else if(p === "rook"){return rook(p,c,s,i,fI,lI);}
	else if(p === "knight"){return knight(p,c,s,i,fI,lI);}
	else if(p === "bishop"){return bishop(p,c,s,i,fI,lI);}
	else if(p === "queen"){return queen(p,c,s,i,fI,lI);}
	else if(p === "king" && check !== true){return king(p,c,s,i,fI,lI);}


}


function king(piece,color,source,id,firstId,lastId,clicked){
	let check = true;
	let arr=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
	let allMoves = new Set();
	let set = new Set();
	let arr1 = new Array();
	for(let i=0;i<arr.length;i++){
		let a = firstId+arr[i][0];
		let b = lastId+arr[i][1];
		let wrd = String.fromCharCode(a)+b;
		if(a>96 && a<105 && b>0 && b<9){
			allMoves.add(wrd);
			if(checkM(document.getElementById(wrd).src,color)[0] === true){
				set.add(wrd);
			}
		}
	}

	for(let i=0;i<64;i++){
		let j = image[i].id;
		let sr = document.getElementById(j).src;
		let clr = colorCheck(sr);
		if(clr !== color && clr !== undefined){
			let p = pieceCheck(sr);
			let poss = checkPieceAndAvailableMoves(p,clr,sr,image[i].id,check);
			arr1 = arr1.concat(poss);
		}
	}
	console.log(Array.from(new Set(arr1)));
	return arr1;
}
function queen(piece,color,source,id,firstId,lastId){
	let arr = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
	let set = go(arr,firstId,lastId,color,"long");
	return Array.from(set);

}

function bishop(piece,color,source,id,firstId,lastId){
	let arr = [[1,1],[1,-1],[-1,1],[-1,-1]];
	let set = go(arr,firstId,lastId,color,"long");
	return Array.from(set);
}

function knight(piece,color,source,id,firstId,lastId){
	let arr = [[2,1],[2,-1],[1,2],[-1,2],[-2,1],[-2,-1],[1,-2],[-1,-2]];
	let set = go(arr,firstId,lastId,color);
	return Array.from(set);
}

function rook(piece,color,source,id,firstId,lastId){
	let arr = [[1,0],[0,1],[-1,0],[0,-1]];
	let set = go(arr,firstId,lastId,color,"long");
	return Array.from(set);
}

function pawn(piece,color,source,id,firstId,lastId){
	let set = new Set();

	function sideCheck(){
			let num;
			if(wSP === "top" && color === "white"){num = lastId-1;}
			else{num = lastId+1;}
		if(firstId>97){	
			let a = String.fromCharCode(firstId-1)+num;
			let check = checkM(document.getElementById(a).src,color,"pawn");
			if(check){if(check[0] === true){set.add(a);}}
		}
		if(firstId<104){
			let a = String.fromCharCode(firstId+1)+num;
			let check = checkM(document.getElementById(a).src,color,"pawn");
			if(check){if(check[0] === true){set.add(a);}}
		}				
	}
	function straight(){
		sideCheck();
		let num1;
		if(wSP === "top" && color === "white"){num1 = lastId-1;}
		else{num1 = lastId+1;}

		if(checkM(document.getElementById(id[0]+num1).src,color,"pawn","straight")[0] === true){set.add(id[0]+num1);}
	}

	function straight1(wrd){
		for(let i=0;i<2;i++){
			if(checkM(document.getElementById(wrd[i]).src,color,"pawn","straight")[0] === true){set.add(wrd[i]);}
			else{i=2;}
		}

	}
	if(wSP === "top" && color === "white"){
		if(lastId === 7){
			sideCheck();
			let wrd = [];
			wrd[0] = id[0]+(lastId-1);
			wrd[1] = id[0]+(lastId-2);
			straight1(wrd);
		}
		else{straight();}
	}

	else{
		if(lastId === 2){
			sideCheck();
			let wrd = [];
			wrd[0] = id[0]+(lastId+1);
			wrd[1] = id[0]+(lastId+2);
			straight1(wrd);
		}
		else{straight();}
	}
	return Array.from(set);
}

function checkM(sorc,color,p,s){
	let a = colorCheck(sorc);
	if(sorc == ""){if(p === "pawn"){if(s === "straight"){return [true];}else{return [false];}}else{return [true,"go"];}}
	else if(p === "pawn"){if(s === "straight"){return [false];}else if(a !== color && a !== undefined){return [true];}}
	else{if(a !== color){return [true,"stop"];}else{return [false];}}
}

function go(arr,firstId,lastId,color,piece){
	let set = new Set();
	for(let i=0;i<arr.length;i++){
		let a,b,j;
		if(piece === "long"){
			for(j=1;j<8;j++){
				a = firstId+arr[i][0]*j;
				b = lastId+arr[i][1]*j;
				againGo(j);
			}
		}else{
			a = firstId+arr[i][0];
			b = lastId+arr[i][1];
			againGo();				
		}
		function againGo(num){
			if(a>96 && a<105 && b>0 && b<9){
				let wrd = String.fromCharCode(a)+b;
				let check = checkM(document.getElementById(wrd).src,color);
				if(check.length > 1){set.add(wrd);if(check[1] === "stop"){j = 8;}}else{j = 8;}
			}
		}
	}
	return set;
}

function move(src,id,value){
	
	let piece = pieceCheck(src);
	let color = colorCheck(src);
	let source = sourceCheck(src);
	let availableMove = [];

	resetBackgroundColor();
	
	if(source === ""){action = "notActive";}

	else if(action === "active" && color === prevColor){
		action = "active";
		availableMove = checkPieceAndAvailableMoves(piece,color,source,id);
	}

	else if(action === "active" && color !== prevColor && color !== "" && prevColor !== ""){
		action = "notActive";
		replacePiece();
	}

	else{
		action = "active";
		availableMove = checkPieceAndAvailableMoves(piece,color,source,id);
	}

	if(availableMove){
		for(let i=0;i<availableMove.length;i++){
			document.getElementById(availableMove[i]).style.backgroundColor = "yellow";
		}
	}
	console.log(availableMove);

	prevId = id;
	prevSrc = source;
	prevColor = color;
	prevValue = value;

}