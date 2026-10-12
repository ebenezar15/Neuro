// ===== AREAS + EMOTION MAPS (part 1) =====
const AREAS = [
 {id:'anx', n:'Anxiety, Fear & Worry', h:205, brain:'The amygdala raises an alarm before the thinking brain has checked the facts. Avoidance teaches it the alarm was right. Approach, slowly and safely, teaches it something new.', neuro:['n08','n10','n15']},
 {id:'emo', n:'Emotions & Regulation', h:350, brain:'Emotions are fast body-brain predictions. Naming a feeling ("affect labelling") engages the prefrontal cortex and turns down amygdala activity.', neuro:['n16','n09','n13']},
 {id:'self', n:'Self-Esteem & Identity', h:265, brain:'Self-talk is a well-worn neural pathway. Every compassionate response you rehearse builds a competing pathway that gets easier with use.', neuro:['n04','n06','n15']},
 {id:'rel', n:'Relationships & Attachment', h:15, brain:'Early relationships shape the brain\'s predictions about closeness. Safe, repeated experiences with others can update those predictions at any age.', neuro:['n19','n14','n11']},
 {id:'fam', n:'Family of Origin', h:30, brain:'Family patterns are stored as implicit memory: felt rules that run without words. Making them explicit lets the prefrontal cortex choose differently.', neuro:['n13','n14','n04']},
 {id:'str', n:'Stress, Trauma & Safety', h:175, brain:'The autonomic nervous system shifts between safety, mobilisation and shutdown. Regulation widens the window in which you can think and connect.', neuro:['n11','n10','n09']},
 {id:'sab', n:'Self-Sabotage & Behaviour', h:45, brain:'Habits live in loops of cue, routine and reward driven by dopamine. You change a loop by keeping the cue and reward and swapping the routine.', neuro:['n12','n05','n17']},
 {id:'bnd', n:'Boundaries & Communication', h:145, brain:'Saying no can trigger the same threat circuits as physical danger when belonging feels at stake. Practice makes the new response less alarming.', neuro:['n08','n19','n17']},
 {id:'grf', n:'Grief, Loss & Change', h:225, brain:'Grief is the brain relearning a world where someone or something is missing. The map of "they will be there" takes time and repetition to update.', neuro:['n13','n14','n19']},
 {id:'bod', n:'Body & Intimacy', h:320, brain:'The insula reads signals from inside the body (interoception). Attending to sensations with curiosity improves emotional awareness.', neuro:['n16','n11','n18']},
 {id:'wrk', n:'Work, Money & Purpose', h:95, brain:'Chronic stress keeps cortisol high and wears down focus and memory. Recovery, not just effort, is what lets the brain consolidate and perform.', neuro:['n10','n18','n12']},
 {id:'kno', n:'Self-Knowledge & Resources', h:250, brain:'Insight becomes change through repetition. Noticing, naming and choosing again, many times, is how new pathways get myelinated.', neuro:['n17','n03','n06']},
 {id:'fth', n:'Relational & Faith Lens', h:285, brain:'Being securely held, by people and by a sense of being loved, calms the threat system and builds the soothing system that compassion work strengthens.', neuro:['n19','n11','n03']}
];
const MAPS = [];
const sp = s => s ? s.split(';').map(x=>x.trim()).filter(Boolean) : [];
function E(a,t,u,b,th,bh,cy,q,nd,bl,nx,rl){
  MAPS.push({type:'E',area:a,t,u,body:sp(b),th:sp(th),bh:sp(bh),cy:cy.split('>').map(x=>x.trim()),q:sp(q),nd:sp(nd),bl:sp(bl),nx:sp(nx),rl});
}

// 01 ANXIETY
E('anx','The Anxiety Cycle','Anxiety is the brain\'s alarm predicting danger that may not be here yet. It is protective, but it can fire too often or too loudly.',
'racing heart;tight chest;shallow breathing;stomach knots','What if it goes wrong?;I won\'t cope;Something bad is coming','avoiding;checking;over-planning;seeking reassurance',
'Uncertain situation>Threat prediction>Body alarm rises>Avoid or escape>Short-term relief>Brain learns "that was dangerous"',
'What exactly am I predicting will happen?;If it did happen, what would I do?;What has anxiety stopped me from doing?','safety;predictability;confidence in coping','I must be ready for every outcome;I can\'t handle discomfort',
'Name the prediction out loud;Breathe out longer than you breathe in;Take one small step toward, not away','Anxiety often eases when we are not alone with it. Who can sit with you while you take the small step?');
E('anx','Excessive Worry','Worry is thinking about future problems in a loop that feels productive but rarely reaches a decision.',
'restlessness;muscle tension;tired but wired;poor sleep','I have to think this through;If I stop worrying it will happen;What about…','making lists without acting;asking others repeatedly;scrolling for information',
'A "what if" appears>Mind tries to solve it>No certainty is found>New "what if" appears>Tension builds>Worry feels necessary',
'Is this a problem I can act on today?;What does worrying protect me from feeling?;How often has the worst case happened?','certainty;control;reassurance','Worrying keeps me safe;Good people worry about everything',
'Set a 15-minute daily "worry window";Sort worries into "act now" and "let it float";Write one next action for solvable worries','Prayer, journaling, or telling a trusted person can move worry from a closed loop into a shared space.');
E('anx','Rumination','Rumination is replaying the past or a problem again and again, looking for an answer that the replay can\'t give.',
'heaviness;low energy;headaches;tense jaw','Why did I…?;Why me?;If only I had…','withdrawing;going quiet;replaying conversations;staying in bed',
'Painful event>"Why?" question>Replay the scene>Self-blame grows>Mood drops>More "why?" questions',
'Is this thought helping me solve or just hurting me?;What would I tell a friend going over this?;What do I need instead of an answer?','understanding;closure;self-forgiveness','If I understand it fully, I can prevent it;I deserve to suffer over this',
'Switch "why" to "what now?";Move your body for 10 minutes to break the loop;Schedule a time to reflect, then stop','Confession and being heard can complete what endless replay cannot.');
E('anx','Intolerance of Uncertainty','Finding not-knowing so uncomfortable that you\'d rather have bad news than no news.',
'agitation;difficulty relaxing;on edge;fatigue','I need to know now;Not knowing means danger;I can\'t move until I\'m sure','over-researching;delaying decisions;asking for guarantees;double-checking',
'Unknown outcome>Discomfort spikes>Search for certainty>Brief relief>New doubt appears>Need for certainty grows',
'What would I do differently if I accepted not knowing?;Where in life have I already lived well with uncertainty?;What does certainty promise me?','safety;control;trust','Uncertainty is unbearable;If I don\'t know, something will go wrong',
'Practise small uncertainties (try a new route);Notice the urge to check and wait 10 minutes;Say: "I don\'t know yet, and I can handle that"','Trust grows in relationships where we are held even when outcomes are unclear.');
E('anx','Hypervigilance','A state of constant scanning for danger, as if the body never got the message that the threat has passed.',
'startle easily;tight shoulders;eyes scanning;hard to sleep','Something is about to go wrong;I can\'t let my guard down;People can\'t be trusted','sitting facing the door;reading faces closely;over-preparing;avoiding crowds',
'Past danger>Brain stays on watch>Neutral cues look threatening>Body stays alert>Exhaustion>Feels less safe',
'Where in my body do I feel "on guard"?;When did I learn to stay watchful?;Where do I feel even 10% safer?','safety;rest;predictability','If I relax I will be hurt;Danger is everywhere',
'Orient: slowly look around and name 5 safe things;Lengthen your exhale;Build a "safe place" routine before sleep','Safe, consistent relationships slowly teach the nervous system it can rest.');
E('anx','Anxious Avoidance','Steering away from people, places or tasks that trigger fear. It brings relief now but makes the fear bigger later.',
'relief after escaping;dread beforehand;nausea;tension','I can\'t face it;I\'ll do it when I feel ready;It\'s not worth the risk','cancelling plans;procrastinating;using excuses;leaving early',
'Feared situation>Anxiety rises>Avoid it>Relief>Fear never gets tested>Next time feels scarier',
'What am I avoiding right now?;What has avoidance cost me this year?;What is the smallest version I could face?','safety;competence;freedom','Avoiding is the only way to feel okay;I\'m not strong enough',
'Build a fear ladder from easiest to hardest;Climb one rung at a time and stay until anxiety drops;Track what actually happens','Bringing a companion on the first steps is not weakness; it is how courage is borrowed and then owned.');
E('anx','Fear of Making Mistakes','A strong fear that any error will expose you as inadequate or lead to rejection.',
'tight stomach before tasks;sweaty hands;freezing up','I must get it right;Everyone will notice;A mistake proves I\'m not good enough','over-checking;asking permission;not trying new things;hiding errors',
'New task>Imagine making a mistake>Fear and pressure>Over-control or avoid>Little learning>Confidence stays low',
'What would a "good enough" result look like?;Who taught me mistakes were dangerous?;What did I learn from a past mistake?','acceptance;security;competence','Mistakes are unforgivable;My worth depends on performance',
'Make one deliberate small mistake and notice the outcome;Replace "perfect" with "done and learning";Share one error with someone safe','Grace means mistakes do not cancel belonging. Where have you experienced that?');
E('anx','Fear of Failure','Fear that falling short will mean you are a failure as a person, not just in one task.',
'dread;heaviness before deadlines;low energy','If I fail, I\'m worthless;People will lose respect for me;Better not to try','procrastinating;setting low goals;self-handicapping;quitting early',
'Important goal>Imagine failing>Shame anticipated>Hold back effort>Weaker result>Belief "I fail" confirmed',
'What would failure mean about me, in my own words?;What would I attempt if failure were survivable?;Who loves me regardless of results?','worth;acceptance;growth','Failing equals being a failure;Success is the price of love',
'Separate "I failed at X" from "I am a failure";Set learning goals, not only outcome goals;Celebrate effort as well as results','Being loved before achieving anything is the foundation that lets us risk failing.');
E('anx','Fear of Judgment','Fear of being negatively evaluated, criticised or laughed at by others.',
'blushing;shaking voice;heat in face;tight throat','They think I\'m stupid;Everyone is watching;I\'ll embarrass myself','staying quiet;rehearsing what to say;avoiding eye contact;leaving events early',
'Social situation>Predict judgment>Self-focus increases>Safety behaviours>Feel awkward>"They did judge me" (mind-reading)',
'What evidence do I have of what they think?;How much do I think about others\' mistakes?;Whose opinion really matters to me?','belonging;acceptance;respect','I must be liked by everyone;My flaws are obvious',
'Shift attention outward: get curious about others;Drop one safety behaviour at a time;Test a prediction and record the result','Belonging that does not depend on performance is the deepest antidote to fear of judgment.');
E('anx','Need for Control','Trying to manage people, plans and outcomes to keep anxiety down. The more control is sought, the more out of control life feels.',
'tension;irritability;trouble delegating;tired','If I don\'t do it, it will go wrong;I can\'t relax until it\'s handled','micromanaging;rigid routines;doing everything yourself;over-planning',
'Uncertainty>Anxiety>Take control>Temporary calm>Something unpredictable happens>Grip tightens',
'What am I trying to prevent?;What is truly within my control here?;What would letting go of 10% look like?','safety;trust;rest','Losing control means disaster;Others can\'t be trusted to do it right',
'Sort a worry into "my control / my influence / not mine";Delegate one small task and resist correcting it;Practise a simple surrender phrase or prayer','Trust is a relationship before it is a technique. Whom, or what, could you rest your weight on?');

// 02 EMOTIONS
E('emo','Anger','Anger is energy that says "a boundary has been crossed" or "this is unfair." It is useful information, but harmful when it controls the response.',
'heat;clenched fists;jaw tight;heart pounding','That\'s not fair;They did it on purpose;I won\'t let them get away with it','shouting;slamming;sarcasm;withdrawing in silence',
'Trigger (unfairness, threat)>Hot thoughts>Body surges>Outburst or bottling>Damage or resentment>Next trigger hits harder',
'What boundary or value was crossed?;What softer feeling sits under the anger?;What do I want to happen next?','respect;fairness;being heard','Anger is bad;If I don\'t fight, I\'ll be walked on',
'Pause: step away for 20 minutes to let the surge settle;Name the need behind the anger;Express it as "I feel… because… I need…"','"Be angry and do not sin": anger can be honest without being destructive.');
E('emo','Guilt','Guilt is the feeling that you did something wrong. Healthy guilt points to repair. Excessive guilt punishes without end.',
'heavy chest;sinking stomach;restlessness','I should have…;It\'s my fault;I let them down','over-apologising;people-pleasing;avoiding the person;self-punishment',
'Action or omission>Sense of wrongdoing>Guilt>Repair or self-punishment>If no repair: guilt lingers>Generalises to "I\'m bad"',
'Did I actually cause harm, or am I taking responsibility for others\' feelings?;What repair is possible?;Would I judge a friend this harshly?','integrity;repair;forgiveness','I must make everyone happy;I don\'t deserve to move on',
'Check the facts: is the guilt proportional?;Make one concrete repair, then stop;Practise self-forgiveness as a decision','Guilt that leads to confession and repair is a gift; guilt that never accepts forgiveness becomes a burden.');
E('emo','Shame','Shame is the feeling that you are bad, not just that you did something bad. It makes us want to hide.',
'face burning;eyes down;shrinking posture;wanting to disappear','I am the problem;If they knew the real me…;I\'m defective','hiding;perfectionism;attacking others;numbing',
'Exposure or criticism>"I am bad" feeling>Hide or defend>Isolation>No chance to be accepted>Shame deepens',
'What is the shame story I tell about myself?;Who would I be afraid to tell this to? Who could I tell?;Where did this message first come from?','acceptance;belonging;dignity','I am fundamentally flawed;Love must be earned',
'Name it: "this is shame";Share the story with one safe person;Speak to yourself as you would to a loved child','Shame grows in secrecy and heals in being seen and still loved. That is the core of grace.');
E('emo','Sadness','Sadness is the natural response to loss and disappointment. It slows us down so we can grieve and reach out.',
'heaviness;tears;fatigue;lump in throat','I miss it;What\'s the point?;Nothing will be the same','crying;withdrawing;resting more;seeking comfort',
'Loss or disappointment>Sadness>Allow and share>Comfort received>Gradual lifting (or, if suppressed: sadness gets stuck)',
'What have I lost or not received?;What does my sadness want me to do?;Who could I let see my sadness?','comfort;connection;meaning','Sadness is weakness;I must stay positive',
'Let tears come without judgment;Do one gentle comforting activity;If sadness lasts weeks with no relief, talk to a professional','Lament is a healthy, honest practice: bringing sorrow to God and to others rather than hiding it.');
E('emo','Frustration','Frustration is the feeling when effort meets a block. It signals that something needs to change: the approach, the goal or the expectation.',
'tension;sighing;restless legs;irritability','This shouldn\'t be so hard;Why isn\'t it working?;I\'m stuck','giving up;pushing harder;snapping at people',
'Goal>Obstacle>Frustration>Push harder or quit>Still blocked>Frustration grows',
'What exactly is blocking me?;Is my expectation realistic?;What is one different approach?','progress;competence;ease','Things should go my way;If it\'s hard, I\'m failing',
'Take a short break before trying again;Break the task into the next tiny step;Ask for help or a fresh perspective','Patience is not passivity; it is staying in relationship with a hard process.');
E('emo','Resentment','Resentment is anger that has been held over time, often from hurts that were never expressed or repaired.',
'tight chest;bitter taste;tension around the person','They owe me;I\'ll never forget it;It\'s not fair that…','cold distance;keeping score;sarcasm;gossip',
'Hurt>Not expressed>Replayed>Anger hardens>Distance and score-keeping>New hurts added',
'What hurt have I not said out loud?;What do I want from them: apology, change, acknowledgement?;What is resentment costing me?','acknowledgement;justice;repair','Speaking up is pointless;If I let go, I excuse them',
'Write an unsent letter naming the hurt;Decide: address it, accept it or release it;Learn the difference between forgiveness and reconciliation','Forgiveness releases the debt from your hands; it does not require pretending the harm was okay.');
E('emo','Envy','Envy is the pain of seeing someone have what you want. It can point to your own desires and values.',
'tightness;hollow stomach;heat','Why them and not me?;I\'ll never have that;They don\'t deserve it','comparing;criticising them;withdrawing;over-working',
'See someone\'s success>Compare>Feel lacking>Resent or self-attack>Disconnection>More comparison',
'What exactly do I want that they have?;What does this tell me about my values?;What step toward it is within reach?','recognition;fulfilment;fairness','There isn\'t enough for me;My worth depends on comparison',
'Turn envy into a desire statement: "I want…";Take one step toward that desire;Practise gratitude for what is already yours','Celebrating with others is a discipline that loosens envy\'s grip.');
E('emo','Loneliness','Loneliness is the pain of feeling disconnected, whether or not people are around. It is a signal of an unmet need for belonging.',
'emptiness;heaviness;poor sleep;restlessness at night','No one really knows me;People don\'t want me around;I\'m on my own','withdrawing more;scrolling;over-working;waiting for others to reach out',
'Feel disconnected>Expect rejection>Withdraw>Fewer interactions>Feel more alone>Expect rejection more',
'When do I feel most and least lonely?;What kind of connection am I missing: close, social, community?;What small reach-out could I make?','belonging;being known;companionship','I\'m a burden;People will reject me',
'Send one message to someone this week;Join a regular group (class, church, volunteer);Notice and question the "they won\'t want me" thought','We were made for communion. Loneliness is not a flaw; it is the ache of that design.');
E('emo','Emotional Overload','When feelings pile up faster than you can process them, the system floods and everything feels too much.',
'overwhelmed;tearful;foggy head;exhausted','I can\'t take any more;Everything is falling apart;Stop!','shutting down;snapping;crying suddenly;escaping',
'Stressors stack>No time to process>Flooding>Shut down or explode>Tasks pile up>More stressors',
'What are the separate things piling up?;What can be paused or dropped?;What helps me come down from overwhelm?','space;support;rest','I must handle everything alone;Feelings are dangerous',
'Write everything down to unload your mind;Pick one thing to do and one to postpone;Use a grounding skill (5-4-3-2-1 senses)','Carrying one another\'s burdens is what community is for.');
E('emo','Difficulty Identifying & Expressing Emotions','Finding it hard to know what you feel or to put it into words. Often learned in homes where feelings weren\'t named.',
'vague discomfort;headaches;stomach aches;numbness','I don\'t know what I feel;Feelings aren\'t important;Just get on with it','staying busy;intellectualising;sudden outbursts;avoiding emotional talk',
'Feeling arises>Not recognised>Builds up unspoken>Shows in body or outburst>Confusion>More shutting down',
'Where do I feel it in my body?;Is it closer to mad, sad, glad, scared or ashamed?;Who in my family showed feelings openly?','understanding;expression;connection','Feelings are weakness;Nobody wants to hear it',
'Use a feelings wheel daily;Do a 2-minute body scan;Practise "I feel ___ because ___"','Being met in our feelings, as the Psalms model, teaches us that emotions can be spoken safely.');

// 03 SELF
E('self','The Inner Critic','The harsh inner voice that judges and attacks you. It often began as an attempt to protect you from criticism or failure.',
'tension;heavy chest;tired','You\'re so stupid;You always mess up;Who do you think you are?','self-punishment;perfectionism;giving up;avoiding challenges',
'Mistake or challenge>Critic attacks>Shame and fear>Hide or over-perform>Exhaustion>Critic gets louder',
'Whose voice does the critic sound like?;What is it trying to protect me from?;What would a kind coach say instead?','safety;acceptance;encouragement','I need harshness to improve;If I\'m kind to myself, I\'ll get lazy',
'Notice and label it: "that\'s the critic";Give the critic a name and talk back gently;Write a compassionate response to its main line','The voice that names you "beloved" can become louder than the voice that condemns.');
E('self','Constant Comparison','Measuring your worth against others, which almost always leaves you feeling less than.',
'sinking feeling;tension;restless scrolling','They\'re better than me;I\'m behind;I should be where they are','scrolling social media;checking others\' progress;downplaying achievements',
'See others>Compare highlights with my behind-the-scenes>Feel lacking>Push or withdraw>Look again>Compare again',
'Who do I compare myself with most?;What am I comparing: looks, money, success?;What does my own path need?','worth;security;belonging','My value is relative;Someone else\'s win is my loss',
'Limit social media time;Compare yourself to your past self;Write three things you value about your own path','Your story is not a competition; it is a calling.');
E('self','Impostor Syndrome','Feeling like a fraud despite evidence of competence, and fearing being "found out."',
'anxiety before evaluations;tightness;dread','I just got lucky;They\'ll find out I don\'t know;I don\'t belong here','over-preparing;avoiding promotion;deflecting praise;working excessively',
'New role or praise>"I\'m a fraud" thought>Over-prepare or avoid>Success>Credit to luck or effort>Fraud feeling stays',
'What evidence of competence am I dismissing?;Who else feels this way?;What would I believe about a colleague with my record?','recognition;security;belonging','I must know everything;Success is luck',
'Keep an evidence file of achievements;Accept praise with a simple "thank you";Talk about the feeling with a peer','Gifts are given, not earned. You can receive them without fraud.');
E('self','Need for Approval','Depending on others\' validation to feel okay about yourself.',
'anxiety when unsure what others think;tension;relief when praised','I need them to like me;If they\'re upset, I\'ve done something wrong','saying yes too often;hiding opinions;seeking reassurance;over-giving',
'Interaction>Uncertain how they see me>Anxiety>Seek approval or please>Approval received>Need for more approval',
'Whose approval matters most to me?;What would I do if no one were watching?;Where did I learn that love was conditional?','acceptance;belonging;worth','My worth depends on others\' opinions;Disapproval is dangerous',
'Make one small decision without asking anyone;Share an honest preference;Notice approval-seeking and pause','An unshakeable approval already exists: being loved as you are, before you perform.');
E('self','Low Self-Esteem','A general sense that you are not good enough, not likeable or not valuable.',
'slumped posture;low energy;avoiding eye contact','I\'m not good enough;Others are better;I don\'t deserve good things','avoiding opportunities;accepting poor treatment;self-criticism',
'Negative core belief>Notice only evidence for it>Avoid or under-perform>Outcomes confirm belief>Belief strengthens',
'What would I do if I believed I was enough?;What evidence do I ignore?;When did this belief start?','worth;acceptance;dignity','I\'m inferior;I\'m unlovable',
'Write three things you did well each day;Challenge one negative thought with evidence;Set one small, achievable goal','Your dignity is given, not achieved. Self-esteem can grow from that ground.');
E('self','Self-Image','The picture you hold of who you are: your traits, roles and abilities. It may be accurate, outdated or distorted.',
'varies with mood;tension when image is threatened','I\'m the kind of person who…;I\'ve always been like this','acting in line with the image;avoiding what contradicts it',
'Old story about self>Choices based on it>Results fit the story>Story feels true>New possibilities ignored',
'Which labels did I receive as a child?;Which no longer fit?;Who am I becoming?','identity;coherence;growth','People don\'t change;I am what others said I was',
'List five words you use for yourself and check each one;Ask trusted friends how they see you;Try one action that fits who you want to be','Identity can be received, not only constructed: who does Love say you are?');
E('self','Perfectionism','Holding yourself to impossibly high standards and judging yourself harshly when you fall short.',
'tension;exhaustion;difficulty relaxing;insomnia','It has to be perfect;Anything less is failure;I should have done better','over-checking;procrastinating;redoing work;criticising others',
'High standard set>Fear of falling short>Over-work or avoid>Result never "perfect enough">Self-criticism>Set standard higher',
'What is "good enough" here?;What does perfectionism protect me from?;What has it cost me?','acceptance;security;rest','My worth = my performance;Mistakes are unforgivable',
'Set a time limit for tasks;Deliberately hand in "B+" work once;Celebrate completion, not perfection','Grace frees us from needing to be perfect to be loved.');
E('self','Self-Worth','The inner sense of being valuable simply because you exist, not because of what you do.',
'calm vs. constant striving;settledness or restlessness','I matter / I don\'t matter;I have to earn my place','over-achieving;people-pleasing;self-neglect',
'Worth tied to doing>Must keep performing>Exhaustion or failure>Worth collapses>Strive harder',
'Where do I get my sense of worth from?;Is it stable or does it change daily?;What would unconditional worth feel like?','dignity;belonging;security','I am only worth what I produce;I must earn love',
'Write a list of who you are, not what you do;Rest without guilt one hour a week;Notice where you link worth to output','Worth that is given cannot be taken away by failure.');
E('self','Authenticity vs. Adaptation','The tension between being your true self and adapting to fit in. Some adaptation is healthy; too much loses the self.',
'tiredness after socialising;tension;feeling fake','If I\'m myself they won\'t like me;I don\'t know who I really am','masking;changing opinions;mirroring others',
'Need to belong>Hide true self>Accepted for the mask>Feel unseen>Need to belong deepens>Mask thickens',
'Where do I feel most like myself?;What parts of me do I hide?;What small truth could I share?','belonging;authenticity;freedom','My real self is unacceptable;Fitting in is safer',
'Notice where you mask and why;Share one honest opinion this week;Spend time with people who accept the real you','Being fully known and fully loved is the deepest relational longing.');
E('self','Self-Compassion','Treating yourself with the same kindness you would offer a friend: noticing pain, remembering shared humanity and responding kindly.',
'softening;warmth in chest;slower breath','This is hard;Everyone struggles sometimes;May I be kind to myself','gentle self-talk;rest;asking for help;self-care',
'Pain or failure>Notice it mindfully>Remember common humanity>Respond with kindness>Feel soothed>Courage to try again',
'How do I speak to myself when I fail?;What would I say to a friend?;What makes self-kindness hard for me?','kindness;soothing;acceptance','Self-compassion is self-pity;I need to be hard on myself',
'Put a hand on your heart and say "this is hard";Write yourself a kind letter;Practise a self-compassion break daily','Compassion toward yourself can mirror the compassion you have received.');

