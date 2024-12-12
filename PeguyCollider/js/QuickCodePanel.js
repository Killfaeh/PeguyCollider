function QuickCodePanel()
{
	///////////////
	// Attributs //
	///////////////
	
	var component = new Component('<div class="quickCodePanel" >'
									+ '<div id="topPanel" class="topPanel" >'
									+ '</div>'
									+ '<div id="bottomPanel" class="panel bottomPanel" >'
									+ '</div>'
								+ '</div>');

	//// Champ de recherche ////

	var searchInput = new InputSearch('text', 'Search code');
	component.getById('topPanel').appendChild(searchInput);

	//// Liste des assets ////

	var codeListBox = new ListBox();
	component.getById('bottomPanel').appendChild(codeListBox);

	//// Liste de codes standards ////

	var codeList = [
		{ 
			label: 'For loop',
			keywords: 'loop, for, block',
			code: 'for (var i = 0; i < n; i++)\n'
					+ '{\n'
					+ '\t\n'
					+ '}\n\r'
		},

		{ 
			label: 'Double for loop',
			keywords: 'loop, for, block',
			code: 'for (var i = 0; i < n; i++)\n'
					+ '{\n'
					+ '\tfor (var j = 0; j < n; j++)\n'
					+ '\t{\n'
					+ '\t\t\n'
					+ '\t}\n'
					+ '}\n\r'
		},

		{ 
			label: 'While loop',
			keywords: 'loop, while, block',
			code: 'var continueLoop = true;\n\r'
					+ 'while (continueLoop)\n'
					+ '{\n'
					+ '\t\n'
					+ '}\n\r'
		},

		{ 
			label: 'If block',
			keywords: 'if, bock',
			code: 'var conditionOk = true;\n\r'
					+ 'if (conditionOk === true)\n'
					+ '{\n'
					+ '\t\n'
					+ '}\n\r'
		},

		{ 
			label: 'Create function without parameters',
			keywords: 'function',
			code: 'var myFunction = function()\n'
					+ '{\n'
					+ '\t\n'
					+ '};\n\r'
		},

		{ 
			label: 'Create function with parameters',
			keywords: 'function',
			code: 'var myFunction = function($param)\n'
					+ '{\n'
					+ '\t\n'
					+ '};\n\r'
		},

		{ 
			label: 'Change BPM',
			keywords: 'bpm, sequence',
			code: 'Sequence.bpm = 120;\n\r'
		},

		{ 
			label: 'Change scale',
			keywords: 'scale, sequence',
			code: "Sequence.key = 'C';\n\r"
		},

		{ 
			label: 'Create piano',
			keywords: 'instrument',
			code: 'var piano = new Piano();\n\r'
		},

		{ 
			label: 'Create classic electric piano',
			keywords: 'instrument',
			code: 'var classicElectricPiano = new ClassicElectricPiano();\n\r'
		},

		{ 
			label: 'Create deep organ',
			keywords: 'instrument',
			code: 'var deepOrgan = new DeepOrgan();\n\r'
		},

		{ 
			label: 'Create Steinway grand piano',
			keywords: 'instrument',
			code: 'var steinwayGrandPiano = new SteinwayGrandPiano();\n\r'
		},
		
		{ 
			label: 'Add instrument to sequence',
			keywords: 'instrument, channel, sequence',
			code: 'Sequence.setInstrument($name, $instrument);\n\r'
		},

		{ 
			label: 'Create note',
			keywords: 'note',
			code: 'var note = new Note($key, $num, $octave, $duration);\n\r'
		},

		{ 
			label: 'Create chord',
			keywords: 'note, chord',
			code: 'var chord = new Chord($note);\n\r'
		},

		{ 
			label: 'Create arpeggio',
			keywords: 'note, chord, arpeggio',
			code: 'var arpeggio = new Arpeggio($chord, $duration, $pattern);\n\r'
		},

		{ 
			label: 'Create beat pattern',
			keywords: 'beat, pattern',
			code: 'var pattern = Melodies.createRandomSlice($duration, $min, $rest);\n\r'
		},

		{ 
			label: 'Create beat pattern for arpeggio',
			keywords: 'beat, pattern, arpeggio',
			code: 'var chordPattern = Melodies.createChordRandomSlice($nbNotes, $duration, $min, $rest);\n\r'
		},

		{ 
			label: 'Create rest',
			keywords: 'rest',
			code: 'var rest = Melodies.createRest($nbNotes);\n\r'
		},

		{ 
			label: 'Create random monophonic melody',
			keywords: 'melody, random',
			code: 'var randomMelody = Melodies.createRandomMonophonic($nb, $key, $octave, $duration, $start, $amplitude);\n\r'
		},

		{ 
			label: 'Create chord from monophonic melody',
			keywords: 'melody, chord',
			code: 'var chord = Melodies.createChordFromMonophonic($notes, $type);\n\r'
		},

		{ 
			label: 'Create counterpoint from chord',
			keywords: 'melody, counterpoint',
			code: 'var conterpoint = Melodies.createCounterpoint($notes, $min, $pattern, $amplitude);\n\r'
		},

		{ 
			label: 'Change melody pitch',
			keywords: 'melody, pitch',
			code: 'var melody = Melodies.changePitch($notes, $octave, $degree);\n\r'
		},
		
		{ 
			label: 'Add notes to sequence',
			keywords: 'note, sequence',
			code: 'Sequence.addNotes($name, $notes);\n\r'
		},

		{ 
			label: 'Save sequence in MIDI file',
			keywords: 'save, file, sequence',
			code: 'Sequence.saveAsMIDI($filePath);\n\r'
		},
	];

	//////////////
	// Méthodes //
	//////////////

	var updateCodeList = function()
	{
		var searchCriteria = searchInput.getValue().toUpperCase();

		codeListBox.removeAllElement();

		for (var i = 0; i < codeList.length; i++)
		{
			if (searchCriteria === '' || codeList[i].label.toUpperCase().indexOf(searchCriteria) >= 0 
				|| codeList[i].keywords.toUpperCase().indexOf(searchCriteria) >= 0 
				|| codeList[i].code.toUpperCase().indexOf(searchCriteria) >= 0)
			{
				var itemHTML = '<div class="codeRow" >'
									+ '<div id="preview" class="preview" ></div>'
									+ '<div>' + codeList[i].label + '</div>'
								+ '</div>';

				var item = new ListItem(itemHTML);

				var copyIcon = Loader.getSVG('icons', 'copy-paste-icon', 20, 20);
				item.getById('preview').appendChild(copyIcon);

				item.code = codeList[i].code;
				copyIcon.code = codeList[i].code;

				item.onDblClick = function($event) { viewManager.insertCode(this.code); };
				copyIcon.onClick = function($event) { viewManager.insertCode(this.code); };

				codeListBox.addElement(item);
			}
		}
	};

	///////////////////////////////////
	// Initialisation des événements //
	///////////////////////////////////

	//// Champ de recherche ////

	searchInput.onSearch = function($value) { updateCodeList(); };
	searchInput.onEmpty = function($value) { updateCodeList(); };

	////////////////
	// Accesseurs //
	////////////////
	
	// GET
	
	// SET

	var $this = utils.extend(component, this);
	updateCodeList();
	return $this;
}
	
// A la fin du fichier Javascript, on signale au module de chargement que le fichier a fini de charger.
if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("quickCodePanel");