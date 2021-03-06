var songcount=0;
var audio = new Audio('Boko.mp3');
var x;
var pool = [];
var poolSize = 0;
var springy;
var isFull=0;
var graph = new Springy.Graph();
$('button').click(function(e){
    $('#myDiv').toggleClass('fullscreen');
});


var t = 60;
function onTimer() {
    var minutes=Math.floor(t/60);
    var seconds=t%60;
    if(seconds<10)
        document.getElementById('mycounter').innerHTML=minutes+":0"+seconds;
    else
        document.getElementById('mycounter').innerHTML = minutes+":"+seconds;
    t--;
    if (t < 0) {
        boot();
    }
    else {
        setTimeout(onTimer, 1000);
    }
}
//This is where the default graph will be displayed

function boot(){
    bootbox.confirm({
        message: "Do you want to start a new game?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            console.log('This was logged in the callback: ' + result);
            var request = new XMLHttpRequest();
             request.onreadystatechange = function () {
             };
             request.open('POST', 'score/'+document.getElementById('i').textContent, true);
             request.send();

            if(result==true) {
                location.replace('main.html');

            }
            else {
                location.replace('Menu.html');

            }
        }
    });
}
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

window.addEventListener('load', function() {
    var input = document.getElementById("inputsm");
    input.addEventListener("keyup",function(event) {
        if (event.keyCode === 13) {
            document.getElementById("enter").click();
        }
    });
    jQuery(function(){

        var r = new XMLHttpRequest();
        r.onreadystatechange = function (){
            if (r.readyState === 4 && r.status===200) {
                var scores = r.responseText.split("^");
                for(var i=0;i<scores.length-1;i++) {
                    var foo = document.getElementById("leader");
                    var li = document.createElement("li");
                    var text = document.createTextNode(scores[i]);
                    li.setAttribute("style", "color:blue");
                    li.appendChild(text);
                    foo.appendChild(li);
                    li.scrollIntoView();}
                }
            else if(r.readyState === 4 && r.status === 404)
            {
                alert('failed')
            }
        };
        r.open('GET', 'getscores', true);
        r.send();

            pool = [];
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status==200) {
                    var connections = request.responseText.split("^");
                    pool.push("!"+connections[0].trim());
                    for(var i=1;i<connections.length;i++)
                    {
                        pool.push(connections[i].trim());
                        poolSize++;

                    }
                    graph.addNodes(toTitleCase(connections[0]).trim(),0);
                    for(var i=1;i<connections.length;i++)
                    {
                        // alert(connections[i]);
                        var hidden=hide(connections[i].trim());
                        graph.addNodes(hidden,connections[i].trim());
                        graph.addEdges([toTitleCase(connections[0]).trim(),connections[i]]);
                    }
                    onTimer();
                }
            };
            request.open('GET', 'default', true);
            request.send();


            springy = jQuery('#springydemo').springy({
                graph: graph
            });

    });
});


//}
function hide(sug)
{
    var count=0;
    var hidden="(";

    for(var i=0;i<sug.length;i++)
    {
        if(sug.charAt(i)!=' ') {
            count++;
        }
        else {
            hidden = hidden + count + ",";
            count=0;
        }
    }

    hidden=hidden+count+")";
    return hidden;
}

