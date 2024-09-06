import xmlFormattter from 'xml-formatter'

export function formatXml(xml: string): string {
  return xmlFormattter(xml, {
    indentation: '  ',
    collapseContent: true,
    lineSeparator: '\n',
  })
}