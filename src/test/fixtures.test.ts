// @vitest-environment jsdom
import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import { db } from '../db'
import { FIXTURE_OWNER, makePrompt, seedFixtures } from './fixtures'

afterEach(async () => {
  await Promise.all([
    db.prompts.clear(),
    db.categories.clear(),
    db.skills.clear(),
    db.skillRevisions.clear(),
    db.agents.clear(),
    db.agentRevisions.clear(),
  ])
})

describe('datos ficticios de la base de prueba', () => {
  it('carga prompts, categorías, agente e historial sin tocar datos reales', async () => {
    const fixtures = await seedFixtures(db)

    expect(await db.prompts.count()).toBe(2)
    expect(await db.categories.count()).toBe(1)
    expect(await db.agents.count()).toBe(1)
    expect(await db.agentRevisions.count()).toBe(1)
    expect(await db.skills.count()).toBe(1)
    expect(await db.skillRevisions.count()).toBe(1)

    expect((await db.prompts.get(fixtures.prompt.id))?.ownerId).toBe(FIXTURE_OWNER)
    expect((await db.prompts.get(fixtures.oldPrompt.id))?.values).toBeUndefined()
    expect((await db.agentRevisions.toArray())[0].snapshot.id).toBe(fixtures.agent.id)
  })

  it('permite crear prompts con propietario y estado distintos', async () => {
    const synced = makePrompt({ syncStatus: 'synced', remoteId: 'remote-1', version: 4 })
    const local = makePrompt({ syncStatus: 'local' })

    expect(synced.remoteId).toBe('remote-1')
    expect(synced.version).toBe(4)
    expect(local.remoteId).toBeUndefined()
  })
})
