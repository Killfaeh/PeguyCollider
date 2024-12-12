function Instrument($instrument)
{
	///////////////
	// Attributs //
	///////////////

	var destroyed = false;
	var instrument = new Tone.PolySynth($instrument).toDestination();

	//////////////
	// Méthodes //
	//////////////

	this.play = function($notes, $start)
	{
		//console.log("Play notes : ");
		//console.log($notes);

		if (Array.isArray($notes))
		{
			for (var i = 0; i < $notes.length; i++)
			{
				var name = $notes[i].getName();
				var duration = $notes[i].getDuration();

				//console.log("Note to play : " + name + ', ' + duration + ', ' + $start);

				if (utils.isset(name))
					instrument.triggerAttackRelease(name, duration, $start);
			}
		}
		else
		{
			var name = $notes.getName();
			var duration = $notes.getDuration();

			//console.log("Note to play : " + name + ', ' + duration + ', ' + $start);

			if (utils.isset(name))
				instrument.triggerAttackRelease(name, duration, $start);
		}
	};

	this.dispose = function()
	{ 
		if (destroyed === false)
			instrument.dispose();

		destroyed = true;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET

	// SET

	var $this = this;

	Sequence.allInstruments.push($this);
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("instrument");