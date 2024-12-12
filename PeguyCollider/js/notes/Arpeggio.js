
// A compléter
var nbNotesPerDuration = 
{
	'1n': 16,
	'2n': 8,
	'4n': 4,
	'8n': 2,
	'16n': 1
};

var durationPerNBNotes = 
{
	1: '16n',
	2: '8n',
	4: '4n',
	8: '2n',
	16: '1n'
};

// Ajouter des motifs de rythmes

var beatPatterns = 
[
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Bien pour la basse électrique
	[2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0], // Idem en 2 fois plus lent
	[1, 1, 2, 0, 1, 1, 2, 0, 1, 1, 2, 0, 1, 1, 2, 0], // Comparable à un galop de cheval
	[2, 0, 2, 0, 4, 0, 0, 0, 2, 0, 2, 0, 4, 0, 0, 0], // Idem en 2 fois plus lent
	[2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0], // Jouer 2 fois chaque note de la mélodie de base
];

function Arpeggio($chord, $duration, $pattern)
{
	///////////////
	// Attributs //
	///////////////

	this.type = 'arpeggio';
	var key = 'C';
	var chord = $chord;
	var duration = $duration;
	var pattern = $pattern;

	//////////////
	// Méthodes //
	//////////////

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getKey = function() { return key; };
	this.getChord = function() { return chord; };
	this.getDuration = function() { return duration; };
	this.getPattern = function() { return pattern; };
	//this.getName = function() {};

	this.getSequence = function()
	{
		var notes = chord.getNotes();
		/*
		console.log('Chord notes : ');
		console.log(notes);
		console.log('Pattern : ');
		console.log(pattern);
		//*/

		/*
		for (var i = 0; i < notes.length; i++)
			console.log("Num : " + notes[i].getNum());
		//*/

		var maxNotes = nbNotesPerDuration[duration];
		var minArray = Math.min(notes.length, pattern.length);
		var sequence = [];

		if (minArray > 0)
		{
			for (var i = 0; i < maxNotes; i++)
			{
				var chordNotes = [];

				for (var j = 0; j < minArray; j++)
				{
					var nbNotes = pattern[j][i];
					var note = notes[j];
					
					if (nbNotes > 0)
					{
						var newNote = new Note(note.getKey(), note.getNum(), note.getOctave(), durationPerNBNotes[nbNotes]);
						chordNotes.push(newNote);
					}
				}

				sequence.push(chordNotes);
			}
		}

		return sequence;
	};

	this.getMidiData = function()
	{
		var data = [];
		var sequence = $this.getSequence();

		for (var i = 0; i < sequence.length; i++)
		{
			if (sequence[i].length > 0)
			{
				for (var j = 0; j < sequence[i].length; j++)
				{
					if (utils.isset(sequence[i][j]))
					{
						//console.log((new Error()).stack);

						//console.log("Converte to MIDI : " + sequence[i][j].getName());
						//console.log(sequence[i][j].getName());

						var pitchData =
						{
							pitch: [sequence[i][j].getName()],
							duration: sequence[i][j].getDuration().replace('n', ''),
							velocity: 100,
							//channel: j+1,
							relativeTick: i,
						};

						//console.log("MIDI DATA : " + pitchData.pitch[0]);
						//console.log(pitchData);
						
						data.push(pitchData);
					}
				}
			}
			//else
			//	data.push({ wait: 1 });
		}

		return data;
	};

	// SET

	this.setKey = function($key) { key = $key; };

	//////////////
	// Héritage //
	//////////////
	
	var $this = this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("arpeggio");