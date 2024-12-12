function MetalSynth()
{
	///////////////
	// Attributs //
	///////////////

	var instrument = new Instrument(Tone.MetalSynth);

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
	Loader.hasLoaded("metalSynth");