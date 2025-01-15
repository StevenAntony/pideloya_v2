import { WebRoute } from '@/src/models/security/RouteModel'
import React from 'react'
import RenderGroupRoute from './RenderGroupRoute'
import { Checkbox } from 'antd'

type Props = {
    routes: WebRoute[]
    actions: string[]
    setActions: React.Dispatch<React.SetStateAction<string[]>>
}

export default function RoutesList({ routes, actions, setActions }: Props) {
    const verifyPolicy = (action: string) => {
        return actions.includes(action)
    }

    const handleCheckbox = (e: any, action: string) => {
        if (e.target.checked) {
          setActions([...actions, action])
        } else {

          const keys = action.split(':')

          if (keys[0] === 'web') {
            const routesByWeb = routes.find((route) => route.action === action)

            routesByWeb?.apiRoute.forEach((route) => {

              console.log(route);
              setActions(actions.filter((item) => item !== route.action))
            })
          }
          setActions(actions.filter((item) => item !== action))
        }
      }


    return (
        <div className='w-full flex flex-wrap'>
            {
                routes.map((route, index) => (
                    <RenderGroupRoute
                        key={index}
                        name={route.name}
                        description={route.description}
                        action={route.action}
                        handleCheckbox={handleCheckbox}
                        verifyPolicy={verifyPolicy}
                    >
                        {
                            route.apiRoute.map((apiRoute, index) => (
                                <div key={index}>
                                    <Checkbox
                                        disabled={verifyPolicy(route.action) == false}
                                        checked={verifyPolicy(apiRoute.action)}
                                        onChange={(e) => handleCheckbox(e, apiRoute.action)}
                                    >
                                        <span>{apiRoute.name}</span>
                                    </Checkbox>
                                </div>
                            ))
                        }
                    </RenderGroupRoute>
                ))
            }
        </div>
    )
}
