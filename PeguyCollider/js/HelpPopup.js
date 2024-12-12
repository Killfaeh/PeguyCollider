function HelpPopup()
{
	///////////////
	// Attributs //
	///////////////

	var scales = "////////////////\n"
				+ "//// Scales ////\n"
				+ "////////////////\n\n"

				+ "// Major \n\n"
	
				+ "C: C, D, E, F, G, A, B\n"
				+ "C#: C#, D#, E#, F#, G#, A#, B#\n"
				+ "Db: Db, Eb, F, Gb, Ab, Bb, C\n"
				+ "D: D, E, F#, G, A, B, C#\n"
				+ "D#: D#, E#, G, G#, A#, B#, D\n"
				+ "Eb: Eb, F, G, Ab, Bb, C, D\n"
				+ "E: E, F#, G#, A, B, C#, D#\n"
				+ "F: F, G, A, Bb, C, D, E\n"
				+ "F#: F#, G#, A#, B, C#, D#, E#\n"
				+ "Gb: Gb, Ab, Bb, Cb, Db, Eb, F\n"
				+ "G: G, A, B, C, D, E, F#\n"
				+ "G#: G#, A#, B#, C#, D#, E#, G\n"
				+ "Ab: Ab, Bb, C, Db, Eb, F, G\n"
				+ "A: A, B, C#, D, E, F#, G#\n"
				+ "A#: A#, B#, D, D#, E#, G, A\n"
				+ "Bb: Bb, C, D, Eb, F, G, A\n"
				+ "B: B, C#, D#, E, F#, G#, A#\n"
				+ "Cb: Cb, Db, Eb, Fb, Gb, Ab, Bb\n\n"
				
				+ "// Natural minor \n\n"
				
				+ "Am: A, B, C, D, E, F, G\n"
				+ "A#m: A#, B#, C#, D#, E#, F#, G#\n"
				+ "Bbm: Bb, C, Db, Eb, F, Gb, Ab\n"
				+ "Bm: B, C#, D, E, F#, G, A\n"
				+ "Cm: C, D, Eb, F, G, Ab, Bb\n"
				+ "C#m: C#, D#, E, F#, G#, A, B\n"
				+ "Dbm: Db, Eb, Fb, Gb, Ab, A, Cb\n"
				+ "Dm: D, E, F, G, A, Bb, C\n"
				+ "D#m: D#, E#, F#, G#, A#, B, C#\n"
				+ "Ebm: Eb, F, Gb, Ab, Bb, Cb, Db\n"
				+ "Em: E, F#, G, A, B, C, D\n"
				+ "Fm: F, G, Ab, Bb, C, Db, Eb\n"
				+ "F#m: F#, G#, A, B, C#, D, E\n"
				+ "Gbm: Gb, Ab, A, Cb, Db, D, Fb, Gb\n"
				+ "Gm: G, A, Bb, C, D, Eb, F\n"
				+ "G#m: G#, A#, B, C#, D#, E, F#\n"
				+ "Abm: Ab, Bb, Cb, Db, Eb, Fb, Gb\n\n"
				
				+ "// Melodic minor \n\n"
				
				+ "Amm: A, B, C, D, E, F#, G#\n"
				+ "A#/Bb: Bb, C, Db, Eb, F, G, A\n"
				+ "Bmm: B, C#, D, E, F#, G#, A#\n"
				+ "Cmm: C, D, Eb, F, G, A, B\n"
				+ "C#/Db: C#, D#, E, F#, G#, A#, C\n"
				+ "Dmm: D, E, F, G, A, B, C#\n"
				+ "D#/Eb: D#, F, F#, G#, A#, C, D\n"
				+ "Emm: E, F#, G, A, B, C#, D#\n"
				+ "Fmm: F, G, Ab, Bb, C, D, E\n"
				+ "F#/Gb: F#, G#, A, B, C#, D#, F\n"
				+ "Gmm: G, A, Bb, C, D, E, F#\n"
				+ "G#/Ab: G#, A#, B, C#, D#, F, G\n\n"
				
				+ "// Harmonic minor \n\n"
				
				+ "Ahm: A, B, C, D, E, F, G#\n"
				+ "A#hm: A#, C, C#, D#, F, F#, A\n"
				+ "Bbhm: Bb, C, Db, Eb, F, Gb, A\n"
				+ "Bhm: B, C#, D, E, F#, G, A#\n"
				+ "Chm: C, D, Eb, F, G, Ab, B\n"
				+ "C#hm: C#, D#, E, F#, G#, A, C\n"
				+ "Dbhm: Db, Eb, Fb, Gb, Ab, A, C\n"
				+ "Dhm: D, E, F, G, A, Bb, C#\n"
				+ "D#hm: D#, F, F#, G#, A#, B, D\n"
				+ "Ebhm: Eb, F, Gb, Ab, Bb, Cb, D\n"
				+ "Ehm: E, F#, G, A, B, C, D#\n"
				+ "Fhm: F, G, Ab, Bb, C, Db, E\n"
				+ "F#hm: F#, G#, A, B, C#, D, F\n"
				+ "Gbhm: Gb, Ab, A, Cb, Db, D, F\n"
				+ "Ghm: G, A, Bb, C, D, Eb, F#\n"
				+ "G#hm: G#, A#, B, C#, D#, E, G\n"
				+ "Abhm: Ab, Bb, Cb, Db, Eb, Fb, G\n";

	var instruments = "/////////////////////\n"
				+ "//// Instruments ////\n"
				+ "/////////////////////\n\n"

				+ "// Create piano\n"
				+ "var piano = new Piano();\n\n"

				+ "// Create classic electric piano\n"
				+ "var classicElectricPiano = new ClassicElectricPiano();\n\n"

				+ "// Create deep organ\n"
				+ "var deepOrgan = new DeepOrgan();\n\n"

				+ "// Create Steinway grand piano\n"
				+ "var steinwayGrandPiano = new SteinwayGrandPiano();\n\n"
				
				+ "// Add channel to the sequence\n"
				+ "Sequence.setInstrument('piano', piano);\n\n";

	var code = "//////////////\n"
				+ "// Melodies //\n"
				+ "//////////////\n\n"
				
				+ "// Create note\n"
				+ "var note = new Note($key, $num, $octave, $duration);\n"
				+ "var note = new Note('C', 2, 4, '4n');\n\n"
				
				+ "// Create chord from a note\n"
				+ "var chord = new Chord(note);\n\n"
				
				+ "// Create arpeggio from chord\n"
				+ "var arpeggio = new Arpeggio($chord, $duration, $pattern);\n"
				+ "var arpeggio = new Arpeggio(chord, '4n', null);\n\n"
				
				+ "// Create beat patterns\n"
				+ "var pattern = Melodies.createRandomSlice($duration, $min, $rest);\n"
				+ "var chordPattern = Melodies.createChordRandomSlice($nbNotes, $duration, $min, $rest);\n\n"
				
				+ "// Create rest\n"
				+ "var rest = Melodies.createRest($nbNotes);\n\n"
				
				+ "// Create melodies\n"
				+ "var randomMelody = Melodies.createRandomMonophonic($nb, $key, $octave, $duration, $start, $amplitude);\n"
				+ "var chord = Melodies.createChordFromMonophonic($notes, $type);\n"
				+ "var conterpoint = Melodies.createCounterpoint($notes, $min, $pattern, $amplitude);\n\n"
				
				+ "// Change pitch\n"
				+ "var note = Melodies.changeSimpleNotePitch($note, $octave, $degree);\n"
				+ "var chord = Melodies.changeChordPitch($chord, $octave, $degree);\n"
				+ "var arpeggio = Melodies.changeArpeggioPitch($arpeggio, $octave, $degree);\n"
				+ "var note = Melodies.changeNotePitch($note, $octave, $degree);\n"
				+ "var melody = Melodies.changePitch($notes, $octave, $degree);\n\n"
				
				+ "// Create arpeggio from chord and beat pattern\n"
				+ "var arpeggio = Melodies.createArpeggioFromChord($notes, $min, $pattern);\n\n"
				
				+ "/////////////////////////\n"
				+ "// Sequence management //\n"
				+ "/////////////////////////\n\n"

				+ "// Change bpm\n"
				+ "Sequence.bpm = 120;\n\n"

				+ "// Change scale\n"
				+ "Sequence.key = 'C';\n\n"

				+ "// Set channel\n"
				+ "Sequence.setInstrument($name, $instrument);\n\n"

				+ "// Remove channel\n"
				+ "Sequence.removeInstrument($name);\n\n"

				+ "// Add a note or an array of notes\n"
				+ "Sequence.addNotes($name, $notes);\n\n"
				
				+ "// Empty sequence\n"
				+ "Sequence.empty();\n\n"
				
				+ "// Save sequence as MIDI\n"
				+ "Sequence.saveAsMIDI($filePath);\n\n";

	var htmlScales = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + scales + '</pre>'
				+ '</div>';
	
	var htmlInstruments = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + instruments + '</pre>'
				+ '</div>';
	
	var htmlCode = '<div id="code-block" class="code-block" >'
					+ '<pre id="code-content" class="javascript" >' + code + '</pre>'
				+ '</div>';
	
	var popupHTML = '<h2>Help</h2>'
					+ '<div id="tabManager" ></div>';

	var popup = new Popup(popupHTML);
	
	popup.addClass('help-popup');

	var tabManager = new TabManager();
	tabManager.setEditMode(false);

	var tabScales = new Tab('<span>' + "Scales" + '</span>', new Component(htmlScales));
	tabManager.addTab(tabScales);

	var tabInstruments = new Tab('<span>' + "Instruments" + '</span>', new Component(htmlInstruments));
	tabManager.addTab(tabInstruments);

	var tabCode = new Tab('<span>' + "Melodies" + '</span>', new Component(htmlCode));
	tabManager.addTab(tabCode);

	tabScales.select();

	popup.getById('tabManager').appendChild(tabManager);
	tabManager.style.top = "80px";
	tabManager.style.bottom = "30px";
	tabManager.style.left = "30px";
	tabManager.style.right = "30px";
	tabManager.style.border = "solid 1px rgb(120, 120, 120)";

	hljs.highlightElement(tabScales.getContent().getById('code-content'));
	hljs.highlightElement(tabInstruments.getContent().getById('code-content'));
	hljs.highlightElement(tabCode.getContent().getById('code-content'));
	
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
	
	var $this = utils.extend(popup, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("helpPopup");