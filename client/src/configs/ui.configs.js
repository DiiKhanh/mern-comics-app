const uiConfigs = {
  style: {
    gradientBgImage: {
      dark: {
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))'
      },
      light: {
        backgroundImage: 'linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0))'
      }
    },
    horizontalGradientBgImage: {
      dark: {
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))'
      },
      light: {
        backgroundImage: 'linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0))'
      }
    },
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || 'justify',
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: lines
    }),
    mainContent: {
      maxWidth: '1366px',
      margin: 'auto',
      padding: 2
    },
    backgroundImage: (imgPath) => ({
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'darkgrey',
      backgroundImage: `url(${imgPath})`
    })
  },
  size: {
    sidebarWidth: '300px',
    contentMaxWidth: '1366px'
  },
  backgroundDetail: {
    position:'absolute',
    height:'20rem',
    top:0,
    insetInline:0,
    zIndex:-10,
    backgroundImage: 'linear-gradient(to bottom, #d1fae5, rgba(209,250,229,0))'
  }
};

export default uiConfigs;