// 04 RELATIONSHIPS
E('rel','Attachment Styles','The patterns we learned in early relationships for seeking closeness and safety. They shape how we love and react under stress.',
'calm or alarm when close;tension at distance','Will they stay?;I don\'t need anyone;Can I trust them?','pursuing;withdrawing;testing;seeking closeness',
'Need for connection>Old expectation activates>Protective strategy (cling or distance)>Partner reacts>Expectation confirmed>Pattern repeats',
'What did closeness feel like growing up?;What do I do when I feel distant from someone?;What helps me feel secure?','safety;closeness;reliability','People leave;Depending on others is dangerous',
'Learn your attachment pattern (see the comparison sheet);Notice your protest or withdrawal moves;Practise asking directly for reassurance','Earned security is possible: secure relationships, and a secure base in God, can rewrite old expectations.');
E('rel','Emotional Dependency','Relying on one person to regulate your feelings and sense of worth.',
'anxiety when apart;relief when together;panic at conflict','I can\'t be okay without them;If they leave I\'ll fall apart','constant contact;giving up own interests;avoiding conflict',
'Feel empty>Seek the person>Feel better>Less self-soothing practised>Feel empty when apart>Need them more',
'What do I look to this person for?;What could I provide for myself?;Who else supports me?','security;self-regulation;belonging','I am incomplete alone;Without them I am nothing',
'Build a broader support network;Develop one solo interest;Practise self-soothing before reaching out','Healthy interdependence holds many relationships, not just one.');
E('rel','Codependency','Focusing on another person\'s needs, problems or behaviour at the expense of your own wellbeing.',
'exhaustion;resentment;anxiety about their state','If I don\'t help, things will collapse;Their happiness is my job','rescuing;controlling;covering for them;neglecting self',
'Other\'s problem>Feel responsible>Rescue>Briefly valued>Other doesn\'t change>Resentment and more rescuing',
'Whose problem is this?;What would happen if I stepped back?;What am I neglecting in myself?','being needed;control;worth','I\'m valuable only when helping;Saying no is selfish',
'Name the difference between helping and rescuing;Let someone face a natural consequence;Spend time on your own needs','Love that serves is good; love that cannot say no may be fear in disguise.');
E('rel','Fear of Abandonment','A deep fear that the people you love will leave, often rooted in past experiences of loss or inconsistency.',
'panic when someone pulls back;knot in stomach;sleeplessness','They\'re going to leave;I\'m too much;I\'ll end up alone','clinging;testing;checking phones;ending things first',
'Sign of distance>Fear of abandonment>Protest behaviour>Partner feels pressured>Partner withdraws>Fear confirmed',
'What happens in my body when someone goes quiet?;What past experiences shaped this?;What reassures me in a lasting way?','security;consistency;belonging','People always leave;I am not worth staying for',
'Pause before reacting to silence;Ask for reassurance directly instead of testing;Write evidence of people who stayed','"I will never leave you" is a promise many hold onto when human love feels fragile.');
E('rel','Rejection Sensitivity','Expecting rejection, noticing it quickly and reacting strongly, even to small or unclear signals.',
'sharp pain;flushed;sudden tears;tight chest','They don\'t like me;I said something wrong;I knew it','withdrawing;over-apologising;lashing out;people-pleasing',
'Ambiguous cue>Interpret as rejection>Intense hurt>React (withdraw, attack)>Relationship strained>More real rejection',
'What else could this cue mean?;How intense was my reaction compared to the event?;Where did I first feel rejected?','acceptance;belonging;reassurance','I will be rejected;I am unlikeable',
'List three alternative explanations;Wait 24 hours before responding;Check in directly: "I noticed… are we okay?"','Belonging that is secure can absorb small rejections without collapse.');
E('rel','Jealousy & Insecurity','The fear of losing someone\'s love or attention to another person.',
'tight chest;heat;stomach churning','They\'ll find someone better;I\'m not enough;They\'re hiding something','checking;questioning;accusing;comparing',
'Perceived threat>Insecurity>Checking or accusing>Partner defensive>Distance>More insecurity',
'What does jealousy fear I\'ll lose?;Is there evidence or is it a feeling?;What would help me feel secure?','security;loyalty;reassurance','I\'m replaceable;I must guard what I love',
'Name the fear rather than the accusation;Agree on reassurance rituals together;Work on your own sense of worth','Trust is built through consistent faithfulness, by both partners.');
E('rel','Difficulty Trusting','Struggling to rely on others, often after betrayal or inconsistency.',
'guardedness;tension;watchfulness','People let you down;If I trust, I\'ll get hurt;I can only rely on myself','keeping distance;testing;doing it all alone',
'Past betrayal>Expect betrayal>Keep distance>No chance for trust to grow>Relationships stay shallow>"See, I\'m alone"',
'Who has been trustworthy, even a little?;What would small trust look like?;What did betrayal teach me?','safety;reliability;closeness','Everyone betrays eventually;Vulnerability is foolish',
'Trust in small steps and watch for consistency;Share something low-risk;Notice when people show up','Trust is rebuilt slowly by faithful actions over time, not by promises alone.');
E('rel','Repeating Relationship Patterns','Finding yourself in similar relationships or conflicts again and again.',
'"here we go again" feeling;familiar tension','This always happens;I always end up with…','choosing similar partners;same arguments;same exits',
'Familiar feels safe>Choose the familiar>Old wounds reopened>Same ending>Self-blame>Familiar still feels safe',
'What keeps repeating?;Who does this remind me of?;What would a different choice feel like?','safety;healing;change','This is what love looks like;I deserve this',
'Map your last three relationships for patterns;Notice attraction to "familiar";Talk it through with a therapist','Healing relationships can provide the new experience that breaks the old script.');
E('rel','Emotional Unavailability','Difficulty opening up or staying emotionally present in close relationships.',
'restlessness when close;numbness;urge to leave','I don\'t need anyone;Feelings are messy;I need space','changing the subject;staying busy;keeping things light',
'Closeness grows>Vulnerability feels risky>Pull away>Partner pursues or leaves>Feel relieved or alone>Pattern repeats',
'What happens inside me when someone gets close?;What did I learn about needing others?;What small opening could I risk?','safety;independence;connection','Needing people is weak;If I open up, I\'ll be hurt',
'Name one feeling to someone each day;Stay a little longer in a close moment;Explore the history with a therapist','We are known even when we hide; that knowledge can make opening less frightening.');
E('rel','Fear of Intimacy','Fear of being truly close: seen, known and vulnerable with another person.',
'tension;wanting to escape;numbness','If they see me, they\'ll leave;Closeness means losing myself','sabotaging;keeping secrets;choosing unavailable people',
'Desire closeness>Fear of exposure>Create distance>Loneliness>Desire closeness again',
'What part of me am I most afraid to show?;What happened when I was vulnerable before?;Who is safe enough to try with?','safety;acceptance;being known','Being known is dangerous;I will be engulfed',
'Share one vulnerable thing at a time;Agree on safe pace with your partner;Notice and name the urge to pull away','To be fully known and still loved is the heart of grace.');
// 05 FAMILY
E('fam','Family Roles','Unspoken parts each person plays in a family (hero, peacemaker, scapegoat, lost child, clown) to keep the system stable.',
'tension when stepping out of role;fatigue','This is just who I am in my family;Someone has to…','fixing;mediating;joking;disappearing',
'Family stress>Role adopted>Role rewarded or needed>Role becomes identity>Repeated in other groups',
'Which role did I play?;What did it give me and cost me?;Who am I outside that role?','belonging;safety;identity','My job is to keep everyone okay;I can\'t change my place',
'Name your role and draw your family map;Notice where you repeat it at work or church;Try one action outside the role','In a healthy family of faith, belonging is not earned by playing a part.');
E('fam','Parentification','When a child takes on adult emotional or practical responsibilities for a parent or siblings.',
'chronic tiredness;difficulty resting;hyper-responsibility','I have to look after everyone;My needs come last','caretaking;over-functioning;difficulty receiving care',
'Parent unavailable>Child steps up>Praised or needed>Own needs ignored>Adult over-functions>Burnout',
'What did I carry as a child that wasn\'t mine?;What did I miss out on?;What would it mean to be cared for?','care;rest;childhood','My needs are a burden;If I stop, it will all fall apart',
'Grieve the childhood you missed;Practise receiving help;Return responsibilities that are not yours','You were never meant to carry the world. Rest is permitted.');
E('fam','Family Triangulation','When two people in conflict pull a third person in, rather than dealing with each other directly.',
'tension;caught in the middle;stomach aches','I have to choose a side;It\'s my job to fix them','messenger role;taking sides;absorbing conflict',
'Two people in conflict>Third pulled in>Tension spreads>Original issue unresolved>Triangle repeats',
'Who pulls me into the middle?;What would happen if I stepped out?;What conversations need to happen directly?','safety;fairness;freedom','Peace is my responsibility;Conflict must be avoided',
'Say "Please talk to them directly";Refuse to carry messages;Have one-to-one relationships with each person','Matthew 18 models going directly to the person; triangles rarely heal.');
E('fam','Emotional Neglect','When a child\'s emotional needs are consistently not noticed or responded to, even if physical needs were met.',
'emptiness;numbness;vague sadness','My feelings don\'t matter;I should handle it alone','self-reliance;not asking for help;difficulty naming feelings',
'Feelings not noticed>Child stops expressing>Learns self-reliance>Adult feels empty>Doesn\'t seek support',
'Who noticed how I felt as a child?;What did I do with big feelings?;What do I need to hear now?','attunement;comfort;validation','Needing comfort is weak;No one will notice me',
'Learn to name feelings daily;Let one safe person comfort you;Reparent: give yourself what you missed','Being seen is a deep need; the God who sees is one image many find healing.');
E('fam','Family Expectations','The spoken and unspoken hopes and demands your family places on you.',
'pressure;tension before family events','I must not disappoint them;I owe them','following family plans;hiding choices;over-achieving',
'Expectation>Pressure>Comply or rebel>Guilt or conflict>Expectations intensify',
'Which expectations are mine and which are theirs?;What would I choose freely?;How can I honour them without losing myself?','approval;freedom;respect','Disappointing them is unforgivable;Their wishes come first',
'Write down family expectations and mark which you agree with;Share one choice respectfully;Accept their feelings without changing course','Honouring parents does not require living their plans for your life.');
E('fam','Guilt About Being Different','Feeling disloyal for choosing beliefs, values or a life path different from your family\'s.',
'heaviness;anxiety during visits','I\'m betraying them;Who am I to be different?','hiding parts of life;over-explaining;avoiding visits',
'Different choice>Family reaction>Guilt>Hide or justify>Feel disconnected>More guilt',
'What am I afraid will happen if I\'m different?;Can I love them and still choose differently?;What values guide me now?','belonging;authenticity;acceptance','Love requires sameness;Difference is rejection',
'Separate loyalty to people from loyalty to every belief;Share differences with care;Find community that supports your path','Love can hold difference without demanding sameness.');
E('fam','Relationship With the Mother Figure','How your relationship with your mother or mother figure shaped your sense of nurture, safety and worth.',
'warmth, longing or tension around her','She was always there / never there;I have to take care of her','seeking or avoiding nurture;caretaking;distance',
'Early nurture pattern>Expectations of care>Similar relationships later>Old feelings resurface',
'What did I receive and miss from her?;How does that show up in my relationships?;What do I need to grieve or appreciate?','nurture;acceptance;comfort','I must earn care;Care is unreliable',
'Write a letter (unsent) to your mother figure;Notice mother-like dynamics in others;Seek nurturing relationships now','Many find comfort in the image of a God who comforts "as a mother comforts her child."');
E('fam','Relationship With the Father Figure','How your relationship with your father or father figure shaped your sense of protection, approval and direction.',
'tension around authority;longing for approval','I need to prove myself;Men can\'t be trusted;He was proud / never proud','seeking approval;rebelling;over-achieving;avoiding authority',
'Early father experience>Expectations of approval or protection>Reactions to authority figures>Old patterns repeat',
'What did I want from my father?;How do I react to authority?;What image of "father" do I carry into faith?','approval;protection;guidance','I must earn approval;Authority is dangerous',
'Notice father-shaped reactions to bosses or leaders;Grieve what you didn\'t receive;Find mentors who model healthy fathering','Our image of God is often shaped by our father; healing one can heal the other.');
E('fam','Sibling Conflict','Ongoing tension, rivalry or distance between siblings, often shaped by roles and comparison in childhood.',
'irritation;old hurt;tension at gatherings','They were always the favourite;Nothing changes','avoiding;competing;old arguments repeating',
'Old rivalry>Gathering>Old roles return>Conflict>Distance>Next gathering tense',
'What role did each of us play?;What do I wish my sibling understood?;What relationship would I like now?','fairness;recognition;connection','There\'s not enough love to go around;They\'ll never change',
'Meet one-to-one, not only in family settings;Speak from "I" not "you always";Accept what can\'t be changed','The story of Joseph shows siblings can reconcile after deep harm, though slowly.');
E('fam','Intergenerational Patterns','Ways of coping, relating and believing that are passed down through generations.',
'familiar reactions you can\'t explain','This is how we\'ve always done it;I swore I\'d never be like them','repeating parenting styles;silence;addiction;anger',
'Unhealed hurt in one generation>Coping pattern>Passed on to children>Repeats>Until someone notices',
'What patterns do I see across generations?;Which do I want to keep?;Which do I want to end?','healing;freedom;legacy','I\'m destined to repeat it;Family secrets must stay hidden',
'Draw a three-generation genogram;Name one pattern to break;Find support so you don\'t break it alone','You can become a "transition person" who turns harmful legacy into blessing.');

// 06 STRESS & TRAUMA
E('str','Fight Response','When threatened, the body mobilises to confront the danger. Helpful for protection; harmful when triggered too easily.',
'clenched fists;heat;heart racing;jaw tight','I won\'t let you hurt me;Attack first','arguing;yelling;controlling;defensiveness',
'Threat (real or perceived)>Mobilise energy>Confront>Short-term power>Conflict or damage>More threat sensitivity',
'What feels threatened when I fight?;What does fight protect me from feeling?;What other response could I try?','safety;respect;control','I must defend or I\'ll be destroyed',
'Discharge energy safely (walk, push a wall);Take a pause before responding;Name the fear under the fight','Strength under control (meekness) is power that protects without harming.');
E('str','Flight Response','When threatened, the body mobilises to escape. It can look like anxiety, busyness or avoidance.',
'restlessness;fast heartbeat;urge to run','Get out;I can\'t stay here;Keep moving','leaving;staying busy;overworking;avoiding conflict',
'Threat>Urge to escape>Run (literally or through busyness)>Relief>Problem unresolved>Escape again',
'What am I running from?;What would happen if I stayed?;Where can I rest safely?','safety;relief;rest','Stillness is dangerous;If I stop, it will catch me',
'Practise sitting still for 2 minutes;Notice "busy" as a possible escape;Stay in one small discomfort','"Be still and know": stillness can become a safe practice, not a threat.');
E('str','Freeze Response','When escape or fight seems impossible, the body may freeze: stuck, unable to move or think.',
'stillness;numbness;holding breath;heavy limbs','I can\'t move;My mind went blank','going silent;paralysis;inability to decide',
'Overwhelming threat>No escape>Freeze>Feel stuck or blank>Shame about freezing>More freeze',
'When do I freeze?;What helps me thaw?;Can I treat freezing as protection, not failure?','safety;agency;support','I\'m weak for freezing;I should have acted',
'Wiggle fingers and toes;Orient to your surroundings;Name the freeze kindly: "my body is protecting me"','Freezing is not a moral failure; it is a body trying to survive.');
E('str','Fawn Response','Responding to threat by pleasing, appeasing and complying to keep the peace.',
'tight smile;tension;exhaustion after interactions','Keep them happy;Don\'t rock the boat;What do they need?','people-pleasing;agreeing;apologising;abandoning own needs',
'Threat from a person>Appease them>Conflict avoided>Own needs ignored>Resentment or emptiness>Fawn again',
'Who do I fawn with most?;What would happen if I said no?;What do I actually want?','safety;acceptance;voice','My needs cause conflict;Keeping others happy keeps me safe',
'Notice the automatic "yes" and pause;State one small preference;Practise boundaries in low-risk situations','Peace-making is not the same as peace-keeping at any cost.');
E('str','Emotional Triggers','Situations, words or cues that set off a strong emotional reaction linked to past experiences.',
'sudden surge;heart racing;tears;heat','This is just like before;I\'m not safe','overreacting;shutting down;fleeing',
'Cue>Old memory activated (often without awareness)>Strong reaction>Confusion or shame>Avoid the cue',
'What are my most common triggers?;What older experience might this echo?;What helps me come back?','safety;understanding;control','I should be over this;My reactions are crazy',
'Keep a trigger log (situation, feeling, intensity);Create a grounding plan;Tell safe people what helps','Being met with understanding when triggered helps the brain file the past as past.');
E('str','Window of Tolerance','The zone where you can feel emotions and still think clearly. Above it is hyperarousal; below it is hypoarousal.',
'within: calm, alert;above: racing;below: numb','I can handle this / I can\'t / I don\'t care','engaged / reactive / shut down',
'Stress pushes you to the edge>Leave the window>Hyper or hypo state>Regulate (breath, movement, connection)>Return to the window',
'Where am I right now: above, inside, below?;What pushes me out?;What brings me back?','regulation;safety;support','I must always be calm;Feelings are dangerous',
'Use the Window of Tolerance scale;Build a list of "up" and "down" regulation tools;Practise widening the window with small stretches','Co-regulation with safe people widens the window over time.');
E('str','Hyperarousal','The nervous system stuck "on": too much energy, alertness and reactivity.',
'racing heart;sweating;insomnia;jumpy','I\'m in danger;I can\'t calm down','irritability;outbursts;pacing;over-alertness',
'Stressor>Arousal rises>Stays high>Sleep and thinking suffer>Small triggers cause big reactions',
'What signals tell me I\'m above the window?;What calms my body fastest?;What drains my reserves?','calm;safety;rest','I must stay alert;Relaxing is dangerous',
'Long exhale breathing (4 in, 6–8 out);Cold water on face;Slow walking and rhythmic movement','Rest is a gift, not a reward.');
E('str','Shutdown & Hypoarousal','The nervous system dropping into low energy: numb, flat, disconnected. A protective response to overwhelm.',
'heaviness;numbness;fatigue;feeling far away','Nothing matters;I can\'t feel anything','withdrawing;sleeping a lot;staring;going through motions',
'Overwhelm>Energy drops>Shutdown>Isolation>Less input>Stuck in low state',
'What signals tell me I\'m below the window?;What gently brings energy back?;Who can help me reconnect?','connection;gentle activation;safety','Feeling is dangerous;Nothing will change',
'Gentle movement (stretching, walking);Strong sensations (sour taste, scent, music);Reach out to one person','Being gently accompanied, not pushed, helps a shut-down system re-engage.');
E('str','Felt Sense of Safety','The bodily experience of being safe, not just knowing you are safe in your head.',
'relaxed shoulders;easy breath;soft eyes','I\'m okay here;I can relax','connecting;playing;resting',
'Cue of safety>Body relaxes>Connection possible>More safety cues noticed>Safety deepens',
'Where and with whom do I feel safest?;What sensations tell me I\'m safe?;What small cues of safety can I add?','safety;belonging;rest','I\'m never safe;Safety is temporary',
'Create a safety anchor (place, person, object);Practise noticing "glimmers": tiny moments of safety;Build routines that signal safety','Safety in relationship ("I am with you") is a core theme of both trauma recovery and faith.');
E('str','Stabilising After Hard Experiences','Before processing painful memories, the first step is building stability: routines, support and coping skills.',
'jumpy or numb;sleep problems;fatigue','I\'m falling apart;I can\'t cope','avoiding;isolating;unhealthy coping',
'Hard experience>System overwhelmed>Stabilise (routine, support, skills)>Capacity grows>Ready to process>Integration',
'What do I need to feel stable this week?;Who is my support?;What coping tools work for me?','stability;safety;support','I should be over it;I must process everything now',
'Keep regular sleep and meals;Build a crisis plan;Find a trauma-informed therapist','Lament and community support are part of how faith traditions stabilise after loss.');

// 07 SELF-SABOTAGE
E('sab','Procrastination','Putting off tasks despite knowing it will cause problems. Usually about avoiding uncomfortable feelings, not laziness.',
'restlessness;dread;tension','I\'ll do it later;I work better under pressure;I can\'t face it','scrolling;cleaning;starting other tasks',
'Task>Uncomfortable feeling>Avoid>Short-term relief>Deadline pressure>Shame>More avoidance next time',
'What feeling am I avoiding?;What is the smallest first step?;What would make the task feel safer?','competence;ease;relief','I must feel ready before starting;If it\'s not perfect, why bother',
'Use the 2-minute rule: just start;Break tasks into tiny steps;Reward yourself after starting','Diligence grows from grace, not fear.');
E('sab','Self-Sabotage','Undermining your own goals, often because success feels unfamiliar or threatening.',
'tension near success;anxiety;guilt','I don\'t deserve this;It won\'t last;Better to ruin it myself','missing deadlines;picking fights;quitting before success',
'Approach success>Fear (unfamiliar, undeserved)>Sabotage>Failure>"See, I knew it">Belief strengthened',
'What do I fear success would bring?;What belief does sabotage protect?;What would it be like to let good things happen?','safety;worth;belonging','I don\'t deserve good things;Success brings danger',
'Notice the pattern before it repeats;Say the fear out loud;Take one step to protect your goal','Receiving good gifts is part of learning you are loved.');
E('sab','Indecision','Difficulty making choices, often from fear of choosing wrong or of regret.',
'anxiety;mental fatigue;tension','What if I choose wrong?;I need more information','delaying;asking everyone;changing mind',
'Choice>Fear of wrong choice>Gather more info>Overwhelm>Delay>Choice made by default',
'What am I afraid will happen?;What do my values say?;Is this reversible?','certainty;safety;confidence','There is one perfect choice;Mistakes are unforgivable',
'Set a deadline for deciding;Use a simple values checklist;Accept "good enough" choices','Wisdom often comes as peace about a next step, not certainty about every step.');
E('sab','Avoiding Hard Tasks','Steering away from tasks that feel difficult, boring or emotionally loaded.',
'tension;heaviness;fatigue','It\'s too much;I\'ll do it when I feel like it','doing easy tasks first;staying busy;delegating',
'Hard task>Discomfort>Do easy tasks instead>Hard task grows>More discomfort',
'What makes this task hard?;What support would help?;What reward follows completion?','competence;support;ease','I can\'t handle difficulty;Easy means good',
'Do the hard thing first ("eat the frog");Pair hard tasks with support;Track wins','Strength is often given in the doing, not before it.');
E('sab','Excessive Reassurance Seeking','Repeatedly asking others for reassurance to calm anxiety. It helps briefly, then the doubt returns.',
'anxiety spikes;relief after asking','Are you sure?;Is it okay?;Do you still love me?','asking repeatedly;searching online;checking',
'Doubt>Anxiety>Ask for reassurance>Relief>Doubt returns>Ask again',
'What am I trying to be certain about?;What happens if I tolerate the doubt?;How do others feel after many requests?','certainty;security;connection','I can\'t live with doubt;Others must calm me',
'Delay asking by 30 minutes;Self-reassure first;Agree a limit with loved ones','Trust is resting in what has already been promised, rather than needing to hear it again.');
E('sab','Impulsivity','Acting quickly on urges without pausing to consider consequences.',
'urgency;restlessness;rush','I need it now;Just do it','spending;eating;speaking without thinking;risky choices',
'Urge>Act immediately>Short-term reward>Consequences>Regret>Urge again',
'What urge comes most often?;What feeling sits under it?;What could I do in a 10-second pause?','relief;excitement;control','I can\'t tolerate waiting;Urges must be obeyed',
'Use "STOP": Stop, Take a breath, Observe, Proceed;Delay by 10 minutes;Remove easy access to triggers','Self-control is a fruit that grows, not a switch you flip.');
E('sab','The Habit Loop','Habits run on a loop: cue, routine, reward. Understanding the loop helps change it.',
'automatic actions;craving','I always do this;I need it','repeating the routine without thinking',
'Cue>Craving>Routine>Reward>Brain strengthens the loop>Cue again',
'What cues trigger my habit?;What reward am I really seeking?;What new routine gives the same reward?','reward;relief;comfort','I can\'t change habits;I need this to cope',
'Track cue–routine–reward for one week;Swap the routine, keep the cue and reward;Make the new habit easy and visible','Practices and rhythms (like daily prayer) are habits that shape the heart.');
E('sab','People-Pleasing','Prioritising others\' approval and comfort over your own needs and limits.',
'tension;resentment;exhaustion','I don\'t want to upset anyone;They\'ll be disappointed','saying yes;over-apologising;hiding opinions',
'Request>Fear of disappointing>Say yes>Over-committed>Resentment>Fear of saying no grows',
'Whose approval am I seeking?;What would I say if I weren\'t afraid?;What does pleasing protect me from?','acceptance;safety;belonging','My worth depends on pleasing;Conflict is dangerous',
'Pause before saying yes ("Let me check");Say one small no this week;Notice relief, not just guilt','Serving from love is different from serving from fear.');
E('sab','Self-Pressure','Pushing yourself constantly with "shoulds" and "musts" that leave no room for rest.',
'tension;exhaustion;tight chest','I should be doing more;I\'m not working hard enough','over-scheduling;skipping rest;guilt during breaks',
'Should>Pressure>Push harder>Exhaustion>Fall short>More shoulds',
'Whose voice is behind my "shoulds"?;What would "enough" look like today?;What happens when I rest?','rest;acceptance;balance','Rest is laziness;I must always produce',
'Replace "should" with "could" or "choose";Schedule rest like an appointment;Notice pressure in the body','Sabbath is a rhythm that says your worth is not your output.');
E('sab','The Quick-Relief Cycle','Using fast relief (food, scrolling, shopping, substances) to escape uncomfortable feelings, which then return stronger.',
'craving;temporary calm;guilt after','I deserve this;Just this once;I need to feel better','bingeing;scrolling;spending;drinking',
'Uncomfortable feeling>Quick-relief behaviour>Brief relief>Guilt or consequences>More uncomfortable feelings>Quick relief again',
'What feeling am I trying to escape?;What would help in a slower, healthier way?;What happens after the relief?','comfort;relief;soothing','I can\'t handle discomfort;I need something to cope',
'Pause and name the feeling first;Build a list of slower soothers;Reach out to someone when the urge hits','True comfort is found in presence, not just distraction.');

