var editor = {

    init: function() {
        editor.view.render();
	    $(document).ready(function(){
                editor.controller.addListeners();
            }
        );
		
    },

    view: { //Will appear in DOM. The place, where user will set what he/she wants.
        render: function() {
             //Draw in DOM.
                $("body").append("<div class='editorBody'></div>");
				$("body").append("<div class='editor'><h3>Browser Editor</h3> width: <b>"+window.innerWidth+"</b> height: <b>"+window.innerHeight+
				                        "</b><br><a href='help.html'>?</a> | <span id='editorRestore'> Restore all </span> "+
										"|<span id='editorHide'> Hide all </span>|</div>");
                $(".editor").draggable();
				
				/*Layers*/
                $(".editor").append("<hr/><div><h4>Layers <span class='editorview'>[click to colapse]</span></h4>"+
				                    "<p><input type='text' id='editorLayerSrc' placeholder='http://absolute/path/to/img.jpg'>"+
									"<input type='button' id='editorAddLayer' value='Add layer' /></p></div>");
				
				/*Lines*/
                $(".editor").append("<hr/><div><h4>Lines <span class='editorview'>[click to colapse]</span></h4><p> "+
				                    "<input type='button' id='drawHorisontalLine' value='Add horizontal line'>"+
									"<input type='button' id='drawVerticalLine' value='Add vertical line'>"+
									"<input type='button' id='removeAllLines' value='Remove all lines'></p></div>");
				
				/*Grids*/
                $(".editor").append("<hr/><div><h4>Grids <span class='editorview'>[click to colapse]</span></h4><p>"+
				                    "<input type='button' id='drawGrid' value='Draw grid'></p>"+
									"<p><input type='text' value='100' id='editorGridCellSize'/></p>"+
									"<form id='editorGridMeasure'>"+
                                    "<input type='radio' name='measure' value='pixel' checked /> px<br />"+
                                    "<input type='radio' name='measure' value='persent' /> %<br />"+
                                    "</form><form id='editorGridColor'><p>Choose grid color</p>"+
                                    "<input type='radio' name='color' value='white' /> white<br />"+
                                    "<input type='radio' name='color' value='black' /> black<br />"+
									"<input type='radio' name='color' value='gray' /> gray<br />"+
									"<input type='radio' name='color' value='magenta' /> magenta<br />"+
                                    "<input type='radio' name='color' value='yellow' /> yellow<br />"+
                                    "<input type='radio' name='color' value='blue' /> blue<br /></form></div>");

				/*Strips*/
				$(".editor").append("<hr/><div><h4>Stripes <span class='editorview'>[click to colapse]</span></h4><p>"+
				                    "<input type='button' id='editorStripe' value='Draw stripe'>"+
									"<input type='button' id='editorStripeRemove' value='Remove stripe'></p>"+
									"<p>Set margin <input type='text' value='100' id='editorStripeWidth'/></p>"+
									"<p>Set height <input type='text' value='100' id='editorStripeHeight'/></p>"+
									"<p>*Note, 100 = 1 screen height, 200 = 2, etc.</p>"+
									"<p>Set color <input type='text' value='pink' id='editorStripeColor'/></p>"+
									"<p>*Put here color name 'pink' or code '#ffbf00'.</p>");
									
				/*Dividers*/					
                $(".editor").append("<hr/><div><h4>Dividers <span class='editorview'>[click to colapse]</span></h4><p><input type='button' "+
				                    "id='editorDividerCrossScreen' value='cross screen'><input type='button' id='editorDividerX' value='cross "+
									"screen diagonal'><input type='button' id='editorRemoveAllDividers' value='remove all dividers'></p></div>");
            
        },
		
		/*Grid begine*/
		drawGrid: function(){//editor.view.drawGrid();
			$(".gridHolder").css({
                "background-image" : "linear-gradient("+editor.model.grid.color+" 2px, transparent 2px),"+
				                    "linear-gradient(90deg, "+editor.model.grid.color+" 2px, transparent 2px),"+
				                    "linear-gradient(rgba(0,0,0,.3) 1px, transparent 1px),"+
									"linear-gradient(90deg, rgba(0,0,0,.3) 1px, transparent 1px)",
                "background-size" : "100px "+editor.model.grid.width+"px, "+editor.model.grid.width+"px 100px, 10px 10px, 10px 10px",
                "background-position" : "-2px -2px, -2px -2px, -1px -1px, -1px -1px"			
			});
		},//100px 50px, 50px 100px, 10px 10px, 10px 10px    editor.model.grid.width
		
		removeGrid: function(){
			$(".gridHolder").remove();
		},
		
		reDrawGrid: function(){
			editor.view.removeGrid();
			$("body").append("<div class='gridHolder'></div>");
			editor.view.drawGrid();
		},
		/*Grid end.*/
		
		/*Stripes begine*/
		drawStripe: function(){
			$("body").append("<div class='editorStripe'></div>");
		},
		
		reDrawStripe: function(){
			$(".editorStripe").css({
				"left": editor.model.stripe.left + "px",
				"right": editor.model.stripe.left + "px",
				"background-color": editor.model.stripe.color,
				"height": editor.model.stripe.height+"vh"
			});
		},
		
		removeStripe: function(){
			$(".editorStripe").remove();
		},
		/*Stripes end.*/
		
		
		
		/*Lines begine.*/
		drawHorizontalLine: function(){
			$(".editorBody").append("<div class='editorLineHorizontal'></div>");
			$(".editorLineHorizontal").draggable({ axis: "y" });//$( "//#draggable" ).draggable({ axis: "y" });
		},
		
		drawVerticalLine: function(){
			$(".editorBody").append("<div class='editorLineVertical'></div>");
			$(".editorLineVertical").draggable({ axis: "x" });
		},
		
		removeAllLines: function(){
			$(".editorLineHorizontal, .editorLineVertical").remove();
		},
		/*Lines end.*/
		
		/*Layers begine.*/        
		drawLayer: function(src) {
			editor.view.removeLayer();
			$(".editorBody").append("<div class='editorLayer'></div>");
			$(".editorLayer").append("<img src='"+editor.model.layeR.src+"' />");
            $(".editorLayer").draggable();
        },

		removeLayer: function(){
			$(".editorLayer").remove();
		}
		/*Layers end.*/
    },

    model: {
        layeR: {
            visible: false,
            opacity: "0.4",
            src: "wallpaper.jpg",
            position: {
                x: 0,
                y: 0
            },
			exist: false,
            fixed: false,
            size: "normal",

            addListeners: function() {
                //On click "add new layer" - layer.setNewLayer(src)
            },
            setSize: function() {

            },
            zoomOut: function() {

            },
            zoomIn: function() {

            }

        },

        line: {
            color: "black",
            width: "2px",
            fixed: false
        },


        grid: {
            width: 100,
            color: "magenta",
			exist: false,
			measure: "px"
        },
		
		stripe: {
			height: 100,
			left: 100, // For both margin-left and margin-right.
			color: "pink",
			measure: "px"
		},

        ruler: {
            length: 10,
            display: false,
            toggleDisplay: function() {

            },
            changeLength: function() {

            },
            changeAngle: function() {

            },
            changeMesureItems: function() {
                //Reset item to px, cm, pt, %.
            }
        }
    },
    controller: {
        addListeners: function() {
            $(".editorview").on("click", function() {
                $(this).parent().parent().fadeOut();
                $(".editor").css("height", "auto"); // Will automatically change the view size.
            });

            $("#editorRestore").on("click", function() {
                $(".editorview").parent().parent().fadeIn();
                $(".editor").css("height", "auto"); // Will automatically change the view size.
            });

            $("#editorHide").on("click", function() {
                $(".editorview").parent().parent().fadeOut();
                $(".editor").css("height", "auto"); // Will automatically change the view size.
            });			

            $("#editorRemoveAllDividers").on("click", function() {
                editor.model.dividers.remove();
            });

            $("#editorDividerCrossScreen").on("click", function() {alert("editorDividerCrossScreen");
                editor.model.dividers.drawCross();
            });
            $("#editorDividerX").on("click", function() {
                editor.model.dividers.drawX();
            });
			
			/*Grid begine.*/
			$("#drawGrid").on("click", function(){
				if(!editor.model.grid.exist){
					$("body").append("<div class='gridHolder'></div>");
					editor.view.drawGrid();
				    $(this).val("Remove grid");
					editor.model.grid.exist = true;
				}else{
					$(this).val("Draw grid");
					editor.model.grid.exist = false;
					editor.view.removeGrid();
				}
				
			});
			
			$('#editorGridMeasure input').on('change', function() {
				editor.model.grid.measure = $('input[name="measure"]:checked', '#editorGridMeasure').val(); //Add the chosen value to DOM.				
				editor.view.reDrawGrid();//Redraw the grid in new measures px||%

            });
			
			$('#editorGridColor input').on('change', function() {
                editor.model.grid.color = $('input[name="color"]:checked', '#editorGridColor').val(); 
				editor.view.reDrawGrid();
            });
			
			$("#editorGridCellSize").on("keyup", function(){
				editor.model.grid.width = $(this).val();
				editor.view.reDrawGrid();
			});
			/*Grid end.*/
			
			
			
			/*Stripe begine.*/
			$("#editorStripe").on("click", function(){
				editor.view.drawStripe();
			});
			
			$("#editorStripeWidth").on("keyup", function(){
				editor.model.stripe.left = $("#editorStripeWidth").val();
				editor.view.reDrawStripe();
			});
			
			$("#editorStripeHeight").on("keyup", function(){
				editor.model.stripe.height = $("#editorStripeHeight").val();
				editor.view.reDrawStripe();
			});
			
			$("#editorStripeColor").on("keyup", function(){
			    editor.model.stripe.color = $("#editorStripeColor").val();
				editor.view.reDrawStripe();	
			});
			
			$("#editorStripeRemove").on("click", function(){
				editor.view.removeStripe();
			});
			/*Stripe end.*/
			
			/*Lines begine.*/
			$("#drawHorisontalLine").on("click", function(){
				editor.view.drawHorizontalLine();
			});  
			
			$("#drawVerticalLine").on("click", function(){
				editor.view.drawVerticalLine();
				//editor.view.ToggleFixLines();
			});
			
			$("#removeAllLines").on("click", function(){
				editor.view.removeAllLines();
			});
			
			/*Lines end.*/
			
			/*Layers begine.*/
			$("#editorAddLayer").on("click", function(){
				editor.view.drawLayer();
			});
			
			$("#editorLayerSrc").on("keyup", function(){
				editor.model.layeR.src = $("#editorLayerSrc").val();
				editor.view.drawLayer();
			});
			
			$("#editorAddLayer").on("click", function(){
				if(!editor.model.layeR.exist){
				    editor.view.drawLayer();
				    $(this).val("Remove layer");
					editor.model.layeR.exist = true;
				}else{
					$(this).val("Add layer");
					editor.model.layeR.exist = false;
					editor.view.removeLayer();
				}				
			});

			/*Layers end.*/
        }
    }

};

editor.init();
