"""Effetti sonori e musica dei due reel di Halloween, dal catalogo HeyGen (GET /v3/audio/sounds, royalty-free, via
../heygen_api.py), sulle stesse ancore di parola delle grafiche. Il catalogo non ha ululati, risate da strega, pipistrelli,
monete o versi da zombie: al loro posto vento, colpi, campanelle e whoosh, niente versi finti. Musica bassa sotto la voce
(Achille: «musica bassa»): carillon gotico per Jack, pizzicati spettrali e comici per i Fantasmi.

    python3 strumenti/halloween/suoni.py jack|fantasmi    -> audio/sfx/ (fuori da git) e <NOME>.mp4 con effetti e musica
    (prende <NOME>_voce.mp4, l'uscita di ../chicedomani/monta.py rinominata)
"""
import json, os, re, subprocess, sys, unicodedata, urllib.parse
QUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(QUI))
from heygen_api import chiama  # noqa: E402

PR = os.path.dirname(os.path.dirname(QUI))
# id: (tipo, ricerca, id nel catalogo)
CAT = {'vento': ('sound_effects', 'wind howling night', 'dcc590846602e641'),
       'campanella': ('sound_effects', 'small bell ding', '7c6ba3ea3c9e46ed'),
       'chime': ('sound_effects', 'small bell ding', '90afc952d842b17d'),
       'tonfo': ('sound_effects', 'heavy thud', '12b333917db1f54d'),
       'bussa': ('sound_effects', 'knock on wooden door', 'f7e66a7aed7b2dad'),
       'passi': ('sound_effects', 'footsteps on gravel', '723e684e250440eb'),
       'ding': ('sound_effects', 'ding notification', 'fd8d6893299c363d'),
       'tadan': ('sound_effects', 'trumpet fanfare tada comic', 'e552c4c922544a9b'),
       'boing': ('sound_effects', 'trumpet fanfare tada comic', 'f35ddfa09d9f17d3'),
       'colpo': ('sound_effects', 'trumpet fanfare tada comic', 'd045363c0970547e'),
       'tic': ('sound_effects', 'clock ticking', '44eb39f844d99de8'),
       'clic': ('sound_effects', 'light switch click', 'eada0ef7524f3144'),
       'whoosh': ('sound_effects', 'cartoon whoosh', 'a4855a82116cd4cc'),
       'squittio': ('sound_effects', 'bats flapping wings', '71335c7139f13308'),
       'brontolio': ('sound_effects', 'zombie groan', '5a245b7f81501e0c'),
       'mus_jack': ('music', 'gothic fairy tale music box ironic', '39fec2eee49d4dc4bc5f3b60707b40c7'),
       'mus_fantasmi': ('music', 'comic mysterious pizzicato halloween', '685f9059e4cf4904a712fa5318b42de8'),
       # Il Turno e SindaMatch
       'braam': ('sound_effects', 'cinematic braam trailer hit', '6b74643ad8f504d5'),
       'impatto': ('sound_effects', 'cinematic braam trailer hit', '06244e5719626722'),
       'battito': ('sound_effects', 'heartbeat', '229f33e1a7b45c4a'),
       'allarme': ('sound_effects', 'alarm bell ringing', '64bc0cce565b00cc'),
       'squillo': ('sound_effects', 'alarm bell ringing', '214ec99fcf5cc0e7'),
       'notifica': ('sound_effects', 'phone vibration notification', '9eddaec30faa56e8'),
       'urlo': ('sound_effects', 'horror scream', 'a5ab155e6c92d869'),
       'ringhio': ('sound_effects', 'monster growl', '826b34afc0761154'),
       'swish': ('sound_effects', 'swipe swoosh', 'df8c73ce46972f98'),
       'swipe': ('sound_effects', 'swipe swoosh', '8639f57528857966'),
       'entra': ('sound_effects', 'swipe swoosh', 'f21dfc942d4165a2'),
       'flash': ('sound_effects', 'camera shutter flash', '618e3c54f29b2c13'),
       'timbro': ('sound_effects', 'stamp hit', 'ce323edc9d058371'),
       'polvere': ('sound_effects', 'dust magic', '13eeab9e8d966740'),
       'applauso': ('sound_effects', 'party confetti pop celebration', '380346728d423751'),
       'pop': ('sound_effects', 'party confetti pop celebration', 'd9b59db7ed5ee90a'),
       'mus_turno': ('music', 'dark horror suspense drone trailer', '3bebd3594c384a39a9e2bf667169d32f'),
       'mus_turno2': ('music', 'upbeat happy feel good ukulele', 'd9757840300f4ddf8f16f139a037d78f'),
       'mus_sindamatch': ('music', 'playful quirky comedy pizzicato', '597cfa95682f4eb8b044949749d29787'),
       # La cicala e la formica (Le favole del sindacato)
       'grilli': ('sound_effects', 'cicadas summer', '08513ad11bd5bb0f'),
       'pagina': ('sound_effects', 'page turn paper', '9b77ef762e4f45f2'),
       'penna': ('sound_effects', 'pencil writing scribble', '4de5bc1dbd9d3657'),
       'fuoco': ('sound_effects', 'fire crackling fireplace', '13eeab9e8d966740'),
       'mus_cicala_estate': ('music', 'warm hopeful strings fairy tale', '5adf6fba8081444b9f2a3994b8924fef'),
       'mus_cicala_inverno': ('music', 'sad winter music box lullaby', '252a83d776f7455d98c0fa48ed896c1f'),
       'mus_cicala_caldo': ('music', 'warm hopeful strings fairy tale', 'eb24e1caa4b6428f92335a8578fec6d2'),
       # Favole del sindacato e format originali (novembre 2026)
       'folla': ('sound_effects', 'crowd applause', '70894df777ac4a9c'),
       'applausi': ('sound_effects', 'crowd applause', '0a051ee00d11c49e'),
       'tuono': ('sound_effects', 'thunder', '4e2771fb1edde669'),
       'scintille': ('sound_effects', 'magic sparkle reveal', '7a8855780e5aa978'),
       'giusto': ('sound_effects', 'game show correct answer', '1d639bb7221af440'),
       'sbagliato': ('sound_effects', 'game show wrong buzzer', 'f0dc033718d41d58'),
       'telefono': ('sound_effects', 'phone ringing', 'ed4f5e1c0afdcb05'),
       'cassa': ('sound_effects', 'coins jingle', '28b6e4d75153f21b'),
       'jingle': ('sound_effects', 'news jingle', '8a8c45eafe849252'),
       'mus_re': ('music', 'medieval fairy tale lute', '92638bba91c04aa7ad24570bd95a0ab5'),
       'mus_gatto': ('music', 'comic fairy tale sneaky', '35de200a682a4588bbaaa2f4504c8c52'),
       'mus_porcellini': ('music', 'comic fairy tale sneaky', 'b087deb37f3540fca00f32eef0e04059'),
       'mus_meteo': ('music', 'tv weather forecast music', 'd8f6d6df740546a7a824b8e0566b8333'),
       'mus_unboxing': ('music', 'unboxing upbeat lo-fi', 'ae1068d977dc4df0be8b51777299ae37'),
       'mus_quiz': ('music', 'quiz show music', 'c669d07ed127481398e4d0a1cfd604fc'),
       'mus_archeologi': ('music', 'documentary mysterious archaeology', '8271d164265641388b6b49df46684b6b'),
       'mus_parttime': ('music', 'soft tender acoustic warm', '651cf562bc1a48bbbca25615223a344e'),
       # Tracciamento delle segnalazioni e Librogame dei turni da 12 ore
       'ingranaggi': ('sound_effects', 'gears mechanism', '393934d3a3ccc457'),
       'notifica2': ('sound_effects', 'delivery notification', 'a26de62bfb206d77'),
       'mus_segnalazioni': ('music', 'driving upbeat corporate tech pulse', 'f3187970539143b7855d1d5ceca56f40'),
       'mus_librogame': ('music', 'adventure fantasy storybook orchestral', '7d1d88f242db4d1f880d02998b12adc9'),
       # serie «Convenzioni CISL FP» (novembre 2026)
       'chime2': ('sound_effects', 'airplane cabin chime', '54b0e998c19e209e'),
       'cassa2': ('sound_effects', 'cash register', '2d6aa30f6b865ec6'),
       'glitch': ('sound_effects', 'glitch digital', '226f9d29c7f85a23'),
       'clicmet': ('sound_effects', 'seatbelt click', '822731ea6a4ef9e4'),
       'coro': ('sound_effects', 'angelic choir', '051311662bb72ffe'),
       'mus_cv1': ('music', 'light jazz lounge travel', 'b0fd11912e5a412fb4d93f5f02ff4b9f'),
       'mus_cv2': ('music', 'tender piano nostalgic gentle', 'c9c01175b4684333b3f3a29adfe4733f'),
       'mus_cv3': ('music', 'calm night ambient soft', '92e39a6c045d4632b754603f4e200396'),
       'mus_cv4': ('music', 'playful board game quirky', '5449a25940c24efeb1c7d5cc031386c1'),
       'mus_cv5': ('music', 'summer beach acoustic happy', 'eb0e08d4cb274daba06388b516cd4133'),
       'mus_cv6': ('music', 'light pop upbeat everyday', 'bb5651df137e4768a49a92d1d2b73150'),
       'mus_cv7': ('music', 'bright hopeful uplifting', 'fce98786069d40e5bac3c7b437914218'),
       'mus_cv8': ('music', 'warm inspiring upbeat corporate', '01f87f542a254e4585f86300c081122e'),
       # «La sedia vuota» (RSU AOUP)
       'colpo2': ('sound_effects', 'door slam', 'c35b59ff77cb4574'),
       'mus_sedia': ('music', 'tense minimal piano reflective', '950ccb16ec664094b30849bcff1c0341'),
       'mus_sedia2': ('music', 'determined rising inspiring cinematic', 'ab1255090647457dbef93b43a0544641'),
       'mus_sedia_inno': ('music', 'epic solemn anthem slow', '40d447a922bc43f1a95a303a9d2ded15'),
       # «20 format attrattivi»
       'tastiera': ('sound_effects', 'keyboard typing', 'e401e115a4d1c08b'),
       'campanelli': ('sound_effects', 'sleigh bells jingle', '50a4850abf2ee0c4'),
       'bip_monitor': ('sound_effects', 'icu heart monitor beeping ventilator', '7f9f903f8724ee89'),
       'drone': ('sound_effects', 'hospital intensive care ambience', 'f36cf186798d8d4c'),
       'mus_natale': ('music', 'christmas warm festive light', '72dcef0e0bc64cf997540fcfda96fe4a')}
