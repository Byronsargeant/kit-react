import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Tooltip } from 'antd'
import NProgress from 'nprogress'
import _ from 'lodash'

import AntDesignDarkTheme from 'components/kit-vendors/antd/themes/themeDark'
import AntDesignLightTheme from 'components/kit-vendors/antd/themes/themeLight'
import UserMenu from './UserMenu'
import style from './style.module.scss'
import getMenuData from './config'

@withRouter
class Header extends React.Component {
  previousPath = ''

  state = {
    primaryColor: '#4b7cf3',
    reset: true,
  }

  componentDidMount() {
    // init theme
    const mode = window.localStorage.getItem('kit.theme')
    if (mode === 'dark') {
      document.querySelector('body').classList.add('kit__dark')
      window.less.modifyVars(AntDesignDarkTheme)
    } else {
      window.less.modifyVars(AntDesignLightTheme)
    }

    // init primary color
    const color = window.localStorage.getItem('kit.primary')
    if (color) {
      this.selectColor(color)
    }
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname },
    } = this.props
    const {
      location: { pathname: prevPathname },
    } = prevProps
    if (pathname !== prevPathname) {
      window.scrollTo(0, 0)
    }
  }

  switchDarkTheme = () => {
    if (document.querySelector('body').classList.contains('kit__dark')) {
      document.querySelector('body').classList.remove('kit__dark')
      window.localStorage.setItem('kit.theme', 'light')
      window.less.modifyVars(AntDesignLightTheme)
    } else {
      document.querySelector('body').classList.add('kit__dark')
      window.localStorage.setItem('kit.theme', 'dark')
      window.less.modifyVars(AntDesignDarkTheme)
    }
  }

  selectColor = color => {
    const styleElement = document.querySelector('#primaryColor')
    if (styleElement) {
      styleElement.remove()
    }
    window.localStorage.setItem('kit.primary', color)
    const body = document.querySelector('body')
    const styleEl = document.createElement('style')
    const css = document.createTextNode(`:root { --kit-color-primary: ${color};}`)
    styleEl.setAttribute('id', 'primaryColor')
    styleEl.appendChild(css)
    body.appendChild(styleEl)
    this.setState({
      primaryColor: color,
      reset: false,
    })
  }

  resetColor = () => {
    const defaultColor = '#4b7cf3'
    this.selectColor(defaultColor)
    window.localStorage.removeItem('kit.primary')
    this.setState({
      primaryColor: defaultColor,
      reset: true,
    })
  }

  render() {
    const {
      location: { pathname, search },
    } = this.props

    const { primaryColor, reset } = this.state

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    const menuData = getMenuData()
    const flattenItems = (items, key) => {
      return items.reduce((flattenedItems, item) => {
        flattenedItems.push(item)
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key))
        }
        return flattenedItems
      }, [])
    }
    const activeItem = _.find(flattenItems(menuData, 'children'), ['url', pathname]) || {}
    const activeSubmenu =
      flattenItems(menuData, 'children')
        .map(item => {
          return item.url === pathname || _.find(item.children, ['url', pathname]) ? item : null
        })
        .filter(item => item !== null)[0] || {}

    return (
      <div className={style.header__container}>
        <div className="container-fluid" style={{ maxWidth: 1440 }}>
          <Tooltip title="Switch Dark / Light Theme" placement="left">
            <div
              role="button"
              tabIndex="0"
              onFocus={e => {
                e.preventDefault()
              }}
              onKeyPress={this.switchDarkTheme}
              onClick={this.switchDarkTheme}
              className={style.switch}
            >
              <i className={`fe fe-moon ${style.on}`} />
              <i className={`fe fe-sun ${style.off}`} />
            </div>
          </Tooltip>
          <Tooltip title="Set Primary Color" placement="left">
            <div
              role="button"
              tabIndex="0"
              onFocus={e => {
                e.preventDefault()
              }}
              className={`${style.color} ${reset ? style.reset : ''}`}
            >
              <button
                type="button"
                tabIndex="0"
                onFocus={e => {
                  e.preventDefault()
                }}
                onKeyPress={this.resetColor}
                onClick={this.resetColor}
              >
                <i className="fe fe-x-circle" />
              </button>
              <input
                type="color"
                id="colorPicker"
                onChange={e => this.selectColor(e.target.value)}
                value={primaryColor}
              />
              <i className="fe fe-package" />
            </div>
          </Tooltip>
          <header className="pt-3 pb-4">
            <div className="row">
              <div className="col-xl-12">
                <div className={style.topbar}>
                  <a className={`${style.logo} mr-md-5 mr-auto`} href="widgets-general.html">
                    <div className={style.logo__pic}>
                      <i />
                      <i />
                    </div>
                    <div>
                      <span className={style.logo__main}>Clean UI</span>
                      <span className={style.logo__descr}>Admin Template</span>
                    </div>
                    <div className={style.logo__kit}>KIT</div>
                    <div className={style.logo__pro}>PRO</div>
                  </a>
                  <span className="mr-3">Switch to:</span>
                  <a
                    className="d-none d-md-block mr-3 kit__utils__link"
                    href="https://cleanuitemplate.com/kit/html/versions/main/widgets-general.html"
                  >
                    Html
                  </a>
                  <a
                    className="d-none d-md-block mr-3 kit__utils__link"
                    href="https://cleanuitemplate.com/kit/vue/"
                  >
                    Vue
                  </a>
                  <a
                    className="d-none d-md-block mr-3 kit__utils__link"
                    href="https://cleanuitemplate.com/kit/angular/"
                  >
                    Angular
                  </a>
                  <a
                    className="mr-auto d-none d-md-block kit__utils__link"
                    href="https://docs.cleanuitemplate.com/kit-pro/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docs →
                  </a>
                  <p className="mb-0 mr-3 d-xl-block d-none">
                    Status{' '}
                    <span className="ml-1 badge bg-primary text-white font-size-12 text-uppercase">
                      ACTIVE
                    </span>
                  </p>
                  <div>
                    <UserMenu />
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="mb-4 mr-4 float-xl-left">
                  <a
                    href="https://themeforest.net/item/clean-ui-kit-pro-widgetdriven-admin-dashboard-template/24783640"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={`btn btn-success ${style.button}`}
                  >
                    <i className="fe fe-shopping-cart align-middle mr-2" />
                    Buy Pro 19$
                    <span>17+ Apps & Premium Support</span>
                  </a>
                </div>
                <p className="pt-xl-2">
                  Create beautiful apps faster with Clean UI KIT’s collection of visual, structural,
                  platform, and interactive widgets & utilities.
                  <br />
                  Customized Bootstrap & third-party plugins framework with modular architecture.
                </p>
              </div>
              <div className="col-xl-12">
                <ul className={`list-unstyled ${style.tabs}`}>
                  {activeSubmenu &&
                    menuData.map(item => {
                      return (
                        <li key={item.key}>
                          <Link
                            to={item.url}
                            className={`${
                              item.url === activeSubmenu.url ? style.tabs__active : ''
                              }`}
                          >
                            {item.title}{' '}
                            {item.count && (
                              <span className="badge bg-light ml-1">{item.count}</span>
                            )}
                          </Link>
                        </li>
                      )
                    })}
                </ul>
                <div className={style.buttons}>
                  <ul className="list-unstyled">
                    {activeSubmenu.children &&
                      activeSubmenu.children.map(item => {
                        return (
                          <li key={item.key}>
                            <Link
                              to={item.url}
                              className={`btn mr-2 mb-2 ${
                                item.url === activeItem.url ? 'btn-primary' : 'btn-light'
                                }`}
                            >
                              {item.title}
                            </Link>
                          </li>
                        )
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    )
  }
}

export default Header
