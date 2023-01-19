import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { rules } from '../utils/rules'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'


export default function LoginForm() {
    const {login} = useActions()
    const { error, isLoading } = useTypedSelector(state => state.auth)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const finish = () => {
       login(username, password)
    }
    return (
        <Form onFinish={finish}>

            {error && <div style={{ color: 'red' }}>
                {error}
            </div>}
            <Form.Item
                label='name'
                name='username'
                rules={[rules.required('введи своє ')]}>
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
                label='password'
                name='password'
                rules={[rules.required('введи пароль ')]} >
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                    type={'password'}/>

            </Form.Item>
            <Form.Item >
                <Button type='primary' htmlType='submit' loading={isLoading}> Log in</Button>
            </Form.Item>

        </Form>
    )
}
