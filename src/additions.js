// ===== ADDITIONS: new practices, interactive models, everyday struggles =====
P('halt','HALT Check','now','1 min','Before you act on an urge or snap at someone, check four basics: Hungry, Angry, Lonely, Tired.',
'Pause and ask: am I Hungry?;Am I Angry (or irritated, resentful)?;Am I Lonely (or disconnected)?;Am I Tired (or drained)?;Meet the real need first: eat, name the feeling, message someone, or rest;Then decide about the urge',
'All four are true => Start with the easiest one to meet, usually food or water;I still want to act on the urge => Wait 10 minutes after meeting the need, then choose;I never notice in time => Set a mid-afternoon reminder, when most people dip',
'Hunger, fatigue and isolation narrow the window of tolerance and make urges and irritability far more likely. Meeting the body\'s need first often removes the urge.');
P('cope','Cope Ahead (DBT)','daily','10 min','Rehearse a difficult situation in your mind so your skills are ready when it happens.',
'Describe the situation you expect to be hard, in facts;Name the emotions and urges likely to show up;Choose the skills you will use (breathing, STOP, DEAR MAN, leaving early);Imagine yourself in the situation, as vividly as you can, using those skills well;Imagine a tricky moment going wrong and coping anyway;Finish with a breath and one kind sentence to yourself',
'Imagining it makes me anxious => Do it in small pieces and practise a calming skill afterwards;It never goes like I imagined => That\'s fine; the rehearsal builds flexibility, not a script;I forget my plan => Write the two key skills on your phone lock screen',
'Mental rehearsal activates many of the same networks as real practice, so the new response is already partly wired when you need it (Linehan).');
P('parts','Parts Check-In (IFS 6 Fs)','deep','10–15 min','Get curious about an inner conflict instead of fighting it. From Internal Family Systems (Richard Schwartz).',
'Find: notice a part: a feeling, voice, urge or tension;Focus: turn your attention toward it and notice where it lives in your body;Flesh it out: what does it look like, sound like, want?;Feel toward: how do you feel toward this part? If not calm or curious, ask the reacting part to step back a little;Befriend: ask what job it is doing for you and thank it for trying;Fears: ask what it is afraid would happen if it stopped',
'I feel nothing => Start with a body sensation and stay curious about it;Another part keeps interrupting => Acknowledge it and ask it to wait nearby;It brings up old pain => Slow down, ground yourself and do deeper work with an IFS-trained therapist',
'Approaching parts with curiosity rather than criticism lowers internal threat and lets protective patterns relax (Schwartz).');

const NEWSECS=[
 {id:'day',n:'Everyday Struggles',h:44,d:'Real-life moments with a plan for right now, for today and for the weeks ahead. Each one links to the maps and practices behind it.'},
 {id:'mod',n:'Interactive Models',h:200,d:'Explorable versions of the core therapy models. Tap, drag and flip them to see how they work.'}
];
const CATS=[['Mind',258],['Body',205],['Action',36],['Self',320],['Relating',15],['Work & life',95]];
const DAYS=[];
function D(id,t,cat,tags,why,now,today,rewire,say,maps,tools){DAYS.push({type:'D',area:'day',sid:id,t,cat,tags,u:why,now:sp(now),today:sp(today),rewire:sp(rewire),say,links:sp(maps),tools:sp(tools)})}

