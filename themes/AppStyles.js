const AppStyles = `
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    margin: 0;
    padding: 0;


    // Colors
    --sprinter-color-primary:             #228B22;
    --sprinter-color-primary-hover:       #2D7F2D;
    --sprinter-color-primary-pressed:     #336933;
    --sprinter-color-primary-disabled:    #89B889;

    --sprinter-color-success:             #32B049;
    --sprinter-color-warning:             #FFBC1A;
    --sprinter-color-error:               #FF0F0F;

    --sprinter-color-white:               #FFFFFF;
    --sprinter-color-plaster:             #F7F7F7;
    --sprinter-color-dark-plaster:        #EBEBEB;
    --sprinter-color-light-silver:        #AAAAAA;
    --sprinter-color-silver:              #CDCDCD;
    --sprinter-color-dark-silver:         #949494;
    --sprinter-color-caption:             #585F63;
    --sprinter-color-text:                #34393D;

    // Sizes
    --sprinter-width-x1:                  75px;
    --sprinter-width-x2:                  174px;
    --sprinter-width-x3:                  272px;
    --sprinter-width-x4:                  372px;
    --sprinter-width-x6:                  568px;
    --sprinter-width-x8:                  768px;
    --sprinter-width-x9:                  864px;
    --sprinter-width-x10:                 962px;
    --sprinter-width-x12:                 1160px;

    --sprinter-offset-gutter:             24px;
    --sprinter-offset-x1:                 99px;
    --sprinter-offset-x2:                 198px;
    --sprinter-offset-x3:                 296px;

    --sprinter-button-height-sm:          2rem;
    --sprinter-button-height:             2.5rem;
    --sprinter-button-height-lg:          3rem;

    // Shadows
    --sprinter-shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --sprinter-shadow-md: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    --sprinter-shadow-lg: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    --sprinter-shadow-xl: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    --sprinter-shadow-xxl: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  }

  h1, h2, h3, h4, h5 {
    font-weight: 600;
  }
`

export default AppStyles
