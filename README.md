Randi’s Todo List App
Welcome to Randi's Todo List! This app is where I keep track of all the things I need to do and maybe—just maybe—actually get them done. 😅 Whether it's finding that missing sock or writing code (or both!), this app has got my back.

Key Features:
Adding Todos: I can add new todos to the list with a neat input field.
Editing Todos: If I’m not happy with a todo, I can edit it by clicking the "Edit" button, which turns it into an editable text field.
Deleting Todos: I can delete a todo once it’s marked as complete, because hey, no need to keep unfinished tasks around!
Marking Todos Complete: Completed todos are checked off, and only completed tasks can be deleted (it's the rule!).
Conditional Rendering: Depending on whether I’m editing or not, the app shows different buttons like "Save" or "Edit", making the interface interactive.
State Management:
useReducer: I use useReducer to manage the todo list state (goodbye, "useState spaghetti" 😅).
useState: For handling local state like the values of my input fields.
🛠️ Technologies Used:
React for building the user interface (because it’s awesome!).
useReducer for managing the main todo list state.
useState for local state, like tracking new todos or editing them.
Vite for setting up the development environment (fast and efficient!).
CSS for styling and making things look pretty.
Setup Instructions:
To run the application locally, follow these steps:

Clone the repository or download the project files.
Install Vite and React:
In the terminal, run the following command to create a Vite project with React:
bash
Copy code
npm create vite@latest
Follow the prompts to set up the project.
Install dependencies:
In your project directory, run:
bash
Copy code
npm install
Run the application:
Start the app with:
bash
Copy code
npm run dev
This will launch the app on your local development server (usually at http://localhost:5173).

Final Thoughts:
This app was created with the goal of managing todos while keeping it as fun and interactive as possible! The useReducer and useState hooks were used to make state management clean and efficient—no more tangled hooks. You’ll see some simple, intuitive UI changes depending on the state of the todo, and it’s all designed to help keep me on track (and maybe you, too! 😉).


