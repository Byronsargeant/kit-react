import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'

import asyncComponent from './async'

const routes = [
  // Widgets
  {
    path: '/widgets/general',
    Component: asyncComponent(() => import('pages/widgets/general')),
    exact: true,
  },
  {
    path: '/widgets/lists',
    Component: asyncComponent(() => import('pages/widgets/lists')),
    exact: true,
  },
  {
    path: '/widgets/charts',
    Component: asyncComponent(() => import('pages/widgets/charts')),
    exact: true,
  },
  {
    path: '/widgets/tables',
    Component: asyncComponent(() => import('pages/widgets/tables')),
    exact: true,
  },
  // Cards
  {
    path: '/cards/basic-cards',
    Component: asyncComponent(() => import('pages/cards/basic-cards')),
    exact: true,
  },
  {
    path: '/cards/tabbed-cards',
    Component: asyncComponent(() => import('pages/cards/tabbed-cards')),
    exact: true,
  },
  // UI Kits
  {
    path: '/ui-kits/bootstrap',
    Component: asyncComponent(() => import('pages/ui-kits/bootstrap')),
    exact: true,
  },
  {
    path: '/ui-kits/antd',
    Component: asyncComponent(() => import('pages/ui-kits/antd')),
    exact: true,
  },
  // Tables
  {
    path: '/tables/bootstrap',
    Component: asyncComponent(() => import('pages/tables/bootstrap')),
    exact: true,
  },
  {
    path: '/tables/antd',
    Component: asyncComponent(() => import('pages/tables/antd')),
    exact: true,
  },
  // Charts
  {
    path: '/charts/chartistjs',
    Component: asyncComponent(() => import('pages/charts/chartistjs')),
    exact: true,
  },
  {
    path: '/charts/chartjs',
    Component: asyncComponent(() => import('pages/charts/chartjs')),
    exact: true,
  },
  {
    path: '/charts/c3',
    Component: asyncComponent(() => import('pages/charts/c3')),
    exact: true,
  },
  // Icons
  {
    path: '/icons/feather-icons',
    Component: asyncComponent(() => import('pages/icons/feather-icons')),
    exact: true,
  },
  {
    path: '/icons/fontawesome',
    Component: asyncComponent(() => import('pages/icons/fontawesome')),
    exact: true,
  },
  {
    path: '/icons/linearicons-free',
    Component: asyncComponent(() => import('pages/icons/linearicons-free')),
    exact: true,
  },
  {
    path: '/icons/icomoon-free',
    Component: asyncComponent(() => import('pages/icons/icomoon-free')),
    exact: true,
  },
  // Advanced
  {
    path: '/advanced/form-examples',
    Component: asyncComponent(() => import('pages/advanced/form-examples')),
    exact: true,
  },
  {
    path: '/advanced/email-templates',
    Component: asyncComponent(() => import('pages/advanced/email-templates')),
    exact: true,
  },
  {
    path: '/advanced/utilities',
    Component: asyncComponent(() => import('pages/advanced/utilities')),
    exact: true,
  },
  {
    path: '/advanced/grid',
    Component: asyncComponent(() => import('pages/advanced/grid')),
    exact: true,
  },
  {
    path: '/advanced/typography',
    Component: asyncComponent(() => import('pages/advanced/typography')),
    exact: true,
  },
  {
    path: '/advanced/pricing-tables',
    Component: asyncComponent(() => import('pages/advanced/pricing-tables')),
    exact: true,
  },
  {
    path: '/advanced/invoice',
    Component: asyncComponent(() => import('pages/advanced/invoice')),
    exact: true,
  },
  {
    path: '/advanced/colors',
    Component: asyncComponent(() => import('pages/advanced/colors')),
    exact: true,
  },
]

class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Helmet
          titleTemplate="%s - Clean UI KIT Pro (React Edition)"
          defaultTitle="Clean UI KIT Pro (React Edition)"
        />
        <Header />
        <div className="container-fluid" style={{ maxWidth: '1440px' }}>
          <Switch>
            {routes.map(({ path, Component, exact }) => (
              <Route path={path} key={path} exact={exact}>
                <Component />
              </Route>
            ))}
            <Route exact path="/*" render={() => <Redirect to="/widgets/general" />} />
          </Switch>
          <Footer />
        </div>
      </HashRouter>
    )
  }
}

export default Router
