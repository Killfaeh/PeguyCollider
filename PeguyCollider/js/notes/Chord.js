function Chord($note, $type)
{
	///////////////
	// Attributs //
	///////////////

	this.type = 'chord';
	var note = $note;
	var type = $type;

	//////////////
	// Méthodes //
	//////////////

	this.getName = function()
	{
		var names = [];

		if (Array.isArray(note))
		{
			for (var i = 0; i < note.length; i++)
				names.push(note[i].getName());

			//console.log("Names : ");
			//console.log(names);
		}
		else
		{
			var baseName = note.getName();
			names.push(baseName);

			var key = Keys[note.getKey()];
			//var degre = key.notes.indexOf(baseName.replace(/[0-9]/, ''));
			var degre = note.getNum();
			var octave = note.getOctave();

			//if (type === 'major')
			{
				var degre1 = degre+2;
				var degre2 = degre+4;
				var octave1 = octave;
				var octave2 = octave;

				if (degre1 > 6)
				{
					degre1 = degre1 - 7;

					if (Keys[note.getKey()].switch === 7 || degre1 >= Keys[note.getKey()].switch)
						octave1 = octave1 + 1;
				}
				else if (degre < Keys[note.getKey()].switch && degre1 >= Keys[note.getKey()].switch)
					octave1 = octave1 + 1;
	
				if (degre2 > 6)
				{
					degre2 = degre2 - 7;
	
					if (Keys[note.getKey()].switch === 7 || degre2 >= Keys[note.getKey()].switch)
						octave2 = octave2 + 1;
				}
				else if (degre < Keys[note.getKey()].switch && degre2 >= Keys[note.getKey()].switch)
					octave2 = octave2 + 1;

				//console.log("Base : " + degre + ", degre 1 : " + degre1 + ", degre 2 : " + degre2);

				/*
				if (degre1 < 0)
				{
					if (octave1 <= 1)
						degre1 = 0;
					else
					{
						degre1 = degre1 + 7;
						octave1 = octave1 - 1;
					}
				}
				else if (degre1 > 6)
				{
					if (octave1 >= 7)
						degre1 = 6;
					else
					{
						degre1 = degre1 - 7;
						octave1 = octave1 + 1;
					}
				}

				if (degre2 < 0)
				{
					if (octave2 <= 1)
						degre2 = 0;
					else
					{
						degre2 = degre2 + 7;
						octave2 = octave2 - 1;
					}
				}
				else if (degre2 > 6)
				{
					if (octave2 >= 7)
						degre2 = 6;
					else
					{
						degre2 = degre2 - 7;
						octave2 = octave2 + 1;
					}
				}
				//*/

				names.push(key.notes[degre1]+octave1);
				names.push(key.notes[degre2]+octave2);
			}
			/*
			else if (type === 'minor')
			{
				var degre1 = NoteDegrees[baseName];
				var degre2 = degre+4;
				var octave2 = octave;

				if (degre2 < 0)
				{
					if (octave2 <= 1)
						degre2 = 0;
					else
					{
						degre2 = degre2 + 7;
						octave2 = octave2 - 1;
					}
				}
				else if (degre2 > 6)
				{
					if (octave2 >= 7)
						degre2 = 6;
					else
					{
						degre2 = degre2 - 7;
						octave2 = octave2 + 1;
					}
				}

				console.log("NEW DEGREE 1 : " + DegreeNotes[degre1+1.5]);
				names.push(DegreeNotes[degre1+1.5]);
				names.push(key.notes[degre2]+octave2);
			}
			else if (type === 'diminished')
			{
				var degre1 = NoteDegrees[baseName];
				names.push(DegreeNotes[degre1+1.5]);
				names.push(DegreeNotes[degre1+3.0]);
			}
			else if (utils.isset(type))
			{
				var degre1 = degre+2;
				var degre2 = NoteDegrees[baseName];
				var octave1 = octave;

				if (degre1 < 0)
				{
					if (octave1 <= 1)
						degre1 = 0;
					else
					{
						degre1 = degre1 + 7;
						octave1 = octave1 - 1;
					}
				}
				else if (degre1 > 6)
				{
					if (octave1 >= 7)
						degre1 = 6;
					else
					{
						degre1 = degre1 - 7;
						octave1 = octave1 + 1;
					}
				}

				names.push(key.notes[degre1]+octave1);
				names.push(DegreeNotes[degre2+4.0]);
			}
			//*/

			//console.log("Names : ");
			//console.log(names);
		}

		return names;
	};

	this.getDuration = function()
	{
		if (Array.isArray(note))
			return note[0].getDuration();
		else
			return note.getDuration();
	};

	this.getMidiData = function()
	{
		var name = $this.getName();
		var duration = $this.getDuration();

		for (var i = 0; i < durations.length; i++)
			durations[i] = durations[i].replace('n', ''); // Il va falloir faire d'autres traitement pour les autres types de durées

		var data =
		{
			pitch: name,
			duration: duration, 
			velocity: 100,
			relativeTick: 0,
		};

		if (!utils.isset(name))
			data = null;

		return data;
	};

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getNote = function() { return note; };
	this.getType = function() { return type; };

	this.getLength = function()
	{
		var length = 3;

		if (Array.isArray(note))
			length = note.length;

		return length;
	};

	this.getNotes = function()
	{
		var notes = note;

		if (!Array.isArray(note))
		{
			notes = [note];

			var baseName = note.getName();
			var key = Keys[note.getKey()];
			//var degre = key.notes.indexOf(baseName.replace(/[0-9]/, ''));
			var degre = note.getNum();
			var octave = note.getOctave();

			console.log(degre);

			//if (type === 'major')
			{
				var degre1 = degre+2;
				var degre2 = degre+4;
				var octave1 = octave;
				var octave2 = octave;

				if (degre1 > 6)
				{
					degre1 = degre1 - 7;

					if (Keys[note.getKey()].switch === 7 || degre1 >= Keys[note.getKey()].switch)
						octave1 = octave1 + 1;
				}
				else if (degre < Keys[note.getKey()].switch && degre1 >= Keys[note.getKey()].switch)
					octave1 = octave1 + 1;

				if (degre2 > 6)
				{
					degre2 = degre2 - 7;

					if (Keys[note.getKey()].switch === 7 || degre2 >= Keys[note.getKey()].switch)
						octave2 = octave2 + 1;
				}
				else if (degre < Keys[note.getKey()].switch && degre2 >= Keys[note.getKey()].switch)
					octave2 = octave2 + 1;

				/*
				if (degre1 < 0)
				{
					if (octave1 <= 1)
						degre1 = 0;
					else
					{
						degre1 = degre1 + 7;
						octave1 = octave1 - 1;
					}
				}
				else if (degre1 > 6)
				{
					if (octave1 >= 7)
						degre1 = 6;
					else
					{
						degre1 = degre1 - 7;
						octave1 = octave1 + 1;
					}
				}

				if (degre2 < 0)
				{
					if (octave2 <= 1)
						degre2 = 0;
					else
					{
						degre2 = degre2 + 7;
						octave2 = octave2 - 1;
					}
				}
				else if (degre2 > 6)
				{
					if (octave2 >= 7)
						degre2 = 6;
					else
					{
						degre2 = degre2 - 7;
						octave2 = octave2 + 1;
					}
				}
				//*/

				//console.log("Base : " + degre + ", degre 1 : " + degre1 + ", degre 2 : " + degre2);

				notes.push(new Note(note.getKey(), degre1, octave1, note.getDuration()));
				notes.push(new Note(note.getKey(), degre2, octave2, note.getDuration()));
			}
			/*
			else if (type === 'minor')
			{
				var degre1 = NoteDegrees[baseName];
				var degre2 = degre+4;
				var octave2 = octave;
	
				if (degre2 < 0)
				{
					if (octave2 <= 1)
						degre2 = 0;
					else
					{
						degre2 = degre2 + 7;
						octave2 = octave2 - 1;
					}
				}
				else if (degre2 > 6)
				{
					if (octave2 >= 7)
						degre2 = 6;
					else
					{
						degre2 = degre2 - 7;
						octave2 = octave2 + 1;
					}
				}

				console.log("NEW DEGREE 2 : " + DegreeNotes[degre1+1.5]);
				notes.push(new Note(note.getKey(), DegreeNotes[degre1+1.5], 1, note.getDuration()));
				notes.push(new Note(note.getKey(), degre2, octave2, note.getDuration()));
			}
			else if (type === 'diminished')
			{
				var degre1 = NoteDegrees[baseName];
				notes.push(new Note(note.getKey(), DegreeNotes[degre1+1.5], 1, note.getDuration()));
				notes.push(new Note(note.getKey(), DegreeNotes[degre1+3.0], 1, note.getDuration()));
			}
			else if (utils.isset(type))
			{
				var degre1 = degre+2;
				var degre2 = NoteDegrees[baseName];
				var octave1 = octave;
	
				if (degre1 < 0)
				{
					if (octave1 <= 1)
						degre1 = 0;
					else
					{
						degre1 = degre1 + 7;
						octave1 = octave1 - 1;
					}
				}
				else if (degre1 > 6)
				{
					if (octave1 >= 7)
						degre1 = 6;
					else
					{
						degre1 = degre1 - 7;
						octave1 = octave1 + 1;
					}
				}

				notes.push(new Note(note.getKey(), degre1, octave1, note.getDuration()));
				notes.push(new Note(note.getKey(), DegreeNotes[degre2+4.0], 1, note.getDuration()));				
			}
			//*/
		}

		return notes;
	};

	// SET

	this.setNote = function($note) { note = $note; };
	this.setType = function($type) { type = $type; };

	this.setKey = function($key)
	{
		if (Array.isArray(note))
		{
			for (var i = 0; i < note.length; i++)
				note[i].setKey($key);
		}
		else
			note.setKey($key);
	};

	//////////////
	// Héritage //
	//////////////
	
	var $this = this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("chord");