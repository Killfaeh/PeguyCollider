Sequence = 
{
    bpm: 120,
    ppq: 32,
    key: 'C',
    
    allInstruments: [],
    instruments: {},
    notes: {},

    setInstrument: function($name, $instrument)
    {
        if (utils.isset($name) && $name !== '' && utils.isset($instrument))
            Sequence.instruments[$name] = $instrument;
    },

    removeInstrument: function($name)
    {
        if (utils.isset($name) && $name !== '')
            Sequence.instruments[$name] = null;
    },

    addNotes: function($name, $notes)
    {
        if (!utils.isset(Sequence.notes[$name]))
            Sequence.notes[$name] = [];

        if (Array.isArray($notes))
        {
            for (var i = 0; i < $notes.length; i++)
                Sequence.notes[$name].push($notes[i]);
        }
        else
            Sequence.notes[$name].push($notes);
    },

    empty: function()
    {
        for (var i = 0; i < Sequence.allInstruments.length; i++)
        {
            var instrument = Sequence.allInstruments[i];

            var isInSequence = false;

            for (var name in Sequence.instruments)
            {
                if (Sequence.instruments[name] === instrument)
                    isInSequence = true;
            }

            if (isInSequence === false)
            {
                instrument.dispose();

                var index = Sequence.allInstruments.indexOf(instrument);
            
                if (index > -1)
                    Sequence.allInstruments.splice(index, 1);
            }
        }

        Sequence.instruments = {};
        Sequence.notes = {};
    },

    play: function()
    {
        console.log("PLAY");
    },

    stop: function()
    {
        console.log("STOP");
    },

    live: null,
    liveLoop: 0,
    currentNotes: {},
    step: 500,

    playLive: function()
    {
        console.log("PLAY LIVE");

        if (!utils.isset(Sequence.live))
        {
            Sequence.liveLoop = 0;
            Sequence.currentNotes = {};
            Sequence.step = Math.round(60000/Sequence.bpm);
            Tone.Transport.bpm.value = Sequence.bpm;

            for (var name in Sequence.notes)
            {
                //viewManager.displayMIDI(name + ": " + Sequence.notesToString(Sequence.notes[name]));
                Sequence.currentNotes[name] = [];

                for (var i = 0; i < Sequence.notes[name].length; i++)
                    Sequence.currentNotes[name].push(Sequence.notes[name][i]);
            }

            Sequence.live = setInterval(function()
            {
                //console.log("LOOP ! ");

                var now = Tone.now();

                // Lecture d'une séquence de 4 notes
                for (var i = 0; i < 4; i++)
                {
                    var start = now + i*(Sequence.step/4000.0)

                    // Jouer une note par instrument
                    for (var name in Sequence.currentNotes)
                    {
                        if (utils.isset(Sequence.instruments[name]))
                        {
                            if (Sequence.currentNotes[name].length > 0)
                            {
                                var nextNote = Sequence.currentNotes[name].shift();

                                if (utils.isset(nextNote))
                                {
                                    nextNote.setKey(Sequence.key);

                                    if (nextNote.type === 'arpeggio')
                                    {
                                        var arpeggioSequence = nextNote.getSequence();

                                        //console.log(arpeggioSequence);

                                        for (var j = 0; j < arpeggioSequence.length; j++)
                                            Sequence.instruments[name].play(arpeggioSequence[j], start + j*(Sequence.step/4000.0));
                                    }
                                    else
                                    {
                                        /*
                                        console.log(nextNote);
                                        console.log("Key : " + nextNote.getKey());
                                        console.log("Num : " + nextNote.getNum());
                                        console.log("Octave : " + nextNote.getOctave());
                                        console.log("Duration : " + nextNote.getDuration());
                                        console.log("Name : " + nextNote.getName());
                                        //*/
                                        Sequence.instruments[name].play(nextNote, start);
                                    }
                                }
                            }

                            if (Sequence.currentNotes[name].length <= 0)
                            {
                               // viewManager.displayMIDI(name + ": " + Sequence.notesToString(Sequence.notes[name]));
                                Sequence.currentNotes[name] = [];

                                if (utils.isset(Sequence.notes[name]))
                                {
                                    for (var j = 0; j < Sequence.notes[name].length; j++)
                                        Sequence.currentNotes[name].push(Sequence.notes[name][j]);
                                }
                            }
                        }
                    }
                }

            }, Sequence.step);
        }
    },

    stopLive: function()
    {
        console.log("STOP LIVE");
        clearInterval(Sequence.live);
        Sequence.live = null;
        Sequence.liveLoop = 0;
    },

    notesToString: function($notes)
    {
        var output = '[';

        for (var i = 0; i < $notes.length; i++)
        {
            if (i > 0)
                output = output + ', ';

            var note = $notes[i];

            if (utils.isset(note))
            {
                var name = note.getName();
                var duration = note.getDuration();
                output = output + name + ':' + duration;
            }
            else
                output = output + 'null';
        }

        output = output + ']';

        return output;
    },

    getMIDIdata: function($notes)
    {
        var data = [];
        var offsetTick = 0;
        var lastNotNull = null;
        var indexLastNotNull = 0;
        var lastNotNullDuration = 0;
        
        for (var i = 0; i < $notes.length; i++)
        {
            var duration = 0;

            if (utils.isset($notes[i]))
            {
                if (Array.isArray($notes[i]))
                {
                    for (var j = 0; j < $notes[i].length; j++)
                    {
                        if (utils.isset($notes[i][j]))
                        {
                            var pitchData =
                            {
                                pitch: [$notes[i][j].getName()],
                                duration: $notes[i][j].getDuration().replace('n', ''),
                                velocity: 100,
                                //channel: j+1,
                                tick: offsetTick,
                            };

                            data.push(pitchData);
                        }
                    }

                    duration = nbNotesPerDuration[$notes[i][0].getDuration()];
                    offsetTick = offsetTick + Sequence.ppq;
                }
                else if ($notes[i].type === 'arpeggio')
                {
                    var sequence = $notes[i].getMidiData();

                    console.log(sequence);

                    for (var j = 0; j < sequence.length; j++)
                    {
                        sequence[j].tick = offsetTick + sequence[j].relativeTick*Sequence.ppq;
                        data.push(sequence[j]);
                    }

                    duration = nbNotesPerDuration[$notes[i].getDuration()];
                    offsetTick = offsetTick + nbNotesPerDuration[$notes[i].getDuration()]*Sequence.ppq;

                    //var jump = nbNotesPerDuration[$notes[i].getDuration()];
                    //i = i + jump;
                }
                else
                {
                    var pitch = $notes[i].getMidiData();

                    if (utils.isset(pitch))
                    {
                        pitch.tick = offsetTick;
                        data.push(pitch);
                    }

                    duration = nbNotesPerDuration[$notes[i].getDuration()];
                    offsetTick = offsetTick + Sequence.ppq;
                }

                lastNotNull = $notes[i];
                indexLastNotNull = i;
                lastNotNullDuration = duration;
            }
            else if (!utils.isset(lastNotNull) || lastNotNull.type !== 'arpeggio' || i >= indexLastNotNull+lastNotNullDuration)
                offsetTick = offsetTick + Sequence.ppq;
        }

        return data;
    },

    saveAsMIDI: function($filePath, $notes)
    {
        console.log("SAVE MIDI");

        var data = [];

        if (utils.isset($notes))
        {
            if (utils.isset($notes[0].type))
                data = Sequence.getMIDIdata($notes);
            else
            {
                for (var i = 0; i < $notes.length; i++)
                {
                    var instrumentData = Sequence.getMIDIdata($notes[i]);

                    for (var j = 0; j < instrumentData.length; j++)
                    {
                        instrumentData[j].channel = i+1;
                        data.push(instrumentData[j]);
                    }
                }
            }
        }
        else
        {
            var channel = 1;

            for (var key in Sequence.notes)
            {
                var instrumentData = Sequence.getMIDIdata(Sequence.notes[key]);

                for (var j = 0; j < instrumentData.length; j++)
                {
                    instrumentData[j].channel = channel;
                    data.push(instrumentData[j]);
                }

                channel = channel + 1;
            }
        }

        var midiData = 
        {
            bpm: Sequence.bpm,
            sequence: data
        };

        //console.log("MIDI DATA : ");
        //console.log(midiData);

        window.electronAPI.saveAsMIDI(viewManager.getCurrentFilePath(), $filePath, midiData);
    },
};

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("sequence");