function Piano()
{
	///////////////
	// Attributs //
	///////////////

	var instrument = new Sampler('instruments/piano/', 
									{
										C4: "C4.mp3",
										"D#4": "Ds4.mp3",
										"F#4": "Fs4.mp3",
										A4: "A4.mp3",
									}, 1.0);

	//////////////
	// Méthodes //
	//////////////

	////////////////
	// Accesseurs //
	////////////////

	// GET

	// SET

	//////////////
	// Héritage //
	//////////////
	
	var $this = utils.extend(instrument, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("piano");