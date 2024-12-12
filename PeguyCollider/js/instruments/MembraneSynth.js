function MembraneSynth()
{
	///////////////
	// Attributs //
	///////////////

	var instrument = new Instrument(Tone.MembraneSynth);

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
	Loader.hasLoaded("membraneSynth");