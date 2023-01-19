import { Row, Layout, Menu } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RouteNames } from '../routes'


const Navbar = () => {
    const router = useHistory()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const {logout} = useActions()
    return (
        <Layout.Header>
            <Row justify='end'>
                {isAuth
                    ?
                    <>
                    <div style={{color: 'white'}}>{user.username}</div>
                    <Menu theme='dark' mode='vertical' selectable={false}>
                        
                        <Menu.Item onClick={() => logout()} 
                        key={1} > Log Out</Menu.Item>
                    </Menu>
                    </>
                    :
                    <Menu theme='dark' mode='vertical' selectable={false}>
                        <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1} > Login </Menu.Item>
                    </Menu>

                }
            </Row>
        </Layout.Header>
    )
}

export default Navbar
