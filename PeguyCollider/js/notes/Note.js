
// https://www.pianoscales.org/major.html

// do = C
// ré = D
// mi = E
// fa = F
// sol = G
// La = A
// si = B

var Notes = 
{
	all: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
};

var Keys = 
{
	/*
	'C': { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], switch: 7 },
	'Am': { notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'], switch: 7 },
	'D/Bm': { notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], switch: 7 },
	'E/C#m': { notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], switch: 7 },
	'F#/D#m': { notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'], switch: 7 },
	'G/Em': { notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], switch: 7 },
	'A/F#m': { notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], switch: 7 },
	'B/G#m': { notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'], switch: 7 },
	'C#/A#m': { notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'], switch: 7 },
	'Bb/Gm': { notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], switch: 7 },
	'Ab/Fm': { notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], switch: 7 },
	'Gb/Ebm': { notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'], switch: 7 },
	'F/Dm': { notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], switch: 7 },
	'Eb/Cm': { notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'], switch: 7 },
	'Db/Bbm': { notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'], switch: 7 },
	'Cb/Bbm': { notes: ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'], switch: 7 },
	//*/

	// Majeures

	'C': { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], switch: 7 },
	'C#': { notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'], switch: 7 },
	'Db': { notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'], switch: 6 },
	'D': { notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], switch: 6 },
	'D#': { notes: ['D#', 'E#', 'G', 'G#', 'A#', 'B#', 'D'], switch: 6 },
	'Eb': { notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'], switch: 5 },
	'E': { notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], switch: 5 },
	'F': { notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], switch: 4 },
	'F#': { notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'], switch: 4 },
	'Gb': { notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'], switch: 3 },
	'G': { notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], switch: 3 },
	'G#': { notes: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'G'], switch: 3 },
	'Ab': { notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], switch: 2 },
	'A': { notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], switch: 2 },
	'A#': { notes: ['A#', 'B#', 'D', 'D#', 'E#', 'G', 'A'], switch: 2 },
	'Bb': { notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], switch: 1 },
	'B': { notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'], switch: 1 },
	'Cb': { notes: ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'], switch: 7 },

	// Mineures naturelles

	'Am': { notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], switch: 2 },
	'A#m': { notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'], switch: 2 },
	'Bbm': { notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'], switch: 1 },
	'Bm': { notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'], switch: 1 },
	'Cm': { notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'], switch: 7 },
	'C#m': { notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'], switch: 7 },
	'Dbm': { notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'A', 'Cb'], switch: 6 },
	'Dm': { notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'], switch: 6 },
	'D#m': { notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'], switch: 6 },
	'Ebm': { notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'], switch: 5 },
	'Em': { notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'], switch: 5 },
	'Fm': { notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'], switch: 4 },
	'F#m': { notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'], switch: 4 },
	'Gbm': { notes: ['Gb', 'Ab', 'A', 'Cb', 'Db', 'D', 'Fb', 'Gb'], switch: 3 },
	'Gm': { notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'], switch: 3 },
	'G#m': { notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'], switch: 3 },
	'Abm': { notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'], switch: 2 },

	// Mineures mélodiques

	'Amm': { notes: ['A', 'B', 'C', 'D', 'E', 'F#', 'G#'], switch: 2 },
	'A#/Bb': { notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'A'], switch: 1 },
	'Bmm': { notes: ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A#'], switch: 1 },
	'Cmm': { notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'B'], switch: 7 },
	'C#/Db': { notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'C'], switch: 7 },
	'Dmm': { notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C#'], switch: 6 },
	'D#/Eb': { notes: ['D#', 'F', 'F#', 'G#', 'A#', 'C', 'D'], switch: 5 },
	'Emm': { notes: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D#'], switch: 5 },
	'Fmm': { notes: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'E'], switch: 4 },
	'F#/Gb': { notes: ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'F'], switch: 4 },
	'Gmm': { notes: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F#'], switch: 3 },
	'G#/Ab': { notes: ['G#', 'A#', 'B', 'C#', 'D#', 'F', 'G'], switch: 3 },

	// Mineures harmoniques

	'Ahm': { notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G#'], switch: 2 },
	'A#hm': { notes: ['A#', 'C', 'C#', 'D#', 'F', 'F#', 'A'], switch: 1 },
	'Bbhm': { notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'A'], switch: 1 },
	'Bhm': { notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A#'], switch: 1 },
	'Chm': { notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'], switch: 7 },
	'C#hm': { notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'C'], switch: 6 },
	'Dbhm': { notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'A', 'C'], switch: 6 },
	'Dhm': { notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C#'], switch: 6 },
	'D#hm': { notes: ['D#', 'F', 'F#', 'G#', 'A#', 'B', 'D'], switch: 6 },
	'Ebhm': { notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'D'], switch: 5 },
	'Ehm': { notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D#'], switch: 5 },
	'Fhm': { notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'E'], switch: 4 },
	'F#hm': { notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'F'], switch: 4 },
	'Gbhm': { notes: ['Gb', 'Ab', 'A', 'Cb', 'Db', 'D', 'F'], switch: 3 },
	'Ghm': { notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F#'], switch: 3 },
	'G#hm': { notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'G'], switch: 3 },
	'Abhm': { notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'G'], switch: 2 },
};

var NoteDegrees = 
{
	'Cb1': -0.5, 'C1': 0.0, 'C#1': 0.5, 'Db1': 0.5, 'D1': 1.0, 'D#1': 1.5, 'Eb1': 1.5, 'E1': 2.0, 'F1': 2.5, 'F#1': 3.0, 'Gb1': 3.0, 'G1': 3.5, 'G#1': 4.0, 'Ab1': 4.0, 'A1': 4.5, 'A#1': 5.0, 'Bb1': 5.0, 'B1': 5.5,
	'Cb2': 5.5, 'C2': 6.0, 'C#2': 6.5, 'Db2': 6.5, 'D2': 7.0, 'D#2': 7.5, 'Eb2': 7.5, 'E2': 8.0, 'F2': 8.5, 'F#2': 9.0, 'Gb2': 9.0, 'G2': 9.5, 'G#2': 10.0, 'Ab2': 10.0, 'A2': 10.5, 'A#2': 11.0, 'Bb2': 11.0, 'B2': 11.5,
	'Cb3': 11.5, 'C3': 12.0, 'C#3': 12.5, 'Db3': 12.5, 'D3': 13.0, 'D#3': 13.5, 'Eb3': 13.5, 'E3': 14.0, 'F3': 14.5, 'F#3': 15.0, 'Gb3': 15.0, 'G3': 15.5, 'G#3': 16.0, 'Ab3': 16.0, 'A3': 16.5, 'A#3': 17.0, 'Bb3': 17.0, 'B3': 17.5,
	'Cb4': 17.5, 'C4': 18.0, 'C#4': 18.5, 'Db4': 18.5, 'D4': 19.0, 'D#4': 19.5, 'Eb4': 19.5, 'E4': 20.0, 'F4': 20.5, 'F#4': 21.0, 'Gb4': 21.0, 'G4': 21.5, 'G#4': 22.0, 'Ab4': 22.0, 'A4': 22.5, 'A#4': 23.0, 'Bb4': 23.0, 'B4': 23.5,
	'Cb5': 23.5, 'C5': 24.0, 'C#5': 24.5, 'Db5': 24.5, 'D5': 25.0, 'D#5': 25.5, 'Eb5': 25.5, 'E5': 26.0, 'F5': 26.5, 'F#5': 27.0, 'Gb5': 27.0, 'G5': 27.5, 'G#5': 28.0, 'Ab5': 28.0, 'A5': 28.5, 'A#5': 29.0, 'Bb5': 29.0, 'B5': 29.5,
	'Cb6': 29.5, 'C6': 30.0, 'C#6': 30.5, 'Db6': 30.5, 'D6': 31.0, 'D#6': 31.5, 'Eb6': 31.5, 'E6': 32.0, 'F6': 32.5, 'F#6': 33.0, 'Gb6': 33.0, 'G6': 33.5, 'G#6': 34.0, 'Ab6': 34.0, 'A6': 34.5, 'A#6': 35.0, 'Bb6': 35.0, 'B6': 35.5,
	'Cb7': 35.5, 'C7': 36.0, 'C#7': 36.5, 'Db7': 36.5, 'D7': 37.0, 'D#7': 37.5, 'Eb7': 37.5, 'E7': 38.0, 'F7': 38.5, 'F#7': 39.0, 'Gb7': 39.0, 'G7': 39.5, 'G#7': 40.0, 'Ab7': 40.0, 'A7': 40.5, 'A#7': 41.0, 'Bb7': 41.0, 'B7': 41.5,
};

var DegreeNotes = 
{
	'-0.5': 'Cb1', 0.0: 'C1', 0.5: 'C#1', 1.0: 'D1', 1.5: 'D#1', 2.0: 'E1', 2.5: 'F1', 3.0: 'F#1', 3.5: 'G1', 4.0: 'G#1', 4.5: 'A1', 5.0: 'A#1', 5.5: 'B1',
	6.0: 'C2', 6.5: 'C#2', 7.0: 'D2', 7.5: 'D#2', 8.0: 'E2', 8.5: 'F2', 9.0: 'F#2', 9.5: 'G2', 10.0: 'G#2', 10.5: 'A2', 11.0: 'A#2', 11.5: 'B2',
	12.0: 'C3', 12.5: 'C#3', 13.0: 'D3', 13.5: 'D#3', 14.0: 'E3', 14.5: 'F3', 15.0: 'F#3', 15.5: 'G3', 16.0: 'G#3', 16.5: 'A3', 17.0: 'A#3', 17.5: 'B3',
	18.0: 'C4', 18.5: 'C#4', 19.0: 'D4', 19.5: 'D#4', 20.0: 'E4', 20.5: 'F4', 21.0: 'F#4', 21.5: 'G4', 22.0: 'G#4', 22.5: 'A4', 23.0: 'A#4', 23.5: 'B4',
	24.0: 'C5', 24.5: 'C#5', 25.0: 'D5', 25.5: 'D#5', 26.0: 'E5', 26.5: 'F5', 27.0: 'F#5', 27.5: 'G5', 28.0: 'G#5', 28.5: 'A5', 29.0: 'A#5', 29.5: 'B5',
	30.0: 'C6', 30.5: 'C#6', 31.0: 'D6', 31.5: 'D#6', 32.0: 'E6', 32.5: 'F6', 33.0: 'F#6', 33.5: 'G6', 34.0: 'G#6', 34.5: 'A6', 35.0: 'A#6', 35.5: 'B6',
	36.0: 'C7', 36.5: 'C#7', 37.0: 'D7', 37.5: 'D#7', 38.0: 'E7', 38.5: 'F7', 39.0: 'F#7', 39.5: 'G7', 40.0: 'G#7', 40.5: 'A7', 41.0: 'A#7', 41.5: 'B7',
};

// Ajouter des motifs de notes ? 

function Note($key, $num, $octave, $duration)
{
	//console.log("Tonalité : " + $key + '	' + (new Error()).stack);

	///////////////
	// Attributs //
	///////////////

	this.type = 'note';
	var key = $key;
	var num = $num;
	var octave = $octave;
	var duration = $duration;

	//////////////
	// Méthodes //
	//////////////

	var check = function()
	{
		if (!utils.isset(Keys[key]))
			key = 'C';
	
		if (octave < 1)
			octave = 1;
		else if (octave > 7)
			octave = 7;
	
		if (typeof num === 'number')
		{
			if (num < 0)
			{
				if (octave <= 1)
					num = 0;
				else
				{
					num = num + 7;
					octave = octave - 1;
				}
			}
			else if (num > 6)
			{
				if (octave >= 7)
					num = 6;
				else
				{
					num = num - 7;
					octave = octave + 1;
				}
			}
		}
	};

	check();

	////////////////
	// Accesseurs //
	////////////////

	// GET

	this.getKey = function() { return key; };
	this.getNum = function() { return num; };
	this.getOctave = function() { return octave; };
	this.getDuration = function() { return duration; };
	
	this.getName = function()
	{
		var name = null;

		if (utils.isset(num) && utils.isset(Keys[key]))
		{
			if (typeof num === 'number')
				name = Keys[key].notes[num] + octave;
			else
				name = num;
		}

		return name;
	};

	this.getMidiData = function()
	{
		var name = $this.getName();

		//console.log((new Error()).stack);

		//console.log("Converte to MIDI : " + name);

		var data =
		{
			pitch: [name],
			duration: duration.replace('n', ''), // Il va falloir faire d'autres traitement pour les autres types de durées
			velocity: 100,
			//channel: 1,
			relativeTick: 0,
		};

		if (!utils.isset(name))
			data = null;
			//data = { wait: duration.replace('n', '') };

		//console.log("MIDI DATA : " + data.pitch[0]);
		//console.log(data);

		//if (name !== data.pitch[0])
		//	console.log("POUET !!!");

		return data;
	};

	this.getType = function() { return null; };
	this.getLength = function() { return 1; };
	this.getNotes = function() { return [$this]; };

	// SET

	this.setKey = function($key)
	{
		key = $key;

		if (!utils.isset(Keys[key]))
			key = 'C';
	};

	this.setNum = function($num)
	{
		num = $num;
		check();
	};

	this.setOctave = function($octave)
	{
		octave = $octave;
		check();
	};

	this.setDuration = function($duration) { duration = $duration; };

	//////////////
	// Héritage //
	//////////////
	
	var $this = this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("note");