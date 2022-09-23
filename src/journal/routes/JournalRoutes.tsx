import {FC} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { JournalPage } from '../pages/JournalPage';

export const JournalRoutes:FC = ():JSX.Element => {
  return (
    <Routes>
        <Route path='/' element={<JournalPage />} />
        <Route path='/*' element={<Navigate to="/" />} />
    </Routes>
  )
}