function enter() { //documentation for function is after the function ends
    if (isFull === 0) {
        x = document.getElementById("inputsm").value;
        document.getElementById("inputsm").value = "";
    }
    if (isFull === 1) {
        x = document.getElementById("del1").value;
        document.getElementById("del1").value = "";
    }
    var connections;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var repeat=0;
            for(var k = 0; k < graph.nodes.length; k++) {
                if (graph.nodes[k].id === toTitleCase(x.trim())) {
                    repeat = 1;
                }
            }
            if(repeat!=1) {
                var y = parseInt(document.getElementById('i').textContent);//score
                document.getElementById('i').textContent = y + t;
                var display=0;
                connections = request.responseText.split("^");
                for (var i = 0; i < pool.length; i++) {
                    if (pool[i] === (x.toUpperCase().trim())) {//add the suggestion in the graph if it matches the word in pool
                        pool[i] = "!" + pool[i];//mark the word added as ! to denote that it is open
                        var foo = document.getElementById("past");
                        var li = document.createElement("li");
                        var text = document.createTextNode(x);
                        li.setAttribute("style", "color:green");
                        li.appendChild(text);
                        foo.appendChild(li);
                        li.scrollIntoView();
                        var hidden = hide(toTitleCase(x.trim()));
                        removenodee(hidden,toTitleCase(x.trim()));
                        graph.addNodes(toTitleCase(x.trim()),0);//add the trimmed and titled cases suggestion to the graph
                    }
                    else
                    {
                        display++;
                    }
                    console.log(pool[i] + " ");//debugging
                }
                if(display===pool.length)
                {
                    var foo = document.getElementById("past");
                    var li = document.createElement("li");
                    var text = document.createTextNode(x);
                    li.setAttribute("style", "color:red");
                    li.appendChild(text);
                    foo.appendChild(li);
                    li.scrollIntoView();
                }


                for (var i = 0; i < connections.length; i++)//add an edge from the suggested word to any open nodes in the graph
                {
                    var flag = false;//checks if the connection is already there in the pool
                    for (var j = 0; j < poolSize; j++) {
                        if (("!" + connections[i]) === pool[j]) {//if the connection is open in the graph/the connection is already in the !pool
                            var check = false;
                            for (var k = 0; k < graph.nodes.length; k++) {
                                if (graph.nodes[k] === pool[j] || pool[j].charAt(0) == "!")
                                    check = true;
                            }
                            if (!check)
                                graph.addNodes(toTitleCase(pool[j].trim()),0);
                            graph.addEdges([toTitleCase(x.trim()), toTitleCase(connections[i])]);
                            flag = true;
                            //  continue;
                        }
                        if (connections[i] === pool[j])
                            flag = true;
                    }
                    if (!flag) {
                        if (connections[i].length > 0) {
                            pool.push(connections[i].trim());
                            //add the connections in the hidden format to graph


                            var hidden = hide(connections[i]);
                            graph.addNodes(hidden,connections[i]);
                            graph.addEdges([toTitleCase(x).trim(), connections[i]]);
                            //added the connection to the graph and added the edge
                            console.log("Added: " + connections[i]);
                            poolSize++;
                        }
                    }
                }
            }
            else
            {
                /*var foo = document.getElementById("past");
                 var li = document.createElement("li");
                 var text = document.createTextNode("already on graph-"+x);
                 li.setAttribute("style", "color:purple");
                 li.appendChild(text);
                 foo.appendChild(li);
                 li.scrollIntoView();
                 */snack();
            }
        }
        else if(request.readyState === 4 && request.status === 404)
        {
            var foo = document.getElementById("past");
            var li = document.createElement("li");
            li.setAttribute("style", "color:red");
            var text = document.createTextNode(x);
            li.appendChild( text );
            foo.appendChild(li);
            li.scrollIntoView();

        }
    };
    request.open('POST', 'guess/'+x, true);
    request.send();


}
/*
 *
 ** REMOVE element*/
function removenodee(sug,x) {
    var nodeto;
    for (var i = graph.nodes.length - 1; i >= 0; i--) {
        //alert(graph.nodes[i].id+"   "+x.toUpperCase());
        if (graph.nodes[i].id == x.toUpperCase()){
            nodeto = graph.nodes[i];
        }
    }
    graph.removeNode(nodeto);
}
/*
 *
 *
 ** ADD NODE-Two ways to add node where node1 is a newly created node and x is a string got from text field
 graph.addNode(node1);
 graph.addNodes(x);
 *
 *
 *
 ** ADD EDGE-Two ways to add an edge
 graph.newEdge(node1, node2);
 graph.addEdges(['FordGT',x]);
 *
 *
 ** Load full json or make graph using json
 graph.loadJSON(graphJSON);
 *
 * */
