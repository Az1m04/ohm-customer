import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useLogout } from '@/hooks/auth/logout/useLogout';

import { sidebarAtom } from '@/store/sideBar';

import Dashboard from '@/assets/svg/sidebar/dashboard-2.svg';
import Escrowegreement from '@/assets/svg/sidebar/escrowegreement.svg';
import Logout from '@/assets/svg/sidebar/logout.svg';
import Myactivity from '@/assets/svg/sidebar/myactivity.svg';
import Myagent from '@/assets/svg/sidebar/myagent.svg';
import Myinteractions from '@/assets/svg/sidebar/myinteractions.svg';
import Myproperties from '@/assets/svg/sidebar/myproperties.svg';
import Postproperty from '@/assets/svg/sidebar/postproperty.svg';
import Rentagreement from '@/assets/svg/sidebar/rentagreement.svg';
import Rentproperty from '@/assets/svg/sidebar/rentproperty.svg';
import { queryClient } from '@/pages/_app';

export interface MenuKeys {
  id: string;
  href?: string;
  name: string;
  disabled: boolean;
  icon?: unknown;
}

export interface Weather {
  type: string;
  key?: null;
  ref?: null;
  props: Props;
  _owner?: null;
  _store: unknown;
}
export interface Props {
  xmlns: string;
  width: string;
  height: string;
  viewBox: string;
  children: Children;
}
export interface Children {
  type: string;
  key?: null;
  ref?: null;
  props: Props1;
  _owner?: null;
  _store: unknown;
}
export interface Props1 {
  d: string;
  fill: string;
}
export interface IconProps {
  src?: string;
  height: number;
  width: number;
}

export const iconProps: IconProps = {
  width: 17,
  height: 17,
};

const Sidebar = () => {
  const router = useRouter();
  const [current, setCurrent] = useAtom(sidebarAtom);

  // eslint-disable-next-line unused-imports/no-unused-vars

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menu: MenuKeys[] = [
    {
      id: 'dashboard',
      href: '/dashboard',
      name: 'Dashboard',
      disabled: false,
      icon: <Dashboard {...iconProps} />,
    },
    {
      id: 'myactivity',
      href: '/myactivity',
      name: 'My Activity',
      disabled: true,
      icon: <Myactivity {...iconProps} />,
    },
    {
      id: 'myinteractions',
      href: '/myinteractions',
      name: 'My Interactions',
      disabled: true,
      icon: <Myinteractions {...iconProps} />,
    },
    {
      id: 'postproperty',
      href: '/postproperty',
      name: 'Post Property',
      disabled: false,
      icon: <Postproperty {...iconProps} />,
    },
    {
      id: 'myproperties',
      href: '/myproperties',
      name: 'My Properties',
      disabled: false,
      icon: <Myproperties {...iconProps} />,
    },
    {
      id: 'myagents',
      href: '/myagents',
      name: 'My Agents',
      disabled: true,
      icon: <Myagent {...iconProps} />,
    },
    {
      id: 'rentagreements',
      href: '/rentagreements',
      name: 'Rent Agreements',
      disabled: true,
      icon: <Rentagreement {...iconProps} />,
    },
    {
      id: 'rentpayments',
      href: '/rentpayments',
      name: 'Rent Payments',
      disabled: true,
      icon: <Rentproperty {...iconProps} />,
    },
    {
      id: 'ecrowagreements',
      href: '/ecrowagreements',
      name: 'Ecrow Agreements',
      disabled: true,
      icon: <Escrowegreement {...iconProps} />,
    },
    {
      id: 'logout',
      name: 'Logout',
      disabled: false,
      icon: <Logout {...iconProps} />,
    },
  ];

  const handleSetCurrent = (id: string) => {
    setCurrent({ active: id });
  };

  useEffect(() => {
    const handleRouteChange = (url: unknown) => {
      menu.map((menuItems) => {
        if (menuItems.href === url) {
          setCurrent({ active: menuItems.id });
        }
      });
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [menu, router.events, setCurrent]);

  const logout = useLogout();

  return (
    <div className='flex h-screen w-80 space-y-2 bg-white p-5 px-8 pt-10 text-sm text-zinc-700 shadow-[0_0px_10px_4px_rgba(0,0,0,0.1)]'>
      <aside className='top-30 sticky'></aside>
      <main className='w-full'>
        {menu.map((menuItem) => (
          <Link key={menuItem.id} href={menuItem.href || ''}>
            <a className=''>
              <button
                onClick={() => {
                  queryClient.clear();
                  handleSetCurrent(menuItem.id);
                  if (menuItem.id === 'logout') {
                    logout.mutateAsync().then((res) => {
                      console.log(res, 'res');
                    });
                  }
                }}
                disabled={menuItem.disabled}
                className={`flex w-full items-center rounded-md pl-8 ${
                  menuItem.id === current.active ? 'bg-slate-100' : 'bg-white'
                } p-3`}
              >
                {/* Dashboard icon */}
                {menuItem.icon}
                <span className='ml-5'>{menuItem.name}</span>
              </button>
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Sidebar;
