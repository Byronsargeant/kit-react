import React, { useState } from 'react'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './style.module.scss'

const ProfileMenu = () => {
  const [count, setCount] = useState(7)

  const addCount = () => {
    setCount(count + 1)
  }

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>Hello, User</strong>
        <div>
          <strong className="mr-1">Billing Plan: </strong>
          Professional
        </div>
        <div>
          <strong>Role: </strong>
          Administrator
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div>
          <strong>Email: </strong>
          hello@mediatec.org
          <br />
          <strong>Phone: </strong>
          +1 600 8000
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a>
          <i className={`${styles.menuIcon} fe fe-user`} />
          Edit Profile
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a>
          <i className={`${styles.menuIcon} fe fe-log-out`} />
          Logout
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} onVisibleChange={addCount}>
      <div className={styles.dropdown}>
        <Badge count={count}>
          <Avatar className={styles.avatar} shape="square" size="large" icon={<UserOutlined />} />
        </Badge>
      </div>
    </Dropdown>
  )
}

export default ProfileMenu