// 08 BOUNDARIES
E('bnd','Personal Boundaries','Boundaries define what you are responsible for and what you will and won\'t accept. They protect relationships, not end them.',
'resentment when crossed;tension;relief when held','Is it okay to have limits?;Will they still like me?','saying yes, no, or setting limits',
'Boundary crossed>Discomfort>Ignore it or express it>If ignored: resentment>If expressed: respect grows',
'Where do I feel resentful?;What limits do I need?;What fears stop me?','respect;safety;autonomy','Boundaries are selfish;I don\'t have a right to limits',
'Identify one boundary to set;Practise a simple boundary script;Hold it kindly but firmly','Even Jesus withdrew to rest and said no to some requests.');
E('bnd','Difficulty Saying No','Struggling to decline requests, even when you don\'t want to or can\'t.',
'tightness;anxiety;dread','They\'ll be upset;I\'ll seem rude','agreeing;over-committing;avoiding asking',
'Request>Fear of disappointing>Say yes>Over-committed>Resentment>Next request still hard',
'What happens when I say no?;What am I afraid of?;What could I say instead?','acceptance;respect;rest','Saying no damages relationships;My needs don\'t matter',
'Use "Let me get back to you";Practise no in small, low-risk situations;Notice how others respond','"Let your yes be yes and your no be no."');
E('bnd','Guilt About Setting Boundaries','Feeling bad after setting limits, even when they are healthy.',
'heaviness;restless;urge to apologise','I was mean;They\'re hurt because of me','over-explaining;retracting boundaries;apologising',
'Set boundary>Other\'s disappointment>Guilt>Retract or over-explain>Boundary weakens',
'Is the guilt pointing to real harm or just discomfort?;Can I tolerate their disappointment?;What does the boundary protect?','integrity;rest;relationship','Others\' feelings are my responsibility;Limits are unkind',
'Remind yourself: discomfort is not harm;Keep explanations short;Hold the boundary for a week and observe','Healthy limits are part of loving well, not a failure of love.');
E('bnd','Assertive Communication','Expressing your needs and opinions clearly and respectfully, while respecting others.',
'steady breath;grounded posture','I matter and so do you','clear "I" statements;listening;negotiating',
'Need>Express clearly>Other hears>Negotiate>Mutual respect>Confidence grows',
'What do I want to say?;How can I say it respectfully?;What will I do if they disagree?','respect;clarity;connection','Speaking up causes conflict;I don\'t deserve to be heard',
'Use "I feel… when… I need…";Keep eye contact and a calm voice;Practise in low-stakes situations','Speaking truth in love is both honest and kind.');
E('bnd','Passive Communication','Avoiding expressing needs or opinions, often to keep peace or avoid conflict.',
'tension;quiet resentment;tight throat','It doesn\'t matter;They know better','staying silent;agreeing;apologising',
'Need>Stay silent>Need unmet>Resentment>More silence',
'What needs am I not voicing?;What would happen if I spoke?;Who is safe to practise with?','voice;respect;connection','My needs are a burden;Silence keeps me safe',
'Share one preference daily;Use "I would like…";Notice resentment as a sign of unspoken needs','Your voice matters in community.');
E('bnd','Aggressive Communication','Expressing needs or feelings in ways that disregard others\' rights or feelings.',
'heat;tension;loud voice','I\'m right;They need to hear this','yelling;blaming;interrupting;threatening',
'Need>Frustration>Express aggressively>Others defend or withdraw>Need unmet>More frustration',
'What need sits under the aggression?;How do others react?;What would assertiveness look like?','respect;control;being heard','Only force works;Softness is weakness',
'Pause before speaking;Replace "you" with "I";Take a break when heated','Gentleness is strength under control.');
E('bnd','Passive-Aggressive Communication','Expressing anger or disagreement indirectly, through sarcasm, silence or subtle resistance.',
'tension;irritation;tight smile','Fine.;Whatever.;I\'ll show them','sarcasm;silent treatment;procrastination;"forgetting"',
'Frustration>Not expressed directly>Indirect hostility>Confusion and conflict>More frustration',
'What am I really upset about?;What stops me saying it directly?;How could I express it honestly?','respect;voice;fairness','Direct anger is dangerous;They should just know',
'Name the feeling directly;Use one honest sentence;Ask: "Can we talk about something that bothered me?"','Honest conflict is safer than hidden resentment.');
E('bnd','Hard Conversations','Conversations that feel risky because emotions, relationships or outcomes are at stake.',
'racing heart;dry mouth;tension','It will go badly;I\'ll say the wrong thing','avoiding;rehearsing;blurting',
'Need to talk>Fear>Avoid>Issue grows>Explodes or fades into distance',
'What outcome do I hope for?;What do I need to say?;What is the other person likely feeling?','resolution;respect;connection','Conflict ruins relationships;I can\'t handle their reaction',
'Prepare a clear opening line;Choose a calm time and place;Listen to understand before responding','Reconciliation often begins with one courageous conversation.');
E('bnd','Expressing Needs','Asking for what you need clearly, rather than hoping others will guess.',
'tension;vulnerability;relief after','They should know;I don\'t want to be needy','hinting;waiting;resentment',
'Need>Unexpressed>Unmet>Resentment>Need grows',
'What do I need right now?;Who can I ask?;What stops me from asking?','support;connection;understanding','My needs are a burden;Asking is weak',
'Name one need daily;Use "Would you be willing to…";Thank people who meet your needs','"Ask, and it will be given": asking is part of relationship.');
E('bnd','Repair After a Conflict','Reconnecting after a disagreement through apology, understanding and changed behaviour.',
'relief;softness;vulnerability','I want us to be okay;I\'m sorry I hurt you','apologising;listening;reconnecting',
'Conflict>Disconnection>Repair attempt>Understanding>Reconnection>Trust grows',
'What part did I play?;What does the other person need to hear?;How can we prevent this next time?','connection;forgiveness;trust','Apologising is weakness;Conflict ends relationships',
'Use a full apology: name it, own it, repair it;Ask how they experienced it;Agree on one change','Rupture and repair, rather than perfection, build lasting bonds.');
// 09 GRIEF
E('grf','Understanding Grief','Grief is the natural response to losing someone or something important. It comes in waves, not straight lines.',
'heaviness;fatigue;tears;appetite changes','I can\'t believe it;Why did this happen?;I should be over it','crying;withdrawing;keeping busy;talking about them',
'Loss>Waves of grief>Moving between loss-focus and restoration>Meaning slowly rebuilt>Grief softens (not ends)',
'What have I lost?;What helps me in the waves?;How do I want to remember?','comfort;meaning;remembering','Grief should be quick;Moving on means forgetting',
'Allow grief to come and go;Create a ritual of remembrance;Lean on others','"Blessed are those who mourn": grief is honoured, not hurried.');
E('grf','Anticipatory Grief','Grieving a loss before it happens, such as a terminal illness or expected change.',
'heaviness;fatigue;anxiety','I\'m already losing them;I should be grateful they\'re still here','withdrawing;over-caring;preparing',
'Expected loss>Grief before the loss>Guilt about grieving early>Mixed emotions>Loss arrives',
'What am I grieving already?;What do I want to say or do while there is time?;Who supports me?','connection;meaning;preparation','I shouldn\'t grieve yet;I must stay strong',
'Speak the words you want to say;Make memories intentionally;Allow mixed feelings','Lament can begin before loss; it is honest with God and others.');
E('grf','Ambiguous Loss','Loss without clear closure: someone physically present but psychologically absent (e.g. dementia) or absent but not confirmed gone.',
'confusion;fatigue;tension','Are they gone or not?;I don\'t know how to grieve','waiting;searching;freezing',
'Loss without clarity>No clear grieving process>Confusion>Stuck grief',
'What exactly have I lost?;What remains?;How can I hold both?','clarity;support;meaning','I need closure to move on',
'Name both the loss and what remains;Create your own rituals;Join a support group','Living with mystery and hope together is something faith traditions know well.');
E('grf','The End of a Relationship','Grieving a breakup, divorce or the end of a friendship.',
'heaviness;sleeplessness;tears;emptiness','It\'s my fault;I\'ll never love again;What did I do wrong?','checking their profile;isolating;rebound relationships',
'Relationship ends>Grief and longing>Contact or no contact>Pain gradually decreases>Identity rebuilds',
'What did I lose: the person, the future, the identity?;What did I learn?;What do I want next?','comfort;closure;self-worth','I\'m unlovable;I failed',
'Limit contact for healing;Reconnect with friends;Write about what you learned','Endings can be grieved honestly and held within a larger story of hope.');
E('grf','Losing Someone Important','The death of a loved one: one of the deepest human losses.',
'heaviness;exhaustion;physical pain;numbness','I can\'t live without them;Why them?;I should have done more','crying;talking about them;avoiding reminders',
'Death>Shock>Waves of grief>Continuing bonds>Learning to live with the loss',
'What do I miss most?;What would they want for me?;How can I keep them with me?','comfort;remembrance;support','I should be over it by now',
'Talk about them;Keep a memory box or journal;Seek grief support','Hope in resurrection does not cancel grief; it holds it.');
E('grf','Job Loss','Losing a job affects money, identity, routine and relationships.',
'anxiety;fatigue;tension','I\'m worthless;What will people think?;I\'ll never find another job','withdrawing;over-applying;avoiding',
'Job loss>Shock and shame>Identity questions>Search>Rebuilding',
'What did I lose besides income?;What strengths do I still have?;What support do I need?','security;purpose;dignity','My job is my worth',
'Keep a daily routine;Reach out to your network;Separate identity from job title','Your calling is larger than any job.');
E('grf','Moving to a New City','Leaving familiar people, places and routines for something new.',
'tiredness;homesickness;anxiety','I don\'t belong here;I miss home','isolating;over-scheduling;constantly calling home',
'Move>Loss of familiar>Loneliness>Exploration>New belonging',
'What do I miss most?;What could I explore?;Where could I find community?','belonging;familiarity;connection','I\'ll never fit in',
'Join one regular group;Explore one new place weekly;Keep some home rituals','Being a "stranger" is an ancient experience; hospitality and community are its answer.');
E('grf','Life Transitions','Changes such as marriage, parenthood, retirement or ageing that bring loss as well as gain.',
'restlessness;fatigue;mixed feelings','Who am I now?;I miss how things were','clinging to old routines;rushing ahead',
'Ending>Neutral zone (in-between)>New beginning',
'What is ending?;What is beginning?;What do I need in the in-between?','stability;identity;meaning','Change is bad;I should adjust quickly',
'Name what you\'re leaving and what you\'re entering;Allow time in the "in-between";Create a ritual for the transition','Seasons change; there is a time for every purpose.');
E('grf','Grief Triggers','Reminders that bring grief back suddenly: dates, songs, places, smells.',
'sudden heaviness;tears;tightness','Why now?;I thought I was doing better','avoiding reminders;crying unexpectedly',
'Reminder>Grief wave>Surprise or shame>Wave passes',
'What are my grief triggers?;How can I prepare for anniversaries?;What helps in a wave?','comfort;understanding;remembering','Grief waves mean I\'m not healing',
'Mark important dates on the calendar with a plan;Tell people when anniversaries come;Let waves pass without judgment','Remembering together can make triggers moments of connection.');
E('grf','Rebuilding Meaning After Loss','Finding purpose and direction after a significant loss.',
'emptiness;slowly returning energy','What\'s the point?;How do I go on?','seeking new purpose;honouring the loss',
'Loss>Meaning shattered>Questions and searching>New meaning found>Integration',
'What has this loss taught me?;How do I want to honour it?;What gives life meaning now?','purpose;connection;hope','Life can\'t be meaningful again',
'Find a way to honour the loss (cause, ritual, project);Reconnect with values;Share your story','Hope is not denial of loss but a story big enough to hold it.');

// 10 BODY
E('bod','Body Image','How you see, think and feel about your body.',
'tension;checking;discomfort','I hate how I look;I\'d be happy if I looked different','checking mirrors;avoiding photos;comparing',
'Body thought>Negative feeling>Check or avoid>Focus on flaws>Feel worse',
'What do I say about my body?;Where did these messages come from?;What does my body do for me?','acceptance;dignity;comfort','My worth depends on my appearance',
'Notice body talk and soften it;Limit appearance-focused media;Thank your body for what it does','Your body is not an ornament; it is part of how you are made and loved.');
E('bod','Body Shame','Feeling that your body is defective, disgusting or wrong.',
'hiding;tension;discomfort','I\'m disgusting;No one could find me attractive','hiding body;avoiding intimacy;covering up',
'Body exposure>Shame>Hide>Isolation>Shame grows',
'What part of my body do I feel ashamed of?;Where did I learn this?;What would kindness to my body look like?','acceptance;dignity;safety','My body is unacceptable',
'Wear something comfortable;Practise neutral body language ("This is my arm");Talk with a therapist','The body is honoured, not shamed, in the story of creation.');
E('bod','Physical Comparison','Comparing your body with others\'.',
'tension;sinking feeling','They look better;I should look like that','comparing;checking;dieting',
'See others>Compare>Feel inferior>Change or hide>Compare again',
'Who do I compare my body with?;What does that comparison give me?;What would I value instead?','acceptance;belonging;dignity','My body should look a certain way',
'Unfollow comparison-triggering accounts;Focus on what your body does;Notice and pause comparisons','Diversity in bodies reflects a creative design, not a mistake.');
E('bod','Your Relationship With Your Body','How you treat, care for and listen to your body.',
'tension or ease;comfort or discomfort','My body is my enemy / friend;I ignore my body','neglecting;pushing;nurturing',
'Body signal>Ignore or listen>Neglect or care>Body responds',
'How do I treat my body?;What signals do I ignore?;What would caring for my body look like?','care;rest;comfort','My body is a tool, nothing more',
'Check in with your body three times a day;Respond to hunger, thirst and tiredness;Practise gentle movement','Caring for the body is part of stewardship of a gift.');
E('bod','Stress & Body Sensations','How stress shows up in the body: tension, pain, stomach upset, headaches.',
'tight shoulders;headaches;stomach upset;jaw tension','My body is falling apart;Something is wrong with me','ignoring;worrying;over-checking',
'Stress>Body tension>Physical symptoms>Worry>More stress',
'Where do I hold stress?;What helps my body release it?;What signals do I miss?','rest;release;care','Physical symptoms mean something serious',
'Progressive muscle relaxation;Gentle stretching;See a doctor to rule out medical issues','The body keeps the score, and the body can also help heal.');
E('bod','Reading the Body\'s Signals','Learning to notice and interpret body sensations (interoception) as information about emotions and needs.',
'subtle sensations;awareness','What am I feeling?;What does my body need?','checking in;pausing;responding',
'Sensation>Notice>Interpret>Respond>Better attunement',
'What sensations do I notice right now?;What emotion might they point to?;What does my body need?','awareness;care;regulation','Body sensations don\'t matter',
'Daily body scan;Name sensations without judgment;Link sensations to emotions','Paying attention is a form of love, toward others and toward yourself.');
E('bod','Tension & Being on Alert','A body that stays tense and ready for danger even when no threat is present.',
'tight shoulders;jaw clenching;shallow breathing','I can\'t relax;Something is wrong','bracing;scanning;fidgeting',
'Stress>Bracing>Chronic tension>Pain and fatigue>Harder to relax',
'Where do I hold tension?;What helps me let go?;What threat is my body preparing for?','safety;rest;release','Relaxing is dangerous',
'Release one muscle group at a time;Shake out tension;Breathe into tight areas','"Come to me, all who are weary": rest is offered, not demanded.');
E('bod','Intimacy & Vulnerability','Closeness that involves being emotionally and physically open with another person.',
'warmth;nervousness;openness','What if they see the real me?;I want closeness but I\'m scared','opening up or pulling away',
'Desire closeness>Vulnerability>Fear or trust>Connection or distance',
'What makes intimacy feel safe or unsafe?;What do I need from a partner?;What am I afraid will happen?','safety;trust;closeness','Vulnerability leads to hurt',
'Share slowly at a safe pace;Discuss needs and fears together;Practise non-sexual closeness too','Intimacy reflects a design for deep union and mutual knowing.');
E('bod','Shame in Intimacy','Feeling ashamed about your body, desires or experiences in intimate relationships.',
'tension;freezing;hiding','I\'m wrong;I\'m disgusting;They\'ll judge me','avoiding intimacy;pretending;disconnecting',
'Intimacy>Shame>Hide or disconnect>Missed closeness>More shame',
'Where did I learn shame around intimacy?;What would safety feel like?;Who can I talk with about this?','acceptance;safety;freedom','Desire is shameful',
'Talk with a therapist;Communicate needs and fears with your partner;Learn healthy views of sexuality','Many faith traditions celebrate the goodness of intimacy within safety and covenant.');
E('bod','The Body–Emotion Connection','Emotions are felt in the body; the body influences emotions.',
'heat (anger);heaviness (sadness);butterflies (anxiety)','Is this feeling or sensation?','noticing;responding',
'Emotion>Body sensation>Notice>Name>Regulate',
'Where do I feel emotions in my body?;What body practices help me regulate?;What does my body tell me today?','awareness;regulation;connection','Emotions are only in the mind',
'Map emotions on a body outline;Move to shift mood;Breathe into emotion','You are a whole person: body, mind and spirit, not parts at war.');

// 11 WORK
E('wrk','Burnout','A state of exhaustion, cynicism and reduced effectiveness caused by prolonged stress.',
'exhaustion;headaches;sleep problems;frequent illness','I can\'t keep going;What\'s the point?;Nothing I do matters','withdrawing;cynicism;mistakes;over-working',
'Chronic stress>Over-work>Exhaustion>Cynicism>Reduced performance>More pressure',
'What drains me most?;What restores me?;What needs to change?','rest;meaning;balance','I can\'t stop;Rest is weakness',
'Take real breaks;Talk to your manager about workload;Reconnect with meaning','Sabbath rest is a rhythm built into creation.');
E('wrk','Guilt About Resting','Feeling bad or lazy when you take time to rest.',
'restlessness;tension during breaks','I should be doing something;Rest is lazy','working during breaks;checking email;feeling guilty',
'Rest>Guilt>Work again>Exhaustion>Rest needed>Guilt again',
'Where did I learn rest was bad?;What happens when I rest?;What does rest give me?','rest;permission;balance','My worth = my productivity',
'Schedule guilt-free rest;Notice guilt and let it pass;Remember rest improves work','Rest is a gift and a command, not a reward for productivity.');
E('wrk','Overworking','Working beyond healthy limits, often to cope with anxiety, worth or expectations.',
'fatigue;tension;poor sleep','If I stop, I\'ll fail;I have to prove myself','long hours;skipping meals;neglecting relationships',
'Pressure>Overwork>Short-term success>Exhaustion>Pressure grows',
'What drives my overwork?;What am I neglecting?;What would balance look like?','balance;rest;worth','Hard work proves my value',
'Set work hours and stick to them;Protect one evening a week;Notice what overwork is avoiding','Work is a good gift that becomes harmful when it becomes an identity.');
E('wrk','Boundaries at Work','Setting limits on time, tasks and availability at work.',
'tension;resentment;fatigue','I can\'t say no;They\'ll think I\'m not committed','answering after hours;taking extra tasks',
'Request>Fear>Say yes>Over-committed>Burnout',
'What boundaries do I need?;What do I fear?;How could I say it professionally?','balance;respect;rest','Good employees never say no',
'Communicate availability clearly;Use "I can do X by Y";Prioritise with your manager','Healthy limits allow sustainable service.');
E('wrk','Professional Impostor Syndrome','Feeling like a fraud at work, despite evidence of skill.',
'anxiety before reviews;tension','They\'ll find out I don\'t know;I got lucky','over-preparing;avoiding promotion',
'New role>Fraud feeling>Overwork>Success>Credit to luck>Fraud feeling stays',
'What evidence do I have of competence?;What would a mentor say?;What is "good enough" here?','recognition;security;confidence','I must know everything',
'Keep an achievements file;Ask for feedback;Share feelings with colleagues','Gifts are given to be used, not hidden.');
E('wrk','Fear of Charging What You\'re Worth','Struggling to ask for fair pay or set rates.',
'anxiety;tension when discussing money','I\'m not worth it;They\'ll say no','undercharging;discounting;not asking',
'Price discussion>Fear>Undercharge>Resentment>Fear grows',
'What do I believe about my value?;What does fair look like?;What would I advise a friend?','worth;fairness;security','Asking for money is greedy',
'Research market rates;Practise stating your rate;Notice and challenge "not worth it" thoughts','"The worker deserves their wages."');
E('wrk','Money Beliefs','The beliefs you hold about money, often learned in childhood.',
'tension;anxiety;guilt','Money is evil;There\'s never enough;Rich people are bad','overspending;hoarding;avoiding finances',
'Belief>Money behaviour>Outcome>Belief confirmed',
'What did my family teach me about money?;Which beliefs help or hurt?;What do I want to believe?','security;freedom;generosity','Money is scarce;Money is shameful',
'Write your money story;Notice money emotions;Make a simple budget','Stewardship and generosity grow from trust, not fear.');
E('wrk','Financial Anxiety','Worry and stress about money, debt or financial security.',
'tension;sleeplessness;stomach upset','I\'ll lose everything;I can\'t cope','avoiding bills;over-checking accounts',
'Money worry>Avoid or over-check>More anxiety>Worse decisions',
'What specifically worries me?;What can I control?;Who could help me plan?','security;control;support','I\'m bad with money',
'Make a simple budget;Talk to a financial advisor;Take one small financial step','"Do not be anxious about tomorrow": trust can coexist with planning.');
E('wrk','Career Transition','Changing jobs, careers or roles, with excitement and uncertainty.',
'restlessness;anxiety;excitement','What if I fail?;Am I making a mistake?','researching;delaying;planning',
'Desire for change>Fear>Exploration>Decision>Transition>New identity',
'What is drawing me to change?;What am I afraid of?;What small step can I take?','purpose;security;growth','Changing careers is risky',
'Talk to people in your desired field;Make a transition plan;Take a small experimental step','Callings can change across seasons of life.');
E('wrk','Purpose & Professional Values','Finding meaning and alignment between work and personal values.',
'energy when aligned;fatigue when not','What\'s the point?;Does my work matter?','seeking meaningful work;volunteering',
'Values>Work alignment>Meaning>Energy>Growth',
'What do I value most in work?;Where do I feel most alive?;How can I align more?','meaning;contribution;growth','Work is just for money',
'List your top five values;Rate how your job aligns with each;Find one way to add meaning','Work can be worship when done with love and purpose.');

// 12 SELF-KNOWLEDGE
E('kno','Emotional Needs','Core needs such as safety, connection, autonomy, competence and meaning.',
'restlessness when unmet;peace when met','I need… but I shouldn\'t;Needs are weakness','seeking, hiding or demanding needs',
'Need>Met or unmet>Feelings>Behaviour>Needs recognised or ignored',
'What are my core needs?;Which are unmet?;How can I meet them?','safety;connection;autonomy;competence;meaning','Needs are selfish',
'List your core needs;Identify one unmet need;Make a plan to meet it','Needs are part of being human; even Jesus asked for companionship in Gethsemane.');
E('kno','Personal Values','What matters most to you: your guiding principles.',
'alignment feels peaceful;misalignment feels uneasy','What do I care about?','choosing, sacrificing, investing',
'Values>Choices>Actions>Life direction',
'What are my top values?;Where do I live them?;Where do I not?','integrity;meaning;direction','Values are fixed',
'Pick your top five values;Rate alignment;Choose one value-based action','Values rooted in love give direction beyond circumstances.');
E('kno','Thought → Emotion → Behaviour','Thoughts influence emotions, which influence behaviours, which influence thoughts: the CBT triangle.',
'body responses follow thoughts','Automatic thoughts','actions shaped by thoughts and feelings',
'Situation>Thought>Emotion>Behaviour>Outcome>New thought',
'What thought came before the feeling?;Is it accurate?;What would a different thought lead to?','awareness;choice;change','Thoughts are facts',
'Use a thought record;Challenge one thought daily;Try an alternative behaviour','"Be transformed by the renewing of your mind."');
E('kno','Identifying Triggers','Learning what situations, people or thoughts set off strong emotional reactions.',
'sudden reactions;surges','Why did I react like that?','overreacting;avoiding',
'Trigger>Reaction>Consequence>Reflection>Understanding',
'What are my most common triggers?;What do they have in common?;How can I prepare?','awareness;safety;control','My reactions are random',
'Keep a trigger diary;Look for patterns;Create a coping plan','Self-awareness can be a spiritual practice of honesty.');
E('kno','Support Network','The people and resources that help you cope and thrive.',
'relief when supported;isolation when not','Who can I turn to?;I don\'t want to burden anyone','reaching out;isolating',
'Need>Reach out>Support received>Trust grows>Easier to reach out again',
'Who supports me emotionally?;practically?;spiritually?;Where are the gaps?','connection;support;belonging','I should handle everything alone',
'Draw your support map (inner, middle, outer circles);Strengthen one connection;Add one new source','We are made for community: "two are better than one."');
E('kno','Coping Strategies','The ways you handle stress, emotions and challenges, healthy or unhealthy.',
'relief or tension depending on strategy','I need something to cope','exercising;talking;numbing;avoiding',
'Stress>Coping strategy>Outcome>Reinforcement',
'What coping strategies do I use?;Which help long-term?;Which only help short-term?','relief;regulation;support','I can\'t cope',
'List helpful and unhelpful strategies;Swap one unhelpful for one helpful;Build a coping toolbox','Spiritual practices (prayer, worship, Scripture) can be part of a healthy toolbox.');
E('kno','Inner Resources','Strengths, qualities and memories you can draw on when life is hard.',
'groundedness;strength','I\'ve survived before;I have strengths','drawing on strengths;remembering',
'Challenge>Draw on inner resources>Cope>Resources strengthened',
'What strengths have helped me before?;What memories bring me strength?;Who believes in me?','strength;confidence;resilience','I have nothing to offer',
'List your strengths;Keep a "strength memory" journal;Ask others what they see in you','Strength is also received: "My grace is sufficient for you."');
E('kno','Therapy Goals','What you hope to achieve or change through therapy.',
'motivation;hope;uncertainty','What do I want to change?','setting goals;tracking progress',
'Goal>Work>Progress>Review>New goals',
'What do I want to be different?;How will I know therapy is working?;What small step can I take?','growth;change;healing','Therapy should fix everything',
'Write three goals;Make them specific;Review them regularly with your therapist','Healing is a journey, often slow, always worth it.');
E('kno','Recognising Progress','Noticing the changes and growth you\'ve made, however small.',
'pride;relief;hope','I\'m getting better;I\'ve come a long way','celebrating;reflecting',
'Effort>Change>Notice>Celebrate>Motivation',
'What has changed since I started?;What am I proud of?;What would I tell my past self?','encouragement;hope;recognition','Progress must be big to count',
'Keep a progress journal;Compare to your past self;Celebrate small wins','"He who began a good work in you will carry it on to completion."');
E('kno','Personal Continuity Plan','A plan for maintaining progress and handling setbacks after therapy or a period of growth.',
'confidence;caution','What if I slip back?;I have tools now','planning;practising skills',
'Progress>Plan>Setback>Use plan>Recovery>Growth',
'What warning signs should I watch for?;What will I do if they appear?;Who will help?','stability;support;growth','Setbacks mean failure',
'Write a relapse prevention plan;List warning signs and actions;Share it with a support person','Grace for setbacks makes growth sustainable.');

