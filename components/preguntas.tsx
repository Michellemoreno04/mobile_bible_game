import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

export const ArrayPreguntas = [ 
  {
    
    pregunta: '¿Quién creó el cielo y la tierra?',
    respuestas: ['Moisés', 'Dios', 'Abraham', 'Adán'],
    correcta: 'Dios',
    referencia: 'Génesis 1:1',
    textoBiblico: 'En el principio creó Dios los cielos y la tierra. La tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas. Y dijo Dios: Sea la luz; y fue la luz.',
  },
  {
    id: 2,
    pregunta: '¿Qué hizo Dios el séptimo día de la creación?',
    respuestas: ['Creó los animales', 'Descansó', 'Creó a los hombres', 'Separó las aguas'],
    correcta: 'Descansó',
    referencia: 'Génesis 2:2-3',
    textoBiblico: 'Y acabó Dios en el día séptimo la obra que hizo, y reposó el día séptimo de toda la obra que hizo. Y bendijo Dios al día séptimo y lo santificó, porque en él reposó de toda la obra que había hecho en la creación.',
  },
  {
    id: 3,
    pregunta: '¿Qué nombre tenían los primeros humanos?',
    respuestas: ['Caín y Abel', 'Moisés y Aarón', 'Adán y Eva', 'Noé y Sara'],
    correcta: 'Adán y Eva',
    referencia: 'Génesis 2:7, 2:22',
    textoBiblico: 'Entonces Jehová Dios formó al hombre del polvo de la tierra, y sopló en su nariz aliento de vida; y fue el hombre un ser viviente. Y de la costilla que Jehová Dios tomó del hombre, hizo una mujer, y la trajo al hombre.',
  },
  {
    id: 4,
    pregunta: '¿Qué colocó Dios para proteger el árbol de la vida después de que Adán y Eva pecaron?',
    respuestas: ['Un muro', 'Un querubín con una espada', 'Un río de fuego', 'Nada'],
    correcta: 'Un querubín con una espada',
    referencia: 'Génesis 3:24',
    textoBiblico: 'Echó, pues, fuera al hombre, y puso al oriente del huerto de Edén querubines, y una espada encendida que se revolvía por todos lados, para guardar el camino del árbol de la vida.',
  },
  {
    id: 5,
    pregunta: '¿Quién construyó un arca para salvar a su familia y los animales del diluvio?',
    respuestas: ['Moisés', 'Abraham', 'Noé', 'David'],
    correcta: 'Noé',
    referencia: 'Génesis 6:13-14',
    textoBiblico: 'Dijo, pues, Dios a Noé: He decidido el fin de todo ser, porque la tierra está llena de violencia a causa de ellos; y he aquí que yo los destruiré con la tierra. Hazte un arca de madera de gofer; harás aposentos en el arca, y la calafatearás con brea por dentro y por fuera.',
  },
  {
    id: 6,
    pregunta: '¿Qué señal dio Dios como pacto de que no volvería a destruir la tierra con un diluvio?',
    respuestas: ['Un trueno', 'Una paloma', 'Un arco iris', 'Un terremoto'],
    correcta: 'Un arco iris',
    referencia: 'Génesis 9:13-15',
    textoBiblico: 'Mi arco he puesto en las nubes, el cual será por señal del pacto entre mí y la tierra. Y sucederá que cuando haga venir nubes sobre la tierra, se dejará ver entonces mi arco en las nubes. Y me acordaré del pacto mío, que hay entre mí y vosotros y todo ser viviente de toda carne; y no habrá más diluvio de aguas para destruir toda carne.',
  },
  {
    id: 7,
    pregunta: '¿Qué pidió Dios a Abraham como prueba de fe?',
    respuestas: ['Construir un templo', 'Ofrecer a su hijo Isaac', 'Salir de su tierra', 'Dar sus riquezas'],
    correcta: 'Ofrecer a su hijo Isaac',
    referencia: 'Génesis 22:1-2',
    textoBiblico: 'Aconteció después de estas cosas, que probó Dios a Abraham, y le dijo: ¡Abraham! Y él respondió: Heme aquí. Y dijo: Toma ahora a tu hijo, tu único, Isaac, a quien amas, y vete a tierra de Moriah, y ofrécelo allí en holocausto sobre uno de los montes que yo te diré.',
  },
  {
    id: 8,
    pregunta: '¿Qué soñó Jacob que había en Betel?',
    respuestas: ['Un río', 'Una escalera al cielo', 'Un árbol frondoso', 'Un ángel'],
    correcta: 'Una escalera al cielo',
    referencia: 'Génesis 28:12',
    textoBiblico: 'Y soñó: y he aquí una escalera que estaba apoyada en tierra, y su extremo tocaba en el cielo; y he aquí ángeles de Dios que subían y descendían por ella.',
  },
  {
    id: 9,
    pregunta: '¿Qué recibió Moisés en el Monte Sinaí?',
    respuestas: ['Los Diez Mandamientos', 'La promesa de Canaán', 'El maná', 'Una vara'],
    correcta: 'Los Diez Mandamientos',
    referencia: 'Éxodo 20:1-17',
    textoBiblico: 'Y habló Dios todas estas palabras, diciendo: Yo soy Jehová tu Dios, que te saqué de la tierra de Egipto, de casa de servidumbre. No tendrás dioses ajenos delante de mí... (Los Diez Mandamientos completos).',
  },
  {
    id: 10,
    pregunta: '¿Qué cayó del cielo para alimentar a los israelitas en el desierto?',
    respuestas: ['Codornices', 'Maná', 'Panes', 'Higos'],
    correcta: 'Panes',
    referencia: 'Éxodo 16:4',
    textoBiblico: 'Y Jehová dijo a Moisés: He aquí, yo os haré llover pan del cielo; y el pueblo saldrá y recogerá diariamente la porción de un día, para que yo lo pruebe si anda en mi ley o no.',
  },
];

