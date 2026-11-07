import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'edutictac-account': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        'data-base'?: string
        'data-density'?: string
        'data-no-reload'?: string
        'data-home'?: string
        'data-lang'?: string
      }
    }
  }
}
