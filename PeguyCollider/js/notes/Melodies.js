// https://composer-sa-musique.fr/

var Progressions = 
[
	[0, 4, 5, 3],
	[0, 0, 0, -2],
	[0, 0, 0, -3],
	[0, 0, 2, 2],
];

/*
var ChordMelodies = 
[
	[0, 5, 1, 4],
	[0, 5, 3, 4],
	[0, 4, 5, 3],
	[0, 5, 2, 6]
];
//*/

/*
var Progressions = 
{
	'major':
	[
		[1, 6, 4, 5],
		[1, 5, 6, 4], // La progression "magique"
		[2, 5, 1],
		[7, 5, 1],
		[5, 5, 1],
		[2, 7, 1],
		[6, 2, 5, 1],
		[1, 5, 4, 4, 1, 5, 1, 5],
		[5, 3],
		[1, 4, 2, 5],
		[1, 5, 4, 3, 4, 1, 4, 5],
		[1, 4, 1, 5, 1, 4, 1, 5, 1],
		[1, 5, 6, 4],
		[3, 4, 2, 5],
		[3, 7, 1, 5, 3, 7, 1, 5, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 1],
		[1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 1],
		[1, 6, 2, 5],
		[5, 4, 1],
		[4, 5, 3, 6],
		[6, 7, 1],
	],

	'minor': 
	[
		[1, 7, 1, 5, 3, 7, 1, 5, 1],
		[1, 7, 6, 7],
	]
};
//*/