# musica a tratti: (chiave, scena da cui parte); Il Turno passa dall'horror alla commedia sul sequel (S06)
MUSICHE = {'turno': [('mus_turno', 'S01'), ('mus_turno2', 'S06')],
           'librogame': [('mus_librogame', 'S01'), ('mus_turno', 'S05'), ('mus_librogame', 'S06')],
           'cv7': [('mus_turno', 'S01'), ('mus_cv7', 'S03')],
           'sedia': [('mus_sedia_inno', 'S01')],   # v2: inno solenne su tutto (Achille, 4/11)
           'tr20': [('mus_unboxing', 'S01')], 'gf20': [('mus_segnalazioni', 'S01')], 'mito20': [('mus_quiz', 'S01')], 'cal20': [('mus_natale', 'S01')],
           'asmr20': [('mus_cv3', 'S01')], 'cl20': [('mus_sindamatch', 'S01')], 'an20': [('mus_cv8', 'S01')], 'mic20': [('mus_segnalazioni', 'S01')],
           'pg20': [('mus_cv8', 'S01')], 'sec20': [('mus_segnalazioni', 'S01')], 'pd20': [('mus_sindamatch', 'S01')], 'news20': [('mus_meteo', 'S01')], 'diz20': [('mus_cv4', 'S01')], 'vet20': [('mus_cv2', 'S01')], 'suono20': [('mus_quiz', 'S02')], 'nonna20': [('mus_cv2', 'S01')], 'sitcom20': [('mus_sindamatch', 'S01')],   # S01: solo il suono del reparto, la musica parte dopo
           # estate (ukulele da fiaba), inverno (carillon), formicaio (archi caldi)
           'cicala': [('mus_cicala_estate', 'S01'), ('mus_cicala_inverno', 'S03'), ('mus_cicala_caldo', 'S04')]}
