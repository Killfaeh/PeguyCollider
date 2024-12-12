function MonoSynth()
{
	///////////////
	// Attributs //
	///////////////

	var instrument = new Instrument(Tone.MonoSynth);

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
	Loader.hasLoaded("monoSynth");