D('sleep','Racing thoughts at night','Mind','sleep insomnia overthinking bed 3am worry',
'Lying still in the dark, the brain\'s threat system scans for unfinished business. Being tired narrows your window, so ordinary worries feel urgent and enormous.',
'Do three physiological sighs (two inhales through the nose, one long exhale);Try a cognitive shuffle: pick a word like BREAD and picture random things that start with each letter;If you have been awake more than 20 minutes, get up, sit in dim light and return when sleepy',
'Do a 10-minute brain dump an hour before bed: each worry, plus its next tiny step or "not for tonight";Keep the same wake time every day, even after a bad night;Keep screens out of bed so the bed means sleep',
'Schedule 15 minutes of worry time each afternoon so the brain learns worries have a slot;Practise defusion: "I\'m having the thought that tomorrow will be a disaster";If insomnia lasts beyond three weeks, ask a doctor about CBT-I, the first-line treatment',
'Night thoughts are tired thoughts. I\'ll look at this in daylight.','Racing Mind at Night;Excessive Worry;Overthinking','sigh;dump;sleep;defuse');
D('panic','A sudden panic or anxiety spike','Body','panic attack anxiety heart racing cant breathe',
'Your alarm system fired at full volume. The surge of adrenaline peaks and passes, usually within about ten minutes, even though it feels endless while it\'s happening.',
'Name it: "This is a panic surge. It\'s uncomfortable, not dangerous, and it will pass";Breathe out longer than you breathe in: in for 4, out for 6 to 8;Cool water on your face or a cold can against your wrists;Press your feet into the floor and name five things you can see',
'Move gently to use up leftover adrenaline;Eat and drink something; low blood sugar mimics anxiety;Note what happened before the spike, without judging it',
'Practise the breathing daily while calm so it\'s automatic in a spike;Gradually return to places you now avoid, in small steps;Ask a therapist about interoceptive exposure, which teaches your body a racing heart is safe',
'I\'ve come through every one of these so far. My body knows how to come down.','The Panic Wave;The Anxiety Cycle;Hyperarousal','sigh;tipp;ground');
D('start','Procrastinating and can\'t start','Action','procrastination motivation start avoid task deadline',
'Procrastination is mostly about avoiding a feeling, not laziness. The task brings up boredom, doubt or fear of judgment, and putting it off gives instant relief. That relief rewards the avoidance, so the habit strengthens.',
'Shrink the first step until it\'s almost silly: "open the document and write one bad sentence";Set a 2-minute timer and give yourself permission to stop when it rings;Ask the avoiding part: "What are you protecting me from?"',
'Do the hardest task when your energy is highest;Put your phone in another room;Work alongside someone, even on a video call',
'Log every start as a rep for "I can begin before I feel ready";Look at perfectionism underneath the delay;Link the task to a value: why does this matter to the person you want to be?',
'I don\'t need to feel like it. I just need to begin badly.','Procrastination;Getting Started (Activation Energy);Perfectionism','start2;pomo;parts');
D('replay','Replaying a conversation','Mind','rumination overthinking replay cringe said wrong embarrassed',
'The brain replays social moments to check you\'re still safe in the group. It feels like problem-solving, but past a point it keeps the alarm lit without producing anything new.',
'Ask: "Is there an action to take?" If yes, schedule it. If no, label it: "replaying";Switch attention to something that uses your hands;Run a quick thought record on the hottest thought',
'If you really did misstep, send one short, light repair message;Talk it through once with someone you trust, then agree to drop it',
'Practise defusion daily so thoughts feel more like weather;Notice mind-reading: others think about your conversation far less than you do;Build self-compassion so mistakes trigger less threat',
'Most people forgot this moment hours ago. I\'m allowed to forget it too.','Rumination;Overthinking;The Rumination Whirlpool','defuse;record;scb');
D('critic','A harsh inner critic today','Self','self criticism shame not good enough inner critic hate myself',
'Self-criticism is the threat system turned inward. It\'s often a protective part trying to prevent rejection by attacking first. It feels motivating but mostly produces shame and avoidance.',
'Notice the voice and name it: "the critic is here";Hand on your chest, slow breath. Say what you\'d tell a friend in this exact spot;Do the self-compassion break',
'Write down the critic\'s exact words. Would you say them to a child?;Ask the critic what it\'s afraid of, and thank it for trying',
'Practise the compassionate self daily, even for two minutes;Notice "should" and swap it for "I\'d like to";Explore where the critic\'s voice first came from',
'I can hold high standards and still be on my own side.','The Inner Critic;Self-Compassion;Toxic Shame From Childhood','scb;critic;letter');
D('no','Saying yes when I mean no','Relating','people pleasing boundaries cant say no guilt yes',
'Often a fawn response or a need for approval: keeping others happy to stay safe. Saying no triggers guilt that feels like danger, even when it\'s healthy.',
'Buy time: "Let me check and get back to you";Notice the guilt and say: "Guilt doesn\'t mean I\'m doing something wrong"',
'Use DEAR MAN to script one clear no;Practise low-stakes no\'s, like declining extras at a shop',
'Treat every honest no as a rep and track it as a pathway;Explore where you learned your needs come second;Use the boundary script for repeated situations',
'A clear no is kinder than a resentful yes.','People-Pleasing;Difficulty Saying No;Fawn Response','stop;dearman;bscript');
D('snap','Snapping at people I love','Body','anger irritable snap rage temper yelling',
'Anger often sits on top of a softer feeling: hurt, fear or exhaustion. When the lid flips, the part of the brain that chooses goes offline for a while.',
'Use STOP: stop, take a step back, observe, then proceed;Leave the room for 20 minutes with a promise to come back;Shake out your arms or walk fast to burn off the surge',
'Ask what was under the anger: hurt, fear, exhaustion?;Repair: "I snapped. I\'m sorry. What I was feeling was…"',
'Track early signs (clenched jaw, heat) to catch it at 4/10, not 9/10;Check HALT: hunger and tiredness make anger far likelier;Practise one new response until it becomes the default',
'My anger is a messenger. I\'ll listen to it without letting it drive.','Anger;The Anger Iceberg;Flipping Your Lid: The Hand Model','stop;halt;repair');
D('fight','The same fight with my partner','Relating','relationship fight argument partner couple conflict marriage',
'Couples usually fight about the cycle more than the topic. One protests the disconnection and the other withdraws to keep the peace, and each move triggers the other.',
'Call a time-out without blame: "We\'re in our loop. Can we pause for 20 minutes?";Bring your arousal down before trying again',
'Each of you completes: "When we fight, I do ___ because underneath I feel ___";Name the cycle together as the shared enemy',
'Practise reaching from the softer feeling instead of the angry one;Learn each other\'s attachment patterns;Consider couples therapy (EFT has strong research support)',
'It\'s us against the loop, not me against you.','Emotion-Focused Cycles;Repair After a Conflict;Attachment Styles','stop;repair;dearman');
D('numb','Feeling numb or flat','Body','numb flat empty nothing depressed shutdown disconnected',
'You may be below your window of tolerance, in shutdown. It\'s the body\'s energy-saving response to too much for too long, not a personal failing.',
'Add gentle sensation: cool water, a strong mint, a citrus smell;Stand up, stretch tall, look at the horizon;Text one safe person, even a single emoji',
'Spend ten minutes outside in daylight;Do one tiny pleasant thing and one tiny useful thing',
'Build a daily rhythm of sleep, light, movement and meals;Notice and savour small moments of okay-ness;If the numbness lasts more than two weeks, speak to a professional',
'My body is protecting me by powering down. I\'ll warm it up gently.','Shutdown & Hypoarousal;Up-Regulation: Energising a Shut-Down System;Dissociation','ground;reset;ba');
D('scroll','Doomscrolling and phone urges','Action','phone scroll social media urge addiction habit screen',
'Scrolling is often a quick-relief move that numbs discomfort, plus a variable reward loop. Each pick-up deepens the trail.',
'Urge surf: notice the urge, rate it and watch it rise and fall;Ask: "What was I feeling right before I reached?"',
'Turn on grayscale and move apps off the home screen;Charge your phone outside the bedroom',
'Install a new trail: when you reach for the phone, take three breaths first, and count the reps;Plan a replacement that meets the same need (rest, connection, novelty)',
'The urge is a wave. I can ride it without obeying it.','The Quick-Relief Cycle;Distraction & Attention Residue;The Habit Loop','surf;swap;ifthen');
D('burnout','Running on empty','Work & life','burnout exhausted tired overwhelmed work stress drained',
'Burnout is long-term threat and drive with no soothe. Your window has narrowed and your body is calling for recovery, not more effort.',
'Take 60 seconds of slow breathing, about six breaths a minute;Ask: "What is one thing I can drop or delay today?"',
'Protect sleep like an appointment;Do one thing purely for rest or play, with no productivity attached',
'Check your values: is your energy going to what matters?;Practise saying no with DEAR MAN;See a doctor if exhaustion persists, to rule out physical causes',
'Rest is part of the work, not a reward for finishing it.','Burnout;Guilt About Resting;The Energy Battery','shift;sleep;values');
D('fraud','Feeling like a fraud at work','Work & life','imposter syndrome fraud work career not good enough',
'Discounting positives plus a fear of failure. The feeling is common in capable people precisely because they notice what they don\'t yet know.',
'Name the thinking trap: "I feel like a fraud, so I must be one";List three concrete things you\'ve done well this month',
'Add one entry to a wins file;Ask a trusted colleague for specific feedback',
'Notice the thought and act anyway;Share the feeling with peers, since almost everyone has it;Reframe not knowing as learning, not exposure',
'Feeling unsure doesn\'t mean I\'m unqualified. It means I\'m stretching.','Impostor Syndrome;Professional Impostor Syndrome;The Impostor Mask','defuse;review;record');
D('social','Dreading a social event','Relating','social anxiety party event meeting nervous people',
'Your threat system predicts judgment. Avoiding brings relief, which teaches the brain the event really was dangerous.',
'Breathe out slowly and remind yourself that nerves and excitement feel almost the same in the body;Plan one opening question, such as "How do you know the host?"',
'Cope ahead: imagine arriving, feeling awkward and handling it;Go for a set time, say 45 minutes, with permission to leave',
'Each event you attend is a rep that teaches safety;Shift attention outward, to curiosity about others;Drop one safety behaviour at a time, like hiding on your phone',
'I don\'t have to be impressive. I just have to be curious.','Fear of Judgment;Anxious Avoidance;Worry vs. Anxiety vs. Panic','exhale;cope;ladder');
D('lonely','Lonely, even around people','Relating','lonely alone isolated no friends disconnected',
'Loneliness is a biological signal, like hunger, telling you to seek connection. Over time it can make the brain more alert to rejection, which makes reaching out harder.',
'Send one low-pressure message: "Saw this and thought of you";Go somewhere with people, like a café or park, even if you don\'t talk',
'Do one small act of kindness; contributing builds connection;Notice whether your mind is predicting rejection',
'Join something that repeats weekly (a class, team, group, volunteering);Repetition is what turns acquaintances into friends;Build the soothing system with self-compassion',
'Wanting connection is human. I can take one small step toward it.','Loneliness;Belonging;Support Network','reach;ba;glim');
D('text','Anxious when they don\'t reply','Relating','texting reply jealousy insecure anxious relationship dating',
'An anxious attachment system reads silence as danger. The urge to text again is a protest behaviour that tries to restore the connection.',
'Pause before sending and urge-surf for 10 minutes;Check the facts: what do you actually know?',
'Do something absorbing so your phone isn\'t the centre of your nervous system;If needed, ask once, directly and warmly',
'Practise self-soothing before reaching out;State needs directly instead of protesting;Notice whether you\'re drawn to people who keep you guessing',
'Silence is not a verdict. I\'m safe with myself while I wait.','Fear of Abandonment;Rejection Sensitivity;Excessive Reassurance Seeking','surf;record;dearman');
D('decide','Stuck on a decision','Mind','decision indecisive stuck choice paralysis options',
'Fear of regret and all-or-nothing thinking make every option feel high-stakes. The longer you wait, the more weight the decision collects.',
'Ask: "Is this reversible?" Most decisions are, so decide those faster;Flip a coin and notice how you feel about the result',
'Choose by values: which option is more like who I want to be?;Set a deadline and a "good enough" standard',
'Practise small, quick decisions daily (menus, routes);Automate routine choices to save decision energy',
'There\'s rarely a perfect choice. There\'s the choice I make and then make work.','Indecision;Decision Fatigue;Overthinking vs. Problem-Solving vs. Reflection','dump;solve;values');
D('compare','Comparing myself online','Self','comparison social media envy jealous instagram',
'You\'re comparing your behind-the-scenes with someone else\'s highlight reel. Each comparison fires the threat and drive systems at once.',
'Close the app and name the feeling: envy, sadness, longing?;Ask: "What does this envy tell me I want?"',
'Mute three accounts that reliably make you feel worse;Write three things you value about your own life',
'Turn envy into a values statement and one step toward it;Practise self-compassion: "Lots of people feel this"',
'Their story isn\'t my scoreboard.','Constant Comparison;Envy;Physical Comparison','defuse;glim;values');
D('grief','A wave of grief','Self','grief loss death breakup mourning sad',
'Grief is the price of love, not a problem to solve. It comes in waves while the brain slowly updates its map of a world without the person or thing you lost.',
'Let the wave come and breathe with it rather than against it;Hand on your heart: "This hurts because it mattered"',
'Do one basic care task: eat, drink, step outside;Tell someone how you\'re really doing',
'Find rituals that keep the bond while life moves forward;Let grief and moments of joy sit side by side; that\'s not betrayal;If grief stays crushing and unchanged after many months, seek support',
'I don\'t have to get over this. I\'m learning to carry it.','Understanding Grief;Grief Comes in Waves;Lament: Honest Sorrow','reach;lament;glim');
D('habit','Breaking a bad habit','Action','habit quit smoking sugar drinking bad habit change',
'Habits are wide neural trails: cue, routine, reward. Willpower fades. Changes to your environment and repeated practice last longer.',
'Urge surf the craving; it will peak and fall;Use an if-then: "If I want X, then I\'ll drink water first"',
'Find your stage of change honestly;Remove one cue from your environment',
'Replace the routine instead of only removing it;Count reps of the new response;Plan for slips, which are part of the cycle',
'Each time I choose differently, the new path gets wider.','The Habit Loop;The Reward Loop: Dopamine & Habits;Readiness for Change','surf;ifthen;swap');
D('eating','Eating when stressed','Body','emotional eating binge food stress comfort snacking',
'Food is a reliable comfort signal and often a quick-relief move. Hunger, tiredness and emotional need get tangled together.',
'Do a HALT check: am I Hungry, Angry, Lonely or Tired?;Wait 10 minutes with a glass of water, then decide',
'Eat regular meals; restriction fuels bingeing;Find two other soothers: a warm shower, music, a call',
'Ask the eating part what it\'s protecting you from;Build comfort that isn\'t food;If eating feels out of control, an eating-disorder specialist can help',
'I\'m allowed to need comfort. I can choose how I give it.','The Quick-Relief Cycle;Your Relationship With Your Body;Emotional Overload','halt;surf;parts');
D('family','Triggered by family','Relating','family parents triggered visit holidays mother father',
'Family can activate your oldest patterns. You can feel twelve again in seconds, because those pathways were laid down when you were twelve.',
'Notice: "How old do I feel right now?";Take a bathroom break and breathe out slowly',
'Cope ahead before the visit: plan your exits and your skills;Agree on a signal with a partner or friend',
'Grow your Healthy Adult voice;Set limits with a boundary script;Explore the family roles and patterns you inherited',
'I\'m an adult now. I get to choose how I respond.','Family Roles;Intergenerational Patterns;Emotional Flashbacks','stop;cope;bscript');
D('dread','Morning dread and Sunday scaries','Mind','dread morning sunday anxiety week work',
'This is anticipatory anxiety: your brain front-loads the week\'s threats. The dread is usually worse than the day itself.',
'Get out of bed and into daylight; movement interrupts the loop;Write the three things causing the dread and the first step for each',
'Plan one thing to look forward to this week;Notice catastrophising and fortune-telling',
'Track predicted vs. actual: how bad was Monday really?;If the dread points to a values mismatch, take it seriously',
'Dread is a forecast, not the weather.','Excessive Worry;Intolerance of Uncertainty;Changing Your State','dump;shift;ba2');
D('feedback','Feedback stings for days','Self','criticism feedback hurt sensitive rejection review',
'Social rejection activates some of the same brain areas as physical pain. Old shame can turn "this work needs changes" into "I am not enough".',
'Separate facts from story: what did they actually say?;Do the self-compassion break',
'Pull out one useful point and act on it;Talk to someone who sees you clearly',
'Practise hearing feedback as data about the work, not your worth;Explore the old belief behind the sting',
'Feedback is information, not a verdict on who I am.','Rejection Sensitivity;Shame;Fear of Making Mistakes','scb;record;defuse');
D('pullaway','Pulling away when people get close','Relating','avoidant intimacy close commitment pull away space',
'An avoidant strategy, often learned when needs were met with distance or overwhelm. Closeness can register as a threat to your independence.',
'Notice the urge to withdraw without acting on it right away;Say: "I need a little space, and I\'ll be back by…"',
'Share one small feeling with someone safe;Notice the stories, like "they\'re too needy"',
'Practise staying present in small doses of closeness;Learn your attachment pattern, ideally with a therapist;See interdependence as strength',
'I can be close and still be me.','Fear of Intimacy;Emotional Unavailability;The Four Attachment Styles','label;pend;parts');
D('money','Money stress at the end of the month','Work & life','money finance debt bills budget stress',
'Money worry keeps the alarm on and makes avoiding the numbers tempting. Avoidance keeps the anxiety vague, and vague anxiety feels bigger.',
'Breathe out slowly, then write the exact amount you\'re worried about;Pick one bill or account to look at, not all of them',
'Spend 20 minutes on one concrete step: list bills by due date or call one lender;Notice money beliefs that show up, like "I\'m bad with money"',
'Set a weekly 15-minute money check-in so it stops being a monster;Get advice from a free debt or financial counselling service if debt is growing',
'Looking at the numbers is braver than worrying about them.','Financial Anxiety;Money Beliefs;Excessive Worry','exhale;solve;dump');
D('focus','Can\'t focus at work','Work & life','focus concentrate distracted work study attention',
'Every switch leaves attention residue, and notifications keep grabbing the spotlight. Your arousal may also be too low (foggy) or too high (wired).',
'Close everything except one task and write the next physical step;Set a 25-minute timer and start',
'Batch messages at two set times;Do your hardest thinking in your peak hours',
'Build one protected deep-work block into most days;Keep a "later" list for distractions;Check basics if fog persists: sleep, water, food, movement',
'One tab, one task, one step.','Distraction & Attention Residue;Focused Work;Brain Fog','dump;pomo;deepw');
D('parent','Losing it as a parent','Relating','parenting kids children tantrum yelling overwhelmed parent',
'A child\'s distress can flip your lid in seconds, especially when you\'re tired. Children borrow your calm before they can make their own. That\'s co-regulation.',
'Pause, drop your shoulders and make a low hum or a long "voo" breath;Get down to their eye level only once you are steadier',
'Repair: "I yelled. That wasn\'t okay. I love you. Let\'s try again";Check HALT for yourself, not just the child',
'Notice your own early warning signs and plan a reset for the hardest hour of the day;Rupture plus repair teaches children that relationships survive mistakes',
'They need me calm more than they need me perfect.','Flipping Your Lid: The Hand Model;Co-Regulation in Daily Life;Repair After a Conflict','stop;voo;repair');
D('noise','Noise and crowds are too much','Body','sensory overload noise crowds loud overwhelmed busy',
'Your nervous system is taking in more than it can process, so irritability, shutdown or panic follow. This is a capacity issue, not a weakness.',
'Step somewhere quieter, put on headphones or soften your gaze;Press your palms together or give yourself a butterfly hug',
'Plan a quiet recovery break after busy events;Lower screens and bright light in the evening',
'Learn which inputs drain you and which calm you;Tell people what helps so it\'s easier to ask',
'I\'m allowed to turn the volume down.','Sensory Overload;Down-Regulation: Calming an Activated System;Tension & Being on Alert','sensory;hug;rhythm');
D('talk','Avoiding a hard conversation','Relating','hard conversation conflict confront talk avoid',
'The brain treats possible conflict like danger, so avoiding it brings relief. Meanwhile the issue grows and resentment builds.',
'Write one clear opening line;Breathe out slowly before you start',
'Cope ahead: rehearse the conversation, including the hard moment;Pick a calm time and place, and ask if now works',
'Use DEAR MAN for requests and the repair steps afterwards;Each conversation you have teaches the brain that honesty is survivable',
'I can be kind and clear at the same time.','Hard Conversations;Assertive Communication;Repair After a Conflict','cope;dearman;exhale');
D('bodyday','A bad body-image day','Self','body image appearance mirror weight ugly',
'Body-image distress often spikes when stress, comparison or tiredness is high. The mind treats appearance as a measure of worth.',
'Step away from the mirror or the photos;Name it: "I\'m having a bad body-image day"',
'Wear something comfortable;Thank your body for one thing it does',
'Mute appearance-focused feeds;Practise neutral body talk ("this is my arm");Talk to a therapist if it affects eating or daily life',
'My body is not a project. It\'s where I live.','Body Image;Body Shame;Physical Comparison','defuse;scb;letter');

