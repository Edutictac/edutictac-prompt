export type Safe = (work: () => Promise<void>) => Promise<void>
