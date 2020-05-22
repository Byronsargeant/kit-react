import React, { lazy, Suspense } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'

const routes = [
  // Widgets
  {
    path: '/widgets/general',
    Component: lazy(() => import('pages/widgets/general')),
    exact: true,
  },
  {
    path: '/widgets/lists',
    Component: lazy(() => import('pages/widgets/lists')),
    exact: true,
  },
  {
    path: '/widgets/charts',
    Component: lazy(() => import('pages/widgets/charts')),
    exact: true,
  },
  {
    path: '/widgets/tables',
    Component: lazy(() => import('pages/widgets/tables')),
    exact: true,
  },
  {
    path: '/apps/todoist-list',
    Component: lazy(() => import('pages/apps/todoist-list')),
    exact: true,
  },
  {
    path: '/apps/wordpress-add',
    Component: lazy(() => import('pages/apps/wordpress-add')),
    exact: true,
  },
  {
    path: '/apps/wordpress-post',
    Component: lazy(() => import('pages/apps/wordpress-post')),
    exact: true,
  },
  {
    path: '/apps/wordpress-posts',
    Component: lazy(() => import('pages/apps/wordpress-posts')),
    exact: true,
  },
  // Cards
  {
    path: '/cards/basic-cards',
    Component: lazy(() => import('pages/cards/basic-cards')),
    exact: true,
  },
  {
    path: '/cards/tabbed-cards',
    Component: lazy(() => import('pages/cards/tabbed-cards')),
    exact: true,
  },
  // UI Kits
  {
    path: '/ui-kits/bootstrap',
    Component: lazy(() => import('pages/ui-kits/bootstrap')),
    exact: true,
  },
  {
    path: '/ui-kits/antd',
    Component: lazy(() => import('pages/ui-kits/antd')),
    exact: true,
  },
  // Tables
  {
    path: '/tables/bootstrap',
    Component: lazy(() => import('pages/tables/bootstrap')),
    exact: true,
  },
  {
    path: '/tables/antd',
    Component: lazy(() => import('pages/tables/antd')),
    exact: true,
  },
  // Charts
  {
    path: '/charts/chartistjs',
    Component: lazy(() => import('pages/charts/chartistjs')),
    exact: true,
  },
  {
    path: '/charts/chartjs',
    Component: lazy(() => import('pages/charts/chartjs')),
    exact: true,
  },
  {
    path: '/charts/c3',
    Component: lazy(() => import('pages/charts/c3')),
    exact: true,
  },
  // Icons
  {
    path: '/icons/feather-icons',
    Component: lazy(() => import('pages/icons/feather-icons')),
    exact: true,
  },
  {
    path: '/icons/fontawesome',
    Component: lazy(() => import('pages/icons/fontawesome')),
    exact: true,
  },
  {
    path: '/icons/linearicons-free',
    Component: lazy(() => import('pages/icons/linearicons-free')),
    exact: true,
  },
  {
    path: '/icons/icomoon-free',
    Component: lazy(() => import('pages/icons/icomoon-free')),
    exact: true,
  },
  // Advanced
  {
    path: '/advanced/form-examples',
    Component: lazy(() => import('pages/advanced/form-examples')),
    exact: true,
  },
  {
    path: '/advanced/email-templates',
    Component: lazy(() => import('pages/advanced/email-templates')),
    exact: true,
  },
  {
    path: '/advanced/utilities',
    Component: lazy(() => import('pages/advanced/utilities')),
    exact: true,
  },
  {
    path: '/advanced/grid',
    Component: lazy(() => import('pages/advanced/grid')),
    exact: true,
  },
  {
    path: '/advanced/typography',
    Component: lazy(() => import('pages/advanced/typography')),
    exact: true,
  },
  {
    path: '/advanced/pricing-tables',
    Component: lazy(() => import('pages/advanced/pricing-tables')),
    exact: true,
  },
  {
    path: '/advanced/invoice',
    Component: lazy(() => import('pages/advanced/invoice')),
    exact: true,
  },
  {
    path: '/advanced/colors',
    Component: lazy(() => import('pages/advanced/colors')),
    exact: true,
  },
]

const Router = () => {
  return (
    <HashRouter>
      <Helmet
        titleTemplate="%s - Clean UI KIT Pro (React Edition)"
        defaultTitle="Clean UI KIT Pro (React Edition)"
      />
      <Header />
      <div className="container-fluid" style={{ maxWidth: '1440px' }}>
        <Switch>
          <Suspense fallback={null}>
            {routes.map(({ path, Component, exact }) => (
              <Route path={path} key={path} exact={exact}>
                <Component />
              </Route>
            ))}
            <Route exact path="/" render={() => <Redirect to="/widgets/general" />} />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default Router
