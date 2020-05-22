import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Tooltip } from 'antd'
import NProgress from 'nprogress'
import _ from 'lodash'

import UserMenu from './UserMenu'
import style from './style.module.scss'
import getMenuData from './config'

const Header = ({ location: { pathname, search } }) => {
  const [previousPath, setPreviousPath] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#4b7cf3')
  const [reset, setReset] = useState(true)

  useEffect(() => {
    // init theme
    const mode = window.localStorage.getItem('kit.theme')
    if (mode === 'dark') {
      document.querySelector('html').setAttribute('data-kit-theme', 'dark')
    }

    // init primary color
    const color = window.localStorage.getItem('kit.primary')
    if (color) {
      selectColor(color)
    }
  }, [])

  useEffect(() => {
    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      setPreviousPath(currentPath)
    }, 300)
  })

  const selectColor = color => {
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
    setPrimaryColor(color)
    setReset(false)
  }

  const resetColor = () => {
    const defaultColor = '#4b7cf3'
    selectColor(defaultColor)
    window.localStorage.removeItem('kit.primary')
    setPrimaryColor(defaultColor)
    setReset(true)
  }

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
              onKeyPress={resetColor}
              onClick={resetColor}
            >
              <i className="fe fe-x-circle" />
            </button>
            <input
              type="color"
              id="colorPicker"
              onChange={e => selectColor(e.target.value)}
              value={primaryColor}
            />
            <i className="fe fe-package" />
          </div>
        </Tooltip>
        <header className="pt-3 pb-4">
          <div className="row">
            <div className="col-xl-12">
              <div className={style.topbar}>
                <div className={style.logoContainer}>
                  <div className={style.logo}>
                    <img src="resources/images/logo.svg" className="mr-2" alt="Clean UI" />
                    <div className={style.name}>Clean UI KIT Pro</div>
                    <div className={style.descr}>React</div>
                  </div>
                </div>
                <span className="mr-3">Switch to:</span>
                <a
                  className="d-none d-md-block mr-3 kit__utils__link"
                  href="https://kit-html.cleanuitemplate.com/versions/main/widgets-general.html"
                >
                  Html
                </a>
                <a
                  className="d-none d-md-block mr-3 kit__utils__link"
                  href="https://kit-vue.cleanuitemplate.com/"
                >
                  Vue
                </a>
                <a
                  className="d-none d-md-block mr-3 kit__utils__link"
                  href="https://kit-angular.cleanuitemplate.com/"
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
                  Buy Now Pro 19$
                  <span>Dark Theme & 17+ Apps!</span>
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
                          className={`${item.url === activeSubmenu.url ? style.tabs__active : ''}`}
                        >
                          {item.title}{' '}
                          {item.count && <span className="badge bg-light ml-1">{item.count}</span>}
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

export default withRouter(Header)
