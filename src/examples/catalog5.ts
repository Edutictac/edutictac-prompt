import type { Example } from '../examples'

export const examples5: Record<string, Example> = {
  'activity-evidence': {
    options: { level: 'ESO' },
    es: {
      subject: 'Ciencias',
      activity: 'En grupos elaboran un cartel sobre cómo ahorrar agua en el centro y explican sus propuestas.',
      objectives: 'Justificar medidas de ahorro de agua.',
      criteria: 'Argumenta propuestas a partir de datos.',
    },
    va: {
      subject: 'Ciències',
      activity: 'En grups elaboren un cartell sobre com estalviar aigua al centre i expliquen les propostes.',
      objectives: 'Justificar mesures d’estalvi d’aigua.',
      criteria: 'Argumenta propostes a partir de dades.',
    },
    en: {
      subject: 'Science',
      activity: 'Groups make a poster on saving water at school and explain their suggestions.',
      objectives: 'Justify water-saving measures.',
      criteria: 'Supports proposals with evidence.',
    },
  },
  flashcards: {
    options: { level: 'Primaria', questionCount: '10' },
    es: {
      subject: 'Ciencias',
      topic: 'El ciclo del agua',
      objectives: 'Recordar las fases y explicar ejemplos cotidianos.',
    },
    va: {
      subject: 'Ciències',
      topic: 'El cicle de l’aigua',
      objectives: 'Recordar les fases i explicar exemples quotidians.',
    },
    en: {
      subject: 'Science',
      topic: 'The water cycle',
      objectives: 'Recall the stages and explain everyday examples.',
    },
  },
  'prompt-coach': {
    options: { level: 'ESO' },
    es: {
      coachIdea: 'Quiero que mi clase aprenda a contrastar noticias sobre el cambio climático.',
      coachSource: '',
      subject: 'Ciencias',
    },
    va: {
      coachIdea: 'Vull que la classe aprenga a contrastar notícies sobre el canvi climàtic.',
      coachSource: '',
      subject: 'Ciències',
    },
    en: {
      coachIdea: 'I want my class to learn to check news about climate change.',
      coachSource: '',
      subject: 'Science',
    },
  },
}
