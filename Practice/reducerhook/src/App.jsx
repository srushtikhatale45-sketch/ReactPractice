import React, { useReducer, useState, useEffect } from "react";

// Initial state
const initialState = {
  todos: [],
  filter: "ALL",
  nextId: 1,
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
  },
};

// Action types
const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  UPDATE_TODO: "update-todo",
  SET_FILTER: "set-filter",
  CLEAR_COMPLETED: "clear-completed",
  LOAD_TODOS: "load-todos", // New action for loading data
};

// Helper function
const calculateStats = (todos) => {
  const completed = todos.filter((todo) => todo.completed).length;
  return {
    total: todos.length,
    completed: completed,
    pending: todos.length - completed,
  };
};

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      const newTodo = {
        id: state.nextId,
        text: action.payload.text,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
        nextId: state.nextId + 1,
        stats: calculateStats([...state.todos, newTodo]),
      };

    case ACTIONS.TOGGLE_TODO:
      const toggledTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

      return {
        ...state,
        todos: toggledTodos,
        stats: calculateStats(toggledTodos),
      };

    case ACTIONS.DELETE_TODO:
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id,
      );

      return {
        ...state,
        todos: filteredTodos,
        stats: calculateStats(filteredTodos),
      };

    case ACTIONS.UPDATE_TODO:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText }
          : todo,
      );

      return {
        ...state,
        todos: updatedTodos,
        stats: calculateStats(updatedTodos),
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };

    case ACTIONS.CLEAR_COMPLETED:
      const activeTodos = state.todos.filter((todo) => !todo.completed);

      return {
        ...state,
        todos: activeTodos,
        stats: calculateStats(activeTodos),
      };

    case ACTIONS.LOAD_TODOS: // New case for loading data
      return {
        ...state,
        ...action.payload,
        stats: calculateStats(action.payload.todos || []),
      };

    default:
      return state;
  }
};

// Main Todo Component
function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // New state for useEffect features
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // ============ useEffect Examples ============

  // 1. EFFECT: Load todos from localStorage on component mount
  useEffect(() => {
    console.log("Component mounted - Loading todos from localStorage");

    const savedTodos = localStorage.getItem("todos");
    const savedNextId = localStorage.getItem("nextId");
    const savedFilter = localStorage.getItem("filter");

    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        dispatch({
          type: ACTIONS.LOAD_TODOS,
          payload: {
            todos: parsedTodos,
            nextId: savedNextId
              ? parseInt(savedNextId)
              : Math.max(...parsedTodos.map((t) => t.id), 0) + 1,
            filter: savedFilter || "ALL",
          },
        });
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    }

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []); // Empty dependency array = runs once on mount

  // 2. EFFECT: Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      // Don't save during initial load
      console.log("Todos changed - Saving to localStorage");

      localStorage.setItem("todos", JSON.stringify(state.todos));
      localStorage.setItem("nextId", state.nextId.toString());
      localStorage.setItem("filter", state.filter);

      setLastSaved(new Date().toLocaleTimeString());

      // Show notification
      setShowNotifications(true);
      const timer = setTimeout(() => setShowNotifications(false), 2000);

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [state.todos, state.nextId, state.filter, isLoading]); // Runs when these dependencies change

  // 3. EFFECT: Document title updater
  useEffect(() => {
    document.title = `Todo App (${state.stats.pending} pending)`;

    // Cleanup function (runs when component unmounts)
    return () => {
      document.title = "Todo App"; // Reset title on unmount
    };
  }, [state.stats.pending]); // Updates when pending count changes

  // 4. EFFECT: Auto-save with interval
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (state.todos.length > 0) {
        console.log("Auto-saving todos...");
        // You could also save to a backend here
        localStorage.setItem("todos_autosave", JSON.stringify(state.todos));
      }
    }, 30000); // Auto-save every 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(autoSaveInterval);
  }, [state.todos]); // Re-create interval if todos change

  // 5. EFFECT: Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+S to save
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        localStorage.setItem("todos_manual_save", JSON.stringify(state.todos));
        alert("Manually saved!");
      }

      // Escape to cancel editing
      if (e.key === "Escape" && editingId) {
        setEditingId(null);
        setEditText("");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [editingId, state.todos]); // Dependencies

  // 6. EFFECT: Filter/search debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        console.log("Searching for:", searchTerm);
        // You could implement search logic here
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]); // Runs when search term changes

  // Handlers
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: { text: inputText.trim() },
      });
      setInputText("");
    }
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: { id },
    });
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      dispatch({
        type: ACTIONS.DELETE_TODO,
        payload: { id },
      });
    }
  };

  const handleUpdateTodo = (id) => {
    if (editText.trim()) {
      dispatch({
        type: ACTIONS.UPDATE_TODO,
        payload: { id, newText: editText.trim() },
      });
      setEditingId(null);
      setEditText("");
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Clear all data
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL todos?")) {
      localStorage.clear();
      dispatch({
        type: ACTIONS.LOAD_TODOS,
        payload: { todos: [], nextId: 1, filter: "ALL" },
      });
    }
  };

  // Export todos
  const handleExportTodos = () => {
    const dataStr = JSON.stringify(state.todos, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `todos_${new Date().toISOString().slice(0, 10)}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Filter todos
  const getFilteredTodos = () => {
    let filtered = state.todos;

    // Apply filter
    switch (state.filter) {
      case "ACTIVE":
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      case "COMPLETED":
        filtered = filtered.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  };

  const filteredTodos = getFilteredTodos();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Last Saved */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Todo App with useReducer
          </h1>
          {lastSaved && (
            <span className="text-sm text-gray-400">
              Last saved: {lastSaved}
            </span>
          )}
        </div>

        {/* Notification */}
        {showNotifications && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            Todos saved successfully!
          </div>
        )}

        {/* Keyboard Shortcuts Hint */}
        <div className="bg-blue-100 text-blue-800 text-xs p-2 rounded-lg mb-4">
          <span className="font-medium">Keyboard shortcuts:</span> Ctrl+S to
          save | Escape to cancel editing
        </div>

        {/* Search Bar - New Feature */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-800">
              {state.stats.total}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {state.stats.completed}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {state.stats.pending}
            </p>
          </div>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleAddTodo} className="mb-6 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            Add Todo
          </button>
        </form>

        {/* Filter and Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.SET_FILTER, payload: { filter: "ALL" } })
            }
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              state.filter === "ALL"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_FILTER,
                payload: { filter: "ACTIVE" },
              })
            }
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              state.filter === "ACTIVE"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Active
          </button>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_FILTER,
                payload: { filter: "COMPLETED" },
              })
            }
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              state.filter === "COMPLETED"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Completed
          </button>

          {state.stats.completed > 0 && (
            <button
              onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })}
              className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-all shadow-md"
            >
              Clear Completed
            </button>
          )}

          {/* New Action Buttons */}
          <button
            onClick={handleExportTodos}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-all shadow-md"
          >
            Export
          </button>

          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition-all shadow-md"
          >
            Clear All
          </button>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredTodos.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400 text-lg">No todos to display</p>
              <p className="text-gray-300 text-sm mt-2">
                {searchTerm
                  ? "Try a different search term"
                  : "Add some todos to get started!"}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  {editingId === todo.id ? (
                    // Edit Mode
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdateTodo(todo.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                     // View Mode
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleTodo(todo.id)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span
                        onDoubleClick={() => startEditing(todo)}
                        className={`flex-1 text-gray-800 cursor-pointer ${
                          todo.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {new Date(todo.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => startEditing(todo)}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Double-click to edit • Auto-saves every 30 seconds • Data persists
            in browser
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;