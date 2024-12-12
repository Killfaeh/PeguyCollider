function FMSynth()
{
	///////////////
	// Attributs //
	///////////////

	var instrument = new Instrument(Tone.FMSynth);

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
	Loader.hasLoaded("fmSynth");