# (scena, ancora, effetto, volume, durata massima o None)
EVENTI = {
    'nonna20': [('S01', 0.05, 'impatto', 0.3, None), ('S02', 0.1, 'pop', 0.2, None), ('S02', 'metti', 'pop', 0.2, None), ('S02', 'lazienda', 'ding', 0.22, None),
                ('S02', 'vantaggi', 'ding', 0.22, None), ('S03', 0.1, 'boing', 0.25, None), ('S04', 'rovigo', 'campanella', 0.3, None)],
    'sitcom20': [('S01', 0.05, 'impatto', 0.35, None), *[('S01', w, 'whoosh', 0.18, None) for w in ('rosa', 'marco', 'la', 'giulia')],
                 ('S02', 0.1, 'pop', 0.2, None), ('S02', 'e', 'pop', 0.2, None), ('S02', 'tesoro+0.3', 'boing', 0.3, None),
                 ('S03', 'chi', 'tonfo', 0.3, None), ('S03', 'arriva', 'whoosh', 0.2, None), ('S03', 'cosi', 'ding', 0.3, None), ('S04', 'rovigo', 'campanella', 0.3, None)],
    'diz20': [*[(s, 0.05, 'tonfo', 0.35, None) for s in ('S01', 'S02', 'S03')], *[(s, 2.2, 'whoosh', 0.18, None) for s in ('S01', 'S02', 'S03')],
              ('S01', 'senza', 'pop', 0.2, None), ('S02', 5.1, 'pop', 0.2, None), ('S03', 'per', 'pop', 0.2, None), ('S04', 'rovigo', 'campanella', 0.3, None)],
    'vet20': [('S01', 0.0, 'impatto', 0.4, None), *[('S02', w, 'pop', 0.2, None) for w in (0.1, 'intelligenza', 'ferie')], ('S02', 'presto', 'tonfo', 0.3, None),
              ('S03', 'rovigo', 'campanella', 0.3, None)],
    'suono20': [('S01', 0.05, 'impatto', 0.3, None), ('S01', 4.6, 'bip_monitor', 0.55, 5.4), ('S01', 4.6, 'drone', 0.35, 5.4),
                *[('S02', w, 'whoosh', 0.18, None) for w in (0.1, 'pronto', 'sala')], ('S03', 'terapia', 'ding', 0.35, None), ('S04', 'rovigo', 'campanella', 0.3, None)],
    'news20': [('S01', 0.0, 'impatto', 0.35, None), ('S01', 0.3, 'ding', 0.25, None), ('S02', 0.1, 'whoosh', 0.2, None), ('S02', 'seconda', 'whoosh', 0.2, None),
               ('S03', 0.1, 'sbagliato', 0.2, None), ('S03', 0.1, 'impatto', 0.3, None), ('S04', 'news', 'campanella', 0.3, None)],
    'pg20': [('S01', 0.0, 'impatto', 0.35, None), *[('S02', w, 'whoosh', 0.18, None) for w in (0.1, 'due', 'tre')],
             *[('S03', w, 'whoosh', 0.18, None) for w in (0.1, 'cinque', 'sei')], ('S04', 'rovigo', 'campanella', 0.3, None)],
    'sec20': [('S01', 0.05, 'pop', 0.25, None), ('S01', 0.2, 'impatto', 0.35, None), ('S02', 0.05, 'whoosh', 0.2, None),
              *[('S02', w, 'pop', 0.2, None) for w in ('perche', 'caffe', 7.3, 8.4, 9.5)], ('S02', 10.6, 'ding', 0.3, None),
              ('S03', 'rovigo', 'campanella', 0.3, None)],
    'pd20': [('S01', 0.0, 'impatto', 0.35, None), *[(s, 'prima', 'sbagliato', 0.2, None) for s in ('S02', 'S03')],
             *[(s, 'dopo', 'ding', 0.3, None) for s in ('S02', 'S03')], ('S04', 'rovigo', 'campanella', 0.3, None)],
    'asmr20': [('S01', 0.05, 'pagina', 0.3, None), ('S02', 0.05, 'pagina', 0.25, None), ('S02', 'queste', 'pagina', 0.25, None),
               ('S03', 0.05, 'pagina', 0.25, None), ('S03', 'qualcosa', 'pagina', 0.2, None), ('S04', 'rovigo', 'campanella', 0.25, None)],
    'cl20': [('S01', 0.0, 'impatto', 0.35, None), ('S01', 'classifica', 'pop', 0.25, None), ('S02', 0.1, 'timbro', 0.35, None),
             ('S02', 'fascia#2', 'timbro', 0.3, None), ('S03', 0.1, 'timbro', 0.3, None), ('S03', 'fascia', 'ding', 0.3, None),
             ('S03', 'rara', 'campanella', 0.3, None), *[('S04', w, 'ding', 0.22, None) for w in ('undici', 'festivi', 'cambi')],
             ('S05', 'rovigo', 'campanella', 0.3, None)],
    'an20': [('S01', 0.05, 'whoosh', 0.2, None), ('S01', 1.3, 'impatto', 0.35, None), ('S02', 0.1, 'whoosh', 0.18, None), ('S02', 'ma', 'whoosh', 0.18, None),
             ('S02', 'letto', 'tonfo', 0.35, None), ('S02', 'sempre', 'pop', 0.22, None), ('S03', 0.1, 'whoosh', 0.18, None),
             *[('S03', w, 'pop', 0.18, None) for w in ('telefono', 'terapia', 'sorriso')], ('S03', 'tutto', 'ding', 0.25, None),
             *[('S04', w, 'ding', 0.2, None) for w in ('accordi', 'corsi', 'cedolini', 'segnalazioni')], ('S05', 'feste', 'campanella', 0.3, None)],
    'mic20': [('S01', 0.0, 'impatto', 0.35, None), ('S01', 'abbiamo', 'pop', 0.22, None), ('S02', 0.05, 'whoosh', 0.2, None),
              *[('S02', x, 'whoosh', 0.15, None) for x in (4.4, 6.6, 8.8)], ('S03', 0.05, 'whoosh', 0.2, None),
              *[('S03', x, 'whoosh', 0.15, None) for x in (4.6, 6.8, 9.0)], ('S04', 'rovigo', 'campanella', 0.3, None)],
    'jack': [('S01', 0.0, 'vento', 0.35, 5.0), ('S01', 'chiamato$+0.1', 'campanella', 0.5, None), ('S01', 'furbo', 'colpo', 0.4, None),
             ('S02', 'diavolo', 'chime', 0.45, None), ('S02', 'tasca', 'tonfo', 0.5, None), ('S02', 'tasche', 'boing', 0.3, None),
             ('S03', 'arretrati', 'tadan', 0.22, 1.0), ('S03', 'aumenti', 'tadan', 0.22, 1.0), ('S03', 'date', 'tadan', 0.22, 1.0),
             ('S03', 'nessuno+0.3', 'tonfo', 0.8, None),
             ('S04', 'busso', 'bussa', 0.7, None), ('S04', 'busso#2', 'bussa', 0.7, None), ('S04', 'chiuso', 'tonfo', 0.4, None),
             ('S05', 0.0, 'vento', 0.3, 8.0), ('S05', 'vaga', 'passi', 0.35, 4.0), ('S05', 'lui', 'colpo', 0.4, None),
             ('S06', 'diciamo', 'ding', 0.4, None), ('S06', 'sole', 'ding', 0.4, None), ('S06', 'comunichiamo', 'ding', 0.4, None),
             ('S06', 'restiamo', 'ding', 0.4, None),
             ('S07', 'luci', 'chime', 0.35, None), ('S07', 'scherzetti', 'campanella', 0.3, None)],
    'fantasmi': [('S01', 0.0, 'vento', 0.3, 4.0), ('S01', 'fantasmi', 'colpo', 0.4, None), ('S01', 'righe', 'whoosh', 0.35, None),
                 ('S02', 0.1, 'tic', 0.3, 6.0), ('S02', 'straordinario', 'colpo', 0.35, None),
                 ('S03', 'strega', 'whoosh', 0.4, None), ('S03', 'magia', 'chime', 0.4, None),
                 ('S04', 'zombie', 'brontolio', 0.5, 2.5), ('S04', 'vita', 'boing', 0.3, None),
                 ('S05', 'vampiro', 'squittio', 0.35, None), ('S05', 'vampiro+0.4', 'whoosh', 0.35, None),
                 ('S05', 'luce', 'clic', 0.6, None),
                 ('S06', 0.1, 'clic', 0.6, None), ('S06', 'aglio', 'colpo', 0.3, None), ('S06', 'spariscono', 'whoosh', 0.45, None),
                 ('S07', 'aspettiamo', 'campanella', 0.3, None)],
    'turno': [*[('S01', x, 'battito', 0.45, None) for x in (0.0, 2.6, 5.2, 7.8)],
              ('S01', 'in', 'braam', 0.55, 3.0), ('S01', 'dove#2', 'braam', 0.55, 3.0), ('S01', 'una', 'braam', 0.6, 3.0),
              *[('S02', round(0.1 + i * 0.25, 2), 'ding', 0.18, None) for i in range(7)],
              ('S02', 'campanelli', 'allarme', 0.35, None), ('S02', 'oss', 'allarme', 0.4, None),
              ('S02', 'squilla', 'squillo', 0.45, 2.0), ('S02', 'coordinatore', 'braam', 0.6, 3.0),
              ('S03', 0.0, 'notifica', 0.5, None), ('S03', 'piu', 'urlo', 0.55, 0.5), ('S03', 'spariscono', 'braam', 0.5, 3.0),
              ('S04', 'turno', 'impatto', 0.7, 3.0), ('S04', 'critica', 'swish', 0.4, None), ('S04', 'unanime', 'swish', 0.4, None),
              ('S04', 'terrificante', 'swish', 0.4, None), ('S04', 'vera', 'braam', 0.55, 3.0),
              ('S05', 'mostri', 'ringhio', 0.5, 3.0), *[('S05', w, 'timbro', 0.35, None) for w in ('carenze', 'doppi', 'riposi', 'aggressioni')],
              ('S05', 'spariscono', 'braam', 0.5, 3.0),
              ('S06', 'seguito', 'chime', 0.4, None), ('S06', 'due', 'tadan', 0.3, 1.2), ('S06', 'film', 'campanella', 0.35, None),
              ('S07', 'paura', 'chime', 0.35, None), ('S07', 'noi', 'campanella', 0.3, None)],
    'sindamatch': [('S01', 0.1, 'pop', 0.4, None), ('S01', 'sindamatch', 'ding', 0.45, None), ('S01', 'attenzione', 'tonfo', 0.4, None),
                   *[x for s, w, fuori in (('S02', 'sinistra', 'volte'), ('S03', 'sinistra', 'sinistra'), ('S04', 'sinistra', 'croce'),
                                           ('S05', 'sinistra', 'avvolga'))
                     for x in ((s, 0.0, 'entra', 0.35, None), (s, w, 'timbro', 0.5, None), (s, fuori + ('$+0.2' if fuori == w else ''), 'swipe', 0.45, None))],
                   ('S03', 'buuu', 'whoosh', 0.45, None), ('S04', 'selfie', 'flash', 0.45, None), ('S04', 'fotografare', 'flash', 0.45, None),
                   ('S04', 'sinistra', 'squittio', 0.3, None), ('S05', 'mummia', 'polvere', 0.3, 2.0),
                   ('S06', 0.0, 'entra', 0.35, None), ('S06', 'destra', 'timbro', 0.5, None), ('S06', 'destra', 'chime', 0.4, None),
                   ('S06', 'ed', 'applauso', 0.45, None), ('S06', 'match', 'pop', 0.5, None), ('S06', 'match', 'tadan', 0.3, 1.2),
                   ('S07', 'appuntamento', 'chime', 0.35, None), ('S07', 'cedolino', 'campanella', 0.3, None)],
    'cicala': [('S01', 0.0, 'grilli', 0.25, 9.0), ('S01', 'cicala', 'campanella', 0.3, None), ('S01', 'preparava', 'chime', 0.3, None),
               ('S02', 0.0, 'grilli', 0.15, 9.0), *[('S02', w, 'pagina', 0.45, None) for w in ('cedolino', 'bando', 'sindacato', 'cantava')],
               *[('S02', w, 'penna', 0.5, None) for w in ('controllava', 'studiava', 'informava', 'preparava')],
               ('S03', 0.0, 'vento', 0.4, 9.0), ('S03', 'cera', 'tonfo', 0.4, None),
               ('S04', 'lha', 'whoosh', 0.35, None), ('S04', 'formicaio', 'chime', 0.4, None), ('S04', 'insieme', 'campanella', 0.35, None),
               ('S05', 0.0, 'fuoco', 0.25, 7.0), ('S05', 'sola', 'chime', 0.35, None),
               *[('S06', w, 'ding', 0.25, None) for w in ('cedolino', 'corsi', 'assistenza')], ('S06', 'rovigo', 'campanella', 0.3, None)],
    're': [('S01', 'annunci', 'tadan', 0.35, 1.5), ('S01', 'straordinario', 'scintille', 0.35, None),
           ('S02', 0.05, 'pagina', 0.5, None), ('S02', 'risultato', 'tadan', 0.35, 1.5), ('S02', 'niente', 'tonfo', 0.5, None),
           ('S02', 'applaudivano', 'folla', 0.35, 4.0),
           ('S03', 'dove+0.4', 'tonfo', 0.3, None), ('S03', 'risata', 'applausi', 0.3, None), ('S03', 'intero', 'folla', 0.4, 4.0),
           ('S04', 'riconosce', 'whoosh', 0.3, None), *[('S04', w, 'ding', 0.35, None) for w in ('firma', 'date', 'cifre', 'leggere')],
           ('S05', 'rovigo', 'campanella', 0.3, None)],
    'gatto': [('S01', 'volpe', 'whoosh', 0.3, None), ('S01', 'rifiutare', 'campanella', 0.3, None),
              ('S02', 0.05, 'tonfo', 0.45, None), ('S02', 'garantito', 'tadan', 0.3, 1.2), ('S02', 'meno+0.3', 'boing', 0.3, None),
              ('S03', 0.0, 'vento', 0.3, 6.0), ('S03', 'lombra', 'tonfo', 0.35, None), ('S03', 'subito', 'campanella', 0.3, None),
              ('S04', 'magico', 'scintille', 0.35, None), *[('S04', w, 'pop', 0.4, None) for w in ('contratti', 'cedolini', 'tutela', 'corsi', 'assistenza')],
              ('S05', 'rovigo', 'campanella', 0.3, None)],
    'porcellini': [('S01', 'lupo', 'brontolio', 0.3, 2.5), ('S01', 'riorganizzazioni', 'tonfo', 0.35, None),
                   ('S02', 'paglia', 'whoosh', 0.35, None), ('S02', 'legno', 'bussa', 0.4, None),
                   *[('S02', f'mattoni+{k * 0.2:.1f}', 'clic', 0.35, None) for k in range(7)],
                   ('S03', 'soffio', 'vento', 0.55, 6.0), ('S03', 'via', 'whoosh', 0.45, None), ('S03', 'due', 'boing', 0.3, None),
                   ('S04', 'soffio', 'vento', 0.35, 2.0), ('S04', 'soffio#3', 'vento', 0.35, 2.0), ('S04', 'piedi', 'tadan', 0.3, 1.5),
                   ('S05', 0.3, 'tonfo', 0.35, None), ('S05', 0.45, 'tonfo', 0.35, None), ('S05', 0.6, 'tonfo', 0.35, None),
                   ('S05', 'rovigo', 'campanella', 0.3, None)],
    'meteo': [('S01', 0.0, 'jingle', 0.4, None), ('S01', 'previsioni', 'whoosh', 0.3, None),
              ('S02', 'soccorso', 'tuono', 0.4, 2.5), ('S02', 'nebbia', 'vento', 0.3, 3.0), ('S02', 'grandinate', 'clic', 0.4, None),
              ('S02', 'grandinate+0.2', 'clic', 0.35, None), ('S02', 'grandinate+0.4', 'clic', 0.3, None), ('S02', 'venti', 'vento', 0.4, 3.0),
              ('S03', 0.0, 'allarme', 0.45, 1.2), ('S03', 'puoi', 'squillo', 0.4, 1.5),
              ('S04', 'schiarite', 'scintille', 0.4, None), *[('S04', w, 'ding', 0.35, None) for w in ('corsi', 'cedolini', 'assistenza')],
              ('S04', 'temperature', 'tadan', 0.25, 1.2),
              ('S05', 'migliora', 'scintille', 0.3, None), ('S05', 'sindacale', 'campanella', 0.35, None),
              ('S06', 'ombrello', 'whoosh', 0.3, None), ('S06', 'rovigo', 'jingle', 0.3, 2.5)],
    'unboxing': [('S01', 0.0, 'jingle', 0.4, None), ('S01', 'apriamola', 'whoosh', 0.35, None),
                 ('S02', 'controllo', 'pop', 0.45, None), ('S02', 'controllo+0.1', 'scintille', 0.3, None),
                 ('S03', 'corsi', 'pop', 0.45, None), ('S03', 'convenzioni', 'pop', 0.45, None), ('S03', 'incredibile', 'applausi', 0.3, None),
                 ('S04', 'assistenza', 'pop', 0.4, None), ('S04', 'patronato', 'pop', 0.4, None), ('S04', 'squadra', 'pop', 0.4, None),
                 ('S04', 'telefono', 'squillo', 0.35, 1.2),
                 *[('S05', f'stelle+{0.15 * i:.2f}', 'ding', 0.3, None) for i in range(5)], ('S05', 'modo', 'tonfo', 0.3, None),
                 ('S06', 'like', 'pop', 0.4, None), ('S06', 'iscrivetevi', 'tadan', 0.3, 1.2)],
    'quiz': [('S01', 0.0, 'jingle', 0.4, None), ('S01', 'parte', 'applausi', 0.35, None),
             *[('S02', w, 'ding', 0.25, None) for w in ('cinquanta', 'cento', 'centocinquanta', 'trecento')],
             ('S02', 'esatta', 'giusto', 0.5, None), ('S02', 'esatta+0.2', 'applausi', 0.35, None),
             *[('S03', w, 'ding', 0.25, None) for w in ('sei', 'undici', 'otto', 'dipende')], ('S03', 'coordinatore', 'sbagliato', 0.4, None),
             ('S03', 'esatta', 'giusto', 0.5, None), ('S03', 'incubo', 'folla', 0.25, 2.5),
             *[('S04', w, 'ding', 0.25, None) for w in ('gatto', 'loroscopo', 'cisl', 'nessuno')],
             ('S04', 'esatta', 'giusto', 0.5, None), ('S04', 'esatta+0.2', 'applausi', 0.4, None),
             ('S05', 'telefonata', 'telefono', 0.35, 2.5), ('S06', 'chiamaci', 'ding', 0.3, None), ('S06', 'rovigo', 'campanella', 0.3, None)],
    'archeologi': [('S01', 'anno', 'braam', 0.4, 3.0), ('S01', 'sconcertanti', 'tonfo', 0.3, None),
                   ('S02', 'dispositivo', 'scintille', 0.3, None), ('S02', 'notturno', 'boing', 0.25, None),
                   ('S03', 'zoccoli', 'scintille', 0.3, None), ('S03', 'collaborare', 'boing', 0.3, None),
                   ('S04', 'tessera', 'scintille', 0.45, None), ('S04', 'cambiare', 'chime', 0.35, None),
                   ('S05', 'duemilaventisei', 'whoosh', 0.3, None), ('S05', 'resto', 'ding', 0.3, None), ('S05', 'storia', 'ding', 0.3, None),
                   ('S05', 'adesso', 'campanella', 0.35, None), ('S06', 'rovigo', 'campanella', 0.3, None)],
    'parttime': [('S01', 0.0, 'tic', 0.25, 6.0), ('S01', 'bando', 'chime', 0.3, None),
                 ('S02', 0.2, 'whoosh', 0.25, None), *[('S02', w, 'ding', 0.3, None) for w in ('centotrentacinque', 'quattro', 'tre')],
                 *[('S03', w, 'whoosh', 0.18, None) for w in ('infermieri', 'diciannove', 'dodici')],
                 *[('S04', w, 'ding', 0.3, None) for w in ('indeterminato', 'servizio', 'gia')], ('S04', 'revisione', 'tonfo', 0.3, None),
                 *[('S05', w, 'clic', 0.3, None) for w in ('patologie', 'lhandicap', 'lassistenza', 'figli', 'leta', 'notti')],
                 *[('S06', w, 'pop', 0.3, None) for w in ('ferie', 'incarico', 'documenti', 'modello')],
                 *[('S07', w, 'ding', 0.25, None) for w in ('mano', 'raccomandata', 'pec')], ('S07', 'noi', 'campanella', 0.3, None),
                 ('S08', 'rovigo', 'campanella', 0.3, None)],
    'segnalazioni': [('S01', 0.0, 'notifica2', 0.35, None), ('S01', 'tracciamento', 'ding', 0.25, None), ('S01', 'punto', 'notifica', 0.3, None),
                     *[('S02', w, k, v, None) for w, k, v in (('uno', 'whoosh', 0.2), ('sciopero', 'clic', 0.25), ('verifichiamo', 'ding', 0.3),
                                                               ('due', 'whoosh', 0.2), ('infettive', 'clic', 0.25), ('parziale', 'ding', 0.3))],
                     ('S03', 0.2, 'whoosh', 0.2, None), ('S03', 'transito', 'clic', 0.25, None), ('S03', 'tavolo', 'notifica', 0.3, None),
                     ('S03', 'linea', 'whoosh', 0.2, None), *[('S03', f'{w}+0.35', 'ding', 0.25, None) for w in ('rispetto', 'regole', 'possibilita', 'nessuna')],
                     ('S03', 'consegna+0.2', 'tonfo', 0.3, None),
                     ('S04', 'quattro', 'whoosh', 0.2, None), ('S04', 'pediatria', 'ingranaggi', 0.35, 1.5), ('S04', 'lavorazione', 'ding', 0.3, None),
                     ('S04', 'sale', 'whoosh', 0.2, None), ('S04', 'operatorie', 'ingranaggi', 0.35, 1.5), ('S04', 'chiamate', 'ding', 0.3, None),
                     ('S05', 'sei', 'whoosh', 0.2, None), ('S05', 'rinviata', 'sbagliato', 0.35, None),
                     ('S05', 'sette', 'whoosh', 0.2, None), ('S05', 'attesa', 'tic', 0.25, 3.0),
                     *[('S06', f'{w}+0.35', 'ding', 0.25, None) for w in ('sicurezza', 'rispetto', 'organizzazione', 'ascolto', 'attenzione')],
                     ('S07', 'continuiamo', 'whoosh', 0.2, None), ('S07', 'tavolo', 'notifica', 0.3, None),
                     ('S08', 'rovigo', 'campanella', 0.3, None)],
    'librogame': [*[(s, 0.0, 'pagina', 0.4, None) for s in ('S01', 'S02', 'S03', 'S04', 'S05')], ('S01', 'tu', 'chime', 0.3, None),
                  ('S02', 'provare', 'ding', 0.25, None), ('S02', 'preferisci', 'ding', 0.25, None), ('S02', 'giuste', 'chime', 0.3, None),
                  *[('S03', w, 'whoosh', 0.18, None) for w in ('richiesta', 'direzioni', 'passaggi', 'verifica')],
                  *[('S04', w, 'pop', 0.3, None) for w in ('imposto', 'irreversibile', 'stesse')],
                  ('S05', 'trappola', 'braam', 0.35, 3.0), ('S05', 'consegna+0.2', 'tonfo', 0.35, None), ('S05', 'vale', 'timbro', 0.5, None),
                  *[('S06', w, 'whoosh', 0.2, None) for w in ('criteri', 'rispetto', 'attenzione', 'possibilita', 'coinvolgimento')],
                  ('S07', 'decide', 'applausi', 0.25, 2.5), ('S08', 'rovigo', 'campanella', 0.3, None)],
    'cv1': [('S01', 0.0, 'chime2', 0.35, None), *[('S02', w, 'whoosh', 0.18, None) for w in ('turni', 'colpa', 'senza', 'tasca+0.6')],
            ('S03', 'paracadute', 'clicmet', 0.35, None), *[('S04', w, 'ding', 0.25, None) for w in ('iscritto', 'accedi', 'attivi')],
            ('S04', 'libera', 'pop', 0.3, None), ('S05', 'rovigo', 'campanella', 0.3, None)],
    'cv2': [('S01', 0.0, 'chime', 0.25, None), ('S02', 'iscrivesti', 'penna', 0.25, 3.0),
            *[('S03', f'{w}+0.35', 'ding', 0.2, None) for w in ('visite', 'ricoveri', 'prevenzione', 'fisioterapia', 'dentale', 'telemedicina')],
            ('S03', 'migliaia', 'chime', 0.3, None), ('S05', 'rovigo', 'campanella', 0.3, None)],
    'cv3': [('S01', 0.0, 'tic', 0.25, 6.0), *[('S02', w, 'whoosh', 0.18, None) for w in ('aspettare', 'correre', 'peggiore')],
            ('S02', 'internet+0.2', 'sbagliato', 0.3, None), ('S03', 'lapp', 'notifica2', 0.35, None),
            *[('S04', w, 'whoosh', 0.2, None) for w in ('tutto', 'xte', 'alpifarma')], ('S05', 'rovigo', 'campanella', 0.3, None)],
    'cv4': [('S01', 'dadi', 'clicmet', 0.35, None), *[('S02', w, 'clic', 0.3, None) for w in ('iul', 'izeos', 'unitelma', 'unifortunato', 'ecm', 'inglese')],
            ('S03', 'carta', 'pagina', 0.4, None), ('S03', 'imprevisti+0.4', 'tonfo', 0.3, None), ('S03', 'opportunita', 'scintille', 0.35, None),
            ('S04', 'mossa', 'applausi', 0.2, 2.5), ('S05', 'rovigo', 'campanella', 0.3, None)],
    'cv5': [('S02', 0.0, 'whoosh', 0.25, None), ('S02', 'flash', 'timbro', 0.45, None), ('S03', 0.0, 'whoosh', 0.25, None),
            ('S03', 'bitq', 'timbro', 0.45, None), ('S04', 'saluti', 'ding', 0.25, None), ('S05', 'salute', 'chime', 0.3, None)],
    'cv6': [('S01', 0.0, 'allarme', 0.25, 1.5), *[('S02', w, 'cassa2', 0.25, None) for w in ('nove', 'dieci', 'piadina', 'capo')],
            ('S03', 'venti', 'chime', 0.3, None), *[('S04', w, 'ding', 0.25, None) for w in ('luce', 'depuratore', 'piattaforma', 'lauto')],
            ('S05', 'rovigo', 'campanella', 0.3, None)],
    'cv7': [('S01', 0.0, 'tuono', 0.35, None), ('S01', 'pec', 'braam', 0.3, 3.0), ('S01', 'spid', 'tonfo', 0.3, None),
            *[('S02', w, 'glitch', 0.3, None) for w in ('password', 'codici', 'file', 'sessione', 'spiegazioni')],
            ('S03', 'esorcismo', 'coro', 0.35, None), ('S04', 'clic', 'clic', 0.3, None), ('S05', 'rovigo', 'campanella', 0.3, None)],
    'cv8': [('S01', 0.0, 'cassa2', 0.35, None), *[('S02', w, 'clic', 0.2, None) for w in ('farmacia', 'animali', 'universita', 'meta', 'enogastronomia',
                                                                                          'cinema', 'viaggi', 'polizza', 'fondo', 'medico')],
            ('S02', 'famiglia', 'cassa2', 0.3, None), *[('S03', f'{w}+0.35', 'ding', 0.25, None) for w in ('contratto', 'cedolino', 'corsi', 'lassistenza', 'qualcuno')],
            ('S04', 'sorprende', 'scintille', 0.35, None), ('S05', 'rovigo', 'campanella', 0.3, None)],
    'sedia': [('S01', 0.0, 'tic', 0.3, 11.0), *[('S02', w, 'whoosh', 0.18, None) for w in ('eleggete', 'riunisce', 'siede', 'accordi')],
              ('S03', 'ventotto#2', 'ding', 0.3, None), ('S03', 'ventisette', 'colpo2', 0.45, None),
              *[('S04', f'mesi+{0.3 * k:.2f}', 'timbro', 0.25, None) for k in range(6)], ('S04', 'legale', 'sbagliato', 0.3, None),
              *[('S05', w, 'clic', 0.25, None) for w in ('condizioni', 'pediatria', 'banca', 'welfare')], ('S05', 'migliaia', 'chime', 0.25, None),
              ('S06', 0.2, 'impatto', 0.4, None), ('S06', 'eletti', 'pagina', 0.3, None),
              ('S07', 'giovanna-0.3', 'whoosh', 0.2, None),
              *[('S09', w, 'tonfo', 0.25, None) for w in ('responsabilita', 'presenza#2', 'rispetto#3')], ('S09', 'sempre', 'campanella', 0.3, None)],
    'tr20': [('S01', 0.0, 'impatto', 0.35, None), ('S01', 'ottimizzazione-0.2', 'whoosh', 0.2, None), ('S01', 'traduzione', 'tonfo', 0.35, None),
             ('S01', 'traduzione', 'tastiera', 0.3, None), *[('S02', w, 'tastiera', 0.3, None) for w in ('chiamiamo', 'stesse', 'ora')],
             *[('S02', w, 'whoosh', 0.18, None) for w in ('riorganizzazione', 'questione')], *[('S03', w, 'whoosh', 0.18, None) for w in ('valorizzazione', 'classico')],
             ('S02', 'niente', 'boing', 0.25, None), *[('S03', w, 'tastiera', 0.3, None) for w in ('si', 'diciamo', 'traduzione')],
             ('S03', 'forse', 'boing', 0.25, None), ('S04', 'rovigo', 'campanella', 0.3, None)],
    'gf20': [*[('S01', w, k, 0.3, None) for w, k in (('green', 'ding'), ('bluered', 'sbagliato'), ('green#2', 'ding'))],
             *[('S02', w, k, 0.3, None) for w, k in (('bluered', 'sbagliato'), ('green', 'ding'), ('bluered#2', 'sbagliato'))],
             ('S01', 0.0, 'impatto', 0.35, None), *[(s, w, 'whoosh', 0.18, None) for s, w in (('S01', 'bluered'), ('S01', 'green#2'), ('S02', 'green'), ('S02', 'bluered#2'))],
             ('S03', 'rovigo', 'campanella', 0.3, None)],
    'mito20': [('S01', 0.0, 'impatto', 0.35, None), *[(s, 'falso', 'timbro', 0.5, None) for s in ('S01', 'S02', 'S03')], *[(s, 0.1, 'whoosh', 0.2, None) for s in ('S01', 'S02', 'S03')],
               ('S04', 'rovigo', 'campanella', 0.3, None)],
    'cal20': [*[(f'S{k:02d}', 0.0, 'campanelli', 0.3, 2.5) for k in range(1, 25)], *[(f'S{k:02d}', 'domani', 'whoosh', 0.15, None) for k in range(1, 25)], ('S25', 0.0, 'campanelli', 0.3, 2.5), ('S25', 0.05, 'impatto', 0.3, None), ('S25', 2.6, 'whoosh', 0.18, None), ('S25', 4.5, 'tonfo', 0.35, None), ('S25', 5.75, 'whoosh', 0.15, None), ('S25', 'feste', 'campanella', 0.3, None)]}
