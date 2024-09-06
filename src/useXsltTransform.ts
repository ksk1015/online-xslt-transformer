import { useCallback, useMemo } from 'react'

export function useXsltTransform() {
  const parser = useMemo(() => new DOMParser(), [])
  const processor = useMemo(() => new XSLTProcessor(), [])
  const xsltTransform = useCallback((xml: string, xsl: string) => {
    if (!xml || !xsl) {
      return { resultHtml: '', resultURL: '' }
    }
    const xmlDom = parser.parseFromString(xml, 'text/xml')
    const xslDom = parser.parseFromString(xsl, 'text/xml')
    processor.importStylesheet(xslDom)
    const resultDom = processor.transformToDocument(xmlDom)
    const resultHtml = resultDom.documentElement.outerHTML
    const resultBlob = new Blob([resultHtml], { type: 'text/html' })
    const resultURL = URL.createObjectURL(resultBlob)
    return { resultHtml, resultURL }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return xsltTransform
}
