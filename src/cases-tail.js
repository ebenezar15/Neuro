// runs after the case studies: add everything new to the atlas
extendAtlas();
[['What Drives Unwanted Behaviour?','Bad habits often grow when we feel bored, angry, lonely or ashamed. Find the real feeling, and heal that.'],['Contempt vs. Permission vs. Curiosity','Don\'t hate yourself, and don\'t pretend it\'s fine. Be curious and kind, and you can change.']].forEach(([t,s])=>{const m=find(t);if(m)m.simple=s});
CASES.forEach(m=>{if(!m.simple)m.simple=m.lesson});
LEARN[4].items.push('What Drives Unwanted Behaviour?','Read Your Behaviour Like a Map','Contempt vs. Permission vs. Curiosity');
LEARN[5].items.push('Kindness Toward Your Story');