NOMI = {'jack': 'PDRO_Halloween_Jack_O_Lantern_9x16', 'fantasmi': 'PDRO_Halloween_Fantasmi_del_cedolino_9x16',
        'turno': 'PDRO_Halloween_Il_Turno_trailer_9x16', 'sindamatch': 'PDRO_Halloween_SindaMatch_9x16',
        'cicala': 'PDRO_Favole_La_cicala_e_la_formica_9x16', 're': 'PDRO_Favole_Il_Re_e_l_accordo_invisibile_9x16',
        'gatto': 'PDRO_Favole_Il_Gatto_la_Volpe_e_il_Campo_dei_Miracoli_9x16', 'porcellini': 'PDRO_Favole_I_tre_porcellini_e_il_lupo_9x16',
        'meteo': 'PDRO_Originali_Il_meteo_dei_diritti_9x16', 'unboxing': 'PDRO_Originali_Unboxing_CISL_FP_9x16',
        'quiz': 'PDRO_Originali_Il_Quizzone_della_corsia_9x16', 'archeologi': 'PDRO_Originali_Gli_archeologi_del_futuro_9x16',
        'parttime': 'PDRO_Bando_Part_time_2026_AOUP_9x16', 'segnalazioni': 'PDRO_Le_tue_segnalazioni_a_che_punto_sono_9x16',
        'librogame': 'PDRO_Scegli_il_tuo_turno_turni_12_ore_9x16', 'cv1': 'PDRO_Convenzioni_1_Colpa_grave_9x16', 'cv2': 'PDRO_Convenzioni_2_Fondo_sanitario_9x16', 'cv3': 'PDRO_Convenzioni_3_Medico_H24_9x16', 'cv4': 'PDRO_Convenzioni_4_Formazione_9x16', 'cv5': 'PDRO_Convenzioni_5_Tempo_libero_9x16', 'cv6': 'PDRO_Convenzioni_6_Acquisti_9x16', 'cv7': 'PDRO_Convenzioni_7_Digitale_9x16', 'cv8': 'PDRO_Convenzioni_8_Quanto_vale_la_tessera_9x16', 'sedia': 'RSU_AOUP_La_sedia_vuota_9x16', 'tr20': 'PDRO_20F_01_Il_traduttore_aziendalese_9x16', 'gf20': 'PDRO_20F_02_Green_flag_Blue_red_flag_9x16', 'mito20': 'PDRO_20F_03_Mito_da_sfatare_9x16', 'cal20': 'PDRO_20F_04_Calendario_avvento_diritti_9x16', 'asmr20': 'PDRO_20F_05_ASMR_del_cedolino_9x16', 'cl20': 'PDRO_20F_06_Classifica_dei_turni_9x16', 'an20': 'PDRO_20F_07_Il_tuo_anno_in_corsia_9x16', 'mic20': 'PDRO_20F_08_Microfono_in_corsia_9x16', 'pg20': 'PDRO_20F_09_Primo_giorno_in_ospedale_9x16', 'sec20': 'PDRO_20F_10_60_secondi_con_9x16', 'pd20': 'PDRO_20F_11_Prima_e_dopo_9x16', 'news20': 'PDRO_20F_14_Corsia_News_9x16', 'diz20': 'PDRO_20F_13_Dizionario_della_corsia_9x16', 'vet20': 'PDRO_20F_16_I_veterani_reagiscono_9x16', 'suono20': 'PDRO_20F_17_Indovina_il_reparto_9x16', 'nonna20': 'PDRO_20F_12_Spiegato_a_mia_nonna_9x16', 'sitcom20': 'PDRO_20F_15_Reparto_7_9x16'}
