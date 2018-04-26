var songcount=0;
var audio = new Audio('boko.mp3');
var x;
var pool = [];
var poolSize = 0;
var springy;
var graph = new Springy.Graph();
$('button').click(function(e){
    $('#myDiv').toggleClass('fullscreen');
});

function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
}


var t = 1000;
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
                if (request.readyState === 4 && request.status === 200) {
                    location.replace('menu.html');
                }
                else if(request.status === 404 && request.readyState===4)
                {
                    mess="Invalid username or password";
                    //boot();
                    alert('Invalid username or password');
                }
            };
            request.open('POST', 'http://localhost:3000/score/'+parseInt(document.getElementById('i').textContent)+"/"+username, true);
            request.send();

            if(result==true) {
                location.replace('main.html');

            }
            else {
                location.replace('menu.html');

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
          //alert('hello');
            document.getElementById("enter").click();
        }
    });
    jQuery(function(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status==200) {
                //alert(request.responseText);
                var connections = request.responseText.split("^");
                pool.push("!"+connections[0].trim());
                for(var i=1;i<connections.length;i++)
                {
                    pool.push(connections[i].trim());
                    poolSize++;

                }
                graph.addNodes(toTitleCase(connections[0]).trim());
                for(var i=1;i<connections.length;i++)
                {
                    var hidden=hide(connections[i].trim());
                    //alert(connections.length);
                    graph.addNodes(hidden);
                    graph.addEdges([toTitleCase(connections[0]).trim(),hidden]);
                }
                onTimer();
            }
        };
        request.open('GET', 'http://localhost:3000/default', true);
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
    //alert(sug.length);
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
function hint() {
    alert("I am an alert box!");
}

function enter() { //documentation for function is after the function ends
    x = document.getElementById("inputsm").value;
    document.getElementById("inputsm").value="";


    var connections;

        var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {

            var foo = document.getElementById("past");
            var li = document.createElement("li");
            var text = document.createTextNode(x);
            li.appendChild( text );
            foo.appendChild(li);


            var y=parseInt(document.getElementById('i').textContent);
            document.getElementById('i').textContent=y+t;

            connections = request.responseText.split("^");
            for(var i=0;i<pool.length;i++) {
                if (pool[i] === (x.toUpperCase().trim())) {//add the suggestion in the graph if it matches the word in pool
                    pool[i] = "!"+pool[i];//mark the word added as ! to denote that it is open
                    var hidden =hide(toTitleCase(x.trim()));
                    removenodee(hidden);
                    graph.addNodes(toTitleCase(x.trim()));//add the trimmed and titled cases suggestion to the graph
                }
                console.log(pool[i]+" ");//debugging
            }


                for(var i=0;i<connections.length;i++)//add an edge from the suggested word to any open nodes in the graph
                {
                    var flag = false;//checks if the connection is already there in the pool
                    for(var j=0;j<poolSize;j++) {
                        if (("!" + connections[i]) === pool[j]) {//if the connection is open in the graph/the connection is already in the !pool
                            var check = false;
                            for(var k = 0; k < graph.nodes.length; k++)
                            {
                                if(graph.nodes[k] === pool[j] || pool[j].charAt(0) == "!")
                                    check = true;
                            }
                            if(!check)
                                graph.addNodes(toTitleCase(pool[j].trim()));
                           // alert(toTitleCase(x.trim())+"      "+ toTitleCase(connections[i]));
                            graph.addEdges([toTitleCase(x.trim()), toTitleCase(connections[i])]);
                            flag = true;
                          //  continue;
                        }
                        if(connections[i] === pool[j])
                            flag = true;
                    }
                    if(!flag)
                    {
                        if(connections[i].length>0) {
                            pool.push(connections[i].trim());
                            //add the connections in the hidden format to graph
                           // alert(connections[i]);

                            var hidden = hide(connections[i]);
                            graph.addNodes(hidden);
                            graph.addEdges([toTitleCase(x).trim(), hidden]);
                            //added the connection to the graph and added the edge
                            console.log("Added: " + connections[i]);
                            poolSize++;
                        }
                    }
                }

        }
        else if(request.readyState == 4)
        {
            var foo = document.getElementById("past");
            var li = document.createElement("li");
            li.setAttribute("style", "color:red");
            var text = document.createTextNode(x);
            li.appendChild( text );
            foo.appendChild(li);
        }
    };
    request.open('POST', 'http://localhost:3000/guess/'+x, true);
    request.send();


}
/*
       *
       ** REMOVE element*/
        function removenodee(sug) {
            var nodeto;
            for (var i = graph.nodes.length - 1; i >= 0; i--) {
                if (graph.nodes[i].id == sug)
                    nodeto = graph.nodes[i];

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
                location.replace('menu.html');

            }
            else {
                $(document).on('click', '.modal-backdrop', function (event) {
                    bootbox.hideAll()
                });

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
        var button = document.createElement("button");

//Assign different attributes to the element.
        element.setAttribute("type", "text");
        element.setAttribute("id", "del1");
        element.setAttribute("name", "Test Name");
        element.setAttribute("style", "width:200px");

        button.setAttribute("style", "width:200px");
        button.setAttribute("style", "height:30px");
        button.setAttribute("value", "ENTER");
        button.setAttribute("id", "del2");

// 'foobar' is the div id, where new fields are to be added
        var foo = document.getElementById("full4");

//Append the element in page (in span).
        foo.appendChild(element);
        foo.appendChild(button);

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
        document.getElementById("fullb").style.visibility= "visible";
        $("#del1").remove();
        $("#del2").remove();
    }
}
