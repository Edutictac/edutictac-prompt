import { configure } from '@testing-library/dom'

// Las pantallas que se cargan en diferido (crear, ayuda, agentes) tardan más
// de 1 s en aparecer la primera vez cuando la máquina está cargada.
configure({ asyncUtilTimeout: 5000 })
