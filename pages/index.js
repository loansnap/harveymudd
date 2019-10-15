import React, { useState, useContext, useCallback } from 'react'
import _ from 'lodash'
import Button, { ButtonRow } from 'components/Button';
import AppWrapper from 'components/AppWrapper';
import { Row, Col } from 'components/Layout';
import Card from 'components/Card';
import CollapsibleCard from 'components/CollapsibleCard';
import Input from 'components/Input';
import { Text } from 'components/Typography';
import { useFeatureFlagsValues, useFeatureFlag } from 'magic/feature_flags';
import { resetIdentifier, useIdentifier, getNarrowTestGroupNumber } from 'utils/identifier';
import { sleep, formFormatNumber, parseNumber } from 'utils/helpers';
import FeatureFlagsWrapper from 'components/FeatureFlagsWrapper'
import { useTrackEvent } from 'utils/metrics';
import MortgageCalculator from 'components/MortgageCalculator';
import { getResidinces } from 'utils/marketplace';
import ResidenceCard from 'components/ResidenceCard';

function IndexPage() {
  const identifier = useIdentifier()
  const [priceLimitInput, setPriceLimitInput] = useState('650,000')
  const [selectedResidence, setSelectedResidence] = useState(null)
  const priceLimit = priceLimitInput ? parseNumber(priceLimitInput) : null
  const [searchResults, setSearchResults] = useState([])
  const showPointlessButton = useFeatureFlag('SHOW_POINTLESS_BUTTON')
  const [welcomeTitle, brandColor, mainButtonFontSize] = useFeatureFlagsValues(['WELCOME_TITLE', 'BRAND_COLOR', 'MAIN_BUTTON_FONT_SIZE'])
  const trackEvent = useTrackEvent()
  const onResetIdentifier = useCallback(() => {
    trackEvent('Reset Identifier', {identifier})
    resetIdentifier()
    window.location.reload(false)
  }, [true])
  const onClickSearch = useCallback(async () => {
    trackEvent('Search Marketplace', {priceLimit})
    const results = await getResidinces(priceLimit)
    setSearchResults(results)
    trackEvent('Search Marketplace Result', {topResult: results[0]})
  }, [priceLimit])
  return (
    <AppWrapper>
      <Row>
        <Col width='6'>
          <CollapsibleCard
            defaultState={'collapsed'}
            centered
            shadow={true}
            onExpanded={() => {
              trackEvent('Expand Main Title Card')
            }}
            onCollapsed={() => {
              trackEvent('Collapse Main Title Card')
            }}
            title={<h1>{welcomeTitle || "It's nice to see you!"}</h1>}
          >
            <p>Your identifier is "{identifier}"</p>
            <p>Your test group identifier is "{getNarrowTestGroupNumber(identifier)}"</p>
            <Button onClick={onResetIdentifier}>Reset identifier</Button>
          </CollapsibleCard>
          <Card centered shadow={true} animateShadowOnHover='lg'>
            <h1>
              <img
                src='/static/logo_loansnap_tight.svg'
                width='200px'
                alt='LoanSnap'
              />
            </h1>
            <p>Navigating your financial future</p>
            <Input
              name='search_loan_amount'
              width='230px'
              centered
              type='tel'
              label='Property price range'
              placeholder='Max price'
              value={priceLimitInput}
              onChange={((ev) => setPriceLimitInput(formFormatNumber(ev.target.value)))}
            />
            <ButtonRow>
              <Button disabled={!priceLimit} style={{fontSize: mainButtonFontSize || '1em'}} color={brandColor} minSized={true} primary={true} onClick={onClickSearch}>
                Search Properties
              </Button>
            </ButtonRow>

            {showPointlessButton && (
              <Button minSized={true}>
                Pointless button
              </Button>
            )}
          </Card>

          {selectedResidence && (
            <React.Fragment>
              <h1>Your select residence</h1>
              <ResidenceCard
                shadow
                animateShadowOnHover='lg'
                residence={selectedResidence}
              />
            </React.Fragment>
          )}

          <MortgageCalculator
            defaultState={'collapsed'}
            onExpanded={() => {
              trackEvent('Expand Mortgage Calculator')
            }}
            onCollapsed={() => {
              trackEvent('Collapse Mortgage Calculator')
            }}
          />

          {!selectedResidence && searchResults && _.map(searchResults, residence => (
            <ResidenceCard
              key={residence.id}
              residence={residence}
              onClickSelect={() => sleep(Math.random(1000) + 200)
                .then(() => {
                  setSelectedResidence(residence)
                  trackEvent('Select Residence', {residence})
              })}
              shadow
              animateShadowOnHover='lg'
            />
          ))}
        </Col>
      </Row>
    </AppWrapper>
  )
}


export default FeatureFlagsWrapper(IndexPage)