// 13 RELATIONAL & FAITH LENS
E('fth','Being Known and Loved','The deepest relational need: to be fully seen, including our flaws, and still loved.',
'softening;tears of relief;settledness','If they knew, they\'d leave;Could I really be loved like this?','hiding;performing;slowly opening',
'Hide true self>Loved only for the mask>Feel unknown>Risk being seen>Received with love>Shame loosens',
'Who knows me best?;What part of me feels least lovable?;What would change if I believed I was fully known and loved?','being seen;acceptance;belonging','Love is earned by hiding flaws;If seen, I will be rejected',
'Share one hidden part of your story with a safe person;Meditate on being "fearfully and wonderfully made";Notice moments of being received','Psalm 139 describes being fully searched and known, and still held.');
E('fth','Grace vs. Shame','Shame says "I am bad." Grace says "you are loved before you change." Grace makes change possible.',
'shrinking (shame) vs. opening (grace)','I must fix myself first;I am loved as I am','hiding vs. coming into the light',
'Failure>Shame or grace?>Shame: hide and repeat>Grace: confess and receive>Change from security',
'Where do I live under shame?;What would grace say to me about my latest failure?;Where have I seen grace in action?','forgiveness;acceptance;freedom','Grace is too good to be true;I must earn forgiveness',
'Write down a shame message and the grace response;Receive a kind word without arguing;Practise confession with a trusted person','"There is now no condemnation": grace removes shame\'s power.');
E('fth','Lament: Honest Sorrow','Lament is bringing pain, protest and questions honestly to God and others, rather than hiding them.',
'release;tears;lightness after','Why, God?;How long?;This hurts','journaling;praying honestly;crying;speaking pain',
'Pain>Hide or lament?>Hiding: pain festers>Lament: pain expressed>Comfort and hope>Trust deepens',
'What pain have I not spoken?;What would I say if I could say anything?;Who could lament with me?','honesty;comfort;hope','Faith means always being positive;Questions are disloyal',
'Write your own lament (address, complaint, request, trust);Read a lament psalm (e.g. Psalm 13);Lament with a friend','A third of the Psalms are laments: honesty is part of faith.');
E('fth','Forgiveness (and What It Isn\'t)','Forgiveness is releasing the debt someone owes you. It is not excusing, forgetting or necessarily reconciling.',
'release;lightness;still some pain','I can\'t forgive;If I forgive, it means it was okay','holding resentment;releasing it;setting boundaries',
'Hurt>Resentment>Acknowledge harm fully>Choose to release the debt>Freedom grows>Reconciliation only if trust is rebuilt',
'What harm needs naming before forgiveness?;What would forgiveness free me from?;Is reconciliation safe here?','justice;freedom;healing','Forgiving means forgetting;Forgiveness means trusting again',
'Name the hurt fully first;Write a forgiveness statement (not a letter to send);Keep boundaries where trust is broken','Forgiveness is often a process, repeated, not a one-time feeling.');
E('fth','Repair & Reconciliation','Restoring a relationship after harm through confession, listening, changed behaviour and rebuilt trust.',
'nervousness;hope;relief','Can we be okay again?;I want to make this right','apologising;listening;showing change',
'Harm>Confession and ownership>Listening to impact>Changed behaviour>Trust rebuilt over time>Reconciliation',
'What would genuine repair look like here?;What is my part to own?;Is the other person safe for reconciliation?','connection;trust;peace','Reconciliation must be immediate;Saying sorry is enough',
'Own your part without excuses;Ask "how did this affect you?";Let trust be rebuilt at the other person\'s pace','"Be reconciled": the gospel is a story of repair.');
E('fth','Belonging','The sense of being accepted and part of a community, not just tolerated.',
'warmth;relaxation;at-home feeling','I belong here / I\'m an outsider','participating;withdrawing;fitting in vs. belonging',
'Desire to belong>Risk showing up>Accepted>Belonging grows>Contribute>Belonging deepens',
'Where do I feel I truly belong?;Where do I just fit in?;What would help me belong more?','acceptance;community;home','I must earn my place;I am always an outsider',
'Join a small group;Show up consistently;Offer hospitality to someone else','Faith communities at their best are families where belonging precedes behaving.');
E('fth','Rest & Sabbath','A rhythm of ceasing work to rest, delight and remember that your worth is not your output.',
'unwinding;restlessness at first;then peace','I can\'t afford to stop;Rest is lazy','working constantly;learning to stop;enjoying',
'Constant work>Exhaustion>Choose to stop>Restlessness, then rest>Restored>Work from rest, not for rest',
'What makes rest hard for me?;What truly restores me?;What would a weekly Sabbath look like?','rest;delight;trust','My worth is my productivity;If I stop, everything falls apart',
'Plan a 24-hour (or half-day) rest each week;Include delight, not just recovery;Notice guilt and gently let it go','Sabbath is a rhythm of trust: the world keeps turning when you rest.');
E('fth','Identity as Beloved','Rooting your sense of self in being loved rather than in achievement, appearance or approval.',
'settledness;freedom;less striving','I am loved;I don\'t have to prove myself','serving from fullness;less people-pleasing',
'Identity in performance>Anxiety and striving>Receive identity as beloved>Security>Freedom to serve and risk',
'Where do I find my identity?;What would change if I believed I was beloved?;What blocks me from receiving that?','worth;security;freedom','I am what I do;Love must be earned',
'Meditate on being called "beloved";Write "I am…" statements rooted in love;Notice where you strive for identity','At Jesus\' baptism, "beloved" came before any ministry: identity before activity.');
E('fth','Hope After Loss','Hope that holds grief honestly while trusting a larger story.',
'heaviness and lightness together','Nothing will be good again;Maybe there\'s more to the story','grieving;remembering;slowly re-engaging',
'Loss>Despair>Lament>Glimpses of hope>Grief and hope held together>New life',
'What hope do I hold?;What helps me hope?;Who holds hope for me when I can\'t?','hope;meaning;comfort','Hope denies grief;There is no future',
'Write a hope statement;Notice small signs of life;Let others hold hope when you can\'t','"We do not grieve as those who have no hope."');
E('fth','Spiritual Bypassing','Using spiritual ideas to avoid dealing with emotions, pain or problems (e.g. "just pray more", "don\'t be angry").',
'numbness;pressure to be fine','I shouldn\'t feel this as a believer;Just have more faith','suppressing feelings;quoting verses to avoid pain;rushing forgiveness',
'Painful feeling>Spiritual cover-up>Feeling suppressed>Feeling returns stronger>More cover-up',
'What feelings do I think faith forbids?;Where have I used spiritual words to avoid pain?;What would honest faith look like?','honesty;integration;healing','Faith means never struggling;Emotions are unspiritual',
'Name feelings honestly before praying about them;Read lament psalms;Talk to a faith-informed therapist','Jesus wept, felt anguish and expressed anger; honest emotion is not a lack of faith.');
// ===== BRAIN & NEUROPLASTICITY =====
function N(id,t,sub,fig,hl,steps,loop,keys,tr,rl){
  MAPS.push({type:'N',nid:id,area:'neu',t,u:sub,fig,hl:hl?hl.split(','):[],steps:steps.split('>').map(x=>x.trim()),loop,keys,tr:sp(tr),rl});
}
N('n01','The Neuron: Your Brain\'s Messenger','About 86 billion neurons pass signals as tiny electrical pulses and chemical messages. Every thought, feeling and habit is a pattern of neurons firing together.','neuron','',
'Dendrites receive signals>Cell body adds them up>Threshold reached: it fires>Signal races down the axon>Chemical message released at the synapse',false,
[['Dendrites','Branches that listen for incoming signals'],['Axon','The long cable that carries the signal out'],['Myelin','Fatty insulation that speeds the signal'],['Action potential','The all-or-nothing electrical pulse']],
'Picture one thought you have often as a chain of neurons lighting up;Remember: every repeat makes that chain a little easier to fire','You are wired for connection at the smallest scale: neurons only work in relationship with other neurons.');
N('n02','The Synapse: Where Learning Happens','The synapse is the tiny gap between neurons. Learning changes how strongly signals cross it. This is where rewiring physically happens.','synapse','',
'Signal arrives>Neurotransmitters released>They cross the gap>Receptors catch them>Next neuron fires (or not)>Repeated use strengthens the link',false,
[['Neurotransmitter','Chemical messenger (e.g. dopamine, serotonin, GABA)'],['Receptor','The "lock" the messenger fits into'],['Synaptic strength','How easily one neuron triggers the next'],['LTP','Long-term potentiation: the lasting strengthening of a synapse through use']],
'Notice that "practice" literally means strengthening synapses;Kind repetition beats harsh intensity for building new links','Small, faithful repetitions shape us more than rare dramatic moments.');
N('n03','Neuroplasticity: The Brain That Changes','Neuroplasticity is the brain\'s lifelong ability to reorganise itself: forming new connections, strengthening used ones and weakening unused ones.','brain','pfc,hippo',
'Experience or practice>Neurons fire together>Connections strengthen>New pattern forms>Pattern becomes easier>New default',true,
[['Experience-dependent','The brain changes in response to what you repeatedly do, think and feel'],['Lifelong','Plasticity continues in adulthood, though change needs repetition'],['Both ways','Plasticity can strengthen healthy or unhealthy patterns'],['Attention','Focused attention and emotion boost how much change happens']],
'Choose one small new response to practise daily;Pair it with attention and a little positive feeling;Expect it to feel awkward before it feels natural','Hope has a biology: change is built into how you were made.');
N('n04','Fire Together, Wire Together','When neurons fire at the same time repeatedly, the connection between them strengthens (Hebb\'s rule). This links situations to feelings and habits.','synapse','',
'Two things happen together>Neurons fire together>Link strengthens>One now triggers the other>Automatic association',true,
[['Hebbian learning','"Cells that fire together wire together" (Donald Hebb, 1949)'],['Association','A cue can trigger a feeling because they were paired before'],['Conditioning','How fears and comforts get attached to places, people and sounds'],['Re-pairing','Pairing the cue with safety builds a new competing link']],
'Name one cue that triggers an old feeling;Deliberately pair that cue with something calming;Repeat many times','Safe relationships "wire" closeness with calm instead of closeness with danger.');
N('n05','Use It or Lose It: Pruning','The brain trims connections it doesn\'t use. This is why unused skills fade and why stepping away from old habits slowly weakens them.','brain','',
'Pathway not used>Signals become rarer>Connection weakens>Pruned or quietened>Old pattern loses its pull',false,
[['Synaptic pruning','Removing weak or unused connections to make the brain efficient'],['Adolescence','A major pruning period, which is why teen years are so formative'],['Extinction','Old learning is suppressed by new learning, not erased; it can return under stress'],['Spontaneous recovery','Why old habits sometimes reappear, and why that is normal']],
'Expect old habits to return under stress, without shame;Keep feeding the new pathway instead of fighting the old','Setbacks are not proof of failure; they are the old path still being there.');
N('n06','Myelin: Practice Makes Pathways Faster','Myelin is insulation that wraps frequently used nerve fibres, making signals up to 100 times faster. Repetition literally upgrades the road.','neuron','',
'Pathway used repeatedly>Myelin wraps the axon>Signals travel faster>Skill feels automatic>Less effort needed',false,
[['Myelination','Insulating axons; continues into the mid-20s and beyond'],['Automaticity','When a skill no longer needs conscious effort'],['Deliberate practice','Focused, repeated practice just beyond current ability'],['Sleep','Consolidates practice into lasting change']],
'Practise a calming skill when calm, so it is ready when stressed;Short daily practice beats long occasional sessions','Spiritual disciplines work on the same principle: repetition forms character.');
N('n07','The Brain Map: Key Regions','A simple guide to brain areas most involved in emotion, stress, memory and self-control.','brain','pfc,acc,insula,amyg,hippo,hypo,thal,bstem,cereb',
'Brainstem keeps you alive>Limbic areas tag what matters>Cortex thinks, plans and reflects>Regions talk constantly as networks',false,
[['Prefrontal cortex','Planning, choice, calming emotion, empathy'],['Amygdala','Threat and relevance detector; the alarm'],['Hippocampus','Context and memory: "when and where"'],['Insula','Reads body signals; gut feelings'],['Hypothalamus','Starts the hormonal stress response'],['Anterior cingulate','Notices conflict and pain, including social pain']],
'Use this map to name what is happening ("my alarm is loud right now");Remember: brain regions work as networks, not isolated boxes','Naming what is happening in us is an act of understanding, not judgment.');
N('n08','The Alarm and the Pilot: Amygdala & Prefrontal Cortex','The amygdala reacts fast to possible threats. The prefrontal cortex reflects, reasons and can calm the alarm, but only when it stays online.','brain','amyg,pfc',
'Cue detected>Amygdala alarm (fast)>Body mobilises>PFC checks the facts (slower)>Alarm calmed or escalated',false,
[['Low road','Fast, rough threat detection via the amygdala'],['High road','Slower, accurate appraisal via the cortex'],['Top-down regulation','PFC calming the alarm through reappraisal and naming'],['Bottom-up regulation','Calming the body (breath, movement) so the PFC can come back online']],
'Name it to tame it: say "I feel ___";Calm the body first when the alarm is very loud;Then reason through the facts','A calm, trusted voice beside us helps the "pilot" stay at the controls.');
N('n09','Flipping Your Lid: The Hand Model','Dan Siegel\'s hand model: make a fist with the thumb tucked in. The thumb is the emotional brain; fingers are the thinking brain. Under stress, the fingers lift: we "flip our lid."','hand','pfc,amyg',
'Stress builds>Emotional brain flares>Thinking brain goes offline>Reactive behaviour>Calm down>Lid closes again>Repair',true,
[['Wrist','Brainstem: survival, arousal'],['Thumb','Limbic area: emotion, memory, alarm'],['Fingers','Cortex, especially the prefrontal cortex: reflection and choice'],['Flipped lid','When the cortex is offline and reactions take over']],
'Notice your early signs of lid-flipping;Take a break and calm the body before talking;Return to repair once the lid is down','Repair after a "flipped lid" models grace for children and partners alike.');
N('n10','The Stress Response: The HPA Axis','When stress hits, the hypothalamus signals the pituitary, which signals the adrenal glands to release cortisol. Short-term it helps; long-term it wears you down.','brain','hypo,amyg,hippo,pfc',
'Stressor>Hypothalamus (CRH)>Pituitary (ACTH)>Adrenal glands release cortisol>Energy mobilised>Cortisol tells brain to switch off the response',true,
[['Acute stress','Short bursts that can sharpen focus'],['Chronic stress','Constant cortisol that impairs memory, sleep and immunity'],['Allostatic load','The wear and tear from long-term stress'],['Recovery','Sleep, movement and connection help reset the system']],
'Build daily recovery moments, not just weekend breaks;Move your body to burn off stress hormones;Protect sleep','The rhythm of work and rest is built into how our bodies function.');
N('n11','The Nervous System Ladder (Polyvagal Map)','A popular clinical map of three autonomic states: safe and social (top), fight-or-flight (middle) and shutdown (bottom). Some physiological claims are debated, but the map is useful for noticing your state.','ladder','bstem,insula',
'Safe and connected>Sense danger>Mobilise: fight or flight>If overwhelmed: shutdown>Cues of safety>Climb back up',true,
[['Ventral (top)','Calm, curious, connected; social engagement'],['Sympathetic (middle)','Mobilised; anxious, angry, restless'],['Dorsal (bottom)','Collapse, numbness, disconnection'],['Neuroception','The body\'s automatic scanning for safety or danger']],
'Ask: "Where am I on the ladder right now?";Use cues of safety (warm voice, eye contact, slow breath);Climb one rung at a time','Safe faces and voices are powerful regulators: we co-regulate through relationship.');
N('n12','The Reward Loop: Dopamine & Habits','Dopamine drives wanting and learning. It surges when we expect a reward, teaching the brain to repeat the behaviour.','brain','vta,stri,pfc',
'Cue>Dopamine spike (wanting)>Action>Reward (or not)>Brain updates prediction>Habit strengthens',true,
[['Dopamine','Signals "this is worth pursuing", more about wanting than liking'],['Prediction error','Surprise rewards create bigger learning'],['Striatum','Stores habits and routines'],['Tolerance','More stimulation needed for the same effect']],
'Notice which cues trigger wanting;Add small rewards to new healthy habits;Reduce easy access to quick-reward triggers','Delight in simple gifts (food, nature, friendship) retrains what we find rewarding.');
N('n13','Memory & Emotion: Implicit and Explicit','Explicit memories are facts and stories you can recall. Implicit memories are felt reactions and body memories that run without awareness.','brain','hippo,amyg',
'Experience>Amygdala tags emotional weight>Hippocampus adds context>Stored as explicit + implicit>Cue reactivates feeling',false,
[['Explicit memory','"I remember when…": needs the hippocampus'],['Implicit memory','Feelings, body reactions, expectations without a story'],['Under stress','The hippocampus works less well, so memories may be fragmented'],['Integration','Linking felt memory to story helps the past feel past']],
'When a reaction seems too big, ask "how old does this feel?";Write the story with a clear beginning, middle and end','Telling our story to someone who listens helps memory become integrated.');
N('n14','Memory Reconsolidation: Updating Old Learning','When an old emotional memory is activated and then met with a contradicting experience, the brain can update the original learning, not just override it.','synapse','hippo,amyg',
'Old emotional learning activated>Fresh experience contradicts it>Memory becomes briefly changeable>Updated learning stored>Old trigger loses its charge',false,
[['Reconsolidation','Re-storing a memory after it has been reactivated'],['Mismatch','The new experience must clearly contradict the old expectation'],['Window','A period of several hours after activation'],['Felt change','Less reactivity without effortful coping']],
'Recall the old belief while feeling it;Then hold a clear contradicting experience in mind;Repeat with a therapist for deep work','Experiencing acceptance exactly where we expected rejection can rewrite old expectations.');
N('n15','The Default Mode Network & Rumination','When the mind is not focused on a task, the default mode network activates: daydreaming, self-reflection and, too often, rumination.','brain','pfc,pariet,hippo',
'Mind at rest>DMN activates>Self-focused thinking>Negative loop (rumination)>Mood drops>DMN more active',true,
[['DMN','Network active during mind-wandering and self-reflection'],['Rumination','Repetitive negative self-focus linked to an overactive DMN'],['Task-positive network','Activated by focused attention; it quietens the DMN'],['Mindfulness','Linked with better regulation of DMN activity']],
'Notice mind-wandering and gently return to the present;Engage hands or senses (walk, cook, garden);Practise short mindful attention','Contemplative prayer and attention practices train the wandering mind toward presence.');
N('n16','Interoception: The Insula and Body Signals','Interoception is sensing the inside of your body: heartbeat, breath, hunger, tension. The insula maps these signals and links them to emotion.','brain','insula,acc',
'Body sends signals>Insula maps them>Brain predicts what they mean>Emotion is constructed>Action',false,
[['Interoception','Perception of internal body states'],['Insula','Integrates body signals with emotion and awareness'],['Body budget','The brain\'s management of energy and resources'],['Emotional granularity','Finer emotion words lead to better regulation']],
'Do a 2-minute body scan;Name sensations before emotions;Learn more specific feeling words','Paying attention to the body honours it as part of the whole person.');
N('n17','Rewiring Step by Step','A practical loop for changing a pattern: notice, name, pause, choose, repeat, and let sleep consolidate it.','brain','pfc,stri,hippo',
'Notice the old pattern>Name it ("there\'s the critic")>Pause and breathe>Choose a new response>Repeat many times>Sleep consolidates>New default',true,
[['Awareness','You can\'t change what you don\'t notice'],['Labelling','Naming engages the prefrontal cortex'],['Choice point','The pause is where rewiring happens'],['Repetition','Hundreds of small repetitions build the new path']],
'Pick one pattern to rewire this month;Track every time you notice it (noticing counts!);Celebrate repetitions, not perfection','Transformation is usually gradual: "from one degree of glory to another."');
N('n18','Sleep, Movement & the Rewiring Brain','Lifestyle supports neuroplasticity: sleep consolidates learning, exercise boosts growth factors and nutrition and connection fuel the brain.','brain','hippo,pfc',
'Learn or practise>Sleep consolidates>Exercise boosts BDNF>Connection lowers stress>Brain more ready to change',false,
[['BDNF','Brain-derived neurotrophic factor: "fertiliser" for neurons'],['Sleep','Deep sleep replays and stores learning'],['Aerobic exercise','Increases BDNF and supports the hippocampus'],['Social connection','Buffers stress and supports wellbeing']],
'Protect 7–9 hours of sleep;Move for 20–30 minutes most days;Practise new skills before sleep','Caring for the body is part of caring for the mind.');
N('n19','Co-regulation: Brains Regulate Brains','Nervous systems calm each other. A regulated person\'s voice, face and presence can help another\'s system settle. This is how infants learn to self-regulate.','brain','pfc,amyg,insula',
'Distress>Reach for connection>Calm presence offered>Nervous system settles>Self-regulation learned over time',true,
[['Co-regulation','Calming through connection with another regulated person'],['Attunement','Noticing and responding to another\'s state'],['Self-regulation','Built from many experiences of co-regulation'],['Rupture & repair','Small breaks followed by reconnection build resilience']],
'Notice who helps you feel calmer;Offer slow voice and soft eyes to someone in distress;Practise repair after conflict','We heal in relationship: "Bear one another\'s burdens."');

