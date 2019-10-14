import React, { useState } from 'react'
import _ from 'lodash'
import AppWrapper from 'components/AppWrapper';
import Card from 'components/Card';
import Input from 'components/Input';
import QRCode from 'qrcode.react'
import { Text } from 'components/Typography';
import Button from 'components/Button';
import FeatureFlagsWrapper from 'components/FeatureFlagsWrapper'

function SharePage({
    ...props
}) {
  const [url, setUrl] = useState('')
  return (
    <AppWrapper>
      <Card centered>
        <h1>Please use this code to access demo app</h1>
        <div>
          <Input
            placeholder='input sharable URL'
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
          />
        </div>
        {url && (
          <QRCode
            value={url}
            size={400}
          />
        )}
      </Card>
    </AppWrapper>
  )
}

export default FeatureFlagsWrapper(SharePage)