const MODELS=[];
function X(key,t,who,u,life,tr,links,plan,caveat){MODELS.push({type:'X',area:'mod',key,t,who,u,life,tr:sp(tr),links:sp(links),caveat});PLAN[t]=plan}
X('hebb','Pathway Builder: Hebbian Learning','Donald Hebb',
'When one neuron repeatedly helps fire another, the connection between them strengthens. Old reactions feel automatic because their trail is wide. New ones feel clumsy because their trail is faint. Drag the slider to see what practice does.',
'For years you\'ve reached for your phone the second you feel bored. The first week of leaving it in another room feels strangely hard. By week six, you sometimes forget it\'s there.',
'Pick one trigger and one new response;Make it small enough to do on your worst day;Count reps on the Today screen, not streaks;Expect the old trail to reappear under stress; that\'s normal, not failure',
'Fire Together, Wire Together;Old Highway, New Path;Rewiring Step by Step','ifthen review swap');
X('cbt','The CBT Triangle & Thinking Traps','Aaron & Judith Beck',
'A situation doesn\'t directly cause a feeling. Your quick interpretation of it does. That thought sets off emotions and body sensations, which push you toward actions, which then seem to confirm the thought. Pick a scenario and tap each corner.',
'A friend doesn\'t reply for a day. Thought: "They\'re annoyed with me." Feeling: anxious. Body: tight chest. Action: three follow-up messages, and the awkwardness that follows seems to prove the thought.',
'Catch the hot thought;Find the thinking trap below;Ask the matching question;Write a balanced thought and re-rate how strongly you feel',
'Thought → Emotion → Behaviour;CBT: Cognitive Behavioural Therapy;Rumination','record defuse solve');
X('schema','The 18 Schemas','Jeffrey Young',
'Young identified 18 early maladaptive schemas, grouped in five domains. Each is a deep belief about yourself or others that formed when a core childhood need went unmet. They feel true when triggered, but they are old learnings.',
'You feel crushing panic when a partner goes quiet for an evening. That may be an Abandonment schema talking: an old alarm set at a time when people really did leave.',
'When a reaction feels bigger than the situation, pause;Find the schema whose "sounds like" fits;Ask: how old do I feel right now?;Name the unmet need and one adult way to meet it today',
'Schema Therapy;Toxic Shame From Childhood;Repeating Relationship Patterns','label record reparent');
X('act','The ACT Hexaflex','Steven Hayes',
'ACT changes your relationship with difficult thoughts and feelings so they don\'t steer your life. Six processes work together to build psychological flexibility. Each has a stuck counterpart. Tap a point on the hexagon.',
'You want to speak up in meetings but "I\'ll sound stupid" shows up every time. You notice the story, make room for the nerves and speak anyway, because contributing matters to you.',
'Name the situation and the hard thoughts and feelings;List the "away" moves you tend to make;Name the value at stake;Choose one small "toward" move with the feelings still present',
'ACT: Acceptance & Commitment Therapy;Cognitive Defusion;Personal Values','defuse values ifthen');
X('gross','Emotion Regulation Timeline','James Gross',
'An emotion unfolds over time: a situation, where your attention goes, what it means to you, then your response. Each step is a place to step in. Earlier is usually easier. Reappraisal tends to work better over time than suppression.',
'You dread family dinners. You could keep the visit short (selection), sit next to your favourite cousin (modification), focus on the kids (attention), remind yourself "his criticism is how he shows worry" (reappraisal) or take a breathing break (response).',
'Pick a situation that reliably upsets you;Tap each stage and plan one option;Use the earliest option that\'s realistic;Use suppression only as a short-term brake',
'Window of Tolerance;Changing Your State;Thought → Emotion → Behaviour','cope stop record');
X('dbt','DBT Skills Map','Marsha Linehan',
'DBT rests on a dialectic: you can accept yourself as you are and also work to change. Its skills come in four modules: mindfulness, distress tolerance, emotion regulation and interpersonal effectiveness.',
'News sends you spiralling at 11pm. TIPP gets you through the next ten minutes. Check the Facts helps tomorrow. DEAR MAN helps you have the conversation next week.',
'Choose two crisis skills to try first (TIPP is a strong start);Choose one emotion regulation skill for the next day;Practise them while calm, so they\'re there in a storm',
'DBT: Dialectical Behaviour Therapy;TIPP for Overwhelm (DBT);Opposite Action (DBT)','tipp opp dearman');
X('cft','Three Emotion Systems','Paul Gilbert',
'Threat protects, drive achieves and soothe connects. Modern life keeps threat and drive running hot while soothe stays underbuilt. Self-criticism is the threat system aimed inward. Move the sliders to see your balance this week.',
'You hit a big goal at work, feel relief for an hour, then start worrying about the next one. Drive and threat swap places, and there\'s no soothe in the loop to let you feel satisfied.',
'Slow your breathing to about six breaths a minute;Picture your wise, strong, warm self;Let that self look at your struggle;Let them say one sentence to you, and write it down',
'CFT: Compassion-Focused Therapy;Self-Compassion;The Inner Critic','scb letter glim');
X('ifs','Parts Map','Richard Schwartz',
'IFS sees the mind as a family of parts. Managers try to keep pain from surfacing. Firefighters rush in when it does. Exiles carry the old pain. No part is bad; each is protecting you. Underneath is Self: calm, curious and compassionate.',
'Part of you wants to start the project and part keeps opening videos. You ask the video part: "What are you worried would happen if you stopped?" It answers: "You\'ll find out you\'re not good enough."',
'Find a part and notice where it lives in your body;Ask how you feel toward it;Ask what job it does for you;Ask what it fears would happen if it stopped',
'IFS: Internal Family Systems;The Inner Child;Self-Sabotage','parts scb reparent');
X('eft','Emotion-Focused Cycles','Leslie Greenberg & Sue Johnson',
'Under a surface reaction sits a softer primary emotion. Couples get stuck in loops that hide it: one pursues, the other withdraws, and each move triggers the other. Healing comes from naming the cycle as the enemy and reaching from the softer feeling.',
'"You never help!" (surface anger) often means "I feel alone and I\'m scared I don\'t matter to you." The partner hears criticism and shuts down to avoid a fight, which looks like not caring.',
'Name the loop out loud: "We\'re in our cycle again";Tap "Show what\'s underneath" below;Share the softer feeling in one sentence;Ask: "What happens for you when I come at you like that?"',
'EFT: Emotion-Focused Therapy;Attachment Styles;Repair After a Conflict','label repair dearman');
X('drama','Drama Triangle Flip','Stephen Karpman · David Emerald',
'In conflict we often take one of three roles and rotate between them: Persecutor, Rescuer and Victim. Each role keeps the others going. Flip the triangle to see the empowering role that replaces each one.',
'Your sibling vents about work (Victim). You jump in with solutions (Rescuer). They snap that you don\'t get it, and now you feel attacked (Victim) and they\'re the Persecutor.',
'In your next conflict, ask: which corner am I in?;Flip the triangle to find that role\'s counterpart;Try its key question',
'The Drama Triangle vs. The Empowerment Triangle;Codependency;Assertive Communication','stop dearman bscript');
X('attach','Attachment Self-Map','John Bowlby & Mary Ainsworth',
'Adult attachment is often described on two dimensions: anxiety about abandonment and avoidance of closeness. Place yourself roughly with the sliders. This is a way to reflect, not a diagnosis, and styles shift with secure relationships.',
'When your partner pulls back, you text more. When you text more, they pull back further. Neither of you is the bad guy; both nervous systems are protecting themselves.',
'Place yourself, roughly and kindly;Read your quadrant\'s growth edge;Practise one growth move in a low-stakes relationship;Spend time with steady people, one of the strongest change factors',
'The Four Attachment Styles;Attachment Styles;Fear of Abandonment','label glim repair','This is a reflection tool, not an assessment. Attachment patterns vary across relationships.');
X('se','Somatic Map: Pendulation & SIBAM','Peter Levine',
'Somatic Experiencing works with stuck survival energy in small doses. Titration means touching a little at a time. Pendulation means swinging between something hard and a resource. Watch the pendulum, then try it.',
'After a near-miss on the road your hands keep trembling. You let them shake while feeling your feet on the floor. A few minutes later a deep breath comes on its own. That\'s discharge.',
'Orient: look slowly around the room;Find an okay place in your body;Touch the difficult feeling at about 20%;Return to the okay place, three times, slowly;Watch for a sigh, yawn or warmth',
'Somatic Experiencing;Widening Your Window;Trauma Held in the Body','orient pend hug','With trauma-related material, work with a trained practitioner.');

