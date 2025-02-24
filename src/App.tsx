import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Plus, CheckCircle2, Circle } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  stage: number; // 1-5, where 5,4,3 are pending and 2,1 are completed
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const { logout } = useAuth0();

  const handleLogout = () => {
    setTodos([]); // Reset todos
    logout({ returnToUrl: window.location.origin });
  };

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: text.trim(),
          stage: 5, // Start at stage 5 (pending)
        },
      ]);
      setNewTodoText('');
      setIsInputActive(false);
    }
  };

  const toggleTodo = (todoId: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          // If todo is in pending stages (3,4,5), move to stage 2
          // If todo is in stage 2, move to stage 1
          const newStage = todo.stage >= 3 ? 2 : todo.stage === 2 ? 1 : todo.stage;
          return { ...todo, stage: newStage };
        }
        return todo;
      })
    );
  };

  const getPendingTodos = () => todos.filter((todo) => todo.stage >= 3);
  const getCompletedTodos = () => todos.filter((todo) => todo.stage <= 2);

  return (
    <div className="min-h-screen bg-white px-8 py-6">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-12">
        <p className="text-3xl font-bold">
          BETTER<span className="text-red-600">.DO☑️</span>
        </p>
          <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800 flex items-center">Log Out</button>
        </header>

        <section className="max-w-lg mx-auto mt-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Today</h2>
          
          {/* Add Todo Input */}
          <div className="mb-6">
            {isInputActive ? (
              <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
                <input
                  type="text"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo(newTodoText)}
                  placeholder="What needs to be done?"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => addTodo(newTodoText)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  <Plus size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsInputActive(true)}
                className="w-full px-4 py-3 text-left text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Let's do this
              </button>
            )}
          </div>

          {/* Completed Tasks (Stage 1 & 2) */}
          {getCompletedTodos().length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-600 mb-3">Completed tasks</h3>
              {getCompletedTodos().map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center bg-gray-100 rounded-lg px-4 py-3 mb-2"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-green-600 hover:text-green-700 mr-3"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <span className="line-through text-gray-500">{todo.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Pending Tasks (Stage 3,4,5) */}
          <div>
            <h3 className="text-md font-medium text-gray-600 mb-3">Today's tasks</h3>
            {getPendingTodos().map((todo) => (
              <div
                key={todo.id}
                className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 mb-2"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-gray-400 hover:text-gray-600 mr-3"
                >
                  <Circle size={20} />
                </button>
                <span>{todo.text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;