MUSICA_VOL = 0.13
MUSICA_VOL_V = {'sedia': 0.06}   # «La sedia vuota»: musica più bassa (Achille, 5/11)
CARTELLE = {'cicala': 'pdro-favola-cicala-formica', 're': 'pdro-favola-re-e-accordo-invisibile', 'gatto': 'pdro-favola-gatto-volpe-campo-dei-miracoli', 'porcellini': 'pdro-favola-tre-porcellini-e-il-lupo', 'meteo': 'pdro-originale-meteo-dei-diritti', 'unboxing': 'pdro-originale-unboxing-cisl-fp', 'quiz': 'pdro-originale-quizzone-della-corsia', 'archeologi': 'pdro-originale-archeologi-del-futuro', 'parttime': 'pdro-bando-part-time-2026', 'segnalazioni': 'pdro-tracciamento-segnalazioni-aoup', 'librogame': 'pdro-turni-12-ore-librogame', 'cv1': 'pdro-convenzioni-1-colpa-grave', 'cv2': 'pdro-convenzioni-2-fondo-sanitario', 'cv3': 'pdro-convenzioni-3-medico-h24', 'cv4': 'pdro-convenzioni-4-formazione', 'cv5': 'pdro-convenzioni-5-tempo-libero', 'cv6': 'pdro-convenzioni-6-acquisti', 'cv7': 'pdro-convenzioni-7-digitale', 'cv8': 'pdro-convenzioni-8-quanto-vale-la-tessera', 'sedia': 'pdro-rsu-la-sedia-vuota', 'tr20': 'pdro-20f-01-traduttore-aziendalese', 'gf20': 'pdro-20f-02-green-flag', 'mito20': 'pdro-20f-03-mito-da-sfatare', 'cal20': 'pdro-20f-04-calendario-avvento', 'asmr20': 'pdro-20f-05-asmr-del-cedolino', 'cl20': 'pdro-20f-06-classifica-dei-turni', 'an20': 'pdro-20f-07-il-tuo-anno-in-corsia', 'mic20': 'pdro-20f-08-microfono-in-corsia', 'pg20': 'pdro-20f-09-primo-giorno-in-ospedale', 'sec20': 'pdro-20f-10-60-secondi-con', 'pd20': 'pdro-20f-11-prima-e-dopo', 'news20': 'pdro-20f-14-corsia-news', 'diz20': 'pdro-20f-13-dizionario-della-corsia', 'vet20': 'pdro-20f-16-i-veterani-reagiscono', 'suono20': 'pdro-20f-17-indovina-il-reparto', 'nonna20': 'pdro-20f-12-spiegato-a-mia-nonna', 'sitcom20': 'pdro-20f-15-reparto-7-sitcom'}


