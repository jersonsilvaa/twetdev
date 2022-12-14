import React from 'react'

import AppLayout from '/components/AppLayout'

const App = ({ Component, pageProps }) => {
    return <AppLayout>
        <Component {...pageProps} />
    </AppLayout>
}

export default App