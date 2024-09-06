<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>XSLTのデモ</title>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>作品名</th>
              <th>著者名</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="books/book">
              <tr>
                <td>
                  <xsl:value-of select="title"/>
                </td>
                <td>
                  <xsl:value-of select="author"/>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