def norm(s):
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode())


def ancora(v, parole):
    """Stessa sintassi del motore: «parola», «parola#2», «parola$» (fine), «parola+0.3»."""
    if isinstance(v, (int, float)):
        return float(v)
    m = re.match(r'^([^#+\-$]+)(?:#(\d+))?(\$)?([+-][\d.]+)?$', v); w, n = norm(m[1]), int(m[2] or 1); k = 0
    for p in parole:
        if norm(p['w']) == w:
            k += 1
            if k == n:
                return (p['b'] if m[3] else p['a']) + float(m[4] or 0)
    raise ValueError(f'parola {v} non trovata')


def scarica(D, v=None):
    os.makedirs(f'{D}/audio/sfx', exist_ok=True)
    # solo i suoni che il video usa davvero (eventi e musiche): la cache può mancare e ogni ricerca nel catalogo costa
    servono = None if v is None else {e[2] for e in EVENTI.get(v, [])} | {m for m, _ in MUSICHE.get(v, [(f'mus_{v}', None)])}
    for k, (tipo, q, sid) in CAT.items():
        if servono is not None and k not in servono:
            continue
        f = f'{D}/audio/sfx/{k}.mp3'
        if os.path.exists(f):
            continue
        # cache condivisa: ogni ricerca nel catalogo HeyGen costa crediti della chiave API, i suoni si scaricano una volta sola
        cache = f'{QUI}/sfx_cache/{k}.mp3'
        if os.path.exists(cache):
            subprocess.run(['cp', cache, f], check=True); continue
        r = chiama('GET', '/v3/audio/sounds?' + urllib.parse.urlencode({'type': tipo, 'query': q, 'limit': 12, 'min_score': 0.3}))
        s = next(x for x in (r if isinstance(r, list) else r.get('sounds') or []) if x['id'] == sid)
        subprocess.run(['curl', '-sS', '-L', '-o', f + '.tmp', s['audio_url']], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f + '.tmp', '-ar', '48000', '-ac', '2', f], check=True); os.remove(f + '.tmp')
        os.makedirs(f'{QUI}/sfx_cache', exist_ok=True); subprocess.run(['cp', f, cache], check=True)
        print(k, s['name'], s['id'])