const MODELDATA={
 cbt:{scen:[
  {name:'Unanswered text',situation:'A friend hasn\'t replied in a day',thought:'"They\'re annoyed with me."',feeling:'Anxious, rejected',body:'Tight chest, restless',action:'Sends three follow-ups, checks phone constantly',alt:'"They\'re probably busy. I\'ll check in tomorrow if I still feel uneasy."'},
  {name:'Feedback at work',situation:'Manager suggests edits on your report',thought:'"I\'m terrible at this job."',feeling:'Ashamed, deflated',body:'Heavy, hot face',action:'Avoids the manager, puts off the next task',alt:'"Edits are normal. One report doesn\'t define my competence."'},
  {name:'Cancelled plans',situation:'Weekend plans fell through',thought:'"Nobody really wants to spend time with me."',feeling:'Lonely, sad',body:'Low energy, slumped',action:'Stays in bed and scrolls',alt:'"Plans fall through for lots of reasons. I can reach out to someone else."'}],
  traps:[['All-or-nothing','"If it\'s not perfect, it\'s a failure."','Where is this on a 0–100 scale?'],['Catastrophising','"I\'ll get fired and lose everything."','What\'s most likely, and could I cope with it?'],['Mind reading','"They think I\'m boring."','What evidence do I actually have?'],['Fortune telling','"It\'s going to go badly."','How often have my predictions come true?'],['Overgeneralising','"I always mess things up."','Is it really always? What are the exceptions?'],['Mental filter','"That one comment ruined it."','What am I filtering out?'],['Discounting positives','"They were just being nice."','Would I discount this for a friend?'],['Should statements','"I should be over this by now."','What if I said "I\'d prefer" instead?'],['Labelling','"I\'m an idiot."','What did I do, specifically, rather than what am I?'],['Personalising','"They\'re in a bad mood because of me."','What other factors could be involved?'],['Emotional reasoning','"I feel useless, so I am."','Is this a fact or a feeling?'],['Magnifying / minimising','"My mistake was huge; my win was nothing."','How would a neutral observer size these?']]},
 schema:{domains:[
  {n:'Disconnection & rejection',need:'Safety, stability, love, acceptance',h:15,items:[['Abandonment','"People I love will leave."'],['Mistrust / abuse','"People will hurt or use me."'],['Emotional deprivation','"No one will really meet my needs."'],['Defectiveness / shame','"If they really knew me, they\'d reject me."'],['Social isolation','"I don\'t belong anywhere."']]},
  {n:'Impaired autonomy',need:'Competence, independence, a sense of self',h:205,items:[['Dependence / incompetence','"I can\'t manage on my own."'],['Vulnerability to harm','"Disaster is about to strike."'],['Enmeshment','"I don\'t know who I am apart from them."'],['Failure','"I\'m less capable than others."']]},
  {n:'Impaired limits',need:'Realistic limits, self-control',h:36,items:[['Entitlement / grandiosity','"Rules shouldn\'t apply to me."'],['Insufficient self-control','"I can\'t tolerate boredom or frustration."']]},
  {n:'Other-directedness',need:'Freedom to express needs and emotions',h:150,items:[['Subjugation','"If I don\'t go along, something bad will happen."'],['Self-sacrifice','"Others\' needs always come first."'],['Approval-seeking','"My worth depends on what others think."']]},
  {n:'Overvigilance & inhibition',need:'Spontaneity, play, self-compassion',h:258,items:[['Negativity / pessimism','"Things will go wrong."'],['Emotional inhibition','"Showing feelings is dangerous or weak."'],['Unrelenting standards','"It\'s never good enough."'],['Punitiveness','"Mistakes deserve punishment."']]}],
  coping:[['Surrender','Giving in to the schema and acting as if it\'s true, such as choosing partners who confirm it.'],['Avoidance','Steering clear of anything that might trigger it: situations, feelings, intimacy.'],['Overcompensation','Fighting it by doing the extreme opposite, such as dominance to cover feeling defective.']],
  modes:[['Vulnerable Child','Feels the original pain: lonely, scared, ashamed.'],['Angry / Impulsive Child','Rages or acts out when needs go unmet.'],['Inner Critic','A punishing or demanding voice, internalised from the past.'],['Coping modes','Detached Protector, Compliant Surrenderer, Overcompensator.'],['Happy Child','Playful, connected, at ease.'],['Healthy Adult','Nurtures the child, limits the critic and meets needs wisely. This is the mode you\'re growing.']]},
 act:[{n:'Present moment',bad:'Lost in past or future',t:'Paying flexible attention to what\'s happening now, inside and out.',tr:'Notice five things you can hear right now, slowly.'},{n:'Acceptance',bad:'Experiential avoidance',t:'Making room for uncomfortable feelings instead of fighting them. This is willingness, not resignation.',tr:'Breathe into the feeling and say: "I\'m willing to have this here."'},{n:'Defusion',bad:'Fusion with thoughts',t:'Seeing thoughts as words passing through, not commands or facts.',tr:'Add "I\'m having the thought that…" in front of the harsh thought.'},{n:'Self-as-context',bad:'Attached to a self-story',t:'You\'re the sky, not the weather. The part of you that notices is bigger than any one thought.',tr:'Recall yourself at age ten and notice the "you" that has been there all along.'},{n:'Values',bad:'Unclear values',t:'Chosen qualities of action that give life direction.',tr:'Finish: "At my 80th birthday, I hope people say I was…"'},{n:'Committed action',bad:'Inaction or impulsivity',t:'Values-guided steps, especially when it\'s hard.',tr:'Pick one five-minute step toward a value and do it today.'}],
 gross:[{n:'Situation selection',w:'Before',t:'Choosing which situations to enter or avoid.',eg:'Agree to dinner, but take your own car so you can leave.',watch:'Too much avoidance shrinks your life.'},{n:'Situation modification',w:'Before',t:'Changing the situation to soften its impact.',eg:'Suggest a walk instead of sitting face to face.',watch:'Small changes count.'},{n:'Attentional deployment',w:'Early',t:'Choosing where attention goes within the situation.',eg:'Focus on the kids and the food, not Dad\'s comments.',watch:'Rumination is attention stuck on the negative.'},{n:'Cognitive change',w:'Early',t:'Reappraising what the situation means.',eg:'"His criticism is how he shows worry."',watch:'One of the most effective long-term strategies.'},{n:'Response modulation',w:'After',t:'Changing the response once the emotion has arrived.',eg:'Excuse yourself and do two minutes of paced breathing.',watch:'Suppression (hiding the feeling) can raise stress and strain connection.'}],
 dbt:[{n:'Mindfulness',h:176,skills:[['Wise Mind',null,'The overlap of Emotion Mind and Reasonable Mind. Ask "What does my wise mind say?" and wait for the quiet answer.'],['What skills',[['O','Observe: notice without words'],['D','Describe: put words on what you notice'],['P','Participate: throw yourself in fully']]],['How skills',[['N','Non-judgmentally: facts, not good or bad'],['O','One-mindfully: one thing at a time'],['E','Effectively: do what works']]]]},
  {n:'Distress tolerance',h:0,skills:[['TIPP: change body chemistry fast',[['T','Temperature: cool water on the face for 30 seconds'],['I','Intense exercise for 1–2 minutes'],['P','Paced breathing: exhale longer than inhale'],['P','Paired muscle relaxation']]],['STOP',[['S','Stop: freeze, don\'t react'],['T','Take a step back and breathe'],['O','Observe inside and out'],['P','Proceed mindfully']]],['ACCEPTS: distract wisely',[['A','Activities'],['C','Contributing: help someone'],['C','Comparisons'],['E','Emotions: create a different one'],['P','Pushing away, for now'],['T','Thoughts: count, puzzle, recite'],['S','Sensations: ice, hot shower, strong mint']]],['IMPROVE the moment',[['I','Imagery'],['M','Meaning'],['P','Prayer'],['R','Relaxation'],['O','One thing in the moment'],['V','Vacation: a short break'],['E','Encouragement']]],['Radical acceptance',null,'Accepting reality fully so that pain doesn\'t become suffering. Accepting is not approving.']]},
  {n:'Emotion regulation',h:258,skills:[['Check the facts',null,'What happened? What am I assuming? Does my emotion, and its intensity, fit the facts? If yes, problem-solve. If not, try opposite action.'],['Opposite action',null,'When an emotion doesn\'t fit the facts, act opposite to its urge, all the way, including posture and voice.'],['ABC',[['A','Accumulate positives'],['B','Build mastery daily'],['C','Cope ahead of hard situations']]],['PLEASE: lower vulnerability',[['PL','Treat PhysicaL illness'],['E','Balanced Eating'],['A','Avoid mood-altering substances'],['S','Balanced Sleep'],['E','Exercise']]]]},
  {n:'Interpersonal effectiveness',h:15,skills:[['DEAR MAN: ask or say no',[['D','Describe the facts'],['E','Express feelings'],['A','Assert what you want'],['R','Reinforce: why it helps them'],['M','Mindful: stay on topic'],['A','Appear confident'],['N','Negotiate']]],['GIVE: keep the relationship',[['G','Gentle'],['I','Interested'],['V','Validate'],['E','Easy manner']]],['FAST: keep self-respect',[['F','Fair'],['A','No over-Apologising'],['S','Stick to values'],['T','Truthful']]]]}],
 cft:[{n:'Threat',sub:'Protect',h:0,feels:'Anxiety, anger, disgust',t:'Fast and built to keep you safe; also the source of self-criticism and rumination when overused.'},{n:'Drive',sub:'Achieve',h:220,feels:'Excitement, wanting, pleasure',t:'Seeks goals and resources. When it runs on threat ("achieve or you\'re worthless") it becomes exhausting.'},{n:'Soothe',sub:'Connect',h:150,feels:'Contentment, safeness, warmth',t:'Rest, belonging and kindness. It regulates the other two, and most people need to build it on purpose.'}],
 ifs:{parts:[{n:'Self',sub:'Calm core',h:176,t:'Not a part but who you are underneath, marked by the 8 Cs. When Self leads, parts can relax.'},{n:'Managers',sub:'Proactive protectors',h:205,t:'Planners, critics, perfectionists and people-pleasers. They try to keep you safe by controlling life so exiles never get triggered.'},{n:'Firefighters',sub:'Reactive protectors',h:12,t:'Bingeing, scrolling, rage, numbing. They rush in to put out emotional fires once pain breaks through, whatever the cost.'},{n:'Exiles',sub:'Carry old pain',h:258,t:'Young parts holding shame, fear or loneliness from the past. They need witnessing, not locking away.'}],cs:['Calm','Curiosity','Clarity','Compassion','Confidence','Courage','Creativity','Connectedness']},
 eft:{a:{role:'Pursuer',surface:'Criticises, protests, pushes for a response',under:'Fear of not mattering, loneliness, longing for connection'},b:{role:'Withdrawer',surface:'Shuts down, deflects, goes quiet, leaves',under:'Fear of failing, feeling inadequate, overwhelm, wanting peace'},
  demons:[['Find the Bad Guy','Mutual attack. Each blames the other and both feel unsafe.'],['Protest Polka','One pursues, the other withdraws. The most common dialogue.'],['Freeze and Flee','Both withdraw. The relationship goes cold and quiet.']],
  types:[['Primary adaptive','Your first, fitting response, such as sadness at loss. Follow it; it carries information.'],['Primary maladaptive','An old, overlearned response, such as shame at being seen. Transform it with new emotional experience.'],['Secondary reactive','A feeling about a feeling, such as anger covering hurt. Explore what\'s underneath.'],['Instrumental','Emotion expressed to get something. Notice it, and ask directly instead.']],
  are:[['A','Accessible: can I reach you?'],['R','Responsive: will you respond to my emotions?'],['E','Engaged: do I matter to you, and will you stay close?']]},
 drama:[{n:'Persecutor',to:'Challenger',h:0,sounds:'"It\'s all your fault."',shift:'Hold people accountable without blame. Ask: "What outcome do I want?" and say it clearly and kindly.'},{n:'Rescuer',to:'Coach',h:150,sounds:'"Let me fix it for you."',shift:'Ask instead of fixing: "What do you think you could do?" Back their ability, not their helplessness.'},{n:'Victim',to:'Creator',h:210,sounds:'"Nothing I do matters."',shift:'Shift from problem to outcome: "What do I want, and what\'s one step I can take?"'}],
 attach:[{n:'Secure',h:150,t:'Comfortable with closeness and independence. Trusts others and can ask for needs directly.',grow:'Keep investing in repair. Secure people still have bad days; they repair them.'},{n:'Anxious',h:30,t:'Wants closeness and fears losing it. Sensitive to distance; may protest by texting, checking or seeking reassurance.',grow:'Self-soothe before reaching out. Ask directly ("I\'d love a call tonight") instead of protesting.'},{n:'Avoidant',h:210,t:'Values independence and feels crowded by need. May pull away during conflict or intimacy.',grow:'Notice the urge to withdraw. Say "I need 20 minutes, and I\'ll come back", then come back.'},{n:'Disorganised',h:330,t:'Wants closeness and fears it at once, a push-pull that often traces to caregivers who were both comfort and threat.',grow:'Go slowly. Build safety in your body first. Trauma-informed therapy helps a great deal.'}],
 se:{sibam:[['S','Sensation','Tingling, tightness, temperature, pressure'],['I','Image','Pictures, memories, scenes that arise'],['B','Behaviour','Posture, gestures, impulses to move'],['A','Affect','The emotion or feeling tone'],['M','Meaning','The story or belief that attaches']],terms:[['Orienting','Slowly moving your eyes and head around the room tells the brainstem you\'re here and safe.'],['Resourcing','Finding an anchor (a body area, memory, person or place) that feels okay.'],['Titration','Touching difficulty in small drops, not floods.'],['Pendulation','Swinging attention between resource and activation so the system learns it can return.'],['Discharge','Trembling, sighing, yawning, warmth or tears as activation completes.']]}
};
AREA_PLAN.day='label shift review';AREA_PLAN.mod='label record values';
Object.assign(PLAN,{'The Four Attachment Styles':'label glim repair'});