// ===== VISUAL METAPHORS =====
function M(scene,t,idea,labels,places,insight,tr,links){
  MAPS.push({type:'M',area:'met',scene,t,u:idea,labels:labels.split(';'),places:sp(places),insight,tr:sp(tr),links:sp(links)});
}
M('iceberg','The Anger Iceberg','Anger is what others see above the water. Underneath sit the softer, more vulnerable feelings driving it.',
'Anger (visible);Hurt;Fear;Shame or embarrassment;Unmet need','At home;At work;In traffic;Online;With children;With a partner',
'Responding to what is underneath (hurt, fear) calms anger far better than responding to the anger itself.','When angry, ask: "What is below the waterline?";Name one underlying feeling','Anger;Shame;Fear of Abandonment');
M('iceberg','The Behaviour Iceberg','The behaviour we see is the tip. Beneath it lie thoughts, feelings, needs and core beliefs.',
'Behaviour;Thoughts;Feelings;Needs;Core beliefs','Children\'s tantrums;Workplace conflict;Relationship arguments;Habits;Addictions;Self-sabotage',
'Changing behaviour lasts when we understand and address what lies beneath.','Pick one behaviour and map its iceberg;Address the need, not only the action','Thought → Emotion → Behaviour;Emotional Needs');
M('iceberg','The Perfectionism Iceberg','Visible high standards rest on a hidden base of fear, shame and conditional worth.',
'High standards (visible);Fear of failure;Need for approval;Shame;Worth tied to performance','School and work;Body and appearance;Parenting;Ministry or service;Home;Hobbies',
'Perfectionism is often protection, not ambition.','Ask "What would happen if this were 80% good?";Notice the fear beneath','Perfectionism;Fear of Failure;Self-Worth');
M('volcano','The Anger Volcano','Anger builds like magma: triggers add pressure, warning signs rumble and eruption follows if nothing releases it.',
'Triggers;Pressure building;Warning signs;Eruption;Aftermath','Family arguments;Traffic;Work stress;Tiredness;Hunger;Feeling disrespected',
'Recognising warning signs early gives you time to release pressure safely.','List your warning signs;Plan a pressure-release action','Anger;Fight Response');
M('volcano','The Emotional Overload Volcano','Unprocessed stress and emotion accumulate until a small trigger causes a big reaction.',
'Small trigger;Accumulated stress;Unprocessed feelings;Overflow;Recovery','Busy weeks;Caregiving;Exams;Moving house;Relationship strain;Grief',
'The size of the eruption reflects what built up, not just the last trigger.','Process feelings regularly;Schedule recovery time','Emotional Overload;Window of Tolerance');
M('volcano','The Resentment Volcano','Hurts that are swallowed rather than spoken harden into resentment and can erupt later.',
'Hurt swallowed;Words unspoken;Score-keeping;Cold eruption;Distance','Marriage;Friendships;Siblings;Colleagues;Church;Parents',
'Speaking hurts early keeps them small.','Name one swallowed hurt;Plan one honest conversation','Resentment;Forgiveness (and What It Isn\'t)');
M('tree','The Roots of Anxiety','Anxious behaviours are the fruit. They grow from thoughts, core beliefs, life experiences and unmet needs.',
'Fruit: avoidance and checking;Branches: worried thoughts;Trunk: core beliefs;Roots: past experiences;Soil: unmet needs','Health;Relationships;Work;Money;Social situations;Future',
'Trimming the fruit gives short relief; tending the roots brings lasting change.','Map your anxiety tree;Tend one root this week','The Anxiety Cycle;Emotional Needs');
M('tree','The Tree of Self-Worth','Healthy self-worth grows from deep roots of being loved, not from the fruit of achievement.',
'Fruit: achievements;Branches: abilities;Trunk: identity;Roots: being loved;Soil: belonging','Work;Relationships;Faith;Family;Body;Creativity',
'When worth is rooted in love, falling fruit doesn\'t topple the tree.','Write what your roots are;Strengthen one root','Self-Worth;Identity as Beloved');
M('tree','The Family Tree of Patterns','Patterns flow down generations like sap: some nourishing, some harmful.',
'You (new growth);Parents;Grandparents;Family rules;Inherited coping','Parenting;Marriage;Money;Conflict;Faith;Emotions',
'You can choose which patterns continue through you.','Draw three generations;Mark one pattern to keep and one to end','Intergenerational Patterns;Family Roles');
M('kettle','The Stress Kettle','Stress heats you up. Without a release valve, pressure builds until something gives.',
'Heat: stressors;Water: your capacity;Steam: healthy release;Lid: suppression;Whistle: warning signs','Deadlines;Caregiving;Finances;Health;Relationships;News',
'Healthy release (talking, movement, rest) prevents dangerous build-up.','Name your whistle;Add one daily release valve','Stress & Body Sensations;Burnout');
M('cup','The Stress Bucket','Your bucket holds stress. Taps let it out. When stress flows in faster than you drain it, the bucket overflows.',
'Bucket size: your capacity;Stress pouring in;Healthy taps;Blocked taps;Overflow','Work;Family;Health;Money;Change;Sleep loss',
'You can widen your taps and reduce inflow, not just "be stronger."','List your inflows and taps;Open one new tap','Emotional Overload;Coping Strategies');
M('cup','The Empty Cup','You can\'t pour from an empty cup. Care for others flows best from a filled one.',
'Your cup;What fills you;Pouring out for others;What drains you;Overflow: giving from fullness','Parenting;Caregiving;Ministry;Work;Friendship;Marriage',
'Self-care is not selfish; it sustains service.','Name three things that fill your cup;Schedule one this week','Codependency;Guilt About Resting');
M('cup','The Overflowing Glass','Emotions that are held in rather than processed eventually spill over.',
'Held in;Daily feelings pouring in;Emptying regularly;Bottled up;Spill-over','Teenagers;New parents;Caregivers;Students;Leaders;Grievers',
'Emptying a little each day prevents big spills.','Journal or talk daily;Notice your level','Difficulty Identifying & Expressing Emotions');
M('backpack','The Shame Backpack','We carry invisible loads: shoulds, secrets, others\' feelings, old guilt. The pack gets heavier every year.',
'Shoulds;Secrets;Others\' feelings;Old guilt;Roles we never chose','Family;Work;Church;Friendships;Body;Past mistakes',
'You can take items out, look at them and decide what to set down.','List what\'s in your backpack;Choose one item to put down','Shame;Guilt;Grace vs. Shame');
M('backpack','The Caregiver\'s Backpack','Parentified or codependent people carry other people\'s loads as if they were their own.',
'Parent\'s feelings;Siblings\' needs;Family secrets;Keeping the peace;Your own needs (buried)','Childhood home;Marriage;Workplace;Friend groups;Church;Extended family',
'Carrying for others is different from carrying with others.','Mark whose load each item is;Give one item back','Parentification;Codependency');
M('wave','Grief Comes in Waves','Grief is not a straight line. Waves come, sometimes small and sometimes huge, and they come less often over time.',
'Big early waves;Triggers;Calm stretches;Rogue waves (anniversaries);Learning to float','Holidays;Birthdays;Songs;Smells;Places;Quiet evenings',
'You don\'t stop the waves; you learn to swim, and the sea slowly calms.','Plan for known wave days;Let a wave pass without judgment','Understanding Grief;Grief Triggers');
M('wave','Urge Surfing','Urges rise, peak and fall like waves, usually within 20–30 minutes, if you don\'t feed them.',
'Urge begins;Building;Peak;Falling;Calm','Cravings;Scrolling;Anger;Shopping;Food;Checking',
'Riding the urge without acting weakens it over time.','Set a 20-minute timer and surf;Notice the peak passing','Impulsivity;The Quick-Relief Cycle');
M('wave','The Panic Wave','Panic surges quickly, peaks within about 10 minutes and passes, even though it feels like it will last forever.',
'Trigger;Rapid rise;Peak;Natural fall;Calm returns','Crowds;Driving;Health worries;Exams;Night time;Public speaking',
'Fighting the wave makes it bigger; allowing it lets it pass.','Ride it: breathe slowly and wait;Remind yourself "this will pass"','The Anxiety Cycle;Hyperarousal');
M('garden','The Neuroplasticity Garden','Your mind is a garden: whatever you water grows. Weeds (old patterns) shrink when not fed.',
'Seeds: new habits;Water: attention and practice;Weeds: old patterns;Sunlight: safety and support;Harvest: new defaults','Thinking;Habits;Relationships;Self-talk;Faith;Health',
'Growth is slow and seasonal; tending matters more than forcing.','Choose one seed to water daily;Stop watering one weed','Neuroplasticity: The Brain That Changes;Rewiring Step by Step');
M('garden','The Self-Compassion Garden','Self-compassion is gardening rather than demolishing: gentle care helps things grow.',
'Gentle tending;Harsh weeding (inner critic);Nourishment;Rest seasons;New growth','Failure;Illness;Grief;Parenting;Learning;Ageing',
'Plants don\'t grow from being shouted at.','Speak to yourself like a gardener;Allow rest seasons','Self-Compassion;The Inner Critic');
M('house','The Boundaries House','Boundaries are like a house: fences, gates, doors and windows let you decide who comes in and how far.',
'Fence: outer limits;Gate: who enters;Front door: trust;Windows: openness;Inner rooms: intimacy','Family;Work;Friends;Social media;Church;Neighbours',
'Healthy boundaries have gates, not walls.','Map who is in which space;Adjust one gate','Personal Boundaries;Difficulty Saying No');
M('house','The House of Self','A stable self is like a house: a foundation of worth, walls of boundaries, windows of openness, a roof of support.',
'Foundation: worth;Walls: boundaries;Windows: openness;Roof: support;Door: choice','Identity;Relationships;Faith;Work;Family;Body',
'Weak foundations make everything else shaky.','Rate each part of your house;Strengthen the weakest','Self-Worth;Support Network');
M('mask','The People-Pleasing Mask','We wear a smiling mask to keep others happy, while the real self hides behind it.',
'The smile;Agreeing;Hidden opinions;Real needs;Exhaustion','Family;Work;Church;Friendships;Dating;Neighbours',
'Taking off the mask is scary but brings real connection.','Notice when you mask;Take it off with one safe person','People-Pleasing;Authenticity vs. Adaptation');
M('mask','The Impostor Mask','We feel we are wearing a mask of competence and fear it will slip.',
'Competent mask;Fear of exposure;Real skills;Hidden doubts;Over-preparation','Work;Study;Leadership;Parenting;Ministry;Creative work',
'Often the "real you" behind the mask is more capable than you think.','List evidence of real skill;Share doubts with a peer','Impostor Syndrome;Professional Impostor Syndrome');
M('path','Old Highway, New Path','Old habits are well-worn highways. New habits start as faint trails through long grass and get easier with each walk.',
'Old highway (habit);Fork: choice point;New trail;Grass growing back;New default road','Self-talk;Reactions;Eating;Screen time;Relationships;Prayer',
'Every walk on the new path makes it easier; the old highway slowly grows over.','Name your fork;Walk the new path once today','Fire Together, Wire Together;The Habit Loop');
M('path','Recovery Is Not a Straight Line','Healing goes up and down with switchbacks, plateaus and setbacks, but the overall direction is upward.',
'Start;Setback;Plateau;Breakthrough;Further along','Grief;Addiction recovery;Trauma healing;Depression;Relationships;Faith',
'A setback is part of the path, not the end of it.','Look at the whole climb, not one step;Mark how far you\'ve come','Recognising Progress;Personal Continuity Plan');
M('alarm','The Smoke Alarm Brain','The amygdala works like a smoke alarm: it can\'t tell burnt toast from a house fire, so it sometimes goes off when there is no real danger.',
'Alarm (amygdala);Burnt toast (small trigger);Real fire (real danger);Checking (prefrontal cortex);Resetting','Social situations;Health worries;Conflict;Crowds;Exams;Memories',
'Thank the alarm, check for fire and reset.','Ask: "toast or fire?";Calm the body, then check','The Alarm and the Pilot: Amygdala & Prefrontal Cortex;Hypervigilance');
M('alarm','The Trauma Alarm','After trauma, the alarm becomes oversensitive and triggers on reminders of past danger.',
'Sensitive alarm;Reminder cue;Past danger;Present safety;Recalibrating','Sounds;Smells;Places;Tones of voice;Dates;Body sensations',
'The alarm can be recalibrated with safety, time and support.','Map your triggers;Practise "then vs. now"','Emotional Triggers;Felt Sense of Safety');
M('river','The River of Wellbeing','Wellbeing flows between two banks: chaos on one side and rigidity on the other (Siegel). Integration keeps you in the flow.',
'Chaos bank;Rigidity bank;Flow (integration);Rocks (stressors);Steering (skills)','Emotions;Relationships;Work;Parenting;Faith;Health',
'Health is not stillness; it is flexible flow.','Notice which bank you drift toward;Use one skill to steer','Window of Tolerance;Coping Strategies');
M('river','The Rumination Whirlpool','Rumination pulls you into a circling eddy that feels like thinking but goes nowhere.',
'Main current (life);Whirlpool (rumination);Pull of "why?";Swimming out;Back to the current','Night time;After conflict;After mistakes;Waiting;Illness;Loss',
'You swim out sideways, through action and attention, not by thinking harder.','Notice when you\'re circling;Do one action to swim out','Rumination;The Default Mode Network & Rumination');
M('battery','The Energy Battery','Your energy is like a battery: some activities drain it and others recharge it.',
'Full charge;Drainers;Chargers;Low battery warning;Empty (burnout)','Work;Socialising;Caregiving;Screens;Sleep;Nature',
'Know your chargers and drainers; plan both.','List your chargers and drainers;Add one charger daily','Burnout;Guilt About Resting');
M('battery','The Social Battery','Social interaction uses energy differently for different people. Knowing your battery helps you plan connection.',
'Full and social;Draining in company;Warning signs;Empty: need solitude;Recharging','Parties;Church;Family events;Meetings;Calls;Travel',
'Neither introversion nor extroversion is wrong; it is about managing the battery.','Plan recharge time after big events;Tell others your needs','Loneliness;Belonging');
// ===== COMPARISON SHEETS =====
function C(t,u,cols,rows,quad,links){ MAPS.push({type:'C',area:'cmp',t,u,cols,rows,quad,links:sp(links)}); }
C('The Four Attachment Styles','Patterns of closeness learned early. Two dimensions shape them: anxiety about abandonment and avoidance of intimacy.',
[['Secure',150],['Anxious',30],['Avoidant',210],['Disorganised',330]],
[['Core belief','I\'m okay, you\'re okay','I\'m not enough; you might leave','I must rely on myself','Closeness is both needed and dangerous'],
 ['When distant','Trusts the bond','Protests, pursues, checks','Relieved, keeps distance','Confused; pursues then flees'],
 ['In conflict','Talks, repairs','Escalates to get a response','Shuts down, withdraws','Freezes or swings between extremes'],
 ['Needs','Continued connection','Reassurance, consistency','Space and respect for autonomy','Safety, predictability, patience'],
 ['Body signal','Settled','Activated, urgent','Numb, tight','Flooded or frozen'],
 ['Growth edge','Keep practising','Self-soothe; ask directly','Lean in; name feelings','Stabilise; trauma-informed support']],
{x:'Avoidance of intimacy →',y:'Anxiety about abandonment →',pos:[[.25,.25],[.25,.75],[.75,.25],[.75,.75]]},'Attachment Styles;Fear of Abandonment;Emotional Unavailability');
C('The Four Communication Styles','How we express needs and handle disagreement. Assertiveness respects both self and others.',
[['Passive',210],['Aggressive',0],['Passive-Aggressive',40],['Assertive',150]],
[['Motto','Your needs matter, mine don\'t','My needs matter, yours don\'t','I\'ll get you back indirectly','We both matter'],
 ['Voice','Soft, apologetic','Loud, demanding','Sweet but sarcastic','Calm, clear'],
 ['Body','Eyes down, shrinking','Leaning in, pointing','Eye-rolling, sighing','Open, steady eye contact'],
 ['Typical words','"It\'s fine", "Whatever you want"','"You always…", "You\'re wrong"','"Fine.", "I was only joking"','"I feel… I need… Would you…?"'],
 ['Result','Resentment, needs unmet','Fear, damaged trust','Confusion, slow-burn conflict','Respect, problems solved'],
 ['Try','State one preference','Pause; use "I" statements','Say it directly','Keep practising']],
{x:'Respect for others →',y:'Respect for self →',pos:[[.75,.25],[.25,.75],[.25,.25],[.75,.75]]},'Assertive Communication;Passive Communication;Aggressive Communication;Passive-Aggressive Communication');
C('The Four Stress Responses','Automatic survival responses. None is "bad"; each protected you once. Trouble comes when they fire when you are actually safe.',
[['Fight',0],['Flight',40],['Freeze',210],['Fawn',300]],
[['Strategy','Confront the threat','Escape the threat','Become still and invisible','Appease the threat'],
 ['Body','Heat, clenched jaw, surge','Restless, fast heart','Heavy, numb, holding breath','Tight smile, hyper-attuned'],
 ['Thoughts','"Attack first"','"Get out"','"I can\'t move"','"Keep them happy"'],
 ['Looks like','Arguing, controlling','Busyness, avoiding, leaving','Blanking, procrastinating','People-pleasing, over-apologising'],
 ['Gift when healthy','Courage, protection','Knowing when to leave','Pause, stillness','Empathy, diplomacy'],
 ['Regulate with','Movement, release energy','Grounding, staying','Gentle movement, orienting','Saying small no\'s']],
null,'Fight Response;Flight Response;Freeze Response;Fawn Response');
C('Guilt vs. Shame vs. Embarrassment','Three self-conscious emotions that are often confused.',
[['Guilt',40],['Shame',330],['Embarrassment',20]],
[['Message','I did something bad','I am bad','I look foolish'],['Focus','Behaviour','Whole self','Social image'],['Urge','Repair, apologise','Hide, disappear','Laugh it off, blush'],
 ['Helpful?','Usually; points to repair','Rarely; isolates','Usually brief'],['Antidote','Repair and forgiveness','Being seen and accepted','Humour and time']],null,'Guilt;Shame;Grace vs. Shame');
C('Sadness vs. Grief vs. Depression','Related experiences with different shapes. When in doubt, ask a professional.',
[['Sadness',220],['Grief',250],['Depression',270]],
[['Trigger','A disappointment','A significant loss','Often no single cause'],['Pattern','Passes in hours or days','Waves, gradually softening','Persistent low mood for weeks'],
 ['Self-worth','Intact','Usually intact','Often low, self-blame'],['Pleasure','Still possible','Moments of joy amid pain','Loss of interest in most things'],['Help','Comfort, time','Support, remembrance, time','Professional help, support']],null,'Sadness;Understanding Grief');
C('Worry vs. Anxiety vs. Panic','Different intensities and forms of fear.',
[['Worry',190],['Anxiety',205],['Panic',0]],
[['Lives in','Thoughts','Thoughts + body','Body, suddenly'],['Time focus','Specific future problem','General sense of threat','Right now'],['Intensity','Mild to moderate','Moderate, ongoing','Very intense, peaks in minutes'],
 ['Feels like','"What if…?"','On edge, tense','Pounding heart, breathlessness'],['Helps','Problem-solving, worry time','Regulation, exposure','Riding the wave, slow breath']],null,'Excessive Worry;The Anxiety Cycle;The Panic Wave');
C('Porous vs. Healthy vs. Rigid Boundaries','Boundaries sit on a spectrum. Healthy ones flex with context.',
[['Porous',30],['Healthy',150],['Rigid',220]],
[['Saying no','Very hard','Possible and kind','Says no to almost everything'],['Sharing','Overshares','Shares appropriately','Rarely shares'],['Others\' problems','Takes them on','Supports without rescuing','Keeps distance'],
 ['Feels like','Exhausted, resentful','Respected, connected','Safe but lonely'],['Grows by','Small no\'s','Keep adjusting','Small yeses']],null,'Personal Boundaries;Difficulty Saying No');
C('Helping vs. Rescuing vs. Enabling','Not all help is helpful. The difference lies in responsibility.',
[['Helping',150],['Rescuing',30],['Enabling',0]],
[['Who does the work','Shared; they lead','You take over','You remove consequences'],['Motive','Their growth','Your anxiety or need to be needed','Avoiding conflict'],['Long-term effect','They grow stronger','They depend on you','The problem continues'],
 ['You feel','Satisfied','Tired, resentful','Trapped'],['Ask yourself','Am I doing this with them?','Am I doing this for them?','Am I protecting them from reality?']],null,'Codependency;Helping;Emotional Dependency');
C('Perfectionism vs. Healthy Striving','Both aim high; they differ in motive and response to failure.',
[['Perfectionism',330],['Healthy striving',150]],
[['Driven by','Fear of failure and shame','Values and growth'],['Mistakes','Threats to worth','Information to learn from'],['Standard','Flawless','Excellent but human'],
 ['Feels like','Pressure, never enough','Effort, satisfaction'],['Rest','Earned, guilty','Part of the process']],null,'Perfectionism;Self-Compassion');
C('Reacting vs. Responding','Reactions are automatic. Responses involve a pause and a choice.',
[['Reacting',0],['Responding',150]],
[['Speed','Instant','Pause first'],['Brain','Alarm leads','Thinking brain online'],['Driven by','Past patterns','Present values'],
 ['Outcome','Often regret','Often repair'],['Practise','Notice the urge','Breathe, name, choose']],null,'The Alarm and the Pilot: Amygdala & Prefrontal Cortex;Rewiring Step by Step');
C('Fixed vs. Growth Mindset','Beliefs about whether abilities can change. Neuroplasticity supports a growth mindset.',
[['Fixed mindset',20],['Growth mindset',150]],
[['Belief','Abilities are set','Abilities develop'],['Challenge','Avoid','Embrace'],['Effort','Pointless','The path to mastery'],
 ['Feedback','Threat','Useful information'],['Self-talk','"I can\'t do this"','"I can\'t do this yet"']],null,'Neuroplasticity: The Brain That Changes;Fear of Failure');
C('Forgiveness vs. Reconciliation vs. Excusing','Often confused, especially in faith settings.',
[['Forgiveness',260],['Reconciliation',150],['Excusing',30]],
[['What it is','Releasing the debt','Restoring the relationship','Saying it wasn\'t wrong'],['Requires','Only you','Both parties and rebuilt trust','Denial of harm'],['Boundaries','Can keep them','Gradually relaxed as trust grows','Usually dropped'],
 ['Timeline','Can be a process','Takes time','Instant, but false'],['Healthy?','Yes','Yes, when safe','No']],null,'Forgiveness (and What It Isn\'t);Repair & Reconciliation');
C('The Drama Triangle vs. The Empowerment Triangle','Karpman\'s Drama Triangle roles, and the healthier roles that replace them (Emerald).',
[['Victim → Creator',210],['Persecutor → Challenger',0],['Rescuer → Coach',150]],
[['Drama role','"Poor me"','"It\'s your fault"','"Let me fix it"'],['Hidden need','Support','Control','To be needed'],['Empowered role','Creator: focuses on outcomes','Challenger: clear, respectful','Coach: asks, supports'],
 ['Key question','What do I want?','What standard matters?','What do you think you need?']],null,'Codependency;Repeating Relationship Patterns');
C('Hyperarousal vs. Window vs. Hypoarousal','Three nervous-system zones. Learn your signs for each.',
[['Hyperarousal',0],['Window of tolerance',150],['Hypoarousal',220]],
[['Energy','Too much','Just right','Too little'],['Thinking','Racing, reactive','Clear, flexible','Foggy, blank'],['Feelings','Panic, rage','Felt but manageable','Numb, flat'],
 ['Body','Tense, fast heart','Settled, alert','Heavy, collapsed'],['What helps','Calming, slow exhale','Keep practising','Gentle activation, movement']],null,'Window of Tolerance;Hyperarousal;Shutdown & Hypoarousal');

// ===== VISUAL SCALES =====
function S(t,u,fig,levels,h1,h2,links){ MAPS.push({type:'S',area:'scl',t,u,fig,levels,h1,h2,links:sp(links)}); }
S('Window of Tolerance','Where is your nervous system right now? Drag the marker. There is no score, only information.','wot',
[['Shut down','Numb, far away, can\'t think or feel','Gentle movement, cold water, strong flavours, a warm voice'],
 ['Low and flat','Tired, unmotivated, disconnected','Stand up, stretch, step outside, text a friend'],
 ['In the window','Calm and alert; feelings are manageable','Notice what is helping; keep it going'],
 ['Edgy','Tense, irritable, thoughts speeding up','Longer exhales, slow walk, reduce input'],
 ['Flooded','Panic or rage; can\'t think clearly','Pause, safe space, cold water, slow breathing, call support']],210,0,'Window of Tolerance;Hyperarousal;Shutdown & Hypoarousal');
S('Emotional Intensity Thermometer','How strong is the feeling right now, from 0 to 10? Different intensities need different tools.','thermo',
[['0–2 Calm','Barely noticeable','Good time to practise skills'],['3–4 Noticeable','Present but manageable','Name it; problem-solve'],['5–6 Strong','Hard to ignore','Breathing, grounding, take a short break'],
 ['7–8 Very strong','Thinking becomes difficult','Step away, calm the body first, avoid big decisions'],['9–10 Overwhelming','Out of control','Safety first: cold water, safe person, crisis plan']],150,0,'Emotional Overload;Window of Tolerance');
S('The Assertiveness Scale','From passive to aggressive. Where are you in this situation?','bar',
[['Very passive','Silent, gives in completely','Write what you want to say first'],['Passive','Hints, hopes others guess','Use one "I would like…" sentence'],['Assertive','Clear and respectful','Keep going'],
 ['Pushy','Insistent, interrupts','Pause and listen'],['Aggressive','Attacks, blames, intimidates','Take a break, cool down, return with "I" statements']],210,0,'Assertive Communication;The Four Communication Styles');
S('Stress Load Gauge','How full is your stress load this week?','bar',
[['Light','Plenty of capacity','Maintain good habits'],['Moderate','Busy but managing','Protect sleep and breaks'],['Heavy','Stretched, irritable','Drop or delegate one thing'],
 ['Overloaded','Struggling to cope','Ask for help, reduce commitments'],['Crisis','Unable to function','Reach out to support or professional help today']],150,0,'Stress & Body Sensations;Burnout');
S('Burnout Battery','How charged is your energy for work and life?','battery',
[['Empty','Exhausted, cynical, detached','Rest is urgent; talk to a doctor or manager'],['Low','Dragging through tasks','Cut back, add rest, ask for help'],['Half','Okay but not thriving','Add one charger daily'],
 ['Good','Energised most days','Protect your chargers'],['Full','Rested and engaged','Enjoy and maintain']],0,150,'Burnout;Guilt About Resting');
S('The Nervous System Ladder','Where are you on the ladder right now?','ladder',
[['Shutdown','Collapsed, numb, hopeless','Gentle movement, warmth, a kind voice'],['Mobilised','Anxious, angry, restless','Move, breathe out slowly, ground'],['Safe & social','Calm, curious, connected','Connect, play, create']],0,150,'The Nervous System Ladder (Polyvagal Map);Felt Sense of Safety');
S('Self-Talk Scale','How are you speaking to yourself right now?','bar',
[['Attacking','Harsh, cruel, contemptuous','Notice and name the critic'],['Critical','Judging, comparing','Ask: would I say this to a friend?'],['Neutral','Matter-of-fact','Add one kind word'],
 ['Kind','Supportive, understanding','Keep practising'],['Compassionate','Warm, encouraging, accepting','Let it sink in']],0,150,'The Inner Critic;Self-Compassion');
S('Boundary Health Scale','How are your boundaries in this relationship?','bar',
[['Very porous','No limits, totally absorbed','Start with one small no'],['Porous','Hard to say no','Practise "Let me think about it"'],['Healthy','Flexible, respectful','Keep adjusting'],
 ['Guarded','Hard to let people in','Practise one small yes'],['Rigid','Walls up, isolated','Explore what feels unsafe']],30,220,'Personal Boundaries;Porous vs. Healthy vs. Rigid Boundaries');
S('Connection Scale','How connected do you feel right now?','bar',
[['Isolated','Alone, unseen','Send one message today'],['Distant','Few meaningful contacts','Plan one meeting'],['Some connection','Some meaningful relationships','Deepen one'],
 ['Connected','Supported and known','Offer support to others'],['Belonging','Deeply rooted in community','Enjoy and share it']],220,150,'Loneliness;Belonging;Support Network');
S('Shame–Dignity Scale','How do you feel about yourself right now?','bar',
[['Deep shame','Wanting to disappear','Reach out to one safe person'],['Ashamed','Feeling flawed','Name the shame story'],['Uncertain','Mixed feelings about self','Recall evidence of worth'],
 ['Okay','Comfortable with self','Notice what supports it'],['Dignity','Worthy and loved','Let it sink in']],330,150,'Shame;Grace vs. Shame;Identity as Beloved');
S('Readiness for Change','The stages of change (Prochaska & DiClemente). Where are you with the change you\'re considering?','path',
[['Not yet','Not considering change','Learn more, no pressure'],['Thinking about it','Weighing pros and cons','List reasons for and against'],['Preparing','Planning to change soon','Make a concrete plan'],
 ['Doing it','Actively changing','Track progress, get support'],['Maintaining','Keeping the change going','Plan for setbacks']],40,150,'Therapy Goals;Personal Continuity Plan');

// ===== LOOKUP FLOWCHARTS =====
function F(t,area,root){ MAPS.push({type:'F',area:'flo',farea:area,t,u:'Start from what you are experiencing, not from the name of a problem. Follow the branches to the right map.',root}); }
F('I feel anxious or afraid','anx',{q:'What does the fear focus on?',o:[
 ['The future, "what ifs"',{q:'Is it mostly thinking or mostly body?',o:[['Thinking in loops','Excessive Worry;Intolerance of Uncertainty'],['Body alarm','The Anxiety Cycle;Hyperarousal']]}],
 ['Other people\'s opinions','Fear of Judgment;Need for Approval'],
 ['Doing something wrong',{q:'Is it about mistakes or outcomes?',o:[['Mistakes','Fear of Making Mistakes;Perfectionism'],['Outcomes','Fear of Failure;Need for Control']]}],
 ['Danger everywhere','Hypervigilance;Emotional Triggers'],['I avoid things','Anxious Avoidance;Procrastination']]});
F('I have a strong feeling I can\'t name','emo',{q:'Is your energy high or low?',o:[
 ['High, hot',{q:'Is it directed at someone?',o:[['Yes, I feel wronged','Anger;Resentment'],['At a block','Frustration'],['At their success','Envy']]}],
 ['Low, heavy',{q:'Is it about loss or about yourself?',o:[['Loss','Sadness;Understanding Grief'],['Disconnection','Loneliness'],['Myself','Shame;Guilt']]}],
 ['Too much at once','Emotional Overload;Window of Tolerance'],['Nothing / confused','Difficulty Identifying & Expressing Emotions;Shutdown & Hypoarousal']]});
F('I feel bad about myself','self',{q:'Where does the feeling come from?',o:[
 ['A harsh inner voice','The Inner Critic;Self-Compassion'],['Looking at others','Constant Comparison;Physical Comparison'],
 ['Fear of being found out','Impostor Syndrome;Professional Impostor Syndrome'],['Never good enough',{q:'Is it about doing or being?',o:[['Doing','Perfectionism;Self-Pressure'],['Being','Low Self-Esteem;Self-Worth']]}],
 ['Not being myself','Authenticity vs. Adaptation;Self-Image']]});
F('Something hurts in my relationship','rel',{q:'What happens when you feel distant?',o:[
 ['I pursue and worry',{q:'What is the fear?',o:[['They\'ll leave','Fear of Abandonment;Emotional Dependency'],['Someone else','Jealousy & Insecurity'],['They don\'t like me','Rejection Sensitivity']]}],
 ['I pull away','Emotional Unavailability;Fear of Intimacy'],['I can\'t trust','Difficulty Trusting'],['I fix everything','Codependency;People-Pleasing'],['Same story again','Repeating Relationship Patterns;Attachment Styles']]});
F('Family situations stir me up','fam',{q:'What do you notice most?',o:[
 ['I carry too much','Parentification;Family Roles'],['I\'m caught in the middle','Family Triangulation'],['I feel unseen','Emotional Neglect'],
 ['Pressure to be a certain way','Family Expectations;Guilt About Being Different'],['A specific parent',{q:'Which one?',o:[['Mother figure','Relationship With the Mother Figure'],['Father figure','Relationship With the Father Figure']]}],
 ['Patterns across generations','Intergenerational Patterns;Sibling Conflict']]});
F('My body reacts to stress','str',{q:'What does your body do?',o:[
 ['Gets hot, ready to fight','Fight Response;Hyperarousal'],['Wants to run','Flight Response'],['Freezes or goes numb','Freeze Response;Shutdown & Hypoarousal'],
 ['Smiles and pleases','Fawn Response'],['Suddenly reacts to reminders','Emotional Triggers;Felt Sense of Safety'],['Still shaken after a hard event','Stabilising After Hard Experiences;Window of Tolerance']]});
F('I keep getting in my own way','sab',{q:'What does it look like?',o:[
 ['Putting things off','Procrastination;Avoiding Hard Tasks'],['Ruining things near success','Self-Sabotage'],['Can\'t decide','Indecision'],
 ['Acting on urges',{q:'Quick or repeated?',o:[['Quick, impulsive','Impulsivity'],['Repeated routine','The Habit Loop;The Quick-Relief Cycle']]}],
 ['Asking for reassurance','Excessive Reassurance Seeking'],['Pushing myself too hard','Self-Pressure;People-Pleasing']]});
F('I struggle to speak up or set limits','bnd',{q:'What happens when you need to say something?',o:[
 ['I stay quiet','Passive Communication;Expressing Needs'],['I explode','Aggressive Communication'],['I hint or go cold','Passive-Aggressive Communication'],
 ['I can\'t say no',{q:'What comes after?',o:[['Fear first','Difficulty Saying No'],['Guilt after','Guilt About Setting Boundaries']]}],
 ['I avoid hard talks','Hard Conversations;Assertive Communication'],['After a fight','Repair After a Conflict']]});
F('I\'m facing a loss or change','grf',{q:'What kind of loss?',o:[
 ['Someone died','Losing Someone Important;Understanding Grief'],['A loss is coming','Anticipatory Grief'],['Unclear loss','Ambiguous Loss'],
 ['Relationship ended','The End of a Relationship'],['Job or home','Job Loss;Moving to a New City'],['A new life stage','Life Transitions;Rebuilding Meaning After Loss']]});
