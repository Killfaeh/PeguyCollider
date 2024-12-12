function DuoSynth()
{
	///////////////
	// Attributs //
	///////////////

	var instrument = new Instrument(Tone.DuoSynth);

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
	Loader.hasLoaded("duoSynth");