const DAILY_REPS=[['Three breaths before you pick up your phone','sigh'],['Name one feeling out loud today: "I notice I\'m feeling…"','label'],['Savour one good moment for 10 seconds','glim'],['Add "I\'m having the thought that…" to one harsh thought','defuse'],['Say one small, honest no','bscript'],['Ask someone: "Do you want ideas, or a listener?"','dearman'],['When the critic shows up, say what you\'d tell a friend','scb'],['Look slowly around the room for 30 seconds','orient'],['Take one five-minute step toward a value','values'],['Ask an avoiding part what it\'s protecting you from','parts'],['Check one assumption against the facts','record'],['Send someone a warm, no-pressure message','reach'],['Before acting on an urge, do a HALT check','halt'],['Rehearse one tricky moment coming up this week','cope']];

function extendAtlas(){
 NEWSECS.forEach(s=>{if(!SEC[s.id]){SECS.push(s);SEC[s.id]=s}});
 Object.assign(TYPE,{X:'Model',D:'Everyday'});
 const extra=[...MAPS.filter(m=>!ORDER.includes(m)),...DAYS,...MODELS].filter(m=>!ORDER.includes(m));
 extra.forEach(m=>{if(!m.area)m.area='tlk';m.num=ORDER.length+1;m.id='m'+m.num;m.h=SEC[m.area].h;if(m.type==='D'){const c=CATS.find(c=>c[0]===m.cat);m.h=c?c[1]:m.h}ORDER.push(m);BYT[m.t.toLowerCase()]=m});
 extra.forEach(m=>(m.links||[]).forEach(t=>{const x=find(t);if(x&&x!==m)(BACK[x.id]=BACK[x.id]||new Set()).add(m)}));
 Object.keys(USES).forEach(k=>delete USES[k]);
 ORDER.forEach(m=>{if(m.type==='P'||m.type==='F')return;const ps=m.type==='D'?m.tools.map(c=>PR[c]).filter(Boolean):planFor(m);ps.forEach(p=>(USES[p.code]=USES[p.code]||[]).push(m))});
}

