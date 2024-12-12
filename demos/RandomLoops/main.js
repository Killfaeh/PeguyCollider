Sequence.key = 'C';
Sequence.bpm = 100;

var name = 'testMajor';
var timestamp = (new Date()).getTime();

//// Instruments initialisation ////

//var piano = new ClassicElectricPiano();
var piano = new SteinwayGrandPiano();

Sequence.setInstrument('bigBassPiano', piano);
Sequence.setInstrument('bassPiano', piano);
Sequence.setInstrument('chordPiano', piano);
Sequence.setInstrument('counterpointPiano', piano);

//// Init melody ////

// Bass
var notesBasse = Melodies.createRandomMonophonic(4, Sequence.key, 3, '2n', 0, 8.0);

// Chords
var notesChord = Melodies.changePitch(notesBasse, 1, 0);
notesChord = Melodies.createChordFromMonophonic(notesChord);

//// Variations ////

var nbVariations = 3;

// Beat
//var chordPattern = Melodies.createChordRandomSlice(3, '2n', 2);
//var counterpointPattern = Melodies.createRandomSlice('2n', 2);
//var bassPattern = Melodies.createRandomSlice('2n'); 

var chordMin = 1;
var chordPattern = [Melodies.createChordRandomSlice(3, '2n', chordMin), null, null, null, null, null, null, null,
					Melodies.createChordRandomSlice(3, '2n', chordMin), null, null, null, null, null, null, null,
					Melodies.createChordRandomSlice(3, '2n', chordMin), null, null, null, null, null, null, null,
					Melodies.createChordRandomSlice(3, '2n', chordMin), null, null, null, null, null, null, null];

var counterpointMin = 1;
var counterpointPattern = [Melodies.createRandomSlice('2n', counterpointMin), null, null, null, null, null, null, null,
							Melodies.createRandomSlice('2n', counterpointMin), null, null, null, null, null, null, null,
							Melodies.createRandomSlice('2n', counterpointMin), null, null, null, null, null, null, null,
							Melodies.createRandomSlice('2n', counterpointMin), null, null, null, null, null, null, null];

var bassMin = 1;
var bassPattern = [Melodies.createChordRandomSlice(1, '2n', bassMin), null, null, null, null, null, null, null,
					Melodies.createChordRandomSlice(1, '2n', bassMin), null, null, null, null, null, null, null,
					Melodies.createChordRandomSlice(1, '2n', bassMin), null, null, null, null, null, null, null,
					Melodies.createChordRandomSlice(1, '2n', bassMin), null, null, null, null, null, null, null];

for (var i = 0; i < nbVariations; i++)
{
	// Counterpoint
	var notesCounterpoint = Melodies.createCounterpoint(notesChord, 2, counterpointPattern, 8.0);
	notesCounterpoint = Melodies.changePitch(notesCounterpoint, 1, 0);

	// Arpeggio on chords
	var chordArpeggio = Melodies.createArpeggioFromChord(notesChord, 2, chordPattern);

	// Bass arpeggio
	var notesBigBass = Melodies.createArpeggioFromChord(notesBasse, 2, bassPattern);
	notesBigBass = Melodies.changePitch(notesBigBass, -1, 0);

	Sequence.addNotes('bigBassPiano', notesBigBass);
	Sequence.addNotes('bassPiano', notesBasse);
	Sequence.addNotes('chordPiano', chordArpeggio);
	Sequence.addNotes('counterpointPiano', notesCounterpoint);
}

Sequence.saveAsMIDI('midi/' + name + '-' + timestamp + '.mid');

