import React, { Suspense, useEffect } from 'react';
import './App.css';
import ProfileContainer from './components/Profile/profileContainer';
import { Link,  Route, Routes} from 'react-router-dom';
import Login from './components/Login/login';
import Header from './components/Header/header';
import { connect } from 'react-redux';
import {initializeThunk} from './redux/app-reducer.ts'
import Preloader from './components/common/preloader/preloader';
import { appStateType } from './redux/redux-store';
import MessagesContainer from './components/Messages/messagesContainer';
import 'antd/dist/reset.css';
import { NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import SubMenu from 'antd/es/menu/SubMenu';

const { Content, Sider } = Layout;


const UsersPage = React.lazy(() => import('./components/Users/usersContainer'))

type mapPropsType = ReturnType<typeof mapStateToProps>
type dispatchPropsType = {
  initializeThunk: () => void
}

/*const items1: MenuProps['items'] = ['My Profile', '2q', '3'].map((key) => ({
  key,
  label: key,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `sub${key}` === 'sub1' ? 'My Profile' : `sub${key}` === 'sub2' ? 'Messages'
      : 'Users',


      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);*/


const App: React.FC<mapPropsType & dispatchPropsType> = (props) => {

  useEffect(() => {
    props.initializeThunk()
  }, [])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (!props.initialized) {
    return <Preloader />
  }
  return (

    <Layout>
      <Header/>
      <Layout>
        <Sider  width={200}  breakpoint="xs"
        collapsedWidth="85" style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            //items={items2}
          >
            <SubMenu key={'sub1'} icon={<UserOutlined/>} title='My profile'>
              <Menu.Item key={1}>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key={2}>
                <Link to="/messages">Messages</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key={'sub2'} icon={<NotificationOutlined/>} title='Users'>
            <Menu.Item key={3}>
                <Link to="/users">Users list</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 0 0 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path='/' element={<ProfileContainer />} />
                <Route path='/profile/:userId' element={<ProfileContainer />} />
                <Route path='/profile' element={<ProfileContainer />} />
                <Route path='/messages/*' element={<MessagesContainer />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}


const mapStateToProps = (state: appStateType) => {
  return {
    initialized: state.app.initialized
  }
}

export default connect(mapStateToProps, {initializeThunk}) (App);
