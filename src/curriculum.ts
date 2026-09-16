import type { Language } from './types'

export interface CurriculumProfile { id: string; level: string; course: string; subject: string; labels: Record<Language, string> }

export const valencianProfiles: CurriculumProfile[] = [
  { id: 'cv-infantil', level: 'Infantil', course: '2n cicle d’Educació Infantil', subject: '', labels: { es: 'Comunitat Valenciana · Infantil (2.º ciclo)', 'ca-valencia': 'Comunitat Valenciana · Infantil (2n cicle)', ca: 'Comunitat Valenciana · Infantil (2n cicle)', en: 'Valencian Community · Early childhood (2nd cycle)' } },
  { id: 'cv-primaria', level: 'Primaria', course: 'Educació Primària', subject: '', labels: { es: 'Comunitat Valenciana · Educación Primaria', 'ca-valencia': 'Comunitat Valenciana · Educació Primària', ca: 'Comunitat Valenciana · Educació Primària', en: 'Valencian Community · Primary education' } },
  { id: 'cv-eso-tecnologia', level: 'ESO', course: '4t ESO', subject: 'Tecnologia', labels: { es: 'Comunitat Valenciana · 4.º ESO · Tecnología', 'ca-valencia': 'Comunitat Valenciana · 4t ESO · Tecnologia', ca: 'Comunitat Valenciana · 4t ESO · Tecnologia', en: 'Valencian Community · Year 10 · Technology' } },
  { id: 'cv-eso-matematiques', level: 'ESO', course: '4t ESO', subject: 'Matemàtiques', labels: { es: 'Comunitat Valenciana · 4.º ESO · Matemáticas', 'ca-valencia': 'Comunitat Valenciana · 4t ESO · Matemàtiques', ca: 'Comunitat Valenciana · 4t ESO · Matemàtiques', en: 'Valencian Community · Year 10 · Mathematics' } },
  { id: 'cv-batx-tecnologia', level: 'Bachillerato', course: 'Batxillerat', subject: 'Tecnologia i Enginyeria', labels: { es: 'Comunitat Valenciana · Bachillerato · Tecnología e Ingeniería', 'ca-valencia': 'Comunitat Valenciana · Batxillerat · Tecnologia i Enginyeria', ca: 'Comunitat Valenciana · Batxillerat · Tecnologia i Enginyeria', en: 'Valencian Community · Baccalaureate · Technology and Engineering' } },
  { id: 'cv-batx-general', level: 'Bachillerato', course: 'Batxillerat', subject: '', labels: { es: 'Comunitat Valenciana · Bachillerato', 'ca-valencia': 'Comunitat Valenciana · Batxillerat', ca: 'Comunitat Valenciana · Batxillerat', en: 'Valencian Community · Baccalaureate' } }
]
