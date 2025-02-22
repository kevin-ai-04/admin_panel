import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import PrivateRoute from "../PrivateRoute.js";
import AuthProvider from "../AuthProvider";

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="login" replace />} />
            <Route element={<PrivateRoute />}>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                )
              })}
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