def mescola(v, D):
    nome = NOMI[v]
    tempi = {t['id']: t for t in json.load(open(f'{D}/audio/tempi-scene.json'))}
    parole = json.load(open(f'{D}/audio/parole.json'))
    tot = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{D}/{nome}_voce.mp4'],
                               capture_output=True, text=True).stdout)
    ins = ['-i', f'{D}/{nome}_voce.mp4']; fil = []; et = []
    tratti = MUSICHE.get(v, [(f'mus_{v}', None)])
    for j, (k, sid) in enumerate(tratti):
        t0 = tempi[sid]['inizio'] if sid else 0.0
        t1 = tempi[tratti[j + 1][1]]['inizio'] if j + 1 < len(tratti) else tot
        d, ms = t1 - t0, round(t0 * 1000)
        ins += ['-stream_loop', '-1', '-i', f'{D}/audio/sfx/{k}.mp3']
        fin = f',afade=t=out:st={d - 2.5:.2f}:d=2.5' if j + 1 == len(tratti) else f',afade=t=out:st={d - 0.15:.2f}:d=0.15'
        fil.append(f'[{j + 1}:a]atrim=0:{d:.2f},volume={MUSICA_VOL_V.get(v, MUSICA_VOL)},afade=t=in:d={1.5 if j == 0 else 0.05}{fin},'
                   f'adelay={ms}|{ms}[mus{j}]'); et.append(f'[mus{j}]')
    for i, (sid, a, k, vol, dmax) in enumerate(EVENTI[v], len(tratti) + 1):
        t = tempi[sid]['inizio'] + ancora(a, parole.get(sid, []))
        ins += ['-i', f'{D}/audio/sfx/{k}.mp3']
        cod = f',atrim=0:{dmax},afade=t=out:st={max(0, dmax - 0.6)}:d=0.6' if dmax else ''
        ms = round(t * 1000)
        fil.append(f'[{i}:a]volume={vol}{cod},adelay={ms}|{ms}[e{i}]'); et.append(f'[e{i}]')
        print(f'{sid} {a!s:>16} {k:10} {t:7.2f}')
    fil.append('[0:a]' + ''.join(et) + f'amix=inputs={len(et) + 1}:normalize=0:duration=first,alimiter=limit=0.95[a]')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fil), '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{nome}.mp4'], check=True)
    # −16 LUFS come gli altri reel PDRO (il missaggio esce intorno a −20)
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', f'{D}/{nome}.mp4', '-af', 'ebur128', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    g = -16 - float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1])
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{D}/{nome}.mp4', '-af', f'volume={g:.2f}dB,alimiter=limit=0.89:level=false',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'{D}/{nome}.tmp.mp4'], check=True)
    os.replace(f'{D}/{nome}.tmp.mp4', f'{D}/{nome}.mp4')
    print('montato con effetti e musica', nome, f'guadagno {g:+.1f} dB')


if __name__ == '__main__':
    for v in sys.argv[1:]:
        D = f"{PR}/{CARTELLE.get(v, f'pdro-halloween-{v}')}"; scarica(D, v); mescola(v, D)