F('I don\'t feel at home in my body','bod',{q:'What is it about?',o:[
 ['How I look',{q:'Comparison or shame?',o:[['Comparison','Physical Comparison;Body Image'],['Shame','Body Shame']]}],
 ['Tension and pain','Stress & Body Sensations;Tension & Being on Alert'],['I don\'t notice my body','Reading the Body\'s Signals;The Body–Emotion Connection'],
 ['Closeness and intimacy','Intimacy & Vulnerability;Shame in Intimacy'],['Caring for myself','Your Relationship With Your Body']]});
F('Work or money weighs on me','wrk',{q:'What is the main weight?',o:[
 ['Exhaustion','Burnout;Guilt About Resting'],['Too many hours','Overworking;Boundaries at Work'],['Feeling like a fraud','Professional Impostor Syndrome'],
 ['Money',{q:'Worry or beliefs?',o:[['Worry','Financial Anxiety'],['Beliefs','Money Beliefs;Fear of Charging What You\'re Worth']]}],
 ['Direction and meaning','Career Transition;Purpose & Professional Values']]});
F('I want to understand myself and grow','kno',{q:'Where do you want to start?',o:[
 ['How my brain changes','Neuroplasticity: The Brain That Changes;Rewiring Step by Step'],['What I need','Emotional Needs;Personal Values'],
 ['Why I react','Thought → Emotion → Behaviour;Identifying Triggers'],['How I cope','Coping Strategies;Inner Resources;Support Network'],
 ['My faith and relationships','Being Known and Loved;Grace vs. Shame;Spiritual Bypassing'],['Tracking growth','Therapy Goals;Recognising Progress;Personal Continuity Plan']]});

// ===== THERAPY APPROACHES =====
function A(t,who,core,prob,aim,tools,sess,good,img){ MAPS.push({type:'A',area:'apr',t,who,u:core,prob,aim,tools:sp(tools),sess,good:sp(good),img}); }
A('CBT: Cognitive Behavioural Therapy','Aaron Beck, Albert Ellis; developed by Judith Beck and others','Thoughts, feelings and behaviours influence each other. Changing unhelpful thoughts and behaviours changes how we feel.',
'Distorted automatic thoughts and unhelpful behaviours keep problems going.','Identify and test thoughts; build new behaviours and skills.','Thought records;Behavioural experiments;Exposure;Activity scheduling;Socratic questions',
'Structured, goal-focused, with homework between sessions.','Anxiety;Depression;OCD;Insomnia','A detective investigating thoughts for evidence.');
A('DBT: Dialectical Behaviour Therapy','Marsha Linehan','Acceptance and change together. Build skills to regulate intense emotions and relationships.',
'Emotional sensitivity plus invalidating environments lead to dysregulation.','Build a life worth living through skills.','Mindfulness;Distress tolerance (TIPP, STOP);Emotion regulation;Interpersonal effectiveness (DEAR MAN)',
'Individual therapy plus skills group; diary cards.','Intense emotions;Self-harm;BPD;Impulsivity','A tightrope walker balancing acceptance and change.');
A('ACT: Acceptance & Commitment Therapy','Steven Hayes','Pain is part of life. Make room for difficult feelings and act on your values.',
'Struggling against inner experience (experiential avoidance) narrows life.','Psychological flexibility: open, aware, engaged.','Defusion;Acceptance;Present moment;Self-as-context;Values;Committed action',
'Experiential exercises and metaphors.','Anxiety;Chronic pain;Depression;Stress','Passengers on the bus: drive toward your values even with noisy passengers.');
A('Schema Therapy','Jeffrey Young','Early unmet needs create deep patterns (schemas) that repeat throughout life.',
'Schemas such as abandonment, defectiveness or subjugation drive coping modes.','Meet core needs, heal schemas, strengthen the Healthy Adult.','Schema mapping;Imagery rescripting;Chair work;Limited reparenting',
'Longer-term, warm, experiential.','Long-standing patterns;Personality difficulties;Relationship repetition','A map of old roads that keep leading back to the same place.');
A('EFT: Emotion-Focused Therapy','Leslie Greenberg; Sue Johnson (couples)','Emotions are adaptive guides. Change comes from accessing and transforming emotion.',
'Core painful emotions avoided or stuck.','Access, accept and transform emotion; in couples, create secure bonds.','Empty-chair work;Two-chair dialogue;Emotion coaching;Couples: identifying the negative cycle',
'Focused on feelings in the moment.','Couples distress;Depression;Trauma;Shame','Following emotional currents to their source.');
A('CFT: Compassion-Focused Therapy','Paul Gilbert','Three emotion systems (threat, drive, soothe). Shame and self-criticism block the soothing system.',
'An overactive threat system and an underdeveloped soothing system.','Develop compassion for self and others.','Compassionate imagery;Compassionate self;Soothing rhythm breathing;Compassionate letters',
'Warm, psychoeducational, practice-based.','Shame;Self-criticism;Depression;Trauma','Three circles in balance: threat, drive, soothe.');
A('Psychodynamic Therapy','Sigmund Freud; developed by many later clinicians','Unconscious patterns from early life shape present feelings and relationships.',
'Unresolved conflicts and defences repeat in relationships.','Insight into patterns and emotional integration.','Free association;Exploring the therapy relationship;Interpretation;Dreams',
'Open-ended, exploratory.','Recurring patterns;Relationship issues;Depression','An archaeologist uncovering layers.');
A('IFS: Internal Family Systems','Richard Schwartz','The mind has "parts" (protectors, exiles) and a core Self that is calm, curious and compassionate.',
'Parts take on extreme roles to protect wounded exiles.','Self-leadership: parts trust the Self and unburden.','Parts mapping;Unblending;Getting to know protectors;Unburdening',
'Curious inner dialogue with parts.','Trauma;Inner conflict;Self-criticism','A family meeting inside you, led by a calm parent.');
A('EMDR','Francine Shapiro','Traumatic memories can be reprocessed using bilateral stimulation so they lose their charge.',
'Unprocessed memories stored with their original emotion and sensation.','Reprocess memories to adaptive resolution.','8-phase protocol;Eye movements or tapping;Resourcing;Installation of positive beliefs',
'Structured; preparation before processing.','PTSD;Trauma;Phobias','Filing a loose memory into the right drawer.');
A('Somatic Experiencing','Peter Levine','Trauma is held in the body. Gently completing survival responses restores regulation.',
'Incomplete fight/flight responses leave the nervous system stuck.','Restore regulation through body awareness.','Tracking sensation;Titration;Pendulation;Resourcing',
'Slow, body-focused.','Trauma;Chronic stress;Shock','An animal shaking off fear after escaping danger.');
A('Attachment-Based Therapy','John Bowlby, Mary Ainsworth; many modern clinicians','Early attachment patterns shape adult relationships; secure relationships heal.',
'Insecure attachment patterns repeat.','Build earned security.','Exploring attachment history;Secure base in therapy;Repair experiences',
'Relational, warm, consistent.','Relationship difficulties;Parenting;Abandonment fears','A secure base from which to explore.');
A('Narrative Therapy','Michael White, David Epston','We live by stories. The problem is the problem; the person is not the problem.',
'Problem-saturated stories shape identity.','Re-author preferred stories.','Externalising;Unique outcomes;Re-authoring;Witnessing',
'Collaborative, curious about your story.','Identity struggles;Families;Trauma','Rewriting the chapters of your life.');
A('Christian Integrative Counselling','Many practitioners integrating psychology and Christian faith','Psychological science and faith both offer truth about the person. Healing happens in relationship with others and God.',
'Wounds, sin, false beliefs and relational ruptures distort identity and connection.','Wholeness: integrated emotional, relational and spiritual health.','Evidence-based therapy tools;Lament and prayer (when welcomed);Identity work;Forgiveness process;Community support',
'Client-led use of faith; clinically grounded.','Shame;Grief;Relationships;Spiritual struggles','A gardener and a physician working together.');
// ===== NEW AREAS: Childhood Trauma, Mind States & Focus =====
AREAS.splice(AREAS.findIndex(a=>a.id==='str'),0,{id:'cht',n:'Childhood Trauma',h:110,brain:'A developing brain adapts to its environment. In threat, it prioritises survival: a sensitive alarm, quick shutdown, constant scanning. Those were smart adaptations then. Because the brain stays plastic, safe relationships and practice can retune them now.',neuro:['n23','n13','n14']});
AREAS.splice(AREAS.findIndex(a=>a.id==='kno'),0,{id:'foc',n:'Mind States & Focus',h:60,brain:'Focus depends on arousal being "just right" (not too low, not too high) and on attention networks that select, sustain and switch. You can deliberately shift state through breath, movement, light and task design.',neuro:['n20','n21','n22']});

// CHILDHOOD TRAUMA
E('cht','Understanding Childhood Trauma','Childhood trauma is not only what happened (abuse, neglect, chaos, loss). It is also what was missing: no one to help you make sense of it or feel safe again. Adverse Childhood Experiences (ACEs) are common, and their effects can be healed.',
'jumpiness;tension;stomach problems;tiredness','Something is wrong with me;The world isn\'t safe;I must handle everything alone','hypervigilance;people-pleasing;shutting down;over-achieving',
'Child faces threat without enough support>Body learns survival mode>Survival strategies become habits>Adult life triggers old alarms>Old strategies repeat>Self-blame ("why am I like this?")',
'What did I need as a child that I didn\'t get?;Which of my reactions made sense back then?;Who was safe for me, even a little?','safety;comfort;being seen;protection','It was my fault;I should be over it;What happened wasn\'t "bad enough" to count',
'Replace "what\'s wrong with me?" with "what happened to me, and what did I learn?";Build stability first: sleep, routine, one safe person;Find a trauma-informed therapist before going deep into memories','Being heard without blame by a safe person is often the first healing experience.');
E('cht','Complex (Developmental) Trauma','Trauma that is repeated and relational, often from caregivers, over a long time. It shapes emotion regulation, self-image and relationships, not only memories.',
'chronic tension;exhaustion;feeling unsafe in the body','I am bad;People will hurt me;I can\'t trust my own feelings','emotional swings;isolating;over-attaching;difficulty with conflict',
'Ongoing harm from those meant to protect>Can\'t escape or fight>Adapt by shutting down or pleasing>Core beliefs about self form>Relationships repeat the pattern>Feeling "broken"',
'Which patterns feel like "just who I am" but may be adaptations?;What helps me feel even slightly safe?;What would a protective adult have said to me?','safety;consistency;trust;self-worth','I am fundamentally flawed;Closeness equals danger',
'Work in phases: stabilise, then process, then integrate;Learn regulation skills before revisiting memories;Seek therapy experienced in complex trauma (e.g. IFS, schema, EMDR, SE)','Long-term, safe, consistent relationships are the medicine for long-term relational harm.');
E('cht','Emotional Flashbacks','Sudden waves of old feelings (terror, shame, helplessness) without a clear memory attached. You feel like a small child again, though you may not realise it.',
'sudden collapse or panic;shrinking;heavy chest;tears','I\'m in trouble;I\'m worthless;I can\'t cope;Everyone is against me','hiding;freezing;over-apologising;lashing out',
'Present trigger (tone, look, criticism)>Old emotional memory activates>Feels like now, not then>Child-state reactions>Shame about reacting>More sensitivity',
'How old do I feel right now?;What happened just before this started?;What does the younger me need to hear?','safety;reassurance;orientation to now','I am still that powerless child;These feelings will never end',
'Say: "I am having a flashback. It will pass";Orient: name today\'s date, where you are, your age;Speak to the younger you with kindness and protection','A calm, kind voice (yours or another\'s) helps the nervous system realise "that was then, this is now."');
E('cht','Dissociation','A protective disconnection from thoughts, feelings, body or surroundings when experiences are too much. In childhood it may have been the only escape.',
'numbness;foggy;floaty;feeling unreal;time gaps','This isn\'t real;I\'m not here;Nothing matters','zoning out;losing time;going on autopilot;staring',
'Overwhelm>Mind "leaves" to protect>Relief through numbness>Life feels distant>Disconnection becomes default under stress',
'When do I zone out most?;What was happening just before?;What brings me back to my body?','safety;presence;connection','Feeling is dangerous;Leaving is the only way to survive',
'Ground through the senses (5-4-3-2-1, holding something textured);Notice early signs (going foggy) and act early;Talk to a trauma-informed professional, especially if you lose time','Being gently accompanied, rather than pushed, helps the parts that "left" feel safe to return.');
E('cht','The Inner Child','A way of describing the young parts of you that still carry childhood feelings, needs and beliefs. Caring for these parts can soften old reactions.',
'tight throat;sudden tears;feeling small','I need someone to look after me;I\'m too much;No one is coming','sulking;clinging;tantrums;hiding needs',
'Present situation>Young part triggered>Child-like reaction>Adult self criticises the reaction>Young part feels rejected again',
'How old does this part of me feel?;What did that child need most?;How can I give some of that now?','comfort;play;protection;acceptance','My needs are too much;I was never lovable',
'Keep a childhood photo and speak to it kindly;Do one playful thing a week (draw, play, explore);Write "a letter to little me" from your adult self','Many find comfort in being "a child" before a loving Father, held rather than performing.');
E('cht','Toxic Shame From Childhood','Shame learned through repeated criticism, neglect or abuse. It becomes a core belief that you are defective, not that something bad happened to you.',
'shrinking;hot face;wanting to disappear','I am bad;I am disgusting;I don\'t deserve good things','perfectionism;hiding;self-sabotage;people-pleasing',
'Child is shamed or neglected>Child concludes "I am the problem">Shame becomes identity>Adult hides or overperforms>Little real acceptance>Shame deepens',
'Whose voice says I am bad?;What did I need to hear instead?;Who could I share a little of my story with?','acceptance;dignity;innocence','It was my fault;I am fundamentally unlovable',
'Name it: "this is old shame, not truth";Return the shame: "this belongs to what was done to me";Share your story with a safe, compassionate person','The child was innocent. Grace speaks dignity to the place shame took it away.');
E('cht','Trauma Held in the Body','Trauma isn\'t only remembered in words. The body can hold tension, startle, pain and readiness as if danger continues.',
'chronic tension;headaches;gut problems;startle;shallow breath','My body is against me;I can\'t relax','bracing;avoiding touch;over-exercising or freezing',
'Past threat>Body stays braced>Chronic tension and alarm>Pain and fatigue>Body feels unsafe>More bracing',
'Where in my body do I hold the past?;What movement feels safe?;What sensations feel even slightly pleasant?','safety;release;comfort','Relaxing means being caught off guard',
'Gentle, safe movement (yoga, walking, stretching);Practise noticing pleasant sensations ("glimmers");Explore body-based therapy (SE, sensorimotor, trauma-informed yoga)','Healing involves the whole person: body, emotions, relationships and spirit.');
E('cht','Re-enactment in Adult Relationships','Unconsciously recreating childhood dynamics in adult relationships: choosing similar people, roles or conflicts.',
'familiar dread;"this feels like home" pull','This is what love feels like;It\'s always going to be like this','choosing unavailable or harsh partners;playing old roles',
'Familiar dynamic feels like "chemistry">Relationship repeats old pain>Old feelings flood in>Self-blame>Return to the familiar',
'Who does this person or situation remind me of?;What role am I playing (rescuer, pleaser, invisible)?;What would a healthy version feel like?','safety;healing;new experiences','I don\'t deserve better;Love must hurt',
'Notice the "familiar pull" and pause before acting on it;Date or befriend "slowly" and watch consistency;Practise new roles in safe relationships and therapy','Healthy relationships can feel unfamiliar at first; that is not a sign they are wrong.');
E('cht','Reparenting Yourself','Learning to give yourself the care, structure, protection and encouragement you didn\'t receive.',
'softening;calmer body over time','I can look after myself;I deserve care','routines;kind self-talk;protective boundaries;play',
'Notice an unmet need>Pause instead of criticising>Respond like a good parent>Need met>Trust in self grows',
'What kind of parent do I need to be to myself today?;Do I need comfort, structure or protection?;What would a loving parent say right now?','care;structure;protection;encouragement','No one will care for me;I don\'t deserve care',
'Ask three times a day "what do I need?";Build gentle routines (meals, sleep, rest);Use a loving parent voice: "You\'re safe, I\'ve got you"','Receiving care from others and from God helps you learn how to give it to yourself.');
E('cht','Post-Traumatic Growth','Positive change that can come from struggling with trauma: deeper relationships, new possibilities, personal strength, appreciation of life, spiritual change. Growth does not mean the trauma was good.',
'more ease;moments of peace;energy returning','I survived;My story isn\'t over;I can help others','new choices;helping others;meaningful work',
'Trauma>Struggle and pain>Making sense with support>New beliefs and meaning>Growth alongside scars',
'What have I learned about my strength?;How have my relationships or values changed?;What do I want my story to become?','meaning;hope;purpose;connection','Growth means forgetting the pain;I have to be grateful for what happened',
'Write your story in chapters, ending with "what I\'m building now";Use your experience to support others when you\'re ready;Celebrate growth without denying grief','Redemption stories hold both the wound and the new life.');

// MIND STATES & FOCUS
E('foc','Overthinking','Thinking about something over and over (analysing, replaying, predicting) without reaching action or peace. It feels productive but usually adds stress.',
'tense forehead;tight shoulders;poor sleep;tired eyes','What if…;What did they mean?;I need to figure this out first','delaying decisions;researching endlessly;asking many people;replaying conversations',
'Uncertain situation>Mind tries to think its way to certainty>No answer appears>Anxiety rises>Think harder>Exhaustion and paralysis',
'Is this thinking leading to an action?;What would I do if I had to decide in 10 minutes?;What feeling am I avoiding by thinking?','certainty;safety;control;peace','If I think enough, I\'ll prevent mistakes;Not thinking about it is irresponsible',
'Write it out (brain dump) and circle one actionable item;Set a decision deadline and a "good enough" standard;Shift into the body: walk, cook, do a task with your hands','Handing over what you cannot control (in prayer or by sharing) can quiet a mind that is trying to hold everything.');
E('foc','Brain Fog','Feeling mentally cloudy: slow thinking, poor memory, difficulty concentrating. Often linked to poor sleep, stress, burnout, dehydration, hormones, illness or medication. Persistent fog deserves a medical check.',
'heavy head;fatigue;slow reactions;eye strain','I can\'t think;I\'m losing it;Why can\'t I remember?','rereading;losing things;forgetting words;over-caffeinating',
'Poor sleep or chronic stress>Brain energy low>Focus and memory slow>Push harder or caffeine>More fatigue>Fog thickens',
'When is the fog worst and best?;How are my sleep, food, water and movement?;What has changed recently (stress, medication, health)?','rest;clarity;energy;care','I\'m just lazy;I should push through',
'Check basics first: sleep, water, food, movement, daylight;Do one task at a time and write things down;See a doctor if fog lasts weeks (thyroid, iron, B12, sleep apnoea, post-viral issues)','Caring for the body is part of caring for the mind.');
E('foc','Focused Work','Sustained attention on one demanding task without switching. The brain does its best thinking in uninterrupted blocks (often called "deep work").',
'settled breathing;absorbed;time passes','I know what I\'m doing next;Stay with it','single-tasking;working in blocks;ignoring notifications',
'Clear goal>Remove distractions>Start small>Attention warms up (10–20 min)>Deep focus>Rest and review',
'When and where do I focus best?;What usually breaks my focus?;What is the single most important task today?','clarity;meaning;competence','I work best under pressure;Multitasking is efficient',
'Block 60–90 minutes for one task and put it on your calendar;Phone in another room, notifications off;Write the next step before you stop','Focused attention is a form of care: for the work and the people it serves.');
E('foc','Distraction & Attention Residue','Every switch of attention leaves "attention residue": part of your mind stays on the last task, so focus is weaker for a while.',
'restless;itchy to check;scattered energy','Just a quick check;I\'ll miss something;Where was I?','checking phone;switching tabs;starting many things',
'Boredom or difficulty>Urge to check>Switch task>Small dopamine hit>Residue left behind>Harder to focus>Urge to check again',
'How often do I switch tasks in an hour?;What am I avoiding when I check?;Which notifications truly matter?','stimulation;connection;relief','I must be reachable all the time;Checking is harmless',
'Batch messages at set times;Close everything except the current task;When you notice the urge, write it on a "later" list and return','Being fully present with one task or person is a quiet discipline worth practising.');
E('foc','Changing Your State','Your state (energy, emotion and focus) is not fixed. Breath, movement, posture, temperature, light, sound and people can shift it within minutes.',
'too high: racing, tense;too low: heavy, flat','I\'m stuck feeling like this;I can\'t start until I feel ready','waiting for mood to change;scrolling to escape',
'Notice current state>Name it (wired, flat, foggy, scattered)>Choose a matching shift tool>Body changes>Mind follows>New state',
'What state am I in right now?;What state do I need for the next task?;Which tools work fastest for me?','energy;calm;control','Feelings must change before actions;I have no control over my state',
'Down-shift: slow exhales, dim light, warm drink, slow walk;Up-shift: stand, brisk walk, cold water on face, upbeat music, daylight;Use the State Shift Menu practice and track what works','Worship, singing and gathering together are ancient state-changing practices.');
E('foc','Flow States','Flow is full absorption in a challenging task: time distorts, self-consciousness fades and action feels effortless. It happens when challenge slightly exceeds skill and goals and feedback are clear.',
'calm energy;relaxed focus;losing track of time','This is going well;What\'s next?','immersion;working without forcing;creative output',
'Clear goal>Challenge matched to skill>Immediate feedback>Deep concentration>Flow>Satisfaction and recovery',
'When have I lost track of time doing something?;What conditions were present?;How can I design those conditions into my week?','mastery;meaning;joy','Flow is luck;I can only work under stress',
'Set one clear goal for the session;Make the task 4% harder than comfortable;Protect a 90-minute uninterrupted block and rest afterwards','Creating and working well can be an expression of joy and calling.');
E('foc','Mental Fatigue','Tiredness from sustained mental effort, decisions and emotional work. Unlike physical tiredness, it can hide behind restlessness and irritability.',
'heavy eyes;irritability;headache;craving sugar or scrolling','I can\'t think anymore;Everything is too much','mistakes;procrastinating;snapping;scrolling',
'Long mental effort>Brain resources drop>Focus and self-control fall>Push on with caffeine>Quality drops>Longer recovery needed',
'When does my mental energy run out?;What recovers me best?;Am I taking breaks before I\'m empty?','rest;recovery;variety','Breaks are for the weak;More hours equals more output',
'Take a 5–10 minute break every 60–90 minutes (away from screens);Do hard thinking in your peak hours;Recover with walks, nature, naps (10–20 min) and sleep','Rest is part of a faithful rhythm, not a reward for finishing.');
E('foc','Decision Fatigue','After many decisions, the quality of choices drops: we default, avoid or choose impulsively.',
'tiredness;irritability;heaviness','I don\'t care, you choose;I\'ll decide later','impulse buying;avoiding choices;defaulting',
'Many decisions>Mental energy drains>Shortcuts or avoidance>Poor choices>Regret>More decisions to fix',
'How many small decisions do I make daily?;Which can I automate?;When am I freshest for big decisions?','simplicity;clarity;energy','Every decision must be perfect',
'Automate routines (meals, clothes, schedules);Make important decisions in the morning;Use simple rules ("If it costs under X, I decide in 2 minutes")','Simplicity can be a spiritual practice that frees energy for what matters.');
E('foc','Getting Started (Activation Energy)','The hardest part of most tasks is the beginning. Starting requires a burst of "activation energy"; once moving, momentum helps.',
'heaviness;restlessness;dread','I\'ll start when I feel like it;It\'s too big','waiting;preparing endlessly;doing easier tasks',
'Big vague task>Starting feels heavy>Avoid>Guilt grows>Task feels bigger>Harder to start',
'What is the smallest possible first step?;What would make starting 20% easier?;What time and place cue could trigger it?','momentum;clarity;ease','Motivation comes before action',
'Use the 2-minute start: commit to only 2 minutes;Prepare the environment the night before;Use an if-then plan: "When I sit at my desk at 9, I open the document"','Small faithful starts add up over time.');
E('foc','Racing Mind at Night','When the day goes quiet, the mind speeds up with worries, plans and replays, making sleep hard.',
'alert at bedtime;heart beating;tossing and turning','I need to remember this;What if tomorrow goes wrong?;I must fall asleep now','checking the clock;scrolling;getting up repeatedly',
'Quiet bedtime>Unprocessed thoughts surface>Mind races>Frustration at not sleeping>More arousal>Sleep delayed',
'What thoughts come most at night?;Do I give myself time to process during the day?;What calms my body before bed?','rest;safety;closure','I can force myself to sleep;If I stop thinking, I\'ll forget',
'Do a 10-minute brain dump 1–2 hours before bed;Keep a wind-down routine: dim lights, no screens, slow breathing;If awake 20 minutes, get up and do something calm in dim light','"He gives to his beloved sleep": rest can be received, not forced.');

// ===== NEW BRAIN MAPS =====
N('n20','The Attention Networks','Attention is not one thing. Three networks alert you, orient you and keep you on task, while the default mode network takes over when you drift.','brain','pfc,acc,pariet,thal',
'Alerting: get ready>Orienting: select what to focus on>Executive control: stay on task, ignore distractions>Mind wanders: default mode returns>Notice and bring attention back',true,
[['Alerting','Readiness, driven by noradrenaline from the brainstem'],['Orienting','Choosing where to point attention (parietal areas)'],['Executive control','Holding goals and resisting distraction (prefrontal cortex and ACC)'],['Re-focusing','Each time you notice wandering and return, you train the network']],
'Treat each return of attention as a repetition, not a failure;Reduce cues that grab orienting (notifications, open tabs);Train focus with short daily mindfulness','Attention is love in practice: what we attend to shapes who we become.');
N('n21','Arousal, Focus & Flow Chemistry','Performance follows an inverted-U: too little arousal is foggy, too much is frantic. Noradrenaline, dopamine and acetylcholine tune the "just right" focus zone where flow becomes possible.','brain','pfc,vta,bstem',
'Low arousal: foggy, bored>Rising arousal: alert and engaged>Optimal zone: focused, flow possible>Too much: anxious, scattered>Recover and reset',false,
[['Noradrenaline','Alertness and urgency from the brainstem (locus coeruleus)'],['Dopamine','Motivation, wanting and reward from progress'],['Acetylcholine','Sharpens attention to detail'],['Inverted-U','Yerkes–Dodson pattern: moderate arousal works best for complex tasks']],
'If foggy, raise arousal (move, light, cold water);If frantic, lower it (slow exhale, single task);Use small wins to give dopamine a reason to keep you going','Joy in the work itself is a sustainable fuel.');
N('n22','How the Brain Changes State','Your brain constantly shifts between states (alert, calm, drowsy, threatened, focused) using brainstem arousal systems, hormones and body feedback. Breathing is one of the few levers you control directly.','brain','bstem,hypo,insula,pfc',
'Input (thought, cue, body signal)>Brainstem and hypothalamus adjust arousal>Heart, breath and hormones change>Insula reads the body>Brain updates your state',true,
[['Bottom-up','Change the body (breath, movement, temperature) to change the mind'],['Top-down','Change attention and meaning to change the body'],['Exhale','Long exhales slow the heart via the vagus nerve'],['State-dependent learning','We learn best in the state we will need to use it']],
'Use one bottom-up tool and one top-down tool together;Practise calming tools when calm so they work under stress','Rhythms of prayer, song and silence shift our state together.');
N('n23','Trauma and the Developing Brain','Ongoing stress in childhood can tune the brain for survival: a more reactive alarm, a stress system that stays on, and strategies like dissociation. Because the brain stays plastic, safe relationships and practice help it retune.','brain','amyg,hippo,pfc,hypo',
'Childhood threat without enough support>Alarm system sensitised>Stress hormones often high>Survival strategies learned>Adulthood: safety + practice + relationship>Gradual retuning',false,
[['Sensitisation','The alarm fires faster and stronger after repeated threat'],['Adaptation, not damage','Changes were the brain doing its job in a dangerous setting'],['Plasticity','The brain can change throughout life'],['Relational repair','Safe, attuned relationships are central to healing']],
'Learn your alarm signs and regulation tools first;Choose relationships and therapy that feel steady;Expect slow, real change rather than quick fixes','Safe love in the present can begin to rewrite what fear wrote in the past.');

