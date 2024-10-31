// src/components/App.js
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, updateStudent, deleteStudent } from './store/usersSlice';
import { setLanguage } from './store/languageSlice';
import { setTheme } from './store/themeSlice';

function App() {
  const students = useSelector((state) => state.usersData.students);
  const language = useSelector((state) => state.languageData.language);
  const theme = useSelector((state) => state.themeData.theme);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ id: null, name: '', email: '', age: '' });

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);

  const handleAddStudent = () => {
    setCurrentStudent({ id: null, name: '', email: '', age: '' });
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setShowModal(true);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!currentStudent.name) {
      nameRef.current.focus();
      alert(language === 'en' ? 'Name is required!' : 'Имя обязательно!');
      isValid = false;
    } else if (!currentStudent.email) {
      emailRef.current.focus();
      alert(language === 'en' ? 'Email is required!' : 'Электронная почта обязательна!');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(currentStudent.email)) {
      emailRef.current.focus();
      alert(language === 'en' ? 'Email is invalid!' : 'Недопустимая электронная почта!');
      isValid = false;
    } else if (!currentStudent.age) {
      ageRef.current.focus();
      alert(language === 'en' ? 'Age is required!' : 'Возраст обязателен!');
      isValid = false;
    }

    return isValid;
  };

  const handleSaveStudent = () => {
    if (validateInputs()) {
      if (currentStudent.id) {
        dispatch(updateStudent(currentStudent));
      } else {
        dispatch(addStudent({ ...currentStudent, id: Date.now() }));
      }
      setShowModal(false);
    }
  };

  const themeClasses = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800';

  return (
    <div className={`${themeClasses} min-h-screen flex flex-col items-center py-10 px-4`}>
      <h1 className="text-3xl font-semibold mb-8">
        {language === 'en' ? 'Student Management' : 'Управление студентами'}
      </h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => dispatch(setLanguage(language === 'en' ? 'ru' : 'en'))}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          {language === 'en' ? 'Switch to Russian' : 'Переключиться на английский'}
        </button>
        <button
          onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
        >
          {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
        </button>
        <button
          onClick={handleAddStudent}
          className="px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600 transition"
        >
          {language === 'en' ? 'Add Student' : 'Добавить студента'}
        </button>
      </div>

      {/* Talabalar kartalarini ko'rsatish */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
            <p className="text-gray-600">{student.age}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEditStudent(student)}
                className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 transition"
              >
                {language === 'en' ? 'Edit' : 'Редактировать'}
              </button>
              <button
                onClick={() => dispatch(deleteStudent(student.id))}
                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
              >
                {language === 'en' ? 'Delete' : 'Удалить'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Add Student' : 'Добавить студента'}
            </h3>
            <input
              type="text"
              placeholder={language === 'en' ? 'Name' : 'Имя'}
              value={currentStudent.name}
              onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
              ref={nameRef}
              className= {theme === 'dark' ? 'w-full p-2 mb-4 border border-gray-300 rounded text-gray-700' : "w-full p-2 mb-4 border border-gray-300 rounded"}
            />
            <input
              type="email"
              placeholder={language === 'en' ? 'Email' : 'Электронная почта'}
              value={currentStudent.email}
              onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
              ref={emailRef}
              className={theme === 'dark' ? 'w-full p-2 mb-4 border border-gray-300 rounded text-gray-700' : "w-full p-2 mb-4 border border-gray-300 rounded"}
            />
            <input
              type="number"
              placeholder={language === 'en' ? 'Age' : 'Возраст'}
              value={currentStudent.age}
              onChange={(e) => setCurrentStudent({ ...currentStudent, age: e.target.value })}
              ref={ageRef}
              className={theme === 'dark' ? 'w-full p-2 mb-4 border border-gray-300 rounded text-gray-700' : "w-full p-2 mb-4 border border-gray-300 rounded"}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                {language === 'en' ? 'Cancel' : 'Отмена'}
              </button>
              <button
                onClick={handleSaveStudent}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                {language === 'en' ? 'Save' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
