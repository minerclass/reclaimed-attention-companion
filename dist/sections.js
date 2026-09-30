'use strict';
/*
 * Chapters 03 (evidence), 04 (statute), and 06 (stress-test), plus the sources
 * panel. Loaded before app.js, which owns navigation and the original chapters.
 *
 * Content rule: every claim about the article follows the manuscript revision of
 * 2026-09-29. Statutory text was read from the Illinois General Assembly's ILCS
 * page (Sec. 10-20.88, text from P.A. 104-657) on 2026-09-29. Fields marked
 * "companion" in the interface are this page's own prompts, not the article's.
 */
(function () {
  const byId = id => document.getElementById(id);
  const announce = text => { const a = byId('announcement'); if (a) a.textContent = text; };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const list = items => items.map(i => '<li>' + esc(i) + '</li>').join('');
  const setPressed = (attr, key) => document.querySelectorAll('[' + attr + ']').forEach(b => b.setAttribute('aria-pressed', String(b.getAttribute(attr) === key)));

  /* ------------------------------------------------------------------ */
  /* 03  Read the evidence  (article Section 3)                          */
  /* ------------------------------------------------------------------ */
  const studies = {
    beland: {
      short: 'Beland & Murphy', year: '2016', cite: 'Beland and Murphy (2016)',
      type: 'English schools · difference-in-differences',
      examined: 'Examination performance in English schools after phone bans, using a difference-in-differences approach.',
      reported: ['Improved examination performance after bans.', 'Gains were concentrated among lower-achieving students.'],
      supports: 'A reason to take the potential academic benefits of restrictions seriously.',
      open: 'The findings arise from a particular policy and technology environment that predates generative artificial intelligence. They do not identify a universal effect of removing contemporary personal devices.',
      row: ['Difference-in-differences, English schools', 'Examination performance', 'Predates generative AI; not a universal effect']
    },
    kessel: {
      short: 'Kessel et al.', year: '2020', cite: 'Kessel et al. (2020)',
      type: 'Swedish secondary schools',
      examined: 'Swedish secondary schools. The study’s abstract describes a partial replication of Beland and Murphy’s approach with Swedish data.',
      reported: ['No improvement in student performance following mobile phone bans.'],
      supports: 'A prompt to investigate policy design, implementation, and context when results differ from the English findings.',
      open: 'The contrast should not become a contest in which either study establishes what all schools should expect. Schools can adopt similar policy labels while establishing quite different practical conditions.',
      row: ['Swedish secondary schools', 'Student performance', 'Contrast calls for inquiry into design and context']
    },
    goodyear: {
      short: 'Goodyear et al.', year: '2025', cite: 'Goodyear et al. (2025), SMART Schools',
      type: '30 English secondary schools · cross-sectional',
      examined: 'The SMART Schools study compared restrictive and permissive phone policies across 30 English secondary schools and 1,227 adolescents.',
      reported: ['Restrictive policies were associated with lower phone and social media use during the school day.', 'The study found no evidence of better mental wellbeing.', 'It found no differences in sleep, physical activity, attainment, or disruptive behavior.'],
      supports: 'A separation between a policy-proximal outcome (in-school use) and broader outcomes that do not follow automatically from it.',
      open: 'The design was cross-sectional and observational, so it cannot establish what would happen if a particular school changed its policy.',
      row: ['Cross-sectional, observational; 30 schools', 'Phone use, wellbeing, attainment, behavior', 'Cannot show what follows a change of policy']
    },
    campbell: {
      short: 'Campbell et al.', year: '2024', cite: 'Campbell et al. (2024)',
      type: 'Scoping review · 22 studies',
      examined: 'A scoping review identifying 22 studies concerning phones, school outcomes, and restrictions.',
      reported: ['Substantial variation in definitions and research designs.'],
      supports: 'A map of how varied the evidence base is.',
      open: 'These were not 22 equivalent experiments testing the same ban.',
      row: ['Scoping review, 22 studies', 'Phones, school outcomes, restrictions', 'Studies are not equivalent experiments']
    },
    bottger: {
      short: 'Böttger & Zierer', year: '2024', cite: 'Böttger and Zierer (2024)',
      type: 'Rapid review · 5 studies',
      examined: 'A rapid review synthesizing five studies of school smartphone bans.',
      reported: ['Modest benefits.', 'Stronger effects for social wellbeing than for academic performance.', 'A recommendation to accompany restrictions with educational measures and evaluation.'],
      supports: 'The article’s evaluation argument is offered as specifying the decisions and evidentiary distinctions through which that recommendation might be acted upon, not as proposing it for the first time.',
      open: 'The review rests on five studies. Its authors note that the small academic effect might reflect the limited number of studies.',
      row: ['Rapid review, 5 studies', 'Social wellbeing, academic performance', 'Small evidence base']
    },
    allcott: {
      short: 'Allcott et al.', year: '2026', cite: 'Allcott et al. (2026), NBER Working Paper 35132',
      type: 'Working paper · staggered difference-in-differences',
      examined: 'An evaluation of lockable phone pouches using teacher surveys, GPS pings, test scores, school records, and vendor sales data.',
      reported: ['Reduced phone use.', 'In the first year, disciplinary incidents increase and there is suggestive evidence that subjective wellbeing falls. Disciplinary effects subsequently fade, and estimated wellbeing effects become positive in later years.', 'Average test-score effects remain close to zero, with modest positive estimates in high schools, particularly in mathematics, and small negative estimates in middle schools.', 'Little evidence of effects on attendance, and no clear evidence of improvement in reported classroom attention or perceived online bullying.'],
      supports: 'The differences across outcomes, grade bands, and time show why an evaluation must specify what changed and when.',
      open: 'These are working-paper estimates that depend on the design’s assumptions. The authors disclose a vendor partnership. The results do not establish that every district would experience the same trajectory.',
      row: ['Working paper; staggered difference-in-differences', 'Phone use, discipline, wellbeing, test scores, attendance', 'Working-paper evidence; vendor partnership disclosed']
    }
  };
  const studyKeys = Object.keys(studies);

  byId('evidence').innerHTML =
    '<div class="section-heading"><div><p class="eyebrow">WHAT THE RESEARCH CAN SAY</p><h2 id="evidence-title">Match each study to its question.</h2></div><span class="tag">Selected literature</span></div>' +
    '<p class="section-lead">The article reads phone-policy research to keep a restriction, its implementation, and educational outcomes distinct. The selection is purposive and is not a systematic review. Choose a source to see what it examined, what it reported, and what it leaves open.</p>' +
    '<div class="step-track study-track" role="group" aria-label="Choose a source">' +
    studyKeys.map(k => '<button type="button" data-study="' + k + '" aria-pressed="false"><small>' + studies[k].year + '</small>' + esc(studies[k].short) + '</button>').join('') + '</div>' +
    '<div class="mechanism-grid">' +
    '<article class="mechanism-card"><p class="eyebrow" id="study-label"></p><h3 id="study-title"></h3><p class="study-type" id="study-type"></p>' +
    '<h4 class="field">What it examined</h4><p id="study-examined"></p>' +
    '<h4 class="field">What it reported</h4><ul id="study-reported"></ul>' +
    '<div class="example-box"><strong>What it supports</strong><p id="study-supports"></p></div>' +
    '<div class="access-note"><strong>What it leaves open</strong><p id="study-open"></p></div></article>' +
    '<aside class="research-card"><p class="eyebrow">TAKEN TOGETHER</p>' +
    '<p>This literature supports distinguishing restriction, implementation, and educational outcomes. Effects vary across settings, measures, and evaluation periods. That variation warrants investigation. It does not establish how institutions interpret the results.</p>' +
    '<strong>What the article does not claim</strong>' +
    '<p>Uncertain evidence, uneven implementation, and policy immaturity remain plausible explanations for dissatisfaction with a restriction. The article neither tests nor rejects them. Its concern is sufficiency: whether a valued proximal result is treated as enough evidence for a broader educational claim.</p>' +
    '<div class="rule"><strong>A limit on this selection</strong><p>The source synthesis is purposive and cannot establish the completeness or balance of the evidence base. The studies concern different countries, ages, policy arrangements, and technologies.</p></div></aside></div>' +
    '<div class="table-wrap" role="region" aria-label="Comparison of the six sources" tabindex="0"><table class="compare"><caption>The six sources at a glance</caption><thead><tr><th scope="col">Source</th><th scope="col">Design</th><th scope="col">Outcomes in view</th><th scope="col">Limit the article notes</th></tr></thead><tbody>' +
    studyKeys.map(k => '<tr data-row="' + k + '"><th scope="row">' + esc(studies[k].cite.replace(/, SMART Schools|, NBER Working Paper 35132/, '')) + '</th>' + studies[k].row.map(c => '<td>' + esc(c) + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>' +
    '<details class="concept-note"><summary>What the device category leaves out</summary>' +
    '<p>Kaye and colleagues (2020) describe screen time as a conceptually and methodologically unstable aggregate. Minutes on a screen combine activities with different purposes and affordances. Reading a graph, receiving a graph interpretation, and evaluating an erroneous interpretation can occupy similar minutes on the same screen while making entirely different demands. For instructional decisions, the article therefore takes the learner’s activity with a tool, under specified conditions, as its unit of analysis.</p>' +
    '<p>Selwyn and Aagaard (2021) treat phone bans as an opportunity to reconsider wider questions about digital education. Work on education platforms (Decuypere et al., 2021; Perrotta et al., 2021; Macgilchrist, 2019) suggests that platform architecture can distribute pedagogical work, and that consequential effects can arise without anyone deciding to produce them. On this reading, a device exemption marks a boundary. It is not a neutral remainder.</p></details>';

  let currentStudy = 'beland';
  function selectStudy(key) {
    if (!Object.hasOwn(studies, key)) throw new Error('Unknown source');
    currentStudy = key;
    const s = studies[key];
    byId('study-label').textContent = 'SOURCE 0' + (studyKeys.indexOf(key) + 1) + ' / ' + s.year;
    byId('study-title').textContent = s.cite;
    byId('study-type').textContent = s.type;
    byId('study-examined').textContent = s.examined;
    byId('study-reported').innerHTML = list(s.reported);
    byId('study-supports').textContent = s.supports;
    byId('study-open').textContent = s.open;
    setPressed('data-study', key);
    document.querySelectorAll('[data-row]').forEach(r => r.classList.toggle('is-selected', r.dataset.row === key));
    announce(s.cite);
    return { source: key, citation: s.cite, supports: s.supports, leavesOpen: s.open };
  }

  /* ------------------------------------------------------------------ */
  /* 04  Read the statute  (article Sections 6 and 7)                    */
  /* ------------------------------------------------------------------ */
  const provisions = {
    scope: {
      cite: '(a)', label: 'What counts as a device',
      text: 'The definition covers phones, tablets, laptops, gaming devices, and specified wearables. School time runs from the designated arrival time through dismissal and includes instructional time, recess, lunch, and passing periods.',
      certifies: 'A regulated object with named owners, procedures, exceptions, reports, and consequences.',
      open: 'Policy categories do more than sort objects. What falls outside the category does not disappear. It is governed through other systems that may not be examined together.'
    },
    exempt: {
      cite: '(a)', label: 'The definitional exemption',
      text: 'The definition does not include a device that a school district or teacher has directly issued to a student, provided for a student, or required a student to possess and use for educational purposes.',
      certifies: 'A boundary of the restriction.',
      open: 'The exemption is not evidence that other educational technologies are ungoverned. District-issued devices, platform defaults, and instructional tasks may be addressed through separate policies and professional decisions. The article’s concern is that an approved system on an exempted device can generate the explanation an assignment was meant to help a learner construct.'
    },
    adopt: {
      cite: '(b)', label: 'Adoption and deadline',
      text: 'On or before the beginning of the 2027–28 school year, each school board must adopt and implement a policy that, at a minimum, prohibits student use during school time (subject to the required and permitted exceptions), incorporates guidance on storage, and addresses uniform, trauma-informed, developmentally appropriate enforcement. The policy and administrative responses are published in a student handbook, if one exists.',
      certifies: 'A form of policy compliance.',
      open: 'Meeting these requirements would not by itself establish that students have developed particular knowledge or that instructional design has changed. The general deadline has not yet arrived, so the article’s reading is prospective.'
    },
    retrieval: {
      cite: '(b)(4)', label: 'Family retrieval',
      text: 'If a school responds to a violation by requiring a parent or guardian to retrieve the device at the school building, the policy must provide an alternative when the parent or guardian cannot appear in person.',
      certifies: 'A protection against an access and disciplinary harm.',
      open: 'Protections of this kind warrant evaluation in their own right. Whether they work as intended is an empirical question that compliance with the text does not answer.'
    },
    required: {
      cite: '(c)', label: 'Required exceptions',
      text: 'The policy may not prohibit use that a licensed physician, physician assistant, or nurse practitioner determines is necessary for managing a student’s health care, use needed to fulfill an individualized education program, a Section 504 plan, medical orders, or another written accommodation plan, use that school personnel determine is necessary for English learners to access learning materials, use that school personnel determine case by case is necessary for a student who routinely cares for a family member, or use required by other law.',
      certifies: 'That listed health, accommodation, language, and caregiving needs are protected from a blanket prohibition.',
      open: 'Access is not the same as instructional demand. Equitable access does not show whether the demand of a task changed.'
    },
    permitted: {
      cite: '(d)', label: 'Permitted exceptions',
      text: 'A district may exclude a high school student’s lunch and passing periods from school time. It may also allow use that school personnel authorize for educational purposes, and use in an emergency described in its response plans.',
      certifies: 'District discretion over defined exceptions.',
      open: 'The statutory text describes required arrangements, not the full extent of district action.'
    },
    enforce: {
      cite: '(e)', label: 'Enforcement limits',
      text: 'A district may not enforce the policy through fees, fines, suspensions, expulsions, or the deployment of a school resource officer or local law enforcement officer. The prohibition does not extend to using a device to engage in other gross disobedience or misconduct.',
      certifies: 'A limit on penalties for a device-policy violation alone.',
      open: 'These protections warrant evaluation in their own right.'
    },
    review: {
      cite: '(f)', label: 'Input and periodic review',
      text: 'Developing the policy includes, at a minimum, input from the local collective bargaining agent representing teachers (if any), administrators, and parents or guardians. Student input is encouraged during development. Each board reviews the policy at least once every three years, engaging the same groups and considering any available data on enforcement.',
      certifies: 'That a review took place with the required input and that available enforcement data were considered.',
      open: 'These are minimum requirements, not a prohibition on examining learning or other outcomes. If a district also claims instructional benefits, it would need evidence addressing those benefits. Whether it obtains and uses that evidence is an empirical question.'
    },
    publish: {
      cite: '(h)', label: 'Publication',
      text: 'The policy is posted on the district’s public website and provided annually to parents, guardians, and school personnel, including new employees and substitute teachers.',
      certifies: 'That the rule is visible to families and staff.',
      open: 'Publication documents the rule. It does not document the rule’s educational consequences.'
    },
    existing: {
      cite: '(j)', label: 'Existing policies',
      text: 'A district that already had a policy limiting devices during a majority or the entirety of the school day, before the Act’s effective date, may keep it through the 2030–31 school year. It must then adopt a policy meeting subsection (b).',
      certifies: 'Continuity for districts with a qualifying earlier policy.',
      open: 'The article does not assess whether districts hold earlier device policies, or how good those policies are.'
    }
  };
  const provisionKeys = Object.keys(provisions);

  byId('statute').innerHTML =
    '<div class="section-heading"><div><p class="eyebrow">A WORKED EXAMPLE, READ FROM THE TEXT</p><h2 id="statute-title">What a compliant policy certifies.</h2></div><span class="tag">Illinois Public Act 104-0657</span></div>' +
    '<p class="section-lead">The article reads this statute as an evaluative architecture. It is not a study of districts. The general 2027–28 deadline has not arrived, and the text cannot show what officials believe, what further evaluation districts undertake, or whether implementation results have narrowed instructional inquiry. Choose a provision to see what meeting it would certify and what it leaves open.</p>' +
    '<div class="inquiry-grid statute-grid"><div class="question-picker" role="group" aria-label="Choose a provision">' +
    provisionKeys.map(k => '<button type="button" data-provision="' + k + '" aria-pressed="false"><b>' + esc(provisions[k].cite) + '</b> ' + esc(provisions[k].label) + '</button>').join('') + '</div>' +
    '<article class="evidence-card"><p class="eyebrow" id="provision-label"></p><h3 id="provision-title"></h3>' +
    '<h4 class="field">What the text provides</h4><p id="provision-text"></p>' +
    '<div class="evidence-columns"><div><h4>What meeting it would certify</h4><p id="provision-certifies"></p></div><div><h4>What it leaves open</h4><p id="provision-open"></p></div></div></article></div>' +
    '<section class="seam-block" aria-labelledby="seam-title"><p class="eyebrow">THE ADMINISTRATIVE SEAM</p><h3 id="seam-title">Two channels, two sets of reviewers.</h3>' +
    '<div class="seam"><div class="channel regulated"><p class="eyebrow">REGULATED CHANNEL</p><strong>Student-owned devices</strong><p>Belong to student conduct and school operations. A regulated object acquires named owners, procedures, exceptions, reports, and consequences.</p></div>' +
    '<div class="seam-line" aria-hidden="true"><span>seam</span></div>' +
    '<div class="channel exempted"><p class="eyebrow">EXEMPTED CHANNEL</p><strong>District-issued devices and platforms</strong><p>Often belong to technology, curriculum, procurement, or instructional leadership. A platform can be reviewed for privacy, cost, interoperability, and technical support.</p></div></div>' +
    '<p class="seam-note">Each review may be competent within its own remit without any forum asking how the two arrangements jointly allocate intellectual work. The article predicts that premature closure would be more likely where evidence stays inside these boundaries, because a favorable conduct report can complete the phone-policy agenda without prompting curriculum or technology committees to examine assistance defaults. The statute makes the seam legible. It does not establish that any district has experienced closure across it.</p></section>' +
    '<div class="question-band statute-band"><span class="question-icon" aria-hidden="true">?</span><div><strong>What would a three-year review need in order to ask about learning?</strong><p>The review requires input and enforcement data at a minimum. A district that claims learning benefits would need evidence that addresses them, and someone with authority to act on what it finds.</p></div><a class="text-link" href="#inquiry">Plan the next inquiry <span aria-hidden="true">↗</span></a></div>' +
    '<p class="form-note">This chapter is a reading aid, not legal advice or a compliance checklist. Provisions are paraphrased. Read the statute itself: <a href="https://www.ilga.gov/Documents/legislation/ilcs/documents/010500050K10-20.88.htm" target="_blank" rel="noopener noreferrer">105 ILCS 5/10-20.88</a>. Section 10-20.88 currently carries three separate texts from different Acts; the wireless communication device policy is the text from P.A. 104-657 (effective July 28, 2026). The article’s reference list also links the <a href="https://www.ilga.gov/Legislation/PublicActs/View/104-0657" target="_blank" rel="noopener noreferrer">Public Act</a>.</p>';

  let currentProvision = 'scope';
  function selectProvision(key) {
    if (!Object.hasOwn(provisions, key)) throw new Error('Unknown provision');
    currentProvision = key;
    const p = provisions[key];
    byId('provision-label').textContent = '105 ILCS 5/10-20.88' + p.cite;
    byId('provision-title').textContent = p.label;
    byId('provision-text').textContent = p.text;
    byId('provision-certifies').textContent = p.certifies;
    byId('provision-open').textContent = p.open;
    setPressed('data-provision', key);
    announce(p.label);
    return { provision: key, subsection: p.cite, certifies: p.certifies, leavesOpen: p.open };
  }

  /* ------------------------------------------------------------------ */
  /* 06  Stress-test the idea  (article Sections 5 and 9)                */
  /* ------------------------------------------------------------------ */
  const rivals = {
    learning: {
      name: 'Organizational learning', src: 'Argyris and Schön (1978)',
      explains: 'Single-loop learning adjusts actions within existing governing variables. Double-loop learning examines those variables. Defensive routines offer one explanation for why governing assumptions stay unexamined: a question may threaten established commitments or professional standing.',
      relation: 'A restriction may be single-loop when it changes access and leaves assumptions about attention and learning unexamined, or it may follow a reassessment. Instructional redesign is not necessarily double-loop either. The proposed mechanism adds a possibility: when valued indicators improve, further inquiry may appear unnecessary rather than threatening. Both processes could operate together.',
      ask: ['Did anyone reconsider the assumptions that link attention to learning?', 'Was the question avoided because it felt threatening, or because improved indicators made it seem settled?']
    },
    decoupling: {
      name: 'Means–ends decoupling', src: 'Bromley and Powell (2012)',
      explains: 'A gap between organizational activities and the purposes they are meant to serve, even where practices are implemented. The authors argue that this form is more prevalent and consequential than policy–practice decoupling, and they caution against reducing decoupling to conscious pretense.',
      relation: 'This is the closest conceptual neighbor, and a demanding one. Sincerity does not distinguish institutional unproductive success from it. If documenting the sequence adds no explanatory value beyond means–ends decoupling, the article says the argument is better understood as an application of that account than as a separate construct.',
      ask: ['Does the sequence explain a decision that decoupling alone leaves obscure?', 'Did a genuine proximal improvement contribute to reduced inquiry, or was the gap present from the start?']
    },
    displacement: {
      name: 'Goal displacement', src: 'Merton (1940)',
      explains: 'Means becoming ends in themselves.',
      relation: 'The proposed mechanism requires more than either gap alone. It requires evidence that a genuine proximal improvement contributed to reduced inquiry into a broader purpose. That sequence may refine an existing account rather than justify a separate construct.',
      ask: ['Was the policy pursued for its own sake, or was a broader learning purpose invoked and later set aside?']
    },
    legitimacy: {
      name: 'Legitimacy and isomorphism', src: 'Meyer and Rowan (1977); DiMaggio and Powell (1983)',
      explains: 'Relationships between formal structures, legitimacy, and organizational activity, and pressures toward organizational similarity.',
      relation: 'These accounts help situate the spread of device policies. Counts of heterogeneous enactments do not establish a common motive, equivalent implementation, or instructional consequences.',
      ask: ['Are districts alike in the label they use, or in what they enact and evaluate?']
    },
    persistence: {
      name: 'Persistence of instructional arrangements', src: 'Tyack and Cuban (1995); Cuban (2001); Coburn (2003)',
      explains: 'Reforms leaving the instructional core untouched is the normal condition of American school reform, and classroom technology is a documented case. Coburn distinguishes depth, sustainability, spread, and shifts in reform ownership, so that the number of adopting jurisdictions cannot stand in for changed practice.',
      relation: 'This literature constrains the contribution. That device policy can leave instruction untouched is not novel and should not be presented as such. The proposal asks how an accurately measured achievement may enter decisions about the questions adoption leaves unresolved. It would not add value by renaming reform that lacks depth.',
      ask: ['Did the reform ever claim to change instruction?', 'If a broader purpose was claimed, what happened to that question after the proximal result arrived?']
    },
    ordinary: {
      name: 'Ordinary explanations', src: 'Named in Section 9',
      explains: 'Capacity, costs, changed priorities, and pre-existing evaluation practices can each explain why a broader question is not pursued. Uncertain evidence, uneven implementation, and policy immaturity can explain dissatisfaction with a restriction.',
      relation: 'The article neither tests nor rejects these explanations. Researchers would need to examine them as competing explanations, and neither an absent agenda item nor an interviewee’s retrospective account would be sufficient alone.',
      ask: ['Would the question have been dropped regardless of the improvement?', 'Who had the time, budget, and authority to pursue it?']
    }
  };
  const rivalKeys = Object.keys(rivals);

  const boundaries = [
    ['Would count against the mechanism', ['Broader evaluation continues despite implementation success, even if distal outcomes remain unchanged.', 'Existing processes already connect policy and learning effectively, which would limit the mechanism’s reach.']],
    ['Would mean the mechanism does not apply', ['Learning or agency was never among a policy’s stated purposes.', 'A school pursues a different legitimate purpose, such as relief from unwanted digital contact, and claims nothing about learning.']],
    ['Would not settle it alone', ['A compliance rate, an unchanged test score, or an omitted measure.', 'Silence in a meeting record, an absent agenda item, or an interviewee’s retrospective account.']],
    ['Would change how the contribution is described', ['If the sequence adds nothing beyond means–ends decoupling, it is an application, not a separate construct.', 'If public debate shows no general sense of incompletion, that weakens the use of debate as motivation. It would not by itself disconfirm the institutional mechanism.']]
  ];

  const propositions = [
    ['First: do not assume equivalent changes', 'Reductions in personal-device use should not be assumed to produce equivalent changes in participation, classroom attention, or attainment. Studies should specify the boundary and examine these outcomes separately. Variation would be informative rather than evidence of implementation failure.'],
    ['Second: what the assistance does, and when', 'Where an assignment targets interpretation or explanation, the effects of automated assistance should depend on what the assistance does and when it appears. Prior knowledge and access needs are candidate moderators. The prediction is conditional, since preserving an initial attempt will not benefit students who lack the resources to make that attempt meaningful.'],
    ['Third: review of tasks and platforms', 'A policy accompanied by review of task design and platform configuration may create different learning opportunities from one implemented without that review. Testing this requires documentation of the instructional changes, not inference from a stated commitment.'],
    ['Fourth: institutional follow-through', 'Institutional follow-through may explain whether problems identified by teachers and students lead to changed learning conditions. Document analysis and interviews could examine which decisions were requested, who held authority, and what subsequently changed, which operationalizes the construct without assigning motives in advance.']
  ];

  byId('stress').innerHTML =
    '<div class="section-heading"><div><p class="eyebrow">THE CONSTRUCT ON TRIAL</p><h2 id="stress-title">What would count against it?</h2></div><span class="tag">Rivals and limits</span></div>' +
    '<p class="section-lead">The article treats neighboring accounts as rival explanations rather than background citations. It states the conditions under which the proposed construct would be unnecessary, and it offers a research agenda meant to test the mechanism, not to confirm it.</p>' +
    '<h3 class="part-heading">Neighboring accounts</h3>' +
    '<div class="inquiry-grid"><div class="question-picker" role="group" aria-label="Choose a neighboring account">' +
    rivalKeys.map((k, i) => '<button type="button" data-rival="' + k + '" aria-pressed="false">0' + (i + 1) + ' &nbsp; ' + esc(rivals[k].name) + '</button>').join('') + '</div>' +
    '<article class="evidence-card"><p class="eyebrow" id="rival-label"></p><h3 id="rival-title"></h3>' +
    '<h4 class="field">What the account explains</h4><p id="rival-explains"></p>' +
    '<h4 class="field">How the article relates it to the proposal</h4><p id="rival-relation"></p>' +
    '<div class="access-note"><strong>Companion prompts for telling them apart</strong><p class="mini">These questions are this page’s suggestions. They are not stated in the article.</p><ul id="rival-ask"></ul></div></article></div>' +
    '<h3 class="part-heading">Conditions that would limit or change the claim</h3>' +
    '<div class="stress-grid">' + boundaries.map(b => '<section class="stress-panel"><h4>' + esc(b[0]) + '</h4><ul>' + list(b[1]) + '</ul></section>').join('') + '</div>' +
    '<h3 class="part-heading">Four propositions for research</h3>' +
    '<div class="prop-list">' + propositions.map(p => '<details class="concept-note prop"><summary>' + esc(p[0]) + '</summary><p>' + esc(p[1]) + '</p></details>').join('') + '</div>' +
    '<details class="concept-note prop"><summary>A direct test</summary><p>A direct test would compare districts with different implementation results and different patterns of continued inquiry, rather than select only satisfied districts. Longitudinal document analysis and interviews could trace stated purposes, the timing of proximal improvements, interpretations of those results, and decisions about further evaluation.</p><p>Evidence for the mechanism would connect an improvement to a subsequent judgment that a broader question was settled or no longer warranted attention. Researchers would examine competing explanations, including capacity, costs, changed priorities, defensive routines, and pre-existing evaluation practices. Districts that sustain inquiry despite strong implementation, or curtail it before any improvement, would provide informative comparisons.</p></details>' +
    '<p class="form-note">Everything in this chapter is a proposal for inquiry. The article does not demonstrate that institutional unproductive success is prevalent, and nothing here establishes that most districts adopting device restrictions have foreclosed the instructional question.</p>';

  let currentRival = 'learning';
  function selectRival(key) {
    if (!Object.hasOwn(rivals, key)) throw new Error('Unknown account');
    currentRival = key;
    const r = rivals[key];
    byId('rival-label').textContent = r.src.toUpperCase();
    byId('rival-title').textContent = r.name;
    byId('rival-explains').textContent = r.explains;
    byId('rival-relation').textContent = r.relation;
    byId('rival-ask').innerHTML = list(r.ask);
    setPressed('data-rival', key);
    announce(r.name);
    return { account: key, name: r.name, relation: r.relation };
  }

  /* ------------------------------------------------------------------ */
  /* Article in brief, sources, terms, references                        */
  /* ------------------------------------------------------------------ */
  const map = [
    ['01 Test a claim', 'Section 5', 'Four hypothetical cases built on the four conditions of the construct'],
    ['02 Trace the mechanism', 'Section 5', 'The five moves, and how the construct differs from neighboring concepts'],
    ['03 Read the evidence', 'Section 3', 'Six sources on phone policy and what each can establish'],
    ['04 Read the statute', 'Sections 6 and 7', 'Illinois Public Act 104-0657 as a worked example'],
    ['05 Examine the task', 'Sections 4 and 7', 'Pedagogical friction as analytical lenses'],
    ['06 Stress-test the idea', 'Sections 5 and 9', 'Rival accounts, limits, and the research agenda'],
    ['07 Plan an inquiry', 'Section 8, Table 1', 'Six evidentiary questions and a downloadable sheet']
  ];
  byId('brief').innerHTML =
    '<summary>The article in brief</summary><div class="brief-body">' +
    '<div><h3>The claim</h3><p>A genuine improvement in a proximal outcome, such as fewer interruptions, can be treated as evidence of a broader educational purpose. The article proposes that this interpretation may reduce further inquiry into that purpose. It calls the sequence <em>institutional unproductive success</em>, extending Kapur’s account of unproductive success from the learner to institutional evaluation.</p></div>' +
    '<div><h3>What it does not claim</h3><p>The argument concerns inference rather than scope. A conduct policy is not defective for failing to govern curriculum, and useful restrictions need not be abandoned. The article is conceptual. It does not report district outcomes, and it does not establish that the sequence is prevalent.</p></div>' +
    '<div><h3>What it asks for</h3><p>Evidence that addresses the outcome claimed, and comparative research to test whether partial success contributes to premature closure.</p></div>' +
    '<div class="brief-map"><h3>Where each chapter comes from</h3><div class="table-wrap" role="region" aria-label="Map from companion chapters to article sections" tabindex="0"><table class="compare"><thead><tr><th scope="col">Companion chapter</th><th scope="col">Article</th><th scope="col">What it covers</th></tr></thead><tbody>' +
    map.map(r => '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>').join('') + '</tbody></table></div></div></div>';

  const terms = [
    ['Proximal outcome', 'An outcome close to an intervention, such as fewer visible phones or fewer interruptions.'],
    ['Performance and learning', 'Observable performance during instruction, and relatively durable learning that becomes visible later (Soderstrom & Bjork, 2015).'],
    ['Unproductive success', 'A learner performs correctly without having constructed the understanding the performance appears to demonstrate (Kapur, 2016). In Kapur’s account it is a property of a designed situation before it is a property of a person.'],
    ['Institutional unproductive success', 'A proposed sequence with four conditions: a genuine improvement in a valued proximal outcome; that improvement is treated as evidence of a broader educational purpose; evidence for the broader purpose remains insufficient; and the improvement contributes to reduced inquiry into that purpose.'],
    ['Premature closure', 'A narrowing or withdrawal of inquiry into a broader purpose after a proximal result is treated as sufficient evidence.'],
    ['Means–ends decoupling', 'A gap between organizational activities and the purposes they are intended to serve (Bromley & Powell, 2012).'],
    ['Pedagogical friction', 'The distinction between friction that serves a learning purpose and friction that obstructs participation without serving one (Miner, 2026).'],
    ['Infrastructural friction', 'The conditions, policies, platforms, schedules, and evaluative expectations under which the other dimensions of friction are sustained or dissolved.']
  ];

  function buildSources() {
    const refs = (window.MJM_REFERENCES || []).map(r => '<li>' + r + '</li>').join('');
    byId('source-content').innerHTML =
      '<h3>About this companion</h3>' +
      '<p>Adapted from Micah J. Miner’s conceptual manuscript, <em>Reclaimed Attention Is Not a Learning Outcome: Institutional Unproductive Success in K–12 Device Restriction</em>, following the manuscript revision of September 29, 2026. It illustrates the argument. It does not report a study of these cases or establish the construct’s prevalence.</p>' +
      '<p>Scenarios, task revisions, and the prompts marked as this page’s own are newly written, hypothetical illustrations. Statutory provisions are paraphrased from the text of 105 ILCS 5/10-20.88 as added by P.A. 104-657, read on September 29, 2026. The count of states with cellphone legislation in the article (42, plus the District of Columbia and Puerto Rico) follows the National Conference of State Legislatures page updated July 15, 2026.</p>' +
      '<p>The article names four dimensions of pedagogical friction, following the published account it cites. This companion shows the three learner-facing dimensions resting on an infrastructural base, which is the model Micah Miner currently uses in the dissertation. The dimensions are the same.</p>' +
      '<p>No numerical score, threshold, or intervention here has been validated. A case judgment requires evidence, including evidence that could challenge the interpretation. The inquiry form sends no notes to a server and uses no browser storage or AI service.</p>' +
      '<h3>Key terms</h3><dl class="terms">' + terms.map(t => '<dt>' + esc(t[0]) + '</dt><dd>' + esc(t[1]) + '</dd>').join('') + '</dl>' +
      '<h3>References in the article</h3><ul class="ref-list">' + refs + '</ul>';
  }
  buildSources();

  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-study]').forEach(b => b.addEventListener('click', () => selectStudy(b.dataset.study)));
  document.querySelectorAll('[data-provision]').forEach(b => b.addEventListener('click', () => selectProvision(b.dataset.provision)));
  document.querySelectorAll('[data-rival]').forEach(b => b.addEventListener('click', () => selectRival(b.dataset.rival)));
  selectStudy('beland'); selectProvision('scope'); selectRival('learning');
  announce('');

  window.MJM_EXTRA = { selectStudy, selectProvision, selectRival, studies: studyKeys, provisions: provisionKeys, rivals: rivalKeys };
})();