// ===== NEW METAPHORS =====
M('tabs','Too Many Open Tabs','An overthinking or foggy mind is like a browser with dozens of tabs open: everything slows down and nothing gets full attention.',
'Current task;Background worries;Unfinished tasks;Notifications;Close and capture','Work;Bedtime;Studies;Relationships;Planning;Decisions',
'Capturing tabs on paper frees the mind to run one tab well.','Brain dump every open loop;Close all but one tab, literally and mentally','Overthinking;Brain Fog;Distraction & Attention Residue');
M('spotlight','The Spotlight of Attention','Attention works like a spotlight: wherever you point it becomes bright and everything else dims. Distractions keep yanking the light away.',
'The spotlight (focus);What is lit (the task);Shadows (ignored);Hands that grab the light (distractions);You at the controls','Work;Conversation;Prayer;Studying;Driving;Parenting',
'You can\'t stop the hands grabbing the light, but you can keep bringing it back.','Notice where the light is right now;Remove one "hand" (notification) today','Focused Work;The Attention Networks');
M('dial','The State Dial','Your state is like a dial from "shut down" to "overdrive." Different tools turn it up or down; the goal is the right setting for the task.',
'Shut down (too low);Foggy and flat;Just right: focused;Edgy;Overdrive (too high)','Morning;Meetings;Creative work;Bedtime;Exams;Conflict',
'There is no perfect state, only the right state for what you\'re about to do.','Rate your dial now;Pick one tool to move it one notch','Changing Your State;Window of Tolerance');

// ===== NEW COMPARISONS =====
C('Overthinking vs. Problem-Solving vs. Reflection','Three ways of thinking about a problem. Only two of them help.',
[['Overthinking',0],['Problem-solving',150],['Reflection',258]],
[['Focus','What could go wrong','What can I do?','What can I learn?'],['Time','Past and future loops','Present and next steps','Past, with curiosity'],['Feels like','Stuck, anxious','Purposeful','Calm, honest'],
 ['Ends with','No decision','A decision or action','Insight'],['Switch by','Write it out and set a deadline','Keep going','Keep it time-limited']],null,'Overthinking;Rumination;Excessive Worry');
C('Flow vs. Hyperfocus vs. Distraction','Different attention states with different costs and benefits.',
[['Flow',150],['Hyperfocus',40],['Distraction',0]],
[['Attention','Absorbed, flexible','Locked in, rigid','Scattered'],['Choice','Chosen task','May be the wrong task','Pulled by cues'],['After','Satisfied, tired in a good way','Drained, things neglected','Restless, behind'],
 ['Body','Calm energy','Ignores hunger and needs','Restless, tense'],['Support with','Clear goals, right challenge','Timers, check-ins','Remove cues, single-task']],null,'Flow States;Focused Work;Distraction & Attention Residue');
C('Single-Event vs. Complex vs. Developmental Trauma','Types of trauma differ in pattern and effects.',
[['Single-event',205],['Complex',300],['Developmental',110]],
[['Pattern','One overwhelming event','Repeated, often relational','During childhood, from caregivers or environment'],['Common effects','Flashbacks, avoidance','Emotional dysregulation, shame, trust issues','Identity, attachment, regulation'],['Healing focus','Process the memory','Stabilise, then process','Safe relationships, reparenting, regulation'],
 ['Therapies','TF-CBT, EMDR','Phase-based therapy, IFS, schema','Attachment-based, SE, IFS, schema']],null,'Understanding Childhood Trauma;Complex (Developmental) Trauma');

// ===== NEW SCALES =====
S('Arousal & Focus Curve','Too little arousal feels foggy; too much feels frantic. Where are you?','bar',
[['Drowsy','Sleepy, slow','Light, movement, cold water'],['Foggy','Unfocused, flat','Brisk walk, music, start with a small task'],['Focused','Alert and calm; flow possible','Protect it: one task, no notifications'],
 ['Wired','Restless, jumpy','Slow exhales, write a to-do list'],['Frantic','Anxious, scattered','Stop, breathe, single-task, take a break']],220,0,'Arousal, Focus & Flow Chemistry;Changing Your State');
S('Mental Clarity Scale','How clear is your thinking right now?','bar',
[['Heavy fog','Can\'t think','Rest, water, food; see a doctor if ongoing'],['Fog','Slow, forgetful','Write things down; simple tasks only'],['Partly clear','Some focus','Single-task; short blocks'],
 ['Clear','Thinking well','Do important work now'],['Sharp','Fast, creative','Tackle hardest problems']],220,150,'Brain Fog;Mental Fatigue');
S('Focus Depth Scale','How deep is your focus in this session?','bar',
[['Scattered','Constant switching','Close tabs, phone away'],['Shallow','Easily interrupted','Set a 25-minute timer'],['Engaged','Mostly on task','Remove one more distraction'],
 ['Deep','Absorbed, few interruptions','Keep going; note ideas for later'],['Flow','Effortless, time disappears','Enjoy; rest afterwards']],0,150,'Focused Work;Flow States');

// ===== NEW FLOWCHARTS =====
F('My mind won\'t settle or focus','foc',{q:'What is your mind doing?',o:[
 ['Going round in circles',{q:'About the past or the future?',o:[['Past','Rumination;Overthinking'],['Future','Excessive Worry;Overthinking']]}],
 ['Foggy and slow','Brain Fog;Mental Fatigue'],['Jumping between things','Distraction & Attention Residue;Focused Work'],
 ['Can\'t get started','Getting Started (Activation Energy);Procrastination'],['Too wired or too flat','Changing Your State;Window of Tolerance'],
 ['Racing at bedtime','Racing Mind at Night'],['I want deeper focus','Flow States;Focused Work']]});
F('My past keeps showing up','cht',{q:'How does it show up?',o:[
 ['Sudden waves of old feelings','Emotional Flashbacks;Emotional Triggers'],['Feeling numb or unreal','Dissociation;Shutdown & Hypoarousal'],
 ['Feeling deeply bad about myself','Toxic Shame From Childhood;Shame'],['In my body','Trauma Held in the Body;Tension & Being on Alert'],
 ['In my relationships','Re-enactment in Adult Relationships;Repeating Relationship Patterns'],['I want to heal and grow',{q:'Where are you starting?',o:[['Understanding it','Understanding Childhood Trauma;Complex (Developmental) Trauma'],['Caring for myself','The Inner Child;Reparenting Yourself'],['Moving forward','Post-Traumatic Growth']]}]]});
// ===== PRACTICE TOOLKIT =====
const PR={};
function P(code,t,w,time,u,steps,fixes,why,o={}){const m={type:'P',area:'tlk',code,t,w,time,u,steps:sp(steps),fixes:fixes.split(/;(?=[^;]*=>)/).map(x=>x.split('=>').map(y=>y.trim())),why,...o};PR[code]=m;MAPS.push(m)}
const WHEN={now:'In the moment',daily:'Daily practice',deep:'Deeper work'};

// --- calm & regulate (in the moment)
P('sigh','The Physiological Sigh','now','1–2 min','The fastest known breathing tool to lower stress: two inhales through the nose, one long exhale through the mouth.',
'Breathe in through your nose until your lungs feel full;Take a second, short sip of air through the nose on top;Exhale slowly through the mouth until empty, longer than the inhale;Repeat 3–5 times;Notice your shoulders and jaw soften',
'I feel lightheaded => Slow down and do fewer rounds; breathe normally in between;I forget to use it => Link it to a cue: before opening email, before hard conversations;It feels silly => Do it quietly; nobody can tell',
'Long exhales activate the vagus nerve and slow the heart. A 2023 Stanford study found daily cyclic sighing improved mood more than mindfulness meditation.',{pace:[2,1,6,0]});
P('box','Box Breathing','now','2–4 min','Even, square breathing to steady the mind under pressure.',
'Breathe in for 4 counts;Hold for 4;Breathe out for 4;Hold empty for 4;Repeat for 2–4 minutes, tracing a square with your eyes or finger',
'Holding feels uncomfortable => Shorten holds to 2 counts or skip them;My mind wanders => Count on your fingers;It doesn\'t calm me => Try extended-exhale breathing instead',
'Steady rhythm and breath control give the brain a predictable focus and reduce arousal.',{pace:[4,4,4,4]});
P('exhale','Extended-Exhale Breathing','now','2–5 min','Make your out-breath longer than your in-breath to switch the body toward calm.',
'Sit or stand with feet on the floor;Breathe in through the nose for 4;Breathe out slowly through pursed lips for 6–8;Keep it gentle, not forced;Continue for 10 breaths',
'I get anxious focusing on breath => Keep eyes open and look at something calming while you breathe;I can\'t breathe out that long => Use 3 in and 5 out;Doesn\'t help in panic => Combine with grounding (5-4-3-2-1)',
'The exhale slows the heart rate through the parasympathetic nervous system.',{pace:[4,0,7,0]});
P('ground','5-4-3-2-1 Grounding','now','3 min','Use your senses to come back to the present when anxious, dissociated or in a flashback.',
'Name 5 things you can see;Name 4 things you can feel (feet, chair, fabric);Name 3 things you can hear;Name 2 things you can smell;Name 1 thing you can taste, or one kind thing to say to yourself;Say today\'s date and where you are',
'I can\'t focus on the list => Just do "5 things I see" slowly, out loud;Still feel far away => Hold something textured or cold, stand and press your feet into the floor;It brings up memories => Open your eyes wider and describe colours in detail',
'Sensory detail engages orienting networks and tells the brain "I am here, now."');
P('orient','Orienting to Safety','now','2 min','Let your eyes slowly explore the room to signal safety to the nervous system.',
'Let your head and eyes turn slowly around the room;Notice what draws your eye, especially pleasant colours or objects;Pause on something neutral or pleasant;Notice exits, light and space;Check: has anything in your body shifted?',
'Looking around makes me more alert => Go slower and rest your eyes on one calming object;Nothing feels safe => Orient to the smallest safe thing (a plant, a mug);Not in a private place => Do it while appearing to look around normally',
'Orienting is an ancient mammal response: scanning and finding no threat lets the alarm settle.');
P('tipp','TIPP for Overwhelm (DBT)','now','5–10 min','Four fast body-based skills from DBT for when emotion is extremely high (7+/10).',
'Temperature: splash cool water on your face or hold a cool pack on your eyes for 30 seconds;Intense exercise: 5–10 minutes of fast walking, stairs or jumping jacks;Paced breathing: breathe out longer than in for 2 minutes;Paired muscle relaxation: tense a muscle group as you breathe in, release as you breathe out',
'I have a heart condition or eating disorder => Skip temperature and intense exercise; ask a doctor first;I can\'t move much => Use paced breathing and muscle relaxation only;Emotion returns later => Plan a follow-up skill (talk, journal, problem-solve)',
'Cool water on the face triggers the dive reflex, slowing the heart; exercise burns off stress hormones.',{caution:'Check with a doctor if you have heart problems, low blood pressure or an eating disorder.'});
P('label','Name It to Tame It','now','1 min','Put the feeling into words. Labelling emotions reduces amygdala activity.',
'Pause and notice what you feel;Find the body sensation (where is it?);Name it specifically: "I\'m feeling disappointed and a bit embarrassed";Rate it 0–10;Ask: "What does this feeling need?"',
'I don\'t know what I feel => Start with mad, sad, glad, scared or ashamed;Naming makes it bigger => Add distance: "I notice I\'m feeling…";I judge the feeling => Add "and that makes sense because…"',
'Affect labelling engages the prefrontal cortex, which calms the amygdala (Lieberman, UCLA).');
P('defuse','Cognitive Defusion','now','2 min','Step back from sticky thoughts so they lose their grip. From ACT.',
'Notice the thought (e.g. "I\'m useless");Add: "I\'m having the thought that I\'m useless";Then: "I notice I\'m having the thought that…";Give the story a name ("Ah, the Not-Good-Enough story");Return attention to what you were doing',
'The thought still feels true => You don\'t need to disbelieve it, just hold it more loosely;It comes back => That\'s normal; defuse again each time;Feels dismissive => Pair it with self-compassion',
'Changing your relationship to a thought reduces its power without arguing with it.');
P('surf','Urge Surfing','now','10–20 min','Ride out a craving or urge like a wave, without acting on it.',
'Notice the urge and name it ("there\'s the urge to check / eat / drink");Rate it 0–10;Locate where it lives in your body;Breathe into it and watch it rise, peak and fall;Re-rate every few minutes;Notice: urges pass even without action',
'The urge feels too strong => Delay for just 10 minutes, then decide;I give in => Note what happened without shame; try again next time;Urges keep coming => Change the environment to reduce cues',
'Each time an urge passes without being fed, the habit loop weakens (extinction learning).',{min:15});
P('stop','The STOP Skill','now','1 min','A quick pause between trigger and reaction.',
'Stop: freeze for a moment;Take a step back: breathe once deeply;Observe: what\'s happening inside and around me?;Proceed mindfully: what action fits my values?',
'I react before I remember => Practise STOP daily on small irritations;I stop but then react anyway => Add a physical step back (leave the room);I can\'t think during STOP => Just breathe; the thinking comes after',
'A pause gives the prefrontal cortex time to catch up with the alarm.');
P('scb','Self-Compassion Break','now','3 min','A three-step response to pain or failure (Kristin Neff).',
'Mindfulness: "This is a moment of suffering" or "This is hard";Common humanity: "Struggle is part of being human. Others feel this too";Kindness: hand on heart; "May I be kind to myself" or "What do I need?";Respond with one small act of care',
'It feels fake => Use words you\'d say to a friend;I feel worse at first => Common; old pain surfaces when kindness arrives; keep it short;I think I don\'t deserve it => Do it anyway as an experiment for a week',
'Self-compassion activates the soothing system and lowers threat responses (Gilbert, Neff).');
P('opp','Opposite Action (DBT)','now','5–30 min','When an emotion doesn\'t fit the facts, act opposite to its urge.',
'Name the emotion and its urge (shame → hide);Check the facts: does it fit the situation?;If not, choose the opposite action (shame → show up; fear → approach; sadness → activate);Do it all the way: posture, voice, face;Repeat until the emotion shifts',
'The emotion fits the facts => Use problem-solving instead;I do it half-heartedly => Change posture and voice too;It feels unsafe => Choose a small, safe version first',
'Acting differently gives the brain new evidence, gradually changing the emotional response.');
P('start2','The 2-Minute Start','now','2 min','Beat procrastination by committing to only two minutes.',
'Pick the task;Define a 2-minute version ("open the doc and write one sentence");Set a 2-minute timer;Start immediately, before thinking more;When the timer ends, choose to stop or continue',
'I still can\'t start => Make it smaller (just open the file);I always stop at 2 minutes => That\'s fine; a start is a win; repeat later;The task is unclear => Spend the 2 minutes writing the next step',
'Starting releases momentum; dopamine follows action, not the other way around.',{min:2});
P('dump','Brain Dump','now','10 min','Empty every open loop onto paper so your mind can stop holding it.',
'Set a 10-minute timer;Write everything on your mind: tasks, worries, ideas, reminders;Don\'t organise yet;Circle the 1–3 items that matter today;Schedule or delete the rest',
'The list is overwhelming => Only circle one item;New thoughts keep coming => Keep a "capture" note open all day;I lose the paper => Use one notebook or app consistently',
'Unfinished tasks keep pulling attention (Zeigarnik effect); a trusted plan releases them (Masicampo & Baumeister).',{min:10});
P('shift','The State Shift Menu','now','2–10 min','Match a tool to your current state to get into the right state for the next task.',
'Name your state: wired, flat, foggy, scattered or overwhelmed;Wired: long exhales, slow walk, dim light, warm drink;Flat or foggy: stand up, brisk walk, daylight, cool water, upbeat music;Scattered: brain dump, close tabs, one task, timer;Overwhelmed: TIPP, grounding, call someone;Re-rate after 5 minutes',
'Nothing works => Combine two tools (walk + music);I don\'t notice my state => Set 3 phone reminders a day to check;It works but doesn\'t last => Repeat every 90 minutes',
'Arousal follows the body: movement, breath, light and temperature are direct levers.');
P('reset','Brain Fog Reset','now','10–15 min','A quick routine to clear mental fog.',
'Drink a large glass of water;Get daylight: step outside or by a window;Move briskly for 5–10 minutes;Eat something with protein if you haven\'t eaten;Do one simple task to restart',
'I still feel foggy every day => Check sleep and see a doctor;Coffee helps but then I crash => Delay caffeine 60–90 minutes after waking;No time => Even 2 minutes of movement and water helps',
'Hydration, light and movement increase alertness via blood flow and arousal systems.',{min:10});
P('contain','The Container Exercise','now','5 min','Imagine safely storing disturbing memories or feelings until you can deal with them in a safe setting.',
'Imagine a strong container (vault, box, safe);Picture placing the memory or feeling inside;Close and lock it; it\'s not gone, just stored;Put the container somewhere safe;Return attention to the present',
'The container won\'t close => Make it bigger or stronger;Things leak out => Add another lock; use grounding;It feels like avoidance => It\'s temporary; you\'ll open it in therapy when ready',
'A resourcing skill from trauma therapy (EMDR) that builds control and stability.');
P('reach','Reach-Out Script','now','5 min','Ask for connection or support when you\'re struggling.',
'Pick one safe person;Send a short message: "Having a rough day, could you talk for 10 min?";If not available, ask another person;Share as much as feels safe;Thank them',
'I feel like a burden => Most people feel good helping;No one is available => Use a helpline or support group;It\'s hard to start => Use the script word for word',
'Co-regulation through connection calms the nervous system.');

// --- daily practices
P('pmr','Progressive Muscle Relaxation','daily','10–15 min','Tense and release muscle groups to release stored tension.',
'Lie or sit comfortably;Starting with feet, tense the muscles for 5 seconds;Release for 10 seconds and notice the difference;Move up: calves, thighs, belly, hands, arms, shoulders, face;Finish with three slow breaths',
'I fall asleep => Great at bedtime; sit up for daytime;Tensing hurts => Use 50% effort;Hard to remember the order => Follow an audio guide',
'Contrasting tension and release teaches the body what relaxation feels like.',{min:12});
P('scan','Body Scan','daily','10 min','Move attention slowly through the body to build interoception.',
'Lie or sit;Bring attention to the soles of the feet;Move slowly upwards, noticing sensations without judging;If you find tension, breathe into it;End by sensing the whole body',
'Some areas feel uncomfortable => Skip them or keep eyes open (trauma-sensitive);I get bored => Shorten to 3 minutes;I can\'t feel anything => Notice neutral sensations (temperature, contact)',
'Interoceptive practice strengthens the insula and emotional awareness.',{min:10});
P('record','Thought Record (CBT)','daily','10–15 min','Catch, check and change unhelpful thoughts.',
'Situation: what happened?;Feeling: name it and rate 0–100;Automatic thought: what went through your mind?;Evidence for and evidence against;Balanced thought: a fairer statement;Re-rate the feeling',
'I can\'t find evidence against => Ask: what would a friend say?;The balanced thought doesn\'t feel true => Make it more modest;Feels like homework => Do it in your head for small things',
'Testing thoughts engages the prefrontal cortex and weakens automatic patterns (Beck).');
P('worry','Worry Time','daily','15 min','Postpone worries to a scheduled daily slot.',
'Pick a 15-minute time each day (not near bedtime);During the day, write worries down and say "later";At worry time, review the list;Sort: solvable (make a plan) vs. unsolvable (practise letting go);When time ends, stop',
'Worries won\'t wait => Write them down and set a reminder;Worry time makes me anxious => Shorten it and end with a calming activity;Same worries every day => Problem-solve them once',
'Postponement reduces the sense that worry is uncontrollable (Borkovec).',{min:15});
P('ba','Behavioural Activation','daily','15 min plan','Schedule activities that give pleasure or mastery to lift mood and energy.',
'List activities that once gave you pleasure or a sense of achievement;Pick one small one for today;Schedule it with a time and place;Do it whatever your mood;Rate mood before and after',
'I don\'t enjoy anything => Pick something that used to help; enjoyment may lag;I keep cancelling => Make it smaller and pair it with a person;Mood didn\'t change => Track over a week, not one day',
'Action before motivation: activity rebuilds reward pathways (strong evidence for depression).');
P('ifthen','If-Then Plans','daily','5 min','Decide in advance what you will do in specific situations.',
'Pick a goal or habit;Identify a cue (time, place or feeling);Write: "If [cue], then I will [action]";Make the action small;Review and adjust weekly',
'I forget the plan => Write it on a sticky note at the location;The cue doesn\'t happen => Choose a more reliable cue;Too many plans => Start with one',
'Implementation intentions roughly double follow-through in studies (Gollwitzer).');
P('deepw','The Deep Work Block','daily','60–90 min','A protected session of focused work on one important task.',
'Choose one task and write the specific outcome;Block 60–90 minutes in your calendar;Phone in another room, notifications off, close tabs;Start with a 2-minute warm-up;Keep a "later" list for distractions;End by writing the next step',
'I get interrupted => Tell people and use a "do not disturb" sign;I can\'t focus that long => Start with 30 minutes and build;I feel restless => Take a 2-minute movement break and return',
'Single-tasking avoids attention residue (Leroy) and lets focus deepen.',{min:60});
P('pomo','Pomodoro Sprints','daily','25 + 5 min','Work in short timed sprints with breaks.',
'Choose one task;Set a timer for 25 minutes;Work only on that task;Take a 5-minute break away from screens;After four rounds, take a longer break',
'25 minutes is too long => Try 15;Breaks become scrolling => Stand, stretch, drink water instead;I get into flow and the timer breaks it => Ignore the timer and keep going',
'Time-boxing reduces the activation energy of starting and protects focus.',{min:25});
P('flow','Flow Setup Checklist','daily','5 min setup','Design the conditions that make flow more likely.',
'Set one clear goal for the session;Adjust difficulty: just beyond your comfort zone;Arrange feedback: how will you know you\'re progressing?;Remove interruptions for 90 minutes;Warm up with an easy related task;Rest after the session',
'It\'s too hard and I get anxious => Lower the challenge;It\'s boring => Raise the challenge or add a time limit;I never reach flow => Expect 15–20 minutes of struggle first',
'Flow emerges when challenge and skill are balanced (Csikszentmihalyi).');
P('sleep','Sleep Wind-Down Routine','daily','30–60 min','A consistent routine that tells the brain it\'s time to sleep.',
'Set a regular bedtime and wake time;One hour before bed: dim lights, screens off;Brain dump worries;Do something calming (read, stretch, pray, shower);If awake for 20 minutes, get up and do something calm in dim light',
'I can\'t give up my phone => Charge it outside the bedroom;Thoughts race => Use a brain dump and slow breathing;Weekends ruin it => Keep wake time within an hour',
'Regular timing anchors the body clock; low light allows melatonin release.');
P('safe','Safe Place Imagery','daily','5–10 min','Build an inner place of calm you can return to.',
'Imagine a place, real or imagined, where you feel safe and calm;Add sensory details: sights, sounds, smells, temperature;Notice where you feel calm in your body;Give it a cue word;Practise daily so it\'s ready when needed',
'I can\'t think of a safe place => Imagine one from a book or film, or a safe person;Bad memories intrude => Change the place or open your eyes;It feels empty => Add a safe companion',
'Resourcing builds a positive memory network to anchor regulation.');
P('glim','Glimmers Practice','daily','2 min','Notice small moments of safety and joy (the opposite of triggers).',
'Look for small moments of ease: sunlight, a smile, a warm drink;Pause for 10 seconds to really notice it;Feel it in your body;Write down three glimmers a day',
'I can\'t find any => Start with the smallest neutral moment;It feels forced => Just notice, no need to feel grateful;I forget => Set a reminder',
'Lingering on positive moments helps them get stored in memory (Hanson\'s "taking in the good").');
P('ba2','Movement for Mood','daily','20–30 min','Use movement to regulate mood and boost brain plasticity.',
'Pick movement you can enjoy (walk, dance, cycle);Aim for 20–30 minutes most days;Go outside if possible;Notice mood before and after',
'I have no energy => Start with 5 minutes;I hate exercise => Walk with a friend or podcast;I miss days => Restart without guilt',
'Aerobic exercise boosts BDNF, supporting neuroplasticity and mood.');