var Melodies = 
{
	// Générer un schéma de découpage d'arpège aléatoire
	createRandomSlice: function($duration, $min, $rest)
	{
		if (!utils.isset($min))
			$min = 0;

		var totalNotes = nbNotesPerDuration[$duration];
		//console.log("Total notes : " + totalNotes);

		var durationsArray = [];

		if ($rest === true)
			durationsArray.push(0);

		for (var key in durationPerNBNotes)
		{
			if (key >= $min && key <= totalNotes)
				durationsArray.push(parseInt(key));
		}

		var slice = [];
		var offset = 0;
		var notRestPosition = 0;

		for (var i = 0; i < totalNotes; i++)
		{
			if (i == 0 || i >= notRestPosition+slice[notRestPosition])
			{
				//console.log("offset : " + offset);
				//console.log("Duration array");
				//console.log(durationsArray);

				if (durationsArray.length > 0)
				{
					var newDuration = durationsArray[Math.floor(Math.random()*durationsArray.length)];
					slice.push(parseInt(newDuration));
					offset = offset + parseInt(newDuration);
					notRestPosition = i;
				}
				else
				{
					slice.push(parseInt(0));
					offset = offset + 1;
					notRestPosition = i;
				}

				var maxNotes = totalNotes-offset;

				durationsArray = [];

				if ($rest === true)
					durationsArray.push(0);

				for (var key in durationPerNBNotes)
				{
					if (key >= $min && key <= maxNotes)
						durationsArray.push(parseInt(key));
				}
			}
			else
				slice.push(0);
		}

		return slice;
	},

	createChordRandomSlice: function($nbNotes, $duration, $min, $rest)
	{
		var slice = [];

		for (var i = 0; i < $nbNotes; i++)
			slice.push(Melodies.createRandomSlice($duration, $min, $rest));

		return slice;
	},

	concatSlice: function($slice1, $slice2)
	{
		var slice = [];

		for (var i = 0; i < $slice1.length; i++)
			slice.push($slice1[i]);

		for (var i = 0; i < $slice2.length; i++)
			slice.push($slice2[i]);

		return slice;
	},

	concatChordSlice: function($slice1, $slice2)
	{
		var max = Math.max($slice1.length, $slice2.length);
		var slice = [];

		for (var i = 0; i < max; i++)
			slice.push(new Array());

		for (var i = 0; i < $slice1.length; i++)
		{
			for (var j = 0; j < $slice1[i].length; j++)
				slice[i].push($slice1[i][j]);
		}

		for (var i = 0; i < $slice2.length; i++)
			{
				for (var j = 0; j < $slice2[i].length; j++)
					slice[i].push($slice2[i][j]);
			}

		return slice;
	},

	createRest: function($nbNotes)
	{
		var pattern = [];

		for (var i = 0; i < $nbNotes; i++)
			pattern.push(null);

		return pattern;
	},

	// Générer une mélodie monophonique aléatoire
	// Ajouter pattern de rythme, générer des rythmes aléatoires
	createRandomMonophonic: function($nb, $key, $octave, $duration, $start, $amplitude, $selectMode)
	{
		if (!utils.isset($amplitude))
			$amplitude = 8.0;

		var notes = [];
		var octave = $octave;
		var startIndex = 0;
		var durationNbNote = nbNotesPerDuration[$duration];
		var nbNull = durationNbNote-1;

		//var combo = ChordMelodies[Math.floor(Math.random()*ChordMelodies.length)];

		if (utils.isset($start))
		{
			startIndex = 1;

			if ($start >= Keys[$key].switch)
				octave = octave + 1;

			notes.push(new Note($key, $start, octave, $duration));
			
			for (var j = 0; j < nbNull; j++)
				notes.push(null);
		}
		else
			$start = Math.floor(Math.random()*7.0);

		if (!utils.isset($selectMode))
			$selectMode = Math.floor(Math.random()*3.0);
		else if ($selectMode >= 4)
			$selectMode = Math.floor(Math.random()*3.0) + 1;

		var progression = Progressions[Math.floor(Math.random()*Progressions.length)];

		for (var i = startIndex; i < $nb; i++)
		{
			octave = $octave;
			var num = $start;

			if (i > 0)
				num = $start + Math.round((Math.random()-0.5)*$amplitude);

			//num = combo[i];

			if ($selectMode === 3)
			{
				if (utils.isset(progression[i]))
					num = progression[i];
			}
			else if ($selectMode === 2 && i > 0)
			{
				var select = Math.round(Math.random());
				var delta = $nb-1 - i;

				if (select === 1)
					num = $start + delta*2;
				else
					num = $start - delta*2;
			}
			else if ($selectMode === 1 && i > 0)
			{
				var back = 2;

				if (i === 1)
					back = 1;

				var select = Math.round(Math.random());

				if (select === 1)
					num = notes[(i-back)*(nbNull+1)].getNum() + 2;
				else
					num = notes[(i-back)*(nbNull+1)].getNum() - 2;
			}

			if (num >= 7)
			{
				num = num - 7;
				octave = octave + 1;
			}
			else if (num < 0)
			{
				num = num + 7;
				octave = octave - 1;
			}

			if (num >= Keys[$key].switch)
				octave = octave + 1;

			notes.push(new Note($key, num, octave, $duration));
			
			for (var j = 0; j < nbNull; j++)
				notes.push(null);
		}

		return notes;
	},

	// Générer une variation de mélodie

	// Générer des accords à partir d'une mélodie monophonique
	createChordFromMonophonic: function($notes, $type)
	{
		if (!utils.isset($type))
			$type = 'something';

		var notes = [];

		for (var i = 0; i < $notes.length; i++)
		{
			if (utils.isset($notes[i]))
				notes.push(new Chord($notes[i], $type));
			else
				notes.push(null);
		}

		return notes;
	},

	// Générer une mélodie en piochant une note dans un accord (contrepoint)
	createCounterpoint: function($notes, $min, $pattern, $amplitude)
	{
		if (!utils.isset($amplitude))
			$amplitude = 8.0;

		var notes = [];

		for (var i = 0; i < $notes.length; i++)
		{
			if (utils.isset($notes[i]))
			{
				var chordNotes = $notes[i].getNotes();
				var type = $notes[i].getType();

				/*
				if (type === 'minor')
					chordNotes.splice(1, 1);
				else if (type === 'diminished')
				{
					chordNotes = [chordNotes[0]];
					//chordNotes.splice(1, 1);
					//chordNotes.splice(1, 1);
				}
				else if (utils.isset(type))
					chordNotes.splice(2, 1);
				//*/

				//var randomNoteFromChord = chordNotes[Math.floor(Math.random()*chordNotes.length)];
				var randomNoteFromChord = chordNotes[0];
				var pattern = null;

				//console.log("Pattern " + i + " : ");
				//console.log($pattern[i]);

				if (utils.isset($pattern) && utils.isset($pattern[i]))
					pattern = $pattern[i];
				else
					pattern = Melodies.createRandomSlice($notes[i].getDuration(), $min);

				for (var j = 0; j < pattern.length; j++)
				{
					if (pattern[j] > 0)
					{
						if (j === 0)
							notes.push(new Note(randomNoteFromChord.getKey(), randomNoteFromChord.getNum(), randomNoteFromChord.getOctave(), durationPerNBNotes[pattern[j]]));
						else
						{
							var randomNoteFromChord2 = chordNotes[Math.floor(Math.random()*chordNotes.length)];
							var num = randomNoteFromChord.getNum() + Math.round((Math.random()-0.5)*$amplitude);
							num = randomNoteFromChord2.getNum();
							notes.push(new Note(randomNoteFromChord.getKey(), num, randomNoteFromChord.getOctave(), durationPerNBNotes[pattern[j]]));
						}
					}
					else
						notes.push(null);
				}
			}
		}

		return notes;
	},

	// Changer la hauteur d'une mélodie
	changeSimpleNotePitch: function($note, $octave, $degree)
	{
		//console.log("Original num (simple note) : " + $note.getNum());
		var num = $note.getNum();
		
		if (typeof $note.getNum() === 'number')
			num = $note.getNum() + $degree;

		//console.log('Num : ' + num);

		//console.log((new Error()).stack);

		var note = new Note($note.getKey(), num, $note.getOctave() + $octave, $note.getDuration());
		//console.log("Original : " + $note.getName() + ", New : " + note.getName());
		return note;
	},

	changeChordPitch: function($chord, $octave, $degree)
	{
		var chordNotes = $chord.getNotes();
		var type = $chord.getType();
		var chord = null;

		/*
		if (utils.isset(type))
		{
			console.log("Original num : " + chordNotes[0].getNum());
			var num = chordNotes[0].getNum() + $degree;
			console.log("Type : " + type + ', num : ' + num);
			//chord = new Chord(new Note(chordNotes[0].getKey(), chordNotes[0].getNum() + $degree, chordNotes[0].getOctave() + $octave, chordNotes[0].getDuration()), type);
			chord = new Chord(Melodies.changeSimpleNotePitch(chordNotes[0], $octave, $degree));
		}
		else
		//*/
		{
			var newChordNotes = [];

			for (var i = 0; i < chordNotes.length; i++)
			{
				//console.log("Original num : " + chordNotes[i].getNum());
				var num = chordNotes[i].getNum() + $degree;
				//console.log('Num : ' + num);
				//console.log("Original : " + $note.getName() + ", New : " + note.getName());
				//newChordNotes.push(new Note(chordNotes[i].getKey(), chordNotes[i].getNum() + $degree, $note.getOctave() + $octave, chordNotes[i].getDuration()));
				newChordNotes.push(Melodies.changeSimpleNotePitch(chordNotes[i], $octave, $degree));
			}

			chord = new Chord(newChordNotes);
		}

		return chord;
	},

	changeArpeggioPitch: function($arpeggio, $octave, $degree)
	{
		var chord = $arpeggio.getChord();
		var newChord = Melodies.changeChordPitch(chord, $octave, $degree);
		var arpeggio = new Arpeggio(newChord, $arpeggio.getDuration(), $arpeggio.getPattern());
		return arpeggio;
	},

	changeNotePitch: function($note, $octave, $degree)
	{
		if ($octave < -6)
			$octave = -6;
		else if ($octave > 6)
			$octave = 6;

		if ($degree < -6)
			$degree = -6;
		else if ($degree > 6)
			$degree = 6;

		var note = null;

		if ($note.type === 'arpeggio')
			note = Melodies.changeArpeggioPitch($note, $octave, $degree);
		else if ($note.type === 'chord')
			note = Melodies.changeChordPitch($note, $octave, $degree);
		else
			note = Melodies.changeSimpleNotePitch($note, $octave, $degree);

		return note;
	},

	changePitch: function($notes, $octave, $degree)
	{
		var notes = [];

		for (var i = 0; i < $notes.length; i++)
		{
			if (utils.isset($notes[i]))
				notes.push(Melodies.changeNotePitch($notes[i], $octave, $degree));
			else
				notes.push(null);
		}

		return notes;
	},

	// Générer un découpage aléatoire (ou pas) pour les arpèges
	createArpeggioFromChord: function($notes, $min, $pattern)
	{
		var notes = [];

		for (var i = 0; i < $notes.length; i++)
		{
			if (utils.isset($notes[i]))
			{
				var pattern = null;

				if (utils.isset($pattern) && utils.isset($pattern[i]))
					pattern = $pattern[i];
				else
					pattern = Melodies.createChordRandomSlice($notes[i].getLength(), $notes[i].getDuration(), $min);

				notes.push(new Arpeggio($notes[i], $notes[i].getDuration(), pattern));
			}
			else
				notes.push(null);
		}

		return notes;
	},

	// Générer une variation d'arpège (ou pas)
};

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("melodies");