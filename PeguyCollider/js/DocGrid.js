function DocGrid()
{
	///////////////
	// Attributs //
	///////////////
	
	var html = '<div class="documentGrid" >'
				+ '<div id="toolsPanel" class="toolsPanel" >'
				+ '</div>'
				+ '<div id="topPanel" class="panel topPanel" >'
				+ '</div>'
				+ '<div id="bottomPanel" class="bottomPanel" >'
					+ '<div id="leftPanel" class="panel leftPanel" >'
					+'</div>'
					+ '<div id="rightPanel" class="panel rightPanel" >'
					+ '</div>'
				+ '</div>'
			+ '</div>';
	
	var component = new Component(html);
	
	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 400);
	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 200);
	
	component.getById('bottomPanel').appendChild(slide1);
	component.appendChild(slide2);
	
	///////////////////////////////////
	// Initialisation des événements //
	///////////////////////////////////
	
	slide1.onDrag = function() { Events.resize(); };
	slide2.onDrag = function() { Events.resize(); };
	
	//////////////
	// Héritage //
	//////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("docGrid");