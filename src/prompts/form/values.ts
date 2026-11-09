import { templates } from '../../templates'

export const initialValues = (id: string): Record<string, string> => {
  const values = baseValues(id)
  const formats = templates.find((x) => x.id === id)?.fields.find((field) => field.id === 'outputFormat')?.options
  if (formats?.length && !formats.includes(values.outputFormat)) values.outputFormat = formats[0]
  return values
}
export const baseValues = (id: string): Record<string, string> =>
  id === 'free'
    ? {
        role: '',
        context: '',
        task: '',
        constraints: '',
        qualityCriteria: '',
        refinement: '',
        aiTool: '',
        udl: '',
        barriers: '',
        outputFormat: 'Markdown',
        curriculumProfile: '',
        curriculumContext: '',
        curriculumCompetences: '',
        curriculumCriteria: '',
        curriculumKnowledge: '',
      }
    : {
        level: '',
        course: '',
        subject: '',
        topic: '',
        objectives: '',
        methodology: '',
        duration: '',
        resources: '',
        visualStyle: '',
        includeLabels: '',
        aspectRatio: '',
        sections: '',
        branches: '',
        gameItems: '',
        gameFeatures: '',
        outputFormat: 'Markdown',
        context: '',
        constraints: '',
        qualityCriteria: '',
        refinement: '',
        aiTool: '',
        udl: '',
        barriers: '',
        curriculumProfile: '',
        curriculumContext: '',
        curriculumCompetences: '',
        curriculumCriteria: '',
        curriculumKnowledge: '',
      }
