import { useState, useDeferredValue, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { xml as langXml } from '@codemirror/lang-xml'
import { html as langHtml } from '@codemirror/lang-html'
import { useXsltTransform } from './useXsltTransform'
import { CopyButton } from './CopyButton'
import { formatXml } from './format'
import presetXmlText from './assets/preset.xml?raw'
import presetXslText from './assets/preset.xsl?raw'

function App() {
  const [xml, setXml] = useState(presetXmlText)
  const [xsl, setXsl] = useState(presetXslText)

  const deferredXml = useDeferredValue(xml)
  const defferedXsl = useDeferredValue(xsl)
  const xsltTransform = useXsltTransform()
  const { resultHtml, resultURL } = useMemo(
    () => xsltTransform(deferredXml, defferedXsl),
    [deferredXml, defferedXsl] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const [resultPreview, setResultPreview] = useState(false)
  const toggleResultPreview = () => setResultPreview(!resultPreview)

  return (
    <>
      <header>
        <h1>Online XSLT Transformer</h1>
      </header>
      <main>
        <section>
          <div>
            <h2>Data XML</h2>
            <button onClick={() => setXsl(formatXml(xml))}>format</button>
            <CopyButton copy={xml} />
          </div>
          <CodeMirror
            width="100%"
            height="100%"
            value={xml}
            onChange={setXml}
            extensions={[langXml()]}
          />
        </section>
        <section>
          <div>
            <h2>XSLT</h2>
            <button onClick={() => setXsl(formatXml(xsl))}>format</button>
            <CopyButton copy={xml} />
          </div>
          <CodeMirror
            width="100%"
            height="100%"
            value={xsl}
            onChange={setXsl}
            extensions={[langXml()]}
          />
        </section>
        <section>
          <div>
            <h2>Result</h2>
            <button onClick={toggleResultPreview}>code ↔ preview</button>
          </div>
          {!resultHtml ? (
            <div>Failed to transform</div>
          ) : resultPreview ? (
            <iframe title="Result Preview" src={resultURL} />
          ) : (
            <CodeMirror
              width="100%"
              height="100%"
              value={resultHtml}
              extensions={[langHtml()]}
              readOnly
            />
          )}
        </section>
      </main>
    </>
  )
}

export default App