/*Test code
 //var node1 = graph.newNode({label: 'Spiderman'});
 //graph.addNode(node1);
 //graph.addNodes(x);
 //graph.loadJSON(graphJSON);
 var count=graph.nodes.length;
 var nodeto;
 window.alert(count);

 for (var i = graph.nodes.length - 1; i >= 0; i--) {
 if(graph.nodes[i].id=='PeterParker')
 nodeto=graph.nodes[i];
 //  window.alert(graph.nodes[i].id);
 }
 graph.removeNode(nodeto);

 /*two ways to add node where node1 is a newly created node and x is a string got from text field
 graph.addNode(node1);
 graph.addNodes(x);

 //var node2 = graph.newNode({label: "Batman"});
 //graph.newEdge(node1, node2);
 //graph.addEdges(['FordGT',x]);

 */

function music() {
    songcount=songcount+1;
    if((songcount%2)!=0)
        audio.play();
    else
        audio.pause();
}

var dis=0;
function menu() {
    bootbox.confirm({
        message: "Are you sure you want to quit the game?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            console.log('This was logged in the callback: ' + result);
            if(result==true) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                };
                request.open('POST', 'score/'+document.getElementById('i').textContent, true);
                request.send();
                location.replace('Menu.html');

            }
            else {
                $(document).on('click', '.modal-backdrop', function (event) {
                    bootbox.hideAll()
                });

            }
        }
    });

}
function changecategory() {
    bootbox.confirm({
        message: "Are you sure you want to change the category? Your work will be lost",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            console.log('This was logged in the callback: ' + result);
            if(result==true) {
                document.getElementById("past").innerHTML="";
                location.replace('main.html');
            }
        }
    });

}
function fullscreen() {

    var f=0;
    var elem = document.getElementById("full");
    if(elem.requestFullscreen) {
        elem.requestFullscreen();
        f=1;
    } else if(elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
        f=1;
    } else if(elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
        f=1;
    } else if(element.msRequestFullscreen) {
        elem.msRequestFullscreen();
        f=1;
    }
    if(f===1){
        isFull=1;
        document.getElementById("fullb").style.visibility= "hidden";
        document.getElementById("full").style.height = "96%";
        document.getElementById("full").style.width = "100%";
        document.getElementById("full2").style.height = "98%";
        document.getElementById("full2").style.width = "98%";
        document.getElementById("full3").style.height = "98%";
        document.getElementById("full3").style.width = "102%";

        //Create an input type dynamically.
        var element = document.createElement("input");

//Create Labels
        var button = document.createElement("input");

//Assign different attributes to the element.


        button.setAttribute("type", "button");
        button.setAttribute("onclick", "enter();");
        button.setAttribute("value", "ENTER");
        button.setAttribute("style", "color: white;margin-right: 18px; border: 0; outline: 0; border-radius: 20px; padding: 0px 8px; background: black; float: right");
        button.setAttribute("id", "del2");

        element.setAttribute("type", "text");
        element.setAttribute("id", "del1");
        element.setAttribute("name", "Test Name");
        element.setAttribute("style", "width:200px;color:black;float:right");

// 'foobar' is the div id, where new fields are to be added
        var foo = document.getElementById("full4");

//Append the element in page (in span).
        foo.appendChild(button);
        foo.appendChild(element);
        var input = document.getElementById("del1");
        input.addEventListener("keyup",function(event) {
            if (event.keyCode === 13) {
                document.getElementById("enter").click();
            }
        });
    }
    else
    {
        alert("This feature is not supported in your browser. Please try another browser");
    }
}
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        isFull=0;
        document.getElementById("fullb").style.visibility= "visible";
        $("#del1").remove();
        $("#del2").remove();
    }
}
function snack() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}