// --- deeper work
P('solve','Problem-Solving Steps','deep','20 min','A structured way to tackle real problems.',
'Define the problem specifically;Brainstorm options without judging;List pros and cons of the top three;Choose one and plan the first step;Do it, then review what happened',
'Too many problems => Pick the one causing most stress;No good options => Choose the least bad and adjust;I don\'t follow through => Use an if-then plan',
'Structured problem-solving reduces worry and helplessness.');
P('ladder','Fear Ladder (Graded Exposure)','deep','weeks','Face fears step by step so the brain learns they are safe.',
'List situations you avoid, rating fear 0–10;Order them from easiest to hardest;Start with a 3–4 step;Stay in it until fear drops by about half (no safety behaviours);Repeat until easy, then move up a step',
'Fear doesn\'t drop => Stay longer or choose an easier step;I use safety behaviours => Drop them one at a time;I skip steps => Go slower; consistency beats speed',
'Exposure creates new safety learning that competes with the fear memory (inhibitory learning).');
P('letter','Compassionate Letter','deep','20 min','Write to yourself from the perspective of a compassionate friend.',
'Think of something you criticise yourself for;Imagine a wise, kind friend who knows all of you;Write a letter from them to you;Include understanding, kindness and encouragement;Read it aloud later',
'I can\'t imagine kindness => Use someone you know or a spiritual figure;It feels insincere => Keep it honest; kindness isn\'t denial;It brings up pain => Go gently; use grounding afterwards',
'Activates the soothing system and builds new self-talk pathways (CFT).');
P('critic','Talking Back to the Inner Critic','deep','15 min','Recognise and respond to the critic rather than obey it.',
'Write down the critic\'s exact words;Notice whose voice it sounds like;Ask: what is it trying to protect me from?;Write a response from your wise, kind self;Practise the response aloud',
'The critic is louder => Lower your expectations; just notice it;I agree with the critic => Ask what a friend would say;It gets worse => Seek support from a therapist',
'Changing your relationship to the critic builds alternative self-talk pathways.');
P('dearman','DEAR MAN: Asking Assertively','deep','10 min prep','A DBT script for asking for what you need.',
'Describe the facts;Express your feelings ("I feel…");Assert your request clearly;Reinforce: explain the benefits;Stay Mindful: keep to your point;Appear confident: steady voice;Negotiate: be willing to give a little',
'I get flustered => Write the script and practise aloud;They argue => Repeat your request calmly ("broken record");I give in => Decide your bottom line beforehand',
'Clear structure lowers anxiety and increases effectiveness (Linehan).');
P('bscript','Boundary Script','deep','10 min prep','Set a clear, kind limit.',
'Name the behaviour: "When you…";Say your feeling: "I feel…";State the limit: "I\'m not able to / I need…";Say what you will do: "If it happens again, I will…";Follow through',
'I feel guilty => Guilt is not proof you did wrong;They push back => Repeat the boundary calmly;I don\'t follow through => Choose a consequence you can keep',
'Consistency teaches others and rewires your own fear of conflict.');
P('repair','Repair Conversation','deep','20 min','Reconnect after a conflict.',
'Wait until both of you are calm;Name what happened from your side;Own your part without excuses;Ask how it affected them and listen;Agree on one change;Reconnect: a hug, a kind word, time together',
'They aren\'t ready => Give space and offer again later;I feel defensive => Focus only on your part;It happens again => Repair again; patterns change slowly',
'Rupture and repair builds secure attachment and trust.');
P('swap','Habit Swap','deep','2–4 weeks','Change a habit by keeping the cue and reward but swapping the routine.',
'Track the habit for a week: cue, routine, reward;Identify the real reward (relief, connection, stimulation);Choose a new routine that gives a similar reward;Make it easy and visible;Repeat daily; expect slips',
'I slip back => Note the cue and adjust;The new routine isn\'t rewarding => Try another;Too many habits => Start with one',
'Habits live in cue-routine-reward loops; replacing the routine rewires the loop (Duhigg; Graybiel).');
P('reparent','Reparenting Dialogue','deep','15 min','Give your younger self the care they missed.',
'Find a photo of yourself as a child, or imagine your younger self;Notice what they feel;Ask: what do you need right now?;Respond as a loving parent: "You\'re safe, I\'m here";Do one caring action today',
'It feels silly => Try writing instead of speaking;It\'s overwhelming => Keep it short and ground afterwards;I feel angry at the child => Notice that critic and gently set it aside',
'Compassionate imagery activates the soothing system and updates old emotional learning.');
P('lament','Writing a Lament','deep','20 min','Express pain honestly, following the structure of biblical laments.',
'Address: speak to God (or write to the one who understands);Complaint: name the pain honestly;Request: ask for what you need;Trust: express any trust you can, even small;Praise or hope: end with what you hold onto',
'I can\'t find trust => Leave it blank; honesty is enough;It feels disrespectful => Many psalms are raw;I feel worse => Ground and share it with someone',
'Expressive writing reduces stress and helps integrate painful experiences (Pennebaker).');
P('values','Values Compass','deep','30 min','Identify what matters most and use it to guide choices.',
'List 10 values that matter to you;Narrow to 5, then 3;For each, rate how much you live it (0–10);Choose one small action per value this week;Review weekly',
'Everything matters => Ask what you\'d want said at your 80th birthday;Values conflict => Choose for this season, not forever;I don\'t act on them => Use if-then plans',
'Values-guided action increases meaning and psychological flexibility (ACT).');
P('review','Weekly Review & Progress Log','deep','20 min','Track progress and plan the next week.',
'Review the week: what went well?;What was hard?;What did I learn about my patterns?;Celebrate one win;Plan three priorities for next week',
'I skip it => Schedule it at the same time each week;I only see failures => List three wins first;It takes too long => Use the same 5 questions every time',
'Noticing progress maintains motivation and consolidates learning.');
P('forgive','Forgiveness Process','deep','weeks','A gradual path to release resentment while keeping safety.',
'Name the hurt fully and its impact;Feel the anger and grief, don\'t skip them;Decide to release the debt (it is a choice, not a feeling);Keep boundaries where needed;Repeat when the hurt returns',
'I can\'t forgive yet => That\'s okay; start with being willing to be willing;They aren\'t sorry => Forgiveness doesn\'t require their apology;It feels like excusing => Forgiveness names wrong as wrong',
'Forgiveness interventions reduce anger, anxiety and depression (Worthington, Enright).');
P('story','Writing Your Story in Chapters','deep','30 min','Make sense of your life story to integrate the past.',
'Divide your life into chapters;Give each chapter a title;Write key events, feelings and lessons;Notice strengths and turning points;Write the title of the next chapter',
'It brings up too much => Write one chapter at a time, with support;I don\'t remember => Write what you do remember;It feels negative => Add "what helped me survive"',
'Coherent narratives are linked to secure attachment and healing (Siegel).');
// ===== PRACTICAL PLAN LINKS: map title -> practice codes (now, daily, deep, extra) =====
const AREA_PLAN={anx:'exhale worry ladder',emo:'label scan opp',self:'scb record critic',rel:'label glim repair',fam:'scb story values',cht:'ground safe reparent',str:'exhale pmr safe',sab:'start2 ifthen swap',bnd:'stop dearman bscript',grf:'reach glim lament',bod:'scan pmr ba2',wrk:'shift deepw values',foc:'dump deepw flow',kno:'label review values',fth:'scb lament forgive',neu:'shift scan review',met:'label record values',cmp:'stop record dearman',scl:'shift glim review',flo:'label scan review',apr:'label record values'};
const PLAN={
// anxiety
'The Anxiety Cycle':'exhale label ladder','Excessive Worry':'dump worry solve','Rumination':'defuse ba2 solve','Intolerance of Uncertainty':'defuse ifthen ladder','Hypervigilance':'orient safe pmr',
'Anxious Avoidance':'exhale ifthen ladder','Fear of Making Mistakes':'scb record ladder','Fear of Failure':'scb record values','Fear of Judgment':'exhale record ladder','Need for Control':'dump worry solve',
// emotions
'Anger':'stop pmr dearman','Guilt':'scb record repair','Shame':'scb glim letter','Sadness':'label ba lament','Frustration':'stop ba2 solve','Resentment':'label record forgive','Envy':'label glim values','Loneliness':'reach ba values','Emotional Overload':'tipp dump solve','Difficulty Identifying & Expressing Emotions':'label scan story',
// self
'The Inner Critic':'defuse scb critic','Constant Comparison':'defuse glim values','Impostor Syndrome':'defuse review record','Need for Approval':'stop ifthen bscript','Low Self-Esteem':'scb ba letter','Self-Image':'defuse record story','Perfectionism':'start2 pomo record','Self-Worth':'scb glim letter','Authenticity vs. Adaptation':'label ifthen values','Self-Compassion':'scb glim letter',
// relationships
'Attachment Styles':'label glim story','Emotional Dependency':'exhale ba values','Codependency':'stop ifthen bscript','Fear of Abandonment':'exhale record dearman','Rejection Sensitivity':'stop record repair','Jealousy & Insecurity':'label record dearman','Difficulty Trusting':'orient glim ladder','Repeating Relationship Patterns':'stop review story','Emotional Unavailability':'label scan ladder','Fear of Intimacy':'exhale glim ladder',
// family
'Family Roles':'label review story','Parentification':'scb ba2 bscript','Family Triangulation':'stop ifthen bscript','Emotional Neglect':'label scan reparent','Family Expectations':'label record values','Guilt About Being Different':'scb record values','Relationship With the Mother Figure':'label glim story','Relationship With the Father Figure':'label glim story','Sibling Conflict':'stop record repair','Intergenerational Patterns':'label review story',
// childhood trauma
'Understanding Childhood Trauma':'ground safe story','Complex (Developmental) Trauma':'ground safe reparent','Emotional Flashbacks':'ground safe reparent','Dissociation':'ground scan contain','The Inner Child':'scb glim reparent','Toxic Shame From Childhood':'scb glim letter','Trauma Held in the Body':'orient pmr ba2','Re-enactment in Adult Relationships':'stop review story','Reparenting Yourself':'scb sleep reparent','Post-Traumatic Growth':'glim values story',
// stress
'Fight Response':'stop ba2 dearman','Flight Response':'orient scan ladder','Freeze Response':'orient ba2 ladder','Fawn Response':'stop ifthen bscript','Emotional Triggers':'ground record story','Window of Tolerance':'shift scan safe','Hyperarousal':'sigh pmr sleep','Shutdown & Hypoarousal':'orient ba2 ba','Felt Sense of Safety':'orient safe glim','Stabilising After Hard Experiences':'ground sleep safe',
// sabotage
'Procrastination':'start2 pomo swap','Self-Sabotage':'stop review values','Indecision':'dump ifthen solve','Avoiding Hard Tasks':'start2 pomo ladder','Excessive Reassurance Seeking':'surf ifthen ladder','Impulsivity':'stop surf swap','The Habit Loop':'surf ifthen swap','People-Pleasing':'stop ifthen bscript','Self-Pressure':'scb sleep values','The Quick-Relief Cycle':'surf ba2 swap',
// boundaries
'Personal Boundaries':'stop ifthen bscript','Difficulty Saying No':'stop ifthen bscript','Guilt About Setting Boundaries':'scb record bscript','Assertive Communication':'stop ifthen dearman','Passive Communication':'label ifthen dearman','Aggressive Communication':'stop pmr dearman','Passive-Aggressive Communication':'label record dearman','Hard Conversations':'exhale ifthen dearman','Expressing Needs':'label ifthen dearman','Repair After a Conflict':'stop ifthen repair',
// grief
'Understanding Grief':'reach glim lament','Anticipatory Grief':'label glim lament','Ambiguous Loss':'label glim story','The End of a Relationship':'reach ba story','Losing Someone Important':'reach glim lament','Job Loss':'shift ba values','Moving to a New City':'reach ba values','Life Transitions':'label review values','Grief Triggers':'ground glim lament','Rebuilding Meaning After Loss':'glim values story',
// body
'Body Image':'defuse glim letter','Body Shame':'scb scan letter','Physical Comparison':'defuse glim values','Your Relationship With Your Body':'scan ba2 values','Stress & Body Sensations':'exhale pmr ba2','Reading the Body\'s Signals':'label scan review','Tension & Being on Alert':'sigh pmr ba2','Intimacy & Vulnerability':'exhale glim dearman','Shame in Intimacy':'scb glim letter','The Body–Emotion Connection':'label scan ba2',
// work
'Burnout':'shift sleep values','Guilt About Resting':'scb sleep values','Overworking':'stop deepw values','Boundaries at Work':'stop ifthen bscript','Professional Impostor Syndrome':'defuse review record','Fear of Charging What You\'re Worth':'exhale record dearman','Money Beliefs':'label record story','Financial Anxiety':'exhale worry solve','Career Transition':'dump ifthen values','Purpose & Professional Values':'glim deepw values',
// focus
'Overthinking':'dump worry solve','Brain Fog':'reset sleep review','Focused Work':'start2 deepw flow','Distraction & Attention Residue':'dump pomo swap','Changing Your State':'shift ba2 review','Flow States':'shift flow deepw','Mental Fatigue':'reset sleep review','Decision Fatigue':'dump ifthen values','Getting Started (Activation Energy)':'start2 ifthen swap','Racing Mind at Night':'dump sleep worry',
// self-knowledge
'Emotional Needs':'label glim values','Personal Values':'label ifthen values','Thought → Emotion → Behaviour':'label record solve','Identifying Triggers':'label record review','Support Network':'reach glim values','Coping Strategies':'shift ba swap','Inner Resources':'glim safe story','Therapy Goals':'label ifthen review','Recognising Progress':'glim review story','Personal Continuity Plan':'shift ifthen review',
// faith
'Being Known and Loved':'reach glim story','Grace vs. Shame':'scb glim letter','Lament: Honest Sorrow':'label glim lament','Forgiveness (and What It Isn\'t)':'label record forgive','Repair & Reconciliation':'stop ifthen repair','Belonging':'reach ba values','Rest & Sabbath':'shift sleep values','Identity as Beloved':'scb glim letter','Hope After Loss':'reach glim lament','Spiritual Bypassing':'label scan lament',
// brain
'The Neuron: Your Brain\'s Messenger':'label ifthen review','The Synapse: Where Learning Happens':'label ifthen swap','Neuroplasticity: The Brain That Changes':'label ifthen swap','Fire Together, Wire Together':'glim ifthen ladder','Use It or Lose It: Pruning':'surf ifthen swap','Myelin: Practice Makes Pathways Faster':'exhale ifthen review','The Brain Map: Key Regions':'label scan review','The Alarm and the Pilot: Amygdala & Prefrontal Cortex':'stop exhale record','Flipping Your Lid: The Hand Model':'stop pmr repair','The Stress Response: The HPA Axis':'sigh ba2 sleep','The Nervous System Ladder (Polyvagal Map)':'orient safe glim','The Reward Loop: Dopamine & Habits':'surf ifthen swap','Memory & Emotion: Implicit and Explicit':'ground safe story','Memory Reconsolidation: Updating Old Learning':'ground safe reparent','The Default Mode Network & Rumination':'defuse ba2 solve','Interoception: The Insula and Body Signals':'label scan review','Rewiring Step by Step':'stop ifthen review','Sleep, Movement & the Rewiring Brain':'reset sleep ba2','Co-regulation: Brains Regulate Brains':'reach glim repair','The Attention Networks':'dump pomo deepw','Arousal, Focus & Flow Chemistry':'shift flow deepw','How the Brain Changes State':'shift ba2 review','Trauma and the Developing Brain':'ground safe reparent'
};
function planFor(m){const raw=(PLAN[m.t]||'')+' '+(m.type==='M'||m.type==='C'||m.type==='S'?((m.links||[]).map(t=>PLAN[t]||'').join(' ')):'')+' '+(AREA_PLAN[m.area]||'');
 const codes=[...new Set(raw.split(/\s+/).filter(c=>PR[c]))];const pick=w=>codes.find(c=>PR[c].w===w);
 return ['now','daily','deep'].map(w=>PR[pick(w)]).filter(Boolean)}
// ===== NERVOUS SYSTEM REGULATION =====
AREAS.splice(AREAS.findIndex(a=>a.id==='str')+1,0,{id:'nsr',n:'Nervous System Regulation',h:190,brain:'Regulation means moving between activation and rest and returning to balance. The brainstem and hypothalamus set arousal; the vagus nerve helps slow the heart; the prefrontal cortex and safe relationships help steer. Small daily practices build capacity over time.',neuro:['n22','n11','n19']});
E('nsr','Understanding Nervous System Regulation','Regulation is not being calm all the time. It is the ability to rise to meet a challenge and come back down afterwards. A regulated system is flexible; a dysregulated one gets stuck too high or too low.',
'heart rate rising and settling;breath changing with effort and rest','I can handle this;I can come back from this','engaging;resting;recovering',
'Challenge arrives>System activates (energy, focus)>Challenge met>Signals of safety>System settles>Rest and repair',
'How quickly do I come back down after stress?;Do I tend to get stuck high or low?;What helps me return to balance?','safety;rest;flexibility','I should always feel calm;Stress is always bad',
'Notice your state three times a day (high, okay, low);Learn one tool to calm and one to energise;Build recovery into every day, not just weekends','Rhythms of work and rest, gathering and solitude, are built into healthy life.');
E('nsr','Signs of Dysregulation','Learning your personal warning signs early, before you\'re flooded or shut down, makes regulation much easier.',
'too high: racing heart, tight jaw, shallow breath;too low: heaviness, numbness, foggy','I can\'t cope;Everything is too much / nothing matters','snapping;rushing;withdrawing;scrolling;over-eating or not eating',
'Stress accumulates>Early signs ignored>Signs intensify>Flooded or shut down>Recovery takes longer',
'What are my first signs of going too high?;Of going too low?;Who notices before I do?','awareness;early action;support','Early signs aren\'t important;I should push through',
'Make a personal list: green (okay), amber (early signs), red (flooded/shut down);Choose one action for amber;Share your signs with someone close','People who love us can help us notice what we can\'t see in ourselves.');
E('nsr','Down-Regulation: Calming an Activated System','When the system is too high (anxious, angry, wired), the goal is to send signals of safety and slow the body.',
'racing heart;heat;restlessness;tight muscles','I need to fix this now;I\'m in danger','pacing;arguing;rushing;checking',
'Activation>Signals of safety (slow breath, slow movement, warmth, kind voice)>Heart slows>Muscles soften>Thinking returns',
'Which calming tools work fastest for me?;Where can I go to calm down?;Who calms me?','calm;safety;space','I can\'t calm down;Calming means giving in',
'Breathe out longer than in for 2 minutes;Slow everything down: walk slowly, speak slowly;Reduce input: dim lights, quiet, warmth','A gentle voice and a hand on the shoulder are ancient calming tools.');
E('nsr','Up-Regulation: Energising a Shut-Down System','When the system is too low (numb, heavy, foggy), the goal is gentle activation, not force.',
'heaviness;numbness;slow;cold','I can\'t move;Nothing matters','staying in bed;staring;withdrawing',
'Shutdown>Gentle sensory input (movement, cool water, sound, light)>Small energy rise>Small action>More energy>Re-engagement',
'What gently wakes me up?;Who can I be near?;What small action feels possible?','energy;connection;safety','I have to wait until I feel better;Pushing harder will help',
'Move a little: stretch, shake, sway, walk;Use sensory input: cool water, strong flavour, music;Connect: text or sit with someone','Being gently accompanied helps a shut-down system feel safe enough to come back.');
E('nsr','Co-Regulation in Daily Life','We regulate each other through voice, face, touch and presence. Co-regulation is how children learn self-regulation, and adults need it too.',
'calmer around certain people;tense around others','I shouldn\'t need anyone;I\'m safe with them','reaching out;spending time with calm people;offering calm presence',
'Distress>Connect with a regulated person>Their calm signals reach your body>Your system settles>You learn to self-soothe more easily',
'Who helps me feel calmer?;Who am I a calming presence for?;How can I ask for co-regulation?','connection;safety;support','Needing others is weak;I must calm down alone',
'Identify 2–3 calming people and tell them how they help;Ask for presence, not advice: "Can you just sit with me?";Offer slow voice and soft eyes to others','"Carry each other\'s burdens": regulation was designed to be shared.');
E('nsr','Vagal Toning Practices','Practices that engage the vagus nerve (a key part of the calming parasympathetic system): slow breathing, humming, singing, gargling, gentle movement and social connection.',
'warmth;slower heartbeat;relaxed belly','I can calm my body','humming;singing;slow breathing;laughing',
'Vagal practice>Heart rate slows>Body relaxes>Greater flexibility over time',
'Which practices feel good to me?;When could I practise daily?;Do I sing or hum?','calm;flexibility;joy','I can\'t influence my body',
'Hum or sing for 2 minutes daily;Practise slow breathing (6 breaths per minute) for 5 minutes;Laugh, connect and move gently','Singing and chanting together are among the oldest regulating practices of faith communities.');
E('nsr','Sensory Overload','When too much sensory input (noise, light, crowds, screens) overwhelms the nervous system, leading to irritability, shutdown or panic.',
'tension;headache;feeling assaulted by noise or light','I need to get out;Everything is too loud','leaving;snapping;covering ears;shutting down',
'Too much input>System overwhelmed>Irritability or shutdown>Need to escape>Recovery in quiet',
'What sensory inputs overwhelm me?;Which calm me?;How can I plan for busy environments?','quiet;space;control','I should be able to tolerate this',
'Use noise-cancelling headphones or earplugs;Take sensory breaks in quiet spaces;Reduce screens and bright light in the evening','Silence and solitude are restorative practices.');
E('nsr','Widening Your Window','Building capacity to tolerate stress and emotion by stretching slightly outside your comfort zone, then returning to safety.',
'stretching feels uncomfortable but manageable','I can handle a little more;I can come back','gentle challenges;practising returning to calm',
'Small stretch>Mild discomfort>Return to safety>Capacity grows>Bigger stretch possible',
'What small stretch could I try?;What resources help me return?;How has my capacity grown?','growth;resilience;safety','I have to be fully healed to try;Discomfort is dangerous',
'Practise pendulation: notice discomfort, then shift attention to a safe place in the body;Take small, graded challenges;Track what helps you return','Growth often happens in small steps of courage supported by grace.');
E('nsr','Daily Regulation Rhythms','A regulated system needs rhythm: regular sleep, meals, movement, light, connection and rest.',
'more stable energy;fewer crashes','My days have a shape;I can predict my energy','routines;breaks;regular sleep',
'Rhythm>Predictability>System settles>More capacity>Easier to keep rhythm',
'What rhythms do I have now?;Which are missing?;What one rhythm could I add?','stability;rest;energy','Routines are boring;I\'ll rest when everything is done',
'Wake and sleep at regular times;Get morning daylight and move daily;Build 3 micro-breaks into each day','Daily rhythms of prayer and rest have long been used to anchor life.');
E('nsr','Your Personal Regulation Map','A personalised plan: your states, your signs and the tools that work for you.',
'body awareness grows','I know what I need','using tools early;asking for help',
'Notice state>Check map>Use matching tool>Return to balance>Update map with what worked',
'What are my signs for each state?;Which tools work for each?;Who supports me?','self-knowledge;control;support','Nothing works for me',
'Create your map: green, amber, red, shut-down states with signs and tools;Keep it on your phone;Review it monthly','Knowing yourself well helps you love and serve others well.');

// regulation practices
P('voo','Humming & "Voo" Breath','now','2–3 min','Use long, vibrating sounds on the exhale to slow down and settle.',
'Breathe in gently through your nose;On the out-breath, hum or make a low "voooo" sound, like a foghorn;Feel the vibration in your chest and belly;Continue for 5–10 breaths;Pause and notice how you feel',
'I feel embarrassed => Hum quietly or do it in the car or shower;It makes me dizzy => Use shorter sounds;I don\'t feel anything => Try longer, lower tones',
'Long vocal exhales slow breathing and engage muscles connected to the vagus nerve. Singing also supports social connection.',{pace:[3,0,8,0]});
P('hug','Butterfly Hug & Self-Holding','now','2–3 min','Gentle self-touch and bilateral tapping to soothe.',
'Cross your arms over your chest, hands on opposite shoulders;Slowly tap left, right, left, right;Breathe slowly;Alternatively, place one hand on your heart and one on your belly;Notice warmth and support',
'Touch feels uncomfortable => Use a weighted blanket or hug a pillow;Tapping feels odd => Just hold;I get emotional => That\'s okay; let it pass and ground',
'Self-touch and rhythmic bilateral tapping are calming resourcing tools used in trauma therapy (e.g. EMDR).');
P('rhythm','Rhythmic Regulation','daily','5–15 min','Use repetitive rhythm (rocking, swaying, walking, drumming, swinging) to settle the system.',
'Choose a rhythm: rocking chair, swaying, walking, tapping, drumming;Keep a steady, slow beat;Breathe in time with the rhythm;Continue for 5–15 minutes;Notice your state afterwards',
'I feel silly => Walking or music counts;I get restless => Speed up slightly, then slow down;I can\'t move much => Tap fingers or rock gently',
'Rhythmic, patterned activity calms lower brain regions (Perry\'s Neurosequential Model).');
P('sensory','Sensory Reset','now','5–10 min','Reduce or change sensory input to recover from overload.',
'Move to a quieter, dimmer space;Use headphones, earplugs or calming sound;Close your eyes or soften your gaze;Add one comforting sensation (blanket, warm drink, pressure);Stay until you feel steadier',
'I can\'t leave => Look down, focus on breath, use headphones;Silence feels worse => Use gentle music or nature sounds;Overload happens often => Plan regular sensory breaks',
'Lowering sensory input reduces load on attention and arousal systems.');
P('pend','Pendulation','deep','10 min','Swing attention between discomfort and safety to build capacity (from Somatic Experiencing).',
'Find a place in your body that feels okay, neutral or pleasant;Rest your attention there;Briefly notice a mildly uncomfortable sensation;Return to the okay place;Swing gently between the two several times;End on the okay place',
'I can\'t find an okay place => Try hands, feet or an external object;It gets overwhelming => Stop and ground; work with a therapist;Nothing changes => Keep the steps very small',
'Moving between activation and safety helps the nervous system learn it can return to balance (Levine).');
P('regmap','Build Your Regulation Map','deep','30 min','Create a one-page personal plan for your nervous system.',
'Draw four zones: Green (okay), Amber (rising), Red (flooded), Blue (shut down);For each, write body signs, thoughts and behaviours;Add 2–3 tools for each zone;Add people to contact for Amber and Red;Keep it visible and review monthly',
'I don\'t know my signs => Track for a week first;Tools stop working => Rotate and add new ones;I forget to use it => Set reminders and share it with someone',
'A personalised plan reduces the thinking needed when you\'re dysregulated.');

C('Down-Regulation vs. Up-Regulation','Different states need opposite tools.',
[['Down-regulate (too high)',205],['Up-regulate (too low)',36]],
[['Signs','Racing heart, tension, anger, panic','Numb, heavy, foggy, flat'],['Breath','Long exhales, slow','Brisk inhales, energising breaths'],['Movement','Slow, rhythmic, stretching','Brisk, shaking, standing, walking'],
 ['Senses','Dim light, quiet, warmth','Daylight, cool water, music, strong flavours'],['People','Calm, slow voice','Warm, gentle engagement'],['Avoid','More stimulation, caffeine','Forcing, isolation']],null,'Down-Regulation: Calming an Activated System;Up-Regulation: Energising a Shut-Down System');
F('Regulate my nervous system now','nsr',{q:'How does your body feel right now?',o:[
 ['Too high: racing, tense, wired',{q:'How intense?',o:[['Rising (5–6/10)','Down-Regulation: Calming an Activated System;Vagal Toning Practices'],['Flooded (7+/10)','Hyperarousal;Window of Tolerance']]}],
 ['Too low: numb, heavy, far away','Up-Regulation: Energising a Shut-Down System;Shutdown & Hypoarousal'],['Overwhelmed by noise or crowds','Sensory Overload'],
 ['I need someone','Co-Regulation in Daily Life;Co-regulation: Brains Regulate Brains'],['I want to build long-term capacity','Widening Your Window;Daily Regulation Rhythms;Your Personal Regulation Map']]});
Object.assign(PLAN,{'Understanding Nervous System Regulation':'shift rhythm regmap','Signs of Dysregulation':'label scan regmap','Down-Regulation: Calming an Activated System':'exhale rhythm pmr','Up-Regulation: Energising a Shut-Down System':'shift ba2 ba','Co-Regulation in Daily Life':'reach glim repair','Vagal Toning Practices':'voo rhythm pend','Sensory Overload':'sensory rhythm regmap','Widening Your Window':'hug safe pend','Daily Regulation Rhythms':'shift sleep regmap','Your Personal Regulation Map':'label scan regmap','Window of Tolerance':'shift rhythm pend','Hyperarousal':'sigh rhythm regmap','Shutdown & Hypoarousal':'orient ba2 pend','The Nervous System Ladder (Polyvagal Map)':'voo safe pend','Emotional Flashbacks':'ground safe reparent','Felt Sense of Safety':'hug safe pend'});
AREA_PLAN.nsr='shift rhythm regmap';
