function PreviewPanel()
{
	///////////////
	// Attributs //
	///////////////
	
	var html = '<div class="previewPanel" ></div>';
	
	var component = new Component(html);

	var canvas = new Canvas3DEditor(800, 600);

	canvas.setBackgroundColor(0.0, 0.0, 0.0, 1.0);

	var scene = null;

	// Création des lumières

	var mainLight = new GLLight();
	mainLight.setDirection([1.0, 1.25, -2.0]);
					
	var auxLight = new GLLight();
	auxLight.setColor([0.225, 0.2, 0.25, 1.0]);
	auxLight.setDirection([-1.0, -1.25, 2.0]);
					
	ambientLight = [0.1, 0.1, 0.1, 1.0];

	canvas.setAmbientLight(ambientLight);
	canvas.addLight(mainLight);
	canvas.addLight(auxLight);

	// Création des objets

	var workingGrid = new GLWorkingGrid();
	var workingMark = new GLWorkingMark();

	canvas.addInstance(workingGrid);
	canvas.addInstance(workingMark);

	component.appendChild(canvas);
	
	//////////////
	// Méthodes //
	//////////////

	this.refresh = function()
	{
		canvas.removeAllInstances();
		canvas.addInstance(workingGrid);
		canvas.addInstance(workingMark);

		scene = Doc.compute3D();

		canvas.addInstance(scene);
		canvas.render();
	};

	this.resize = function resize()
	{
		var width = component.offsetWidth;
		var height = component.offsetHeight;
		canvas.resize(width, height);
	};
	
	///////////////////////////////////
	// Initialisation des événements //
	///////////////////////////////////
	
	
	
	////////////////
	// Accesseurs //
	////////////////
	
	// GET

	this.getScene = function() { return scene; };
	
	// SET
	
	//////////////
	// Héritage //
	//////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("previewPanel");