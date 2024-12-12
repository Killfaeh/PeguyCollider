function Sampler($baseUrl, $urls, $defaultVelocity)
{
	///////////////
	// Attributs //
	///////////////

	var destroyed = false;
	var instrument = new Tone.Sampler({ urls: $urls, release: 1, baseUrl: $baseUrl, }).toDestination();
	var defaultVelocity = $defaultVelocity;

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

				//console.log("Note to play (Array) : " + name + ', ' + duration + ', ' + $start);
				//console.log($notes[i]);

				if (utils.isset(name))
					instrument.triggerAttackRelease(name, duration, $start, defaultVelocity);
			}
		}
		else
		{
			var name = $notes.getName();
			var duration = $notes.getDuration();

			//console.log("Note to play (No array) : " + name + ', ' + duration + ', ' + $start);
			//console.log($notes);

			if (utils.isset(name))
				instrument.triggerAttackRelease(name, duration, $start, defaultVelocity);
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
	Loader.hasLoaded("sampler");